import { motion } from "motion/react";
import { AlertCircle, Sparkles } from "lucide-react";
import RetroWindow from "./RetroWindow";

export default function PhilosophyQuote() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#070512] font-mono overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="philosophy-dialog-window"
          title="ALERT: CORE_CONVICTION // RATIFIED_THESIS"
          headerAccent="purple"
          badge="CANON"
          statusText="STATEMENT CONFIRMED // ALL PROTOCOLS DERIVED FROM THIS DIRECTIVE"
        >
          <div className="py-6 sm:py-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#180E38] border border-[#3C277D] rounded-xs text-xs uppercase tracking-widest text-[#DDD6FE]">
              <AlertCircle className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>EXOTICS LAB CONVICTION</span>
            </div>

            <blockquote className="font-['Syne',sans-serif] text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.15]">
              "The goal isn't to have more ideas. <br className="hidden sm:inline" />
              The goal is to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#8B5CF6]">
                build the ones
              </span>{" "}
              worth having."
            </blockquote>

            <div className="pt-2 flex items-center justify-center gap-3 text-[11px] text-[#8E85AA] uppercase tracking-widest">
              <span>EXOTICS LAB FOUNDER STATEMENT</span>
              <span>//</span>
              <span>EST. 2026 // DHAKA HQ</span>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
