import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Menu, X, Terminal, HelpCircle } from "lucide-react";
import { playRetroClick } from "../utils/audio";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Archive.dir", href: "#work" },
    { label: "Manifesto.txt", href: "#about" },
    { label: "Lab_Architecture.exe", href: "#about" },
    { label: "Process_Wizard", href: "#process" },
    { label: "Personnel.sys", href: "#team" },
    { label: "Transmit.mail", href: "#contact" }
  ];

  const handleNavClick = (href: string) => {
    playRetroClick();
    setMobileMenuOpen(false);
    if (href === "#contact") {
      onOpenContact();
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        id="main-navbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 font-mono ${
          scrolled
            ? "bg-[#090616]/95 backdrop-blur-md border-b-2 border-[#2F1F5C] shadow-lg py-2.5"
            : "bg-[#070512]/90 backdrop-blur-sm py-3.5 border-b border-[#1E1438]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Official Brand Name with OS tag */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={() => playRetroClick()}
              className="group flex items-center gap-2 focus:outline-none"
              aria-label="Exotics Lab Home"
            >
              <span className="w-2 h-2 rounded-full bg-[#00E599]" />
              <span className="font-['Syne',sans-serif] font-bold text-lg text-white tracking-wider">
                EXOTICS LAB
              </span>
            </a>
            <span className="hidden lg:inline-block text-[9px] bg-[#170E33] border border-[#3A247A] px-2 py-0.5 rounded-xs text-[#C4B5FD]">
              OS_v2001
            </span>
          </div>

          {/* Desktop Nav Links formatted like early 2000s App Menu Bar */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0E0921] border border-[#24174D] p-1 rounded-xs">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-2.5 py-1 text-xs text-[#C7C2DC] hover:text-white hover:bg-[#25174D] transition-colors rounded-xs cursor-pointer select-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => {
                playRetroClick();
                onOpenContact();
              }}
              className="retro-btn-accent inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <span>DISPATCH INQUIRY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-trigger"
            onClick={() => {
              playRetroClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-white retro-btn cursor-pointer focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Fullscreen Animated Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-overlay"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-[#070512] flex flex-col justify-between px-6 pt-24 pb-10 md:hidden font-mono"
          >
            <div className="flex flex-col gap-4 mt-4">
              <div className="text-[10px] text-[#A78BFA] uppercase tracking-widest border-b border-[#231A42] pb-2 font-bold">
                SYSTEM MENU // EXOTICS LAB OS
              </div>
              {navLinks.map((link, idx) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between text-left py-2.5 px-3 bg-[#0E0A21] border border-[#231944] rounded-xs group cursor-pointer"
                >
                  <span className="text-sm font-bold uppercase tracking-wider text-white group-hover:text-[#A78BFA]">
                    {link.label}
                  </span>
                  <span className="text-xs text-[#8E85AA]">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-[#231A42]">
              <button
                onClick={() => {
                  playRetroClick();
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 px-4 retro-btn-accent text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>INITIATE TRANSMISSION</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[10px] text-[#8E85AA]">
                EXOTICS LAB // DHAKA HQ // GLOBAL REACH
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
