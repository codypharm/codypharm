"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Twin from "@/components/twin";

// Spring config for overshoot bounce on open/close
const POPUP_SPRING = { type: "spring" as const, stiffness: 300, damping: 24 };

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
    <div ref={containerRef} className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Chat window — spring physics open/close */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={POPUP_SPRING}
            className="origin-bottom-right"
          >
            <div className="glass-strong rounded-2xl shadow-diffuse flex flex-col overflow-hidden w-[380px] h-[520px] sm:w-[400px] sm:h-[540px]">
              {/* Popup header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0 bg-white/[0.02]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none tracking-tight">Codypharm&apos;s AI Twin</p>
                    <p className="text-white/40 text-xs mt-0.5">Powered by AWS Bedrock</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-white/40 hover:text-white hover:bg-white/8 rounded-lg transition-fluid press cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat body */}
              <div className="flex-1 overflow-hidden">
                <Twin />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger button — breathing scale instead of pulse-glow */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-diffuse transition-fluid cursor-pointer ${
          open
            ? "bg-slate-700 hover:bg-slate-600"
            : "bg-accent hover:bg-accent-dim animate-pulse-glow"
        }`}
        aria-label={open ? "Close AI Twin chat" : "Chat with AI Twin"}
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Bot className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}
