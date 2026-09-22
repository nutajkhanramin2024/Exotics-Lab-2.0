import { useState, useRef, useEffect, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Square, X, Copy, Maximize2, Sparkles } from "lucide-react";
import { WindowInstance, WindowId } from "../../types/desktop";
import { playRetroClick, playWindowBeep } from "../../utils/audio";

interface DesktopWindowProps {
  window: WindowInstance;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  children: ReactNode;
  icon?: ReactNode;
}

export default function DesktopWindow({
  window,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  children,
  icon
}: DesktopWindowProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [position, setPosition] = useState(window.position);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: position.x,
    posY: position.y
  });

  // Check mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(globalThis.innerWidth < 640);
    };
    handleResize();
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  // Keep position in bounds on resize
  useEffect(() => {
    setPosition(window.position);
  }, [window.position]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    // Only drag with left click and when not clicking buttons and not on mobile
    if (e.button !== 0 || window.isMaximized || isMobile) return;

    onFocus();
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaY = moveEvent.clientY - dragStartRef.current.startY;

      const screenWidth = typeof globalThis.innerWidth !== "undefined" ? globalThis.innerWidth : 1024;
      const screenHeight = typeof globalThis.innerHeight !== "undefined" ? globalThis.innerHeight : 768;

      const newX = Math.max(10, Math.min(screenWidth - 200, dragStartRef.current.posX + deltaX));
      const newY = Math.max(10, Math.min(screenHeight - 100, dragStartRef.current.posY + deltaY));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  if (!window.isOpen || window.isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.15 }}
      style={{
        zIndex: window.zIndex,
        ...(isMobile || window.isMaximized
          ? {
              top: 4,
              left: 4,
              right: 4,
              bottom: 50,
              width: "auto",
              height: "auto",
              maxWidth: "calc(100vw - 8px)",
              maxHeight: "calc(100vh - 54px)"
            }
          : {
              top: `${Math.max(8, position.y)}px`,
              left: `${Math.max(8, position.x)}px`,
              width: `${window.size.width}px`,
              maxWidth: "calc(100vw - 16px)",
              maxHeight: "calc(100vh - 70px)"
            })
      }}
      onClick={onFocus}
      className={`fixed flex flex-col retro-bevel-out bg-[#0E0921] border border-[#2B1D54] rounded-xs shadow-2xl overflow-hidden select-text ${
        isDragging ? "select-none cursor-grabbing opacity-95" : ""
      }`}
    >
      {/* Authentic Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
        className={`retro-titlebar-purple flex items-center justify-between px-2.5 sm:px-3 py-1.5 shrink-0 select-none ${
          isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        {/* Title & Icon */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-white font-mono text-[11px] sm:text-xs font-bold truncate min-w-0 pr-1">
          {icon || <span className="w-2 h-2 rounded-full bg-[#00E599] shrink-0" />}
          <span className="truncate tracking-wide">{window.title}</span>
          {window.badge && (
            <span className="hidden md:inline text-[9px] bg-[#2E1463] text-purple-200 px-1.5 py-0.2 rounded-xs border border-purple-400/40 shrink-0">
              {window.badge}
            </span>
          )}
        </div>

        {/* Standard Window Control Buttons */}
        <div className="flex items-center gap-1 shrink-0 ml-1" onMouseDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playRetroClick();
              onMinimize();
            }}
            title="Minimize"
            className="w-6 h-6 sm:w-5 sm:h-5 bg-[#251847] hover:bg-[#3D2873] border border-[#48338C] text-white flex items-center justify-center rounded-xs text-[10px] cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>

          {!isMobile && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                playRetroClick();
                onMaximize();
              }}
              title={window.isMaximized ? "Restore" : "Maximize"}
              className="w-6 h-6 sm:w-5 sm:h-5 bg-[#251847] hover:bg-[#3D2873] border border-[#48338C] text-white flex items-center justify-center rounded-xs text-[10px] cursor-pointer"
            >
              {window.isMaximized ? <Copy className="w-2.5 h-2.5" /> : <Square className="w-2.5 h-2.5" />}
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playWindowBeep();
              onClose();
            }}
            title="Close"
            className="w-6 h-6 sm:w-5 sm:h-5 bg-[#831843] hover:bg-[#9F1239] border border-[#BE123C] text-white flex items-center justify-center rounded-xs text-[10px] cursor-pointer font-bold"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Window Body Viewport */}
      <div className="flex-1 overflow-y-auto overscroll-contain bg-[#0A0717]">
        {children}
      </div>

      {/* Window Status Bar */}
      <div className="bg-[#120B26] border-t border-[#231742] px-2.5 sm:px-3 py-1 flex items-center justify-between text-[10px] font-mono text-[#8E85AA] shrink-0 select-none gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] shrink-0" />
          <span className="truncate">{window.statusText || "READY // 100% NOMINAL"}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline">EXOTICS LAB</span>
          <span className="text-[#C4B5FD] text-[9px] sm:text-[10px]">OS 2000</span>
        </div>
      </div>
    </motion.div>
  );
}
