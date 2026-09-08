import Link from "next/link";

export default function Tutores(){

    return (<div className="min-h-screen bg-[#F5F3FA] px-6 py-10">

        <div className="mx-auto mb-8 flex w-full max-w-5xl items-center justify-between">

            <h1 className="text-3xl font-semibold text-[#4C3A75]">
                Tutores
            </h1>

            <Link
                href="/tutores/novo"
                className="rounded-lg bg-[#22A06B] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-[#1B8859]"
            >
                Novo tutor
            </Link>

        </div>

        <div className="mx-auto w-full max-w-6xl">

            <div className="overflow-hidden rounded-2xl border border-[#DCD3EE] bg-[#FDFCFF] shadow-sm">

                <table className="w-full text-left">

                    <thead className="bg-[#E8E1F7]">

                        <tr>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Nome
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                CPF
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Telefone
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                E-mail
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Data de nascimento
                            </th>

                            <th className="px-6 py-4 text-sm font-semibold text-[#4C3A75]">
                                Endereço
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-t border-[#DCD3EE] transition hover:bg-[#F1ECFA]">

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                Janicio
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                123.456.789-00
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                (48) 99999-0000
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                janicio@email.com
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                22/02/1978
                            </td>

                            <td className="px-6 py-4 text-sm text-[#5C5468]">
                                Rua Teresinha da Silva Rocha, SN - Bairro Santa Apolônia, Sangão, SC
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>)

}