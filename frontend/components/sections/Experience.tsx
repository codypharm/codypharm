import { Calendar } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="bg-navy py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-12 w-full justify-center sm:justify-start">
          <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
            <div className="w-1.5 h-1.5 bg-accent"></div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
            Experience
          </h2>
        </div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-accent/20 hidden sm:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((job, index) => (
              <div key={`${job.company}-${index}`} className="relative sm:pl-14">
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-0 top-6 w-8 h-8 rounded-full bg-navy-light border-2 border-accent/40 items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Card */}
                <div className="bg-navy-light border border-white/10 hover:border-accent/30 rounded-2xl p-5 transition-colors duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-white font-bold text-base">{job.role}</h3>
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
                        className="px-2 py-0.5 rounded bg-navy-mid border border-accent/15 text-white/65 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
