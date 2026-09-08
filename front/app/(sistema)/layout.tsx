import type { ReactNode } from 'react';
 
export default function UsuariosLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#0d0d0c]">
      <header className="border-b border-[#3b3228] bg-[#181614] px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-serif tracking-wider text-[#d4af37] uppercase font-bold">
          Sistema — Usuários
        </h2>
        <nav>
          {/* Ex.: <Link href="/home">Início</Link> */}
        </nav>
      </header>
 
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

// ajeitar (ia)