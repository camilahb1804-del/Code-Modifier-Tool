import { Link, useLocation } from "wouter";
import { useState } from "react";

const QUIZ_URL = "https://seuformulario.com";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Início" },
    { href: "/#como-funciona", label: "Como funciona" },
    { href: "/blog", label: "Blog" },
    { href: "/comprar", label: "Comprar" },
    { href: "/#contato", label: "Contato" },
  ];

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="container flex h-20 items-center justify-between px-5 mx-auto max-w-6xl">
        <Link href="/" className="flex items-center">
          <img
            src="/images/easydose-logo.png"
            alt="EasyDose"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium transition-colors pb-1"
              style={{
                color: isActive(link.href)
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground))",
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
                  style={{ background: "hsl(264, 56%, 65%)" }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "hsl(264, 56%, 72%)", color: "#fff" }}
          >
            Qual o melhor método para mim?
          </a>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" />
                <line x1="18" y1="4" x2="4" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" />
                <line x1="3" y1="13" x2="19" y2="13" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border/40 px-5 pb-4 pt-3 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors py-1"
              style={{
                color: isActive(link.href)
                  ? "hsl(var(--foreground))"
                  : "hsl(var(--muted-foreground))",
                fontWeight: isActive(link.href) ? 600 : 500,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={QUIZ_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ background: "hsl(264, 56%, 72%)", color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            Qual o melhor método para mim?
          </a>
        </div>
      )}
    </header>
  );
}
