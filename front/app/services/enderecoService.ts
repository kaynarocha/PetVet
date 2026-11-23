import api from "./api";

export interface Endereco {
    cep: string;
    logradouro: string;
    bairro: string;
    cidade: string;
    uf: string;
}


export async function buscarEnderecoPorCep(cep: string): Promise<Endereco> {
    const dados = await api.get<Endereco>('/endereco/' + cep);
    return dados.data;
}