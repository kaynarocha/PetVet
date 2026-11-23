import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice"
import petReducer from "../redux/slices/petSlice"

export const store = configureStore({
    reducer:{
        auth : authReducer,
        pet : petReducer
    }
});

export type RootState = ReturnType<typeof store.getState >;
export type AppDispath = typeof store.dispatch;