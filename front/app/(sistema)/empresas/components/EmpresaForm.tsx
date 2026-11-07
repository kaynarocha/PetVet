'use client';

import { atualizarEmpresa } from "@/app/services/empresaService";
import { Empresa, EmpresaFormProps } from "@/app/types/empresa";
import { useRouter } from "next/dist/client/components/navigation";
import Link from "next/dist/client/link";
import { useState } from "react";

export default function EmpresaForm({empresaExistente} : EmpresaFormProps) {

    const router = useRouter();

    const [empresa, setEmpresa] = useState<Empresa> (
        empresaExistente || 
        new Empresa(null, "", "", "", "ATIVO")
    );

    const handlerChange = ( campo : 'razaoSocial' | 'cnpj' | 'nomeFantasia' | 'statusEmpresa', valor: string) => {
        setEmpresa(valorAnterior => 
            new Empresa(
                valorAnterior.id,
                campo === 'razaoSocial' ? valor : valorAnterior.razaoSocial,
                campo === 'cnpj' ? valor : valorAnterior.cnpj,
                campo === 'nomeFantasia' ? valor : valorAnterior.nomeFantasia,
                campo === 'statusEmpresa' ? valor : valorAnterior.statusEmpresa
            )
        )
    }

    const handlerSalvar = async (formData: FormData) => {

        if (empresaExistente) {
            var dadosRetorno = await atualizarEmpresa(empresa);

        if (dadosRetorno) {
            alert("Empresa foi salva com sucesso!");
        } else {
            alert ("Erro ao atualizar a empresa!");
            return;
        }
    } else {
        var dadosRetorno = await atualizarEmpresa(empresa);

        if (dadosRetorno) {
            alert("Empresa foi salva com sucesso!");
        } else {
            alert ("Erro ao salvar a empresa!");
            return;
        }
        router.push("/empresas");
    }
}

return (

    <form action={handlerSalvar} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Razão Social:
                    </label>
                    <input name="razaoSocial"
                    value={empresa.razaoSocial} 
                    required
                    placeholder="Industrias Galathynius S.A."
                    onChange={(e) => handlerChange('razaoSocial', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        CNPJ:
                    </label>
                    <input name="CNPJ" 
                    value={empresa.cnpj}
                    required
                    placeholder="00.000.000/0000-00"
                    onChange={(e) => handlerChange('cnpj', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>


                <div className="space-y-2">
                    <label className="block text-sm font-medium text-white/70">
                        Nome Fantasia:
                    </label>
                    <input name="nomeFantasia" 
                    value={empresa.nomeFantasia}
                    required
                    placeholder="Galathynius Indústria"
                    onChange={(e) => handlerChange('nomeFantasia', e.target.value)}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#a855f7]/30 focus:border-[#a855f7] transition-all duration-200 focus:bg-white/[0.06]">
                    </input>
                </div>

            </div>

            <div className="flex items-center justify-end space-x-4 pt-4 border-t border-white/10">
                <Link href="/empresas" className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white font-medium text-sm rounded-xl transition-all duration-200 text-center border border-white/10"> Cancelar</Link>
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