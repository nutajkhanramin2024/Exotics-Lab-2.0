import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Terminal,
  Activity,
  HardDrive,
  FolderGit2,
  Users,
  Sparkles,
  Zap,
  Globe,
  FileText,
  Play,
  Pause
} from "lucide-react";
import RetroWindow from "./RetroWindow";
import { playRetroClick, playStartupChime } from "../utils/audio";

interface HeroProps {
  onExploreWork: () => void;
  onMeetTeam: () => void;
  onOpenTerminal?: () => void;
}

export default function Hero({ onExploreWork, onMeetTeam, onOpenTerminal }: HeroProps) {
  const [isPlayingVis, setIsPlayingVis] = useState(true);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-24 sm:pt-28 pb-14 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden font-mono"
    >
      {/* Background Retro Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-retro-grid opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#8B5CF6]/[0.1] rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-[#6D28D9]/[0.08] rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Top Retro Marquee Newsflash Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 retro-bevel-out bg-[#0D091F] border border-[#2B1F4F] py-1.5 px-3 rounded-xs overflow-hidden flex items-center gap-3 text-[11px]"
      >
        <span className="bg-[#8B5CF6] text-white px-2 py-0.5 rounded-xs font-bold text-[10px] tracking-widest shrink-0 uppercase">
          SYSTEM BULLETIN
        </span>
        <div className="overflow-hidden whitespace-nowrap flex-1">
          <div className="animate-marquee font-mono text-[#D6D0EB] text-[11px]">
            <span>
              EXOTICS LAB OS 2000 [RELEASE 4.0] :: IEP UNLOCKED LIVE ON VERCEL :: INVENTORSHUB V2 ACTIVE :: DHAKA HQ CLUSTER VERIFIED :: FOUNDERS ONLINE: NURAJ KHAN RAMIN & ADITYA KUMAR ROY :: WE DON'T JUST TALK ABOUT IDEAS, WE BUILD THEM ::
            </span>
            <span className="ml-8">
              EXOTICS LAB OS 2000 [RELEASE 4.0] :: IEP UNLOCKED LIVE ON VERCEL :: INVENTORSHUB V2 ACTIVE :: DHAKA HQ CLUSTER VERIFIED :: FOUNDERS ONLINE: NURAJ KHAN RAMIN & ADITYA KUMAR ROY :: WE DON'T JUST TALK ABOUT IDEAS, WE BUILD THEM ::
            </span>
          </div>
        </div>
      </motion.div>

      {/* Desktop Quick Shortcuts Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="hidden md:flex items-center gap-6 mb-6 px-2 text-xs"
      >
        <button
          onClick={() => {
            playRetroClick();
            onExploreWork();
          }}
          className="flex flex-col items-center gap-1.5 group p-2 hover:bg-[#1C1438] rounded-xs border border-transparent hover:border-[#3C2A70] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 retro-bevel-out bg-[#1E143D] flex items-center justify-center text-[#C4B5FD] group-hover:scale-105 group-hover:text-white transition-transform">
            <FolderGit2 className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <span className="text-[10px] text-[#A78BFA] group-hover:text-white font-mono">
            Work_Archive.lnk
          </span>
        </button>

        <button
          onClick={() => {
            playRetroClick();
            onMeetTeam();
          }}
          className="flex flex-col items-center gap-1.5 group p-2 hover:bg-[#1C1438] rounded-xs border border-transparent hover:border-[#3C2A70] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 retro-bevel-out bg-[#1E143D] flex items-center justify-center text-[#C4B5FD] group-hover:scale-105 group-hover:text-white transition-transform">
            <Users className="w-5 h-5 text-[#A78BFA]" />
          </div>
          <span className="text-[10px] text-[#A78BFA] group-hover:text-white font-mono">
            Founders.exe
          </span>
        </button>

        <button
          onClick={() => {
            playRetroClick();
            onOpenTerminal();
          }}
          className="flex flex-col items-center gap-1.5 group p-2 hover:bg-[#1C1438] rounded-xs border border-transparent hover:border-[#3C2A70] transition-all cursor-pointer"
        >
          <div className="w-10 h-10 retro-bevel-out bg-[#1E143D] flex items-center justify-center text-[#C4B5FD] group-hover:scale-105 group-hover:text-white transition-transform">
            <Terminal className="w-5 h-5 text-[#00E599]" />
          </div>
          <span className="text-[10px] text-[#A78BFA] group-hover:text-white font-mono">
            Terminal_CMD.bat
          </span>
        </button>
      </motion.div>

      {/* Main Workstation Central Retro Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="my-auto"
      >
        <RetroWindow
          id="hero-main-window"
          title="C:\EXOTICS\CORE_STUDIO\WORKSTATION.EXE"
          headerAccent="purple"
          badge="LIVE NODE"
          menuItems={[
            { label: "Launch Work", onClick: onExploreWork },
            { label: "Personnel", onClick: onMeetTeam },
            { label: "Terminal", onClick: onOpenTerminal }
          ]}
          statusText="CONNECTED: DHAKA_PRIMARY_CLUSTER [PORT 8080]"
          statusSegments={[
            { label: "BUILD_MODE", value: "ACTIVE" },
            { label: "SYS_UPTIME", value: "99.98%" }
          ]}
        >
          <div className="space-y-8">
            {/* Top Diagnostics Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#241B44] pb-4">
              <div className="flex items-center gap-2 text-xs text-[#A78BFA]">
                <span className="w-2 h-2 rounded-full bg-[#00E599] animate-pulse" />
                <span className="text-white font-bold">EXOTICS LAB</span>
                <span className="text-[#6D628F]">// INDEPENDENT TECHNOLOGY STUDIO</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] bg-[#140D2E] border border-[#2F215C] px-2.5 py-1 rounded-xs">
                <Activity className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span className="text-[#C4B5FD]">PROCESSING REAL PRODUCTS</span>
              </div>
            </div>

            {/* Giant Display Headline */}
            <div className="space-y-4">
              <h1 className="font-['Syne',sans-serif] text-5xl sm:text-7xl md:text-8xl lg:text-[6.8rem] font-extrabold uppercase tracking-tight leading-[0.9] text-white">
                WE BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#8B5CF6] drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]">
                  WHAT'S NEXT.
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#C7C2DD] font-sans font-normal leading-relaxed max-w-2xl">
                Exotics Lab is an independent technology studio building real products at the intersection of software, applied AI, and human collaboration. We don't just talk about ideas. We ship them.
              </p>
            </div>

            {/* Interactive Early 2000s Button Controls */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-explore-cta"
                onClick={() => {
                  playRetroClick();
                  onExploreWork();
                }}
                className="retro-btn-accent px-6 py-3.5 flex items-center justify-center gap-3 font-mono text-xs font-extrabold uppercase tracking-widest cursor-pointer rounded-xs"
              >
                <span>EXPLORE ARCHIVE [WORK]</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-team-cta"
                onClick={() => {
                  playRetroClick();
                  onMeetTeam();
                }}
                className="retro-btn px-6 py-3.5 text-white flex items-center justify-center gap-3 font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer rounded-xs"
              >
                <span>MEET THE FOUNDERS</span>
                <ArrowUpRight className="w-4 h-4 text-[#A78BFA]" />
              </button>

              <button
                onClick={() => {
                  playRetroClick();
                  onOpenTerminal();
                }}
                className="retro-btn px-4 py-3.5 text-[#00E599] flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer rounded-xs"
                title="Launch Command Line"
              >
                <Terminal className="w-4 h-4" />
                <span>CMD PROMPT</span>
              </button>
            </div>

            {/* Studio Frequency Equalizer / Winamp-style Graphic */}
            <div className="bg-[#0A0717] border border-[#241944] p-3 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlayingVis(!isPlayingVis)}
                  className="w-7 h-7 bg-[#231745] hover:bg-[#392670] border border-[#48338C] rounded-xs flex items-center justify-center text-white cursor-pointer"
                >
                  {isPlayingVis ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
                </button>
                <div className="text-[11px]">
                  <div className="text-white font-bold">STUDIO_TELEMETRY.WAV</div>
                  <div className="text-[9px] text-[#8C82A8]">Real-time product deployment frequency</div>
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-6">
                {[18, 24, 12, 22, 16, 26, 14, 20, 24, 10, 22, 18, 28, 15, 25].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlayingVis
                        ? {
                            height: [
                              `${Math.max(4, height * 0.3)}px`,
                              `${height}px`,
                              `${Math.max(6, height * 0.7)}px`,
                              `${height}px`
                            ]
                          }
                        : { height: "4px" }
                    }
                    transition={{
                      repeat: Infinity,
                      duration: 0.6 + (i % 4) * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 bg-gradient-to-t from-[#6D28D9] via-[#8B5CF6] to-[#00E599] rounded-xs"
                  />
                ))}
              </div>
            </div>
          </div>
        </RetroWindow>
      </motion.div>

      {/* Bottom Technical Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-[10px] text-[#8E86AB] uppercase tracking-wider"
      >
        <div className="bg-[#0B081C] border border-[#1E153D] p-2 rounded-xs">
          <span className="text-[#DDD6FE] font-bold block">HQ LOCATION</span>
          <span>DHAKA, BANGLADESH</span>
        </div>
        <div className="bg-[#0B081C] border border-[#1E153D] p-2 rounded-xs">
          <span className="text-[#DDD6FE] font-bold block">SPECIALIZATION</span>
          <span>AI • PLATFORMS • SYSTEMS</span>
        </div>
        <div className="bg-[#0B081C] border border-[#1E153D] p-2 rounded-xs">
          <span className="text-[#DDD6FE] font-bold block">DEPLOYED PRODUCTS</span>
          <span>3 ACTIVE REPOSITORIES</span>
        </div>
        <div className="bg-[#0B081C] border border-[#1E153D] p-2 rounded-xs flex items-center justify-between">
          <div>
            <span className="text-[#00E599] font-bold block">SYSTEM STATUS</span>
            <span>100% OPERATIONAL</span>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E599] animate-ping" />
        </div>
      </motion.div>
    </section>
  );
}
