import { useState, type FormEvent } from "react";
import { Mail, Send, Copy, Check, CheckCircle2, ArrowUpRight } from "lucide-react";
import { CONTACT_CONFIG } from "../../../data/team";
import { playRetroClick, playStartupChime } from "../../../utils/audio";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactEmail = CONTACT_CONFIG.email || "nurajkhanramin@gmail.com";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    playStartupChime();
    const subject = encodeURIComponent(`Exotics Lab Inquiry from ${formData.name || "Builder"}`);
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
    <div className="p-4 sm:p-6 space-y-6 font-mono text-xs text-[#D8D2EB] overflow-y-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#241944] pb-4 gap-2">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
            <span>DIRECT TRANSMISSION // ENCRYPTED MAILTO</span>
          </div>
          <h2 className="font-['Syne',sans-serif] text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
            TRANSMIT AN INQUIRY.
          </h2>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-[10px] bg-[#0E241A] border border-[#00E599]/40 text-[#00E599] px-2.5 py-1 rounded-xs font-bold uppercase">
            STATUS: ACCEPTING PROPOSALS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Information Box */}
        <div className="md:col-span-5 space-y-4">
          <p className="font-sans text-sm text-[#D4CEE8] leading-relaxed">
            We're interested in ambitious ideas, unusual problems, and founders who actually want to build.
          </p>

          <div className="retro-bevel-out bg-[#0E0A21] p-4 rounded-xs border border-[#26194A] space-y-2.5">
            <div className="flex items-center justify-between text-[11px] text-[#8E85AA] border-b border-[#241944] pb-1.5">
              <span className="text-white font-bold flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#8B5CF6]" />
                DIRECT STUDIO EMAIL
              </span>
              <span className="text-[#00E599] text-[9px]">VERIFIED</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex-1 bg-[#06040E] px-2.5 py-1.5 border border-[#231A42] text-[11px] text-white font-mono select-all truncate">
                {contactEmail}
              </span>
              <button
                onClick={handleCopyEmail}
                className="retro-btn px-2.5 py-1.5 text-[10px] text-[#DDD6FE] hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#00E599]" />
                    <span className="text-[#00E599]">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-[#7A6F96]">{CONTACT_CONFIG.tagline}</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="md:col-span-7">
          <div className="retro-bevel-out bg-[#0E0A21] p-5 rounded-xs border border-[#2B1D54] space-y-4">
            <div className="flex items-center justify-between border-b border-[#241944] pb-2 text-[11px]">
              <span className="text-white font-bold">MESSAGE COMPOSER</span>
              <span className="text-[#8E85AA] text-[9px]">DIRECT DISPATCH</span>
            </div>

            {submitted ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-[#132B1D] border border-[#00E599]/40 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#00E599]" />
                </div>
                <h3 className="font-['Syne',sans-serif] text-base font-bold uppercase text-white">
                  TRANSMISSION INITIATED
                </h3>
                <p className="text-xs text-[#D4CEE8] max-w-sm mx-auto font-sans">
                  Your mail client has been opened with your parameters addressed to {contactEmail}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="retro-btn px-4 py-2 text-white text-xs uppercase cursor-pointer"
                >
                  COMPOSE ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1 font-bold">
                    NAME / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Jane Doe / Builder"
                    className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3 py-2 text-xs text-white focus:outline-none rounded-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1 font-bold">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@domain.com"
                    className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3 py-2 text-xs text-white focus:outline-none rounded-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#A78BFA] uppercase tracking-wider mb-1 font-bold">
                    PROPOSAL / INQUIRY DETAILS
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your product idea, challenge, or collaboration concept..."
                    className="w-full bg-[#080512] border border-[#251A47] focus:border-[#8B5CF6] px-3 py-2 text-xs text-white focus:outline-none rounded-xs font-mono resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 retro-btn-accent text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer rounded-xs"
                >
                  <span>SEND TRANSMISSION</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
