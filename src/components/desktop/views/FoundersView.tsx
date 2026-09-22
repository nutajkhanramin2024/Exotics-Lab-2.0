import { UserCheck, ShieldCheck, Terminal, Mail, Award, Globe, CheckCircle2 } from "lucide-react";
import { TEAM_MEMBERS, CONTACT_CONFIG } from "../../../data/team";
import { playRetroClick } from "../../../utils/audio";

export default function FoundersView() {
  return (
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>PERSONNEL REGISTRY // DHAKA LAB</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            THE PEOPLE BEHIND THE LAB.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#170E33] border border-[#3E2778] text-[#C4B5FD] px-2.5 py-1 rounded-xs font-bold uppercase">
            CLEARANCE: LEVEL 5 (DIRECTORS)
          </span>
        </div>
      </div>

      {/* Two Founder Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TEAM_MEMBERS.map((member, idx) => {
          const isNuraj = member.name.includes("Nuraj");
          const photoUrl = member.imagePath;

          return (
            <div
              key={member.name}
              className="retro-bevel-out bg-[#0D091F] rounded-xs flex flex-col justify-between overflow-hidden border border-[#2B1D54] group"
            >
              {/* Card Meta Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#140E2D] border-b border-[#241847] text-[11px]">
                <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
                  <UserCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>PARTNER_ID // 0{idx + 1}</span>
                </div>
                <span className="bg-[#24174D] text-[#DDD6FE] px-2 py-0.5 border border-[#48338C] rounded-xs text-[9px] font-bold">
                  {member.role}
                </span>
              </div>

              {/* Photo Frame */}
              <div className="relative aspect-4/5 w-full bg-[#05030C] overflow-hidden flex items-center justify-center border-b border-[#241847]">
                <img
                  src={photoUrl}
                  alt={`${member.name} - ${member.role} at Exotics Lab`}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${
                    isNuraj
                      ? "filter grayscale contrast-125 brightness-95"
                      : "filter contrast-105 brightness-100"
                  }`}
                />

                {/* Badge Tag */}
                <div className="absolute top-2.5 left-2.5 bg-[#0D091F]/90 border border-[#372A66] px-2 py-0.5 text-[8px] text-white uppercase tracking-wider rounded-xs flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${isNuraj ? "bg-white" : "bg-[#00E599]"}`} />
                  <span>{isNuraj ? "B&W EDITORIAL PORTRAIT" : "NATURAL COLOR PORTRAIT"}</span>
                </div>

                <div className="absolute bottom-2.5 right-2.5 bg-[#0D091F]/90 border border-[#8B5CF6]/50 px-2 py-0.5 text-[8px] text-[#C4B5FD] uppercase rounded-xs">
                  VERIFIED BIOMETRIC
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-4 sm:p-5 space-y-3 bg-[#0D091F] flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-[#21163F] pb-2">
                    <div>
                      <h3 className="font-['Syne',sans-serif] text-xl font-bold uppercase text-white tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-[11px] uppercase tracking-wider text-[#8B5CF6] font-bold">
                        {member.role}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-[#180F38] border border-[#3E297D] text-[#C4B5FD] text-xs font-bold rounded-xs">
                      {member.initials}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-[#D4CEE8] leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1C1438] flex items-center justify-between text-[10px] text-[#8E85AA]">
                  <span className="flex items-center gap-1 text-white">
                    <Terminal className="w-3 h-3 text-[#8B5CF6]" />
                    CORE STEWARD
                  </span>
                  <span>DHAKA STUDIO</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Studio Location Footer */}
      <div className="bg-[#0A0717] border border-[#241944] p-4 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#8B5CF6]" />
          <span className="text-white font-bold">{CONTACT_CONFIG.tagline}</span>
        </div>
        <div className="text-[#8E85AA]">
          Direct Reachout: <span className="text-[#C4B5FD]">{CONTACT_CONFIG.email}</span>
        </div>
      </div>
    </div>
  );
}
