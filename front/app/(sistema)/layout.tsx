'use client';

import type { ReactNode } from 'react';
 
export default function UsuariosLayout({
  children,
}: {
  children: ReactNode;
}) {

return (
    <div className="min-h-screen w-full bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0f]/70 backdrop-blur-xl px-6 py-4 flex items-center justify-between shadow-[0_1px_0_0_rgba(139,92,246,0.15)]">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]" />
          <h2 className="text-lg font-sans tracking-tight text-white font-semibold">
            Sistema <span className="text-white/30 mx-1">—</span>
            <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">
              Usuários
            </span>
          </h2>
        </div>

        <nav className="flex items-center gap-2">
          {/* Ex.: <Link href="/home">Início</Link> */}
        </nav>
      </header>

      <main className="relative p-6">
        {/* glow decorativo de fundo, puramente estético */}
        <div className="pointer-events-none fixed -top-40 -left-40 h-96 w-96 rounded-full bg-[#a855f7]/20 blur-[120px]" />
        <div className="pointer-events-none fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#22c55e]/10 blur-[120px]" />

        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}

// ajeitar (ia)