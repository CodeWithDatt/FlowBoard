"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import AuthMarketingPanel from "./AuthMarketingPanel";

const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid h-dvh w-full overflow-hidden bg-background lg:grid-cols-2">
      {/* ── Left Column: Fixed-Height Marketing & Architecture Showcase ── */}
      <AuthMarketingPanel />

      {/* ── Right Column: Interactive Auth Form (No Scrollbar on Desktop) ── */}
      <div className="flex h-dvh flex-col overflow-y-auto lg:overflow-hidden">
        {/* Navigation Bar inside Auth Shell */}
        <div className="flex items-center justify-between px-6 pt-4 sm:px-8 sm:pt-5 shrink-0">
          {/* Mobile Logo */}
          <Link href="/" className="group flex items-center gap-2.5 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent font-display text-[13px] font-semibold !text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
              <span style={{ color: "#ffffff" }} className="!text-white">F</span>
            </div>
            <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
              FlowBoard
            </span>
          </Link>

          {/* Desktop Back Link with animated arrow */}
          <Link
            href="/"
            className="group hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-medium text-ink-2 transition-all duration-200 hover:bg-surface-hover hover:text-ink lg:inline-flex"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1 text-ink-3 group-hover:text-ink"
            />
            <span>Back to site</span>
          </Link>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>

        {/* Central Form Container — centered without vertical overflow */}
        <div className="flex flex-1 items-center justify-center px-6 py-2 sm:px-8">
          <div className="w-full max-w-[370px]">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
