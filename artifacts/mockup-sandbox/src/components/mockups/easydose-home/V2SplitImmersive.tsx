import React from "react";
import { Button } from "@/components/ui/button";

export function V2SplitImmersive() {
  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh] w-full font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        .font-fredoka { font-family: 'Fredoka', sans-serif; }
      `}</style>

      {/* LEFT PANEL */}
      <div className="w-full md:w-1/2 bg-[#1b3a1b] p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden h-[100dvh]">
        {/* Abstract organic SVG blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] max-w-[800px] aspect-square opacity-20 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#BBE7BB"
              d="M44.7,-76.4C58.3,-69.2,70.1,-56.9,78.2,-42.6C86.3,-28.3,90.7,-11.9,89.5,4C88.3,19.9,81.5,35.4,71.5,47.9C61.5,60.4,48.3,69.9,33.5,75.9C18.7,81.9,2.3,84.4,-13.2,82.1C-28.7,79.8,-43.3,72.7,-55.8,62.2C-68.3,51.7,-78.7,37.8,-83.4,22.2C-88.1,6.6,-87.1,-10.8,-80.7,-25.9C-74.3,-41,-62.5,-53.8,-49,-61.2C-35.5,-68.6,-20.3,-70.6,-3.4,-66C13.5,-61.4,27.1,-50.2,44.7,-76.4Z"
              transform="translate(100 100)"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="font-fredoka font-semibold text-white text-5xl md:text-[52px] leading-[1.1] tracking-tight mb-8">
            Sem choro.<br />Sem estresse.<br />Sem luta.
          </h2>
          
          <div className="flex flex-wrap gap-3 font-fredoka font-medium">
            <span className="px-5 py-2.5 rounded-full text-[#1b3a1b] bg-[#BBE7BB] text-sm md:text-base">
              Menos choro
            </span>
            <span className="px-5 py-2.5 rounded-full text-[#1b3a1b] bg-[#91B2EB] text-sm md:text-base">
              Dose exata
            </span>
            <span className="px-5 py-2.5 rounded-full text-[#1b3a1b] bg-[#E4C1F9] text-sm md:text-base">
              Seguro
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-auto pt-12">
          <p className="font-fredoka text-white/40 text-sm md:text-base font-medium max-w-sm">
            Solução desenvolvida com base na rotina real de pais e crianças.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full md:w-1/2 bg-white flex flex-col h-[100dvh]">
        {/* Sticky Nav */}
        <header className="sticky top-0 z-50 w-full px-6 py-5 md:px-10 bg-white/90 backdrop-blur-sm flex items-center justify-between">
          <div className="font-fredoka font-bold text-2xl tracking-tight flex items-center">
            <span className="text-[#6cb86c]">Easy</span>
            <span className="text-[#5a90d4]">Dose</span>
          </div>
          <nav className="hidden lg:flex items-center gap-6 font-fredoka font-medium text-gray-600 text-sm">
            <a href="#" className="hover:text-[#6cb86c] transition-colors">Início</a>
            <a href="#" className="hover:text-[#6cb86c] transition-colors">Como funciona</a>
            <a href="#" className="hover:text-[#6cb86c] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#6cb86c] transition-colors">Comprar</a>
            <a href="#" className="hover:text-[#6cb86c] transition-colors">Contato</a>
          </nav>
        </header>

        {/* Content Centered */}
        <main className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-20 max-w-[700px] mx-auto w-full">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl lg:text-[56px] leading-[1.1] text-gray-900 tracking-tight mb-6">
            Dar remédio nunca foi tão fácil.
          </h1>
          
          <p className="font-fredoka text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
            A Easy Dose transforma um momento difícil em algo simples, seguro e tranquilo para pais e crianças.
          </p>

          <div className="flex flex-col gap-3">
            <Button 
              asChild 
              className="w-full rounded-full bg-[#BBE7BB] hover:bg-[#a5d1a5] text-[#1b3a1b] font-fredoka font-semibold text-lg h-16 shadow-none"
            >
              <a href="https://seuformulario.com" target="_blank" rel="noopener noreferrer">
                Qual o melhor método para mim?
              </a>
            </Button>
            <p className="text-center text-gray-400 font-fredoka text-sm font-medium">
              Leva menos de 1 minuto
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
