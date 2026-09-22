import { motion } from "motion/react";
import { Terminal, Cpu, Rocket, Server, CheckCircle2, Shield } from "lucide-react";
import RetroWindow from "./RetroWindow";

export default function LabSection() {
  const pillars = [
    {
      number: "01",
      title: "BUILD",
      icon: Terminal,
      statement: "We turn concepts into functional software.",
      subtext:
        "Every project begins with working code and rigorous engineering rather than endless slide decks.",
      techSpec: "EXECUTION ENGINE: PRODUCTION TS/REACT/AI",
      status: "ONLINE"
    },
    {
      number: "02",
      title: "EXPERIMENT",
      icon: Cpu,
      statement:
        "We test unconventional ideas instead of waiting for perfect conditions.",
      subtext:
        "Unorthodox hypotheses reveal breakthrough workflows that safe corporate roadmaps never discover.",
      techSpec: "RESEARCH LOOP: CONTINUOUS PROTOTYPING",
      status: "ACTIVE"
    },
    {
      number: "03",
      title: "SHIP",
      icon: Rocket,
      statement:
        "We believe real-world feedback is more valuable than endless planning.",
      subtext:
        "Direct feedback from live users is the only metric that permanently clarifies product truth.",
      techSpec: "DEPLOYMENT CHANNEL: GLOBAL CLOUD / EDGE",
      status: "DEPLOYING"
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#090615] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="about-architecture-window"
          title="C:\EXOTICS\LAB_ARCHITECTURE.EXE"
          headerAccent="purple"
          badge="3 PILLARS"
          statusText="RACK NODES: 3/3 MOUNTED // LATENCY: 12ms // ALL SYSTEMS NOMINAL"
          statusSegments={[
            { label: "METHOD", value: "FULL-STACK" },
            { label: "SPEED", value: "HYPER-ITERATION" }
          ]}
        >
          <div className="space-y-8">
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#241B44] pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A78BFA] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>02 // STUDIO ARCHITECTURE</span>
                </div>
                <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                  THIS IS OUR LAB.
                </h2>
              </div>
              <p className="font-sans text-base text-[#C7C2DC] max-w-md">
                Exotics Lab is where unconventional ideas become tangible, production-grade products.
              </p>
            </div>

            {/* 3 Hardware Rack Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="retro-bevel-out bg-[#0E0A1F] p-5 sm:p-6 rounded-xs flex flex-col justify-between group hover:border-[#8B5CF6] transition-colors relative"
                  >
                    <div>
                      {/* Top Chassis Strip */}
                      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#231A3F] text-xs">
                        <span className="font-bold text-[#A78BFA] tracking-wider">
                          NODE_{pillar.number} // CHASSIS
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                          <span className="text-[10px] text-[#00E599] font-bold">
                            {pillar.status}
                          </span>
                        </div>
                      </div>

                      <div className="w-10 h-10 retro-bevel-in bg-[#160E30] flex items-center justify-center text-[#C4B5FD] mb-4 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5 text-[#8B5CF6]" />
                      </div>

                      <h3 className="font-['Syne',sans-serif] text-2xl font-bold uppercase tracking-wide text-white mb-3">
                        {pillar.title}
                      </h3>

                      <p className="font-sans text-sm text-[#E2DEF0] font-normal leading-relaxed mb-4">
                        {pillar.statement}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#20173A] space-y-2">
                      <p className="text-[11px] text-[#8E86AB] leading-relaxed">
                        {pillar.subtext}
                      </p>
                      <div className="bg-[#080512] px-2 py-1 border border-[#1C1338] text-[9px] text-[#A78BFA] rounded-xs font-mono truncate">
                        {pillar.techSpec}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
