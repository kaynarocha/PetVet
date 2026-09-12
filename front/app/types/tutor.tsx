export class Tutor {

    constructor( 
        public id: number | null,
        public nome: string,
        public cpf: string,
        public telefone: string,
        public email: string,
        public dataNascimento: string | null,
        public endereco: string,
        public status: string) {

    }
}