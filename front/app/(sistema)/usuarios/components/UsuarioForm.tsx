'use client';

import { Usuario, UsuarioFormProps } from "@/app/types/usuario";
import Link from "@/node_modules/next/link";
import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useState } from "react";

export default function UsuarioForm({usuarioExistente} : UsuarioFormProps) {
    const router = useRouter();

    // constante com array de informações
    const [usuario, setUsuario] = useState<Usuario> (
        // se for existente, ele carrega os dados
        usuarioExistente || 
        new Usuario(null, "", "", "ATIVO", "", "")
    );

    // função para atualizar os valores do formulário
    const handlerChange = ( campo : 'nome' | 'email' | 'cpf' | 'senha', valor: string) => {
        // preview
        setUsuario(valorAnterior => 
            new Usuario(
                valorAnterior.id,
                campo === 'nome' ? valor : valorAnterior.nome,
                campo === 'email' ? valor : valorAnterior.email,
                valorAnterior.status,
                campo === 'cpf' ? valor : valorAnterior.cpf,
                campo === 'senha' ? valor : valorAnterior.senha
            )
        )
    }

    // formData - nome / FormData - Tipo
    const handlerSalvar = async (formData: FormData) => { 

        if (usuarioExistente) {
            var dadosRetorno = await 
            axios.put<number>(`http://localhost:8080/usuarios/${usuario.id}`, usuario);

        if (dadosRetorno.status == 200) {
            alert("Usuário foi salvo com sucesso!");
        } else {
            alert (dadosRetorno.data);
            
            return;
        }

        } else {
            var dadosRetorno = await axios.post<number>('http://localhost:8080/usuarios', usuario);

        if (dadosRetorno.status == 200) {
            alert("Usuário foi salvo com sucesso!");
        } else {
            alert (dadosRetorno.data);
            
            return;
        }
        router.push("/usuarios");
    }
}

    return (
        <form action={handlerSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Nome completo:
                    </label>
                    <input name="nome"
                    value={usuario.nome} 
                    required
                    placeholder="Maxine Galathynius"
                    onChange={(e) => handlerChange('nome', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        CPF:
                    </label>
                    <input name="CPF" 
                    value={usuario.cpf}
                    required
                    placeholder="000.000.000-00"
                    onChange={(e) => handlerChange('cpf', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        E-mail
                    </label>
                    <input name="email" 
                    value={usuario.email}
                    required
                    placeholder="maxine.galathynius@gmail.com"
                    onChange={(e) => handlerChange('email', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>

                
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Senha:
                    </label>
                    <input name="Senha" type="password" 
                    value={usuario.senha}
                    required
                    placeholder="••••••••"
                    onChange={(e) => handlerChange('senha', e.target.value)}
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
