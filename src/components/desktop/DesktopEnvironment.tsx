import { useState, useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Volume2,
  VolumeX,
  Tv,
  RotateCcw,
  Power,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { WindowId, WallpaperId, WindowInstance, DesktopIconData } from "../../types/desktop";
import { DESKTOP_ICONS } from "../../data/desktopIcons";
import DesktopIcon from "./DesktopIcon";
import DesktopWindow from "./DesktopWindow";

// Sub-window views
import WelcomeGuideView from "./views/WelcomeGuideView";
import ProjectsView from "./views/ProjectsView";
import FoundersView from "./views/FoundersView";
import ManifestoView from "./views/ManifestoView";
import LabView from "./views/LabView";
import ProcessView from "./views/ProcessView";
import TelemetryView from "./views/TelemetryView";
import ContactView from "./views/ContactView";
import TerminalView from "./views/TerminalView";
import BrowserView from "./views/BrowserView";
import AudioPlayerView from "./views/AudioPlayerView";
import TrashView from "./views/TrashView";
import SettingsView from "./views/SettingsView";

import {
  playRetroClick,
  playStartupChime,
  playWindowBeep,
  toggleSound,
  isSoundEnabled
} from "../../utils/audio";

export default function DesktopEnvironment() {
  const [selectedIconId, setSelectedIconId] = useState<WindowId | null>(null);
  const [wallpaper, setWallpaper] = useState<WallpaperId>("exotics-purple");
  const [crtActive, setCrtActive] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean }>({
    x: 0,
    y: 0,
    isOpen: false
  });
  const [time, setTime] = useState("");
  const [isRebooting, setIsRebooting] = useState(false);

  // Initial Window Definitions
  const [windows, setWindows] = useState<Record<WindowId, WindowInstance>>({
    welcome: {
      id: "welcome",
      title: "WELCOME_GUIDE.HLP - Exotics Lab 2000",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 32, y: 32 },
      size: { width: 680, height: 560 },
      badge: "START HERE",
      statusText: "WELCOME // SYSTEM OVERVIEW & DIRECTORY"
    },
    projects: {
      id: "projects",
      title: "SELECTED_WORK.EXE - Exotics Portfolio",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 90,
      position: { x: 64, y: 48 },
      size: { width: 840, height: 600 },
      badge: "LIVE APPS",
      statusText: "DEPLOYMENT ARCHIVE // 3 PRODUCTS LOADED"
    },
    team: {
      id: "team",
      title: "PERSONNEL_REGISTRY.SYS - Founders & Leadership",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 85,
      position: { x: 96, y: 64 },
      size: { width: 780, height: 580 },
      badge: "DHAKA HQ",
      statusText: "VERIFIED FOUNDERS // DIRECT REACHOUT"
    },
    manifesto: {
      id: "manifesto",
      title: "README_MANIFESTO.TXT - Notepad",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 80,
      position: { x: 128, y: 80 },
      size: { width: 720, height: 540 },
      badge: "THESIS",
      statusText: "RATIFIED CANONICAL MANIFESTO // UTF-8"
    },
    lab: {
      id: "lab",
      title: "LAB_PILLARS.EXE - Studio Architecture",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 75,
      position: { x: 80, y: 70 },
      size: { width: 780, height: 540 },
      badge: "NODES",
      statusText: "3/3 HARDWARE CHASSIS SYNCHRONIZED"
    },
    process: {
      id: "process",
      title: "DEPLOY_WIZARD.EXE - Engineering Methodology",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 70,
      position: { x: 110, y: 85 },
      size: { width: 720, height: 520 },
      badge: "PIPELINE",
      statusText: "5 STAGES HYPOTHESIS TO PRODUCTION"
    },
    telemetry: {
      id: "telemetry",
      title: "TELEMETRY_MONITOR.SYS - Live Pulse",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 65,
      position: { x: 140, y: 95 },
      size: { width: 740, height: 500 },
      badge: "LIVE FEED",
      statusText: "POLLING STATUS // 1000MS INTERVAL"
    },
    contact: {
      id: "contact",
      title: "CONTACT_TRANSMISSION.EXE - Direct Mail Client",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 60,
      position: { x: 160, y: 110 },
      size: { width: 760, height: 540 },
      badge: "MAILTO",
      statusText: "RECIPIENT: lab.exotics.com@gmail.com"
    },
    terminal: {
      id: "terminal",
      title: "CMD.EXE - Exotics Command Prompt",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 55,
      position: { x: 70, y: 60 },
      size: { width: 680, height: 460 },
      badge: "MS-DOS",
      statusText: "C:\\EXOTICS> TYPE HELP"
    },
    browser: {
      id: "browser",
      title: "EXOTICS_EXPLORER.EXE - World Wide Web",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 50,
      position: { x: 50, y: 40 },
      size: { width: 860, height: 600 },
      badge: "HTTP/2",
      statusText: "SSL SECURE // PORT 443"
    },
    audio: {
      id: "audio",
      title: "WINAMP.EXE - Synth Equalizer",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 45,
      position: { x: 180, y: 120 },
      size: { width: 560, height: 440 },
      badge: "AUDIO",
      statusText: "SYNTHESIZER // DHAKA LOFI"
    },
    trash: {
      id: "trash",
      title: "RECYCLE_BIN - Discarded Vaporware",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 40,
      position: { x: 200, y: 130 },
      size: { width: 640, height: 440 },
      badge: "0 BYTES",
      statusText: "ALL SLIDE DECKS PERMANENTLY ERASED"
    },
    settings: {
      id: "settings",
      title: "CONTROL_PANEL.EXE - System Properties",
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 35,
      position: { x: 120, y: 90 },
      size: { width: 700, height: 540 },
      badge: "CONFIG",
      statusText: "PREFERENCES & WALLPAPERS"
    }
  });

  const [topZ, setTopZ] = useState(110);

  // Time ticker
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

  // Window Focus & Open Management
  const focusWindow = (id: WindowId) => {
    setWindows((prev) => {
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ
        }
      };
    });
  };

  const openWindow = (id: WindowId) => {
    playRetroClick();
    focusWindow(id);
    setSelectedIconId(id);
    setStartMenuOpen(false);
  };

  const closeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false
      }
    }));
  };

  const minimizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
  };

  const toggleMaximizeWindow = (id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized
      }
    }));
  };

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    if (next) playStartupChime();
  };

  const handleCrtToggle = () => {
    playRetroClick();
    setCrtActive(!crtActive);
  };

  const handleReboot = () => {
    playWindowBeep();
    setIsRebooting(true);
    setStartMenuOpen(false);
    setTimeout(() => {
      setIsRebooting(false);
      playStartupChime();
    }, 1800);
  };

  const handleDesktopContextMenu = (e: ReactMouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true
    });
  };

  const closeContextMenu = () => {
    if (contextMenu.isOpen) {
      setContextMenu((prev) => ({ ...prev, isOpen: false }));
    }
  };

  // Get Wallpaper background class
  const getWallpaperStyle = () => {
    switch (wallpaper) {
      case "midnight-dhaka":
        return "bg-gradient-to-br from-[#050D1A] via-[#02060F] to-[#010307]";
      case "classic-teal":
        return "bg-[#008080]";
      case "matrix-cyber":
        return "bg-gradient-to-br from-[#021A0F] via-[#010D07] to-[#000502]";
      case "synthwave-grid":
        return "bg-gradient-to-br from-[#2A0845] via-[#1B003A] to-[#0D001A]";
      case "exotics-purple":
      default:
        return "bg-gradient-to-br from-[#10072B] via-[#080414] to-[#040209]";
    }
  };

  return (
    <div
      id="exotics-desktop-screen"
      onClick={() => {
        setSelectedIconId(null);
        setStartMenuOpen(false);
        closeContextMenu();
      }}
      onContextMenu={handleDesktopContextMenu}
      className={`relative w-screen h-screen overflow-hidden select-none font-mono ${getWallpaperStyle()} ${
        crtActive ? "crt-scanlines" : ""
      }`}
    >
      {/* Reboot Simulation Overlay */}
      <AnimatePresence>
        {isRebooting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-999 bg-black flex flex-col items-center justify-center font-mono text-[#00E599] space-y-4 text-xs"
          >
            <div className="w-12 h-12 border-2 border-[#00E599] border-t-transparent rounded-full animate-spin" />
            <div className="text-base font-bold tracking-widest uppercase">
              REBOOTING EXOTICS LAB OS 2000...
            </div>
            <div className="text-[#8E85AA]">INITIALIZING HARDWARE NODES & DHAKA GATEWAY</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Wallpaper Grid Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#8B5CF612_1px,transparent_1px),linear-gradient(to_bottom,#8B5CF612_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Studio Center Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-10">
        <span className="font-['Syne',sans-serif] text-4xl sm:text-6xl font-extrabold uppercase tracking-widest text-white">
          EXOTICS LAB
        </span>
        <span className="text-xs font-mono text-[#C4B5FD] tracking-[0.3em] uppercase mt-2">
          DHAKA HQ // 2000 PRO
        </span>
      </div>

      {/* Desktop Icons Grid (Authentic Compact Retro Desktop Flow) */}
      <div className="relative z-10 p-3 sm:p-4 grid grid-cols-4 xs:grid-cols-4 sm:flex sm:flex-col sm:flex-wrap sm:content-start sm:items-start gap-2 sm:gap-x-3 sm:gap-y-2 sm:h-[calc(100vh-60px)] sm:w-fit overflow-y-auto sm:overflow-visible">
        {DESKTOP_ICONS.map((icon) => (
          <DesktopIcon
            key={icon.id}
            icon={icon}
            isSelected={selectedIconId === icon.id}
            onSelect={() => setSelectedIconId(icon.id)}
            onOpen={() => openWindow(icon.id)}
          />
        ))}
      </div>

      {/* Windows Manager Layer (Floating / Draggable Windows) */}
      <div className="relative z-20">
        {/* 1. Welcome Guide Window */}
        <DesktopWindow
          window={windows.welcome}
          onFocus={() => focusWindow("welcome")}
          onClose={() => closeWindow("welcome")}
          onMinimize={() => minimizeWindow("welcome")}
          onMaximize={() => toggleMaximizeWindow("welcome")}
          icon={<HelpCircle className="w-4 h-4 text-[#93C5FD]" />}
        >
          <WelcomeGuideView onOpenWindow={openWindow} />
        </DesktopWindow>

        {/* 2. Selected Work Window */}
        <DesktopWindow
          window={windows.projects}
          onFocus={() => focusWindow("projects")}
          onClose={() => closeWindow("projects")}
          onMinimize={() => minimizeWindow("projects")}
          onMaximize={() => toggleMaximizeWindow("projects")}
          icon={<FolderGit2 className="w-4 h-4 text-[#C4B5FD]" />}
        >
          <ProjectsView />
        </DesktopWindow>

        {/* 3. Founders & Team Window */}
        <DesktopWindow
          window={windows.team}
          onFocus={() => focusWindow("team")}
          onClose={() => closeWindow("team")}
          onMinimize={() => minimizeWindow("team")}
          onMaximize={() => toggleMaximizeWindow("team")}
          icon={<Users className="w-4 h-4 text-[#DDD6FE]" />}
        >
          <FoundersView />
        </DesktopWindow>

        {/* 4. Manifesto Window */}
        <DesktopWindow
          window={windows.manifesto}
          onFocus={() => focusWindow("manifesto")}
          onClose={() => closeWindow("manifesto")}
          onMinimize={() => minimizeWindow("manifesto")}
          onMaximize={() => toggleMaximizeWindow("manifesto")}
          icon={<FileText className="w-4 h-4 text-[#A78BFA]" />}
        >
          <ManifestoView />
        </DesktopWindow>

        {/* 5. Studio Architecture Window */}
        <DesktopWindow
          window={windows.lab}
          onFocus={() => focusWindow("lab")}
          onClose={() => closeWindow("lab")}
          onMinimize={() => minimizeWindow("lab")}
          onMaximize={() => toggleMaximizeWindow("lab")}
          icon={<Cpu className="w-4 h-4 text-[#00E599]" />}
        >
          <LabView />
        </DesktopWindow>

        {/* 6. Process Wizard Window */}
        <DesktopWindow
          window={windows.process}
          onFocus={() => focusWindow("process")}
          onClose={() => closeWindow("process")}
          onMinimize={() => minimizeWindow("process")}
          onMaximize={() => toggleMaximizeWindow("process")}
          icon={<Compass className="w-4 h-4 text-[#F59E0B]" />}
        >
          <ProcessView />
        </DesktopWindow>

        {/* 7. Live Telemetry Window */}
        <DesktopWindow
          window={windows.telemetry}
          onFocus={() => focusWindow("telemetry")}
          onClose={() => closeWindow("telemetry")}
          onMinimize={() => minimizeWindow("telemetry")}
          onMaximize={() => toggleMaximizeWindow("telemetry")}
          icon={<Activity className="w-4 h-4 text-[#00E599]" />}
        >
          <TelemetryView />
        </DesktopWindow>

        {/* 8. Transmit Inquiry Window */}
        <DesktopWindow
          window={windows.contact}
          onFocus={() => focusWindow("contact")}
          onClose={() => closeWindow("contact")}
          onMinimize={() => minimizeWindow("contact")}
          onMaximize={() => toggleMaximizeWindow("contact")}
          icon={<Mail className="w-4 h-4 text-[#DDD6FE]" />}
        >
          <ContactView />
        </DesktopWindow>

        {/* 9. Terminal Window */}
        <DesktopWindow
          window={windows.terminal}
          onFocus={() => focusWindow("terminal")}
          onClose={() => closeWindow("terminal")}
          onMinimize={() => minimizeWindow("terminal")}
          onMaximize={() => toggleMaximizeWindow("terminal")}
          icon={<Terminal className="w-4 h-4 text-[#00E599]" />}
        >
          <TerminalView onOpenWindow={openWindow} />
        </DesktopWindow>

        {/* 10. Browser Window */}
        <DesktopWindow
          window={windows.browser}
          onFocus={() => focusWindow("browser")}
          onClose={() => closeWindow("browser")}
          onMinimize={() => minimizeWindow("browser")}
          onMaximize={() => toggleMaximizeWindow("browser")}
          icon={<Globe className="w-4 h-4 text-[#93C5FD]" />}
        >
          <BrowserView />
        </DesktopWindow>

        {/* 11. Audio Player Window */}
        <DesktopWindow
          window={windows.audio}
          onFocus={() => focusWindow("audio")}
          onClose={() => closeWindow("audio")}
          onMinimize={() => minimizeWindow("audio")}
          onMaximize={() => toggleMaximizeWindow("audio")}
          icon={<Music className="w-4 h-4 text-[#A855F7]" />}
        >
          <AudioPlayerView />
        </DesktopWindow>

        {/* 12. Recycle Bin Window */}
        <DesktopWindow
          window={windows.trash}
          onFocus={() => focusWindow("trash")}
          onClose={() => closeWindow("trash")}
          onMinimize={() => minimizeWindow("trash")}
          onMaximize={() => toggleMaximizeWindow("trash")}
          icon={<Trash2 className="w-4 h-4 text-[#D4D4D8]" />}
        >
          <TrashView />
        </DesktopWindow>

        {/* 13. Settings / Control Panel Window */}
        <DesktopWindow
          window={windows.settings}
          onFocus={() => focusWindow("settings")}
          onClose={() => closeWindow("settings")}
          onMinimize={() => minimizeWindow("settings")}
          onMaximize={() => toggleMaximizeWindow("settings")}
          icon={<Sliders className="w-4 h-4 text-[#C7D2FE]" />}
        >
          <SettingsView
            currentWallpaper={wallpaper}
            onSelectWallpaper={setWallpaper}
            crtActive={crtActive}
            onToggleCrt={handleCrtToggle}
          />
        </DesktopWindow>
      </div>

      {/* Desktop Context Menu (Right Click) */}
      <AnimatePresence>
        {contextMenu.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              top: `${Math.min(window.innerHeight - 240, contextMenu.y)}px`,
              left: `${Math.min(window.innerWidth - 220, contextMenu.x)}px`
            }}
            onClick={(e) => e.stopPropagation()}
            className="fixed z-90 w-52 retro-bevel-out bg-[#120B29] border border-[#2D1E54] rounded-xs shadow-2xl p-1 font-mono text-xs text-[#D8D2EB]"
          >
            <button
              onClick={() => {
                openWindow("projects");
                closeContextMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#6D28D9] hover:text-white rounded-xs text-left cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Open Selected Work</span>
            </button>

            <button
              onClick={() => {
                openWindow("team");
                closeContextMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#6D28D9] hover:text-white rounded-xs text-left cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Meet the Founders</span>
            </button>

            <button
              onClick={() => {
                openWindow("manifesto");
                closeContextMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#6D28D9] hover:text-white rounded-xs text-left cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Read Manifesto</span>
            </button>

            <div className="h-px bg-[#26184A] my-1" />

            <button
              onClick={() => {
                handleCrtToggle();
                closeContextMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#6D28D9] hover:text-white rounded-xs text-left cursor-pointer"
            >
              <Tv className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>CRT Scanlines ({crtActive ? "ON" : "OFF"})</span>
            </button>

            <button
              onClick={() => {
                openWindow("settings");
                closeContextMenu();
              }}
              className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#6D28D9] hover:text-white rounded-xs text-left cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>Desktop Settings</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Menu Popup */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-12 left-2 right-2 sm:right-auto z-80 w-auto max-w-[calc(100vw-16px)] sm:w-84 retro-bevel-out bg-[#100B24] border border-[#2D2152] rounded-xs shadow-2xl overflow-hidden font-mono text-xs"
          >
            <div className="flex bg-[#0A0717]">
              {/* Vertical Side Strip */}
              <div className="w-8 sm:w-10 bg-gradient-to-b from-[#6D28D9] via-[#4C1D95] to-[#1E1242] p-1.5 sm:p-2 flex flex-col justify-between items-center text-white border-r border-[#342461] select-none">
                <span className="[writing-mode:vertical-rl] rotate-180 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase font-['Syne',sans-serif] text-purple-200">
                  EXOTICS LAB 2000
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
              </div>

              {/* Menu Items List */}
              <div className="flex-1 p-2 space-y-1 bg-[#100B24] max-h-[70vh] sm:max-h-96 overflow-y-auto overscroll-contain">
                {/* Header User Badge */}
                <div className="px-3 py-2 bg-[#191136] border border-[#2B1D54] rounded-xs mb-2 flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#2E1E5E] rounded-xs border border-[#48338C] flex items-center justify-center font-bold text-white text-xs shrink-0">
                    EX
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-white text-[11px] truncate">FOUNDER WORKSTATION</div>
                    <div className="text-[9px] text-[#A78BFA] truncate">Dhaka HQ // Verified Host</div>
                  </div>
                </div>

                {/* Programs List */}
                <button
                  onClick={() => openWindow("welcome")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-[#93C5FD] shrink-0" />
                  <span className="truncate">Welcome Guide</span>
                </button>

                <button
                  onClick={() => openWindow("projects")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <FolderGit2 className="w-4 h-4 text-[#C4B5FD] shrink-0" />
                  <span className="truncate">Selected Work</span>
                </button>

                <button
                  onClick={() => openWindow("team")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-[#DDD6FE] shrink-0" />
                  <span className="truncate">Founders & Team</span>
                </button>

                <button
                  onClick={() => openWindow("manifesto")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <span className="truncate">Manifesto (README.TXT)</span>
                </button>

                <button
                  onClick={() => openWindow("lab")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Cpu className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span className="truncate">Studio Architecture</span>
                </button>

                <button
                  onClick={() => openWindow("contact")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#DDD6FE] shrink-0" />
                  <span className="truncate">Transmit Inquiry</span>
                </button>

                <button
                  onClick={() => openWindow("terminal")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-white hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Terminal className="w-4 h-4 text-[#00E599] shrink-0" />
                  <span className="truncate">Command Prompt (CMD)</span>
                </button>

                <div className="h-px bg-[#26184A] my-1" />

                <button
                  onClick={() => openWindow("settings")}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-[#C4B5FD] hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Sliders className="w-4 h-4 shrink-0" />
                  <span className="truncate">Control Panel</span>
                </button>

                <button
                  onClick={handleReboot}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-[#EF4444] hover:bg-[#34206B] active:bg-[#4C1D95] rounded-xs transition-colors cursor-pointer"
                >
                  <Power className="w-4 h-4 shrink-0" />
                  <span className="truncate">Restart Workstation...</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retro Bottom Taskbar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 h-11 bg-[#100B24] border-t-2 border-[#382668] retro-bevel-out z-70 flex items-center justify-between px-2 text-xs font-mono select-none"
      >
        {/* Left Side: START Button & Quick Launch */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {/* Authentic START Button */}
          <button
            type="button"
            onClick={() => {
              playRetroClick();
              setStartMenuOpen(!startMenuOpen);
            }}
            className={`px-3 py-1.5 flex items-center gap-2 rounded-xs font-bold uppercase tracking-wider text-xs transition-all cursor-pointer ${
              startMenuOpen
                ? "bg-[#6D28D9] border-t border-l border-black border-r border-b border-white text-white shadow-inner"
                : "retro-btn-accent"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#00E599] shrink-0" />
            <span className="font-['Syne',sans-serif] font-extrabold text-white text-xs">
              START
            </span>
          </button>

          {/* Quick Launch Icons */}
          <div className="hidden sm:flex items-center gap-1 px-1 border-r border-[#2B1D54] mr-1">
            <button
              onClick={() => openWindow("projects")}
              className="p-1 hover:bg-[#201447] rounded-xs text-[#C4B5FD] hover:text-white cursor-pointer"
              title="Selected Work"
            >
              <FolderGit2 className="w-4 h-4 text-[#8B5CF6]" />
            </button>
            <button
              onClick={() => openWindow("team")}
              className="p-1 hover:bg-[#201447] rounded-xs text-[#C4B5FD] hover:text-white cursor-pointer"
              title="Founders & Team"
            >
              <Users className="w-4 h-4 text-[#DDD6FE]" />
            </button>
            <button
              onClick={() => openWindow("contact")}
              className="p-1 hover:bg-[#201447] rounded-xs text-[#C4B5FD] hover:text-white cursor-pointer"
              title="Transmit Inquiry"
            >
              <Mail className="w-4 h-4 text-[#8B5CF6]" />
            </button>
            <button
              onClick={() => openWindow("terminal")}
              className="p-1 hover:bg-[#201447] rounded-xs text-[#00E599] cursor-pointer"
              title="Command Prompt"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>

          {/* Open Windows Taskbar Item Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto flex-1 max-w-2xl py-0.5">
            {(Object.values(windows) as WindowInstance[])
              .filter((w) => w.isOpen)
              .map((w) => {
                const isActive = !w.isMinimized && w.zIndex === topZ;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      playRetroClick();
                      if (isActive) {
                        minimizeWindow(w.id);
                      } else {
                        focusWindow(w.id);
                      }
                    }}
                    className={`px-2.5 py-1 rounded-xs flex items-center gap-1.5 text-[11px] truncate max-w-44 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#25154F] border-t border-l border-black border-r border-b border-purple-400 text-white font-bold shadow-inner"
                        : "retro-btn text-[#A78BFA] hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6] shrink-0" />
                    <span className="truncate">{w.id.toUpperCase()}</span>
                  </button>
                );
              })}
          </div>
        </div>

        {/* Right Side: System Tray */}
        <div className="flex items-center gap-2 pl-2 bg-[#090615] px-3 py-1 border border-[#231A42] rounded-xs shrink-0 text-[11px]">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="text-[#A78BFA] hover:text-white cursor-pointer p-0.5"
            title={soundOn ? "Mute Retro Audio" : "Enable Retro Audio"}
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#00E599]" /> : <VolumeX className="w-3.5 h-3.5 text-[#EF4444]" />}
          </button>

          {/* CRT Toggle */}
          <button
            onClick={handleCrtToggle}
            className={`p-0.5 cursor-pointer ${crtActive ? "text-[#00E599]" : "text-[#8E85AA] hover:text-white"}`}
            title="Toggle CRT Scanlines"
          >
            <Tv className="w-3.5 h-3.5" />
          </button>

          {/* Location Badge */}
          <span className="hidden md:inline text-[9px] text-[#00E599] font-bold">
            DHAKA HQ
          </span>

          {/* Live Clock */}
          <span className="text-white font-mono text-[11px] font-bold">
            {time || "12:00:00 PM"}
          </span>
        </div>
      </div>
    </div>
  );
}
