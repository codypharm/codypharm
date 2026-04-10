import { Mail, Globe, ExternalLink } from "lucide-react";
import { PROFILE } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <div className="mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Let&apos;s work together
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: pitch */}
          <div className="space-y-5">
            <p className="text-white/70 text-base leading-relaxed">
              I&apos;m open to new opportunities in AI engineering, LLM systems, and production
              AI infrastructure. Whether you have a project in mind or just want to connect —
              feel free to reach out.
            </p>
            <p className="text-white/50 text-sm leading-relaxed">
              I&apos;m especially interested in applied AI systems that work under real constraints,
              serve real users, and can be trusted in regulated environments.
            </p>
          </div>

          {/* Right: links */}
          <div className="space-y-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-4 bg-navy-light hover:bg-navy-mid border border-white/10 hover:border-accent/30 rounded-xl px-5 py-4 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-white/50 text-xs">Email</p>
                <p className="text-white text-sm font-medium">{PROFILE.email}</p>
              </div>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-navy-light hover:bg-navy-mid border border-white/10 hover:border-accent/30 rounded-xl px-5 py-4 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-white/50 text-xs">LinkedIn</p>
                <p className="text-white text-sm font-medium">linkedin.com/in/codypharm</p>
              </div>
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-navy-light hover:bg-navy-mid border border-white/10 hover:border-accent/30 rounded-xl px-5 py-4 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <ExternalLink className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-white/50 text-xs">GitHub</p>
                <p className="text-white text-sm font-medium">github.com/codypharm</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-sm">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        
        </div>
      </div>
    </section>
  );
}
