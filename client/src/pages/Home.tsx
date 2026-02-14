import React from "react";
import Seo from "@/components/Seo";
import { StickyHeader } from "@/components/StickyHeader";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Section } from "@/components/Section";
import { GlowCard } from "@/components/GlowCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { BeforeAfterGallery } from "@/components/BeforeAfterGallery";
import { PricingCards } from "@/components/PricingCards";
import {
  ArrowDownRight,
  BadgeCheck,
  HeartCrack,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

import heroImg from "@assets/unwatermarked_Gemini_Generated_Image_bm6thsbm6thsbm6t_1770997397576.png";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const OFFERS_ID = "ofertas";
const FAQ_ID = "faq";

function useScrolled(offset = 8) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}

export default function Home() {
  const scrolled = useScrolled(10);
  const scrollOffers = () => scrollToId(OFFERS_ID);

  return (
    <div className="min-h-screen pb-20 md:pb-0 bg-white text-foreground" data-testid="home">
      <Seo
        title="AmazoLé — Método Corporal Premium | Pague na Entrega"
        description="Tratamento clareador corporal e íntimo com total liberdade de pagamento. Receba primeiro, pague na entrega ou antes."
        urlPath="/"
      />

      <StickyHeader onCtaClick={scrollOffers} scrolled={scrolled} />

      {/* HERO */}
      <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden bg-white" data-testid="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 z-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-balance" data-testid="hero-title">
                Manchas que incomodam todos os dias não precisam mais fazer parte da sua rotina
              </h1>

              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground text-balance" data-testid="hero-subtitle">
                Tratamento clareador corporal e íntimo com total liberdade de pagamento.
                <br />
                <span className="font-bold text-foreground">Receba primeiro. Pague na entrega ou antes — você decide.</span>
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Pague somente na entrega",
                  "Ou pague antes com Pix ou Cartão",
                  "Compra segura e transparente",
                  "Envio rápido para todo o Brasil",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <BadgeCheck className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-bold text-sm tracking-wide uppercase">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <PrimaryButton
                  variant="primary"
                  size="lg"
                  onClick={scrollOffers}
                  data-testid="hero-cta-offers"
                  className="w-full sm:w-auto px-12 py-8 text-lg font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
                >
                  QUERO VER AS OFERTAS AGORA
                </PrimaryButton>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] -z-10 blur-2xl" />
              <img
                src={heroImg}
                alt="Modelo AmazoLé"
                className="w-full rounded-[3rem] shadow-2xl animate-float"
                data-testid="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* EMOTIONAL SECTION */}
      <Section
        id="sobre"
        title="O desconforto que você sente acaba aqui"
        subtitle="A gente sabe como é. Melasma, axilas ou virilhas escurecidas não são apenas 'manchas'. São inseguranças que nos fazem evitar roupas, momentos íntimos e até o próprio espelho."
        data-testid="pain"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2rem] bg-secondary/30 border border-secondary">
              <HeartCrack className="h-8 w-8 text-primary mb-4" />
              <h4 className="text-xl font-bold mb-3">Sua autoestima merece liberdade</h4>
              <p className="text-muted-foreground leading-relaxed">
                Você merece levantar os braços sem medo, usar o biquíni que quiser e se sentir confiante em sua própria pele. Nosso método foi criado para devolver essa liberdade a você.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/10 flex flex-col justify-center">
              <p className="text-lg font-medium italic text-primary/80 leading-relaxed">
                “Você não é obrigada a comprar os 3 produtos. Com apenas 1 produto, já é possível notar resultados visíveis. O uso combinado potencializa e acelera os resultados.”
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* RESULTS */}
      <Section
        id="resultados"
        title="Resultados Reais"
        subtitle="Transformações reais de mulheres que escolheram AmazoLé. Resultados podem variar de pessoa para pessoa."
        data-testid="results"
      >
        <BeforeAfterGallery />
      </Section>

      {/* TRUST SECTION */}
      <section className="py-20 bg-secondary/20" data-testid="payment-trust">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Você escolhe como pagar. O controle é seu.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { t: "Pagar na entrega", b: "Zero risco. Você só paga quando o produto estiver em suas mãos.", i: ShieldCheck },
              { t: "Pagar antes", b: "Mais praticidade. Use Pix ou Cartão de crédito direto no site.", i: CreditCard },
              { t: "Transparência total", b: "Sem taxas escondidas. O que você vê é o que você paga.", i: BadgeCheck },
            ].map((item) => (
              <div key={item.t} className="space-y-4">
                <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto">
                  <item.i className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{item.t}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 inline-block px-8 py-4 bg-primary text-white rounded-full font-black text-xl uppercase tracking-widest shadow-lg">
            Receba primeiro. Pague depois.
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <Section
        id={OFFERS_ID}
        title="Escolha o tratamento ideal para você"
        subtitle="Clique na oferta desejada e escolha seu método de pagamento favorito."
        data-testid="offers"
      >
        <PricingCards />
      </Section>

      {/* FAQ */}
      <Section
        id={FAQ_ID}
        title="Dúvidas Frequentes"
        data-testid="faq"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "Posso pagar somente quando receber?", a: "Sim! Essa é a nossa prioridade. Você pode escolher a opção de pagamento na entrega ao finalizar seu pedido." },
            { q: "Posso pagar antes?", a: "Sim, para quem prefere praticidade, aceitamos Pix e Cartão de Crédito diretamente no checkout." },
            { q: "É seguro?", a: "Totalmente. Além da opção de pagar na entrega, usamos as plataformas de pagamento mais seguras do Brasil." },
            { q: "Em quanto tempo chega?", a: "Nossa postagem é rápida, em até 1 dia útil. O tempo de transporte varia conforme sua região." },
            { q: "Funciona para mim?", a: "O método AmazoLé foi desenvolvido especificamente para peles brasileiras, tratando melasma e manchas escurecidas com eficácia comprovada." },
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-border bg-white shadow-sm">
              <h4 className="font-bold text-lg mb-2">{item.q}</h4>
              <p className="text-muted-foreground leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="text-center py-24 bg-primary/5" data-testid="final-cta">
        <h2 className="text-4xl sm:text-5xl font-black mb-8 tracking-tight">Pronta para transformar sua pele?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryButton variant="primary" size="lg" onClick={scrollOffers} className="px-12 py-8 font-black uppercase tracking-widest text-lg shadow-2xl">
            SIM, QUERO RECEBER E ESCOLHER COMO PAGAR
          </PrimaryButton>
        </div>
        <p className="mt-8 text-muted-foreground font-bold uppercase tracking-widest text-sm">
          PAGUE NA ENTREGA • PIX • CARTÃO
        </p>
      </Section>

      <footer className="py-12 border-t border-border text-center text-xs text-muted-foreground bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-xl font-bold text-primary mb-4">AmazoLé</div>
          <p>© {new Date().getFullYear()} AmazoLé. Todos os direitos reservados.</p>
        </div>
      </footer>

      <MobileStickyBar onScrollOffers={scrollOffers} />
    </div>
  );
}
