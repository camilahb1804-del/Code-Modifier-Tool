import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto max-w-6xl">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-1">
            <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
              Easy<span className="text-primary">Dose</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
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

        <div className="flex items-center gap-4">
          <Button asChild className="rounded-full px-6 font-medium bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/#cta">Quero Avaliar</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
