"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { authApi } from "@/services/api";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ThemeToggle from "./ThemeToggle";
import ScrollProgress from "./ScrollProgress";
import { useCurrentUser } from "@/hooks/useCurrentUser";

// EXACT required order: Workspace, Feature, How It Works, About
const navLinks = [
  { label: "Workspace",   href: "#workspaces"  },
  { label: "Feature",     href: "#features"    },
  { label: "How It Works",href: "#how-it-works"},
  { label: "About",       href: "#about"       },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]     = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [scrolled, setScrolled]         = useState(false);

  const { user, isLoading: isUserLoading } = useCurrentUser();

  const headerRef        = useRef<HTMLElement>(null);
  const logoRef          = useRef<HTMLAnchorElement>(null);
  const linksRef         = useRef<HTMLDivElement>(null);
  const actionsRef       = useRef<HTMLDivElement>(null);
  const menuOverlayRef   = useRef<HTMLDivElement>(null);
  const menuPanelRef     = useRef<HTMLDivElement>(null);
  const menuContentRef   = useRef<HTMLDivElement>(null);
  const menuButtonRef    = useRef<HTMLButtonElement>(null);

  // ── Navbar entrance animation ────────────────────────────────────────────
  useGSAP(() => {
    if (!headerRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const links   = linksRef.current   ? Array.from(linksRef.current.querySelectorAll("a")) : [];
    const actions = actionsRef.current ? Array.from(actionsRef.current.children) : [];

    gsap.set([logoRef.current, ...links, ...actions], { opacity: 0, y: -8 });
    gsap.to(logoRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", delay: 0.05 });
    gsap.to(links,   { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05, delay: 0.1 });
    gsap.to(actions, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05, delay: 0.18 });
  }, []);

  // ── Scroll shadow effect ──────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mobile menu animation ─────────────────────────────────────────────────
  useGSAP(() => {
    if (!menuOverlayRef.current || !menuPanelRef.current || !menuContentRef.current) return;
    const items = menuContentRef.current.querySelectorAll(".menu-item");

    if (isMenuOpen) {
      gsap.set(menuOverlayRef.current, { display: "block", autoAlpha: 0 });
      gsap.set(menuPanelRef.current,   { autoAlpha: 0, y: -16, scale: 0.98 });
      gsap.set(items,                  { autoAlpha: 0, y: -8 });

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(menuOverlayRef.current, { autoAlpha: 1, duration: 0.18 })
        .to(menuPanelRef.current,   { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 }, "-=0.08")
        .to(items,                  { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.04 }, "-=0.15");

      gsap.to(menuButtonRef.current, { scale: 0.92, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.out" });
    } else {
      gsap.timeline({ defaults: { ease: "power2.inOut" } })
        .to(items, { autoAlpha: 0, y: -6, duration: 0.12, stagger: { each: 0.02, from: "end" } })
        .to(menuPanelRef.current,   { autoAlpha: 0, y: -10, scale: 0.98, duration: 0.18 }, "-=0.05")
        .to(menuOverlayRef.current, {
          autoAlpha: 0, duration: 0.15,
          onComplete: () => { if (menuOverlayRef.current) gsap.set(menuOverlayRef.current, { display: "none" }); },
        }, "-=0.08");
    }
  }, { dependencies: [isMenuOpen] });

  // ── Smooth anchor navigation ──────────────────────────────────────────────
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    closeMenu();

    const id = href.slice(1);
    const target = document.getElementById(id);
    if (target) {
      history.pushState(null, "", href);
      const navbar = headerRef.current;
      const offset = navbar ? navbar.getBoundingClientRect().height + 14 : 78;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu  = () => setIsMenuOpen(false);

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await authApi.logout();
      closeMenu();
      window.location.replace("/");
    } catch (err) {
      console.error("Logout failed:", err);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-sm shadow-black/[0.04] dark:shadow-black/[0.2]" : "shadow-none"
        }`}
      >
        <ScrollProgress />

        <nav className="container-flow flex h-[64px] items-center justify-between">
          {/* ── LOGO ─────────────────────────────────────────────────────── */}
          <a
            ref={logoRef}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              closeMenu();
              if (window.location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                history.replaceState(null, "", "/");
              } else {
                window.location.href = "/";
              }
            }}
            className="group flex items-center gap-2.5 select-none"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-sm font-semibold !text-white shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md group-hover:shadow-accent/30">
              <span style={{ color: "#ffffff" }} className="!text-white">F</span>
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent">
              FlowBoard
            </span>
          </a>

          {/* ── DESKTOP NAVIGATION (Smooth subtle pill hover effect) ────── */}
          <div
            ref={linksRef}
            className="hidden items-center gap-1 rounded-full border border-border/60 bg-surface/60 p-1 backdrop-blur-xs lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="relative rounded-full px-4 py-1.5 text-[13px] font-medium text-ink-2 transition-all duration-200 hover:bg-ink/[0.06] hover:text-ink active:scale-95 dark:hover:bg-white/[0.08]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* ── DESKTOP ACTIONS ───────────────────────────────────────────── */}
          <div ref={actionsRef} className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />

            {isUserLoading ? (
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-12 animate-pulse rounded-md bg-border/60" />
                <div className="h-9 w-28 animate-pulse rounded-lg bg-border/60" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  style={{ color: "#ffffff" }}
                  className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13.5px] font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/20 active:scale-[0.98]"
                >
                  <span style={{ color: "#ffffff" }} className="!text-white font-semibold">Open dashboard</span>
                  <ArrowRight size={15} style={{ color: "#ffffff" }} className="!text-white shrink-0" />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-lg border border-border px-3.5 py-2 text-[13px] font-medium text-ink-2 transition-all duration-200 hover:bg-surface-hover hover:text-ink disabled:opacity-60"
                >
                  {isLoggingOut ? "Logging out…" : "Log out"}
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  Log in
                </Link>

                {/* GET STARTED BUTTON: Always pure crisp WHITE text in both light and dark mode */}
                <Link
                  href="/signup"
                  style={{ color: "#ffffff" }}
                  className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-[13.5px] font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/25 active:scale-[0.98]"
                >
                  <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                    Get started
                  </span>
                  <ArrowRight size={15} style={{ color: "#ffffff" }} className="!text-white shrink-0" />
                </Link>
              </>
            )}
          </div>

          {/* ── MOBILE ACTIONS ────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-ink-2 transition-all duration-200 hover:border-border-strong hover:text-ink active:scale-95"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── MOBILE MENU OVERLAY ────────────────────────────────────────── */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 hidden bg-ink/30 backdrop-blur-sm lg:hidden"
        onClick={closeMenu}
      >
        <div
          ref={menuPanelRef}
          className="absolute top-[64px] right-0 left-0 border-b border-border bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="container-flow py-4">
            <div ref={menuContentRef} className="rounded-2xl border border-border bg-surface p-4 shadow-lg">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="menu-item flex items-center rounded-xl px-4 py-3 text-sm font-medium text-ink-2 transition-all duration-200 hover:bg-surface-hover hover:text-ink"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="menu-item my-3 h-px bg-border" />

              {isUserLoading ? null : user ? (
                <div className="menu-item flex flex-col gap-2">
                  <Link
                    href="/dashboard"
                    onClick={closeMenu}
                    style={{ color: "#ffffff" }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold !text-white active:scale-[0.99]"
                  >
                    <span style={{ color: "#ffffff" }} className="!text-white">Open dashboard</span>
                    <ArrowRight size={17} style={{ color: "#ffffff" }} className="!text-white" />
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="flex items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-ink-2 hover:bg-surface-hover disabled:opacity-60"
                  >
                    {isLoggingOut ? "Logging out…" : "Log out"}
                  </button>
                </div>
              ) : (
                <div className="menu-item flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-medium text-ink transition-all hover:bg-surface-hover"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    style={{ color: "#ffffff" }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold !text-white active:scale-[0.99]"
                  >
                    <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                      Get started
                    </span>
                    <ArrowRight size={17} style={{ color: "#ffffff" }} className="!text-white" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
