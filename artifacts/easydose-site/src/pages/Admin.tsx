import { useState, useEffect, useCallback } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

interface QuizLead {
  id: number;
  email: string | null;
  answers: Record<string, unknown>;
  createdAt: string;
}

interface WaitlistEntry {
  id: number;
  email: string;
  productId: string;
  createdAt: string;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function downloadCsv(filename: string, rows: string[][]) {
  const content = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob(["\uFEFF" + content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem("admin_pw") ?? "");
  const [input, setInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState<"quiz" | "waitlist">("quiz");
  const [quizLeads, setQuizLeads] = useState<QuizLead[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const fetchData = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    try {
      const [qRes, wRes] = await Promise.all([
        fetch(`${BASE}/api/admin/quiz-leads`, { headers: { Authorization: `Bearer ${pw}` } }),
        fetch(`${BASE}/api/admin/waitlist`, { headers: { Authorization: `Bearer ${pw}` } }),
      ]);
      if (qRes.status === 401 || wRes.status === 401) {
        setAuthError("Senha incorreta.");
        setPassword("");
        sessionStorage.removeItem("admin_pw");
        setLoading(false);
        return;
      }
      if (!qRes.ok || !wRes.ok) throw new Error("Erro ao carregar dados");
      const [q, w] = await Promise.all([qRes.json(), wRes.json()]);
      setQuizLeads(q);
      setWaitlist(w);
    } catch {
      setError("Não foi possível carregar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (password) fetchData(password);
  }, [password, fetchData]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    sessionStorage.setItem("admin_pw", input);
    setPassword(input);
    setInput("");
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_pw");
    setPassword("");
    setQuizLeads([]);
    setWaitlist([]);
  }

  if (!password) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm bg-card border border-card-border rounded-2xl p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="font-chewy text-2xl text-foreground">Painel Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">EasyDose — acesso restrito</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
              <input
                type="password"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            {authError && <p className="text-sm text-red-500">{authError}</p>}
            <button
              type="submit"
              disabled={!input}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 disabled:opacity-40 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-chewy text-xl text-foreground">Painel Admin · EasyDose</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {quizLeads.length} leads do quiz · {waitlist.length} na lista de espera
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchData(password)}
            className="text-sm px-4 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted transition"
          >
            Atualizar
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded-lg bg-muted text-muted-foreground hover:opacity-80 transition"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="px-6 py-6 max-w-6xl mx-auto">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("quiz")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              tab === "quiz"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-card-border text-foreground hover:bg-muted"
            }`}
          >
            Leads do Quiz ({quizLeads.length})
          </button>
          <button
            onClick={() => setTab("waitlist")}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
              tab === "waitlist"
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-card-border text-foreground hover:bg-muted"
            }`}
          >
            Lista de Espera ({waitlist.length})
          </button>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Carregando...</div>
        ) : tab === "quiz" ? (
          <QuizTable rows={quizLeads} expandedId={expandedId} setExpandedId={setExpandedId} />
        ) : (
          <WaitlistTable rows={waitlist} />
        )}
      </div>
    </div>
  );
}

function QuizTable({
  rows,
  expandedId,
  setExpandedId,
}: {
  rows: QuizLead[];
  expandedId: number | null;
  setExpandedId: (id: number | null) => void;
}) {
  function exportCsv() {
    const header = ["ID", "Email", "Respostas", "Data"];
    const data = rows.map((r) => [
      String(r.id),
      r.email ?? "(sem email)",
      JSON.stringify(r.answers),
      formatDate(r.createdAt),
    ]);
    downloadCsv("quiz-leads.csv", [header, ...data]);
  }

  if (rows.length === 0)
    return <EmptyState message="Nenhum lead do quiz ainda." />;

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={exportCsv}
          className="text-sm px-4 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
        >
          Exportar CSV
        </button>
      </div>
      <div className="rounded-2xl border border-card-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium w-12">#</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Data</th>
              <th className="px-4 py-3 text-left font-medium">Respostas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <>
                <tr key={row.id} className="bg-card hover:bg-muted/40 transition">
                  <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.email ?? <span className="text-muted-foreground italic">sem email</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(row.createdAt)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setExpandedId(expandedId === row.id ? null : row.id)}
                      className="text-primary text-xs underline underline-offset-2 hover:opacity-70"
                    >
                      {expandedId === row.id ? "Ocultar" : "Ver respostas"}
                    </button>
                  </td>
                </tr>
                {expandedId === row.id && (
                  <tr key={`${row.id}-answers`} className="bg-muted/20">
                    <td colSpan={4} className="px-6 py-4">
                      <div className="grid grid-cols-2 gap-2 max-w-xl">
                        {Object.entries(row.answers).map(([k, v]) => (
                          <div key={k} className="text-xs">
                            <span className="font-semibold text-foreground capitalize">{k}:</span>{" "}
                            <span className="text-muted-foreground">
                              {Array.isArray(v) ? v.join(", ") : String(v)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WaitlistTable({ rows }: { rows: WaitlistEntry[] }) {
  function exportCsv() {
    const header = ["ID", "Email", "Produto", "Data"];
    const data = rows.map((r) => [String(r.id), r.email, r.productId, formatDate(r.createdAt)]);
    downloadCsv("lista-de-espera.csv", [header, ...data]);
  }

  if (rows.length === 0)
    return <EmptyState message="Nenhuma entrada na lista de espera ainda." />;

  return (
    <div>
      <div className="flex justify-end mb-3">
        <button
          onClick={exportCsv}
          className="text-sm px-4 py-1.5 rounded-lg border border-primary text-primary hover:bg-primary/10 transition"
        >
          Exportar CSV
        </button>
      </div>
      <div className="rounded-2xl border border-card-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-medium w-12">#</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">Produto</th>
              <th className="px-4 py-3 text-left font-medium">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="bg-card hover:bg-muted/40 transition">
                <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{row.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded-full bg-accent/60 text-foreground text-xs font-medium">
                    {row.productId}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(row.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
      {message}
    </div>
  );
}
