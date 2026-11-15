"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { authApi } from "@/services/api";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password) {
      setError("Fill in every field to create your workspace.");
      return;
    }

    if (trimmedName.length < 2) {
      setError("Your name must be at least 2 characters.");
      return;
    }

    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.signup({
        name: trimmedName,
        email: trimmedEmail,
        password,
      });

      router.push("/login");
    } catch (err) {
      console.error("Signup error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong while creating your account.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      {/* ── Form Header ──────────────────────────────────────────────── */}
      <div className="mb-3.5">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Create your workspace
        </h1>
        <p className="mt-1 text-[13px] text-ink-2">
          Free for individuals. No credit card required.
        </p>
      </div>

      {/* ── Social OAuth Buttons ─────────────────────────────────────── */}
      <OAuthButtons />

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="my-3 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] font-medium tracking-wider text-ink-3">
          OR CONTINUE WITH EMAIL
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* ── Signup Form with Interactive Hover States ──────────────────── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
        <AuthInput
          id="signup-name"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

        <AuthInput
          id="signup-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />

        <PasswordInput
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl border border-danger/20 bg-danger/10 px-3 py-2 text-[12px] text-danger leading-relaxed animate-in fade-in"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Button with Hover Aura */}
        <button
          type="submit"
          disabled={isLoading}
          style={{ color: "#ffffff" }}
          className="group mt-1 flex h-10.5 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[13.5px] font-semibold !text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isLoading ? (
            <>
              <Loader2
                size={16}
                className="animate-spin text-white"
                style={{ color: "#ffffff" }}
              />
              <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                Creating account...
              </span>
            </>
          ) : (
            <>
              <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                Create account
              </span>
              <ArrowRight
                size={15}
                style={{ color: "#ffffff" }}
                className="!text-white transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>

        {/* Legal Disclaimer */}
        <p className="text-center text-[11px] leading-relaxed text-ink-3">
          By creating an account you agree to FlowBoard&apos;s{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-ink transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      {/* ── Switch to Log in ─────────────────────────────────────────── */}
      <p className="mt-2.5 text-center text-[12.5px] text-ink-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
