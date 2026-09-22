import { useState } from "react";
import { PROCESS_STAGES } from "../../../data/team";
import { ChevronRight, ChevronLeft, CheckCircle2, Compass, Play } from "lucide-react";
import { playRetroClick } from "../../../utils/audio";

export default function ProcessView() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStage = PROCESS_STAGES[activeStepIndex];

  return (
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] overflow-y-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>DEPLOYMENT WIZARD // METHODOLOGY</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            THE BUILDING PROCESS.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#140E2D] border border-[#2B1D54] text-[#C4B5FD] px-2.5 py-1 rounded-xs font-bold uppercase">
            STAGE {activeStage.number} OF {PROCESS_STAGES.length}
          </span>
        </div>
      </div>

      {/* Interactive Step Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
          {PROCESS_STAGES.map((stage, idx) => {
            const isCurrent = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            return (
              <button
                key={stage.number}
                onClick={() => {
                  playRetroClick();
                  setActiveStepIndex(idx);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 border rounded-xs transition-all cursor-pointer shrink-0 ${
                  isCurrent
                    ? "bg-[#6D28D9] border-[#A78BFA] text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                    : isCompleted
                    ? "bg-[#14261B] border-[#00E599]/40 text-[#00E599]"
                    : "bg-[#0E0A21] border-[#22173F] text-[#8E85AA] hover:text-white"
                }`}
              >
                <span className="text-[10px]">{stage.number}.</span>
                <span className="text-xs uppercase">{stage.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Detail Card */}
      <div className="retro-bevel-out bg-[#0E0A21] p-6 rounded-xs border border-[#2B1D54] space-y-4">
        <div className="flex items-center justify-between border-b border-[#231A42] pb-3">
          <div>
            <span className="text-[10px] text-[#A78BFA] uppercase tracking-wider block">
              PHASE {activeStage.number} // {activeStage.subtitle}
            </span>
            <h3 className="font-['Syne',sans-serif] text-2xl font-bold uppercase text-white tracking-wide">
              {activeStage.title}
            </h3>
          </div>
          <div className="w-9 h-9 bg-[#1F143D] border border-[#442E82] rounded-xs flex items-center justify-center text-[#C4B5FD]">
            <Compass className="w-5 h-5 text-[#8B5CF6]" />
          </div>
        </div>

        <p className="font-sans text-sm text-[#E2DEF0] leading-relaxed">
          {activeStage.description}
        </p>

        <div className="pt-4 border-t border-[#231A42] flex items-center justify-between">
          <button
            disabled={activeStepIndex === 0}
            onClick={() => {
              playRetroClick();
              setActiveStepIndex((prev) => Math.max(0, prev - 1));
            }}
            className={`retro-btn px-4 py-2 text-xs uppercase flex items-center gap-1.5 cursor-pointer ${
              activeStepIndex === 0 ? "opacity-40 cursor-not-allowed" : "text-white"
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>PREVIOUS STAGE</span>
          </button>

          <button
            disabled={activeStepIndex === PROCESS_STAGES.length - 1}
            onClick={() => {
              playRetroClick();
              setActiveStepIndex((prev) => Math.min(PROCESS_STAGES.length - 1, prev + 1));
            }}
            className={`retro-btn-accent px-4 py-2 text-xs font-bold uppercase flex items-center gap-1.5 cursor-pointer ${
              activeStepIndex === PROCESS_STAGES.length - 1 ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            <span>NEXT STAGE</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
