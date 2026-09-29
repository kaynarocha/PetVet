"use client"

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Tutor } from "@/app/types/tutor";
import TutorForm from "../../components/TutorForm";

export default function EditarTutor(){

    const parametro = useParams();

    const codigo = Number(parametro.codigo);

    const [tutor, setTutor] = useState<Tutor|null> (null);
    const router = useRouter();


    useEffect(() => {

        buscarDados();

    }, []);

    const buscarDados = async() => {

        try {
            const valorTutorBack = await axios.get<Tutor>('http://localhost:8080/tutores/'+codigo);

            if (valorTutorBack.status == 200) {
                setTutor(valorTutorBack.data);
            } else {
                router.push("/tutores");
            }
        } catch (erro) {
            console.error("Erro ao buscar tutor:", erro);
            alert("Tutor não encontrado.");
            router.push("/tutores");
        }

    }

    return(<>

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
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .editar-tutor-blob-purple { animation: float1 9s ease-in-out infinite; }
        .editar-tutor-blob-green { animation: float2 11s ease-in-out infinite; }
        .editar-tutor-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
    `}</style>

    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] px-4 py-10">

        {/* glows decorativos animados */}
        <div className="editar-tutor-blob-purple pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a855f7]/20 blur-[120px]" />
        <div className="editar-tutor-blob-green pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22c55e]/15 blur-[120px]" />

        {!tutor ? (
            <div className="relative z-10 flex min-h-[60vh] items-center justify-center">
                <div className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] animate-pulse shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]" />
                    Carregando dados...
                </div>
            </div>
        ) : (
            <div className="editar-tutor-fade-up relative z-10 mx-auto max-w-3xl space-y-6">

                <div className="relative overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_-15px_rgba(168,85,247,0.25)]">

                    {/* glow decorativo sutil */}
                    <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#a855f7]/15 blur-[90px]" />

                    <div className="relative z-10 space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 bg-gradient-to-br from-[#a855f7] to-[#22c55e] rounded-full inline-block shadow-[0_0_12px_2px_rgba(168,85,247,0.5)]"></span>
                            <span>Editar <span className="bg-gradient-to-r from-[#a855f7] to-[#22c55e] bg-clip-text text-transparent">Tutor {codigo}</span></span>
                        </h1>
                        <p className="text-sm text-white/50">Preencha os dados para editar o Tutor</p>
                    </div>

                    <Link
                        href="/tutores"
                        className="relative z-10 inline-flex items-center justify-center text-sm font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#a855f7]/50 px-4 py-2.5 rounded-xl transition-all duration-200 w-full sm:w-auto">
                        &larr; Voltar para Listagem
                    </Link>

                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.25)]">
                    <TutorForm tutorExistente={tutor} />
                </div>

            </div>
        )}

    </div>

    </>);

    }