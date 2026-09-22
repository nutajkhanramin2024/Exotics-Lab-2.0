import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Volume2, VolumeX, SkipForward, SkipBack, Music, Sparkles } from "lucide-react";
import { playRetroClick, toggleSound, isSoundEnabled } from "../../../utils/audio";

export default function AudioPlayerView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(75);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const tracks = [
    { title: "DHAKA_MIDNIGHT_SYNTH.MOD", duration: "03:42", bpm: "92 BPM" },
    { title: "UNCOMFORTABLE_IDEAS_LOFI.XM", duration: "02:58", bpm: "84 BPM" },
    { title: "SILICON_BOOT_SEQUENCE.S3M", duration: "04:15", bpm: "110 BPM" }
  ];

  // Visualizer Canvas Animation
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setSoundEnabled(isSoundEnabled());
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const renderVisualizer = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const numBars = 16;
      const barWidth = Math.floor(canvas.width / numBars) - 2;

      for (let i = 0; i < numBars; i++) {
        const heightMultiplier = isPlaying ? Math.sin(Date.now() / 150 + i) * 0.5 + 0.5 : 0.05;
        const randomHeight = isPlaying ? Math.random() * 0.4 : 0;
        const barHeight = Math.max(3, (heightMultiplier + randomHeight) * (canvas.height - 4));

        const x = i * (barWidth + 2) + 2;
        const y = canvas.height - barHeight;

        // Gradient from green to yellow to red
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        gradient.addColorStop(0, "#00E599");
        gradient.addColorStop(0.6, "#8B5CF6");
        gradient.addColorStop(1, "#EC4899");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationFrameId = requestAnimationFrame(renderVisualizer);
    };

    renderVisualizer();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const handlePlayToggle = () => {
    playRetroClick();
    if (!isPlaying) {
      // Start retro ambient synth arpeggio using Web Audio API
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;

        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);

        gain.gain.setValueAtTime((volume / 100) * 0.1, ctx.currentTime);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        // Simple mellow synth scale modulation
        const notes = [220, 277.18, 329.63, 440, 554.37, 659.25];
        let noteIdx = 0;
        const interval = setInterval(() => {
          if (!audioContextRef.current) {
            clearInterval(interval);
            return;
          }
          noteIdx = (noteIdx + 1) % notes.length;
          osc.frequency.setValueAtTime(notes[noteIdx], ctx.currentTime);
        }, 400);

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
      } catch {
        setIsPlaying(true);
      }
    } else {
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  const handleNextTrack = () => {
    playRetroClick();
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrevTrack = () => {
    playRetroClick();
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleSoundSystemToggle = () => {
    const next = toggleSound();
    setSoundEnabled(next);
  };

  return (
    <div className="p-4 sm:p-5 font-mono text-xs text-[#D8D2EB] bg-[#0A0717] space-y-4 select-none">
      {/* Winamp-style Main Body */}
      <div className="retro-bevel-out bg-[#140E2D] p-4 rounded-xs border border-[#2F1F5C] space-y-4">
        {/* Track Display */}
        <div className="bg-[#06040F] border border-[#231844] p-3 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-[9px] text-[#A78BFA] uppercase tracking-wider">
              NOW PLAYING // {tracks[currentTrackIndex].bpm}
            </div>
            <div className="text-sm font-bold text-[#00E599] font-mono truncate">
              {tracks[currentTrackIndex].title}
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-lg font-bold text-white font-mono">
              {isPlaying ? "01:24" : "00:00"}
            </span>
            <span className="text-[9px] text-[#8E85AA] block">
              / {tracks[currentTrackIndex].duration}
            </span>
          </div>
        </div>

        {/* Real-time Visualizer Canvas */}
        <div className="bg-[#05030B] border border-[#20153D] p-2 rounded-xs">
          <canvas
            ref={canvasRef}
            width={320}
            height={64}
            className="w-full h-16 rounded-xs"
          />
        </div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevTrack}
              className="retro-btn p-2 text-white hover:text-[#C4B5FD] cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handlePlayToggle}
              className="retro-btn-accent px-4 py-2 text-white font-bold flex items-center gap-1.5 cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            <button
              onClick={handleNextTrack}
              className="retro-btn p-2 text-white hover:text-[#C4B5FD] cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-[#090615] px-3 py-1.5 border border-[#221640] rounded-xs">
            <button
              onClick={handleSoundSystemToggle}
              className="text-[#A78BFA] hover:text-white cursor-pointer"
              title={soundEnabled ? "Mute All Sound" : "Enable Sound"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#EF4444]" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-[#8B5CF6] cursor-pointer"
            />
            <span className="text-[10px] text-white w-7 text-right">{volume}%</span>
          </div>
        </div>
      </div>

      {/* Playlist Box */}
      <div className="bg-[#0A0717] border border-[#21163F] p-3 rounded-xs space-y-1.5">
        <div className="text-[10px] text-[#8E85AA] uppercase font-bold tracking-wider mb-1">
          STUDIO PLAYLIST
        </div>
        {tracks.map((track, idx) => (
          <button
            key={track.title}
            onClick={() => {
              playRetroClick();
              setCurrentTrackIndex(idx);
            }}
            className={`w-full flex items-center justify-between p-2 rounded-xs text-left cursor-pointer transition-colors ${
              idx === currentTrackIndex
                ? "bg-[#1C123D] text-[#00E599] font-bold border border-[#482D94]"
                : "text-[#8E85AA] hover:bg-[#120B26] hover:text-white"
            }`}
          >
            <span className="truncate text-xs">
              0{idx + 1}. {track.title}
            </span>
            <span className="text-[10px] text-[#A78BFA] ml-2 shrink-0">{track.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
