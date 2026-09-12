'use client';

import { Usuario } from "@/app/types/usuario";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Usuarios(){

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        // Lógica para carregar os dados dos usuários

        try {
            const dados = await axios.get<Usuario[]>("http://localhost:8080/usuarios");

        setUsuarios(dados.data);

        } catch (error) {
            alert("Erro ao carregar os dados dos usuários.");
    }
    
    }

    return (<div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] px-6 py-10">

        <style jsx global>{`
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
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(16px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .usuarios-blob-purple { animation: float1 10s ease-in-out infinite; }
            .usuarios-blob-green { animation: float2 12s ease-in-out infinite; }
            .usuarios-fade-up { animation: fadeInUp 0.6s ease-out forwards; }
        `}</style>

        {/* glows decorativos animados */}
        <div className="usuarios-blob-purple pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#a855f7]/15 blur-[130px]" />
        <div className="usuarios-blob-green pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#22c55e]/10 blur-[130px]" />

        <div className="usuarios-fade-up relative z-10 mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]" />
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    Gestão de <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">usuários</span>
                </h1>
            </div>

            <Link
                href="/usuarios/novo"
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#a855f7] to-[#7c3aed] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_2px_rgba(168,85,247,0.45)] active:scale-95"
            >
                <span className="relative z-10">Novo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Novo
                </span>
            </Link>

        </div>

        <div className="usuarios-fade-up relative z-10 mx-auto w-full max-w-5xl">

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(168,85,247,0.2)]">

                <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-[#a855f7]/10 to-[#22c55e]/10 border-b border-white/10">

                        <tr>

                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">
                                Código
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">
                                Nome
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">
                                CPF
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">
                                E-mail
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                        <tr key={usuario.id} className="border-t border-white/5 transition-colors duration-200 hover:bg-white/[0.04]">

                            <td className="px-6 py-4 text-sm text-white/60">
                                {usuario.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-white/90 font-medium">
                                {usuario.nome}
                            </td>

                            <td className="px-6 py-4 text-sm text-white/60">
                                {usuario.cpf}
                            </td>

                            <td className="px-6 py-4 text-sm text-white/60">
                                {usuario.email}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e]" />
                                    {usuario.status}
                                </span>
                            </td>

                        </tr>

                        ))}

                        { usuarios.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-sm text-white/40">
                                    Nenhum usuário encontrado.
                                </td>

                            </tr>

                            )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>) 
}