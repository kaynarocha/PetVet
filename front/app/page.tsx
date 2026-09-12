"use client";

import Link from "next/link";

import {
  PawPrint,
  ShieldAlert,
  Lock,
  Clock,
  Heart,
  Compass,
  BookOpen,
  CalendarDays,
  NotebookPen,
  Users,
} from "lucide-react";

export default function Home() {

return (
    <>
      <style jsx global>{`
        :root {
          --primary-purple: #a855f7;
          --light-purple: #c084fc;
          --deep-purple: #7c3aed;
          --accent-purple: rgba(168, 85, 247, 0.12);
          --primary-green: #22c55e;
          --light-green: #4ade80;
          --deep-green: #16a34a;
          --accent-green: rgba(34, 197, 94, 0.12);
          --text-white: #f5f5f7;
          --text-muted: rgba(245, 245, 247, 0.6);
          --text-faint: rgba(245, 245, 247, 0.4);
          --bg-base: #0a0a0f;
          --bg-alt: #0f0d1a;
          --glass: rgba(255, 255, 255, 0.05);
          --border-soft: rgba(255, 255, 255, 0.1);
          --font-main: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-main);
        }

        body {
          color: var(--text-white);
          background-color: var(--bg-base);
          line-height: 1.5;
        }

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

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .gradient-text {
          background-size: 200% 200%;
          animation: gradientMove 6s ease infinite;
        }

        /* Header */
        .petvet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 5%;
          background: rgba(10, 10, 15, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-soft);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .petvet-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-white);
          text-decoration: none;
        }

        .petvet-logo-icon {
          background: linear-gradient(135deg, var(--primary-purple), var(--primary-green));
          color: var(--bg-base);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          box-shadow: 0 0 16px 2px rgba(168, 85, 247, 0.4);
        }

        .petvet-nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
        }

        .petvet-nav a {
          text-decoration: none;
          color: var(--text-muted);
          font-weight: 500;
          transition: color 0.2s;
        }

        .petvet-nav a:hover {
          color: var(--light-purple);
        }

        .petvet-btn-login {
          background: linear-gradient(135deg, var(--primary-purple), var(--deep-purple));
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .petvet-btn-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 20px 3px rgba(168, 85, 247, 0.4);
        }

        .petvet-btn-login a {
          color: var(--text-white);
          text-decoration: none;
        }

        /* Hero de identidade */
        .petvet-identity-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 7rem 5% 8rem 5%;
          background: linear-gradient(180deg, var(--bg-base) 0%, var(--bg-alt) 50%, var(--bg-base) 100%);
          overflow: hidden;
        }

        .petvet-blob-purple {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: var(--primary-purple);
          opacity: 0.2;
          filter: blur(100px);
          animation: float1 9s ease-in-out infinite;
        }

        .petvet-blob-green {
          position: absolute;
          bottom: -120px;
          left: -120px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: var(--primary-green);
          opacity: 0.15;
          filter: blur(100px);
          animation: float2 11s ease-in-out infinite;
        }

        .petvet-identity-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--glass);
          backdrop-filter: blur(10px);
          color: var(--light-purple);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          margin-bottom: 2rem;
          border: 1px solid var(--border-soft);
        }

        .petvet-identity-icon-ring {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: var(--glass);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 40px -5px rgba(168, 85, 247, 0.5);
          margin-bottom: 2rem;
          border: 2px solid transparent;
          background-image: linear-gradient(var(--bg-base), var(--bg-base)), linear-gradient(135deg, var(--primary-purple), var(--primary-green));
          background-origin: border-box;
          background-clip: padding-box, border-box;
          color: var(--light-purple);
        }

        .petvet-identity-hero h1 {
          position: relative;
          font-size: 2.9rem;
          font-weight: 600;
          line-height: 1.25;
          color: var(--text-white);
          max-width: 720px;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .petvet-identity-hero h1 span {
          background: linear-gradient(90deg, var(--primary-purple), var(--light-purple), var(--primary-green));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .petvet-identity-hero p {
          position: relative;
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 560px;
          margin-bottom: 2.5rem;
        }

        .petvet-identity-actions {
          position: relative;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .petvet-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, var(--primary-purple), var(--deep-purple));
          color: var(--text-white);
          padding: 0.9rem 2.2rem;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s;
          border: none;
          cursor: pointer;
        }

        .petvet-btn-primary:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 0 30px 4px rgba(168, 85, 247, 0.45);
        }

        .petvet-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border: 1px solid var(--border-soft);
          background: var(--glass);
          backdrop-filter: blur(10px);
          color: var(--text-white);
          padding: 0.85rem 2.2rem;
          border-radius: 999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: border-color 0.2s, background 0.2s;
        }

        .petvet-btn-outline:hover {
          border-color: var(--primary-green);
          background: var(--accent-green);
        }

        /* Faixa de confiança */
        .petvet-trust-strip {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          padding: 2.5rem 5%;
          background: var(--bg-base);
          border-bottom: 1px solid var(--border-soft);
        }

        .petvet-trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .petvet-trust-item svg {
          color: var(--primary-green);
          filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.5));
        }

        /* Seções gerais */
        .petvet-section {
          padding: 6rem 5%;
          text-align: center;
          background: var(--bg-base);
        }

        .petvet-section-alt {
          background-color: var(--bg-alt);
        }

        .petvet-section-eyebrow {
          display: inline-block;
          color: var(--primary-green);
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .petvet-section-title {
          font-size: 2.25rem;
          font-weight: 600;
          color: var(--text-white);
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .petvet-section-subtitle {
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto 4rem auto;
          font-size: 1.1rem;
        }

        /* Nossa História */
        .petvet-history-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
          background: var(--glass);
          backdrop-filter: blur(16px);
          padding: 2.5rem;
          border-radius: 20px;
          border: 1px solid var(--border-soft);
          border-top: 2px solid var(--primary-green);
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
        }

        .petvet-history-box p {
          color: var(--text-muted);
        }

        .petvet-history-box p + p {
          margin-top: 1rem;
        }

        .petvet-history-box strong {
          color: var(--light-purple);
        }

        /* Recursos / Pilares */
        .petvet-grid-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          text-align: left;
          max-width: 1100px;
          margin: 0 auto;
        }

        .petvet-feature-card {
          position: relative;
          background: var(--glass);
          backdrop-filter: blur(16px);
          padding: 2.25rem 2rem;
          border-radius: 20px;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          border: 1px solid var(--border-soft);
        }

        .petvet-feature-card:hover {
          transform: translateY(-8px);
          border-color: var(--primary-purple);
          box-shadow: 0 25px 40px -15px rgba(168, 85, 247, 0.35);
        }

        .petvet-feature-icon {
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-green));
          color: var(--light-green);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border-soft);
        }

        .petvet-feature-card h3 {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-white);
          margin-bottom: 0.6rem;
        }

        .petvet-feature-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Citação / propósito */
        .petvet-quote-section {
          position: relative;
          padding: 5.5rem 5%;
          text-align: center;
          background: linear-gradient(135deg, var(--deep-purple) 0%, #2e1065 100%);
          color: var(--text-white);
          overflow: hidden;
        }

        .petvet-quote-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 500px;
          height: 500px;
          transform: translate(-50%, -50%);
          background: var(--primary-green);
          opacity: 0.15;
          border-radius: 50%;
          filter: blur(120px);
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .petvet-quote-section svg {
          position: relative;
          color: var(--light-green);
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.5));
        }

        .petvet-quote-section p {
          position: relative;
          font-size: 1.4rem;
          font-weight: 500;
          max-width: 700px;
          margin: 0 auto 1rem auto;
          line-height: 1.5;
        }

        .petvet-quote-section span {
          position: relative;
          color: var(--light-purple);
          font-size: 0.9rem;
        }

        /* Footer */
        .petvet-footer {
          background: var(--bg-base);
          color: var(--text-white);
          padding: 3rem 5%;
          text-align: center;
          border-top: 1px solid var(--border-soft);
        }

        .petvet-footer p {
          color: var(--text-faint);
          font-size: 0.9rem;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .petvet-identity-hero {
            padding: 4.5rem 6% 6rem 6%;
          }

          .petvet-identity-hero h1 {
            font-size: 2.1rem;
          }

          .petvet-trust-strip {
            gap: 1.5rem;
          }

          .petvet-nav ul {
            display: none;
          }
        }
      `}</style>

      {/* Header */}
      <header className="petvet-header">
        <a href="#inicio" className="petvet-logo">
          <div className="petvet-logo-icon">
            <PawPrint size={20} />
          </div>
          PetVet
        </a>

        <nav className="petvet-nav">
          <ul>
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Nossa História</a></li>
            <li><a href="#recursos">Recursos</a></li>
          </ul>
        </nav>

        <div className="petvet-btn-login">
          <Link href="/login">Login</Link>
        </div>
      </header>

      <main>
        {/* Hero de identidade — o que o sistema é */}
        <section id="inicio" className="petvet-identity-hero fade-up">
          <div className="petvet-blob-purple" />
          <div className="petvet-blob-green" />

          <div className="petvet-identity-badge">
            <ShieldAlert size={16} />
            Sistema de Gestão para Petshops e Clínicas
          </div>

          <div className="petvet-identity-icon-ring">
            <PawPrint size={36} />
          </div>

          <h1>
            Cuidado e Gestão em perfeita{" "}
            <span className="gradient-text">harmonia</span> para seu PetShop
          </h1>

          <p>
            O PetVet é o sistema completo para clínicas e petshops que valorizam
            o elo entre tutores, pets e profissionais. Simplifique agendamentos
            e históricos em um só lugar.
          </p>

          <div className="petvet-identity-actions">
            <a href="#recursos" className="petvet-btn-primary">
              <Compass size={18} />
              Conhecer Sistema
            </a>

            <a href="#sobre" className="petvet-btn-outline">
              <BookOpen size={18} />
              Nossa História
            </a>
          </div>
        </section>

        {/* Faixa de confiança */}
        <section className="petvet-trust-strip">
          <div className="petvet-trust-item">
            <Lock size={18} />
            Dados protegidos e criptografados
          </div>
          <div className="petvet-trust-item">
            <Clock size={18} />
            Atualizado em tempo real
          </div>
          <div className="petvet-trust-item">
            <Heart size={18} />
            Feito para quem cuida de vidas
          </div>
        </section>

        {/* Nossa História */}
        <section id="sobre" className="petvet-section petvet-section-alt">
          <span className="petvet-section-eyebrow">Nossa origem</span>
          <h2 className="petvet-section-title">Nossa História</h2>

          <p className="petvet-section-subtitle">
            Nascemos da paixão incondicional pela amizade entre cães e gatos e
            da necessidade de trazer eficiência para quem cuida deles todos os
            dias.
          </p>

          <div className="petvet-history-box">
            <p>
              O <strong>PetVet</strong> surgiu da percepção de que as clínicas
              veterinárias gastavam tempo demais com planilhas confusas e
              papéis, e pouco tempo focando no que realmente importa: o
              bem-estar animal.
            </p>

            <p>
              Inspirados pelo símbolo da cumplicidade entre gatos e cachorros,
              criamos um ecossistema digital inteligente focado no controle
              dinâmico de agendamentos, prontuários de pets, gestão de tutores e
              histórico de clientes. Unimos tecnologia de ponta à essência do
              cuidado veterinário.
            </p>
          </div>
        </section>

        {/* Recursos */}
        <section id="recursos" className="petvet-section">
          <span className="petvet-section-eyebrow">O que oferecemos</span>
          <h2 className="petvet-section-title">Tudo o que sua Clínica Precisa</h2>

          <p className="petvet-section-subtitle">
            Ferramentas robustas desenvolvidas para otimizar a rotina de médicos
            veterinários e recepcionistas.
          </p>

          <div className="petvet-grid-features">
            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <CalendarDays size={22} />
              </div>
              <h3>Agendamentos</h3>
              <p>
                Controle de agenda integrado com lembretes automáticos para os
                tutores reduzirem as faltas.
              </p>
            </div>

            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <NotebookPen size={22} />
              </div>
              <h3>Prontuário dos Pets</h3>
              <p>
                Histórico médico completo, vacinas, receituários e evoluções
                clínicas acessíveis em segundos.
              </p>
            </div>

            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <Users size={22} />
              </div>
              <h3>Gestão de Tutores</h3>
              <p>
                Base de clientes centralizada com dados de contato, histórico
                financeiro e preferências dos animais.
              </p>
            </div>
          </div>
        </section>

        {/* Propósito */}
        <section className="petvet-quote-section">
          <div className="petvet-quote-glow" />
          <PawPrint size={32} />
          <p>
            "Tecnologia não substitui o cuidado — ela existe para que sobre mais
            tempo para ele."
          </p>
          <span>Equipe PetVet</span>
        </section>
      </main>

      <footer className="petvet-footer">
        <p>
          &copy; 2026 PetVet - Todos os direitos reservados. Feito com cuidado
          para quem ama os animais.
        </p>
      </footer>
    </>
  );
}