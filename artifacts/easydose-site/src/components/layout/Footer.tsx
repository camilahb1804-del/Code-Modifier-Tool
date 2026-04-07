import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-5 py-12 mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl tracking-wide">
            <span style={{ color: "#6cb86c" }}>Easy</span>
            <span style={{ color: "#5a90d4" }}>Dose</span>
          </span>
          <p className="text-sm text-muted-foreground">
            Tornando a hora do remédio mais simples para todos.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <a href="/#como-funciona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Como funciona
          </a>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/comprar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Comprar
          </Link>
          <a href="/#contato" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contato
          </a>
        </nav>

        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EasyDose. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
