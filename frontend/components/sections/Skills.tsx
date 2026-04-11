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

const BORDER_COLORS = ["#4f8ef7", "#4ade80", "#8b5cf6", "#facc15", "#4ddada"];

export default function Skills() {
  return (
    <section id="skills" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-10 w-full justify-center lg:justify-start">
          <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
            <div className="w-1.5 h-1.5 bg-accent"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
            Skills
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {SKILLS.map((category, index) => {
            const Icon = ICON_MAP[category.icon] ?? Brain;
            const borderColor = BORDER_COLORS[index % BORDER_COLORS.length];
            return (
              <div
                key={category.label}
                className="bg-navy-light shadow-lg hover:bg-navy-mid transition-colors duration-300 rounded-lg p-6 flex flex-col items-center justify-start text-center group border-b-4"
                style={{ borderBottomColor: borderColor }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{category.label}</h3>
                <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
                  {category.items.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-navy text-accent text-[10px] uppercase font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                  {category.items.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-navy text-white/50 text-[10px] font-bold">
                      +{category.items.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
