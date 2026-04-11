"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Twin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/chat`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: input,
            session_id: sessionId || undefined,
          }),
        },
      );

      if (!response.ok) throw new Error("Failed to send message");

      const data = await response.json();
      if (!sessionId) setSessionId(data.session_id);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I ran into an error. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-navy">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
              <Bot className="w-6 h-6 text-accent" />
            </div>
            <p className="text-white/80 text-sm font-medium">
              Hi, I&apos;m Codypharm&apos;s AI Twin
            </p>
            <p className="text-white/40 text-xs leading-relaxed max-w-[220px]">
              Ask me about his work, projects, skills, or experience in AI & blockchain.
            </p>
            <div className="flex flex-col gap-1.5 w-full max-w-[260px] mt-1">
              {[
                "What projects have you built?",
                "Tell me about your AI experience",
                "Are you open to work?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="text-left text-xs text-accent/80 hover:text-accent bg-navy-light hover:bg-navy-mid border border-accent/15 hover:border-accent/40 rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4 text-accent" />
              </div>
            )}

            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-accent text-white rounded-tr-sm"
                  : "bg-navy-light text-white/85 border border-white/8 rounded-tl-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`text-[10px] mt-1 ${
                  message.role === "user" ? "text-white/60 text-right" : "text-white/30"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {message.role === "user" && (
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-4 h-4 text-white/70" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2 justify-start">
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            <div className="bg-navy-light border border-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 px-3 pb-3 pt-2 border-t border-white/8 bg-navy">
        <div className="flex items-end gap-2 bg-navy-light border border-white/10 rounded-2xl px-3 py-2 focus-within:border-accent/50 transition-colors duration-200">
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize textarea to fit content
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 112)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            className="flex-1 bg-transparent text-white/90 placeholder-white/30 text-sm resize-none outline-none py-1 max-h-28 leading-relaxed"
            disabled={isLoading}
            style={{ scrollbarWidth: "none", overflow: "hidden" }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mb-0.5 transition-all duration-200 bg-accent hover:bg-accent-dim disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
