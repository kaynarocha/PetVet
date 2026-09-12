export class Agendamento {

    constructor(
        public id: number | null,
        public data: string,
        public servico: string,
        public descricao: string,
        public status: string) {

    }
}