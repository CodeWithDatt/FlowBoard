"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordInput = ({ label, id, ...props }: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group flex flex-col gap-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label && (
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
      )}

      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`h-10.5 w-full rounded-xl border bg-background px-3.5 pr-10 text-[13.5px] text-ink placeholder:text-ink-3 transition-all duration-250 ease-out focus:outline-none ${
            isFocused
              ? "border-accent ring-2 ring-accent/20 shadow-md shadow-accent/10 bg-surface"
              : isHovered
                ? "border-accent/60 shadow-xs shadow-accent/5 bg-surface-hover/30"
                : "border-border hover:border-border-strong"
          }`}
        />

        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-2.5 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg text-ink-3 transition-all duration-200 hover:bg-surface-hover hover:text-ink active:scale-90"
        >
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>

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

export default PasswordInput;
