"use client";

import Link from "next/link";
import { GithubIcon, LinkedinIcon, XIcon } from "./SocialIcons";

const workspaceLinks = [
  { label: "Draw", href: "#workspaces" },
  { label: "Write", href: "#workspaces" },
  { label: "Design", href: "#workspaces" },
  { label: "Plan", href: "#workspaces" },
  { label: "Connect", href: "#workspaces" },
  { label: "Resources", href: "#workspaces" },
];

const exploreLinks = [
  { label: "Features", href: "#connected-system" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
  { label: "Use Cases", href: "#how-it-works" },
];

const accountLinks = [
  { label: "Login", href: "/login" },
  { label: "Get Started", href: "/signup" },
];

const moreLinks = [
  { label: "Contact", href: "mailto:support@flowboard.app" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
];

const socials = [
  { icon: XIcon, href: "https://x.com", label: "X (Twitter)" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
];

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-surface-2 pt-16 pb-12 transition-colors duration-200">
      <div className="container-flow">
        {/* Top Footer 5-Column Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Column 1: Brand & Bio */}
          <div>
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-semibold !text-white shadow-2xs transition-transform duration-200 group-hover:scale-105">
                F
              </div>
              <span className="font-display text-lg font-semibold tracking-tight text-ink">
                FlowBoard
              </span>
            </Link>
            <p className="mt-4 max-w-[30ch] text-[13.5px] leading-relaxed text-ink-2">
              One connected workspace for ideas, creation, and collaboration.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-ink-2 transition-all duration-200 hover:border-accent hover:text-accent"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Workspace */}
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
              WORKSPACE
            </p>
            <ul className="mt-4 space-y-2.5">
              {workspaceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
              EXPLORE
            </p>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Account */}
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
              ACCOUNT
            </p>
            <ul className="mt-4 space-y-2.5">
              {accountLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: More */}
          <div>
            <p className="font-mono text-[11px] font-semibold tracking-wider uppercase text-ink-3">
              MORE
            </p>
            <ul className="mt-4 space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-ink-2 transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM BAR WITH "MADE BY DATT PATEL" BRANDING ================= */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="font-mono text-[11.5px] text-ink-3">
            © 2026 FlowBoard. All rights reserved.
          </p>

          {/* Stylish, Subtle Creator Credit Line */}
          <div className="flex items-center gap-1.5 font-mono text-[12px] text-ink-3">
            <span>Made with</span>
            <span className="text-accent text-[12px]" aria-label="love">
              ♥
            </span>
            <span>by</span>
            <span className="font-semibold text-ink transition-colors duration-200 hover:text-accent">
              Datt Patel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;