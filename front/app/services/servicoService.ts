import { Servico } from "../types/Servico";
import api from "./api";

export async function buscarListaServicos() : Promise<Servico[]> {

    const dados = await api.get<Servico[]>("/servico");

    if(dados.status == 200){
        return dados.data;
    }

    return [];
}

export async function deletarServico(id:number) : Promise<number>{

    var dados = await api.delete('/servico/'+id+'/excluir');
    return dados.status;
}

export async function atualizarStatusServico(servico:Servico) :Promise<void>{

    var novoStatus = {};
    
    if(servico.statusServico ==="ATIVO"){
        novoStatus = {statusServico:"INATIVO"}
    }else{
        novoStatus = {statusServico:"ATIVO"}
    }

    var dadosRetorno = await
    api.patch('/servico/'+servico.id+'/status',novoStatus);

    if(dadosRetorno.status==200){
        alert("Atualizado status com sucesso!");
    }else{
        alert(dadosRetorno.data);
        return;
    }
}

export async function consultaServicoPorId(id:number):Promise<Servico>{
    const valorServicoBack = await api.get<Servico>('/servico/'+id);
    return valorServicoBack.data;
}

export async function atualizarServico (servico:Servico): Promise<number>{
    var dadosRetorno = await
    api.put<number>('/servico/'+servico.id,servico);
    return dadosRetorno.data;
}

export async function salvarServico (servico:Servico): Promise<number>{
    var dadosRetorno = await
    api.post<number>('/servico',servico);
    return dadosRetorno.data;
}