import {
  FolderOpen,
  Frame,
  ListChecks,
  Network,
  PenTool,
  FileText,
} from "lucide-react";
import type { Environment } from "@/types/environment";

export const environments: Environment[] = [
  {
    key: "draw",
    index: "01",
    name: "Draw",
    verb: "Sketch it",
    tagline: "Infinite canvas for visual thinking",
    description:
      "Think visually on an infinite canvas. Sketch ideas, build diagrams, map concepts, and explore possibilities without limits.",
    detail: "Infinite pan & zoom · Vector shapes",
    icon: PenTool,
    colorVar: "draw",
  },
  {
    key: "write",
    index: "02",
    name: "Write",
    verb: "Draft it",
    tagline: "Structured docs and rich content",
    description:
      "Turn thoughts into structured documents, notes, and rich content in a focused writing environment.",
    detail: "Rich block editor · Markdown specs",
    icon: FileText,
    colorVar: "write",
  },
  {
    key: "design",
    index: "03",
    name: "Design",
    verb: "Shape it",
    tagline: "Interface concepts and UI layouts",
    description:
      "Create and organize website and application interfaces in a dedicated visual design environment.",
    detail: "Responsive frames · UI components",
    icon: Frame,
    colorVar: "design",
  },
  {
    key: "plan",
    index: "04",
    name: "Plan",
    verb: "Ship it",
    tagline: "Projects, tasks and workflows",
    description:
      "Organize projects, tasks, subtasks, and workflows using flexible planning views.",
    detail: "Kanban boards · Sprint milestones",
    icon: ListChecks,
    colorVar: "plan",
  },
  {
    key: "connect",
    index: "05",
    name: "Connect",
    verb: "See it",
    tagline: "Visual relationships across work",
    description:
      "Link ideas, documents, designs, and tasks to understand how everything fits together.",
    detail: "Living relationship graph · No silos",
    icon: Network,
    colorVar: "connect",
  },
  {
    key: "resources",
    index: "06",
    name: "Resources",
    verb: "Keep it",
    tagline: "Files, assets and reference vault",
    description:
      "Keep files, attachments, and useful resources organized and accessible across your workspace.",
    detail: "Centralized assets · Live references",
    icon: FolderOpen,
    colorVar: "resources",
  },
];
