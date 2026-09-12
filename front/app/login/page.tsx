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

    <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 40px) scale(1.05); }
          66% { transform: translate(30px, -20px) scale(0.9); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .login-blob-purple { animation: float1 9s ease-in-out infinite; }
        .login-blob-green { animation: float2 11s ease-in-out infinite; }
        .login-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
        .login-gradient-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
    `}</style>

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] px-4">

        {/* glows decorativos animados */}
        <div className="login-blob-purple pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a855f7]/20 blur-[120px]" />
        <div className="login-blob-green pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22c55e]/15 blur-[120px]" />

        <div className="login-fade-up relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_20px_50px_-15px_rgba(168,85,247,0.25)]">

            <div className="mb-8 text-center">

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a855f7]/20 to-[#22c55e]/20 border border-white/10 shadow-[0_0_25px_-5px_rgba(168,85,247,0.5)]">
                    <span className="h-3 w-3 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_12px_2px_rgba(168,85,247,0.6)]" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight">
                    <span className="login-gradient-text bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22c55e] bg-clip-text text-transparent">
                        Entrar no sistema
                    </span>
                </h1>

                <p className="mt-2 text-sm text-white/50">
                    Insira suas credenciais para acessar o sistema.
                </p>

            </div>

                <form action={handlerLogin} className="space-y-6">

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-white/70">
                            E-mail
                        </label>

                        <input
                            name="email"
                            placeholder="Digite seu e-mail"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 focus:bg-white/[0.06]"
                        />

                    </div>

                    <div className="flex flex-col gap-2">

                        <label className="text-sm font-medium text-white/70">
                            Senha
                        </label>

                        <input
                            name="senha"
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 outline-none transition duration-200 focus:border-[#a855f7] focus:ring-2 focus:ring-[#a855f7]/30 focus:bg-white/[0.06]"
                        />

                    </div>

                    <button
                        type="submit"
                        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#a855f7] to-[#7c3aed] py-3 font-medium text-white transition-all duration-300 hover:shadow-[0_0_25px_2px_rgba(168,85,247,0.5)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#22c55e]/50 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
                    >
                        <span className="relative z-10">Entrar</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#22c55e] to-[#16a34a] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            Entrar
                        </span>
                    </button>

                </form>

        </div>

    </div>

    </>);

}