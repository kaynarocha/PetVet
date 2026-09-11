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

    return (<div className="min-h-screen bg-[#F5F3FA] px-6 py-10">

        <div className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <h1 className="text-3xl font-semibold text-[#4C3A75]">
                Gestão de usuários
            </h1>

            <Link
                href="/usuarios/novo"
                className="rounded-lg bg-[#22A06B] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-[#1B8859]"
            >
                Novo
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
                                Nome
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                CPF
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                E-mail
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {usuarios.map((usuario) => (

                        <tr key={usuario.id} className="border-t border-[#DCD3EE] transition hover:bg-[#F1ECFA]">

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {usuario.id}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {usuario.nome}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {usuario.cpf}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {usuario.email}
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                {usuario.status}
                            </td>

                        </tr>

                        ))}

                        { usuarios.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#5C5468]">

                                </td>

                            </tr>

                            )}

                    </tbody>

                </table>

            </div>

        </div>

    </div>) 
}