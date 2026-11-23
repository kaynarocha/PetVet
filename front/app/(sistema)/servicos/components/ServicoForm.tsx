'use client';

import { Servico, ServicoFormProps } from "@/app/types/Servico";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { atualizarServico, salvarServico } from "@/app/services/servicoService";

export default function ServicoForm({ servicoExistente }: ServicoFormProps) {
    const router = useRouter();

    const [servico, setServico] = useState<Servico>(
        servicoExistente || new Servico(null, "", "", 0, 0, "ATIVO")
    );

    const handlerChange = (campo: 'nome' | 'descricao' | 'valor' | 'duracaoMinutos', valor: string) => {
        setServico(valorAnterior =>
            new Servico(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                // valor e duração são números no backend
                campo === 'valor' ? Number(valor) : valorAnterior.valor,
                campo === 'duracaoMinutos' ? Number(valor) : valorAnterior.duracaoMinutos,
                valorAnterior.statusServico
            )
        );
    };

    // React.FormEvent e previne o reload da página
    const handlerSalvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede o recarregamento da página

        try {
            if (servicoExistente) {
                var dadosRetorno = await atualizarServico(servico);
            } else {
                var dadosRetorno = await salvarServico(servico);
            }

            if (dadosRetorno) {
                alert("Serviço foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar o serviço!");
                return;
            }

        } catch (erro: any) {
            // mostra a mensagem que o backend devolve (ex: usuário sem empresa)
            alert(erro?.response?.data ?? "Erro ao salvar o serviço!");
            return;
        }

        router.push("/servicos");
    };

    return (
        <form onSubmit={handlerSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">Nome:</label>
                    <input name="nome"
                    value={servico.nome}
                    required placeholder="Banho e tosa"
                    onChange={(e) => handlerChange('nome', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]" />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">Descrição:</label>
                    <input name="descricao"
                    value={servico.descricao}
                    required placeholder="Banho completo com tosa higiênica"
                    onChange={(e) => handlerChange('descricao', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]" />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">Valor (R$):</label>
                    <input name="valor"
                    type="number" step="0.01" min="0"
                    value={servico.valor}
                    required
                    onChange={(e) => handlerChange('valor', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]" />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">Duração (minutos):</label>
                    <input name="duracaoMinutos"
                    type="number" min="0"
                    value={servico.duracaoMinutos}
                    required
                    onChange={(e) => handlerChange('duracaoMinutos', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]" />
                </div>

            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">

                <Link href="/servicos" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm rounded-xl transition-all duration-200 text-center border border-white/10">
                    Cancelar
                </Link>
                <button type="submit" className="group relative overflow-hidden px-6 py-2.5 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-semibold text-sm rounded-xl shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_2px_rgba(168,85,247,0.5)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50">
                    <span className="relative z-10">Salvar</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Salvar
                    </span>
                </button>
            </div>
        </form>
    );
}