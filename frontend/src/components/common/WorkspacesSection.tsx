"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { environments } from "@/constants/environments";
import {
  PenTool,
  FileText,
  Frame,
  ListChecks,
  Network,
  FolderOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Renders an authentic, beautiful mini-UI mockup inside each environment card
const MiniPreview = ({ envKey, colorVar }: { envKey: string; colorVar: string }) => {
  switch (envKey) {
    case "draw":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:12px_12px]">
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <path
              d="M 30 50 Q 80 20 140 60 T 220 30"
              fill="none"
              stroke={`var(--${colorVar})`}
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-amber-600 dark:text-amber-400">
              <PenTool size={9} /> Canvas 01
            </span>
            <span className="font-mono text-[9px] text-ink-3">Infinite Zoom</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="rounded border border-border bg-surface px-2 py-1 shadow-2xs">
              <span className="font-mono text-[9.5px] font-medium text-ink">User Idea</span>
            </div>
            <span className="font-mono text-[9px] text-ink-3">→</span>
            <div className="rounded border border-amber-500/40 bg-amber-500/10 px-2 py-1 shadow-2xs">
              <span className="font-mono text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">Flow Node</span>
            </div>
          </div>
        </div>
      );

    case "write":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-indigo-600 dark:text-indigo-400">
              <FileText size={10} /> Architecture_RFC.md
            </span>
            <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-emerald-600 dark:text-emerald-400">
              Approved
            </span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-2 w-3/4 rounded bg-ink/15 dark:bg-white/15" />
            <div className="h-2 w-full rounded bg-ink/10 dark:bg-white/10" />
            <div className="h-2 w-1/2 rounded bg-ink/10 dark:bg-white/10" />
          </div>
          <div className="mt-2 flex items-center gap-2 font-mono text-[9px] text-ink-3">
            <span>#markdown</span>
            <span>·</span>
            <span>420 words</span>
          </div>
        </div>
      );

    case "design":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-pink-600 dark:text-pink-400">
              <Frame size={10} /> AppShell.frame
            </span>
            <span className="font-mono text-[8.5px] text-ink-3">1440 × 900</span>
          </div>
          <div className="mt-2.5 rounded border border-border/80 bg-surface p-2 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="h-2 w-12 rounded-full bg-border-strong" />
              <div className="h-2 w-6 rounded-full bg-pink-500/40" />
            </div>
            <div className="mt-2 flex gap-1.5">
              <div className="h-5 w-1/3 rounded bg-surface-2 border border-border/60" />
              <div className="h-5 w-2/3 rounded bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                <span className="font-mono text-[8.5px] font-medium text-pink-600 dark:text-pink-400">UI Canvas</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "plan":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">
              <ListChecks size={10} /> Sprint 14
            </span>
            <span className="font-mono text-[8.5px] text-ink-3">3 of 4 done</span>
          </div>
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1 text-ink font-medium">
                <CheckCircle2 size={10} className="text-emerald-500 shrink-0" />
                Auth session tokens
              </span>
              <span className="font-mono text-[8.5px] text-ink-3">Done</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="flex items-center gap-1 text-ink font-medium">
                <Clock size={10} className="text-amber-500 shrink-0" />
                Live schema validator
              </span>
              <span className="font-mono text-[8.5px] text-amber-500">In review</span>
            </div>
          </div>
        </div>
      );

    case "connect":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3 flex items-center justify-center">
          <div className="absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:10px_10px] opacity-40" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-cyan-600 dark:text-cyan-400 shadow-xs">
              <PenTool size={13} />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-0.5 w-8 bg-cyan-500/60 animate-pulse" />
              <span className="font-mono text-[8px] text-cyan-600 dark:text-cyan-400">bi-sync</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/40 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shadow-xs">
              <Network size={14} />
            </div>
            <div className="flex flex-col items-center">
              <div className="h-0.5 w-8 bg-cyan-500/60 animate-pulse" />
              <span className="font-mono text-[8px] text-cyan-600 dark:text-cyan-400">linked</span>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-emerald-600 dark:text-emerald-400 shadow-xs">
              <ListChecks size={13} />
            </div>
          </div>
        </div>
      );

    case "resources":
      return (
        <div className="relative h-28 w-full overflow-hidden rounded-xl border border-border/80 bg-background/70 p-3">
          <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
            <span className="flex items-center gap-1 font-mono text-[9.5px] font-semibold text-ink">
              <FolderOpen size={10} className="text-accent" /> Project Vault
            </span>
            <span className="font-mono text-[8.5px] text-ink-3">6 items</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1">
              <span className="rounded bg-accent/10 px-1 py-0.5 font-mono text-[8px] font-semibold text-accent">SVG</span>
              <span className="truncate text-[9px] text-ink font-medium">brand_logo.svg</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface px-2 py-1">
              <span className="rounded bg-rose-500/10 px-1 py-0.5 font-mono text-[8px] font-semibold text-rose-500">PDF</span>
              <span className="truncate text-[9px] text-ink font-medium">Q4_Report.pdf</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

const WorkspaceCard = ({ env }: { env: (typeof environments)[number] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const Icon = env.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Smooth subtle 3D tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-env-card
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:border-border-strong hover:shadow-xl sm:p-7"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic interactive spotlight that tracks cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, var(--${env.colorVar}), transparent 70%)`,
          }}
        />
      )}

      {/* Top accent line — smoothly expands on hover */}
      <div
        className="absolute inset-x-0 top-0 h-[2.5px] origin-left scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: `var(--${env.colorVar})` }}
      />

      <div className="relative z-10">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `color-mix(in srgb, var(--${env.colorVar}) 13%, transparent)`,
            }}
          >
            <Icon size={20} style={{ color: `var(--${env.colorVar})` }} />
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-semibold text-ink-3">
              {env.index}
            </span>
            <ArrowUpRight
              size={13}
              className="text-ink-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          {env.name}
        </h3>
        <p
          className="mt-1 font-mono text-[12px] font-semibold tracking-wide"
          style={{ color: `var(--${env.colorVar})` }}
        >
          {env.tagline}
        </p>

        {/* Description */}
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-2">
          {env.description}
        </p>

        {/* Live Interactive UI Preview */}
        <div className="mt-5">
          <MiniPreview envKey={env.key} colorVar={env.colorVar} />
        </div>
      </div>

      {/* Card Footer Pill */}
      <div className="relative z-10 mt-6 flex items-center justify-between rounded-xl border border-border/80 bg-background/60 px-3.5 py-2.5 transition-colors duration-200 group-hover:border-border-strong">
        <span className="font-mono text-[11px] text-ink-3">
          {env.detail}
        </span>
        <span
          className="font-mono text-[11px] font-semibold"
          style={{ color: `var(--${env.colorVar})` }}
        >
          {env.verb}
        </span>
      </div>
    </div>
  );
};

const WorkspacesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Header reveal
      gsap.set(headerRef.current, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 88%",
        once: true,
        onEnter: () =>
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          }),
      });

      // Cards stagger reveal
      const cards = gridRef.current?.querySelectorAll("[data-env-card]") ?? [];
      gsap.set(cards, { opacity: 0, y: 30, scale: 0.98 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
          }),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workspaces"
      ref={sectionRef}
      className="border-b border-border bg-background-2 py-20 lg:py-32"
    >
      <div className="container-flow">
        {/* Header */}
        <div ref={headerRef} className="max-w-[58ch]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-3 shadow-2xs">
            <Sparkles size={11} className="text-accent" />
            ONE WORKSPACE, SIX ENVIRONMENTS
          </div>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Separate tools for the best experience.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            Every kind of creative work deserves its own dedicated space.
            FlowBoard brings drawing, writing, designing, and planning together
            without forcing you into one-size-fits-all compromises.
          </p>
        </div>

        {/* 6 Interactive Environment Cards Grid */}
        <div
          ref={gridRef}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {environments.map((env) => (
            <WorkspaceCard key={env.key} env={env} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspacesSection;
