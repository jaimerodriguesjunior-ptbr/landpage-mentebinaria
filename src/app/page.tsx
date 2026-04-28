"use client";

import React, { useState, useEffect, useRef } from "react";
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = ev;
      setMousePosition({ x: clientX, y: clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <div className="landing-wrapper" ref={containerRef}>
      <motion.div 
        className="mouse-glow"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      <header className="header-nav">
        <div className="nav-container">
          <img src="/mentebinaria.png" alt="Mente Binária" className="company-logo" />
          <nav className="hidden-mobile">
            <a href="#solucoes" className="nav-link">Soluções</a>
            <a href="#dna" className="nav-link">O DNA</a>
          </nav>
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
            A inteligência que seu<br/>
            negócio precisa para<br/>
            <span className="text-gradient">evoluir.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A <strong>Mente Binária</strong> acredita que sistema bom é sistema simples. 
            Nós resolvemos a complexidade nos bastidores para que você tenha o controle total na palma da mão.
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

      <section id="solucoes" className="features-section">
        <div className="section-header">
           <span className="section-badge">Ecossistema</span>
           <h2>Nossos Softwares Especialistas</h2>
           <p>Escolha a solução ideal para o seu segmento de mercado.</p>
        </div>

        <div className="products-hub-grid">
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

      <section id="dna" className="philosophy-section">
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
            <p>
              A <strong>Mente Binária</strong> nasceu da sintonia entre a criatividade humana 
              e a potência da Inteligência Artificial. Unimos o cérebro ao digital para transformar tecnologia em ferramentas que simplificam o seu dia a dia.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="contact-section">
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

      <footer className="footer-bar">
        <p>© {new Date().getFullYear()} Mente Binária. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
