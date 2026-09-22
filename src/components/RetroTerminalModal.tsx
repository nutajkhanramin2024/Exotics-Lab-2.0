import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion } from "motion/react";
import { Terminal, Send, X, CornerDownLeft, Sparkles } from "lucide-react";
import { playRetroClick, playWindowBeep } from "../utils/audio";

interface RetroTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function RetroTerminalModal({
  isOpen,
  onClose,
  onNavigate
}: RetroTerminalModalProps) {
  const [history, setHistory] = useState<Array<{ cmd: string; out: string | string[] }>>([
    {
      cmd: "system --init",
      out: [
        "EXOTICS LAB COMMAND INTERPRETER [VERSION 2000.4.1]",
        "(C) 2026 EXOTICS LAB — ALL RIGHTS RESERVED.",
        "",
        "Available commands: 'work', 'founders', 'arch', 'contact', 'matrix', 'clear', 'help'"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    playRetroClick();
    const cmd = input.trim().toLowerCase();
    let out: string | string[] = "";

    switch (cmd) {
      case "help":
        out = [
          "EXOTICS LAB CLI COMMANDS:",
          "  work       - Jump to Selected Work (IEP Unlocked, InventorsHub, Type-Z)",
          "  founders   - View profiles for Nuraj Khan Ramin & Aditya Kumar Roy",
          "  arch       - Inspect Studio Architecture (Engineering, Applied AI, Labs)",
          "  contact    - Open Direct Transmission channel",
          "  matrix     - Display technical telemetry stream",
          "  status     - Show server & operational health",
          "  clear      - Clear terminal screen history",
          "  exit       - Close command prompt"
        ];
        break;
      case "work":
      case "projects":
        out = "Navigating to Selected Work archive...";
        setTimeout(() => {
          onClose();
          onNavigate("work");
        }, 600);
        break;
      case "founders":
      case "team":
        out = "Navigating to Founder Profiles...";
        setTimeout(() => {
          onClose();
          onNavigate("team");
        }, 600);
        break;
      case "arch":
      case "about":
        out = "Navigating to Studio Architecture...";
        setTimeout(() => {
          onClose();
          onNavigate("about");
        }, 600);
        break;
      case "contact":
        out = "Initiating transmission protocol dialog...";
        setTimeout(() => {
          onClose();
          onNavigate("contact");
        }, 600);
        break;
      case "status":
        out = [
          "SYSTEM TELEMETRY [OK]",
          "  CORE ENGINE: ONLINE (100% UPTIME)",
          "  NODE: DHAKA_PRIMARY_CLUSTER [23.81° N, 90.41° E]",
          "  ACTIVE PRODUCTS: 3 SHIPPED & MONITORED",
          "  SECURITY PROTOCOL: ENCRYPTED HTTPS/WSS"
        ];
        break;
      case "matrix":
        out = [
          "01000101 01011000 01001111 01010100 01001001 01000011 01010011",
          ">> EXOTICS LAB IS ACTIVELY PROTOTYPING FUTURE INFRASTRUCTURE",
          "============================================================"
        ];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      default:
        out = `'${cmd}' is not recognized as an internal command. Type 'help' for a list of directives.`;
    }

    setHistory((prev) => [...prev, { cmd: input, out }]);
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-2xl retro-bevel-out bg-[#070512] rounded-xs overflow-hidden shadow-2xl"
      >
        {/* Titlebar */}
        <div className="retro-titlebar-purple px-3 py-1.5 flex items-center justify-between text-white text-xs font-bold">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#DDD6FE]" />
            <span>C:\EXOTICS\SYSTEM\EXOTICS_CMD.EXE</span>
          </div>
          <button
            onClick={() => {
              playWindowBeep();
              onClose();
            }}
            className="w-5 h-4.5 bg-[#6B21A8] hover:bg-[#DC2626] border-t border-l border-white/40 border-r border-b border-black flex items-center justify-center text-white text-[10px] cursor-pointer"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 bg-[#05030A] text-[#C4B5FD] text-xs h-80 overflow-y-auto font-mono space-y-3">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-[#8B5CF6]">EXOTICS:\&gt;</span>
                <span>{item.cmd}</span>
              </div>
              {Array.isArray(item.out) ? (
                <div className="space-y-0.5 text-[#A78BFA] pl-4">
                  {item.out.map((line, lIdx) => (
                    <div key={lIdx}>{line}</div>
                  ))}
                </div>
              ) : (
                <div className="text-[#A78BFA] pl-4">{item.out}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Strip */}
        <form
          onSubmit={handleCommand}
          className="border-t border-[#261A47] bg-[#0E0921] p-2.5 flex items-center gap-2"
        >
          <span className="text-[#8B5CF6] text-xs font-bold font-mono pl-1">
            EXOTICS:\&gt;
          </span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type command ('help', 'work', 'founders', 'contact')..."
            className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder-[#6B5E8C]"
          />
          <button
            type="submit"
            className="retro-btn px-3 py-1 text-white text-[11px] font-mono flex items-center gap-1 cursor-pointer"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3 h-3 text-[#A78BFA]" />
          </button>
        </form>

        {/* Quick Clickable Suggestions */}
        <div className="bg-[#0A0617] px-3 py-1.5 border-t border-[#1C1338] flex flex-wrap gap-2 text-[10px] text-[#8C7FA8]">
          <span>QUICK DIRECTIVES:</span>
          {["work", "founders", "arch", "contact", "status"].map((quick) => (
            <button
              key={quick}
              onClick={() => {
                setInput(quick);
              }}
              className="text-[#DDD6FE] hover:text-white underline cursor-pointer"
            >
              [{quick}]
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
