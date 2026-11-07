'use client'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { store } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { Usuario } from "../types/usuario";

export default function Header(){

    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        setUsuario(store.getState().auth.usuario);
    }, []);

    const dispatch = useDispatch();

    return (
        <header className="w-full bg-[#0a0a0f]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] flex items-center justify-center text-white shadow-[0_0_16px_2px_rgba(168,85,247,0.4)]">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                    </div>
                    <span className="text-white font-medium text-sm sm:text-base">
                        {usuario? usuario.nome.toLocaleUpperCase() : 'Usuário não identificado.'}
                    </span>
                </div>
                <button onClick={() => {
                    dispatch(logout())
                } } className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-medium text-sm rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_2px_rgba(168,85,247,0.45)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50">
                    <span className="relative z-10">Sair</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        Sair
                    </span>
                </button>
            </div>
        </header>
    );

}