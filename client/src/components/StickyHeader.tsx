import { Link } from "wouter";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyHeader({
  onCtaClick,
  scrolled = false,
}: {
  onCtaClick: () => void;
  scrolled?: boolean;
}) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60",
        "transition-all duration-300",
        scrolled ? "shadow-sm border-border" : "border-transparent",
      )}
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3 sm:py-4">
          <Link
            href="/"
            className="flex flex-col min-w-0"
            data-testid="header-logo-link"
          >
            <div className="text-2xl font-bold tracking-tight text-primary">AmazoLé</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -mt-1 font-medium">Método Corporal Premium</div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-[10px] font-bold uppercase tracking-wider text-muted-foreground" data-testid="header-trustbar">
            <div className="flex items-center gap-2">
              <Truck className="h-3.5 w-3.5 text-primary" />
              <span>Postagem rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Pague na entrega</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" />
              <span>Pix & Cartão</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <PrimaryButton
              onClick={onCtaClick}
              variant="primary"
              size="sm"
              className="font-bold uppercase tracking-widest text-[11px]"
              data-testid="header-cta-scroll"
            >
              Ver ofertas
            </PrimaryButton>
          </div>
        </div>
      </div>
    </header>
  );
}
