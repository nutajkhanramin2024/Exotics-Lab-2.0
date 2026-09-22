export type WindowId =
  | "welcome"
  | "projects"
  | "team"
  | "manifesto"
  | "lab"
  | "process"
  | "telemetry"
  | "contact"
  | "terminal"
  | "browser"
  | "audio"
  | "trash"
  | "settings";

export type WallpaperId = "exotics-purple" | "midnight-dhaka" | "matrix-cyber" | "classic-teal" | "synthwave-grid";

export interface DesktopIconData {
  id: WindowId;
  label: string;
  filename: string;
  category: "core" | "portfolio" | "system" | "tools";
  description: string;
  badge?: string;
  isShortcut?: boolean;
}

export interface WindowInstance {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  badge?: string;
  statusText?: string;
}
