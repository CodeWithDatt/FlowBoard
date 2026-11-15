"use client";

import { useState, type InputHTMLAttributes } from "react";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const AuthInput = ({ label, id, ...props }: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col gap-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className={`text-[12.5px] font-medium transition-colors duration-200 ${
            isFocused
              ? "text-accent font-semibold"
              : isHovered
                ? "text-ink"
                : "text-ink-2"
          }`}
        >
          {label}
        </label>
      </div>

      <div className="relative">
        <input
          id={id}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`h-10.5 w-full rounded-xl border bg-background px-3.5 text-[13.5px] text-ink placeholder:text-ink-3 transition-all duration-250 ease-out focus:outline-none ${
            isFocused
              ? "border-accent ring-2 ring-accent/20 shadow-md shadow-accent/10 bg-surface"
              : isHovered
                ? "border-accent/60 shadow-xs shadow-accent/5 bg-surface-hover/30"
                : "border-border hover:border-border-strong"
          }`}
        />

        {/* Subtle accent glow line on bottom of input when active/hovered */}
        <div
          className={`pointer-events-none absolute bottom-0 inset-x-3 h-[2px] rounded-full transition-all duration-300 ${
            isFocused
              ? "bg-accent opacity-100 scale-x-100"
              : isHovered
                ? "bg-accent/40 opacity-70 scale-x-75"
                : "opacity-0 scale-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default AuthInput;
