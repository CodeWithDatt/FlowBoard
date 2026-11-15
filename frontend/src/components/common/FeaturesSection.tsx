"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Network,
  Zap,
  ArrowRight,
  GitBranch,
  Layers,
  Sparkles,
  PenTool,
  FileText,
  Frame,
  ListChecks,
  CheckCircle2,
  RefreshCw,
  FolderOpen,
  Share2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// 3 Major Product Capability Systems
const capabilities = [
  {
    id: "graph-sync",
    badge: "REAL-TIME CONTENT GRAPH",
    title: "Draw once. Connect everywhere.",
    subtitle:
      "When you sketch an architecture in Draw or draft an RFC in Write, FlowBoard automatically creates living backlinks across your design frames and sprint tasks.",
    icon: Network,
    metric: "0ms latency",
    metricLabel: "Instant bi-directional sync",
    connections: [
      { from: "Draw Canvas", fromType: "draw", to: "Architecture Spec", toType: "write", label: "Embedded RFC" },
      { from: "Architecture Spec", fromType: "write", to: "Sprint 14 Tasks", toType: "plan", label: "Auto-synced issues" },
      { from: "Sprint 14 Tasks", fromType: "plan", to: "Design Shell UI", toType: "design", label: "Live prototype" },
    ],
  },
  {
    id: "context-engine",
    badge: "UNIFIED CONTEXT PIPELINE",
    title: "Never copy context between tabs again.",
    subtitle:
      "Every document, diagram, task, and asset shares the same project context. Team members always see the complete history behind every decision.",
    icon: GitBranch,
    metric: "100% connected",
    metricLabel: "Zero isolated docs",
    connections: [
      { from: "User Research", fromType: "write", to: "Wireframe Canvas", toType: "draw", label: "Design input" },
      { from: "Wireframe Canvas", fromType: "draw", to: "Figma Asset Vault", toType: "resources", label: "Component refs" },
      { from: "Figma Asset Vault", fromType: "resources", to: "Release Checklist", toType: "plan", label: "Deploy gating" },
    ],
  },
  {
    id: "workspace-os",
    badge: "ENTERPRISE-GRADE WORKSPACE OS",
    title: "Private by default. Built for scale.",
    subtitle:
      "Multi-tenant data isolation, HTTP-only authenticated sessions, and end-to-end cryptographic integrity keep your intellectual property secure.",
    icon: Layers,
    metric: "SOC2 Ready",
    metricLabel: "Granular access control",
    connections: [
      { from: "Personal Vault", fromType: "resources", to: "Team Workspace", toType: "draw", label: "Role-based share" },
      { from: "Team Workspace", fromType: "draw", to: "Security Review", toType: "write", label: "Audit trail" },
      { from: "Security Review", fromType: "write", to: "Production Release", toType: "plan", label: "Signed RFC" },
    ],
  },
];

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const displayCardRef = useRef<HTMLDivElement>(null);

  // Entrance reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      gsap.set(headerRef.current, { opacity: 0, y: 22 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }),
      });

      gsap.set(interactiveRef.current, { opacity: 0, y: 32 });
      ScrollTrigger.create({
        trigger: interactiveRef.current,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(interactiveRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth transition when switching tabs
  const handleTabChange = (index: number) => {
    if (index === activeTab) return;
    if (displayCardRef.current) {
      gsap.fromTo(
        displayCardRef.current,
        { opacity: 0.4, scale: 0.98, y: 8 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
    setActiveTab(index);
  };

  const current = capabilities[activeTab];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="border-b border-border bg-background py-20 lg:py-32"
    >
      <div className="container-flow">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-[62ch]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-3 shadow-2xs">
            <Sparkles size={11} className="text-accent" />
            CORE CAPABILITIES
          </div>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Everything connects. Nothing gets lost.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Most creative workspaces create isolated silos. FlowBoard is
            architected from the ground up as a unified content graph where all
            six environments talk to each other in real time.
          </p>
        </div>

        {/* Interactive Feature Architecture Studio */}
        <div ref={interactiveRef} className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Left Column: Interactive Feature Selection Tabs */}
          <div className="flex flex-col gap-3.5">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeTab;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabChange(index)}
                  className={`group relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300 sm:p-6 ${
                    isActive
                      ? "border-accent/40 bg-surface shadow-md shadow-accent/5 ring-1 ring-accent/20"
                      : "border-border bg-surface/50 hover:border-border-strong hover:bg-surface"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-accent !text-white shadow-sm"
                          : "bg-surface-2 text-ink-3 group-hover:text-ink"
                      }`}
                    >
                      <Icon size={18} style={isActive ? { color: "#ffffff" } : undefined} />
                    </span>
                    <span
                      className={`font-mono text-[10.5px] font-semibold tracking-wider uppercase transition-colors ${
                        isActive ? "text-accent" : "text-ink-3"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                    {item.subtitle}
                  </p>

                  <div className="mt-4 flex items-center gap-2 pt-2 border-t border-border/60 w-full">
                    <span className="font-mono text-[11px] font-semibold text-accent">
                      {item.metric}
                    </span>
                    <span className="font-mono text-[11px] text-ink-3">
                      · {item.metricLabel}
                    </span>
                    <ArrowRight
                      size={13}
                      className={`ml-auto text-ink-3 transition-transform duration-200 ${
                        isActive ? "text-accent translate-x-1" : "group-hover:translate-x-0.5"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Dynamic Visual Representation Canvas */}
          <div
            ref={displayCardRef}
            className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-xl sm:p-8"
          >
            {/* Background Grid Pattern */}
            <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

            {/* Window Chrome / Status Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] font-semibold text-ink">
                  ContentGraph::ActivePipeline
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-2.5 py-1">
                <RefreshCw size={11} className="text-accent animate-spin" />
                <span className="font-mono text-[10px] text-accent font-semibold">
                  {current.metric}
                </span>
              </div>
            </div>

            {/* Central Visual Showcase */}
            <div className="relative z-10 mt-6 space-y-4">
              {/* Connected Active Nodes */}
              {current.connections.map((conn, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col gap-2 rounded-xl border border-border bg-surface-2/80 p-4 transition-all duration-300 hover:border-accent/40 hover:bg-surface hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Origin Node */}
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-2xs"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--${conn.fromType}) 15%, transparent)`,
                      }}
                    >
                      {conn.fromType === "draw" && <PenTool size={14} style={{ color: `var(--${conn.fromType})` }} />}
                      {conn.fromType === "write" && <FileText size={14} style={{ color: `var(--${conn.fromType})` }} />}
                      {conn.fromType === "plan" && <ListChecks size={14} style={{ color: `var(--${conn.fromType})` }} />}
                      {conn.fromType === "resources" && <FolderOpen size={14} style={{ color: `var(--${conn.fromType})` }} />}
                    </span>
                    <span className="font-display text-[13px] font-semibold text-ink">
                      {conn.from}
                    </span>
                  </div>

                  {/* Connection Energy Channel */}
                  <div className="flex items-center gap-1.5 px-2 font-mono text-[10px] text-accent bg-accent/5 rounded-md py-0.5 border border-accent/20">
                    <Zap size={10} className="text-accent" />
                    <span>{conn.label}</span>
                    <ArrowRight size={10} className="text-accent" />
                  </div>

                  {/* Destination Node */}
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-[13px] font-semibold text-ink">
                      {conn.to}
                    </span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-2xs"
                      style={{
                        backgroundColor: `color-mix(in srgb, var(--${conn.toType}) 15%, transparent)`,
                      }}
                    >
                      {conn.toType === "draw" && <PenTool size={14} style={{ color: `var(--${conn.toType})` }} />}
                      {conn.toType === "write" && <FileText size={14} style={{ color: `var(--${conn.toType})` }} />}
                      {conn.toType === "design" && <Frame size={14} style={{ color: `var(--${conn.toType})` }} />}
                      {conn.toType === "plan" && <ListChecks size={14} style={{ color: `var(--${conn.toType})` }} />}
                      {conn.toType === "resources" && <FolderOpen size={14} style={{ color: `var(--${conn.toType})` }} />}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Live Graph Sync Visual Canvas */}
            <div className="relative z-10 mt-6 rounded-2xl border border-border bg-background/80 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Share2 size={13} className="text-accent" />
                  <span className="font-mono text-[11px] font-semibold text-ink">
                    Dynamic Link Resolution
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={11} />
                  <span>3/3 Nodes Live</span>
                </div>
              </div>

              {/* Simulated mini topology */}
              <div className="mt-4 flex items-center justify-around gap-2 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 shadow-xs">
                    <PenTool size={16} />
                  </div>
                  <span className="font-mono text-[10px] text-ink-2 font-medium">Draw</span>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/50 via-accent to-indigo-500/50 animate-pulse" />
                  <span className="font-mono text-[8.5px] text-ink-3 mt-1">bi-sync</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 shadow-xs">
                    <FileText size={16} />
                  </div>
                  <span className="font-mono text-[10px] text-ink-2 font-medium">Write</span>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500/50 via-accent to-emerald-500/50 animate-pulse" />
                  <span className="font-mono text-[8.5px] text-ink-3 mt-1">auto-link</span>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-xs">
                    <ListChecks size={16} />
                  </div>
                  <span className="font-mono text-[10px] text-ink-2 font-medium">Plan</span>
                </div>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="relative z-10 mt-5 flex items-center justify-between text-[11px] font-mono text-ink-3">
              <span>RFC Specification v2.4</span>
              <span>Updated in real time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
