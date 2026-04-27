"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Camera, 
  Receipt, 
  LayoutDashboard, 
  LineChart, 
  MonitorSmartphone, 
  Cloud,
  ArrowRight,
  ShieldCheck,
  Zap,
  PlayCircle
} from "lucide-react";
import { mainFeatures, otherProducts, screenshotSlots } from "@/content/landing-data";

// Mapping icons dynamically for the feature array
const IconMap = {
  Camera: Camera,
  Receipt: Receipt,
  LayoutDashboard: LayoutDashboard,
  LineChart: LineChart,
  MonitorSmartphone: MonitorSmartphone,
  Cloud: Cloud
};

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
      {/* Dynamic Mouse Tracker Background Glow */}
      <motion.div 
        className="mouse-glow"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          scale: isHovered ? 1.5 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      />

      {/* Top Header */}
      <header className="header-nav">
        <div className="nav-container">
          <img src="/mentebinaria.png" alt="Mente Binária" className="company-logo" />
          <a href="#contato" className="contact-btn">
            Fale Conosco
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow background-blob-1" />
        <div className="hero-glow background-blob-2" />
        
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-badge"
          >
            <Zap size={16} className="badge-icon" />
            <span>Sistema Inteligente para Oficinas</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Sua oficina,<br/>
            gerenciada de forma<br/>
            <span className="text-gradient">brilhante.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Conheça o <strong>MBRepair</strong>, a plataforma em nuvem da Mente Binária. Atenda mais rápido, calcule comissões, emita notas fiscais e impressione seus clientes com nosso Portal exclusivo.
          </motion.p>
          

        </div>

        {/* Floating Video Mockup */}
        <motion.div 
          style={{ y: yPos, opacity: opacityFade }}
          className="hero-visual"
        >
          <div className="glass-mockup">
            <video autoPlay loop muted playsInline className="mockup-video">
              <source src="/autoeletrica/logo.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>
            <img src="/autoeletrica/logo.jpg" alt="MBRepair Logo" className="logo-overlay" />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="detalhes" className="features-section">
        <div className="section-header">
          <h2>Tudo que sua Autoeletrica e Oficina precisam</h2>
          <p>Esqueça os sistemas travados. Nós conectamos celular, nota fiscal e comissões com facilidade.</p>
        </div>

        <div className="bento-grid">
          {mainFeatures.map((feat, index) => {
            const IconComp = IconMap[feat.icon as keyof typeof IconMap] || ArrowRight;
            return (
              <motion.div 
                key={feat.id}
                className={`bento-card ${feat.highlight ? 'bento-highlight' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-content-wrapper">
                  <div className="card-icon-wrapper">
                    <IconComp size={28} className="card-icon" />
                  </div>
                  <h3>{feat.title}</h3>
                  <p>{feat.description}</p>
                </div>
                
                {feat.mediaUrl && (
                  <div className={`card-media-wrapper aspect-${feat.mediaAspect?.replace('/', '-') || '16-9'}`}>
                    {feat.mediaUrl.endsWith('.mp4') ? (
                      <video autoPlay loop muted playsInline className="card-media">
                        <source src={feat.mediaUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={feat.mediaUrl} alt={feat.title} className="card-media" />
                    )}
                  </div>
                )}
                
                <div className="card-glow-effect" />
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Cross Selling - Outros Programas */}
      <section className="cross-sell-section">
        <div className="cross-sell-container">
          <ShieldCheck size={32} className="cross-sell-icon" />
          <h2>Conheça outras soluções do ecossistema Mente Binária</h2>
          <p>Além da gestão de oficinas, desenvolvemos softwares para outros nichos.</p>
          
          <div className="other-products-list">
            {otherProducts.map((prod) => (
              <div key={prod.id} className="other-product-item">
                <div className="product-details">
                  <h4>{prod.name}</h4>
                  <p>{prod.summary}</p>
                </div>
                <a href={prod.url} className="target-link">
                  Veja também
                  <ArrowRight size={18} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="contact-section">
        <div className="contact-card">
          <div className="contact-brand-header">
            <video autoPlay loop muted playsInline className="brand-video-premium">
              <source src="/mentebinaria.mp4" type="video/mp4" />
            </video>
            <div className="brand-glow-subtle" />
          </div>
          
          <div className="contact-content">
            <h2>Pronto para assumir o controle?</h2>
            <p>Transforme de vez a rotina da sua oficina automotiva.</p>
            <a 
              href={`https://wa.me/5544999261487?text=${encodeURIComponent("Olá. Vi o programa de auto-elétrica e oficina no site Mente Binária. Podemos conversar a respeito?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-large"
            >
               Fale Conosco no Whatsapp
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
