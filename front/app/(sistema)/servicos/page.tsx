'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Servico } from "@/app/types/Servico";
import { atualizarStatusServico, buscarListaServicos, deletarServico } from "@/app/services/servicoService";

export default function Servicos(){

    const [servicos, setServicos] = useState<Servico[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const dados = await buscarListaServicos();
            setServicos(dados);
        } catch (error) {
            alert("Erro ao carregar os dados dos serviços.");
        }
    }

    const handleDeletarServico = async (servico: Servico) => {

        var dadosRetorno = await deletarServico(servico.id || 0);

        if (dadosRetorno == 200) {
            alert("Serviço foi excluído com sucesso!");
        } else {
            alert("Erro ao excluir o serviço!");
            return;
        }

        carregarDados();
    }

    const handleAlterarStatusServico = async (servico: Servico) => {

        await atualizarStatusServico(servico);

        carregarDados();
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
            .servicos-blob-purple { animation: float1 10s ease-in-out infinite; }
            .servicos-blob-green { animation: float2 12s ease-in-out infinite; }
            .servicos-fade-up { animation: fadeInUp 0.6s ease-out forwards; }
        `}</style>

        {/* glows decorativos animados */}
        <div className="servicos-blob-purple pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#a855f7]/15 blur-[130px]" />
        <div className="servicos-blob-green pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#22c55e]/10 blur-[130px]" />

        <div className="servicos-fade-up relative z-10 mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]" />
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                    Gestão de <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">serviços</span>
                </h1>
            </div>

            <Link
                href="/servicos/novo"
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#a855f7] to-[#7c3aed] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_2px_rgba(168,85,247,0.45)] active:scale-95"
            >
                <span className="relative z-10">Novo serviço</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Novo serviço
                </span>
            </Link>

        </div>

        <div className="servicos-fade-up relative z-10 mx-auto w-full max-w-5xl">

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_50px_-15px_rgba(168,85,247,0.2)]">

                <table className="w-full text-left">

                    <thead className="bg-gradient-to-r from-[#a855f7]/10 to-[#22c55e]/10 border-b border-white/10">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Código</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Nome</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Descrição</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Valor</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Duração</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-white/80 tracking-wide">Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {servicos.map((servico) => (

                        <tr key={servico.id} className="border-t border-white/5 transition-colors duration-200 hover:bg-white/[0.04]">

                            <td className="px-6 py-4 text-sm text-white/60">{servico.id}</td>

                            <td className="px-6 py-4 text-sm text-white/90 font-medium">{servico.nome}</td>

                            <td className="px-6 py-4 text-sm text-white/60">{servico.descricao}</td>

                            <td className="px-6 py-4 text-sm text-white/60">R$ {servico.valor}</td>

                            <td className="px-6 py-4 text-sm text-white/60">{servico.duracaoMinutos} min</td>

                            <td className="px-6 py-4 text-sm">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e]" />
                                    {servico.statusServico}
                                </span>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium">
                                <div className="flex items-center gap-3">
                                    <Link
                                        href={`/servicos/${servico.id}/editar`}
                                        className="text-[#c084fc] hover:text-[#a855f7] transition-colors duration-200">
                                        Editar
                                    </Link>

                                    <button
                                        onClick={() => handleDeletarServico(servico)}
                                        className="text-red-400 hover:text-red-300 transition-colors duration-200">
                                        Deletar
                                    </button>

                                    <button
                                        onClick={() => handleAlterarStatusServico(servico)}
                                        className={`transition-colors duration-200 ${
                                            servico.statusServico === 'INATIVO'
                                                ? 'text-amber-400 hover:text-amber-300'
                                                : 'text-[#4ade80] hover:text-[#22c55e]'
                                        }`}
                                    >
                                        {servico.statusServico}
                                    </button>
                                </div>
                            </td>

                        </tr>

                        ))}

                        { servicos.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-sm text-white/40 text-center">
                                    Nenhum serviço cadastrado.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>)

}