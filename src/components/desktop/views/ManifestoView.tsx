import { useState } from "react";
import { FileText, Bookmark, CheckCircle2, Copy, Check } from "lucide-react";
import { playRetroClick } from "../../../utils/audio";

export default function ManifestoView() {
  const [wordWrap, setWordWrap] = useState(true);
  const [copied, setCopied] = useState(false);

  const manifestoText = `EXOTICS LAB // CANONICAL MANIFESTO
DOCUMENT ID: DOC-001-RATIFIED
LOCATION: DHAKA LAB HQ

--------------------------------------------------
CORE CONVICTION:
"We believe the best products start as uncomfortable ideas."
--------------------------------------------------

THE EXOTICS THESIS:
Ideas are cheap. Building isn't.

We do not stop at theoretical discussions, hype decks, or endless abstract roadmaps. Most organizations spend quarters deliberating on safe, consensus-driven ideas that ultimately change nothing.

Exotics Lab exists to take uncomfortable ideas seriously — turning raw, early-stage hypotheses into real, usable, battle-tested technology.

OUR OPERATIONAL DIRECTIVES:
1. NO VAPORWARE
   Every project begins with working code and rigorous engineering.

2. REAL DEPLOYMENTS ONLY
   Software only exists when it is running in production and touched by live humans.

3. FOUNDER-DRIVEN SHIP CYCLES
   Direct execution from inception to release without bureaucratic dilution.

--------------------------------------------------
ESTABLISHED: DHAKA, BANGLADESH
ALL RIGHTS RESERVED // EXOTICS LAB
--------------------------------------------------`;

  const handleCopy = () => {
    playRetroClick();
    navigator.clipboard.writeText(manifestoText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full font-mono text-xs text-[#D8D2EB] bg-[#0A0717]">
      {/* Document Menu Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#140E2E] border-b border-[#241944] text-[11px] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>README_MANIFESTO.TXT</span>
          </div>
          <span className="text-[10px] bg-[#221447] text-[#C4B5FD] px-2 py-0.5 rounded-xs border border-[#3E2778]">
            UTF-8
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playRetroClick();
              setWordWrap(!wordWrap);
            }}
            className="retro-btn px-2.5 py-1 text-[10px] text-[#DDD6FE] hover:text-white cursor-pointer"
          >
            Word Wrap: {wordWrap ? "ON" : "OFF"}
          </button>
          <button
            onClick={handleCopy}
            className="retro-btn px-2.5 py-1 text-[10px] text-[#DDD6FE] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#00E599]" />
                <span className="text-[#00E599]">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY TEXT</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Document Content View */}
      <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-6">
        {/* Core Conviction Banner */}
        <div className="bg-[#100B24] border border-[#2B1D54] p-5 rounded-xs space-y-3">
          <div className="flex items-center gap-2 text-[#A78BFA] text-[10px] uppercase font-bold tracking-wider">
            <Bookmark className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>CANONICAL CONVICTION</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-4xl font-extrabold uppercase text-white leading-tight">
            We believe the best products start as{" "}
            <span className="text-[#8B5CF6] underline underline-offset-8">
              uncomfortable
            </span>{" "}
            ideas.
          </h2>
          <p className="text-sm font-sans text-[#E2DEF0] leading-relaxed">
            Exotics Lab exists to take those uncomfortable ideas seriously — turning raw early-stage hypotheses into real, usable, battle-tested technology.
          </p>
        </div>

        {/* 3 Directives */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-[#0E0921] border border-[#231844] p-3.5 rounded-xs space-y-1">
            <div className="text-[#00E599] font-bold text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00E599]" />
              NO VAPORWARE
            </div>
            <p className="text-[10px] text-[#8C84A8] font-sans">
              Validate through code, not through speculative slide presentations.
            </p>
          </div>

          <div className="bg-[#0E0921] border border-[#231844] p-3.5 rounded-xs space-y-1">
            <div className="text-[#8B5CF6] font-bold text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
              REAL DEPLOYMENTS
            </div>
            <p className="text-[10px] text-[#8C84A8] font-sans">
              Production software tested by real end users in live environments.
            </p>
          </div>

          <div className="bg-[#0E0921] border border-[#231844] p-3.5 rounded-xs space-y-1">
            <div className="text-[#A78BFA] font-bold text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A78BFA]" />
              FOUNDER-LED CYCLES
            </div>
            <p className="text-[10px] text-[#8C84A8] font-sans">
              Fast, unfiltered engineering iteration directly from creators.
            </p>
          </div>
        </div>

        {/* Raw Text Box */}
        <div className="bg-[#070512] border border-[#1E1438] p-4 rounded-xs">
          <div className="text-[10px] text-[#7A7196] uppercase mb-2 font-bold">
            RAW MONOSPACE OUTPUT
          </div>
          <pre
            className={`font-mono text-xs text-[#C4B5FD] leading-relaxed select-all ${
              wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
            }`}
          >
            {manifestoText}
          </pre>
        </div>
      </div>
    </div>
  );
}
