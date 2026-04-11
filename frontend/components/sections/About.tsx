import { Mail, ArrowRight } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export default function About() {
  return (
    <section id="about" className="bg-navy-light py-24">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left: Avatar */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-56 h-56 rounded-full border-4 border-accent shadow-[0_0_30px_rgba(77,218,218,0.2)] overflow-hidden mb-6 bg-navy flex items-center justify-center">
              <img src={`${PROFILE.github}.png`} alt={PROFILE.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-5">{PROFILE.name}</h3>
            <div className="flex items-center gap-5">
              <a href={`mailto:${PROFILE.email}`} target="_blank" rel="noreferrer" className="text-accent hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href={PROFILE.github} target="_blank" rel="noreferrer" className="text-accent hover:text-white transition-colors">
                <GithubIcon className="w-6 h-6" />
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="text-accent hover:text-white transition-colors">
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right: Text */}
          <div className="lg:col-span-8">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 border-2 border-accent flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-accent"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-widest">
                About
              </h2>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-6">Discover a little about me</h3>

            <div className="space-y-6">
              <p className="text-white/80 text-base leading-relaxed">
                I&apos;m an AI Engineer with a background in Pharmacy and several years of experience building
                production software systems. My work focuses on{" "}
                <strong className="text-white">LLM-powered applications</strong>, particularly{" "}
                <strong className="text-white">RAG systems</strong> designed for high-accuracy
                domains like healthcare and pharmaceuticals.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                Because of my healthcare roots,{" "}
                <strong className="text-white">compliance (HIPAA, GDPR)</strong> isn&apos;t an
                afterthought — it informs how I design data flows, storage, and model access from day one.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                I work primarily in Python, building LLM systems with tools like LangChain, vector
                databases, and custom retrieval logic, deploying with Docker and AWS. I also bring
                experience from{" "}
                <strong className="text-white">distributed systems and blockchain</strong>, which
                shapes how I think about security, data integrity, and system reliability.
              </p>

              {/* Career path */}
              <div className="pt-6">
                <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Career Journey</p>
                <div className="flex flex-wrap items-center gap-2">
                  {PROFILE.careerPath.map((step, i) => (
                    <div key={step} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-navy border border-accent/30 text-white/90 text-sm font-medium">
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
          </div>
        </div>
      </div>
    </section>
  );
}
