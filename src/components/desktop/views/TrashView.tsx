import { useState } from "react";
import { Trash2, FileCode2, FileSpreadsheet, FileText, Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";
import { playWindowBeep, playRetroClick } from "../../../utils/audio";

export default function TrashView() {
  const [items, setItems] = useState([
    {
      name: "300_Page_Corporate_Roadmap.pdf",
      size: "42.8 MB",
      type: "Adobe PDF Document",
      deletedDate: "2026-08-14",
      reason: "Replaced with working code."
    },
    {
      name: "AI_Pitch_Deck_Without_Code.key",
      size: "18.4 MB",
      type: "Keynote Presentation",
      deletedDate: "2026-08-20",
      reason: "No code attached."
    },
    {
      name: "Vaporware_Buzzword_Matrix.xlsx",
      size: "8.1 MB",
      type: "Excel Spreadsheet",
      deletedDate: "2026-08-29",
      reason: "Too much corporate talk, zero products."
    },
    {
      name: "Theoretical_Synergy_Meeting_Notes.doc",
      size: "3.2 MB",
      type: "Word Document",
      deletedDate: "2026-09-02",
      reason: "Action is superior to theory."
    }
  ]);

  const [isEmpty, setIsEmpty] = useState(false);

  const handleEmptyTrash = () => {
    playWindowBeep();
    setItems([]);
    setIsEmpty(true);
  };

  const handleRestore = () => {
    playRetroClick();
    setIsEmpty(false);
    setItems([
      {
        name: "300_Page_Corporate_Roadmap.pdf",
        size: "42.8 MB",
        type: "Adobe PDF Document",
        deletedDate: "2026-08-14",
        reason: "Replaced with working code."
      },
      {
        name: "AI_Pitch_Deck_Without_Code.key",
        size: "18.4 MB",
        type: "Keynote Presentation",
        deletedDate: "2026-08-20",
        reason: "No code attached."
      }
    ]);
  };

  return (
    <div className="p-4 sm:p-5 font-mono text-xs text-[#D8D2EB] bg-[#0A0717] space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between bg-[#140E2D] p-3 rounded-xs border border-[#2B1C54]">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-[#C4B5FD]" />
          <span className="font-bold text-white uppercase text-[11px]">
            RECYCLE BIN (VAPORWARE & SLIDE DECKS)
          </span>
        </div>

        {items.length > 0 ? (
          <button
            onClick={handleEmptyTrash}
            className="retro-btn px-3 py-1 text-[10px] text-[#EF4444] hover:text-white flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <Trash2 className="w-3 h-3" />
            <span>EMPTY RECYCLE BIN</span>
          </button>
        ) : (
          <button
            onClick={handleRestore}
            className="retro-btn px-3 py-1 text-[10px] text-[#00E599] hover:text-white flex items-center gap-1.5 cursor-pointer font-bold"
          >
            <RefreshCw className="w-3 h-3" />
            <span>GENERATE SAMPLE VAPORWARE</span>
          </button>
        )}
      </div>

      {isEmpty ? (
        <div className="py-12 text-center space-y-3 bg-[#080512] border border-[#1E1438] rounded-xs">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#122B1E] border border-[#00E599]/40 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-[#00E599]" />
          </div>
          <h3 className="font-['Syne',sans-serif] text-base font-bold uppercase text-white">
            RECYCLE BIN IS EMPTY
          </h3>
          <p className="text-xs text-[#8E85AA] max-w-sm mx-auto font-sans">
            Zero vaporware remains. Exotics Lab operates exclusively on functional code, active deployments, and honest engineering.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="bg-[#080512] border border-[#21163F] rounded-xs overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-[#120B26] border-b border-[#21163F] text-[10px] text-[#8E85AA] font-bold uppercase">
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Original Reason</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2 text-right">Date Deleted</div>
            </div>

            <div className="divide-y divide-[#180F33]">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="grid grid-cols-12 gap-2 px-3 py-2.5 items-center text-[11px] hover:bg-[#150D2E] transition-colors"
                >
                  <div className="col-span-5 flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                    <span className="text-white truncate font-mono">{item.name}</span>
                  </div>
                  <div className="col-span-3 text-[#A78BFA] truncate text-[10px]">
                    {item.reason}
                  </div>
                  <div className="col-span-2 text-[#8E85AA]">{item.size}</div>
                  <div className="col-span-2 text-right text-[#8E85AA] text-[10px]">
                    {item.deletedDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
