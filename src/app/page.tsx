"use client";

import React, { useState, useEffect, useRef } from "react";
import marketTreeStyles from "@/components/market-tree.module.css";
import { MarketTree } from "@/components/market-tree";
import { MatrixCursor } from "@/components/matrix-cursor";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Zap,
  LayoutDashboard,
  Glasses,
  Gift
} from "lucide-react";
import { otherProducts } from "@/content/landing-data";

export default function HubPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const scrollShowcase = (direction: number) => {
    showcaseRef.current?.scrollBy({ left: direction * 340, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".scroll-reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-wrapper">
      <MatrixCursor />

      <header className="header-nav">
        <div className="nav-container">
          <img src="/mentebinaria.png" alt="Mente Binária" className="company-logo" />
          <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`}>
            <a href="#solucoes" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Ecossistema</a>
            <a href="#mapa-nichos" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Nichos</a>
            <a href="#dna" className="nav-link" onClick={() => setMobileMenuOpen(false)}>O DNA</a>
            <a href="#contato" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contato</a>
          </nav>
          <button type="button" className="mobile-menu-toggle" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={mobileMenuOpen}>
            <span /><span /><span />
          </button>
          <a href="#contato" className="contact-btn">Contato</a>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-glow background-blob-1" />
        <div className="hero-glow background-blob-2" />
        
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge"
          >
            <Zap size={16} className="badge-icon" />
            <span>Inteligência em Software</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="title-line">A inteligência que seu</span><br/>
            <span className="title-line">negócio precisa para</span><br/>
            <span className="title-line text-gradient">evoluir.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A <strong>Mente Binária</strong> acredita que sistema bom é sistema <span className="emphasis-word">simples</span>. 
            Nós resolvemos a complexidade nos bastidores para que você tenha o <span className="emphasis-word">controle total</span> na palma da mão.
          </motion.p>
        </div>

        {/* Floating Video Mockup (Brain) */}
        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="glass-mockup">
            <video autoPlay loop muted playsInline className="mockup-video">
              <source src="/mentebinaria.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </section>

      <section className="showcase-section showcase-before" aria-labelledby="showcase-title">
        <div className="showcase-heading">
          <div>
            <span className="section-badge">Por dentro do MBRepair</span>
            <h2 id="showcase-title">Uma visão geral do sistema</h2>
          </div>
          <div className="showcase-controls" aria-label="Navegar pelas telas">
            <button type="button" onClick={() => scrollShowcase(-1)} aria-label="Ver telas anteriores">←</button>
            <button type="button" onClick={() => scrollShowcase(1)} aria-label="Ver próximas telas">→</button>
          </div>
        </div>
        <div className="showcase-track" ref={showcaseRef}>
          <figure className="showcase-item"><img src="/autoeletrica/pagina-de-login.jpg" alt="Tela de login do MBRepair" /></figure>
          <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/emitirnotalandpage.mp4" type="video/mp4" /></video></figure>
          <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/comissao.mp4" type="video/mp4" /></video></figure>
          <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/abriros.mp4" type="video/mp4" /></video></figure>
          <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/passo a passo cliente.mp4" type="video/mp4" /></video></figure>
        </div>
      </section>

      <section id="solucoes" className="features-section scroll-reveal">
        <div className="section-header">
           <span className="section-badge">Ecossistema</span>
           <h2>Nossos Softwares Especialistas</h2>
           <p>Escolha a solução ideal para o seu segmento de mercado.</p>
        </div>

        <div className="product-preview-block">
          <div className="product-preview-heading">
            <div className="product-preview-title">
              <h3>MB Repair</h3>
              <p>O ecossistema definitivo para Auto Elétricas e Oficinas Automotivas.</p>
            </div>
          </div>
          <div className="showcase-track" ref={showcaseRef}>
            <figure className="showcase-item"><img src="/autoeletrica/pagina-de-login.jpg" alt="Tela de login do MBRepair" /></figure>
            <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/emitirnotalandpage.mp4" type="video/mp4" /></video></figure>
            <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/comissao.mp4" type="video/mp4" /></video></figure>
            <figure className="showcase-item"><video autoPlay loop muted playsInline><source src="/autoeletrica/abriros.mp4" type="video/mp4" /></video></figure>
          </div>
          <a href="/mbrepair" className="mbrepair-logo-card">
            <video autoPlay loop muted playsInline aria-label="Logo animada do MBRepair">
              <source src="/autoeletrica/logo.mp4" type="video/mp4" />
            </video>
            <strong>MBRepair</strong>
            <span className="mbrepair-card-link">Saiba mais <ArrowRight size={18} /></span>
          </a>
        </div>

        <div className="product-showcase-list">
          {[
            { name: "MB Ótica", href: "#", description: "Gestão completa para óticas: receitas, laboratório e vendas." },
            { name: "MB Gift", href: "#", description: "Frente de caixa e gestão para lojas de presentes e utilidades." },
          ].map((product) => (
            <article className="product-showcase-row" key={product.name}>
              <h3 className="product-row-label">{product.name}</h3>
              <div className="product-row-carousel">
                {[0, 1, 2, 3].map((item) => <img key={item} src="/autoeletrica/pagina-de-login.jpg" alt={`${product.name} - tela ${item + 1}`} />)}
              </div>
              <a href={product.href} className="product-row-button">
                <img className="product-logo-placeholder" src="/autoeletrica/logo.jpg" alt="" />
                <strong>{product.name}</strong>
                <span className="learn-more">Saiba mais <ArrowRight size={18} /></span>
              </a>
            </article>
          ))}
        </div>

        <div className="products-hub-grid legacy-product-grid" style={{ display: "none" }}>
          {/* MBRepair Card - Principal */}
          <motion.a 
            href="/mbrepair"
            className="hub-product-card featured"
            whileHover={{ y: -10 }}
          >
            <div className="hub-card-content">
              <div className="hub-card-icon"><LayoutDashboard size={40} /></div>
              <h3>MBRepair</h3>
              <p>O ecossistema definitivo para Auto Elétricas e Oficinas Automotivas. O.S. com fotos, portal do cliente e fiscal.</p>
              <span className="learn-more">
                Conhecer Solução <ArrowRight size={18} />
              </span>
            </div>
            <div className="hub-card-visual">
               <video autoPlay loop muted playsInline className="hub-video-bg">
                 <source src="/autoeletrica/logo.mp4" type="video/mp4" />
               </video>
            </div>
          </motion.a>

          {/* DEMAIS PRODUTOS */}
          <div className="side-products-stack">
            <div className="hub-product-card secondary">
              <div className="hub-card-icon"><Glasses size={32} /></div>
              <h3>MB Ótica</h3>
              <p>Gestão completa para óticas: receitas, laboratório e vendas.</p>
              <span className="badge-soon">Em breve</span>
            </div>
            <div className="hub-product-card secondary">
              <div className="hub-card-icon"><Gift size={32} /></div>
              <h3>MB Gift</h3>
              <p>Frente de caixa e gestão para lojas de presentes e utilidades.</p>
              <span className="badge-soon">Em breve</span>
            </div>
          </div>
        </div>
      </section>

      <section id="mapa-nichos" className="market-map-section" aria-labelledby="market-map-title">
        <div className="market-map-card">
          <span className="section-badge">Ecossistema em expansão</span>
          <h2 id="market-map-title">Tecnologia para cada tipo de negócio</h2>
          <p className="market-map-intro">Cada ramo, uma nova possibilidade. Explore os segmentos que fazem parte do nosso futuro.</p>
          <div className={marketTreeStyles["market-map-grid"]}>
            {[
              ["Varejo", ["Calçados", "Roupas", "Presentes", "Eletrônicos", "Tecidos", "Ótica", "Móveis"]],
              ["Alimentação", ["Padaria", "Pastelaria", "Restaurante", "Lanchonete", "Frutaria", "Mercado", "Açougue"]],
              ["Beleza", ["Barbearia", "Salão de beleza", "Esmalteria", "Estética", "Perfumaria", "Depilação"]],
              ["Fitness/Arte", ["Academia", "Personal trainer", "Pilates", "Dança", "Aula de música", "Aula de pintura"]],
              ["Automotivo", ["Autoelétrica", "Oficina", "Autopeças", "Posto de gasolina", "Lava-jato", "Pneus"]],
              ["Saúde", ["Dentista", "Clínica", "Laboratório", "Farmácia", "Fisioterapia", "Veterinária"]],
              ["Casa e obra", ["Materiais de construção", "Elétrica", "Hidráulica", "Tinta", "Decoração", "Paisagismo"]],
              ["Indústria", ["Fábrica de móveis", "Carrocerias", "Confecções", "Mineração", "Metalúrgica", "Alimentos"]],
              ["Serviços", ["Assistência técnica", "Contabilidade", "Gráfica", "Escola", "Fotografia", "Consultoria"]],
              ["Imobiliário", ["Imobiliária", "Corretor", "Administradora", "Condomínios"]],
            ].map(([group, businesses]) => (
              <MarketTree
                key={group as string}
                group={group as string}
                businesses={businesses as string[]}
                onSelect={setSelectedBusiness}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="dna" className="philosophy-section scroll-reveal">
        <div className="philosophy-content">
          <div className="philosophy-visual">
             <video autoPlay loop muted playsInline className="philosophy-video">
               <source src="/mentebinaria.mp4" type="video/mp4" />
             </video>
             <div className="philosophy-glow" />
          </div>
          <div className="philosophy-text">
            <span className="philosophy-badge">O DNA Mente Binária</span>
            <h2>O código precisa de uma mente.</h2>
            <p className="philosophy-description">
              A <strong>Mente Binária</strong> nasceu da sintonia entre a criatividade humana 
              e a potência da Inteligência Artificial. <span className="emphasis-word">Unimos o cérebro ao digital</span> para transformar tecnologia em ferramentas que simplificam o seu dia a dia.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="contact-section scroll-reveal">
        <div className="contact-card">
          <div className="contact-content">
            <h2>Vamos conversar?</h2>
            <p>Descubra como a Mente Binária pode escalar o seu faturamento com tecnologia.</p>
            <a 
              href="https://wa.me/5544999261487"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-large"
            >
               Falar com um especialista
            </a>
          </div>
        </div>
      </section>

      {selectedBusiness && (
        <div className="business-modal-backdrop" role="presentation" onClick={() => setSelectedBusiness(null)}>
          <div className="business-modal" role="dialog" aria-modal="true" aria-labelledby="business-modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="business-modal-close" onClick={() => setSelectedBusiness(null)} aria-label="Fechar">×</button>
            <span className="section-badge">Um novo sistema pode começar aqui</span>
            <h2 id="business-modal-title">{selectedBusiness}</h2>
            {selectedBusiness === "Autoelétrica" || selectedBusiness === "Oficina" ? (
              <>
                <p>Para autoelétricas e oficinas, nós já temos o <strong className="modal-highlight">MB Repair</strong>, um sistema completo para organizar a operação do seu negócio.</p>
                <p>Você pode solicitar uma apresentação pessoal ou conhecer todos os detalhes na página dedicada.</p>
                <div className="business-modal-actions">
                  <a className="business-modal-cta" href="https://wa.me/5544999261487" target="_blank" rel="noopener noreferrer">Agendar apresentação <ArrowRight size={18} /></a>
                  <a className="business-modal-secondary" href="/mbrepair">Ver página do MB Repair <ArrowRight size={18} /></a>
                </div>
              </>
            ) : (
              <>
                <p>Esse sistema ainda não foi desenvolvido. Mas teremos prazer em criar uma solução sob medida para você e seu negócio.</p>
                <p>Vamos desenhar o fluxo do programa conforme as suas necessidades específicas, <strong className="modal-highlight">sem custo adicional</strong>.</p>
                <a className="business-modal-cta" href="https://wa.me/5544999261487" target="_blank" rel="noopener noreferrer">Quero conversar sobre meu negócio <ArrowRight size={18} /></a>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="footer-bar">
        <p>© {new Date().getFullYear()} Mente Binária. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
