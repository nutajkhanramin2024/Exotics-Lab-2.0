import { Terminal, Cpu, Rocket, Shield, Server, CheckCircle2 } from "lucide-react";

export default function LabView() {
  const pillars = [
    {
      number: "01",
      title: "BUILD",
      icon: Terminal,
      statement: "We turn concepts into functional software.",
      subtext:
        "Every project begins with working code and rigorous engineering rather than endless slide decks.",
      techSpec: "STACK: PRODUCTION TS / REACT / AI",
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
      techSpec: "LOOP: CONTINUOUS PROTOTYPING",
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
      techSpec: "CHANNEL: GLOBAL CLOUD / EDGE",
      status: "DEPLOYING"
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] overflow-y-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>STUDIO ARCHITECTURE // RACK MOUNT</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            THIS IS OUR LAB.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#140E2D] border border-[#2B1D54] text-[#00E599] px-2.5 py-1 rounded-xs font-bold uppercase">
            3/3 NODES SYNCHRONIZED
          </span>
        </div>
      </div>

      <p className="font-sans text-sm text-[#C7C2DC] max-w-xl">
        Exotics Lab is where unconventional ideas become tangible, production-grade products through relentless hands-on building.
      </p>

      {/* 3 Rack Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="retro-bevel-out bg-[#0E0A21] p-5 rounded-xs flex flex-col justify-between border border-[#2B1D54] group hover:border-[#8B5CF6] transition-colors"
            >
              <div>
                {/* Node Status Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#231A3F] text-xs">
                  <span className="font-bold text-[#A78BFA] tracking-wider text-[10px]">
                    NODE_{pillar.number} // CHASSIS
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                    <span className="text-[9px] text-[#00E599] font-bold">
                      {pillar.status}
                    </span>
                  </div>
                </div>

                <div className="w-10 h-10 retro-bevel-in bg-[#160E30] flex items-center justify-center text-[#C4B5FD] mb-3">
                  <Icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>

                <h3 className="font-['Syne',sans-serif] text-xl font-bold uppercase text-white mb-2">
                  {pillar.title}
                </h3>

                <p className="font-sans text-xs text-[#E2DEF0] leading-relaxed mb-3">
                  {pillar.statement}
                </p>
              </div>

              <div className="pt-3 border-t border-[#20173A] space-y-2">
                <p className="text-[10px] text-[#8E86AB] leading-relaxed">
                  {pillar.subtext}
                </p>
                <div className="bg-[#080512] px-2 py-1 border border-[#1C1338] text-[9px] text-[#A78BFA] rounded-xs font-mono truncate">
                  {pillar.techSpec}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
