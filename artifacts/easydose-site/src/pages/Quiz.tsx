import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitQuizLead } from "@workspace/api-client-react";

type QuestionType = "single" | "multiple" | "email";

interface Question {
  id: string;
  section: string;
  question: string;
  type: QuestionType;
  options?: string[];
  optional?: boolean;
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: "idade",
    section: "Sobre a criança",
    question: "Qual é a idade da criança?",
    type: "single",
    options: [
      "Menos de 6 meses",
      "6 meses a 1 ano",
      "1 a 2 anos",
      "3 a 5 anos",
      "6 a 10 anos",
      "Mais de 10 anos",
    ],
  },
  {
    id: "sexo",
    section: "Sobre a criança",
    question: "Qual é o sexo da criança?",
    type: "single",
    options: ["Menino", "Menina", "Prefiro não informar"],
  },
  {
    id: "sintomas",
    section: "Situação atual",
    question: "Quais são os principais sintomas da criança?",
    type: "multiple",
    options: [
      "Febre",
      "Tosse",
      "Dor de garganta",
      "Dor de ouvido",
      "Coriza / nariz entupido",
      "Dor de barriga",
      "Outro",
    ],
  },
  {
    id: "duracao",
    section: "Situação atual",
    question: "Há quanto tempo a criança está com esses sintomas?",
    type: "single",
    options: [
      "Menos de 1 dia",
      "1 a 3 dias",
      "4 a 7 dias",
      "Mais de 1 semana",
      "É uma condição crônica",
    ],
  },
  {
    id: "medicamento_atual",
    section: "Situação atual",
    question: "A criança já está tomando algum medicamento?",
    type: "single",
    options: ["Sim", "Não", "Estou aguardando consulta médica"],
  },
  {
    id: "tipo_medicamento",
    section: "Tipo de medicação",
    question: "Qual tipo de medicamento a criança precisa tomar?",
    type: "multiple",
    options: [
      "Xarope",
      "Gotas",
      "Comprimido",
      "Sachê",
      "Supositório",
      "Ainda não sei",
    ],
  },
  {
    id: "frequencia",
    section: "Tipo de medicação",
    question: "Com que frequência a criança toma o medicamento por dia?",
    type: "single",
    options: [
      "1 vez por dia",
      "2 vezes por dia",
      "3 ou mais vezes por dia",
      "Quando necessário",
      "Ainda não definido",
    ],
  },
  {
    id: "dificuldades",
    section: "Dificuldades",
    question: "Quais são as maiores dificuldades na hora de dar o remédio?",
    type: "multiple",
    options: [
      "A criança recusa o remédio",
      "Dificuldade em medir a dose certa",
      "Esqueço os horários",
      "O remédio tem gosto ruim",
      "A criança cospe ou vomita",
      "Dificuldade para engolir",
      "Não tenho grandes dificuldades",
    ],
  },
  {
    id: "recursos",
    section: "O que você já usa",
    question: "Você já usa algum acessório para ajudar na medicação?",
    type: "multiple",
    options: [
      "Seringa dosadora",
      "Copo medidor",
      "Chupeta condutora",
      "Canudinho dosador",
      "Misturo no alimento",
      "Nenhum — dou direto na boca",
      "Outro",
    ],
  },
  {
    id: "email",
    section: "Quase lá!",
    question: "Quer receber recomendações personalizadas no seu e-mail?",
    type: "email",
    optional: true,
    placeholder: "seu@email.com",
  },
];

type Answers = Record<string, string | string[]>;

function BlobBg() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <ellipse cx="1050" cy="100" rx="380" ry="280" fill="#BBE7BB" fillOpacity="0.22" />
      <ellipse cx="100" cy="680" rx="300" ry="220" fill="#91B2EB" fillOpacity="0.18" />
      <ellipse cx="600" cy="800" rx="400" ry="160" fill="#E4C1F9" fillOpacity="0.16" />
      <ellipse cx="200" cy="80" rx="200" ry="140" fill="#91B2EB" fillOpacity="0.10" />
    </svg>
  );
}

const PURPLE = "hsl(264, 56%, 72%)";
const PURPLE_DARK = "hsl(264, 56%, 58%)";

export default function Quiz() {
  const [step, setStep] = useState<"intro" | number | "done">("intro");
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const current = typeof step === "number" ? questions[step] : null;
  const progress = typeof step === "number" ? ((step + 1) / questions.length) * 100 : 0;

  async function goNext() {
    setDirection(1);
    if (typeof step === "number") {
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setSubmitting(true);
        try {
          const email = (answers["email"] as string) || undefined;
          const { email: _e, ...answerData } = answers;
          await submitQuizLead({ answers: answerData, ...(email ? { email } : {}) });
        } catch {
          // submit silencioso — não bloqueia o usuário
        } finally {
          setSubmitting(false);
        }
        setStep("done");
      }
    } else if (step === "intro") {
      setStep(0);
    }
  }

  function goPrev() {
    setDirection(-1);
    if (typeof step === "number" && step > 0) setStep(step - 1);
    else if (typeof step === "number" && step === 0) setStep("intro");
  }

  function toggleSingle(opt: string) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: opt }));
  }

  function toggleMultiple(opt: string) {
    if (!current) return;
    const prev = (answers[current.id] as string[]) ?? [];
    const already = prev.includes(opt);
    setAnswers((a) => ({
      ...a,
      [current.id]: already ? prev.filter((x) => x !== opt) : [...prev, opt],
    }));
  }

  function setEmail(val: string) {
    if (!current) return;
    setAnswers((a) => ({ ...a, [current.id]: val }));
  }

  function canAdvance() {
    if (!current) return true;
    if (current.optional) return true;
    const ans = answers[current.id];
    if (current.type === "multiple") return Array.isArray(ans) && ans.length > 0;
    if (current.type === "single") return typeof ans === "string" && ans !== "";
    return true;
  }

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 px-5">
      <BlobBg />

      {/* Progress bar (only during questions) */}
      {typeof step === "number" && (
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-border/40 z-50">
          <motion.div
            className="h-full rounded-full"
            style={{ background: PURPLE }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ── INTRO ── */}
          {step === "intro" && (
            <motion.div
              key="intro"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center flex flex-col items-center gap-6"
            >
              <img
                src="/images/easydose-logo.png"
                alt="EasyDose"
                className="h-24 w-auto object-contain mx-auto"
              />
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Encontre a{" "}
                <span style={{ color: PURPLE_DARK }}>solução certa</span>
                {" "}para o seu filho
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Responda algumas perguntas rápidas sobre a rotina de medicação da
                sua criança. Em menos de 2 minutos, vamos ajudar você a entender
                melhor a situação e encontrar formas mais fáceis e tranquilas de
                administrar os medicamentos.
              </p>
              <p className="text-sm text-muted-foreground/70">
                🕐 Menos de 2 minutos · 10 perguntas · sem cadastro obrigatório
              </p>
              <button
                onClick={goNext}
                className="mt-2 inline-flex items-center justify-center rounded-full px-10 py-4 text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-lg focus:outline-none"
                style={{ background: PURPLE, color: "#fff" }}
              >
                Começar agora →
              </button>
            </motion.div>
          )}

          {/* ── QUESTION ── */}
          {typeof step === "number" && current && (
            <motion.div
              key={`q-${step}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{ background: "#E4C1F9", color: "hsl(264, 56%, 45%)" }}
                >
                  {current.section}
                </span>
                <span className="text-xs text-muted-foreground">
                  {step + 1} / {questions.length}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-snug">
                {current.question}
                {current.optional && (
                  <span className="text-muted-foreground/60 text-lg font-body ml-2">
                    (opcional)
                  </span>
                )}
              </h2>

              {/* Single choice */}
              {current.type === "single" && current.options && (
                <div className="flex flex-col gap-3">
                  {current.options.map((opt) => {
                    const selected = answers[current.id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => toggleSingle(opt)}
                        className="w-full text-left px-5 py-3.5 rounded-2xl border-2 text-base font-medium transition-all duration-150"
                        style={{
                          borderColor: selected ? PURPLE : "hsl(var(--border))",
                          background: selected ? "hsl(264, 56%, 96%)" : "hsl(var(--card))",
                          color: selected ? PURPLE_DARK : "hsl(var(--foreground))",
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Multiple choice */}
              {current.type === "multiple" && current.options && (
                <>
                  <p className="text-sm text-muted-foreground -mt-3">
                    Selecione todas que se aplicam
                  </p>
                  <div className="flex flex-col gap-3">
                    {current.options.map((opt) => {
                      const sel = ((answers[current.id] as string[]) ?? []).includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleMultiple(opt)}
                          className="w-full text-left px-5 py-3.5 rounded-2xl border-2 text-base font-medium transition-all duration-150 flex items-center gap-3"
                          style={{
                            borderColor: sel ? PURPLE : "hsl(var(--border))",
                            background: sel ? "hsl(264, 56%, 96%)" : "hsl(var(--card))",
                            color: sel ? PURPLE_DARK : "hsl(var(--foreground))",
                          }}
                        >
                          <span
                            className="flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors"
                            style={{
                              borderColor: sel ? PURPLE : "hsl(var(--border))",
                              background: sel ? PURPLE : "transparent",
                            }}
                          >
                            {sel && (
                              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                <path d="M1 4.5L4 7.5L10 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* Email */}
              {current.type === "email" && (
                <input
                  type="email"
                  placeholder={current.placeholder}
                  value={(answers[current.id] as string) ?? ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 rounded-2xl border-2 text-base outline-none transition-all"
                  style={{
                    borderColor: "hsl(var(--border))",
                    background: "hsl(var(--card))",
                    color: "hsl(var(--foreground))",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = PURPLE)}
                  onBlur={(e) => (e.target.style.borderColor = "hsl(var(--border))")}
                />
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goPrev}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                >
                  ← Voltar
                </button>
                <button
                  onClick={goNext}
                  disabled={!canAdvance() || submitting}
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-md focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: PURPLE, color: "#fff" }}
                >
                  {submitting ? "Salvando…" : step === questions.length - 1 ? "Ver resultado →" : "Próximo →"}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── DONE ── */}
          {step === "done" && (
            <motion.div
              key="done"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-center flex flex-col items-center gap-6"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-md"
                style={{ background: "#BBE7BB" }}
              >
                🎉
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Obrigado por{" "}
                <span style={{ color: PURPLE_DARK }}>compartilhar!</span>
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                Com base nas suas respostas, nossa equipe vai preparar
                recomendações personalizadas para tornar a hora do remédio muito
                mais tranquila para você e seu filho.
              </p>

              <div
                className="w-full rounded-3xl p-6 text-left flex flex-col gap-3"
                style={{ background: "hsl(264, 56%, 96%)" }}
              >
                <p
                  className="font-serif text-xl"
                  style={{ color: PURPLE_DARK }}
                >
                  Próximos passos
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                  <li>✅ Conheça nossos produtos na loja</li>
                  <li>✅ Leia dicas no nosso blog para pais</li>
                  <li>✅ Fale com a gente se tiver dúvidas</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
                <a
                  href="/comprar"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-200 hover:scale-[1.03] hover:shadow-md focus:outline-none"
                  style={{ background: PURPLE, color: "#fff" }}
                >
                  Ver produtos →
                </a>
                <a
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-medium border-2 transition-all duration-200 hover:scale-[1.02] focus:outline-none"
                  style={{
                    borderColor: "hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Voltar ao início
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
