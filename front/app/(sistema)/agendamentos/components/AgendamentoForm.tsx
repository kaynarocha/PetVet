'use client';

import { atualizarAgendamento, salvarAgendamento } from "@/app/services/agendamentoService";
import api from "@/app/services/api";
import { buscarListaPets } from "@/app/services/petService";
import { Agendamento, AgendamentoFormProps } from "@/app/types/agendamento";
import { Pet } from "@/app/types/pet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AgendamentoForm({ agendamentoExistente }: AgendamentoFormProps) {
    const router = useRouter();

    // constante com array de informações
    const [agendamento, setAgendamento] = useState<Agendamento>(
        // se for existente, ele carrega os dados
        agendamentoExistente ||
        new Agendamento(null, "", "", "", "ATIVO")
    );

    // fk pet e serviço
    const [pets, setPets] = useState<Pet[]>([]);
    const [servicos, setServicos] = useState<{ id: number; nome: string }[]>([]);
    const [petId, setPetId] = useState<number | null>(agendamentoExistente?.petId ?? null);
    const [servicoId, setServicoId] = useState<number | null>(agendamentoExistente?.servicoId ?? null);

    useEffect(() => {
        buscarListaPets().then(setPets).catch(() => {});
        api.get("/servico").then((r) => setServicos(r.data)).catch(() => {});
    }, []);

    // função para atualizar os valores do formulário
    const handlerChange = (campo: 'data' | 'descricao', valor: string) => {
        setAgendamento(valorAnterior =>
            new Agendamento(
                valorAnterior.id,
                campo === 'data' ? valor : valorAnterior.data,
                valorAnterior.servico,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                valorAnterior.statusAgendamento,
                valorAnterior.servicoId,
                valorAnterior.petId
            )
        );
    };

    const handlerSalvar = async (formData: FormData) => {

        // back-end espera data com hora (LocalDateTime)
        const agendamentoParaEnviar = {
            ...agendamento,
            servicoId,
            petId,
            data: agendamento.data ? `${agendamento.data.slice(0, 10)}T00:00:00` : null
        } as Agendamento;

        if (agendamentoExistente) {
           
            try {
                var dadosRetorno = await atualizarAgendamento(agendamentoParaEnviar);
            } catch (erro: any) {
                alert(erro?.response?.data ?? "Erro ao atualizar o agendamento!");
                return;
            }
            if (dadosRetorno) {
                alert("Agendamento foi salvo com sucesso!");
            } else {
                alert("Erro ao atualizar o agendamento!");

                return;
            }

        } else {
            try {
                var dadosRetorno = await salvarAgendamento(agendamentoParaEnviar);
            } catch (erro: any) {
                alert(erro?.response?.data ?? "Erro ao salvar o agendamento!");
                return;
            }
            if (dadosRetorno) {
                alert("Agendamento foi salvo com sucesso!");
            } else {
                alert("Erro ao salvar o agendamento!");

                return;
            }
        }

        router.push("/agendamentos");
    };

    return (
        <form action={handlerSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Data:
                    </label>
                    <input
                        name="data"
                        type="date"
                        value={agendamento.data?.slice(0, 10) || ""}
                        required
                        placeholder="01/01/2026"
                        onChange={(e) => handlerChange('data', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Pet:
                    </label>
                    <select name="pet" required value={petId ?? ""}
                    onChange={(e) => setPetId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7]">
                        <option value="" className="text-black">Selecione...</option>
                        {pets.map((p) => (
                            <option key={p.id} value={p.id ?? ""} className="text-black">{p.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Serviço:
                    </label>
                    <select name="servico" required value={servicoId ?? ""}
                    onChange={(e) => setServicoId(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7]">
                        <option value="" className="text-black">Selecione...</option>
                        {servicos.map((sv) => (
                            <option key={sv.id} value={sv.id} className="text-black">{sv.nome}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Descrição:
                    </label>
                    <input
                        name="descricao"
                        value={agendamento.descricao}
                        required
                        placeholder="O animal é doce"
                        onChange={(e) => handlerChange('descricao', e.target.value)}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>

            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
                <Link href="/agendamentos" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm rounded-xl transition-all duration-200 text-center border border-white/10"> Cancelar</Link>
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