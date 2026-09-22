import { useState } from "react";
import { motion } from "motion/react";
import { FileText, CheckCircle2, Bookmark, Code2 } from "lucide-react";
import RetroWindow from "./RetroWindow";
import { playRetroClick } from "../utils/audio";

export default function Manifesto() {
  const [wordWrap, setWordWrap] = useState(true);

  return (
    <section
      id="about"
      className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#070512] overflow-hidden font-mono"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="manifesto-window"
          title="C:\EXOTICS\DOCS\README_MANIFESTO.TXT - NOTEPAD"
          headerAccent="dark"
          badge="CANONICAL"
          menuItems={[
            {
              label: wordWrap ? "Word Wrap: ON" : "Word Wrap: OFF",
              onClick: () => {
                playRetroClick();
                setWordWrap(!wordWrap);
              }
            }
          ]}
          statusText="DOC_LINES: 42 // ENCODING: UTF-8 // STATUS: RATIFIED"
          statusSegments={[
            { label: "THESIS", value: "ACTION > THEORY" },
            { label: "SECTOR", value: "PROTOTYPING" }
          ]}
        >
          <div className="space-y-8">
            {/* Header Document Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#231A3F] pb-4 text-xs text-[#8E85AA]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-white font-bold uppercase tracking-wider">
                  MANIFESTO // DOCUMENT 001
                </span>
              </div>
              <span className="text-[11px] bg-[#140E29] border border-[#2D2052] px-2.5 py-0.5 rounded-xs text-[#C4B5FD]">
                RATIFIED: DHAKA LAB
              </span>
            </div>

            {/* Core Conviction Big Display Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-white leading-[1.05]">
                We believe the best products start as{" "}
                <span className="text-[#8B5CF6] underline decoration-[#8B5CF6]/50 underline-offset-8">
                  uncomfortable
                </span>{" "}
                ideas.
              </h2>
            </motion.div>

            {/* Thesis Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-[#231A3F] pt-8">
              <div className="md:col-span-4 bg-[#0D091F] border border-[#241B44] p-4 rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                  <Bookmark className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>THE EXOTICS THESIS</span>
                </div>
                <p className="text-xs text-[#9E95B8] leading-relaxed">
                  Ideas are cheap. Building isn't. We do not stop at theoretical discussions, hype decks, or endless abstract roadmaps.
                </p>
                <div className="pt-2 border-t border-[#1F1638] text-[10px] text-[#786D94]">
                  DIRECTIVE: VALIDATE THROUGH CODE
                </div>
              </div>

              <div className="md:col-span-8 space-y-6">
                <p className="font-sans text-lg sm:text-xl md:text-2xl text-[#E3DFEE] font-light leading-snug">
                  Exotics Lab exists to take those uncomfortable ideas seriously — turning raw early-stage hypotheses into real, usable, battle-tested technology.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8E85AA] pt-2">
                  <div className="flex items-center gap-2 bg-[#120D26] border border-[#251A47] px-3 py-1.5 rounded-xs">
                    <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                    <span className="text-white font-semibold">NO VAPORWARE</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#120D26] border border-[#251A47] px-3 py-1.5 rounded-xs">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span className="text-white font-semibold">REAL DEPLOYMENTS ONLY</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#120D26] border border-[#251A47] px-3 py-1.5 rounded-xs">
                    <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
                    <span className="text-white font-semibold">FOUNDER-DRIVEN SHIP CYCLES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
