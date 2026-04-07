import { motion } from "framer-motion";

const QUIZ_URL = "https://seuformulario.com";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } }
};

function OrgaBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="900" cy="120" rx="420" ry="340" fill="#BBE7BB" fillOpacity="0.28" />
      <ellipse cx="1100" cy="600" rx="300" ry="220" fill="#91B2EB" fillOpacity="0.20" />
      <ellipse cx="80" cy="500" rx="260" ry="200" fill="#E4C1F9" fillOpacity="0.18" />
      <ellipse cx="300" cy="-40" rx="220" ry="180" fill="#91B2EB" fillOpacity="0.12" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background overflow-x-hidden">

      {/* ===== HERO ===== */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden py-20">
        <OrgaBackground />
        <div className="container relative z-10 mx-auto px-5 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.h1
                variants={fadeUp}
                className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground mb-7 leading-tight"
                style={{ letterSpacing: "0.01em" }}
              >
                Dar remédio nunca foi tão fácil.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
              >
                A Easy Dose transforma um momento difícil em algo simples, seguro e tranquilo para pais e crianças.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-col items-start gap-2">
                <a
                  href={QUIZ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full px-9 py-4 text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus:outline-none"
                  style={{ background: "#BBE7BB", color: "#2a4a2a" }}
                >
                  Qual o melhor método para mim?
                </a>
                <span className="text-xs text-muted-foreground pl-2">Leva menos de 1 minuto</span>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div
                className="relative w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(145deg, #e8f7e8 0%, #dceeff 60%, #f0e6fc 100%)",
                  minHeight: "380px"
                }}
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 380" fill="none" aria-hidden="true">
                  <ellipse cx="320" cy="60" rx="120" ry="90" fill="#BBE7BB" fillOpacity="0.4" />
                  <ellipse cx="80" cy="300" rx="100" ry="80" fill="#91B2EB" fillOpacity="0.3" />
                  <ellipse cx="200" cy="380" rx="180" ry="80" fill="#E4C1F9" fillOpacity="0.25" />
                </svg>
                <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-[380px] text-center px-10 py-14">
                  <p className="font-serif text-4xl text-foreground/80 mb-5 leading-snug" style={{ letterSpacing: "0.01em" }}>
                    Sem choro.<br />Sem estresse.<br />Sem luta.
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
                    Nossos produtos integram a medicação aos momentos naturais da criança — um canudo, uma chupeta, um copo.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== PROVA SOCIAL ===== */}
      <section className="py-12 border-y border-border/40">
        <div className="container mx-auto px-5 max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            Solução desenvolvida com base na rotina real de pais e crianças.
          </motion.p>
        </div>
      </section>

      {/* ===== COMO FUNCIONA ===== */}
      <section id="como-funciona" className="py-28">
        <div className="container mx-auto px-5 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-foreground mb-6" style={{ letterSpacing: "0.01em" }}>
              Como funciona
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-16 leading-relaxed">
              Dar remédio para crianças é um desafio real. O gosto amargo, a resistência, o choro — são situações que nenhum pai quer enfrentar. A Easy Dose nasceu para mudar isso.
            </motion.p>

            <div className="space-y-14">
              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-semibold text-foreground mb-3">O problema</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  A maioria das crianças rejeita medicamentos por causa do sabor, da textura ou simplesmente por medo. Para os pais, isso significa estresse, desperdício de dose e uma luta diária que ninguém deveria precisar enfrentar.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-semibold text-foreground mb-3">A solução</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Nossos produtos — o canudo dosador, a chupeta condutora e o copo para comprimidos — integram o medicamento ao momento favorito da criança. Ela bebe o suco, usa a chupeta ou toma a bebida normalmente, sem notar nada diferente.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h3 className="text-xl font-semibold text-foreground mb-3">Os benefícios</h3>
                <div className="space-y-5">
                  {[
                    { t: "Menos estresse", d: "A rotina do medicamento deixa de ser um campo de batalha. Pais mais tranquilos, crianças mais seguras." },
                    { t: "Mais segurança", d: "A dose certa é administrada até o fim, sem perdas por rejeição ou cuspida. Eficácia garantida." },
                    { t: "Melhor aceitação", d: "A criança recebe o medicamento dentro de um hábito que já conhece e ama. Sem perceber. Sem resistência." },
                  ].map((b, i) => (
                    <div key={i} className="flex gap-4">
                      <span
                        className="mt-1 shrink-0 w-5 h-5 rounded-full"
                        style={{ background: i === 0 ? "#BBE7BB" : i === 1 ? "#91B2EB" : "#E4C1F9" }}
                      />
                      <div>
                        <p className="font-medium text-foreground mb-1">{b.t}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{b.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== POR QUE É DIFERENTE ===== */}
      <section className="py-28 border-y border-border/40" style={{ background: "#f9fbf9" }}>
        <div className="container mx-auto px-5 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-foreground mb-16" style={{ letterSpacing: "0.01em" }}>
              Por que a Easy Dose é diferente
            </motion.h2>

            <div className="space-y-12">
              {[
                {
                  title: "Desenvolvido com pais reais",
                  desc: "Cada produto foi criado a partir de histórias e frustrações reais de famílias brasileiras. Não é uma solução de laboratório — é uma resposta a uma dor que milhares de pais vivem todo dia."
                },
                {
                  title: "Foco na experiência da criança",
                  desc: "Não forçamos nada. Nossos produtos respeitam os rituais da criança — beber o suco favorito, usar a chupeta — e integram o medicamento de forma suave e natural."
                },
                {
                  title: "Design funcional e seguro",
                  desc: "Materiais atóxicos, livres de BPA e projetados para crianças desde os primeiros meses de vida. Tudo foi pensado para ser seguro primeiro, prático depois."
                },
                {
                  title: "Alternativa não invasiva",
                  desc: "Sem seringas. Sem pinçar o nariz. Sem esconder remédio na comida. Uma abordagem gentil que preserva a confiança da criança e a saúde mental dos pais."
                },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="border-l-2 pl-6 py-1" style={{ borderColor: i % 2 === 0 ? "#BBE7BB" : "#91B2EB" }}>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="py-28">
        <div className="container mx-auto px-5 max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl text-foreground mb-16" style={{ letterSpacing: "0.01em" }}>
              O que os pais dizem
            </motion.h2>

            <div className="space-y-14">
              {[
                {
                  text: "Sempre que meus filhos ficavam doentes, eu já sofria por antecipação. Eram dois para segurar e convencer a engolir o xarope. Com a Easy Dose, a hora do remédio virou, incrivelmente, um momento pacífico.",
                  name: "Juliana Resende",
                  role: "Mãe de gêmeos, 3 anos"
                },
                {
                  text: "A Sofia sempre usou chupeta para se acalmar. A chupeta condutora aproveitou exatamente isso — o conforto que ela já conhecia. É sutil, é cuidadoso e respeita o momento dela.",
                  name: "Marcos Albuquerque",
                  role: "Pai da Sofia, 1 ano e meio"
                },
                {
                  text: "Mudou completamente nossa rotina em casa. Sem choro, sem drama. Parece simples mas faz uma diferença enorme na vida real.",
                  name: "Ana Paula M.",
                  role: "Mãe de 2 filhos"
                },
              ].map((q, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <p className="text-lg text-foreground/80 leading-relaxed mb-4 font-serif">
                    "{q.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{q.name}</p>
                    <p className="text-xs text-muted-foreground">{q.role}</p>
                  </div>
                  {i < 2 && <div className="mt-14 h-px bg-border/60" />}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section
        id="cta"
        className="py-32 relative overflow-hidden"
        style={{ background: "linear-gradient(150deg, #dff0df 0%, #dce9f8 50%, #ecdcfc 100%)" }}
      >
        <div className="container relative z-10 mx-auto px-5 max-w-2xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-4xl md:text-5xl text-foreground mb-5"
              style={{ letterSpacing: "0.01em" }}
            >
              Descubra qual produto é ideal para o seu filho
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-foreground/60 mb-10 leading-relaxed">
              Responda 7 perguntas rápidas e receba a recomendação certa para a rotina da sua família.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
              <a
                href={QUIZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-xl focus:outline-none"
                style={{ background: "#BBE7BB", color: "#2a4a2a" }}
              >
                Qual o melhor método para mim?
              </a>
              <span className="text-sm text-foreground/50">Leva menos de 1 minuto</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" className="py-20 border-t border-border/50">
        <div className="container mx-auto px-5 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="font-serif text-3xl text-foreground mb-4" style={{ letterSpacing: "0.01em" }}>
              Fale com a gente
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base text-muted-foreground leading-relaxed">
              Dúvidas, sugestões ou parcerias? Escreva para{" "}
              <a href="mailto:contato@easydose.com.br" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                contato@easydose.com.br
              </a>
            </motion.p>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
