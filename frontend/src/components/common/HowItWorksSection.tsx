"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PenTool, FileText, Frame, ListChecks, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Capture the idea",
    description: "Start with a thought, sketch, or rough concept on your infinite canvas.",
    icon: PenTool,
    color: "draw",
    sample: "Draw · Freeform canvas",
  },
  {
    number: "02",
    title: "Develop into writing",
    description: "Turn the concept into structured notes, documents, and detailed specs.",
    icon: FileText,
    color: "write",
    sample: "Write · Product specification",
  },
  {
    number: "03",
    title: "Design and organise",
    description: "Create the interface, connect references, and shape the visual outcome.",
    icon: Frame,
    color: "design",
    sample: "Design · UI components",
  },
  {
    number: "04",
    title: "Ship and track",
    description: "Manage tasks, track progress, and keep all related resources linked.",
    icon: ListChecks,
    color: "plan",
    sample: "Plan · Sprint execution",
  },
];

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const stepsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      // Header
      gsap.set(headerRef.current, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 88%",
        once: true,
        onEnter: () => gsap.to(headerRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }),
      });

      // Steps stagger in from bottom
      const cards = stepsRef.current?.querySelectorAll("[data-step]") ?? [];
      gsap.set(cards, { opacity: 0, y: 36 });
      ScrollTrigger.batch(cards, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
          }),
      });

      // Connecting line draw-on
      const line = sectionRef.current?.querySelector("[data-connector]") as HTMLElement | null;
      if (line) {
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.create({
          trigger: stepsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () =>
            gsap.to(line, { scaleX: 1, duration: 1.2, ease: "power2.inOut", delay: 0.3 }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="border-b border-border bg-background-2 py-20 lg:py-32"
    >
      <div className="container-flow">
        {/* Header */}
        <div ref={headerRef} className="max-w-[56ch]">
          <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
            FROM FIRST IDEA TO FINAL RESULT
          </span>
          <h2 className="section-heading mt-4 font-display font-semibold tracking-tight text-ink">
            One piece of work, followed all the way through.
          </h2>
        </div>

        {/* Steps */}
        <div className="relative mt-16">
          {/* Horizontal connecting line (desktop) */}
          <div
            data-connector
            className="absolute top-5 right-8 left-8 hidden h-[2px] rounded-full bg-gradient-to-r from-border via-accent/40 to-border lg:block"
          />

          <div ref={stepsRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.number} data-step className="group relative">
                  {/* Step marker */}
                  <div className="flex items-center gap-3">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface font-mono text-[12px] font-bold text-accent shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-accent group-hover:shadow-md group-hover:shadow-accent/20">
                      {step.number}
                    </div>
                    {/* Mobile vertical connector */}
                    {i < steps.length - 1 && (
                      <div className="lg:hidden h-px flex-1 bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={15} style={{ color: `var(--${step.color})` }} />
                      <h3 className="font-display text-[17px] font-semibold text-ink transition-colors group-hover:text-accent">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-ink-2">
                      {step.description}
                    </p>
                  </div>

                  {/* Sample pill */}
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-surface px-3 py-1.5 shadow-2xs transition-all duration-200 group-hover:border-border-strong">
                    <Icon size={11} style={{ color: `var(--${step.color})` }} />
                    <span className="font-mono text-[10.5px] font-medium text-ink-2">
                      {step.sample}
                    </span>
                  </div>

                  {/* Arrow between steps on desktop */}
                  {i < steps.length - 1 && (
                    <ArrowRight
                      size={14}
                      className="absolute top-[14px] -right-4 hidden text-border-strong lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
