import { useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import DesktopEnvironment from "./components/desktop/DesktopEnvironment";

export default function App() {
  useEffect(() => {
    // Add custom cursor class to body on desktop hover
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      document.body.classList.add("has-custom-cursor");
    }
    return () => {
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05030A] text-[#F4F4F4] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#7C3AED] selection:text-white bg-noise">
      {/* Interactive Desktop Cursor */}
      <CustomCursor />

      {/* Complete PC Desktop Operating System */}
      <DesktopEnvironment />
    </div>
  );
}
