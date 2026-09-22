import { motion } from "motion/react";
import { ShieldCheck, Terminal, Award, UserCheck, KeyRound } from "lucide-react";
import { TEAM_MEMBERS } from "../data/team";
import RetroWindow from "./RetroWindow";

export default function Team() {
  return (
    <section id="team" className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#070512] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="team-personnel-window"
          title="C:\EXOTICS\SECURITY\FOUNDER_PERSONNEL.EXE"
          headerAccent="purple"
          badge="BIOMETRIC VERIFIED"
          statusText="PERSONNEL_STATUS: 2 FOUNDERS REGISTERED // CLEARANCE: LEVEL 5 (DIRECTORS)"
          statusSegments={[
            { label: "GOVERNANCE", value: "FOUNDER-LED" },
            { label: "LOCATION", value: "DHAKA & GLOBAL" }
          ]}
        >
          <div className="space-y-8">
            {/* Header Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#241B44] pb-6 gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A78BFA] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                  <span>05 // FOUNDERSHIP & LEADERSHIP</span>
                </div>
                <h2 className="font-['Syne',sans-serif] text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
                  THE PEOPLE BEHIND THE LAB.
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-widest text-[#DDD6FE] mb-1 font-bold">
                  Founder-Led. Hands-On.
                </p>
                <span className="text-[10px] text-[#8E85AA]">
                  VERIFIED CORE TEAM // DHAKA HQ
                </span>
              </div>
            </div>

            {/* Two Founder Profile Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {TEAM_MEMBERS.map((member, idx) => {
                const isNuraj = member.name.includes("Nuraj");
                const photoUrl = member.imagePath;

                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="retro-bevel-out bg-[#0E0A21] rounded-xs flex flex-col justify-between overflow-hidden group hover:border-[#8B5CF6] transition-colors"
                  >
                    {/* Top Identity Meta Bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#231A42] bg-[#140E2D] text-xs">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-[#8B5CF6]" />
                        <span className="font-bold text-white tracking-widest uppercase">
                          PARTNER_ID // 0{idx + 1}
                        </span>
                      </div>
                      <span className="bg-[#24174D] text-[#DDD6FE] px-2.5 py-0.5 border border-[#48338C] rounded-xs text-[10px] font-bold">
                        {member.role}
                      </span>
                    </div>

                    {/* Portrait Frame with Retro Border */}
                    <div className="relative aspect-4/5 w-full bg-[#070512] overflow-hidden flex items-center justify-center border-b border-[#231A42]">
                      <img
                        src={photoUrl}
                        alt={`${member.name} - ${member.role} at Exotics Lab`}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 ${
                          isNuraj
                            ? "filter grayscale contrast-125 brightness-95"
                            : "filter contrast-105 brightness-100"
                        }`}
                      />

                      {/* Badge Identifier */}
                      <div className="absolute top-3 left-3 bg-[#0D091F]/90 border border-[#372A66] px-2.5 py-1 text-[9px] text-white uppercase tracking-wider rounded-xs flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isNuraj ? "bg-white" : "bg-[#00E599]"}`} />
                        <span>{isNuraj ? "B&W EDITORIAL PORTRAIT" : "NATURAL COLOR PORTRAIT"}</span>
                      </div>

                      {/* Seal on bottom right */}
                      <div className="absolute bottom-3 right-3 bg-[#0D091F]/90 border border-[#8B5CF6]/50 px-2 py-0.5 text-[9px] text-[#C4B5FD] uppercase rounded-xs">
                        CLEARANCE_LVL5
                      </div>
                    </div>

                    {/* Info Body */}
                    <div className="p-5 sm:p-7 space-y-4 bg-[#0E0A21]">
                      <div className="flex items-center justify-between border-b border-[#231A42] pb-3">
                        <div>
                          <h3 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                            {member.name}
                          </h3>
                          <p className="text-xs uppercase tracking-wider text-[#8B5CF6] font-bold mt-0.5">
                            {member.role}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-[#180F38] border border-[#3E297D] text-[#C4B5FD] text-xs font-bold rounded-xs">
                          {member.initials}
                        </span>
                      </div>

                      <p className="font-sans text-sm text-[#D4CEE8] leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="pt-3 border-t border-[#1C1438] flex items-center justify-between text-[10px] text-[#8E85AA]">
                        <span className="flex items-center gap-1 text-white">
                          <Terminal className="w-3 h-3 text-[#8B5CF6]" />
                          EXOTICS LAB // CORE STEWARD
                        </span>
                        <span>DHAKA HQ</span>
                      </div>
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
