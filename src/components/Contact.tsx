import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Send, CheckCircle2, Copy, Check, Mail, Lock } from "lucide-react";
import { CONTACT_CONFIG } from "../data/team";
import RetroWindow from "./RetroWindow";
import { playRetroClick, playStartupChime } from "../utils/audio";

interface ContactProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Contact({ isOpen, onClose }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactEmail = CONTACT_CONFIG.email || "lab.exotics.com@gmail.com";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    playStartupChime();
    const subject = encodeURIComponent(`Inquiry from ${formData.name || "Builder"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    playRetroClick();
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-16 sm:py-24 border-t border-[#221842] bg-[#070512] font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <RetroWindow
          id="contact-dialog-window"
          title="C:\EXOTICS\MAIL\TRANSMIT_INQUIRY.EXE"
          headerAccent="purple"
          badge="SECURE CHANNEL"
          statusText="DIRECT PORTAL: DHAKA HQ // PROTOCOL: ENCRYPTED MAILTO"
          statusSegments={[
            { label: "STATUS", value: "ACCEPTING PROPOSALS" },
            { label: "RESPONSE", value: "< 24H" }
          ]}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Headline & Direct Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#A78BFA]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <span>06 // INITIATE DIALOGUE</span>
              </div>

              <h2 className="font-['Syne',sans-serif] text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white leading-[0.95]">
                HAVE SOMETHING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#C4B5FD] to-[#8B5CF6]">
                  WORTH BUILDING?
                </span>
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#D4CEE8] font-light leading-relaxed max-w-lg">
                We're interested in ambitious ideas, unusual problems, and people who actually want to build.
              </p>

              {/* Direct Studio Email Box */}
              <div className="retro-bevel-out bg-[#0E0A21] p-4 rounded-xs space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-[#241944] pb-2 text-[#8E85AA]">
                  <span className="flex items-center gap-1.5 text-white font-bold">
                    <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    DIRECT STUDIO DISPATCH:
                  </span>
                  <span className="text-[#00E599] text-[10px]">VERIFIED</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex-1 bg-[#070512] px-3 py-2 border border-[#231A42] text-xs text-white select-all font-mono">
                    {contactEmail}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="retro-btn px-3 py-2 text-xs text-[#DDD6FE] hover:text-white flex items-center gap-1 cursor-pointer"
                    title="Copy direct email"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#00E599]" />
                        <span className="text-[10px] text-[#00E599]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-[#786D94]">
                  {CONTACT_CONFIG.tagline}
                </p>
              </div>
            </div>

            {/* Right Direct Transmission Form */}
            <div className="lg:col-span-6">
              <div className="retro-bevel-out bg-[#0E0A21] p-6 sm:p-8 rounded-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#241944] pb-3 text-xs">
                  <span className="text-white font-bold tracking-wider">
                    TRANSMISSION PROTOCOL
                  </span>
                  <span className="text-[#8E85AA] text-[10px]">
                    DISPATCH TO FOUNDERS
                  </span>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#132B1D] border border-[#00E599]/40 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#00E599]" />
                    </div>
                    <h3 className="font-['Syne',sans-serif] text-xl font-bold uppercase text-white">
                      TRANSMISSION INITIATED
                    </h3>
                    <p className="text-xs text-[#D4CEE8] max-w-sm mx-auto font-sans">
                      Your default mail application has opened with your transmission parameters to {contactEmail}.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="retro-btn px-4 py-2 text-white text-xs uppercase cursor-pointer"
                    >
                      SEND ANOTHER INQUIRY
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1.5 font-bold">
                        YOUR NAME OR COLLECTIVE
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jane Doe / Builder Studio"
                        className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3.5 py-2.5 text-xs text-white focus:outline-none rounded-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1.5 font-bold">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@domain.com"
                        className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3.5 py-2.5 text-xs text-white focus:outline-none rounded-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1.5 font-bold">
                        WHAT ARE WE BUILDING?
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe the product hypothesis, technical problem, or collaboration concept..."
                        className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3.5 py-2.5 text-xs text-white focus:outline-none rounded-xs font-mono resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 retro-btn-accent text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                    >
                      <span>TRANSMIT PROPOSAL</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </RetroWindow>
      </div>
    </section>
  );
}
