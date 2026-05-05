import React from "react";

export function V1CenteredStack() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-white text-slate-800" style={{ fontFamily: "'Fredoka', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
        
        .blob-1 {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          background: #BBE7BB;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
          animation: morph 15s ease-in-out infinite alternate;
        }

        .blob-2 {
          position: absolute;
          top: 20%;
          right: -20%;
          width: 50vw;
          height: 50vw;
          background: #91B2EB;
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          filter: blur(100px);
          opacity: 0.3;
          z-index: 0;
          animation: morph 20s ease-in-out infinite alternate-reverse;
        }

        .blob-3 {
          position: absolute;
          bottom: -20%;
          left: 10%;
          width: 70vw;
          height: 70vw;
          background: #E4C1F9;
          border-radius: 50% 50% 60% 40% / 50% 60% 40% 50%;
          filter: blur(90px);
          opacity: 0.3;
          z-index: 0;
          animation: morph 18s ease-in-out infinite alternate;
        }

        @keyframes morph {
          0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        }
      `}</style>

      {/* Background Blobs */}
      <div className="blob-1 pointer-events-none"></div>
      <div className="blob-2 pointer-events-none"></div>
      <div className="blob-3 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-6">
        {/* Navbar */}
        <header className="flex justify-between items-center py-6">
          <div className="text-3xl font-bold tracking-tight">
            <span style={{ color: "#6cb86c" }}>Easy</span>
            <span style={{ color: "#5a90d4" }}>Dose</span>
          </div>
          <nav className="hidden md:flex gap-8 font-medium text-slate-600">
            <a href="#" className="hover:text-slate-900 transition-colors">Início</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Como funciona</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Blog</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Comprar</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contato</a>
          </nav>
        </header>

        {/* Main Content Centered */}
        <main className="flex-1 flex flex-col items-center justify-center text-center py-12 md:py-20">
          <h1 className="text-6xl md:text-[80px] lg:text-[100px] leading-[1.1] font-bold text-slate-900 mb-8 max-w-5xl tracking-tight">
            Dar remédio nunca foi tão fácil.
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl font-medium leading-relaxed">
            A Easy Dose transforma um momento difícil em algo simples, seguro e tranquilo para pais e crianças.
          </p>
          
          <div className="flex flex-col items-center mb-20">
            <a 
              href="https://seuformulario.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-900 text-white text-xl md:text-2xl font-semibold py-5 px-10 rounded-full hover:scale-105 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
            >
              Qual o melhor método para mim?
            </a>
            <span className="text-slate-500 mt-4 text-sm font-medium">Leva menos de 1 minuto</span>
          </div>

          {/* Product Icons Row */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 mb-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#BBE7BB' }}>
                <svg className="w-10 h-10 md:w-14 md:h-14 text-green-800 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-slate-700">Canudo Dosador</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: '#91B2EB' }}>
                <svg className="w-10 h-10 md:w-14 md:h-14 text-blue-800 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-slate-700">Chupeta Condutora</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] flex items-center justify-center shadow-lg transform rotate-12" style={{ backgroundColor: '#F29C6B' }}>
                <svg className="w-10 h-10 md:w-14 md:h-14 text-orange-900 opacity-60 -rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="font-semibold text-lg text-slate-700">Copo p/ Comprimidos</span>
            </div>
          </div>
        </main>

        <footer className="py-8 text-center">
          <p className="text-slate-500 italic font-medium">
            Solução desenvolvida com base na rotina real de pais e crianças.
          </p>
        </footer>
      </div>
    </div>
  );
}
