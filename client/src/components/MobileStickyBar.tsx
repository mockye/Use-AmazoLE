import { PrimaryButton } from "@/components/PrimaryButton";
import { ShoppingBag, ShieldCheck } from "lucide-react";

export function MobileStickyBar({
  onScrollOffers,
}: {
  onScrollOffers: () => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-border md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      data-testid="mobile-sticky-bar"
    >
      <div className="flex gap-3">
        <PrimaryButton
          variant="primary"
          className="flex-1 font-black uppercase tracking-widest text-[12px] h-14 shadow-lg active:scale-95 transition-transform"
          onClick={onScrollOffers}
          data-testid="mobile-bar-scroll-offers"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          VER OFERTAS AGORA
        </PrimaryButton>
        
        <div className="flex flex-col items-center justify-center px-4 border-l border-border/60">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-[8px] font-black uppercase mt-1 leading-none text-center">Pague na<br/>Entrega</span>
        </div>
      </div>
    </div>
  );
}
