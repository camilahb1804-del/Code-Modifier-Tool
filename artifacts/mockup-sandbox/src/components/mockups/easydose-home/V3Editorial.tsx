import React from "react";

export function V3Editorial() {
  return (
    <div 
      className="min-h-screen relative overflow-hidden flex flex-col font-sans"
      style={{ backgroundColor: "#BBE7BB" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
      `}</style>

      {/* Watermark Background */}
      <div 
        className="absolute pointer-events-none font-fredoka font-bold text-center w-[150%]"
        style={{
          color: "#a8d4a8",
          fontSize: "clamp(120px, 15vw, 250px)",
          lineHeight: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-15deg)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        EasyDose EasyDose
      </div>

      <div className="relative z-10 flex flex-col flex-1 max-w-6xl w-full mx-auto px-6 lg:px-12">
        
        {/* Navigation */}
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center text-3xl font-fredoka font-bold tracking-tight">
            <span style={{ color: "#6cb86c" }}>Easy</span>
            <span style={{ color: "#5a90d4" }}>Dose</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-fredoka font-medium text-[#1b3a1b]/80">
            <a href="#" className="hover:text-[#1b3a1b] transition-colors">Início</a>
            <a href="#" className="hover:text-[#1b3a1b] transition-colors">Como funciona</a>
            <a href="#" className="hover:text-[#1b3a1b] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#1b3a1b] transition-colors">Comprar</a>
            <a href="#" className="hover:text-[#1b3a1b] transition-colors">Contato</a>
          </nav>
          {/* Mobile menu placeholder */}
          <div className="md:hidden text-[#1b3a1b]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center py-12 lg:py-0">
          <div className="max-w-3xl">
            <h1 className="font-fredoka font-bold text-[#1b3a1b] text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
              Dar remédio nunca foi tão fácil.
            </h1>
            <p className="font-fredoka text-xl md:text-2xl text-[#1b3a1b]/80 max-w-2xl leading-relaxed mb-10">
              A Easy Dose transforma um momento difícil em algo simples, seguro e tranquilo para pais e crianças.
            </p>
            
            <div className="flex flex-col items-start gap-3">
              <a 
                href="https://seuformulario.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center font-fredoka font-semibold text-lg bg-[#1b3a1b] text-white px-10 py-5 rounded-full hover:bg-[#1b3a1b]/90 transition-all hover:scale-105 active:scale-95 shadow-xl"
              >
                Qual o melhor método para mim?
              </a>
              <span className="font-fredoka text-sm text-[#1b3a1b]/60 ml-4">
                Leva menos de 1 minuto
              </span>
            </div>
          </div>
        </main>

        {/* Bottom Elements */}
        <footer className="py-8 mt-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="font-fredoka font-medium px-6 py-3 rounded-full text-[#1b3a1b] border-2 border-[#a8d4a8] shadow-sm bg-[#BBE7BB]/50 backdrop-blur-sm">
                Canudo Dosador
              </div>
              <div className="font-fredoka font-medium px-6 py-3 rounded-full text-[#1b3a1b] border-2 border-[#91B2EB]/50 shadow-sm" style={{ backgroundColor: "#91B2EB" }}>
                Copo para Comprimidos
              </div>
              <div className="font-fredoka font-medium px-6 py-3 rounded-full text-[#1b3a1b] border-2 border-[#E4C1F9]/50 shadow-sm" style={{ backgroundColor: "#E4C1F9" }}>
                Chupeta Condutora
              </div>
            </div>
            
            <div className="font-fredoka text-[#1b3a1b]/70 text-sm md:text-right max-w-xs">
              Solução desenvolvida com base na rotina real de pais e crianças.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
