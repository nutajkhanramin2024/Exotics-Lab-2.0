import { useState } from "react";
import { Globe, ArrowLeft, ArrowRight, RotateCw, ExternalLink, ShieldCheck, Users, Search } from "lucide-react";
import { playRetroClick } from "../../../utils/audio";

export default function BrowserView() {
  const [currentUrl, setCurrentUrl] = useState("https://iepunlocked.vercel.app/");
  const [activeTab, setActiveTab] = useState<"iep" | "inventors">("iep");

  const handleNavigate = (tab: "iep" | "inventors", url: string) => {
    playRetroClick();
    setActiveTab(tab);
    setCurrentUrl(url);
  };

  return (
    <div className="flex flex-col h-full bg-[#070512] font-mono text-xs text-[#D8D2EB]">
      {/* Browser Tab Bar */}
      <div className="flex items-center gap-1 px-2 pt-2 bg-[#120B26] border-b border-[#241844] shrink-0">
        <button
          onClick={() => handleNavigate("iep", "https://iepunlocked.vercel.app/")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-t-xs text-[11px] font-bold transition-colors cursor-pointer border-t border-x ${
            activeTab === "iep"
              ? "bg-[#1B1138] border-[#3E2778] text-white border-b-transparent"
              : "bg-[#0C071C] border-[#1C1236] text-[#8E85AA] hover:text-white"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>IEP Unlocked</span>
        </button>

        <button
          onClick={() => handleNavigate("inventors", "https://inventorshub.vercel.app/")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-t-xs text-[11px] font-bold transition-colors cursor-pointer border-t border-x ${
            activeTab === "inventors"
              ? "bg-[#1B1138] border-[#3E2778] text-white border-b-transparent"
              : "bg-[#0C071C] border-[#1C1236] text-[#8E85AA] hover:text-white"
          }`}
        >
          <Users className="w-3.5 h-3.5 text-[#00E599]" />
          <span>InventorsHub</span>
        </button>
      </div>

      {/* Browser Navigation Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#170E33] border-b border-[#281A4C] shrink-0">
        <div className="flex items-center gap-1 text-[#8E85AA]">
          <button className="p-1 hover:text-white cursor-pointer"><ArrowLeft className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:text-white cursor-pointer"><ArrowRight className="w-3.5 h-3.5" /></button>
          <button className="p-1 hover:text-white cursor-pointer"><RotateCw className="w-3.5 h-3.5" /></button>
        </div>

        <div className="flex items-center gap-2 flex-1 bg-[#090615] px-3 py-1 border border-[#2B1D54] rounded-xs text-[11px]">
          <Globe className="w-3.5 h-3.5 text-[#00E599]" />
          <span className="text-white select-all flex-1 truncate font-mono">{currentUrl}</span>
          <span className="text-[9px] bg-[#14261B] text-[#00E599] px-1.5 py-0.2 rounded-xs">SSL SECURE</span>
        </div>

        <a
          href={currentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn-accent px-3 py-1 text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>OPEN IN TAB</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Browser Webpage Content Simulation */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#090617] space-y-6">
        {activeTab === "iep" ? (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-[#120B29] border border-[#2D1E54] p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#231742] pb-3">
                <span className="text-xs text-[#00E599] font-bold uppercase">● LIVE PRODUCTION PLATFORM</span>
                <span className="text-[10px] text-[#A78BFA]">AI SPECIAL EDUCATION</span>
              </div>

              <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold uppercase text-white">
                IEP UNLOCKED
              </h2>

              <p className="text-sm font-sans text-[#D4CEE8] leading-relaxed">
                Special education navigation made clear for parents. Translates intricate legal documents and individualized education plans into plain-English guidance and actionable ARD meeting strategies.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Document Interpretation
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Parent Rights Clarification
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Terminology Glossary
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Educational Plan Analysis
                </div>
              </div>

              <div className="pt-4 border-t border-[#231742]">
                <a
                  href="https://iepunlocked.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn-accent w-full py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                >
                  <span>LAUNCH IEP UNLOCKED (IEPUNLOCKED.VERCEL.APP)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-[#120B29] border border-[#2D1E54] p-6 rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#231742] pb-3">
                <span className="text-xs text-[#00E599] font-bold uppercase">● LIVE BUILDER ECOSYSTEM</span>
                <span className="text-[10px] text-[#A78BFA]">FOUNDERS & COLLABORATION</span>
              </div>

              <h2 className="font-['Syne',sans-serif] text-3xl font-extrabold uppercase text-white">
                INVENTORSHUB
              </h2>

              <p className="text-sm font-sans text-[#D4CEE8] leading-relaxed">
                A purpose-built collaboration platform connecting high-conviction early-stage builders, developers, designers, and operators to launch ambitious products together.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Founder Team Finder
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Architecture Posts
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Encrypted Direct Messages
                </div>
                <div className="p-2.5 bg-[#0A0717] border border-[#1E1438] text-xs text-[#C4B5FD] rounded-xs">
                  ✓ Crazy Innovators Directory
                </div>
              </div>

              <div className="pt-4 border-t border-[#231742]">
                <a
                  href="https://inventorshub.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn-accent w-full py-3 text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                >
                  <span>LAUNCH INVENTORSHUB (INVENTORSHUB.VERCEL.APP)</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
