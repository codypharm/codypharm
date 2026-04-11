"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X } from "lucide-react";
import Twin from "@/components/twin";

export default function TwinPopup() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <div
        className={`transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="bg-navy border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden w-[380px] h-[520px] sm:w-[400px] sm:h-[540px]">
          {/* Popup header */}
          <div className="flex items-center justify-between px-4 py-3 bg-navy-light border-b border-white/8 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">Codypharm&apos;s AI Twin</p>
                <p className="text-white/40 text-xs mt-0.5">Powered by AWS Bedrock</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 text-white/40 hover:text-white hover:bg-white/8 rounded-lg transition-colors duration-200 cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat body */}
          <div className="flex-1 overflow-hidden">
            {open && <Twin />}
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-black/30 transition-all duration-200 animate-pulse-glow cursor-pointer ${
          open
            ? "bg-slate-700 hover:bg-slate-600 rotate-0"
            : "bg-accent hover:bg-accent-dim"
        }`}
        aria-label={open ? "Close AI Twin chat" : "Chat with AI Twin"}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

