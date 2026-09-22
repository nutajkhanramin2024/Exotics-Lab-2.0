import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Users,
  FileText,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  Flame,
  Folder,
  Globe,
  Lock,
  Terminal,
  Layers,
  ChevronRight
} from "lucide-react";
import { PROJECTS } from "../data/projects";
import RetroWindow from "./RetroWindow";
import { playRetroClick } from "../utils/audio";

export default function Projects() {
  const [activeInventorsTab, setActiveInventorsTab] = useState("Team Finder");

  const iepProject = PROJECTS.find((p) => p.id === "iep-unlocked") || PROJECTS[0];
  const inventorsProject = PROJECTS.find((p) => p.id === "inventorshub") || PROJECTS[1];
  const typeZProject = PROJECTS.find((p) => p.id === "type-z") || PROJECTS[2];

  const inventorsAreas = [
    { name: "Team Finder", icon: Users, desc: "Connect with developers, designers, and operators aligned with your vision." },
    { name: "Posts", icon: FileText, desc: "Share early concepts, architecture thoughts, and building progress." },
    { name: "Messages", icon: MessageSquare, desc: "Direct encrypted founder communication channels." },
    { name: "Feedback", icon: CheckCircle2, desc: "Get raw, actionable critique from builders who ship." },
    { name: "Crazy Innovators", icon: Flame, desc: "Discover high-conviction builders pursuing unconventional experiments." }
  ];

  return (
    <section id="work" className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#070512] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Master Explorer Window */}
        <RetroWindow
          id="work-explorer-window"
          title="C:\EXOTICS\EXPLORER\SELECTED_WORK.SYS"
          headerAccent="purple"
          badge="ARCHIVE"
          statusText="OBJECTS: 3 REPOSITORIES (2 LIVE, 1 IN LAB) // VERIFIED DEPLOYMENTS"
          statusSegments={[
            { label: "POLICY", value: "ZERO-FABRICATION" },
            { label: "ZONE", value: "PUBLIC" }
          ]}
        >
          <div className="space-y-8">
            {/* Header Address Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#231942] pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A78BFA] mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>03 // ARCHIVE & DEPLOYMENTS</span>
                </div>
                <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                  SELECTED WORK.
                </h2>
              </div>

              {/* Retro Explorer Address Bar */}
              <div className="flex items-center gap-2 bg-[#0E0921] border border-[#2B1E52] px-3 py-1.5 rounded-xs text-xs text-[#C4B5FD] w-full md:w-auto">
                <span className="text-[#766A96]">Location:</span>
                <span className="text-white select-all">exoticslab.io/archive/deployments</span>
                <Globe className="w-3.5 h-3.5 text-[#00E599] ml-auto" />
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 01. FEATURED PROJECT: IEP UNLOCKED                                        */}
            {/* ========================================================================= */}
            <div className="retro-bevel-out bg-[#0B081C] p-5 sm:p-8 rounded-xs space-y-6">
              {/* Project Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#241944] pb-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#6D28D9] text-white font-bold rounded-xs text-[10px]">
                    PROJECT {iepProject.number}
                  </span>
                  <span className="text-[#6C618A]">/</span>
                  <span className="text-[#C4B5FD] uppercase">{iepProject.category}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#070512] px-2.5 py-1 border border-[#261A47] rounded-xs text-[10px] text-[#00E599]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                  <span className="font-bold">{iepProject.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Description */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="font-['Syne',sans-serif] text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    {iepProject.name}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#D4CEE8] font-normal leading-relaxed">
                    {iepProject.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block">
                      CONFIRMED SYSTEM CAPABILITIES
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {iepProject.highlights.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 px-3 py-2 bg-[#120D26] border border-[#231A42] text-xs text-[#E3DFEE] rounded-xs"
                        >
                          <span className="text-[#8B5CF6] font-bold">›</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3">
                    <a
                      href={iepProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="retro-btn-accent inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <span>LAUNCH IEP UNLOCKED</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Right Retro Browser Preview */}
                <div className="lg:col-span-6">
                  <div className="retro-bevel-out bg-[#06040E] rounded-xs overflow-hidden">
                    {/* Browser Bar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-[#171033] border-b border-[#2A1D54] text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                      <span className="text-[#C4B5FD] font-mono select-all">iepunlocked.vercel.app</span>
                      <span className="text-[#00E599] font-bold">200 OK</span>
                    </div>

                    <div className="p-5 space-y-3 bg-[#080512]">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1E1538] text-xs">
                        <span className="flex items-center gap-1.5 text-white font-bold">
                          <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                          IEP Document Interpreter
                        </span>
                        <span className="text-[10px] bg-[#160E30] text-[#A78BFA] px-2 py-0.5 rounded-xs">
                          Special Ed AI
                        </span>
                      </div>

                      <div className="bg-[#0E0921] border border-[#231844] p-3 rounded-xs space-y-2 text-xs">
                        <div className="text-[#C4B5FD] font-semibold text-[11px]">
                          Target Goal: Reading Fluency & Accommodations
                        </div>
                        <p className="text-[11px] text-[#8C83A8] italic">
                          "Decodes multi-syllabic informational texts with 85% accuracy across 4 consecutive trials."
                        </p>
                        <div className="bg-[#170F33] p-2 border-l-2 border-[#8B5CF6] text-[10px] text-[#DDD6FE]">
                          Parent Insight: Clear criteria identified. Request concrete progress monitoring timeline during next ARD committee meeting.
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                        <div className="p-1.5 bg-[#120D26] border border-[#231A42] text-[#B8AFCF]">
                          Plain English
                        </div>
                        <div className="p-1.5 bg-[#120D26] border border-[#231A42] text-[#B8AFCF]">
                          Rights Guide
                        </div>
                        <div className="p-1.5 bg-[#120D26] border border-[#231A42] text-[#B8AFCF]">
                          Meeting Prep
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 02 & 03: DUAL RETRO WINDOWS (INVENTORSHUB & TYPE-Z)                       */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* PROJECT 02: INVENTORSHUB */}
              <div className="lg:col-span-7 retro-bevel-out bg-[#0B081C] p-5 sm:p-7 rounded-xs flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#231A42] pb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#6D28D9] text-white font-bold rounded-xs text-[10px]">
                        PROJECT {inventorsProject.number}
                      </span>
                      <span className="text-[#C4B5FD] uppercase">{inventorsProject.category}</span>
                    </div>
                    <span className="text-[#00E599] text-[10px] font-bold">
                      ● {inventorsProject.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white mb-2">
                      {inventorsProject.name}
                    </h3>
                    <p className="font-sans text-sm text-[#D4CEE8] leading-relaxed">
                      {inventorsProject.description}
                    </p>
                  </div>

                  {/* Interactive Sector Explorer */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block">
                      CONFIRMED LIVE PRODUCT SECTORS
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
                </div>

                <div className="pt-4 border-t border-[#231A42] flex items-center justify-between">
                  <span className="text-[10px] text-[#8E85AA]">BUILDER COMMUNITY</span>
                  <a
                    href={inventorsProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retro-btn px-4 py-2 text-white hover:text-[#C4B5FD] text-xs font-bold uppercase flex items-center gap-1.5"
                  >
                    <span>ENTER INVENTORSHUB</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  </a>
                </div>
              </div>

              {/* PROJECT 03: TYPE-Z */}
              <div className="lg:col-span-5 retro-bevel-out bg-[#0B081C] p-5 sm:p-7 rounded-xs flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-[#231A42] pb-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#4C1D95] text-white font-bold rounded-xs text-[10px]">
                        PROJECT {typeZProject.number}
                      </span>
                      <span className="text-[#8E85AA] uppercase">CONFIDENTIAL</span>
                    </div>
                    <span className="text-[#A78BFA] text-[10px] font-bold">
                      🔒 {typeZProject.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#8E85AA] uppercase tracking-wider block mb-1">
                      LABORATORY INITIATIVE
                    </span>
                    <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-bold uppercase text-white">
                      {typeZProject.name}
                    </h3>
                  </div>

                  <p className="font-sans text-sm text-[#D4CEE8] leading-relaxed">
                    {typeZProject.description}
                  </p>

                  <div className="bg-[#080512] border border-[#231844] p-4 rounded-xs space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#8E85AA]">
                      <span className="flex items-center gap-1 text-[#A78BFA]">
                        <Lock className="w-3.5 h-3.5" />
                        PRE-RELEASE ENCRYPTION
                      </span>
                      <span className="text-[#00E599] font-bold">STAGE 01</span>
                    </div>

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

                <div className="pt-4 border-t border-[#231A42] flex items-center justify-between text-xs text-[#8E85AA]">
                  <span>SPECIFICATION RUNNING</span>
                  <span className="px-3 py-1 bg-[#160E30] border border-[#2B1D54] text-[#C4B5FD] text-[10px] rounded-xs uppercase">
                    COMING SOON
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
