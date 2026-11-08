export class Agendamento {

    constructor(
        public id: number | null,
        public data: string,
        public servico: string,
        public descricao: string,
        public statusAgendamento: string,
        // fk
        public servicoId?: number | null,
        public petId?: number | null,
        public petNome?: string | null) {

    }
}

export interface AgendamentoFormProps {
    agendamentoExistente ?: Agendamento;
}