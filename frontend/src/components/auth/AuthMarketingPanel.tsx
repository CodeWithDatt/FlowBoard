"use client";

import { User, Users, ArrowDownUp, Sparkles } from "lucide-react";

const AuthMarketingPanel = () => {
  return (
    <div className="relative hidden h-full flex-col justify-between overflow-hidden bg-[#0A0B0E] p-6 lg:p-8 xl:p-10 text-[#F4F3F7] lg:flex select-none">
      {/* Background Dot Matrix Grid */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] opacity-60" />

      {/* Ambient Gradient Glows */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-indigo-500/15 blur-[100px]" />

      {/* ── TOP BAR: BRAND & PILL ────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold !text-white shadow-md shadow-accent/25">
            <span style={{ color: "#ffffff" }} className="!text-white font-semibold">F</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            FlowBoard
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-white/70 backdrop-blur-xs">
          <Sparkles size={10} className="text-accent" />
          <span>Workspace Architecture</span>
        </div>
      </div>

      {/* ── CENTER: ELEGANT WORKSPACE DUAL-MODE DIAGRAM ──────────────── */}
      <div className="relative z-10 my-auto py-2">
        {/* Editorial Heading */}
        <div className="mb-4 max-w-sm">
          <h2 className="font-display text-2xl xl:text-[1.7rem] font-semibold tracking-tight text-white leading-tight">
            Independent thought. <br />
            <span className="text-accent">Combined creation.</span>
          </h2>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/60">
            FlowBoard separates solo exploration from team execution so you never compromise on focus or collaboration.
          </p>
        </div>

        {/* Visual Dual-Mode Architecture Diagram */}
        <div className="relative mx-auto w-full max-w-sm flex flex-col gap-2">
          {/* ── Card 1: Normal / Personal Workspace (Independent) ── */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-2xs">
                  <User size={14} />
                </span>
                <div>
                  <h3 className="font-display text-[13px] font-semibold text-white">
                    Personal Workspace
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-amber-400/90 font-medium">
                    Independent Use · Private by default
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9px] text-white/60">
                Solo Focus
              </span>
            </div>

            <p className="mt-2 text-[11.5px] leading-relaxed text-white/65">
              Your private canvas for raw ideas, unshared notes, and focused individual work with zero outside noise.
            </p>

            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Private Vault
              </span>
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Solo Canvas
              </span>
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Drafting
              </span>
            </div>
          </div>

          {/* ── Diagram Connector Conduit: Bridge between Solo & Team ── */}
          <div className="relative flex items-center justify-center py-0.5">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0E1017] px-3 py-1 shadow-sm">
              <ArrowDownUp size={11} className="text-accent animate-pulse" />
              <span className="font-mono text-[9.5px] font-semibold text-white/75">
                Seamless Bridge · One Shared Graph
              </span>
            </div>
          </div>

          {/* ── Card 2: Custom Workspace (Combined / Collaborative) ── */}
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:bg-white/[0.06]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 border border-accent/40 text-accent shadow-2xs">
                  <Users size={14} />
                </span>
                <div>
                  <h3 className="font-display text-[13px] font-semibold text-white">
                    Custom Workspace
                  </h3>
                  <p className="font-mono text-[9px] uppercase tracking-wider text-accent font-medium">
                    Combined Use · Team Collaboration
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-accent/15 border border-accent/30 px-2 py-0.5 font-mono text-[9px] text-accent">
                Multi-User
              </span>
            </div>

            <p className="mt-2 text-[11.5px] leading-relaxed text-white/65">
              Shared team space for collective projects, sprint coordination, and real-time synchronized execution.
            </p>

            <div className="mt-2.5 flex items-center gap-1.5">
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Shared Sprints
              </span>
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Team Specs
              </span>
              <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[9.5px] text-white/70">
                Role Permissions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR: SUMMARY PHILOSOPHY ──────────────────────────── */}
      <div className="relative z-10 border-t border-white/10 pt-3">
        <p className="font-display text-[12.5px] font-medium text-white/80 leading-snug">
          &ldquo;Start independently in your private space. Move to custom workspaces when it&apos;s time to build together.&rdquo;
        </p>
        <span className="mt-1 block font-mono text-[10px] text-white/40">
          FlowBoard Workspace Model · Personal & Team Edition
        </span>
      </div>
    </div>
  );
};

export default AuthMarketingPanel;
