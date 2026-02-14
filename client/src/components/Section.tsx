import { cn } from "@/lib/utils";
import React from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  contentClassName,
  rightSlot,
  tone = "default",
  "data-testid": dataTestId,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  rightSlot?: React.ReactNode;
  tone?: "default" | "champagne" | "trust";
  "data-testid"?: string;
}) {
  const toneStyles =
    tone === "champagne"
      ? "bg-[radial-gradient(1200px_600px_at_10%_-10%,hsl(var(--secondary)/0.55),transparent_55%),radial-gradient(900px_500px_at_90%_10%,hsl(var(--primary)/0.20),transparent_60%)]"
      : tone === "trust"
        ? "bg-[radial-gradient(1100px_520px_at_15%_-10%,hsl(var(--accent)/0.20),transparent_60%),radial-gradient(900px_520px_at_90%_0%,hsl(var(--secondary)/0.35),transparent_55%)]"
        : "bg-[radial-gradient(1100px_520px_at_10%_-10%,hsl(var(--primary)/0.16),transparent_60%),radial-gradient(900px_520px_at_90%_0%,hsl(var(--secondary)/0.38),transparent_55%)]";

  return (
    <section id={id} className={cn("relative py-14 sm:py-16 md:py-20", className)} data-testid={dataTestId}>
      <div className={cn("absolute inset-0 -z-10", toneStyles)} aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? (
              <div
                className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-4 py-2 text-xs font-semibold tracking-wide text-muted-foreground shadow-soft"
                data-testid={eyebrow ? `${dataTestId}-eyebrow` : undefined}
              >
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_0_6px_hsl(var(--primary)/0.18)]" />
                <span>{eyebrow}</span>
              </div>
            ) : null}

            <h2
              className="mt-5 text-3xl sm:text-4xl md:text-5xl leading-[1.06] text-balance"
              data-testid={dataTestId ? `${dataTestId}-title` : undefined}
            >
              {title}
            </h2>

            {subtitle ? (
              <p
                className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground text-balance"
                data-testid={dataTestId ? `${dataTestId}-subtitle` : undefined}
              >
                {subtitle}
              </p>
            ) : null}
          </div>

          {rightSlot ? <div className="md:pb-2">{rightSlot}</div> : null}
        </div>

        <div className={cn("mt-10", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
