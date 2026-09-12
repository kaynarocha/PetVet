export default function HomePage() {
return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] relative overflow-hidden">
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.05); }
          66% { transform: translate(30px, -20px) scale(0.9); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .blob-purple { animation: float1 9s ease-in-out infinite; }
        .blob-green { animation: float2 11s ease-in-out infinite; }
        .gradient-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        .fade-up { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* glows decorativos animados */}
      <div className="blob-purple pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a855f7]/25 blur-[120px]" />
      <div className="blob-green pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22c55e]/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7]/5 blur-[100px] animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 fade-up">
        <span className="relative mb-5 flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e]/60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_16px_3px_rgba(168,85,247,0.5)]" />
        </span>

        <h1 className="text-4xl md:text-6xl font-sans font-semibold tracking-tight text-white">
          Bem-vindos ao{" "}
          <span className="gradient-text bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22c55e] bg-clip-text text-transparent">
            Sistema PetVet
          </span>
        </h1>

        <p className="mt-4 text-white/50 text-sm md:text-base max-w-md">
          Gestão veterinária simples, rápida e conectada.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button className="group relative px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-[#a855f7] to-[#7c3aed] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_5px_rgba(168,85,247,0.5)] active:scale-95">
            <span className="relative z-10">Começar</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Começar
            </span>
          </button>

          <button className="px-6 py-3 rounded-full font-medium text-white/80 border border-white/15 backdrop-blur-md bg-white/5 transition-all duration-300 hover:border-[#22c55e]/50 hover:text-white hover:bg-white/10 active:scale-95">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}