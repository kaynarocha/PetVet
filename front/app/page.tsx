"use client";

import Link from "next/link";

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
          font-size: 1.2rem;
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

        /* Hero Section */
        .petvet-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          padding: 5rem 5%;
          gap: 4rem;
          background: linear-gradient(135deg, #f5f3ff 0%, #ecfdf5 100%);
        }

        .petvet-hero-content h1 {
          font-size: 3rem;
          line-height: 1.2;
          color: var(--primary-purple);
          margin-bottom: 1.5rem;
        }

        .petvet-hero-content h1 span {
          color: var(--primary-green);
        }

        .petvet-hero-content p {
          font-size: 1.125rem;
          color: var(--text-light);
          margin-bottom: 2rem;
        }

        .petvet-hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .petvet-btn-primary {
          background-color: var(--primary-purple);
          color: var(--white);
          padding: 0.8rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }

        .petvet-btn-primary:hover {
          background-color: var(--light-purple);
        }

        .petvet-btn-outline {
          border: 2px solid var(--primary-purple);
          color: var(--primary-purple);
          padding: 0.8rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.2s;
        }

        .petvet-btn-outline:hover {
          background-color: var(--accent-purple);
        }

        .petvet-hero-card-mockup {
          background: var(--white);
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 450px;
          border-top: 5px solid var(--primary-green);
          margin: 0 auto;
        }

        .petvet-mockup-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--bg-light);
          padding-bottom: 1rem;
        }

        .petvet-mockup-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: var(--bg-light);
          border-radius: 8px;
        }

        /* Seção História e Recursos */
        .petvet-section {
          padding: 6rem 5%;
          text-align: center;
        }

        .petvet-section-alt {
          background-color: var(--bg-light);
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

        .petvet-history-box {
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
          background: var(--white);
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }

        .petvet-grid-features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          text-align: left;
        }

        .petvet-feature-card {
          background: var(--bg-light);
          padding: 2rem;
          border-radius: 12px;
          transition: transform 0.2s;
          border: 1px solid #e5e7eb;
        }

        .petvet-feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--light-green);
        }

        .petvet-feature-icon {
          width: 50px;
          height: 50px;
          background: var(--accent-green);
          color: var(--primary-green);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
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
          .petvet-hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 3rem 5%;
          }

          .petvet-hero-buttons {
            justify-content: center;
          }

          .petvet-nav ul {
            display: none;
          }
        }
      `}</style>

      {/* Estrutura HTML da Landing Page */}
      <header className="petvet-header">
        <a href="#" className="petvet-logo">
          <div className="petvet-logo-icon">
            <i className="fa-solid fa-paw"></i>
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

{/* Atenção aqui, o código abaixo foi adicionado para incluir o botão de login na página inicial. Certifique-se de que o estilo e a funcionalidade estejam corretos.*/}

        <div className="petvet-btn-login">
          <Link href="/login" className="btn-link">Login</Link>
          </div>
      </header>

      <main>
        <section id="inicio" className="petvet-hero">
          <div className="petvet-hero-content">
            <h1>
              Cuidado e Gestão em perfeita <span>harmonia</span> para seu PetShop
            </h1>

            <p>
              O PetVet é o sistema completo para clínicas veterinárias que
              valorizam o elo entre tutores, pets e profissionais. Simplifique
              agendamentos e históricos em um só lugar.
            </p>

            <div className="petvet-hero-buttons">
              <a href="#recursos" className="petvet-btn-primary">
                Conhecer Sistema
              </a>

              <a href="#sobre" className="petvet-btn-outline">
                Nossa História
              </a>
            </div>
          </div>

          <div className="petvet-hero-image">
            <div className="petvet-hero-card-mockup">
              <div className="petvet-mockup-header">
                <strong>Painel PetVet</strong>

                <i
                  className="fa-solid fa-shield-cat"
                  style={{
                    color: "var(--primary-purple)",
                    fontSize: "1.5rem",
                  }}
                ></i>
              </div>

              <div className="petvet-mockup-item">
                <i
                  className="fa-solid fa-calendar-check"
                  style={{ color: "var(--primary-purple)" }}
                ></i>

                <div>
                  <small style={{ color: "var(--text-light)" }}>
                    Próxima Consulta
                  </small>

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    Thor (Golden Retriever) - 14:30
                  </p>
                </div>
              </div>

              <div className="petvet-mockup-item">
                <i
                  className="fa-solid fa-user-gear"
                  style={{ color: "var(--primary-purple)" }}
                ></i>

                <div>
                  <small style={{ color: "var(--text-light)" }}>
                    Gestão de Tutores
                  </small>

                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    +45 cadastros esta semana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="petvet-section petvet-section-alt">
          <h2 className="petvet-section-title">Nossa História</h2>

          <p className="petvet-section-subtitle">
            Nascemos da paixão incondicional pela amizade entre cães e gatos e
            da necessidade de trazer eficiência para quem cuida deles todos os
            dias.
          </p>

          <div className="petvet-history-box">
            <p
              style={{
                color: "var(--text-light)",
                marginBottom: "1rem",
              }}
            >
              O <strong>PetVet</strong> surgiu da percepção de que as clínicas
              veterinárias gastavam tempo demais com planilhas confusas e
              papéis, e pouco tempo focando no que realmente importa: o
              bem-estar animal.
            </p>

            <p style={{ color: "var(--text-light)" }}>
              Inspirados pelo símbolo da cumplicidade entre gatos e cachorros,
              criamos um ecossistema digital inteligente focado no controle
              dinâmico de agendamentos, prontuários de pets, gestão de tutores e
              histórico de clientes. Unimos tecnologia de ponta à essência do
              cuidado veterinário.
            </p>
          </div>
        </section>

        <section id="recursos" className="petvet-section">
          <h2 className="petvet-section-title">
            Tudo o que sua Clínica Precisa
          </h2>

          <p className="petvet-section-subtitle">
            Ferramentas robustas desenvolvidas para otimizar a rotina de médicos
            veterinários e recepcionistas.
          </p>

          <div className="petvet-grid-features">
            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <i className="fa-solid fa-calendar-days"></i>
              </div>

              <h3>Agendamentos</h3>

              <p>
                Controle de agenda integrado com lembretes automáticos para os
                tutores reduzirem as faltas.
              </p>
            </div>

            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <i className="fa-solid fa-paw"></i>
              </div>

              <h3>Prontuário dos Pets</h3>

              <p>
                Histórico médico completo, vacinas, receituários e evoluções
                clínicas acessíveis em segundos.
              </p>
            </div>

            <div className="petvet-feature-card">
              <div className="petvet-feature-icon">
                <i className="fa-solid fa-users"></i>
              </div>

              <h3>Gestão de Tutores</h3>

              <p>
                Base de clientes centralizada com dados de contato, histórico
                financeiro e preferências dos animais.
              </p>
            </div>
          </div>
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
