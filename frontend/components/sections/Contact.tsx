"use client";

import { useRef, useState, useCallback } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import AnimateOnScroll, { AnimateChild } from "@/components/AnimateOnScroll";

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

/** Contact link card with mouse-tracking spotlight */
function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  index,
  external = false,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  index: number;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...SPRING, delay: index * 0.1 }}
      className="flex items-center gap-4 glass rounded-xl px-5 py-4 transition-fluid hover:shadow-accent group press spotlight-border"
      style={{
        "--mouse-x": mousePos.x,
        "--mouse-y": mousePos.y,
      } as React.CSSProperties}
    >
      <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-fluid">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </motion.a>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <AnimateOnScroll>
          <AnimateChild>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-accent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                Contact
              </h2>
            </div>
          </AnimateChild>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <AnimateOnScroll stagger={0.12}>
            <AnimateChild>
              <p className="text-white/70 text-base leading-relaxed max-w-[65ch] mb-5">
                I&apos;m open to new opportunities in AI engineering, LLM systems, and production
                AI infrastructure. Whether you have a project in mind or just want to connect —
                feel free to reach out.
              </p>
            </AnimateChild>
            <AnimateChild>
              <p className="text-white/50 text-sm leading-relaxed max-w-[65ch]">
                I&apos;m especially interested in applied AI systems that work under real constraints,
                serve real users, and can be trusted in regulated environments.
              </p>
            </AnimateChild>
          </AnimateOnScroll>

          {/* Right: links with spotlight borders */}
          <div className="space-y-3">
            <ContactLink
              href={`mailto:${PROFILE.email}`}
              icon={Mail}
              label="Email"
              value={PROFILE.email}
              index={0}
            />
            <ContactLink
              href={PROFILE.linkedin}
              icon={LinkedinIcon}
              label="LinkedIn"
              value="linkedin.com/in/codypharm"
              index={1}
              external
            />
            <ContactLink
              href={PROFILE.github}
              icon={GithubIcon}
              label="GitHub"
              value="github.com/codypharm"
              index={2}
              external
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <p>&copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
