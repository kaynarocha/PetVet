'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { Tutor } from "@/app/types/tutor";
import axios from "axios";

export default function Tutores(){

    const [tutores, setTutores] = useState<Tutor[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        // Lógica para carregar os dados dos tutores
        try {
            const dados = await axios.get<Tutor[]>("http://localhost:8080/tutores");
            setTutores(dados.data);
        } catch (error) {
            alert("Erro ao carregar os dados dos tutores.");
        }
    }

    

    return (<div className="min-h-screen bg-[#F5F3FA] px-6 py-10">

        <div className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <h1 className="text-3xl font-semibold text-[#4C3A75]">
                Gestão de tutores
            </h1>

            <Link
                href="/tutores/novo"
                className="rounded-lg bg-[#22A06B] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-[#1B8859]"
            >
                Novo tutor
            </Link>

        </div>

        <div className="mx-auto w-full max-w-6xl">

            <div className="overflow-hidden rounded-2xl border border-[#DCD3EE] bg-[#FDFCFF] shadow-sm">

                <table className="w-full text-left">

                    <thead className="bg-[#E8E1F7]">

                        <tr>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Código
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Nome
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                CPF
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Telefone
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                E-mail
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Data de nascimento
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Endereço
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {tutores.map((tutor) => (

                        <tr key={tutor.id} className="border-t border-[#DCD3EE] transition hover:bg-[#F1ECFA]">

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.nome}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.cpf}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.telefone}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.email}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.dataNascimento}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.endereco}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {tutor.status}
                            </td>

                        </tr>

                        ))}

                        { tutores.length === 0 && (

                            <tr>

                                <td colSpan={8} className="px-6 py-4 text-sm text-[#5C5468] text-center">
                                    Nenhum tutor encontrado.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>)

}