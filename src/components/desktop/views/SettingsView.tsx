import { Monitor, Volume2, VolumeX, Sparkles, Tv, ShieldCheck, Cpu } from "lucide-react";
import { WallpaperId } from "../../../types/desktop";
import { playRetroClick, toggleSound, isSoundEnabled } from "../../../utils/audio";
import { useState, useEffect } from "react";

interface SettingsViewProps {
  currentWallpaper: WallpaperId;
  onSelectWallpaper: (wp: WallpaperId) => void;
  crtActive: boolean;
  onToggleCrt: () => void;
}

export default function SettingsView({
  currentWallpaper,
  onSelectWallpaper,
  crtActive,
  onToggleCrt
}: SettingsViewProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, []);

  const wallpapers: { id: WallpaperId; name: string; previewColor: string }[] = [
    { id: "exotics-purple", name: "Exotics Deep Purple", previewColor: "from-[#10072B] via-[#080414] to-[#040209]" },
    { id: "midnight-dhaka", name: "Midnight Dhaka Grid", previewColor: "from-[#050D1A] via-[#02060F] to-[#010307]" },
    { id: "classic-teal", name: "Windows 2000 Classic Teal", previewColor: "from-[#008080] via-[#005757] to-[#003333]" },
    { id: "matrix-cyber", name: "Matrix Terminal Green", previewColor: "from-[#021A0F] via-[#010D07] to-[#000502]" },
    { id: "synthwave-grid", name: "Synthwave Cyber Sunset", previewColor: "from-[#2A0845] via-[#1B003A] to-[#0D001A]" }
  ];

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundEnabled(next);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] bg-[#0A0717] overflow-y-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>CONTROL PANEL // PREFERENCES</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            SYSTEM PROPERTIES.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#140E2D] border border-[#2B1D54] text-[#00E599] px-2.5 py-1 rounded-xs font-bold uppercase">
            OS BUILD: 2001.4
          </span>
        </div>
      </div>

      {/* Desktop Background Wallpaper Chooser */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#A78BFA] text-[11px] font-bold uppercase">
          <Monitor className="w-4 h-4 text-[#8B5CF6]" />
          <span>DESKTOP BACKGROUND WALLPAPER</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {wallpapers.map((wp) => {
            const isSelected = currentWallpaper === wp.id;
            return (
              <button
                key={wp.id}
                onClick={() => {
                  playRetroClick();
                  onSelectWallpaper(wp.id);
                }}
                className={`p-3 rounded-xs border text-left cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#180E38] border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.35)]"
                    : "bg-[#0E0A21] border-[#22173F] hover:border-[#4B3482]"
                }`}
              >
                <div
                  className={`h-16 w-full rounded-xs bg-gradient-to-b ${wp.previewColor} border border-[#2B1D54] mb-2 flex items-center justify-center`}
                >
                  <span className="text-[10px] text-white/50 font-bold uppercase">
                    {wp.id}
                  </span>
                </div>
                <div className="font-bold text-white text-[11px] truncate">
                  {wp.name}
                </div>
                {isSelected && (
                  <span className="text-[9px] text-[#00E599] font-bold block mt-0.5">
                    ● ACTIVE WALLPAPER
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hardware FX & Visual Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* CRT Scanline Toggle */}
        <div className="retro-bevel-out bg-[#0E0A21] p-4 rounded-xs border border-[#2B1D54] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold">
              <Tv className="w-4 h-4 text-[#8B5CF6]" />
              <span>CRT SCANLINES EFFECT</span>
            </div>
            <p className="text-[10px] text-[#8E85AA] mt-0.5">
              Simulates authentic 2000s cathode-ray tube phosphor scanlines.
            </p>
          </div>

          <button
            onClick={() => {
              playRetroClick();
              onToggleCrt();
            }}
            className={`px-3 py-1.5 rounded-xs text-[10px] font-bold uppercase cursor-pointer ${
              crtActive ? "retro-btn-accent" : "retro-btn text-[#8E85AA]"
            }`}
          >
            {crtActive ? "ON" : "OFF"}
          </button>
        </div>

        {/* Sound Effects Toggle */}
        <div className="retro-bevel-out bg-[#0E0A21] p-4 rounded-xs border border-[#2B1D54] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-white font-bold">
              <Volume2 className="w-4 h-4 text-[#8B5CF6]" />
              <span>RETRO AUDIO SOUNDS</span>
            </div>
            <p className="text-[10px] text-[#8E85AA] mt-0.5">
              Synthesizer clicks, window beeps, and startup audio chimes.
            </p>
          </div>

          <button
            onClick={handleSoundToggle}
            className={`px-3 py-1.5 rounded-xs text-[10px] font-bold uppercase cursor-pointer ${
              soundEnabled ? "retro-btn-accent" : "retro-btn text-[#8E85AA]"
            }`}
          >
            {soundEnabled ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Hardware Specs Details */}
      <div className="bg-[#080512] border border-[#20153D] p-4 rounded-xs space-y-2">
        <div className="text-[10px] text-[#A78BFA] uppercase font-bold tracking-wider">
          SYSTEM INFORMATION
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-[#8E85AA]">OPERATING SYSTEM:</span>
            <span className="text-white font-semibold">Exotics Lab OS 2000 Pro</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E85AA]">HEADQUARTERS:</span>
            <span className="text-white font-semibold">Dhaka, Bangladesh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E85AA]">FOUNDER DIRECTORS:</span>
            <span className="text-white font-semibold">Aditya Kumar Roy, Nuraj Khan Ramin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#8E85AA]">BUILD INTEGRITY:</span>
            <span className="text-[#00E599] font-bold">100% NOMINAL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
