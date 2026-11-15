"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

import AuthShell from "@/components/auth/AuthShell";
import OAuthButtons from "@/components/auth/OAuthButtons";
import AuthInput from "@/components/auth/AuthInput";
import PasswordInput from "@/components/auth/PasswordInput";

type LoginResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const contentType = response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "The server returned an unexpected response. Make sure the backend is running on http://localhost:5000.",
        );
      }

      const data: LoginResponse = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.message || "Unable to log in. Please check your credentials.",
        );
        return;
      }

      router.replace("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to connect to FlowBoard. Please make sure the backend is running.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      {/* ── Form Header ──────────────────────────────────────────────── */}
      <div className="mb-4">
        <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
          Welcome back
        </h1>
        <p className="mt-1 text-[13px] text-ink-2">
          Log in to access your connected workspaces and documents.
        </p>
      </div>

      {/* ── Social OAuth Buttons ─────────────────────────────────────── */}
      <OAuthButtons />

      {/* ── Divider ──────────────────────────────────────────────────── */}
      <div className="my-3.5 flex items-center gap-3">
        <div className="h-px flex-1 bg-border" />
        <span className="font-mono text-[10px] font-medium tracking-wider text-ink-3">
          OR CONTINUE WITH EMAIL
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      {/* ── Login Form with Interactive Hover States ──────────────────── */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
        <AuthInput
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
        />

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-[12px] font-medium text-ink-2">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[11.5px] font-medium text-accent hover:text-accent-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-1">
            <PasswordInput
              id="login-password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

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
              <Loader2 size={16} className="animate-spin text-white" style={{ color: "#ffffff" }} />
              <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                Logging in...
              </span>
            </>
          ) : (
            <>
              <span style={{ color: "#ffffff" }} className="!text-white font-semibold">
                Log in
              </span>
              <ArrowRight
                size={15}
                style={{ color: "#ffffff" }}
                className="!text-white transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </>
          )}
        </button>
      </form>

      {/* ── Switch to Sign up ────────────────────────────────────────── */}
      <p className="mt-3.5 text-center text-[12.5px] text-ink-2">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
