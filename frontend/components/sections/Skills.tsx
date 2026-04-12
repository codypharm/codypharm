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
                <div className="relative flex flex-wrap justify-center gap-1.5 mt-auto w-full">
                  {category.items.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-navy text-accent text-[10px] uppercase font-bold"
                    >
                      {skill}
                    </span>
                  ))}
                  
                  {category.items.length > 3 && (
                    <>
                      {/* The +N Badge - Illuminates on hover */}
                      <span className="px-2 py-0.5 rounded bg-navy text-white/50 text-[10px] font-bold transition-all duration-300 group-hover:bg-accent/15 group-hover:text-accent">
                        +{category.items.length - 3}
                      </span>
                      
                      {/* Floating Glass Tooltip - Reveals all skills on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[200px] p-3 rounded-2xl bg-navy-light/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-95 group-hover:scale-100 origin-bottom z-50 flex flex-wrap justify-center gap-1.5 pointer-events-none">
                        <div className="w-full text-center text-accent/60 text-[9px] uppercase tracking-widest mb-1.5 font-bold">
                          All Skills
                        </div>
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded bg-navy text-white/90 text-[10px] uppercase font-bold border border-white/5"
                          >
                            {skill}
                          </span>
                        ))}
                        {/* Downward triangle pointer */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white/10">
                          {/* Inner triangle to match background */}
                          <div className="absolute bottom-[1px] -left-[5.5px] border-[5.5px] border-transparent border-t-navy-light/95" />
                        </div>
                      </div>
                    </>
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