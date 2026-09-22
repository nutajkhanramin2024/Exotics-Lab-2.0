import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    number: "01",
    id: "iep-unlocked",
    name: "IEP Unlocked",
    category: "AI / EDUCATION / ACCESSIBILITY",
    tagline: "Special Education Navigation & IEP Intelligence",
    description:
      "A technology platform designed to help parents better understand Individualized Education Programs and navigate complex special-education information.",
    url: "https://iepunlocked.vercel.app/",
    status: "LIVE / PRODUCT",
    isLive: true,
    featured: true,
    highlights: [
      "Document Interpretation",
      "Special Ed Terminology",
      "Parent Rights Clarification",
      "Educational Plan Analysis"
    ]
  },
  {
    number: "02",
    id: "inventorshub",
    name: "InventorsHub",
    category: "COLLABORATION / FOUNDERS / COMMUNITY",
    tagline: "Ecosystem for Ambitious Early-Stage Builders",
    description:
      "A collaboration platform designed to help early-stage builders find people to build ambitious ideas with.",
    url: "https://inventorshub.vercel.app/",
    status: "LIVE / PRODUCT",
    isLive: true,
    featured: false,
    highlights: [
      "Posts",
      "Team Finder",
      "Messages",
      "Feedback",
      "Crazy Innovators"
    ]
  },
  {
    number: "03",
    id: "type-z",
    name: "Type-Z",
    category: "IN DEVELOPMENT",
    tagline: "Confidential Experimental Initiative",
    description: "An Exotics Lab project currently in development.",
    url: "",
    status: "IN DEVELOPMENT",
    isLive: false,
    featured: false,
    highlights: [
      "Core Architecture",
      "Interface Prototyping",
      "Experimental Pipeline"
    ]
  }
];

export const CURRENTLY_BUILDING_LIST = [
  {
    number: "01",
    name: "IEP UNLOCKED",
    status: "LIVE / PRODUCT" as const,
    phase: "Active Iteration & Enhancements",
    category: "AI / Education",
    url: "https://iepunlocked.vercel.app/"
  },
  {
    number: "02",
    name: "INVENTORSHUB",
    status: "LIVE / PRODUCT" as const,
    phase: "Community & Collaboration Pipeline",
    category: "Founders / Ecosystem",
    url: "https://inventorshub.vercel.app/"
  },
  {
    number: "03",
    name: "TYPE-Z",
    status: "IN DEVELOPMENT" as const,
    phase: "Architecture & Systems Prototyping",
    category: "Experimental Studio",
    url: ""
  }
];
