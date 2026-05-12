import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { submitWaitlist } from "@workspace/api-client-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const products = [
  {
    id: "canudo",
    name: "Canudo Dosador",
    description: "Um canudo inteligente que permite a administração do medicamento líquido enquanto a criança bebe seu suco favorito. O design separa os fluxos até a boca, disfarçando o sabor amargo.",
    image: "/images/canudo-dosador.png"
  },
  {
    id: "chupeta",
    name: "Chupeta Condutora",
    description: "Criada para bebês que utilizam chupeta. Possui um compartimento traseiro para o medicamento, permitindo uma dosagem suave e sem sobressaltos, aproveitando o reflexo natural de sucção.",
    image: "/images/chupeta-condutora.png"
  },
  {
    id: "copo",
    name: "Copo para Comprimidos",
    description: "Um copo com design especial que oculta comprimidos ou medicações trituradas. A criança foca apenas na bebida, ingerindo a dose completa sem estresse visual ou recusa prévia.",
    image: "/images/copo-comprimidos.png"
  }
];

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
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-foreground mb-6">
            Nossos Produtos
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design inteligente focado em transformar a hora do medicamento em um momento pacífico.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp} className="flex flex-col h-full">
              {/* Product Image Box */}
              <div className="aspect-square bg-card rounded-2xl mb-8 overflow-hidden relative border border-border/40 flex items-center justify-center p-8">
                <span className="absolute top-4 right-4 bg-muted text-muted-foreground text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                  Esgotado
                </span>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply opacity-90 hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                    e.currentTarget.parentElement?.classList.add('bg-secondary/20');
                  }}
                />
              </div>

              {/* Product Info */}
              <h2 className="font-serif text-3xl text-foreground mb-4">{product.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                {product.description}
              </p>

              {/* Waitlist Form */}
              <div className="mt-auto">
                {submitted[product.id] ? (
                  <div className="bg-primary/10 border border-primary/20 px-6 py-4 rounded-xl text-center">
                    <p className="text-sm font-medium text-foreground">
                      ✅ Você será notificado quando o produto voltar!
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
                      className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-60"
                    >
                      {loading[product.id] ? "Salvando…" : "Avise-me quando voltar"}
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
