"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  FileText,
  Frame,
  ListChecks,
  PenTool,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const scope = useRef<HTMLDivElement>(null);
  const { user } = useCurrentUser();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Make everything immediately visible (CSS fallback for all scenarios) ──
      gsap.set(
        [
          "[data-hero-eyebrow]",
          "[data-hero-line]",
          "[data-hero-sub]",
          "[data-hero-cta]",
          "[data-hero-panel]",
          "[data-hero-card]",
        ],
        { clearProps: "all" },
      );

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) return;

      // ── Set initial hidden state AFTER clearing so we control it ──
      gsap.set("[data-hero-eyebrow]", { opacity: 0, y: 12 });
      gsap.set("[data-hero-line]", { opacity: 0, y: 24 });
      gsap.set("[data-hero-sub]", { opacity: 0, y: 16 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 12 });
      gsap.set("[data-hero-panel]", { opacity: 0, y: 28, scale: 0.98 });
      gsap.set("[data-hero-card]", { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: () => {
          // Guarantee the panel container is NOT display:none
          const panel = scope.current?.querySelector("[data-hero-panel]");
          if (panel) (panel as HTMLElement).style.visibility = "visible";
        },
      });

      tl.to("[data-hero-eyebrow]", { opacity: 1, y: 0, duration: 0.55 })
        .to(
          "[data-hero-line]",
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.09 },
          "-=0.3",
        )
        .to("[data-hero-sub]", { opacity: 1, y: 0, duration: 0.5 }, "-=0.35")
        .to(
          "[data-hero-cta]",
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.07 },
          "-=0.3",
        )
        .to(
          "[data-hero-panel]",
          { opacity: 1, y: 0, scale: 1, duration: 0.75 },
          "-=0.5",
        )
        .to(
          "[data-hero-card]",
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.4",
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="relative overflow-hidden border-b border-border bg-background"
    >
      {/* Background Dot Grid */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />

      <div className="container-flow relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-28">
        {/* ================= LEFT COLUMN ================= */}
        <div>
          {/* Eyebrow Badge */}
          <div
            data-hero-eyebrow
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-2 shadow-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            ONE WORKSPACE. ENDLESS POSSIBILITIES.
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading font-display font-semibold tracking-tight text-ink">
            <span data-hero-line className="block">
              Create anywhere.
            </span>
            <span data-hero-line className="block">
              Use everywhere.
            </span>
            <span data-hero-line className="block text-accent">
              Connect everything.
            </span>
          </h1>

          {/* Supporting Description */}
          <p
            data-hero-sub
            className="mt-6 max-w-[46ch] text-base leading-relaxed text-ink-2 sm:text-lg"
          >
            Your ideas shouldn&apos;t live in separate tools. FlowBoard brings
            drawing, writing, designing, planning, and everything in between into
            one connected workspace.
          </p>

          {/* CTA Buttons */}
          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href={user ? "/dashboard" : "/signup"}
              style={{ color: "#ffffff" }}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/25 active:scale-[0.99]"
            >
              <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                {user ? "Open your workspace" : "Start Creating Free"}
              </span>
              <ArrowRight size={16} style={{ color: "#ffffff" }} className="!text-white shrink-0" />
            </Link>

            <Link
              href="#workspaces"
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-ink shadow-2xs transition-all duration-200 hover:border-border-strong hover:bg-surface-hover active:scale-[0.99]"
            >
              Explore the Workspace
            </Link>
          </div>

          {/* Subtext */}
          <p
            data-hero-cta
            className="mt-5 font-mono text-[12px] text-ink-3"
          >
            One workspace. Multiple ways to create.
          </p>
        </div>

        {/* ================= RIGHT COLUMN (REALISTIC PRODUCT PREVIEW) ================= */}
        <div className="relative">
          <div
            data-hero-panel
            className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
          >
            {/* Window Chrome / Titlebar */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                </div>
                <span className="ml-2 hidden font-mono text-[11px] text-ink-3 sm:inline">
                  FlowBoard / Acme Workspace
                </span>
              </div>

              {/* Mini Environment Indicator Pills */}
              <div className="flex items-center gap-1 rounded-md border border-border/80 bg-background/80 p-0.5">
                <span className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium text-accent bg-surface shadow-2xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Draw
                </span>
                <span className="px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
                  Write
                </span>
                <span className="px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
                  Design
                </span>
                <span className="px-1.5 py-0.5 font-mono text-[10px] text-ink-3">
                  Plan
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[10.5px] text-ink-3">
                  Live synced
                </span>
              </div>
            </div>

            {/* Central Visual Canvas Area with Connected Cards */}
            <div className="relative min-h-[380px] sm:min-h-[430px] w-full p-4 sm:p-6 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:18px_18px] bg-background/50">
              {/* SVG Connector Lines */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M 180 100 C 230 100, 240 70, 290 70"
                  fill="none"
                  stroke="url(#connectorGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 380 150 C 380 200, 370 210, 360 250"
                  fill="none"
                  stroke="url(#connectorGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 140 260 C 140 200, 150 170, 150 135"
                  fill="none"
                  stroke="url(#connectorGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* Grid of 4 Connected Miniature Environment Cards */}
              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* CARD 1: DRAW CANVAS CARD */}
                <div
                  data-hero-card
                  className="rounded-xl border border-border bg-surface p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <PenTool size={13} />
                      </span>
                      <span className="text-[12.5px] font-semibold text-ink">
                        System Architecture
                      </span>
                    </div>
                    <span className="rounded bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-amber-600 dark:text-amber-400">
                      Draw
                    </span>
                  </div>

                  {/* Visual Node Diagram */}
                  <div className="mt-3 flex items-center justify-between gap-1 rounded-lg border border-border/80 bg-background/70 p-2.5">
                    <div className="rounded border border-border bg-surface px-2 py-1 text-center shadow-2xs">
                      <span className="font-mono text-[10px] font-medium text-ink">Client UI</span>
                    </div>
                    <span className="font-mono text-[10px] text-ink-3">→</span>
                    <div className="rounded border border-accent/40 bg-accent-tint px-2 py-1 text-center shadow-2xs">
                      <span className="font-mono text-[10px] font-semibold text-accent">Gateway</span>
                    </div>
                    <span className="font-mono text-[10px] text-ink-3">→</span>
                    <div className="rounded border border-border bg-surface px-2 py-1 text-center shadow-2xs">
                      <span className="font-mono text-[10px] font-medium text-ink">Event Bus</span>
                    </div>
                  </div>
                </div>

                {/* CARD 2: WRITE DOCUMENT CARD */}
                <div
                  data-hero-card
                  className="rounded-xl border border-border bg-surface p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                        <FileText size={13} />
                      </span>
                      <span className="text-[12.5px] font-semibold text-ink">
                        Product Spec v2.4
                      </span>
                    </div>
                    <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-indigo-600 dark:text-indigo-400">
                      Write
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 rounded-lg border border-border/80 bg-background/70 p-2.5">
                    <p className="font-display text-[11px] font-semibold text-ink">
                      # Authentication Architecture
                    </p>
                    <p className="text-[10.5px] leading-relaxed text-ink-2">
                      Server-managed HTTP-only sessions with bcrypt encryption and multi-tenant isolation.
                    </p>
                    <div className="flex items-center gap-2 pt-1 font-mono text-[9.5px] text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 size={11} />
                      RFC Approved
                    </div>
                  </div>
                </div>

                {/* CARD 3: PLAN KANBAN/TASK CARD */}
                <div
                  data-hero-card
                  className="rounded-xl border border-border bg-surface p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <ListChecks size={13} />
                      </span>
                      <span className="text-[12.5px] font-semibold text-ink">
                        Sprint Execution
                      </span>
                    </div>
                    <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-emerald-600 dark:text-emerald-400">
                      Plan
                    </span>
                  </div>

                  <div className="mt-3 space-y-1.5 rounded-lg border border-border/80 bg-background/70 p-2.5">
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="flex items-center gap-1.5 text-ink">
                        <CheckCircle2 size={11} className="text-emerald-500" />
                        Session auth middleware
                      </span>
                      <span className="font-mono text-[9.5px] text-ink-3">Done</span>
                    </div>
                    <div className="flex items-center justify-between text-[10.5px]">
                      <span className="flex items-center gap-1.5 text-ink">
                        <Clock size={11} className="text-amber-500" />
                        Live graph parser
                      </span>
                      <span className="font-mono text-[9.5px] text-amber-500">In review</span>
                    </div>
                  </div>
                </div>

                {/* CARD 4: DESIGN FRAME CARD */}
                <div
                  data-hero-card
                  className="rounded-xl border border-border bg-surface p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between border-b border-border/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/10 text-violet-600 dark:text-violet-400">
                        <Frame size={13} />
                      </span>
                      <span className="text-[12.5px] font-semibold text-ink">
                        Workspace App Shell
                      </span>
                    </div>
                    <span className="rounded bg-violet-500/10 px-1.5 py-0.5 font-mono text-[9.5px] font-medium text-violet-600 dark:text-violet-400">
                      Design
                    </span>
                  </div>

                  {/* Miniature UI Mockup */}
                  <div className="mt-3 rounded-lg border border-border/80 bg-background/70 p-2.5">
                    <div className="flex h-4 items-center justify-between rounded bg-surface px-2 border border-border/60">
                      <div className="h-1.5 w-8 rounded-full bg-border-strong" />
                      <div className="h-1.5 w-4 rounded-full bg-accent" />
                    </div>
                    <div className="mt-2 flex gap-1.5">
                      <div className="h-7 w-1/3 rounded bg-surface border border-border/60" />
                      <div className="h-7 w-2/3 rounded bg-accent-tint/60 border border-accent/20 flex items-center justify-center">
                        <span className="font-mono text-[9px] text-accent font-medium">Canvas UI</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar Indicator */}
            <div className="flex items-center justify-between border-t border-border bg-surface px-4 py-2.5 text-ink-3">
              <span className="flex items-center gap-1.5 font-mono text-[10.5px]">
                <Layers size={12} className="text-accent" />
                4 environments · 1 shared content graph
              </span>
              <span className="font-mono text-[10.5px]">v0.1.0 Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
