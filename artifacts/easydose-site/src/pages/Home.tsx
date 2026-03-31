import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      
      {/* 2. HERO */}
      <section className="relative pt-24 pb-32 overflow-hidden overflow-x-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,hsl(120,52%,92%),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(218,70%,92%),transparent_40%)]" />
        <div className="container relative z-10 mx-auto px-4 max-w-4xl text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 
              variants={fadeUp}
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 leading-tight"
            >
              Dar remédio para criança nunca foi tão simples.
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Pais conhecem a luta: a criança recusa, cospe ou chora. A EasyDose cria produtos inteligentes — como o canudo dosador e o copo oculto — que entregam a medicação de forma natural e agradável. Sem perceber o gosto. Sem estresse. Sem lágrimas.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button asChild size="lg" className="rounded-full px-8 text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#cta">Quero Avaliar</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. PROVA SOCIAL */}
      <section className="py-24 border-y border-border/50 bg-card">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-sm font-medium tracking-wider uppercase text-muted-foreground mb-16">
              Validado por pais
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { text: '"A primeira vez que meu filho tomou o xarope sem fechar a boca. Um alívio gigantesco."', author: "Mariana S." },
                { text: '"O canudo esconde completamente o gosto. Ele bebeu o suco e nem notou a medicação."', author: "Roberto F." },
                { text: '"Parei de me sentir culpada na hora do remédio. Agora é apenas mais um momento tranquilo."', author: "Camila T." }
              ].map((quote, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col justify-center items-center">
                  <p className="text-lg md:text-xl font-serif text-foreground/90 italic mb-6 leading-relaxed">
                    {quote.text}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground">{quote.author}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. POR QUE A EASYDOSE É DIFERENTE */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-center text-foreground mb-16">
              O fim da luta diária
            </motion.h2>
            <div className="space-y-12">
              {[
                { title: "A criança recebe o medicamento sem perceber", desc: "Nossos produtos integram a medicação aos hábitos naturais, como beber suco ou usar chupeta." },
                { title: "Sem choro, sem estresse", desc: "A ansiedade antes do remédio desaparece quando a experiência deixa de ser uma imposição." },
                { title: "Dosagem precisa, sem desperdício", desc: "Compartimentos exatos garantem que a dose correta seja administrada até o fim, sem respingos." },
                { title: "Produtos seguros e aprovados", desc: "Materiais atóxicos, livres de BPA e testados rigorosamente para a segurança infantil." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-l-2 border-primary pl-6 py-2">
                  <h3 className="text-2xl font-serif text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. DEPOIMENTOS COMPLETO */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-center text-foreground mb-16">
              Histórias reais
            </motion.h2>
            <div className="space-y-16">
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3">
                  <p className="font-medium text-foreground">Juliana Resende</p>
                  <p className="text-sm text-muted-foreground">Mãe de gêmeos (3 anos)</p>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-lg text-foreground/80 leading-relaxed font-serif">
                    "Sempre que meus filhos ficavam doentes, eu já sofria por antecipação. Eram dois para segurar e convencer a engolir o xarope. O copo para comprimidos mudou nossa dinâmica completamente. Eles tomam junto com o suco favorito e a hora do remédio virou, incrivelmente, um momento pacífico."
                  </p>
                </div>
              </motion.div>
              <div className="w-full h-px bg-border" />
              <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3">
                  <p className="font-medium text-foreground">Marcos Albuquerque</p>
                  <p className="text-sm text-muted-foreground">Pai da Sofia (1 ano e meio)</p>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-lg text-foreground/80 leading-relaxed font-serif">
                    "A chupeta condutora foi a maior invenção que já vimos. A Sofia sempre usou chupeta para se acalmar, então usamos o próprio conforto dela para administrar as gotinhas. É sutil, é cuidadoso e respeita o momento da criança."
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. COMO FUNCIONA */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl text-center text-foreground mb-20">
              Três passos simples
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
              {[
                { num: "01", title: "Adicione a dose", desc: "Coloque o medicamento no compartimento oculto do copo, canudo ou chupeta." },
                { num: "02", title: "Prepare a bebida", desc: "Adicione água ou o suco favorito da criança no copo principal." },
                { num: "03", title: "Ofereça", desc: "A criança suga a bebida e o remédio é administrado simultaneamente, disfarçando o sabor." }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="relative">
                  <span className="block text-6xl font-serif text-secondary/30 mb-6">{step.num}</span>
                  <h3 className="text-2xl font-medium text-foreground mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. CTA / FORMULÁRIO */}
      <section id="cta" className="py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl mb-6">
              Seja dos primeiros a experimentar
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-background/70 mb-10">
              Nossa primeira linha de produtos está sendo fabricada. Deixe seu e-mail para receber acesso antecipado e condições especiais.
            </motion.p>
            <motion.form 
              variants={fadeUp} 
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              onSubmit={(e) => { e.preventDefault(); alert("Obrigado pelo interesse!"); }}
            >
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                required 
                className="h-14 rounded-full px-6 bg-background/10 border-background/20 text-background placeholder:text-background/50 focus-visible:ring-primary focus-visible:border-primary"
              />
              <Button type="submit" className="h-14 rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Avisar-me
              </Button>
            </motion.form>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
