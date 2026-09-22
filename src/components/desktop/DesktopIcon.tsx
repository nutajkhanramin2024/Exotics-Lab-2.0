import { type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "motion/react";
import {
  FolderGit2,
  Users,
  FileText,
  Cpu,
  Compass,
  Activity,
  Mail,
  Terminal,
  Globe,
  Music,
  Trash2,
  Sliders,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { DesktopIconData } from "../../types/desktop";
import { playRetroClick } from "../../utils/audio";

interface DesktopIconProps {
  key?: string | number;
  icon: DesktopIconData;
  isSelected: boolean;
  onSelect: () => void;
  onOpen: () => void;
}

export default function DesktopIcon({
  icon,
  isSelected,
  onSelect,
  onOpen
}: DesktopIconProps) {
  const handleClick = (e: ReactMouseEvent) => {
    e.stopPropagation();
    playRetroClick();

    // On touch/mobile devices or if the icon is already selected, open immediately
    const isTouchOrMobile =
      typeof globalThis.window !== "undefined" &&
      (globalThis.window.innerWidth < 768 ||
        globalThis.window.matchMedia("(pointer: coarse)").matches);

    if (isTouchOrMobile || isSelected) {
      onOpen();
    } else {
      onSelect();
    }
  };

  const handleDoubleClick = (e: ReactMouseEvent) => {
    e.stopPropagation();
    playRetroClick();
    onOpen();
  };

  const renderIconGraphic = () => {
    switch (icon.id) {
      case "welcome":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] rounded-xs border-2 border-[#93C5FD] shadow-md">
            <HelpCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#8B5CF6] text-white text-[8px] font-bold px-1 rounded-xs border border-white">
              ?
            </span>
          </div>
        );
      case "projects":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#7C3AED] to-[#4C1D95] rounded-xs border-2 border-[#C4B5FD] shadow-md">
            <FolderGit2 className="w-7 h-7 text-white" />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#00E599] rounded-full flex items-center justify-center text-[8px] text-black font-bold border border-black">
              ★
            </span>
          </div>
        );
      case "team":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#24174D] to-[#110B29] rounded-xs border-2 border-[#8B5CF6] shadow-md">
            <Users className="w-7 h-7 text-[#DDD6FE]" />
            <span className="absolute -top-1 -left-1 bg-[#6D28D9] text-white text-[7px] font-bold px-1 rounded-xs border border-[#A78BFA]">
              ID
            </span>
          </div>
        );
      case "manifesto":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#FAF8FF] to-[#D8D2EB] rounded-xs border-2 border-[#8B5CF6] shadow-md text-[#1E1438]">
            <FileText className="w-7 h-7 text-[#4C1D95]" />
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-[#8B5CF6] rounded-xs" />
          </div>
        );
      case "lab":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#181136] to-[#0A071A] rounded-xs border-2 border-[#6D28D9] shadow-md">
            <Cpu className="w-7 h-7 text-[#00E599]" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
          </div>
        );
      case "process":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#4A1D96] to-[#2E1065] rounded-xs border-2 border-[#C4B5FD] shadow-md">
            <Compass className="w-7 h-7 text-[#F59E0B]" />
          </div>
        );
      case "telemetry":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#0F172A] to-[#020617] rounded-xs border-2 border-[#00E599] shadow-md">
            <Activity className="w-7 h-7 text-[#00E599]" />
            <span className="absolute bottom-1 left-1 text-[7px] text-[#00E599] font-mono font-bold">
              LIVE
            </span>
          </div>
        );
      case "contact":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#8B5CF6] to-[#5B21B6] rounded-xs border-2 border-[#DDD6FE] shadow-md">
            <Mail className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#EF4444] rounded-full border border-white" />
          </div>
        );
      case "terminal":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-[#050505] rounded-xs border-2 border-[#333333] shadow-md">
            <Terminal className="w-7 h-7 text-[#00E599]" />
            <span className="absolute bottom-1 right-1 text-[7px] text-[#00E599] font-mono">
              C:\&gt;
            </span>
          </div>
        );
      case "browser":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#1E3A8A] to-[#172554] rounded-xs border-2 border-[#60A5FA] shadow-md">
            <Globe className="w-7 h-7 text-[#93C5FD]" />
            <span className="absolute -bottom-1 -right-1 text-[7px] bg-[#2563EB] text-white px-1 rounded-xs font-mono">
              WEB
            </span>
          </div>
        );
      case "audio":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#2E1065] to-[#1E0842] rounded-xs border-2 border-[#E9D5FF] shadow-md">
            <Music className="w-7 h-7 text-[#A855F7]" />
            <div className="absolute bottom-1 left-1.5 flex gap-0.5 items-end h-2">
              <span className="w-0.5 h-1.5 bg-[#00E599]" />
              <span className="w-0.5 h-2 bg-[#F59E0B]" />
              <span className="w-0.5 h-1 bg-[#EF4444]" />
            </div>
          </div>
        );
      case "trash":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#27272A] to-[#09090B] rounded-xs border-2 border-[#71717A] shadow-md">
            <Trash2 className="w-7 h-7 text-[#D4D4D8]" />
          </div>
        );
      case "settings":
        return (
          <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-b from-[#312E81] to-[#1E1B4B] rounded-xs border-2 border-[#818CF8] shadow-md">
            <Sliders className="w-7 h-7 text-[#C7D2FE]" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 flex items-center justify-center bg-[#1F1640] rounded-xs border-2 border-[#6D28D9]">
            <FolderGit2 className="w-7 h-7 text-white" />
          </div>
        );
    }
  };

  return (
    <motion.button
      type="button"
      id={`desktop-icon-${icon.id}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex flex-col items-center justify-start p-1 sm:p-1.5 rounded-xs w-full max-w-[84px] sm:max-w-none sm:w-[90px] text-center select-none cursor-pointer font-mono transition-all outline-none ${
        isSelected
          ? "bg-[#6D28D9]/40 border border-[#A78BFA] shadow-[0_0_12px_rgba(139,92,246,0.35)]"
          : "hover:bg-white/5 border border-transparent hover:border-white/10"
      }`}
      title={`${icon.label} (${icon.filename})`}
    >
      {/* Icon Artwork */}
      <div className="relative mb-1 sm:mb-1.5 drop-shadow-lg transition-transform group-hover:-translate-y-0.5">
        {renderIconGraphic()}
        {icon.isShortcut && (
          <span className="absolute bottom-0 left-0 bg-white text-black p-0.5 rounded-xs text-[7px] border border-black shadow">
            ↗
          </span>
        )}
      </div>

      {/* Label with Retro Shadow */}
      <span
        className={`text-[10px] sm:text-[11px] leading-tight font-medium line-clamp-2 px-1 rounded-xs transition-colors ${
          isSelected
            ? "bg-[#6D28D9] text-white font-bold"
            : "text-white text-shadow-retro group-hover:text-[#DDD6FE]"
        }`}
      >
        {icon.label}
      </span>

      {/* Badge Tag if present */}
      {icon.badge && (
        <span className="mt-1 text-[8px] tracking-wider px-1 py-0.2 bg-[#1A1035] border border-[#3E2778] text-[#C4B5FD] rounded-xs font-bold uppercase scale-90">
          {icon.badge}
        </span>
      )}
    </motion.button>
  );
}
