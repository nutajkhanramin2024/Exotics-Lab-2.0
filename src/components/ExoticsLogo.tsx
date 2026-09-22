interface ExoticsLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
}

export default function ExoticsLogo({
  className = "",
  size = "md",
  showText = true
}: ExoticsLogoProps) {
  const sizeMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
    xl: "text-2xl"
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <span className="w-2 h-2 rounded-full bg-[#00E599]" />
      <span className={`font-['Syne',sans-serif] font-bold text-white uppercase tracking-wider ${sizeMap[size]}`}>
        EXOTICS LAB
      </span>
    </div>
  );
}
