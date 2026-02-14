import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export function PrimaryButton({
  children,
  className,
  loading,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "champagne" | "trust" | "outline";
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses =
    size === "sm"
      ? "px-4 py-2.5 text-sm rounded-xl"
      : size === "lg"
        ? "px-6 py-3.5 text-base rounded-2xl"
        : "px-5 py-3 text-sm sm:text-base rounded-2xl";

  const variantClasses =
    variant === "primary"
      ? "bg-[linear-gradient(135deg,hsl(var(--primary)),hsl(var(--primary)/0.82))] text-primary-foreground shadow-[0_18px_55px_hsl(var(--primary)/0.22)] border border-primary/20"
      : variant === "trust"
        ? "bg-[linear-gradient(135deg,hsl(var(--accent)),hsl(var(--accent)/0.78))] text-accent-foreground shadow-[0_18px_55px_hsl(var(--accent)/0.18)] border border-accent/20"
        : variant === "champagne"
          ? "bg-[linear-gradient(135deg,hsl(var(--secondary)),hsl(var(--secondary)/0.78))] text-secondary-foreground shadow-[0_18px_55px_hsl(var(--secondary)/0.28)] border border-secondary/30"
          : "bg-card/60 text-foreground border border-card-border shadow-soft";

  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 font-semibold",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 active:translate-y-0",
        "disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/20 focus-visible:border-ring/60",
        sizeClasses,
        variantClasses,
        className,
      )}
    >
      <span className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
