"use client"

import Link from "@/node_modules/next/link";
import { useParams, useRouter } from "@/node_modules/next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Agendamento } from "@/app/types/agendamento";
import AgendamentoForm from "../components/AgendamentoForm";

export default function EditarAgendamento(){

    const parametro = useParams();

    const codigo = Number(parametro.codigo);

    const [agendamento, setAgendamento] = useState<Agendamento|null> (null);
    const router = useRouter();


    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async() => {

        const valorAgendamentoBack = await axios.get<Agendamento>('http://localhost:8080/agendamentos/'+codigo);

        if (valorAgendamentoBack.status == 200) {
            setAgendamento(valorAgendamentoBack.data);
        } else {
        router.push("/agendamentos");
        }
    

    }

// !agendamento = se o agendamento existir
    if (!agendamento) return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex items-center gap-3 text-white/60 text-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] animate-pulse shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]" />
                Carregando dados...
            </div>
        </div>
    )


    return(
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_-15px_rgba(168,85,247,0.2)]">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-gradient-to-br from-[#a855f7] to-[#22c55e] rounded-full inline-block shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]"></span>
                        <span>Editar <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">Agendamento {codigo}</span></span>
                    </h1>
                    <p className="text-sm text-white/50">Preencha os dados para editar o Agendamento</p>
                </div>
                <Link href="/usuarios" className="inline-flex items-center justify-center text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl transition-all duration-200 w-full sm:w-auto">
                    &larr; Voltar para Listagem
                </Link>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.2)]">
                <AgendamentoForm agendamentoExistente={agendamento} />
            </div>
        </div>
    )

}