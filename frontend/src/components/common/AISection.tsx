"use client";

import {
  Bot,
  MessageSquareDashed,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  FileText,
  ListChecks,
  PenTool,
} from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const AISection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="ai"
      ref={scope}
      className="border-b border-border bg-background py-20 lg:py-32 transition-colors duration-200"
    >
      <div className="container-flow">
        {/* Header */}
        <div className="mx-auto max-w-[56ch] text-center" data-reveal>
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
            INTELLIGENCE WITH CONTEXT
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            Don&apos;t give AI another empty chat.{" "}
            <span className="text-accent">Give it the work.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-2">
            An intelligent workspace should understand the context of your work
            and help you move it forward, rather than making you explain
            everything again.
          </p>
        </div>

        {/* Side-by-side Comparison Visual */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* ================= LEFT PANEL: TRADITIONAL AI CHAT ================= */}
          <div
            data-reveal
            className="rounded-2xl border border-border bg-surface-2 p-6 transition-all duration-200 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface border border-border text-ink-3">
                  <MessageSquareDashed size={16} />
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    Traditional AI Chat
                  </p>
                  <span className="font-mono text-[10.5px] text-ink-3">
                    Disconnected chat window
                  </span>
                </div>
              </div>

              <span className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-medium text-amber-600 dark:text-amber-400">
                <AlertCircle size={10} /> Zero Context
              </span>
            </div>

            {/* Empty Chat Simulation */}
            <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-surface p-5">
              <p className="text-[13.5px] text-ink-3 italic">
                &ldquo;Hi! I am a blank assistant. Please paste your 500-line spec, wireframe notes, and task lists so I know what you are talking about...&rdquo;
              </p>
            </div>

            <ul className="mt-5 space-y-2 text-[13px] text-ink-2">
              <li className="flex items-center gap-2 text-ink-3">
                <span className="h-1 w-1 rounded-full bg-ink-3" />
                Empty chat requiring repetitive context pasting
              </li>
              <li className="flex items-center gap-2 text-ink-3">
                <span className="h-1 w-1 rounded-full bg-ink-3" />
                No workspace context or awareness of other files
              </li>
              <li className="flex items-center gap-2 text-ink-3">
                <span className="h-1 w-1 rounded-full bg-ink-3" />
                Generic, hallucinated answers with no project memory
              </li>
            </ul>
          </div>

          {/* ================= RIGHT PANEL: CONTEXT-AWARE FLOWBOARD AI ================= */}
          <div
            data-reveal
            className="rounded-2xl border border-accent/40 bg-surface p-6 shadow-md transition-all duration-200 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-ink shadow-xs">
                  <Bot size={16} />
                </span>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    Context-Aware FlowBoard
                  </p>
                  <span className="font-mono text-[10.5px] text-accent">
                    Workspace-grounded concept
                  </span>
                </div>
              </div>

              <span className="flex items-center gap-1 rounded bg-accent-tint px-2 py-0.5 font-mono text-[10.5px] font-medium text-accent">
                <Sparkles size={11} /> 4 objects attached
              </span>
            </div>

            {/* Context-Rich Interaction Simulation */}
            <div className="mt-6 space-y-2.5">
              <div className="rounded-lg bg-surface-hover px-3.5 py-2.5">
                <p className="text-[13.5px] font-medium text-ink">
                  &ldquo;Convert the Auth Canvas & Spec into prioritized sprint tasks.&rdquo;
                </p>
              </div>

              <div className="rounded-lg border border-border bg-background px-3.5 py-3">
                <div className="flex items-center gap-2 font-mono text-[11px] text-accent">
                  <CheckCircle2 size={12} />
                  Connected to: Canvas #8f2 · Spec.md · Design UI
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">
                  Created 4 tasks in <span className="font-medium text-ink">Plan</span> with direct backlinks to Section 3.2 of your RFC spec.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-2 text-[13px] text-ink-2">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Automatic awareness of existing project context
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Interlinked notes, documents, designs, and tasks
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Grounded in the real work you already built
              </li>
            </ul>
          </div>
        </div>

        {/* Conceptual disclaimer */}
        <p className="mt-8 text-center font-mono text-[11px] text-ink-3">
          * Conceptual product vision: Contextual intelligence designed for connected creative workspaces.
        </p>
      </div>
    </section>
  );
};

export default AISection;