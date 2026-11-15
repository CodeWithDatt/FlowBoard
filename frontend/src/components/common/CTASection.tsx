"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const CTASection = () => {
  const scope = useReveal<HTMLElement>();
  const { user } = useCurrentUser();

  return (
    <section
      ref={scope}
      className="border-b border-border bg-background py-20 lg:py-28 transition-colors duration-200"
    >
      <div className="container-flow">
        {/* Large Restrained Rounded Container */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-16 text-center shadow-lg sm:px-16 lg:py-20"
        >
          {/* Subtle Decorative Radial Dot Pattern */}
          <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

          <div className="relative mx-auto max-w-2xl">
            {/* Heading */}
            <h2 className="section-heading font-display font-semibold tracking-tight text-ink">
              Stop copying context between tabs.
            </h2>

            {/* Supporting Text */}
            <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
              Bring your ideas, documents, designs, and plans into one connected
              workspace.
            </p>

            {/* Primary CTA */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Link
                href={user ? "/dashboard" : "/signup"}
                style={{ color: "#ffffff" }}
                className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/25 active:scale-[0.99]"
              >
                <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                  {user ? "Open Your Workspace" : "Build Your Workspace"}
                </span>
                <ArrowRight size={16} style={{ color: "#ffffff" }} className="!text-white shrink-0" />
              </Link>
            </div>

            {/* Secondary Text */}
            <p className="mt-4 font-mono text-[12px] text-ink-3">
              Start creating with FlowBoard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;