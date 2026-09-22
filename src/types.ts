export interface Project {
  number: string;
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  url: string;
  status: "LIVE / PRODUCT" | "IN DEVELOPMENT";
  isLive: boolean;
  featured?: boolean;
  highlights: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imagePath: string;
  monochromeOnly?: boolean;
  initials: string;
}

export interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface BuildingNowItem {
  number: string;
  name: string;
  status: "LIVE / PRODUCT" | "IN DEVELOPMENT";
  phase: string;
  category: string;
  url?: string;
}
