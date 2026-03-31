import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container px-4 py-12 mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Easy<span className="text-primary">Dose</span>
          </span>
          <p className="text-sm text-muted-foreground">
            Tornando a hora do remédio mais simples para todos.
          </p>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Início
          </Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/comprar" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Comprar
          </Link>
        </nav>
        
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} EasyDose. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
