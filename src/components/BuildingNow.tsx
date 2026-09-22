import { motion } from "motion/react";
import { ExternalLink, Terminal, Activity, Radio, Cpu } from "lucide-react";
import { CURRENTLY_BUILDING_LIST } from "../data/projects";
import RetroWindow from "./RetroWindow";

export default function BuildingNow() {
  return (
    <section className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#090615] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="building-now-window"
          title="C:\EXOTICS\MONITOR\TELEMETRY_FEED.SYS"
          headerAccent="purple"
          badge="REAL-TIME"
          statusText="FEED_SYNC: ACTIVE // POLLING INTERVAL: 1000MS"
          statusSegments={[
            { label: "TELEMETRY", value: "HEALTHY" },
            { label: "NODES", value: "3/3 BROADCASTING" }
          ]}
        >
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241B44] pb-6 gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B5CF6] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8B5CF6]" />
                </span>
                <h2 className="font-['Syne',sans-serif] text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  CURRENTLY BUILDING.
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A78BFA] bg-[#120D26] px-3 py-1.5 border border-[#261A47] rounded-xs">
                <Activity className="w-3.5 h-3.5 text-[#00E599]" />
                <span>LIVE STUDIO TELEMETRY MATRIX</span>
              </div>
            </div>

            {/* Live Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CURRENTLY_BUILDING_LIST.map((item, idx) => {
                const isLive = item.status.includes("LIVE");
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="retro-bevel-out bg-[#0E0A21] p-5 rounded-xs flex flex-col justify-between group hover:border-[#8B5CF6] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 text-xs">
                        <span className="text-[#8E85AA] font-bold">
                          ITEM // {item.number}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] uppercase tracking-wider rounded-xs font-bold ${
                            isLive
                              ? "bg-[#14261B] text-[#00E599] border border-[#00E599]/30"
                              : "bg-[#21163F] text-[#DDD6FE] border border-[#8B5CF6]/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isLive ? "bg-[#00E599]" : "bg-[#8B5CF6]"
                            }`}
                          />
                          {item.status}
                        </span>
                      </div>

                      <h3 className="font-['Syne',sans-serif] text-xl font-bold uppercase text-white tracking-wide mb-1">
                        {item.name}
                      </h3>

                      <p className="text-xs text-[#A78BFA] mb-3">
                        {item.category}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#1F1538] flex items-center justify-between text-[10px]">
                      <span className="text-[#8E85AA]">
                        {item.phase}
                      </span>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#C4B5FD] hover:text-white transition-colors p-1"
                          aria-label={`Open ${item.name}`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
