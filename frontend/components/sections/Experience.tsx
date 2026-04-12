"use client";

import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";
import AnimateOnScroll, { AnimateChild } from "@/components/AnimateOnScroll";

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function Experience() {
  return (
    <section id="experience" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section header */}
        <AnimateOnScroll>
          <AnimateChild>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-accent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                Experience
              </h2>
            </div>
          </AnimateChild>
        </AnimateOnScroll>

        <div className="relative">
          {/* Vertical timeline line — hidden on mobile for clean single-column collapse */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/15 hidden sm:block" />

          <div className="space-y-6">
            {EXPERIENCE.map((job, index) => (
              <motion.div
                key={`${job.company}-${index}`}
                className="relative sm:pl-14"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: index * 0.1 }}
              >
                {/* Timeline dot — breathing pulse per taste-skill perpetual micro-interaction */}
                <div className="hidden sm:flex absolute left-0 top-6 w-8 h-8 rounded-full bg-navy-light border-2 border-accent/30 items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent animate-breathe" />
                </div>

                {/* Card — liquid glass treatment */}
                <div className="glass rounded-2xl p-5 transition-fluid hover:shadow-accent">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-base tracking-tight">{job.role}</h3>
                      <p className="text-accent text-sm font-medium">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-xs flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{job.period}</span>
                    </div>
                  </div>

                  <p className="text-white/40 text-xs mb-3">{job.location}</p>

                  <ul className="space-y-1.5 mb-4">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-white/65 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md bg-navy/40 border border-accent/15 text-white/65 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
