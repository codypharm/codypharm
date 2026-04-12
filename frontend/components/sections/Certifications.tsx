"use client";

import { Award } from "lucide-react";
import { motion } from "framer-motion";
import { CERTIFICATIONS, EDUCATION } from "@/lib/data";
import AnimateOnScroll, { AnimateChild } from "@/components/AnimateOnScroll";

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

export default function Certifications() {
  return (
    <section id="certifications" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <AnimateOnScroll>
          <AnimateChild>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-accent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                Certifications &amp; Education
              </h2>
            </div>
          </AnimateChild>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-5">Certifications</h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: index * 0.08 }}
                  className="flex items-start gap-3 glass rounded-xl px-4 py-3.5 transition-fluid hover:shadow-accent group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5 transition-fluid">
                    {/* Award icon with subtle float on hover */}
                    <Award className="w-4 h-4 text-accent group-hover:animate-float" />
                  </div>
                  <p className="text-white/80 text-sm leading-snug">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-5">Education</h3>
            <div className="space-y-3">
              {EDUCATION.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...SPRING, delay: index * 0.1 }}
                  className="glass rounded-xl px-4 py-4 transition-fluid hover:shadow-accent"
                >
                  <p className="text-white font-semibold text-sm tracking-tight">{edu.degree}</p>
                  <p className="text-accent text-xs mt-1">{edu.institution}</p>
                  <p className="text-white/40 text-xs mt-0.5">{edu.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
