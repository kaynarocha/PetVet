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
  ChevronDown,
} from "lucide-react";

export default function Home() {

return (
    <>
      <style jsx global>{`
        :root {
          --primary-purple: #5b21b6;
          --light-purple: #7c3aed;
          --accent-purple: #ede9fe;
          --primary-green: #10b981;
          --light-green: #34d399;
          --accent-green: #d1fae5;
          --text-dark: #1f2937;
          --text-light: #4b5563;
          --bg-light: #f9fafb;
          --white: #ffffff;
          --font-main: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-main);
        }

        body {
          color: var(--text-dark);
          background-color: var(--white);
          line-height: 1.5;
        }

        /* Header */
        .petvet-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.25rem 5%;
          background: var(--white);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
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
          color: var(--primary-purple);
          text-decoration: none;
        }

        .petvet-logo-icon {
          background: var(--accent-purple);
          color: var(--primary-purple);
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
        }

        .petvet-nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          align-items: center;
        }

        .petvet-nav a {
          text-decoration: none;
          color: var(--text-light);
          font-weight: 500;
          transition: color 0.2s;
        }

        .petvet-nav a:hover {
          color: var(--primary-purple);
        }

        .petvet-btn-login {
          background-color: var(--primary-green);
          color: var(--white);
          padding: 0.6rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.2s, transform 0.1s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .petvet-btn-login:hover {
          background-color: #059669;
          transform: translateY(-1px);
        }

        .petvet-btn-login a {
          color: var(--white);
          text-decoration: none;
        }

        /* Hero de identidade */
        .petvet-identity-hero {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 6rem 5% 8rem 5%;
          background: linear-gradient(135deg, #f5f3ff 0%, #ecfdf5 100%);
          overflow: hidden;
        }

        .petvet-identity-hero::before {
          content: "";
          position: absolute;
          top: -80px;
          right: -80px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: var(--accent-purple);
          opacity: 0.5;
        }

        .petvet-identity-hero::after {
          content: "";
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: var(--accent-green);
          opacity: 0.5;
        }

        .petvet-identity-badge {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--white);
          color: var(--primary-purple);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          margin-bottom: 2rem;
          border: 1px solid var(--accent-purple);
        }

        .petvet-identity-icon-ring {
          position: relative;
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: var(--white);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 40px -10px rgba(91, 33, 182, 0.25);
          margin-bottom: 2rem;
          border: 6px solid var(--accent-green);
          color: var(--primary-purple);
        }

        .petvet-identity-hero h1 {
          position: relative;
          font-size: 2.75rem;
          line-height: 1.25;
          color: var(--text-dark);
          max-width: 700px;
          margin-bottom: 1.25rem;
        }

        .petvet-identity-hero h1 span {
          color: var(--primary-purple);
        }

        .petvet-identity-hero p {
          position: relative;
          font-size: 1.15rem;
          color: var(--text-light);
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
          background-color: var(--primary-purple);
          color: var(--white);
          padding: 0.9rem 2.2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s, transform 0.15s;
          border: none;
          cursor: pointer;
        }

        .petvet-btn-primary:hover {
          background-color: var(--light-purple);
          transform: translateY(-2px);
        }

        .petvet-btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          border: 2px solid var(--primary-purple);
          background: var(--white);
          color: var(--primary-purple);
          padding: 0.85rem 2.2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s;
        }

        .petvet-btn-outline:hover {
          background-color: var(--accent-purple);
        }

        /* Faixa de confiança */
        .petvet-trust-strip {
          display: flex;
          justify-content: center;
          gap: 3rem;
          flex-wrap: wrap;
          padding: 2.5rem 5%;
          border-bottom: 1px solid #f0f0f0;
        }

        .petvet-trust-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-light);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .petvet-trust-item svg {
          color: var(--primary-green);
        }

        /* Seções gerais */
        .petvet-section {
          padding: 6rem 5%;
          text-align: center;
        }

        .petvet-section-alt {
          background-color: var(--bg-light);
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
          color: var(--primary-purple);
          margin-bottom: 1rem;
        }

        .petvet-section-subtitle {
          color: var(--text-light);
          max-width: 600px;
          margin: 0 auto 4rem auto;
          font-size: 1.1rem;
        }

        /* Nossa História */
        .petvet-history-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
          background: var(--white);
          padding: 2.5rem;
          border-radius: 16px;
          box-shadow: 0 10px 25px -8px rgba(91, 33, 182, 0.12);
          border-top: 4px solid var(--primary-green);
        }

        .petvet-history-box p {
          color: var(--text-light);
        }

        .petvet-history-box p + p {
          margin-top: 1rem;
        }

        .petvet-history-box strong {
          color: var(--primary-purple);
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
          background: var(--white);
          padding: 2.25rem 2rem;
          border-radius: 16px;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
          border: 1px solid #e5e7eb;
        }

        .petvet-feature-card:hover {
          transform: translateY(-6px);
          border-color: var(--light-green);
          box-shadow: 0 20px 30px -12px rgba(16, 185, 129, 0.18);
        }

        .petvet-feature-icon {
          width: 54px;
          height: 54px;
          background: var(--accent-green);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          margin-bottom: 1.5rem;
        }

        .petvet-feature-card h3 {
          font-size: 1.15rem;
          color: var(--text-dark);
          margin-bottom: 0.6rem;
        }

        .petvet-feature-card p {
          color: var(--text-light);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Citação / propósito */
        .petvet-quote-section {
          padding: 5rem 5%;
          text-align: center;
          background: linear-gradient(135deg, var(--primary-purple) 0%, #4c1d95 100%);
          color: var(--white);
        }

        .petvet-quote-section svg {
          color: var(--light-green);
          margin-bottom: 1.5rem;
        }

        .petvet-quote-section p {
          font-size: 1.4rem;
          font-weight: 500;
          max-width: 700px;
          margin: 0 auto 1rem auto;
          line-height: 1.5;
        }

        .petvet-quote-section span {
          color: #c4b5fd;
          font-size: 0.9rem;
        }

        /* Footer */
        .petvet-footer {
          background: var(--text-dark);
          color: var(--white);
          padding: 3rem 5%;
          text-align: center;
        }

        .petvet-footer p {
          color: #9ca3af;
          font-size: 0.9rem;
        }

        /* Responsividade */
        @media (max-width: 768px) {
          .petvet-identity-hero {
            padding: 4rem 6% 6rem 6%;
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
        <section id="inicio" className="petvet-identity-hero">
          <div className="petvet-identity-badge">
            <ShieldAlert size={16} />
            Sistema de Gestão para Petshops e Clínicas
          </div>

          <div className="petvet-identity-icon-ring">
            <PawPrint size={36} />
          </div>

          <h1>
            Cuidado e Gestão em perfeita <span>harmonia</span> para seu PetShop
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