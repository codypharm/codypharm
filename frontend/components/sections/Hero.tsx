"use client";

import { Download, MapPin, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";
import { GithubIcon } from "@/components/icons";

// Spring config per taste-skill spec
const SPRING = { type: "spring" as const, stiffness: 100, damping: 20 };

// Stagger orchestration for text elements
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

// Terminal card entrance from right
const terminalVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { ...SPRING, delay: 0.3 } },
};

// Stats stagger
const statsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative hero-height bg-navy flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Mesh gradient animated blobs — organic lava-lamp background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.07] blur-3xl mesh-blob-1"
          style={{
            background: "radial-gradient(circle, #4ddada 0%, transparent 70%)",
            top: "10%",
            left: "-10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.05] blur-3xl mesh-blob-2"
          style={{
            background: "radial-gradient(circle, #4f8ef7 0%, transparent 70%)",
            bottom: "5%",
            right: "-5%",
          }}
        />
      </div>

      {/* Subtle grid dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(77,218,218,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16 max-w-6xl">
        {/* Left: Text — asymmetric left-aligned per DESIGN_VARIANCE=8 */}
        <motion.div
          className="flex-1 text-center lg:text-left lg:pl-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={childVariants}
            className="block uppercase text-accent tracking-widest font-bold text-sm mb-4"
          >
            {PROFILE.titleShort}
          </motion.span>

          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-none mb-4"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.div
            variants={childVariants}
            className="flex items-center justify-center lg:justify-start gap-1.5 text-white/50 text-sm mb-6"
          >
            <MapPin className="w-4 h-4" />
            <span>{PROFILE.location}</span>
          </motion.div>

          <motion.p
            variants={childVariants}
            className="text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            variants={childVariants}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 border border-accent text-accent hover:bg-accent hover:text-navy font-medium px-5 py-2.5 rounded-lg transition-fluid press uppercase tracking-wide text-sm"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-fluid press uppercase tracking-wide text-sm"
            >
              <GithubIcon className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Terminal card — slides in from right */}
        <motion.div
          className="flex-shrink-0 w-full max-w-sm lg:max-w-md"
          variants={terminalVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="glass rounded-2xl shadow-accent overflow-hidden spotlight-border">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-navy-mid/30">
              <span className="w-3 h-3 rounded-full bg-red-400/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <span className="w-3 h-3 rounded-full bg-green-400/70" />
              <span className="ml-2 text-xs text-white/40 font-mono">ai_system_status.py</span>
            </div>
            {/* Terminal body */}
            <div className="p-5 font-mono text-sm space-y-3">
              <div className="text-accent/60">
                <span className="text-accent">$</span> python ai_system_status.py
              </div>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-breathe flex-shrink-0" />
                  <span>LLM pipeline <span className="text-green-400">online</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-breathe flex-shrink-0" style={{ animationDelay: "0.3s" }} />
                  <span>RAG system <span className="text-green-400">ready</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-breathe flex-shrink-0" style={{ animationDelay: "0.6s" }} />
                  <span>Agentic workflows <span className="text-green-400">active</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-breathe flex-shrink-0" style={{ animationDelay: "0.9s" }} />
                  <span>Available for hire <span className="text-accent">true</span></span>
                </div>
              </div>
              <div className="pt-1 text-white/40">
                <span className="text-accent">{">"}</span>{" "}
                <span className="text-white/60">
                  {PROFILE.yearsExp}+ years | Lagos, Nigeria
                </span>
                <span className="animate-blink text-accent">_</span>
              </div>
            </div>
          </div>

          {/* Stats row — staggered entry */}
          <motion.div
            className="grid grid-cols-3 gap-3 mt-4"
            variants={statsContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { label: "Years Exp.", value: `${PROFILE.yearsExp}+` },
              { label: "Projects", value: "20+" },
              { label: "Chains Built", value: "4+" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="glass rounded-xl p-3 text-center"
              >
                <div className="text-xl font-bold text-accent">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-accent transition-fluid animate-bounce"
        aria-label="Scroll to About"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
