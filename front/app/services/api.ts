'use client'

import axios from "axios"
//import Cookies from "js-cookie"
import { store } from "../redux/store"
import { logout } from "../redux/slices/authSlice"

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    (config) => {

        // usava js-cookie
        //const token = Cookies.get('token');

        // token armazenado no estado do redux
        const token = store.getState().auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

// intercepta a resposta : se back responder com 401,
// despacha a ação de logout para limpar o estado do usuário
// volta para login

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);

export default api;