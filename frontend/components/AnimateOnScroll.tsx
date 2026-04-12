"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between children in seconds */
  stagger?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Trigger threshold — how much of the element must be visible */
  amount?: number;
  /** Only animate once (default true) */
  once?: boolean;
  /** Direction to animate from */
  from?: "bottom" | "left" | "right" | "fade";
}

// Spring config matching taste-skill spec: weighty, premium feel
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

// Directional offset presets
const OFFSETS = {
  bottom: { y: 32, x: 0 },
  left: { y: 0, x: -32 },
  right: { y: 0, x: 32 },
  fade: { y: 0, x: 0 },
};

/**
 * Scroll-triggered reveal wrapper with stagger support.
 * Isolates Framer Motion as a client component leaf so parents can stay RSC.
 */
export default function AnimateOnScroll({
  children,
  className = "",
  stagger = 0.08,
  duration = 0.6,
  amount = 0.2,
  once = true,
  from = "bottom",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const offset = OFFSETS[from];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual child that animates within an AnimateOnScroll parent.
 * Must be a direct child of AnimateOnScroll for stagger to work.
 */
export function AnimateChild({
  children,
  className = "",
  from = "bottom",
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "fade";
}) {
  const offset = OFFSETS[from];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, x: offset.x, y: offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: SPRING,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
