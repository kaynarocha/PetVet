export class Pet {

    constructor(
        public id: number | null,
        public nome: string,
        public raca: string,
        public dataNascimento: string | null,
        public status: string) {

    }

    }

    export interface PetFormProps {
        petExistente ?: Pet;
    }