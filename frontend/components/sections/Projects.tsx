"use client";

import { useRef, useState, useCallback } from "react";
import { Shield, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/data";
import type { LucideIcon } from "lucide-react";
import AnimateOnScroll, { AnimateChild } from "@/components/AnimateOnScroll";

const ICON_MAP: Record<string, LucideIcon> = { Shield, Layers };

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

/** Interactive card with mouse-tracking spotlight effect */
function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: "50%", y: "50%" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  }, []);

  const Icon = ICON_MAP[project.icon] ?? Shield;
  // Alternate layout direction for zig-zag feel
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...SPRING, delay: index * 0.15 }}
      className="glass rounded-2xl overflow-hidden transition-fluid hover:shadow-accent group spotlight-border"
      style={{
        "--mouse-x": mousePos.x,
        "--mouse-y": mousePos.y,
      } as React.CSSProperties}
    >
      <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        {/* Card header side */}
        <div className="lg:w-2/5 px-6 pt-6 pb-4 lg:py-8 border-b lg:border-b-0 border-white/5 flex flex-col justify-center bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-navy/60 flex items-center justify-center flex-shrink-0 border border-accent/20 group-hover:border-accent/50 transition-fluid">
              <Icon className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-tight tracking-tight">
                {project.title}
              </h3>
              <p className="text-accent text-xs font-bold uppercase mt-1">
                {project.subtitle}
              </p>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed mt-2 max-w-[50ch]">
            {project.description}
          </p>
        </div>

        {/* Card body side */}
        <div className="lg:w-3/5 px-6 py-6 flex flex-col gap-5">
          <ul className="space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-white/70 text-sm">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-navy/40 border border-accent/20 text-accent/90 text-[10px] font-bold uppercase"
              >
                {t}
              </span>
            ))}
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-navy text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-fluid press w-full"
          >
            Access
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <AnimateOnScroll>
          <AnimateChild>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-accent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                Projects
              </h2>
            </div>
          </AnimateChild>
        </AnimateOnScroll>

        {/* Zig-zag layout — alternating card direction */}
        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
