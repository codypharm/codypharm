import { Download, Bot, ExternalLink, MapPin, ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-navy flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background grid dot pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(79,142,247,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-navy-mid/40 via-navy to-navy pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-16 max-w-6xl">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium tracking-wide">
            {PROFILE.alias}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {PROFILE.name}
          </h1>

          <p className="text-accent text-lg sm:text-xl font-medium mb-3">
            {PROFILE.title}
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-1.5 text-white/50 text-sm mb-6">
            <MapPin className="w-4 h-4" />
            <span>{PROFILE.location}</span>
          </div>

          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            {PROFILE.tagline}
          </p>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="/cv.pdf"
              download
              className="flex items-center gap-2 bg-accent hover:bg-accent-dim text-white font-medium px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
            
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>

        {/* Right: Terminal card */}
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="bg-navy-light border border-accent/20 rounded-2xl shadow-2xl shadow-accent/5 overflow-hidden">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-navy-mid/40">
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
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span>LLM pipeline <span className="text-green-400">online</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span>RAG system <span className="text-green-400">ready</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                  <span>Agentic workflows <span className="text-green-400">active</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                  <span>Available for hire <span className="text-accent">true</span></span>
                </div>
              </div>
              <div className="pt-1 text-white/40">
                <span className="text-accent">{'>'}</span>{" "}
                <span className="text-white/60">
                  {PROFILE.yearsExp}+ years | Lagos, Nigeria
                </span>
                <span className="animate-blink text-accent">_</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Years Exp.", value: `${PROFILE.yearsExp}+` },
              { label: "Projects", value: "20+" },
              { label: "Chains Built", value: "4+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-navy-light border border-white/10 rounded-xl p-3 text-center"
              >
                <div className="text-xl font-bold text-accent">{stat.value}</div>
                <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-accent transition-colors duration-200 animate-bounce"
        aria-label="Scroll to About"
      >
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}
