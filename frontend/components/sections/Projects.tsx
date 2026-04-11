import { ExternalLink, Shield, Layers } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { Shield, Layers };

export default function Projects() {
  return (
    <section id="projects" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10 w-full justify-center lg:justify-start">
          <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
            <div className="w-1.5 h-1.5 bg-accent"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
            Projects
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {PROJECTS.map((project) => {
            const Icon = ICON_MAP[project.icon] ?? Shield;
            return (
              <div
                key={project.title}
                className="bg-navy border border-white/5 border-t-[3px] border-t-accent rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_25px_rgba(77,218,218,0.15)] flex flex-col group"
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4 bg-navy-light/30 border-b border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-navy flex items-center justify-center flex-shrink-0 border border-accent/20 group-hover:border-accent/60 transition-colors">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight uppercase tracking-wider">
                          {project.title}
                        </h3>
                        <p className="text-accent text-xs font-bold uppercase mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 py-6 flex flex-col flex-1 gap-5">
                  <p className="text-white/80 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full bg-transparent border border-accent/30 text-accent text-[10px] font-bold uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border border-accent text-accent hover:bg-accent hover:text-navy text-xs font-bold uppercase tracking-widest py-3 rounded transition-all duration-300 w-full"
                    >
                      Access
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
