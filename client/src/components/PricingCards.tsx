import { GlowCard } from "@/components/GlowCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ShieldCheck, Truck, CreditCard, Star } from "lucide-react";
import soap1 from "@assets/Gemini_Generated_Image_fw0vv5fw0vv5fw0v-removebg-preview_1770998968062.png";
import soap2 from "@assets/Gemini_Generated_Image_ips1peips1peips1-removebg-preview_1770998968063.png";
import soap3 from "@assets/Gemini_Generated_Image_r6p4xtr6p4xtr6p4-removebg-preview_1770998968063.png";
import scrub1 from "@assets/Amazolé_2__Fechado_de_frente___1_-removebg-preview_1770998968066.png";
import scrub3 from "@assets/Gemini_Generated_Image_90egcc90egcc90eg-removebg-preview_1770998968064.png";
import serum1 from "@assets/unwatermarked_Gemini_Generated_Image_bknf55bknf55bknf-removebg_1770998968061.png";
import serum2 from "@assets/unwatermarked_Gemini_Generated_Image_676jjk676jjk676j-removebg_1770998968060.png";
import serum3 from "@assets/unwatermarked_Gemini_Generated_Image_a476fxa476fxa476-removebg_1770998968061.png";

type ProductSection = {
  category: string;
  options: {
    id: string;
    title: string;
    priceBefore: string;
    priceNow: string;
    badge?: string;
    isBest?: boolean;
    checkoutUrl: string;
    image: string;
  }[];
};

const sections: ProductSection[] = [
  {
    category: "SABONETE EM PASTA CLAREADOR",
    options: [
      {
        id: "soap-1",
        title: "1 Unidade",
        priceBefore: "R$ 119,90",
        priceNow: "R$ 84,40",
        checkoutUrl: "https://app.coinzz.com.br/checkout/sabone-tira-manchas-1-unidade-600",
        image: soap1,
      },
      {
        id: "soap-3",
        title: "3 Unidades",
        priceBefore: "R$ 359,70",
        priceNow: "R$ 184,40",
        badge: "⭐ MELHOR OPÇÃO",
        isBest: true,
        checkoutUrl: "https://app.coinzz.com.br/checkout/sabonete-3-unidades-602",
        image: soap3,
      },
      {
        id: "soap-2",
        title: "2 Unidades",
        priceBefore: "R$ 239,80",
        priceNow: "R$ 134,40",
        checkoutUrl: "https://app.coinzz.com.br/checkout/sabonete-2-unidades-601",
        image: soap2,
      },
    ],
  },
  {
    category: "ESFOLIANTE CLAREADOR",
    options: [
      {
        id: "scrub-1",
        title: "1 Unidade",
        priceBefore: "R$ 169,70",
        priceNow: "R$ 94,40",
        checkoutUrl: "https://app.coinzz.com.br/checkout/esfoliante-corporal-amazole-593",
        image: scrub1,
      },
      {
        id: "scrub-3",
        title: "3 Unidades",
        priceBefore: "R$ 509,10",
        priceNow: "R$ 197,40",
        badge: "⭐ MELHOR OPÇÃO",
        isBest: true,
        checkoutUrl: "https://app.coinzz.com.br/checkout/amazole-pele-de-porcelana-597",
        image: scrub3,
      },
      {
        id: "scrub-2",
        title: "2 Unidades",
        priceBefore: "R$ 339,40",
        priceNow: "R$ 154,30",
        checkoutUrl: "https://app.coinzz.com.br/checkout/amazole-garanta-60-dias-de-pele-nova-596",
        image: scrub1,
      },
    ],
  },
  {
    category: "SÉRUM ÍNTIMO CLAREADOR",
    options: [
      {
        id: "serum-1",
        title: "1 Unidade",
        priceBefore: "R$ 149,90",
        priceNow: "R$ 94,40",
        checkoutUrl: "https://app.coinzz.com.br/checkout/amazole-serum-intimo-clareador-544",
        image: serum1,
      },
      {
        id: "serum-3",
        title: "3 Unidades",
        priceBefore: "R$ 449,70",
        priceNow: "R$ 194,40",
        badge: "⭐ MELHOR OPÇÃO",
        isBest: true,
        checkoutUrl: "https://app.coinzz.com.br/checkout/serum-3-unidades-606",
        image: serum3,
      },
      {
        id: "serum-2",
        title: "2 Unidades",
        priceBefore: "R$ 299,80",
        priceNow: "R$ 154,40",
        checkoutUrl: "https://app.coinzz.com.br/checkout/serum-2-unidades-605",
        image: serum2,
      },
    ],
  },
];

export function PricingCards() {
  return (
    <div className="space-y-24" data-testid="pricing-sections">
      {sections.map((section) => (
        <div key={section.category} className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-primary uppercase" data-testid={`section-title-${section.category}`}>
              {section.category}
            </h3>
            <div className="h-1 w-12 bg-primary/20 mx-auto mt-2" />
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
            {section.options.map((o) => (
              <GlowCard
                key={o.id}
                className={[
                  "flex-1 p-6 flex flex-col border border-border/60 transition-all duration-300 bg-white",
                  o.isBest ? "ring-2 ring-primary scale-105 z-10 shadow-xl" : "shadow-sm hover:shadow-md",
                ].join(" ")}
                data-testid={`pricing-card-${o.id}`}
              >
                {o.badge && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                    {o.badge}
                  </div>
                )}
                
                <div className="aspect-square relative mb-6 overflow-hidden rounded-2xl bg-muted/10">
                  <img src={o.image} alt={o.title} className="w-full h-full object-contain p-6" />
                </div>

                <div className="text-center space-y-3 flex-grow mb-6">
                  <h4 className="font-bold text-xl">{o.title}</h4>
                  <div className="space-y-1">
                    <span className="text-sm text-muted-foreground line-through opacity-60">{o.priceBefore}</span>
                    <div className="text-4xl font-black text-foreground">{o.priceNow}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <a href={o.checkoutUrl} target="_blank" rel="noreferrer" className="block">
                    <PrimaryButton variant={o.isBest ? "primary" : "outline"} className="w-full font-bold uppercase tracking-wider py-6">
                      COMPRAR AGORA
                    </PrimaryButton>
                  </a>
                  <div className="flex justify-center gap-3 text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <CreditCard className="h-4 w-4" />
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
