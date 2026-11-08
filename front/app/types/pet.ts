export class Pet {

    constructor(
        public id: number | null,
        public nome: string,
        public raca: string,
        public dataNascimento: string | null,
        public statusPet: string,
        // fk
        public tutorId?: number | null,
        public tutorNome?: string | null) {

    }

    }

    export interface PetFormProps {
        petExistente ?: Pet;
    }