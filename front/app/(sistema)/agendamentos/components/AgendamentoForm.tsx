'use client';

import { Agendamento, AgendamentoFormProps } from "@/app/types/agendamento";
import Link from "@/node_modules/next/link";
import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

export default function AgendamentoForm({agendamentoExistente} : AgendamentoFormProps) {
    const router = useRouter();

    // constante com array de informações
    const [agendamento, setAgendamento] = useState<Agendamento> (
        // se for existente, ele carrega os dados
        agendamentoExistente || 
        new Agendamento(null, "", "", "", "ATIVO")
    );

    // função para atualizar os valores do formulário
    const handlerChange = ( campo : 'data' | 'servico' | 'descricao', valor: string) => {
        // preview
        setAgendamento(valorAnterior => 
            new Agendamento(
                valorAnterior.id,
                campo === 'data' ? valor : valorAnterior.data,
                campo === 'servico' ? valor : valorAnterior.servico,
                campo === 'descricao' ? valor : valorAnterior.descricao,
                valorAnterior.status
            )
        )
    }

    // formData - nome / FormData - Tipo
    const handlerSalvar = async (formData: FormData) => { 

        if (agendamentoExistente) {
            var dadosRetorno = await 
            axios.put<number>(`http://localhost:8080/agendamentos/${agendamento.id}`, agendamento);

        if (dadosRetorno.status == 200) {
            alert("Agendamento salvo com sucesso!");
        } else {
            alert (dadosRetorno.data);
            
            return;
        }

        } else {
            var dadosRetorno = await axios.post<number>('http://localhost:8080/agendamentos', agendamento);

        if (dadosRetorno.status == 200) {
            alert("Agendamento salvo com sucesso!");
        } else {
            alert (dadosRetorno.data);
            
            return;
        }
        router.push("/agendamentos");
    }
}

    return (
        <form action={handlerSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Data:
                    </label>
                    <input name="data"
                    type="date"
                    value={agendamento.data || ""} 
                    required
                    placeholder="01/01/2026"
                    onChange={(e) => handlerChange('data', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Serviço:
                    </label>
                    <input name="servico" 
                    value={agendamento.servico}
                    required
                    placeholder="Tosa e banho"
                    onChange={(e) => handlerChange('servico', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Descrição
                    </label>
                    <input name="descricao" 
                    value={agendamento.descricao}
                    required
                    placeholder="O animal é doce"
                    onChange={(e) => handlerChange('descricao', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
                <Link href="/usuarios" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm rounded-xl transition-all duration-200 text-center border border-white/10"> Cancelar</Link>
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
