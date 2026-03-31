import { motion } from "framer-motion";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const articles = [
  {
    title: "Dicas para dar remédio para bebês sem choro",
    category: "Guia Prático",
    desc: "Estratégias acolhedoras para tornar o momento menos estressante nos primeiros meses de vida."
  },
  {
    title: "Como explicar ao seu filho que precisa tomar o remédio",
    category: "Psicologia Infantil",
    desc: "A importância do diálogo transparente e adequado para cada idade na construção da confiança."
  },
  {
    title: "A luta diária dos pais na hora do medicamento",
    category: "Maternidade Real",
    desc: "Um ensaio sobre a culpa, o cansaço e como encontrar leveza nos momentos de cuidado."
  },
  {
    title: "Histórias reais: como famílias estão superando esse desafio",
    category: "Comunidade",
    desc: "Relatos emocionantes de pais que transformaram a rotina de medicação em casa."
  }
];

export default function Blog() {
  return (
    <main className="min-h-screen bg-background pt-12 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-20 text-center">
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-6xl text-foreground mb-6">
            Blog EasyDose
          </motion.h1>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conteúdo educativo, acolhedor e real para pais que buscam cuidar melhor de seus filhos.
          </motion.p>
        </motion.div>

        {/* Featured Article */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp} className="mb-24">
          <Link href="/blog">
            <div className="group block rounded-2xl bg-card border border-border p-8 md:p-12 hover:border-primary/50 transition-colors cursor-pointer">
              <span className="text-primary font-medium tracking-wide text-sm uppercase mb-4 block">Artigo em Destaque</span>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 group-hover:text-primary transition-colors">
                Por que crianças resistem a tomar remédio?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                O medo do desconhecido, o sabor amargo e a percepção de perda de controle. Entenda o que se passa na cabeça da criança e como mudar essa dinâmica para uma abordagem mais gentil.
              </p>
            </div>
          </Link>
        </motion.section>

        {/* Article Grid */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href="/blog">
                  <div className="group block h-full p-8 border-b md:border border-border/50 md:rounded-xl hover:bg-card/50 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-muted-foreground mb-3 block">{article.category}</span>
                    <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {article.desc}
                    </p>
                    <span className="text-sm font-medium text-foreground uppercase tracking-wide group-hover:text-primary transition-colors">
                      Ler mais
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Histórias de Pais */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="border-t border-border pt-24">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl text-center text-foreground mb-16">
            Histórias de Pais
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="flex flex-col">
              <p className="text-lg text-foreground/80 font-serif italic leading-relaxed mb-6">
                "Nunca vou esquecer a noite em que meu filho chorou até vomitar o antitérmico. Eu me senti a pior mãe do mundo. Ler relatos de outras famílias me fez ver que não estava sozinha nessa."
              </p>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mt-auto">
                — Laura M.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-col">
              <p className="text-lg text-foreground/80 font-serif italic leading-relaxed mb-6">
                "Mudar a forma como apresento a medicação, tirando o peso da 'obrigação' e tratando com mais leveza, mudou até o humor de recuperação da minha filha."
              </p>
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mt-auto">
                — Thiago R.
              </p>
            </motion.div>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
