import { motion } from "motion/react";
import { Cpu, HardDrive, ShieldCheck, X, Check, Globe, Terminal } from "lucide-react";
import { playWindowBeep, playRetroClick } from "../utils/audio";

interface AboutOsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOsModal({ isOpen, onClose }: AboutOsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-mono">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md retro-bevel-out bg-[#0E0A1E] rounded-xs overflow-hidden shadow-2xl"
      >
        {/* Titlebar */}
        <div className="retro-titlebar-purple px-3 py-1.5 flex items-center justify-between text-white text-xs font-bold">
          <span>SYSTEM PROPERTIES // EXOTICS LAB</span>
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

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs text-[#D8D2EB]">
          <div className="flex items-start gap-4 border-b border-[#251A44] pb-4">
            <div className="w-14 h-14 bg-[#1C1438] border border-[#3E2D73] rounded-xs flex items-center justify-center shrink-0 shadow-inner font-mono font-bold text-lg text-[#C4B5FD]">
              EX
            </div>
            <div>
              <h3 className="font-['Syne',sans-serif] text-base font-bold text-white uppercase tracking-wider">
                Exotics Lab OS
              </h3>
              <p className="text-[11px] text-[#A78BFA]">
                Release 2000.4 // Dhaka Cluster Edition
              </p>
              <p className="text-[10px] text-[#7E749C] mt-0.5">
                Copyright © 2026 Exotics Lab. All rights reserved.
              </p>
            </div>
          </div>

          {/* System Specs */}
          <div className="space-y-2 bg-[#080512] p-3 border border-[#221640] rounded-xs text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-[#887EA3] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                Operating Status:
              </span>
              <span className="text-white font-semibold">Active & Monitored</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#887EA3] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#8B5CF6]" />
                HQ Coordinates:
              </span>
              <span className="text-white">Dhaka [23.81° N, 90.41° E]</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#887EA3] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Leadership:
              </span>
              <span className="text-white">Nuraj Khan Ramin & Aditya Kumar Roy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#887EA3] flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Core Philosophy:
              </span>
              <span className="text-[#C4B5FD] italic">We Build What's Next</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                playRetroClick();
                onClose();
              }}
              className="retro-btn-accent px-5 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              OK
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
