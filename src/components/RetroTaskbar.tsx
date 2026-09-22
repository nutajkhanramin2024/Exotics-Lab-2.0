import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Volume2,
  VolumeX,
  Tv,
  FolderGit2,
  Users,
  Layers,
  Send,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  Cpu,
  Radio,
  FileCode2,
  ExternalLink
} from "lucide-react";
import { playRetroClick, playStartupChime, toggleSound, isSoundEnabled } from "../utils/audio";

interface RetroTaskbarProps {
  crtActive: boolean;
  onToggleCrt: () => void;
  activeSection: string;
  onOpenTerminal: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export default function RetroTaskbar({
  crtActive,
  onToggleCrt,
  activeSection,
  onOpenTerminal,
  onOpenAbout,
  onOpenContact
}: RetroTaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartToggle = () => {
    playRetroClick();
    setStartOpen(!startOpen);
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playStartupChime();
  };

  const scrollTo = (id: string) => {
    playRetroClick();
    setStartOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Start Menu Popup */}
      <AnimatePresence>
        {startOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="fixed bottom-12 left-2 sm:left-4 z-50 w-72 sm:w-80 retro-bevel-out bg-[#100B24] border border-[#2D2152] rounded-xs shadow-2xl overflow-hidden font-mono text-xs"
          >
            {/* Start Menu Banner */}
            <div className="flex bg-[#0A0717]">
              {/* Vertical Side Strip */}
              <div className="w-10 bg-gradient-to-b from-[#6D28D9] via-[#4C1D95] to-[#1E1242] p-2 flex flex-col justify-between items-center text-white border-r border-[#342461] select-none">
                <span className="[writing-mode:vertical-rl] rotate-180 text-sm font-bold tracking-[0.2em] uppercase font-['Syne',sans-serif] text-purple-200">
                  EXOTICS LAB 2000
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
              </div>

              {/* Menu Items List */}
              <div className="flex-1 p-2 space-y-1 bg-[#100B24]">
                {/* Header User Badge */}
                <div className="px-3 py-2 bg-[#191136] border border-[#2B1D54] rounded-xs mb-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#2E1E5E] rounded-xs border border-[#48338C] flex items-center justify-center font-bold text-white text-xs">
                    EX
                  </div>
                  <div>
                    <div className="font-bold text-white text-[11px]">FOUNDER WORKSTATION</div>
                    <div className="text-[9px] text-[#A78BFA]">Dhaka HQ // Verified Host</div>
                  </div>
                </div>

                {/* Section Navigators */}
                <button
                  onClick={() => scrollTo("work")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer group"
                >
                  <FolderGit2 className="w-4 h-4 text-[#C4B5FD] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold block">Selected Work</span>
                    <span className="text-[9px] text-[#8C84A8]">IEP Unlocked, InventorsHub, Type-Z</span>
                  </div>
                </button>

                <button
                  onClick={() => scrollTo("about")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer group"
                >
                  <Layers className="w-4 h-4 text-[#C4B5FD] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold block">Studio Architecture</span>
                    <span className="text-[9px] text-[#8C84A8]">Three Core Pillars</span>
                  </div>
                </button>

                <button
                  onClick={() => scrollTo("team")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer group"
                >
                  <Users className="w-4 h-4 text-[#C4B5FD] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold block">Founders & Leadership</span>
                    <span className="text-[9px] text-[#8C84A8]">Nuraj Khan Ramin & Aditya Kumar Roy</span>
                  </div>
                </button>

                <button
                  onClick={() => scrollTo("process")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer group"
                >
                  <Cpu className="w-4 h-4 text-[#C4B5FD] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold block">Methodology & Process</span>
                    <span className="text-[9px] text-[#8C84A8]">Deployment Pipeline</span>
                  </div>
                </button>

                <button
                  onClick={() => scrollTo("contact")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer group"
                >
                  <Send className="w-4 h-4 text-[#C4B5FD] group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="font-semibold block">Initiate Transmission</span>
                    <span className="text-[9px] text-[#8C84A8]">Direct studio email channel</span>
                  </div>
                </button>

                <div className="border-t border-[#261A47] my-1" />

                {/* System Tools */}
                <button
                  onClick={() => {
                    setStartOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-[#DDD6FE] hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>exotics_cmd.exe (Terminal)</span>
                </button>

                <button
                  onClick={onToggleCrt}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-left text-[#DDD6FE] hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <Tv className="w-3.5 h-3.5 text-[#A78BFA]" />
                    <span>CRT Monitor Mode</span>
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-xs ${crtActive ? "bg-[#22C55E]/30 text-[#4ADE80]" : "bg-black/40 text-gray-400"}`}>
                    {crtActive ? "ON" : "OFF"}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setStartOpen(false);
                    onOpenAbout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-[#DDD6FE] hover:bg-[#34206B] rounded-xs transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5 text-[#A78BFA]" />
                  <span>About Exotics Lab OS...</span>
                </button>

                <div className="border-t border-[#261A47] my-1" />

                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="w-full flex items-center gap-3 px-3 py-1.5 text-left text-[#EF4444] hover:bg-[#3D1424] rounded-xs transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Session (Top)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Taskbar Bottom Fixed Strip */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-10 bg-[#120D26] border-t-2 border-white/20 border-b border-black shadow-2xl flex items-center justify-between px-2 sm:px-3 select-none font-mono text-xs">
        {/* Left: Start Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStartToggle}
            className={`flex items-center gap-2 px-3 py-1 font-bold tracking-wider rounded-xs cursor-pointer ${
              startOpen
                ? "bg-[#6D28D9] border-t-2 border-l-2 border-black border-r-2 border-b-2 border-white/40 text-white shadow-inner"
                : "retro-btn-accent text-white"
            }`}
          >
            <div className="w-4 h-4 bg-white/20 rounded-xs flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-['Syne',sans-serif] tracking-wider text-xs font-extrabold uppercase">
              START
            </span>
          </button>

          <div className="h-5 w-[1px] bg-[#2E2250] mx-1 hidden md:block" />

          {/* Quick Launch Icons */}
          <div className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollTo("work")}
              title="Selected Work"
              className="p-1 hover:bg-[#251B47] text-[#C4B5FD] hover:text-white rounded-xs border border-transparent hover:border-[#3E2D73] transition-colors"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollTo("team")}
              title="Founders"
              className="p-1 hover:bg-[#251B47] text-[#C4B5FD] hover:text-white rounded-xs border border-transparent hover:border-[#3E2D73] transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenTerminal}
              title="Terminal Command Prompt"
              className="p-1 hover:bg-[#251B47] text-[#C4B5FD] hover:text-white rounded-xs border border-transparent hover:border-[#3E2D73] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Tasks Tabs */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            {[
              { id: "work", label: "01. SELECTED_WORK" },
              { id: "about", label: "02. ARCHITECTURE" },
              { id: "team", label: "03. FOUNDERS_HUB" },
              { id: "process", label: "04. METHODOLOGY" },
              { id: "contact", label: "05. TRANSMISSION" }
            ].map((task) => (
              <button
                key={task.id}
                onClick={() => scrollTo(task.id)}
                className={`px-2.5 py-1 text-[10px] tracking-wide rounded-xs cursor-pointer transition-all ${
                  activeSection === task.id
                    ? "bg-[#251A4C] border border-[#523A9E] text-white font-bold shadow-inner"
                    : "bg-[#0C081A] border border-[#20153D] text-[#8E86AB] hover:text-white hover:border-[#3E2D73]"
                }`}
              >
                {task.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Retro System Tray */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#090614] border-t border-l border-black border-r border-b border-white/20 px-2 sm:px-3 py-1 rounded-xs">
          {/* Audio toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-1 hover:text-white text-[#9E95C4] transition-colors cursor-pointer"
            title={soundOn ? "Mute Sound Effects" : "Enable Sound Effects"}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#8B5CF6]" /> : <VolumeX className="w-3.5 h-3.5 text-gray-500" />}
          </button>

          {/* CRT scanlines toggle */}
          <button
            onClick={onToggleCrt}
            className="p-1 hover:text-white text-[#9E95C4] transition-colors cursor-pointer"
            title="Toggle CRT Screen Scanlines"
          >
            <Tv className={`w-3.5 h-3.5 ${crtActive ? "text-[#00E599]" : "text-gray-500"}`} />
          </button>

          {/* Live Studio Status */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#A78BFA] border-l border-[#1D1438] pl-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
            <span className="font-semibold">DHAKA HQ</span>
          </div>

          {/* Clock */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-white border-l border-[#1D1438] pl-2">
            <Clock className="w-3 h-3 text-[#8B5CF6] hidden sm:inline" />
            <span>{time || "12:00:00 PM"}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
