import { ExternalLink, Shield, Layers } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = { Shield, Layers };

export default function Projects() {
  return (
    <section id="projects" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Things I&apos;ve built
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {PROJECTS.map((project) => {
            const Icon = ICON_MAP[project.icon] ?? Shield;
            return (
              <div
                key={project.title}
                className="bg-navy border border-white/10 hover:border-accent/40 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-accent/5 flex flex-col"
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4 border-b border-white/10">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-accent text-xs font-medium mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-white/50 hover:text-accent text-xs font-medium transition-colors duration-200 flex-shrink-0 mt-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-6 py-5 flex flex-col flex-1 gap-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-1.5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-white/60 text-sm">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-navy-mid border border-accent/15 text-white/70 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
