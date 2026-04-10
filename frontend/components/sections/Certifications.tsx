import { Award } from "lucide-react";
import { CERTIFICATIONS, EDUCATION } from "@/lib/data";

export default function Certifications() {
  return (
    <section id="certifications" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            Certifications &amp; Education
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Certifications */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-5">Certifications</h3>
            <div className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <div
                  key={cert}
                  className="flex items-start gap-3 bg-navy border border-white/10 hover:border-accent/30 rounded-xl px-4 py-3.5 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-white/80 text-sm leading-snug">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-white/60 text-xs uppercase tracking-widest mb-5">Education</h3>
            <div className="space-y-3">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="bg-navy border border-white/10 hover:border-accent/30 rounded-xl px-4 py-4 transition-colors duration-200"
                >
                  <p className="text-white font-semibold text-sm">{edu.degree}</p>
                  <p className="text-accent text-xs mt-1">{edu.institution}</p>
                  <p className="text-white/40 text-xs mt-0.5">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
