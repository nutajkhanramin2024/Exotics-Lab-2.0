import { Rocket, Users, FileText, Mail, Terminal, Sparkles, ArrowRight, Globe, CheckCircle2, Cpu } from "lucide-react";
import { WindowId } from "../../../types/desktop";
import { playRetroClick, playStartupChime } from "../../../utils/audio";

interface WelcomeGuideViewProps {
  onOpenWindow: (id: WindowId) => void;
}

export default function WelcomeGuideView({ onOpenWindow }: WelcomeGuideViewProps) {
  const handleOpen = (id: WindowId) => {
    playRetroClick();
    onOpenWindow(id);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 text-xs font-mono text-[#D8D2EB]">
      {/* Top Welcome Banner */}
      <div className="bg-[#140E2D] border border-[#2F1F5C] p-4 sm:p-5 rounded-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 bg-[#201447] border border-[#442E82] rounded-xs flex items-center justify-center shrink-0 shadow-inner text-[#8B5CF6]">
            <Cpu className="w-6 h-6 text-[#00E599]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-['Syne',sans-serif] text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
                EXOTICS LAB OS 2000
              </h2>
              <span className="text-[9px] bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/40 px-1.5 py-0.5 rounded-xs font-bold">
                ONLINE
              </span>
            </div>
            <p className="text-[#A78BFA] text-xs font-sans mt-0.5">
              Independent technology studio based in Dhaka, Bangladesh — building ambitious digital products.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            playStartupChime();
            onOpenWindow("projects");
          }}
          className="retro-btn-accent px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
        >
          <span>EXPLORE OUR WORK</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Core Conviction Callout */}
      <div className="retro-bevel-in bg-[#090615] p-4 rounded-xs border-l-3 border-[#8B5CF6] space-y-2">
        <div className="flex items-center gap-1.5 text-[#C4B5FD] text-[10px] font-bold uppercase tracking-wider">
          <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
          <span>OUR PRIMARY THESIS</span>
        </div>
        <p className="font-['Syne',sans-serif] text-base sm:text-lg text-white uppercase font-bold leading-snug">
          "We believe the best products start as <span className="text-[#8B5CF6] underline underline-offset-4">uncomfortable</span> ideas."
        </p>
        <p className="text-[11px] text-[#8E85AA] font-sans">
          Ideas are cheap. Building isn't. We do not stop at theoretical discussions, hype decks, or endless abstract roadmaps. We build and ship real technology.
        </p>
      </div>

      {/* Desktop Quick Shortcuts Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] text-[#A78BFA] border-b border-[#231944] pb-2 font-bold uppercase tracking-wider">
          <span>QUICK LAUNCHER / SYSTEM DIRECTORY</span>
          <span>CLICK ANY APP TO OPEN</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => handleOpen("projects")}
            className="flex items-start gap-3 p-3 bg-[#0F0A24] hover:bg-[#1A123D] border border-[#271B4D] hover:border-[#8B5CF6] rounded-xs text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-[#23154C] rounded-xs border border-[#482D94] flex items-center justify-center text-[#C4B5FD] shrink-0 group-hover:scale-105 transition-transform">
              <Rocket className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase group-hover:text-[#C4B5FD]">Selected Work</span>
                <span className="text-[8px] bg-[#6D28D9] text-white px-1 py-0.2 rounded-xs">LIVE APPS</span>
              </div>
              <p className="text-[10px] text-[#8C84A8] line-clamp-2 mt-0.5">
                Explore IEP Unlocked (AI Special Ed), InventorsHub (Builder Ecosystem), and Type-Z.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleOpen("team")}
            className="flex items-start gap-3 p-3 bg-[#0F0A24] hover:bg-[#1A123D] border border-[#271B4D] hover:border-[#8B5CF6] rounded-xs text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-[#23154C] rounded-xs border border-[#482D94] flex items-center justify-center text-[#C4B5FD] shrink-0 group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase group-hover:text-[#C4B5FD]">Founders & Team</span>
                <span className="text-[8px] bg-[#2E1E5E] text-[#DDD6FE] px-1 py-0.2 rounded-xs">DHAKA HQ</span>
              </div>
              <p className="text-[10px] text-[#8C84A8] line-clamp-2 mt-0.5">
                Verified personnel profiles for Nuraj Khan Ramin (Founder & CEO) and Aditya Kumar Roy (Co-Founder).
              </p>
            </div>
          </button>

          <button
            onClick={() => handleOpen("manifesto")}
            className="flex items-start gap-3 p-3 bg-[#0F0A24] hover:bg-[#1A123D] border border-[#271B4D] hover:border-[#8B5CF6] rounded-xs text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-[#23154C] rounded-xs border border-[#482D94] flex items-center justify-center text-[#C4B5FD] shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase group-hover:text-[#C4B5FD]">Manifesto.txt</span>
                <span className="text-[8px] bg-[#160E30] text-[#A78BFA] px-1 py-0.2 rounded-xs">DOC 001</span>
              </div>
              <p className="text-[10px] text-[#8C84A8] line-clamp-2 mt-0.5">
                Our philosophical blueprint: Action &gt; Theory, no vaporware, disciplined engineering.
              </p>
            </div>
          </button>

          <button
            onClick={() => handleOpen("contact")}
            className="flex items-start gap-3 p-3 bg-[#0F0A24] hover:bg-[#1A123D] border border-[#271B4D] hover:border-[#8B5CF6] rounded-xs text-left transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 bg-[#23154C] rounded-xs border border-[#482D94] flex items-center justify-center text-[#C4B5FD] shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-4 h-4 text-[#8B5CF6]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white uppercase group-hover:text-[#C4B5FD]">Transmit Inquiry</span>
                <span className="text-[8px] bg-[#00E599]/20 text-[#00E599] px-1 py-0.2 rounded-xs">DIRECT</span>
              </div>
              <p className="text-[10px] text-[#8C84A8] line-clamp-2 mt-0.5">
                Send an encrypted proposal or direct email to the studio founders.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#231944] text-[10px] text-[#8E85AA]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
          <span>STUDIO WORKSTATION ACTIVE // DHAKA LAB</span>
        </div>
        <div className="flex items-center gap-3">
          <span>TIPS: DOUBLE-CLICK OR TAP ICONS TO OPEN</span>
        </div>
      </div>
    </div>
  );
}
