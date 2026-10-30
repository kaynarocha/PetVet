import { Tutor } from "../types/tutor";
import api from "./api";

// : = retorno | Promise = promessa de algo = função assincrona
export async function buscarListaTutores() : Promise<Tutor[]> {

    const dados = await api.get<Tutor[]>("http://localhost:8080/tutores");

    if(dados.status == 200){
        return dados.data;
    }

    return [];
    
}


export async function deletarTutor(id:number) : Promise<number>{

 var dados = await api.delete('http://localhost:8080/tutores/'+id+'/excluir');
    return dados.status;
}


export async function atualizarStatusTutor(tutor:Tutor) :Promise<void>{
   
    var novoStatus = {};
    if(tutor.statusTutor ==="ATIVO"){
        novoStatus = {status:"BLOQUEADO"}
    }else{
        novoStatus = {status:"ATIVO"}
    }

    var dadosRetorno = await  
    api.patch('http://localhost:8080/tutores/'+tutor.id+'/status',novoStatus);

    if(dadosRetorno.status==200){
        alert("Atulizado status com sucesso!");
    }else{
        alert(dadosRetorno.data);

        return;
    } 
}

export async function consultaTutorPorId(id:number):Promise<Tutor>{
    const valorTutorBack = await api.get<Tutor>('http://localhost:8080/tutores/'+id);
    return valorTutorBack.data;

}

export async function  atualizarTutor (tutor:Tutor): Promise<number>{
    var dadosRetorno = await  
    api.put<number>('http://localhost:8080/tutores/'+tutor.id,tutor);
    return dadosRetorno.data;
}


export async function  salvarTutor (tutor:Tutor): Promise<number>{
    var dadosRetorno = await  
    api.post<number>('http://localhost:8080/tutores',tutor);
    return dadosRetorno.data;
}