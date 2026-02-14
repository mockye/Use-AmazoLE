import React from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
  "data-testid": dataTestId,
}: {
  children: React.ReactNode;
  className?: string;
  "data-testid"?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-card-border bg-card/70 p-6 sm:p-7 shadow-soft transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-luxe",
        "before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(1200px_420px_at_20%_0%,hsl(var(--primary)/0.25),transparent_55%),radial-gradient(900px_420px_at_90%_20%,hsl(var(--secondary)/0.45),transparent_60%)]",
        "hover:before:opacity-100",
        className,
      )}
      data-testid={dataTestId}
    >
      <div className="absolute inset-0 -z-20 grain opacity-70" aria-hidden="true" />
      {children}
    </div>
  );
}
