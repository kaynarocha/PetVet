
import { Pet } from "../types/pet";
import api from "./api";

// : = retorno | Promise = promessa de algo = função assincrona
export async function buscarListaPets() : Promise<Pet[]> {

    const dados = await api.get<Pet[]>("http://localhost:8080/pets");

    if(dados.status == 200){
        return dados.data;
    }

    return [];
    
}


export async function deletarPet(id:number) : Promise<number>{

 var dados = await api.delete('http://localhost:8080/pets/'+id+'/excluir');
    return dados.status;
}


export async function atualizarStatusPet(pet:Pet) :Promise<void>{
   
    var novoStatus = {};
    if(pet.statusPet ==="ATIVO"){
        novoStatus = {status:"BLOQUEADO"}
    }else{
        novoStatus = {status:"ATIVO"}
    }

    var dadosRetorno = await  
    api.patch('http://localhost:8080/pets/'+pet.id+'/status',novoStatus);

    if(dadosRetorno.status==200){
        alert("Atulizado status com sucesso!");
    }else{
        alert(dadosRetorno.data);

        return;
    } 
}

export async function consultaPetPorId(id:number):Promise<Pet>{
    const valorPetBack = await api.get<Pet>('http://localhost:8080/pets/'+id);
    return valorPetBack.data;

}

export async function  atualizarPet (pet:Pet): Promise<number>{
    var dadosRetorno = await  
    api.put<number>('http://localhost:8080/pets/'+pet.id,pet);
    return dadosRetorno.data;
}


export async function  salvarPet (pet:Pet): Promise<number>{
    var dadosRetorno = await  
    api.post<number>('http://localhost:8080/pets',pet);
    return dadosRetorno.data;
}