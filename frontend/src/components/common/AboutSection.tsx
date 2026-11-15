"use client";

import { useReveal } from "@/hooks/useReveal";
import { Check } from "lucide-react";

const supportingPoints = [
  "Specialized environments for different kinds of work.",
  "Shared context across your workspace.",
  "Flexible relationships between content.",
  "A consistent experience from idea to execution.",
];

const keywordChips = [
  "Draw",
  "Write",
  "Design",
  "Plan",
  "Connect",
  "Create",
];

const AboutSection = () => {
  const scope = useReveal<HTMLElement>();

  return (
    <section
      id="about"
      ref={scope}
      className="border-b border-border bg-surface-2 py-20 lg:py-32 transition-colors duration-200"
    >
      <div className="container-flow grid gap-14 lg:grid-cols-2 lg:items-center">
        {/* ================= LEFT COLUMN: OUR PHILOSOPHY ================= */}
        <div data-reveal>
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
            OUR PHILOSOPHY
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            We didn&apos;t set out to clone anything.
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15.5px] leading-relaxed text-ink-2">
            FlowBoard is built around a simple belief: your work should live in
            one connected environment, not be scattered across disconnected
            applications.
          </p>

          <ul className="mt-7 space-y-3">
            {supportingPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-[14px] text-ink"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check size={12} strokeWidth={2.5} />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* ================= RIGHT COLUMN: ELEGANT QUOTE CARD & KEYWORD CHIPS ================= */}
        <div data-reveal className="flex flex-col gap-6">
          <blockquote className="rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:p-10">
            <p className="font-display text-2xl font-semibold leading-snug text-ink sm:text-[1.75rem]">
              &ldquo;Separate tools for the best experience.
              <br />
              <span className="text-accent">
                Connected tools for the best workflow.
              </span>
              &rdquo;
            </p>
            <p className="mt-5 font-mono text-[12px] text-ink-3">
              — The FlowBoard philosophy
            </p>
          </blockquote>

          {/* Keyword Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {keywordChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-[11.5px] font-medium text-ink-2 shadow-2xs transition-colors hover:border-accent hover:text-accent"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;