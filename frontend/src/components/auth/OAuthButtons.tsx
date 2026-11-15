"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GoogleIcon, DiscordIcon, AppleIcon } from "./ProviderIcons";
import { GithubIcon } from "@/components/common/SocialIcons";

type Provider = "google" | "discord" | "github" | "apple";

const secondaryProviders: {
  key: Provider;
  label: string;
  icon: typeof DiscordIcon;
}[] = [
  {
    key: "github",
    label: "Continue with GitHub",
    icon: GithubIcon,
  },
  {
    key: "discord",
    label: "Continue with Discord",
    icon: DiscordIcon,
  },
  {
    key: "apple",
    label: "Continue with Apple",
    icon: AppleIcon,
  },
];

const OAuthButtons = () => {
  const [pending, setPending] = useState<Provider | null>(null);

  const handleProvider = async (provider: Provider) => {
    setPending(provider);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setPending(null);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* ── Google Primary OAuth ─────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => handleProvider("google")}
        disabled={pending !== null}
        className="group relative flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface text-[13.5px] font-medium text-ink shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover hover:shadow-xs active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending === "google" ? (
          <Loader2 size={16} className="animate-spin text-ink-2" />
        ) : (
          <GoogleIcon size={17} className="transition-transform duration-200 group-hover:scale-110" />
        )}
        <span>Continue with Google</span>
      </button>

      {/* ── Secondary Providers (GitHub, Discord, Apple) ────────────────── */}
      <div className="grid grid-cols-3 gap-2.5">
        {secondaryProviders.map(({ key, label, icon: Icon }) => {
          const iconColor =
            key === "discord"
              ? "text-[#5865F2]"
              : key === "github"
                ? "text-ink"
                : "text-ink";

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleProvider(key)}
              disabled={pending !== null}
              aria-label={label}
              title={label}
              className="group flex h-11 items-center justify-center rounded-xl border border-border bg-surface shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover hover:shadow-xs active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending === key ? (
                <Loader2 size={16} className={`animate-spin ${iconColor}`} />
              ) : (
                <Icon
                  size={17}
                  className={`${iconColor} transition-transform duration-200 group-hover:scale-110`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OAuthButtons;
