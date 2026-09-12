'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Agendamento } from "@/app/types/agendamento";

export default function Agendamentos(){

    const [agendamentos, setAgendamentos] = useState<Agendamento[] | []>([]);
    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        // Lógica para carregar os dados dos agendamentos

        try {
            const dados = await axios.get("http://localhost:8080/agendamentos");
            setAgendamentos(dados.data);
        } catch (error) {
            alert("Erro ao carregar os dados dos agendamentos.");
        }
    }

    return (<div className="min-h-screen bg-[#F5F3FA] px-6 py-10">

        <div className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <h1 className="text-3xl font-semibold text-[#4C3A75]">
                Gestão de agendamentos
            </h1>

            <Link
                href="/agendamentos/novo"
                className="rounded-lg bg-[#22A06B] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-[#1B8859]"
            >
                Novo agendamento
            </Link>

        </div>

        <div className="mx-auto w-full max-w-5xl">

            <div className="overflow-hidden rounded-2xl border border-[#DCD3EE] bg-[#FDFCFF] shadow-sm">

                <table className="w-full text-left">

                    <thead className="bg-[#E8E1F7]">

                        <tr>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Código
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Data
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Serviço
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Descrição
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {agendamentos.map((agendamento) => (

                        <tr key={agendamento.id} className="border-t border-[#DCD3EE] transition hover:bg-[#F1ECFA]">

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {agendamento.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {agendamento.data}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {agendamento.servico}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {agendamento.descricao}
                            </td>

                            <td className="px-6 py-4 text-sm">
                                <span className="rounded-full bg-[#E4F5EC] px-3 py-1 text-xs font-medium text-[#1B8859]">
                                    {agendamento.status}
                                </span>
                            </td>

                        </tr>

                        ))}

                        {agendamentos.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-sm text-[#5C5468]">
                                    Nenhum agendamento encontrado.
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>)

}