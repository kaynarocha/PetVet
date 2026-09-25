
export default function Footer(){

    const anoAtual = new Date().getFullYear();
    return(
        <footer className="relative w-full overflow-hidden bg-[#0a0a0f] border-t border-white/10 py-6 px-4 text-white/50">

            {/* glow decorativo sutil */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7]/10 blur-[80px]" />

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center justify-center">
                <div className="text-center">
                    <p className="text-sm font-medium tracking-wide flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e]" />
                        &copy;{anoAtual}
                        <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent font-bold ml-1 hover:from-[#c084fc] hover:to-[#4ade80] transition-all duration-300">PetVet</span>.
                        Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );

    }