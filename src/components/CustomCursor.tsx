import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "project" | "team">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    // Check reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectTarget = target.closest("[data-cursor='project']");
      const teamTarget = target.closest("[data-cursor='team']");
      const linkTarget = target.closest("a, button, [role='button'], input, textarea");

      if (projectTarget) {
        setCursorVariant("project");
        setCursorText("VIEW");
      } else if (teamTarget) {
        setCursorVariant("team");
        setCursorText("MEET");
      } else if (linkTarget) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: "#FFFFFF",
      border: "0px solid transparent",
      mixBlendMode: "difference" as const,
      transition: { type: "spring", damping: 25, stiffness: 350, mass: 0.2 }
    },
    hover: {
      x: mousePosition.x - 18,
      y: mousePosition.y - 18,
      width: 36,
      height: 36,
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      mixBlendMode: "normal" as const,
      transition: { type: "spring", damping: 20, stiffness: 300 }
    },
    project: {
      x: mousePosition.x - 38,
      y: mousePosition.y - 38,
      width: 76,
      height: 76,
      backgroundColor: "#7C3AED",
      border: "1px solid rgba(255, 255, 255, 0.8)",
      mixBlendMode: "normal" as const,
      transition: { type: "spring", damping: 18, stiffness: 250 }
    },
    team: {
      x: mousePosition.x - 34,
      y: mousePosition.y - 34,
      width: 68,
      height: 68,
      backgroundColor: "#FFFFFF",
      border: "1px solid #111111",
      mixBlendMode: "normal" as const,
      transition: { type: "spring", damping: 18, stiffness: 250 }
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 rounded-full flex items-center justify-center font-mono text-[10px] font-bold tracking-widest text-black select-none hidden md:flex"
      animate={cursorVariant}
      variants={variants}
    >
      {cursorText && (
        <span className={cursorVariant === "project" ? "text-white" : "text-black"}>
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
