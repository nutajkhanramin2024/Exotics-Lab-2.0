import { ArrowUp, Terminal, HardDrive, Cpu, Shield } from "lucide-react";
import { CONTACT_CONFIG } from "../data/team";
import { playRetroClick } from "../utils/audio";

export default function Footer() {
  const scrollToTop = () => {
    playRetroClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t-2 border-[#38266D] bg-[#070512] py-10 pb-20 text-[#A78BFA] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Main Retro Card */}
        <div className="retro-bevel-out bg-[#0E0A21] p-6 rounded-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
            {/* Left Studio Mark */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E599]" />
                <span className="font-['Syne',sans-serif] font-bold text-lg text-white tracking-wider">
                  EXOTICS LAB
                </span>
              </div>
              <p className="text-[#C7C2DC] text-xs leading-relaxed max-w-xs font-sans">
                Independent technology studio building ambitious digital products across AI, software, and human collaboration.
              </p>
            </div>

            {/* Center Positioning */}
            <div className="md:col-span-4 space-y-2">
              <div className="text-[#8E85AA] text-[10px] uppercase tracking-widest font-bold">
                HQ LOCATION & JURISDICTION
              </div>
              <p className="text-white text-sm font-bold">
                {CONTACT_CONFIG.tagline}
              </p>
              <div className="text-[11px] text-[#A78BFA]">
                Dhaka Studio: 23°48'N 90°24'E — Global Edge Deployments
              </div>
            </div>

            {/* Right Navigation Anchors & Back to Top */}
            <div className="md:col-span-4 flex flex-col md:items-end space-y-4">
              <nav className="flex flex-wrap gap-4 md:justify-end text-xs uppercase tracking-wider text-[#DDD6FE]">
                <a href="#work" className="hover:text-white transition-colors">Work</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#process" className="hover:text-white transition-colors">Process</a>
                <a href="#team" className="hover:text-white transition-colors">Team</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </nav>

              <button
                onClick={scrollToTop}
                className="retro-btn inline-flex items-center gap-2 px-3 py-1.5 text-xs text-white uppercase tracking-wider cursor-pointer"
              >
                <span>RETURN TO DESKTOP ROOT</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#8B5CF6]" />
              </button>
            </div>
          </div>

          {/* Bottom Legal Strip */}
          <div className="border-t border-[#231A42] pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#8E85AA]">
            <div>
              {CONTACT_CONFIG.copyright} // EXOTICS OS KERNEL V2001.4
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
              <span className="text-white font-bold">ALL SUBSYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
