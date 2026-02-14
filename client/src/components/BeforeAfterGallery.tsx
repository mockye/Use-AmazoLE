import { useMemo, useState } from "react";
import { GlowCard } from "@/components/GlowCard";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import img1 from "@assets/unwatermarked_Gemini_Generated_Image_vve5c0vve5c0vve5_1770997405902.png";
import img2 from "@assets/unwatermarked_Gemini_Generated_Image_ijunpnijunpnijun_1770997407835.png";
import img3 from "@assets/unwatermarked_Gemini_Generated_Image_l1z9wnl1z9wnl1z9_1770997415519.png";
import img4 from "@assets/Gemini_Generated_Image_5n6g9s5n6g9s5n6g_1770997430249.png";

const candidates = [
  { src: img1, alt: "Antes e depois 1" },
  { src: img2, alt: "Antes e depois 2" },
  { src: img3, alt: "Antes e depois 3" },
  { src: img4, alt: "Antes e depois 4" },
];

export function BeforeAfterGallery() {
  const [active, setActive] = useState(0);

  const activeItem = candidates[active] ?? candidates[0];

  const prev = () => setActive((v) => (v - 1 + candidates.length) % candidates.length);
  const next = () => setActive((v) => (v + 1) % candidates.length);

  return (
    <div className="max-w-4xl mx-auto" data-testid="ba-gallery">
      <GlowCard className="p-4 sm:p-6" data-testid="ba-gallery-main">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center">
              <Images className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-lg">Resultados Reais</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Seleção AmazoLé</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={prev} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
          <img
            src={activeItem.src}
            alt={activeItem.alt}
            className="w-full h-[320px] sm:h-[480px] object-cover"
            data-testid="ba-active-image"
          />
        </div>

        <div className="mt-6 grid grid-cols-4 gap-3" data-testid="ba-thumbs">
          {candidates.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={[
                "relative overflow-hidden rounded-xl border-2 transition-all duration-200",
                idx === active ? "border-primary shadow-lg scale-105" : "border-transparent opacity-60 hover:opacity-100",
              ].join(" ")}
            >
              <img src={c.src} alt={c.alt} className="h-16 sm:h-24 w-full object-cover" />
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground italic">
          *Resultados podem variar de pessoa para pessoa.
        </p>
      </GlowCard>
    </div>
  );
}
