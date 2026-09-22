import { useState } from "react";
import {
  ExternalLink,
  ShieldCheck,
  Users,
  FileText,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Flame,
  Globe,
  Lock,
  ArrowUpRight,
  Filter,
  Search
} from "lucide-react";
import { PROJECTS } from "../../../data/projects";
import { playRetroClick } from "../../../utils/audio";

export default function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState<"all" | "live" | "lab">("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("iep-unlocked");
  const [activeInventorsTab, setActiveInventorsTab] = useState("Team Finder");
  const [searchQuery, setSearchQuery] = useState("");

  const inventorsAreas = [
    { name: "Team Finder", icon: Users, desc: "Connect with developers, designers, and operators aligned with your vision." },
    { name: "Posts", icon: FileText, desc: "Share early concepts, architecture thoughts, and building progress." },
    { name: "Messages", icon: MessageSquare, desc: "Direct encrypted founder communication channels." },
    { name: "Feedback", icon: CheckCircle2, desc: "Get raw, actionable critique from builders who ship." },
    { name: "Crazy Innovators", icon: Flame, desc: "Discover high-conviction builders pursuing unconventional experiments." }
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (activeFilter === "live") return project.isLive;
    if (activeFilter === "lab") return !project.isLive;
    return true;
  });

  const selectedProject =
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="flex flex-col h-full font-mono text-xs text-[#D8D2EB]">
      {/* Explorer Address & Toolbar */}
      <div className="bg-[#120D29] border-b border-[#241944] p-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Breadcrumb Path */}
        <div className="flex items-center gap-2 bg-[#090615] px-3 py-1.5 border border-[#2B1D54] rounded-xs text-[11px] text-[#C4B5FD] flex-1 max-w-md">
          <span className="text-[#786D94]">Location:</span>
          <span className="text-white select-all">C:\EXOTICS\PORTFOLIO\DEPLOYMENTS</span>
          <Globe className="w-3.5 h-3.5 text-[#00E599] ml-auto" />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#090615] p-1 border border-[#231A42] rounded-xs">
          <button
            onClick={() => {
              playRetroClick();
              setActiveFilter("all");
            }}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs transition-colors cursor-pointer ${
              activeFilter === "all"
                ? "bg-[#6D28D9] text-white"
                : "text-[#A78BFA] hover:text-white"
            }`}
          >
            ALL (3)
          </button>
          <button
            onClick={() => {
              playRetroClick();
              setActiveFilter("live");
            }}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs transition-colors cursor-pointer ${
              activeFilter === "live"
                ? "bg-[#6D28D9] text-white"
                : "text-[#A78BFA] hover:text-white"
            }`}
          >
            LIVE (2)
          </button>
          <button
            onClick={() => {
              playRetroClick();
              setActiveFilter("lab");
            }}
            className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs transition-colors cursor-pointer ${
              activeFilter === "lab"
                ? "bg-[#6D28D9] text-white"
                : "text-[#A78BFA] hover:text-white"
            }`}
          >
            LAB (1)
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
        {/* Left Project Selector Column */}
        <div className="lg:col-span-4 bg-[#090617] border-b lg:border-b-0 lg:border-r border-[#241944] p-3 space-y-2">
          <div className="text-[10px] text-[#8E85AA] uppercase tracking-wider px-1 pb-1 font-bold flex items-center justify-between">
            <span>SELECT APPLICATION</span>
            <span className="text-[9px] text-[#A78BFA] lg:hidden">3 REPOSITORIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2">
            {filteredProjects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <button
                  key={project.id}
                  onClick={() => {
                    playRetroClick();
                    setSelectedProjectId(project.id);
                  }}
                  className={`w-full p-2.5 sm:p-3 rounded-xs text-left transition-all cursor-pointer border ${
                    isSelected
                      ? "bg-[#180F38] border-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.25)]"
                      : "bg-[#0D091F] border-[#22173F] hover:border-[#4B3482] hover:bg-[#120D2B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] font-bold text-[#A78BFA] bg-[#1E1438] px-1.5 py-0.5 rounded-xs border border-[#3E2778]">
                      0{project.number}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-xs ${
                        project.isLive
                          ? "text-[#00E599] bg-[#0E241A]"
                          : "text-[#DDD6FE] bg-[#2E1E5E]"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="font-['Syne',sans-serif] text-sm font-bold uppercase text-white tracking-wide truncate">
                    {project.name}
                  </div>

                  <div className="text-[10px] text-[#8C84A8] line-clamp-1 mt-0.5">
                    {project.tagline}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Project Detailed View */}
        <div className="lg:col-span-8 p-4 sm:p-6 space-y-6 bg-[#0E0921] overflow-y-auto">
          {/* Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#261A47] pb-4">
            <div>
              <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
                <span>PROJECT {selectedProject.number}</span>
                <span>/</span>
                <span>{selectedProject.category}</span>
              </div>
              <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                {selectedProject.name}
              </h2>
            </div>

            {selectedProject.url && (
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-btn-accent px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <span>LAUNCH APP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-[#E2DEF0] leading-relaxed">
            {selectedProject.description}
          </p>

          {/* Specific Project View Details */}
          {selectedProject.id === "iep-unlocked" && (
            <div className="space-y-4">
              {/* Retro Browser Preview Card */}
              <div className="retro-bevel-out bg-[#070512] rounded-xs overflow-hidden border border-[#2E1F57]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#170E33] border-b border-[#2C1C59] text-[10px]">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  </div>
                  <span className="text-[#C4B5FD] font-mono">https://iepunlocked.vercel.app</span>
                  <span className="text-[#00E599] font-bold">200 OK</span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-white font-bold border-b border-[#1E1538] pb-2">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                      IEP Document Interpreter Engine
                    </span>
                    <span className="text-[10px] bg-[#1C123D] text-[#C4B5FD] px-2 py-0.5 rounded-xs">
                      AI SPECIAL ED
                    </span>
                  </div>

                  <div className="bg-[#0D091F] border border-[#231844] p-3 rounded-xs space-y-1.5 text-[11px]">
                    <div className="text-[#C4B5FD] font-semibold">
                      Sample Goal Analysis: Reading Fluency & Accommodations
                    </div>
                    <p className="text-[#8C83A8] italic">
                      "Student will decode multi-syllabic informational texts with 85% accuracy across 4 consecutive trials."
                    </p>
                    <div className="bg-[#170F33] p-2 border-l-2 border-[#8B5CF6] text-[10px] text-[#DDD6FE]">
                      Actionable Insight: Clear criteria identified. Request concrete progress monitoring timeline during next ARD committee meeting.
                    </div>
                  </div>
                </div>
              </div>

              {/* Capabilities Grid */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block font-bold">
                  VERIFIED CAPABILITIES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 p-2 bg-[#120D26] border border-[#231A42] text-xs text-[#E3DFEE] rounded-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedProject.id === "inventorshub" && (
            <div className="space-y-4">
              {/* Sector Tabs */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block font-bold">
                  EXPLORE PLATFORM MODULES
                </span>
                <div className="flex flex-wrap gap-2">
                  {inventorsAreas.map((area) => {
                    const Icon = area.icon;
                    const isActive = activeInventorsTab === area.name;
                    return (
                      <button
                        key={area.name}
                        onClick={() => {
                          playRetroClick();
                          setActiveInventorsTab(area.name);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-xs cursor-pointer ${
                          isActive
                            ? "retro-btn-accent font-bold"
                            : "retro-btn text-[#A78BFA]"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{area.name}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-[#080512] border border-[#231844] rounded-xs">
                  <span className="text-[10px] uppercase text-[#8B5CF6] block mb-1 font-bold">
                    {activeInventorsTab} // MODULE OVERVIEW
                  </span>
                  <p className="text-xs text-[#E2DEF0] leading-relaxed">
                    {inventorsAreas.find((a) => a.name === activeInventorsTab)?.desc}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block font-bold">
                  KEY FEATURES
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 p-2 bg-[#120D26] border border-[#231A42] text-xs text-[#E3DFEE] rounded-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E599]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedProject.id === "type-z" && (
            <div className="space-y-4">
              <div className="bg-[#080512] border border-[#231844] p-4 rounded-xs space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8E85AA]">
                  <span className="flex items-center gap-1 text-[#A78BFA] font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    CONFIDENTIAL EXPERIMENTAL INITIATIVE
                  </span>
                  <span className="text-[#00E599] font-bold">STAGE 01</span>
                </div>

                <p className="text-xs text-[#C7C2DC] font-sans leading-relaxed">
                  Type-Z is an in-house laboratory exploration currently under active architectural prototyping at Exotics Lab Dhaka.
                </p>

                <div className="space-y-1.5 text-[11px] text-[#B8AFCF] border-t border-[#1C1338] pt-2">
                  <div className="flex justify-between">
                    <span className="text-[#6D638F]">SYSTEM ARCHITECTURE:</span>
                    <span className="text-white font-semibold">DISTRIBUTED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6D638F]">TELEMETRY:</span>
                    <span className="text-[#00E599]">ACTIVE PROTOTYPE</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
