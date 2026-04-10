import { Brain, Database, Code2, Network, Cpu } from "lucide-react";
import { SKILLS } from "@/lib/data";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Brain,
  Database,
  Code2,
  Network,
  Cpu,
};

export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Technologies I work with
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILLS.map((category) => {
            const Icon = ICON_MAP[category.icon] ?? Brain;
            return (
              <div
                key={category.label}
                className="bg-navy-light border border-white/10 hover:border-accent/30 rounded-2xl p-6 transition-colors duration-200 group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-200">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-white font-semibold">{category.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-navy-mid border border-accent/20 text-white/80 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
