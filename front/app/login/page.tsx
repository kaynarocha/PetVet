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
 
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0] px-4">
 
        <div className="w-full max-w-md rounded-2xl border border-[#E8DED0] bg-[#FFFDF9] p-8 shadow-lg">
 
            <div className="mb-8 text-center">
 
                <h1 className="text-3xl font-semibold text-[#5C5145]">
                    Entrar no sistema
                </h1>
 
                <p className="mt-2 text-sm text-[#8A7D70]">
                    Insira suas credenciais para acessar o sistema.
                </p>
 
            </div>
 
                <form action={handlerLogin} className="space-y-6">
 
                    <div className="flex flex-col gap-2">
 
                        <label className="text-sm font-medium text-[#6B6054]">
                            E-mail
                        </label>
 
                        <input
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="w-full rounded-lg border border-[#D8CBBB] bg-[#FAF7F2] px-4 py-3 text-[#4F463D] placeholder:text-[#B8ADA2] outline-none transition focus:border-[#B9A58D] focus:ring-2 focus:ring-[#D8CBBB]/50"
                        />
 
                    </div>
 
                    <div className="flex flex-col gap-2">
 
                        <label className="text-sm font-medium text-[#6B6054]">
                            Senha
                        </label>
 
                        <input
                            name="senha"
                            placeholder="Digite sua senha"
                            className="w-full rounded-lg border border-[#D8CBBB] bg-[#FAF7F2] px-4 py-3 text-[#4F463D] placeholder:text-[#B8ADA2] outline-none transition focus:border-[#B9A58D] focus:ring-2 focus:ring-[#D8CBBB]/50"
                        />
 
                    </div>
 
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#B9A58D] py-3 font-medium text-white transition duration-200 hover:bg-[#A58F76] focus:outline-none focus:ring-2 focus:ring-[#B9A58D] focus:ring-offset-2"
                    >
                        Entrar
                    </button>
 
                </form>
 
        </div>
 
    </div>
 
    </>);
 
}
 