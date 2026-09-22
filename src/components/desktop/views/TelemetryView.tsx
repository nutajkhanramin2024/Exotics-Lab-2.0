import { Activity, Radio, ExternalLink, Cpu, HardDrive, Wifi } from "lucide-react";
import { CURRENTLY_BUILDING_LIST } from "../../../data/projects";

export default function TelemetryView() {
  return (
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] overflow-y-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#00E599] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />
            <span>REAL-TIME TELEMETRY // POLLING FREQ: 1000MS</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            CURRENTLY BUILDING.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#0E241A] border border-[#00E599]/40 text-[#00E599] px-2.5 py-1 rounded-xs font-bold uppercase">
            STATUS: ACTIVE MONITORING
          </span>
        </div>
      </div>

      {/* Live Nodes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CURRENTLY_BUILDING_LIST.map((item) => {
          const isLive = item.status.includes("LIVE");
          return (
            <div
              key={item.name}
              className="retro-bevel-out bg-[#0E0A21] p-4 rounded-xs flex flex-col justify-between border border-[#2B1D54] space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-[#8E85AA] font-bold">
                    ITEM // {item.number}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[8px] uppercase tracking-wider rounded-xs font-bold ${
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

                <h3 className="font-['Syne',sans-serif] text-lg font-bold uppercase text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-[10px] text-[#A78BFA]">{item.category}</p>
              </div>

              <div className="pt-2 border-t border-[#1F1538] flex items-center justify-between text-[10px]">
                <span className="text-[#8E85AA] text-[9px]">{item.phase}</span>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C4B5FD] hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Diagnostics */}
      <div className="bg-[#090615] border border-[#231A42] p-4 rounded-xs space-y-2">
        <div className="text-[10px] text-[#A78BFA] uppercase font-bold tracking-wider">
          SYSTEM HEALTH & TOPOLOGY
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-2 bg-[#120D26] border border-[#1F143D] rounded-xs">
            <div className="text-[9px] text-[#8E85AA]">DHAKA CORE NODE</div>
            <div className="text-white font-bold text-xs mt-0.5">ONLINE (14ms)</div>
          </div>
          <div className="p-2 bg-[#120D26] border border-[#1F143D] rounded-xs">
            <div className="text-[9px] text-[#8E85AA]">GLOBAL EDGE</div>
            <div className="text-[#00E599] font-bold text-xs mt-0.5">VERIFIED 100%</div>
          </div>
          <div className="p-2 bg-[#120D26] border border-[#1F143D] rounded-xs">
            <div className="text-[9px] text-[#8E85AA]">MEMORY ALLOCATION</div>
            <div className="text-white font-bold text-xs mt-0.5">OPTIMAL</div>
          </div>
          <div className="p-2 bg-[#120D26] border border-[#1F143D] rounded-xs">
            <div className="text-[9px] text-[#8E85AA]">SECURITY AUDIT</div>
            <div className="text-[#A78BFA] font-bold text-xs mt-0.5">PASSED (LVL 5)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
