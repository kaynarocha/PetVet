'use client'
 
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginResponse } from "../types/auth";
 
export default function Login(){
    const router = useRouter();
 
    const handlerLogin = async(formData:FormData) =>{
        try {
        debugger;

        // ?? "" = se não ter email, vai ir vazio.
        const emailTela = formData.get("email")?.toString() ?? "";
        const senhaTela = formData.get("senha")?.toString() ?? "";

        var loginResposta = await axios.post<LoginResponse>("http://localhost:8080/auth/login", 
            {email: emailTela, senha: senhaTela});

            if (loginResposta.status == 200) {
                router.push("/home");
            } else {
                alert("Login ou senha inválido!");
            }
        } catch (error) {
            alert("Login ou senha inválido!");
        }
    }

 
    return(<>

    <div className="min-h-screen flex items-center justify-center bg-[#F7F5FB] px-4">

        <div className="w-full max-w-md rounded-2xl border border-[#E4DBF5] bg-[#FFFFFF] p-8 shadow-lg">

            <div className="mb-8 text-center">

                <h1 className="text-3xl font-semibold text-[#4C2A85]">
                    Entrar no sistema
                </h1>

                <p className="mt-2 text-sm text-[#7A6A9C]">
                    Insira suas credenciais para acessar o sistema.
                </p>

            </div>

                <form action={handlerLogin} className="space-y-6">

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-[#5B4B7A]">
                            E-mail
                        </label>

                        <input
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="w-full rounded-lg border border-[#D6C6EF] bg-[#FAF8FD] px-4 py-3 text-[#3E2E5C] placeholder:text-[#B3A4CC] outline-none transition focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-[#5B4B7A]">
                            Senha
                        </label>

                        <input
                            name="senha"
                            placeholder="Digite sua senha"
                            className="w-full rounded-lg border border-[#D6C6EF] bg-[#FAF8FD] px-4 py-3 text-[#3E2E5C] placeholder:text-[#B3A4CC] outline-none transition focus:border-[#8B5CF6] focus:ring-2 focus:ring-[#8B5CF6]/30"
                        />

                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#8B5CF6] py-3 font-medium text-white transition duration-200 hover:bg-[#7C3AED] focus:outline-none focus:ring-2 focus:ring-[#A7F3D0] focus:ring-offset-2"
                    >
                        Entrar
                    </button>

                </form>

        </div>

    </div>

    </>);

}