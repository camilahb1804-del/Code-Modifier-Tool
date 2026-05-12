import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { submitWaitlist } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

interface ProductSlide {
  src: string;
  label: string;
}

const products = [
  {
    id: "canudo",
    name: "Canudo Dosador",
    description: "Um canudo inteligente que permite a administração do medicamento líquido enquanto a criança bebe seu suco favorito. O design separa os fluxos até a boca, disfarçando o sabor amargo.",
    slides: [
      { src: "/images/canudo-caixa.png", label: "Com embalagem" },
      { src: "/images/canudo-produto.png", label: "Produto" },
    ] as ProductSlide[],
  },
  {
    id: "chupeta",
    name: "Chupeta Condutora",
    description: "Criada para bebês que utilizam chupeta. Possui um compartimento traseiro para o medicamento, permitindo uma dosagem suave e sem sobressaltos, aproveitando o reflexo natural de sucção.",
    slides: [
      { src: "/images/chupeta-caixa.png", label: "Com embalagem" },
    ] as ProductSlide[],
  },
  {
    id: "copo",
    name: "Copo para Comprimidos",
    description: "Um copo com design especial que oculta comprimidos ou medicações trituradas. A criança foca apenas na bebida, ingerindo a dose completa sem estresse visual ou recusa prévia.",
    slides: [
      { src: "/images/copo-caixa.png", label: "Com embalagem" },
      { src: "/images/copo-produto.png", label: "Produto" },
    ] as ProductSlide[],
  },
];

function ProductCarousel({ slides }: { slides: ProductSlide[] }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div className="aspect-square bg-card rounded-2xl mb-8 overflow-hidden relative border border-border/40 select-none">
      <div
        className="w-full h-full"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 flex items-center justify-center p-6 transition-opacity duration-400 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <span className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full border border-border/30">
        {slides[current].label}
      </span>

      <span className="absolute top-3 right-3 z-20 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
        Em breve
      </span>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-white transition shadow-sm"
            aria-label="Anterior"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-white transition shadow-sm"
            aria-label="Próximo"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-foreground w-4" : "bg-foreground/30"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Shop() {
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [emails, setEmails] = useState<Record<string, string>>({});
  const [error, setError] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    const email = emails[id]?.trim();
    if (!email) return;
    setLoading(prev => ({ ...prev, [id]: true }));
    setError(prev => ({ ...prev, [id]: "" }));
    try {
      await submitWaitlist({ email, productId: id });
      setSubmitted(prev => ({ ...prev, [id]: true }));
    } catch {
      setError(prev => ({ ...prev, [id]: "Erro ao salvar. Tente novamente." }));
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <main className="min-h-screen bg-background pt-12 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">

        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-20 text-center">
          <motion.h1 variants={fadeUp} className="font-chewy text-5xl md:text-6xl text-foreground mb-6">
            Nossos Produtos
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design inteligente focado em transformar a hora do medicamento em um momento pacífico.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp} className="flex flex-col h-full">
              <ProductCarousel slides={product.slides} />

              <h2 className="font-chewy text-3xl text-foreground mb-3">{product.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {product.description}
              </p>

              <div className="mt-auto">
                {submitted[product.id] ? (
                  <div className="bg-primary/10 border border-primary/20 px-6 py-4 rounded-xl text-center">
                    <p className="text-sm font-medium text-foreground">
                      ✅ Você será notificado quando o produto estiver disponível!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e, product.id)} className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      required
                      value={emails[product.id] ?? ""}
                      onChange={(e) => setEmails(prev => ({ ...prev, [product.id]: e.target.value }))}
                      className="h-12 bg-transparent border-border"
                    />
                    {error[product.id] && (
                      <p className="text-xs text-destructive">{error[product.id]}</p>
                    )}
                    <Button
                      type="submit"
                      disabled={loading[product.id]}
                      className="w-full h-12 bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-60"
                    >
                      {loading[product.id] ? "Salvando…" : "Avise-me quando lançar"}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </main>
  );
}
