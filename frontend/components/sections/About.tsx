import { Briefcase, Brain, MapPin, FlaskConical, ArrowRight } from "lucide-react";
import { PROFILE } from "@/lib/data";

const stats = [
  { icon: Briefcase, label: "Years Experience", value: `${PROFILE.yearsExp}+` },
  { icon: Brain, label: "Specialization", value: "AI Engineer" },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria" },
  { icon: FlaskConical, label: "Background", value: "Healthcare × AI" },
];

export default function About() {
  return (
    <section id="about" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section header */}
        <div className="mb-14">
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
            The story behind the code
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Summary */}
          <div className="space-y-6">
            <p className="text-white/80 text-base leading-relaxed">
              I&apos;m an AI Engineer with a background in Pharmacy and several years of experience building
              production software systems. My work focuses on{" "}
              <span className="text-accent font-medium">LLM-powered applications</span>, particularly{" "}
              <span className="text-accent font-medium">RAG systems</span> designed for high-accuracy
              domains like healthcare and pharmaceuticals.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Because of my healthcare roots,{" "}
              <span className="text-accent font-medium">compliance (HIPAA, GDPR)</span> isn&apos;t an
              afterthought — it informs how I design data flows, storage, and model access from day one.
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              I work primarily in Python, building LLM systems with tools like LangChain, vector
              databases, and custom retrieval logic, deploying with Docker and AWS. I also bring
              experience from{" "}
              <span className="text-accent font-medium">distributed systems and blockchain</span>, which
              shapes how I think about security, data integrity, and system reliability.
            </p>

            {/* Career path */}
            <div className="pt-4">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Career Journey</p>
              <div className="flex flex-wrap items-center gap-2">
                {PROFILE.careerPath.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-navy-mid border border-accent/25 text-white/80 text-sm font-medium">
                      {step}
                    </span>
                    {i < PROFILE.careerPath.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-accent/50 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-navy border border-white/10 hover:border-accent/30 rounded-2xl p-5 transition-colors duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-xl font-bold text-white">{value}</div>
                <div className="text-sm text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
