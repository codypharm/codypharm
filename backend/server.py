from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from typing import Optional, List, Dict
import json
import uuid
from datetime import datetime
import boto3
import resend
from botocore.exceptions import ClientError
from context import prompt

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize Bedrock client
bedrock_client = boto3.client(
    service_name="bedrock-runtime",
    region_name=os.getenv("DEFAULT_AWS_REGION", "us-east-1"),
)

BEDROCK_MODEL_ID = os.getenv("BEDROCK_MODEL_ID", "global.amazon.nova-2-lite-v1:0")

# Memory storage configuration
USE_S3 = os.getenv("USE_S3", "false").lower() == "true"
S3_BUCKET = os.getenv("S3_BUCKET", "")
MEMORY_DIR = os.getenv("MEMORY_DIR", "../memory")

if USE_S3:
    s3_client = boto3.client("s3")

# ── Tool definition ─────────────────────────────────────────────────────────

CONTACT_TOOL = {
    "toolSpec": {
        "name": "collect_client_contact",
        "description": (
            "Use this tool when a visitor expresses interest in working with Chukwunonso, "
            "wants to be contacted, or asks how to reach him. Collect their name, email address, "
            "and what they would like to discuss, then call this tool to send him a notification."
        ),
        "inputSchema": {
            "json": {
                "type": "object",
                "properties": {
                    "client_name": {
                        "type": "string",
                        "description": "The visitor's full name",
                    },
                    "client_email": {
                        "type": "string",
                        "description": "The visitor's email address",
                    },
                    "inquiry": {
                        "type": "string",
                        "description": "A brief description of what they want to discuss or work on",
                    },
                },
                "required": ["client_name", "client_email"],
            }
        },
    }
}


# ── Resend notification ──────────────────────────────────────────────────────

def send_contact_notification(client_name: str, client_email: str, inquiry: str) -> str:
    """Send contact notification to Chukwunonso via Resend."""
    resend.api_key = os.getenv("RESEND_API_KEY", "")
    if not resend.api_key:
        print("RESEND_API_KEY not set — skipping email")
        return "error: RESEND_API_KEY not configured"

    notification_email = os.getenv("NOTIFICATION_EMAIL", "williamikeji@gmail.com")
    from_email = os.getenv("RESEND_FROM_EMAIL", "onboarding@resend.dev")

    try:
        resend.Emails.send({
            "from": from_email,
            "to": [notification_email],
            "subject": f"New contact from your AI Twin: {client_name}",
            "html": f"""
                <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;
                            background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb">
                  <h2 style="margin:0 0 16px;color:#0a1628">New Contact Request</h2>
                  <table style="width:100%;border-collapse:collapse">
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-size:14px;width:120px">Name</td>
                      <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600">
                        {client_name}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-size:14px">Email</td>
                      <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600">
                        <a href="mailto:{client_email}" style="color:#4f8ef7">{client_email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:8px 0;color:#6b7280;font-size:14px;vertical-align:top">
                        Inquiry
                      </td>
                      <td style="padding:8px 0;color:#111827;font-size:14px">
                        {inquiry or 'Not specified'}
                      </td>
                    </tr>
                  </table>
                  <p style="margin:20px 0 0;font-size:12px;color:#9ca3af">
                    Sent via your AI Digital Twin portfolio
                  </p>
                </div>
            """,
        })
        print(f"Contact notification sent for {client_name} <{client_email}>")
        return "success"
    except Exception as e:
        print(f"Resend error: {e}")
        return f"error: {str(e)}"


# ── Request / Response models ────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


class Message(BaseModel):
    role: str
    content: str
    timestamp: str


# ── Memory management ────────────────────────────────────────────────────────

def get_memory_path(session_id: str) -> str:
    return f"{session_id}.json"


def load_conversation(session_id: str) -> List[Dict]:
    if USE_S3:
        try:
            response = s3_client.get_object(Bucket=S3_BUCKET, Key=get_memory_path(session_id))
            return json.loads(response["Body"].read().decode("utf-8"))
        except ClientError as e:
            if e.response["Error"]["Code"] == "NoSuchKey":
                return []
            raise
    else:
        file_path = os.path.join(MEMORY_DIR, get_memory_path(session_id))
        if os.path.exists(file_path):
            with open(file_path, "r") as f:
                return json.load(f)
        return []


def save_conversation(session_id: str, messages: List[Dict]):
    if USE_S3:
        s3_client.put_object(
            Bucket=S3_BUCKET,
            Key=get_memory_path(session_id),
            Body=json.dumps(messages, indent=2),
            ContentType="application/json",
        )
    else:
        os.makedirs(MEMORY_DIR, exist_ok=True)
        file_path = os.path.join(MEMORY_DIR, get_memory_path(session_id))
        with open(file_path, "w") as f:
            json.dump(messages, f, indent=2)


# ── Bedrock agentic loop ─────────────────────────────────────────────────────

def call_bedrock(conversation: List[Dict], user_message: str) -> str:
    """Call Bedrock with tool support, looping until end_turn."""
    messages = []

    # Rebuild message history in Bedrock format (no fake system message)
    for msg in conversation[-50:]:
        messages.append({
            "role": msg["role"],
            "content": [{"text": msg["content"]}],
        })

    messages.append({"role": "user", "content": [{"text": user_message}]})

    for _ in range(5):  # safety cap
        try:
            response = bedrock_client.converse(
                modelId=BEDROCK_MODEL_ID,
                messages=messages,
                system=[{"text": prompt()}],
                toolConfig={"tools": [CONTACT_TOOL]},
                inferenceConfig={
                    "maxTokens": 2000,
                    "temperature": 0.7,
                    "topP": 0.9,
                },
            )
        except ClientError as e:
            code = e.response["Error"]["Code"]
            if code == "ValidationException":
                print(f"Bedrock validation error: {e}")
                raise HTTPException(status_code=400, detail="Invalid message format for Bedrock")
            elif code == "AccessDeniedException":
                print(f"Bedrock access denied: {e}")
                raise HTTPException(status_code=403, detail="Access denied to Bedrock model")
            else:
                print(f"Bedrock error: {e}")
                raise HTTPException(status_code=500, detail=f"Bedrock error: {str(e)}")

        stop_reason = response["stopReason"]
        assistant_msg = response["output"]["message"]

        if stop_reason == "end_turn":
            # Extract text from potentially mixed content
            for block in assistant_msg["content"]:
                if "text" in block:
                    return block["text"]
            return ""

        if stop_reason == "tool_use":
            messages.append(assistant_msg)
            tool_results = []
            for block in assistant_msg["content"]:
                if "toolUse" not in block:
                    continue
                tool = block["toolUse"]
                tool_input = tool.get("input", {})
                result = send_contact_notification(
                    client_name=tool_input.get("client_name", ""),
                    client_email=tool_input.get("client_email", ""),
                    inquiry=tool_input.get("inquiry", ""),
                )
                tool_results.append({
                    "toolResult": {
                        "toolUseId": tool["toolUseId"],
                        "content": [{"text": result}],
                    }
                })
            messages.append({"role": "user", "content": tool_results})
            # loop → Bedrock generates final confirmation text

    raise HTTPException(status_code=500, detail="Agent loop exceeded maximum iterations")


# ── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    return {
        "message": "AI Digital Twin API (Powered by AWS Bedrock)",
        "memory_enabled": True,
        "storage": "S3" if USE_S3 else "local",
        "ai_model": BEDROCK_MODEL_ID,
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "use_s3": USE_S3,
        "bedrock_model": BEDROCK_MODEL_ID,
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        session_id = request.session_id or str(uuid.uuid4())
        conversation = load_conversation(session_id)
        assistant_response = call_bedrock(conversation, request.message)

        conversation.append({
            "role": "user",
            "content": request.message,
            "timestamp": datetime.now().isoformat(),
        })
        conversation.append({
            "role": "assistant",
            "content": assistant_response,
            "timestamp": datetime.now().isoformat(),
        })
        save_conversation(session_id, conversation)

        return ChatResponse(response=assistant_response, session_id=session_id)

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/conversation/{session_id}")
async def get_conversation(session_id: str):
    try:
        conversation = load_conversation(session_id)
        return {"session_id": session_id, "messages": conversation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
