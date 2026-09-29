import Link from "@/node_modules/next/link";
import {
  PawPrint,
  CalendarCheck,
  Users,
  Stethoscope,
  CalendarPlus,
  ClipboardPlus,
  Search,
} from "lucide-react";

export default function HomePage() {

  const stats = [
    { label: "Agendamentos hoje", value: "8", icon: CalendarCheck },
    { label: "Pets cadastrados", value: "142", icon: PawPrint },
    { label: "Tutores ativos", value: "96", icon: Users },
    { label: "Consultas no mês", value: "37", icon: Stethoscope },
  ];

  const quickActions = [
    {
      title: "Novo Agendamento",
      description: "Marque uma consulta ou banho e tosa para um pet.",
      href: "/agendamentos/novo",
      icon: CalendarPlus,
    },
    {
      title: "Cadastrar Pet",
      description: "Registre um novo animal e seu tutor no sistema.",
      href: "/pets/novo",
      icon: ClipboardPlus,
    },
    {
      title: "Buscar Tutor",
      description: "Encontre rapidamente o histórico de um cliente.",
      href: "/tutores",
      icon: Search,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] bg-gradient-to-b from-[#0a0a0f] via-[#0f0d1a] to-[#0a0a0f] relative overflow-hidden">
      <style>{`
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
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .blob-purple { animation: float1 9s ease-in-out infinite; }
        .blob-green { animation: float2 11s ease-in-out infinite; }
        .gradient-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }
        .fade-up { animation: fadeInUp 0.8s ease-out forwards; }
      `}</style>

      {/* glows decorativos animados */}
      <div className="blob-purple pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#a855f7]/25 blur-[120px]" />
      <div className="blob-green pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#22c55e]/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a855f7]/5 blur-[100px] animate-pulse" />

      <div className="relative z-10 px-6 py-12 md:px-10 md:py-16 max-w-6xl mx-auto fade-up">

        {/* Saudação */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="relative mb-5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e]/60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-gradient-to-br from-[#a855f7] to-[#22c55e] shadow-[0_0_16px_3px_rgba(168,85,247,0.5)]" />
          </span>

          <h1 className="text-3xl md:text-5xl font-sans font-semibold tracking-tight text-white">
            Bem-vindo(a) de volta ao{" "}
            <span className="gradient-text bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#22c55e] bg-clip-text text-transparent">
              PetVet
            </span>
          </h1>

          <p className="mt-4 text-white/50 text-sm md:text-base max-w-lg flex items-center gap-2">
            <PawPrint size={16} className="text-[#22c55e]" />
            Aqui está um resumo do que está acontecendo na sua clínica hoje.
          </p>
        </div>

        {/* Indicadores rápidos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 transition-all duration-300 hover:border-[#a855f7]/40 hover:shadow-[0_15px_30px_-12px_rgba(168,85,247,0.3)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#22c55e]/20 border border-white/10 text-[#c084fc]">
                <Icon size={20} />
              </div>
              <p className="text-2xl font-semibold text-white">{value}</p>
              <p className="text-xs text-white/50 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Atalhos rápidos */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4 px-1">
            Ações rápidas
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {quickActions.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#22c55e]/40 hover:shadow-[0_20px_35px_-15px_rgba(34,197,94,0.3)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#a855f7] to-[#22c55e] text-white shadow-[0_0_16px_2px_rgba(168,85,247,0.35)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{description}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}