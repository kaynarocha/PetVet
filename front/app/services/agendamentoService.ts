import api from "./api";
import { Agendamento } from "../types/agendamento";

// : = retorno | Promise = promessa de algo = função assincrona
export async function buscarListaAgendamentos() : Promise<Agendamento[]> {

    const dados = await api.get<Agendamento[]>("http://localhost:8080/agendamentos");

    if(dados.status == 200){
        return dados.data;
    }

    return [];
    
}


export async function deletarAgendamento(id:number) : Promise<number>{

 var dados = await api.delete('http://localhost:8080/agendamentos/'+id+'/excluir');
    return dados.status;
}


export async function atualizarStatusAgendamento(agendamento:Agendamento) :Promise<void>{
   
    var novoStatus = {};
    if(agendamento.statusAgendamento ==="ATIVO"){
        novoStatus = {status:"BLOQUEADO"}
    }else{
        novoStatus = {status:"ATIVO"}
    }

    var dadosRetorno = await  
    api.patch('http://localhost:8080/agendamentos/'+agendamento.id+'/status',novoStatus);

    if(dadosRetorno.status==200){
        alert("Atualizado status com sucesso!");
    }else{
        alert(dadosRetorno.data);

        return;
    } 
}

export async function consultaAgendamentoPorId(id:number):Promise<Agendamento>{
    const valorAgendamentoBack = await api.get<Agendamento>('http://localhost:8080/agendamentos/'+id);
    return valorAgendamentoBack.data;

}

export async function  atualizarAgendamento (agendamento:Agendamento): Promise<number>{
    var dadosRetorno = await  
    api.put<number>('http://localhost:8080/agendamentos/'+agendamento.id,agendamento);
    return dadosRetorno.data;
}


export async function  salvarAgendamento (agendamento:Agendamento): Promise<number>{
    var dadosRetorno = await  
    api.post<number>('http://localhost:8080/agendamentos',agendamento);
    return dadosRetorno.data;
}