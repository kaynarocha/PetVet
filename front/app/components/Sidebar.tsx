import Link from "@/node_modules/next/link";



export default function Sidebar(){

    return(
        <aside className="w-64 shrink-0 self-stretch bg-[#0a0a0f]/70 backdrop-blur-xl border-r border-white/10 flex flex-col p-6">
            <div className="text-xl font-bold text-white tracking-wide mb-8 px-2 flex items-center space-x-2">
                <span className="w-3 h-3 bg-gradient-to-br from-[#a855f7] to-[#22c55e] rounded-full inline-block shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]"></span>
                <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">PetVet</span>
            </div>
            <nav className="flex flex-col space-y-2">
                <Link href="/home" className="flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10">Home</Link>
                <Link href="/usuarios" className="flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10">Usuários</Link>
                <Link href="/tutores" className="flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10">Tutores</Link>
                <Link href="/pets" className="flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10">Pets</Link>
                <Link href="/agendamentos" className="flex items-center px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 font-medium border border-transparent hover:border-white/10">Agendamentos</Link>

            </nav>
        </aside>);


}