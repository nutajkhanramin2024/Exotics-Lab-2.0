import { motion } from "motion/react";
import { PROCESS_STAGES } from "../data/team";
import { CheckCircle2, ChevronRight, Cpu, ArrowRight } from "lucide-react";
import RetroWindow from "./RetroWindow";

export default function Timeline() {
  return (
    <section id="process" className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#090615] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="process-wizard-window"
          title="C:\EXOTICS\SETUP\DEPLOYMENT_WIZARD.EXE - STEP 1 TO 4"
          headerAccent="purple"
          badge="METHODOLOGY"
          statusText="PIPELINE STATUS: SYNCHRONIZED // 4 STAGES VALIDATED"
          statusSegments={[
            { label: "PIPELINE", value: "ITERATIVE" },
            { label: "CYCLE", value: "CONTINUOUS" }
          ]}
        >
          <div className="space-y-8">
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#241B44] pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A78BFA] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>04 // METHODOLOGY PIPELINE</span>
                </div>
                <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                  THE BUILDING PROCESS.
                </h2>
              </div>
              <p className="font-sans text-sm text-[#C7C2DC] max-w-sm">
                Disciplined execution sequence from initial hypothesis to working production software.
              </p>
            </div>

            {/* Wizard Pipeline Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS_STAGES.map((stage, idx) => (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="retro-bevel-out bg-[#0E0A21] p-5 rounded-xs flex flex-col justify-between group hover:border-[#8B5CF6] transition-colors relative"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#241944] pb-3 text-xs">
                      <span className="px-2 py-0.5 bg-[#6D28D9] text-white font-bold rounded-xs text-[10px]">
                        STEP {stage.number}
                      </span>
                      <span className="text-[#00E599] text-[10px] font-bold">
                        VERIFIED
                      </span>
                    </div>

                    <div className="text-[10px] text-[#A78BFA] uppercase tracking-wider">
                      {stage.subtitle}
                    </div>

                    <h3 className="font-['Syne',sans-serif] text-xl font-bold uppercase text-white tracking-wide">
                      {stage.title}
                    </h3>

                    <p className="font-sans text-xs text-[#C7C2DC] font-normal leading-relaxed">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1F1538] flex items-center justify-between text-[10px] text-[#8E85AA] mt-4">
                    <span>STATUS: READY</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8B5CF6] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
