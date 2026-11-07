import {Empresa} from "../types/empresa";
import api from "./api";

export async function buscarListaEmpresas() : Promise<Empresa[]> {

    const dados = await api.get<Empresa[]>("/empresas");

    if(dados.status == 200){
        return dados.data;
    }

    return [];

}

export async function deletarEmpresa(id:number) : Promise<number>{

 var dados = await api.delete('/empresas/'+id+'/excluir');
    return dados.status;
    
}

export async function atualizarStatusEmpresa(empresa:Empresa) :Promise<void>{

    var novoStatus = {};

    if(empresa.statusEmpresa ==="ATIVO"){
        novoStatus = {statusEmpresa:"BLOQUEADO"}
    } else {
        novoStatus = {statusEmpresa:"ATIVO"}
    }

    var dadosRetorno = await
    api.patch('/empresas/'+empresa.id+'/status',novoStatus);

    if(dadosRetorno.status==200){
        alert("Atualizado status com sucesso!");
    } else {
        alert(dadosRetorno.data);
        return;
    }
}

export async function consultaEmpresaPorId(id:number):Promise<Empresa>{

    const valorEmpresaBack = await api.get<Empresa>('/empresas/'+id);
    return valorEmpresaBack.data;
}

export async function  atualizarEmpresa (empresa:Empresa): Promise<number>{
    
    var dadosRetorno = await
    api.put<number>('/empresas/'+empresa.id,empresa);
    return dadosRetorno.data;

}

export async function  salvarEmpresa (empresa:Empresa): Promise<number>{

    var dadosRetorno = await
    api.post<number>('/empresas',empresa);
    return dadosRetorno.data;
}

export async function buscarEmpresaLogada(): Promise<Empresa> {

    return (await api.get<Empresa>('/empresas/buscarempresalogada')).data;
}
    
