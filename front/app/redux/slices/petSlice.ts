import { Pet } from "@/app/types/pet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

// formato do estado de pets
interface PetState {
    lista: Pet[];
}

const initialState: PetState = {
    lista: []
}

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        // guarda na store a lista de pets que veio do back
        setPets: (state, action: PayloadAction<Pet[]>) => {
            state.lista = action.payload;
        }
    },
    // quando acontecer a saida,
    // vai limpar a lista de pets, assim o próximo usuário não vai ver os pets de antes
    extraReducers: (builder) => {
        builder.addCase(logout, (state) => {
            state.lista = [];
        });
    }
});

export const { setPets } = petSlice.actions;
export default petSlice.reducer;