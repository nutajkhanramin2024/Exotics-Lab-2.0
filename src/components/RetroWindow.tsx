import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Square, X, Terminal, Disc } from "lucide-react";
import { playRetroClick, playWindowBeep } from "../utils/audio";

interface RetroWindowProps {
  id?: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerAccent?: "purple" | "dark" | "silver";
  statusText?: string;
  statusSegments?: { label: string; value: string }[];
  menuItems?: { label: string; onClick?: () => void }[];
  collapsible?: boolean;
  initialCollapsed?: boolean;
  badge?: string;
}

export default function RetroWindow({
  id,
  title,
  icon,
  children,
  className = "",
  headerAccent = "purple",
  statusText,
  statusSegments,
  menuItems,
  collapsible = true,
  initialCollapsed = false,
  badge
}: RetroWindowProps) {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleCollapse = () => {
    if (!collapsible) return;
    playRetroClick();
    setIsCollapsed(!isCollapsed);
  };

  const handleMaximize = () => {
    playRetroClick();
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    playWindowBeep();
    setIsCollapsed(true);
  };

  return (
    <div
      id={id}
      className={`retro-bevel-out bg-[#0D0A1A] rounded-xs transition-all duration-200 overflow-hidden ${
        isMaximized ? "scale-[1.01] shadow-2xl ring-2 ring-[#8B5CF6]/50" : ""
      } ${className}`}
    >
      {/* Titlebar */}
      <div
        onDoubleClick={toggleCollapse}
        className={`px-3 py-2 select-none flex items-center justify-between cursor-default ${
          headerAccent === "purple"
            ? "retro-titlebar-purple text-white"
            : headerAccent === "silver"
            ? "bg-gradient-to-r from-[#2A2440] via-[#3C325C] to-[#251F38] text-white border-b border-black"
            : "retro-titlebar-dark text-[#D6D2E8]"
        }`}
      >
        {/* Left: Icon & Window Name */}
        <div className="flex items-center gap-2 min-w-0 font-mono text-xs font-bold tracking-wider">
          <span className="text-white shrink-0 drop-shadow">
            {icon || <Terminal className="w-3.5 h-3.5 text-[#C4B5FD]" />}
          </span>
          <span className="truncate uppercase font-['JetBrains_Mono',monospace] text-[11px] sm:text-xs">
            {title}
          </span>
          {badge && (
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] bg-black/40 border border-white/20 text-[#A78BFA] rounded-xs font-mono">
              {badge}
            </span>
          )}
        </div>

        {/* Right: Window Controls (Min, Max, Close) */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {collapsible && (
            <button
              onClick={toggleCollapse}
              aria-label="Minimize Window"
              className="w-5 h-4.5 bg-[#1F1738] hover:bg-[#34275E] active:bg-[#120D22] border-t border-l border-white/40 border-r border-b border-black flex items-center justify-center text-white text-[10px] cursor-pointer shadow-xs transition-colors"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
          )}
          <button
            onClick={handleMaximize}
            aria-label="Maximize Window"
            className="w-5 h-4.5 bg-[#1F1738] hover:bg-[#34275E] active:bg-[#120D22] border-t border-l border-white/40 border-r border-b border-black flex items-center justify-center text-white text-[10px] cursor-pointer shadow-xs transition-colors"
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={handleClose}
            aria-label="Close Window"
            className="w-5 h-4.5 bg-[#6B21A8] hover:bg-[#DC2626] active:bg-[#7F1D1D] border-t border-l border-white/40 border-r border-b border-black flex items-center justify-center text-white text-[10px] cursor-pointer shadow-xs transition-colors"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>

      {/* Optional Menu Bar (File, Edit, View, Help) */}
      {menuItems && menuItems.length > 0 && !isCollapsed && (
        <div className="px-3 py-1 bg-[#140F29] border-b border-[#261E42] flex items-center gap-4 text-[11px] font-mono text-[#A8A2C2] select-none">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                playRetroClick();
                if (item.onClick) item.onClick();
                setActiveMenu(activeMenu === item.label ? null : item.label);
              }}
              className={`hover:text-white px-1.5 py-0.5 rounded-xs cursor-pointer transition-colors ${
                activeMenu === item.label ? "bg-[#372A60] text-white" : ""
              }`}
            >
              <span className="underline decoration-white/40 decoration-1 underline-offset-2">
                {item.label[0]}
              </span>
              {item.label.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area with Retro Inset Bevel */}
      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="p-3 sm:p-5"
          >
            <div className="retro-bevel-in bg-[#080612] p-4 sm:p-6 text-[#E2DFED]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      {(statusText || statusSegments) && !isCollapsed && (
        <div className="px-3 py-1.5 bg-[#120D24] border-t border-[#231A3D] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#8C86A8]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span>{statusText || "EXOTICS LAB OS // ACTIVE"}</span>
          </div>

          {statusSegments && (
            <div className="flex items-center gap-3">
              {statusSegments.map((seg, i) => (
                <div
                  key={i}
                  className="px-2 py-0.5 bg-[#090614] border border-[#2B2048] rounded-xs text-[#B6AFD4]"
                >
                  <span className="text-[#6D638F] mr-1">{seg.label}:</span>
                  <span className="font-semibold text-white">{seg.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
