'use client'
import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { RootState } from "../redux/store";
import { useRouter } from "next/dist/client/components/navigation";
import { useSelector } from "react-redux";

export default function SistemaLayout({children}){

    const usuario = useSelector((state: RootState) => state.auth.usuario);

    const router = useRouter();

    useEffect(() => {
        if (usuario == null) {
            router.push("/login");
        }
    })

    return (
        <div className="flex min-h-screen bg-[#0a0a0f]">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto bg-[#0a0a0f] p-6 text-white">
                    {children}
                </main>
                <Footer />
            </div>
        </div>
    );
}
