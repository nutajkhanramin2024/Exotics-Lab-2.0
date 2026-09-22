import { useState, useRef, useEffect, type FormEvent, type ReactNode } from "react";
import { Terminal, Send, Sparkles, CornerDownLeft } from "lucide-react";
import { playRetroClick, playWindowBeep } from "../../../utils/audio";
import { WindowId } from "../../../types/desktop";

interface TerminalViewProps {
  onOpenWindow?: (id: WindowId) => void;
}

interface CommandHistoryItem {
  cmd: string;
  output: string | ReactNode;
  time: string;
}

export default function TerminalView({ onOpenWindow }: TerminalViewProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      cmd: "init",
      output: (
        <div className="space-y-1">
          <div className="text-[#00E599] font-bold">
            EXOTICS LAB OS [Version 2001.4.120]
          </div>
          <div className="text-[#8E85AA]">
            (c) 2026 Exotics Lab Corporation. All rights reserved.
          </div>
          <div className="text-[#C4B5FD] pt-1">
            Type <span className="text-[#00E599] font-bold">help</span> or click suggestions below to inspect studio repositories.
          </div>
        </div>
      ),
      time: "00:00:01"
    }
  ]);

  const [matrixActive, setMatrixActive] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e?: FormEvent, customCmd?: string) => {
    if (e) e.preventDefault();
    const rawCmd = customCmd !== undefined ? customCmd : input;
    const cleanCmd = rawCmd.trim().toLowerCase();

    if (!cleanCmd) return;

    playRetroClick();
    const now = new Date().toLocaleTimeString("en-US", { hour12: false });
    let result: ReactNode = "";

    switch (cleanCmd) {
      case "help":
        result = (
          <div className="space-y-1 text-xs">
            <div className="text-white font-bold mb-1">AVAILABLE EXOTICS COMMANDS:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px]">
              <div><span className="text-[#00E599] font-bold">projects</span> - View all portfolio apps</div>
              <div><span className="text-[#00E599] font-bold">team</span> - List verified founders</div>
              <div><span className="text-[#00E599] font-bold">manifesto</span> - Read core thesis</div>
              <div><span className="text-[#00E599] font-bold">lab</span> - 3 architectural pillars</div>
              <div><span className="text-[#00E599] font-bold">contact</span> - Studio email channel</div>
              <div><span className="text-[#00E599] font-bold">matrix</span> - Toggle cyber stream</div>
              <div><span className="text-[#00E599] font-bold">clear</span> - Clear command buffer</div>
              <div><span className="text-[#00E599] font-bold">whoami</span> - Identity verification</div>
            </div>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="space-y-2 text-xs">
            <div className="text-[#C4B5FD] font-bold">EXOTICS PORTFOLIO REPOSITORIES:</div>
            <div className="space-y-1 text-[11px]">
              <div>01. <span className="text-white font-bold">IEP Unlocked</span> - Special Ed AI Platform [LIVE]</div>
              <div>02. <span className="text-white font-bold">InventorsHub</span> - Founder & Builder Ecosystem [LIVE]</div>
              <div>03. <span className="text-white font-bold">Type-Z</span> - Experimental Initiative [IN LAB]</div>
            </div>
          </div>
        );
        if (onOpenWindow) onOpenWindow("projects");
        break;

      case "team":
      case "founders":
        result = (
          <div className="space-y-1 text-xs">
            <div className="text-[#C4B5FD] font-bold">CORE PERSONNEL:</div>
            <div className="text-[11px] space-y-1">
               <div>• <span className="text-white font-bold">Aditya Kumar Roy</span> - Founder (Business Strategy, Technical engineering)</div>
              <div>• <span className="text-white font-bold">Nuraj Khan Ramin</span> - Founder (Product direction, experimentation)</div>
            </div>
          </div>
        );
        if (onOpenWindow) onOpenWindow("team");
        break;

      case "manifesto":
        result = (
          <div className="p-2 bg-[#120B26] border-l-2 border-[#8B5CF6] text-xs">
            "We believe the best products start as uncomfortable ideas. Ideas are cheap. Building isn't."
          </div>
        );
        if (onOpenWindow) onOpenWindow("manifesto");
        break;

      case "lab":
        result = (
          <div className="space-y-1 text-xs">
            <div>01. <span className="text-[#00E599] font-bold">BUILD</span> - Turn concepts into functional software.</div>
            <div>02. <span className="text-[#8B5CF6] font-bold">EXPERIMENT</span> - Test unconventional hypotheses.</div>
            <div>03. <span className="text-[#C4B5FD] font-bold">SHIP</span> - Real-world user feedback over endless planning.</div>
          </div>
        );
        if (onOpenWindow) onOpenWindow("lab");
        break;

      case "contact":
        result = (
          <div className="text-xs">
            Direct Email: <span className="text-[#00E599]">lab.exotics.com@gmail.com</span> (Dhaka HQ)
          </div>
        );
        if (onOpenWindow) onOpenWindow("contact");
        break;

      case "matrix":
        setMatrixActive(!matrixActive);
        result = matrixActive ? "Matrix stream offline." : "Matrix stream online. System decrypted.";
        break;

      case "whoami":
        result = "USER: GUEST_BUILDER // CLEARANCE: PUBLIC_EXPLORER // HOST: DHAKA_LAB_EDGE";
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        playWindowBeep();
        result = `Command not recognized: '${cleanCmd}'. Type 'help' for command listing.`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: rawCmd, output: result, time: now }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-[#05030A] font-mono text-xs text-[#00E599] p-4">
      {/* Output Console */}
      <div className="flex-1 overflow-y-auto space-y-3 pb-3">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] text-[#716891]">
              <span className="text-[#8B5CF6]">[{item.time}]</span>
              <span className="text-[#DDD6FE]">C:\EXOTICS&gt;</span>
              <span className="text-white font-bold">{item.cmd}</span>
            </div>
            <div className="pl-4 text-[#D8D2EB]">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Command Chips */}
      <div className="flex flex-wrap gap-1.5 py-2 border-t border-[#1C1438] shrink-0">
        {["help", "projects", "team", "manifesto", "lab", "contact", "matrix", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(undefined, cmd)}
            className="px-2 py-0.5 bg-[#120B26] hover:bg-[#23154C] border border-[#2D1C5C] text-[10px] text-[#C4B5FD] hover:text-white rounded-xs transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <form onSubmit={(e) => handleCommand(e)} className="flex items-center gap-2 pt-2 border-t border-[#1C1438] shrink-0">
        <span className="text-[#8B5CF6] font-bold">C:\EXOTICS&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command here (e.g. help, projects, team)..."
          className="flex-1 bg-transparent text-[#00E599] focus:outline-none font-mono text-xs placeholder:text-[#524970]"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-[#1A0E38] border border-[#3E2582] text-white hover:bg-[#2A165A] rounded-xs text-[10px] uppercase font-bold cursor-pointer"
        >
          EXEC
        </button>
      </form>
    </div>
  );
}
