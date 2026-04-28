"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  Quote
} from "lucide-react";
import { mainFeatures, otherProducts, testimonials } from "@/content/landing-data";

// Mapping icons dynamically for the feature array
const IconMap = {
  Camera: Camera,
  Receipt: Receipt,
  LayoutDashboard: LayoutDashboard,
  LineChart: LineChart,
  MonitorSmartphone: MonitorSmartphone,
  Cloud: Cloud
};

export default function MBRepairPage() {
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
          <a href="/">
            <img src="/mentebinaria.png" alt="Mente Binária" className="company-logo" />
          </a>
          <nav className="hidden-mobile">
            <a href="#detalhes" className="nav-link">Recursos</a>
            <a href="#depoimentos" className="nav-link">Depoimentos</a>
            <a href="#dna" className="nav-link">DNA</a>
          </nav>
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
            <span>Ecossistema de Software Mente Binária</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            A inteligência que seu<br/>
            negócio precisa para<br/>
            <span className="text-gradient">evoluir.</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A <strong>Mente Binária</strong> acredita que sistema bom é sistema simples. 
            Nós fazemos o trabalho pesado nos bastidores para que as suas telas sejam limpas e intuitivas. 
            Chega de sistemas cheios de menus complicados — criamos tecnologia que trabalha para você, para que você possa focar no que realmente dá lucro.
          </motion.p>
        </div>

        {/* Floating Video Mockup */}
        <motion.div 
          style={{ y: yPos, opacity: opacityFade }}
          className="hero-visual"
        >
          <div className="glass-mockup">
            <video autoPlay loop muted playsInline className="mockup-video">
              <source src="/mentebinaria.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="detalhes" className="features-section">
        <div className="section-header">
           <div className="product-flagship-badge">Solução Especialista MBRepair</div>
           <h2>Potencialize sua Autoeletrica e Oficina</h2>
           
           <div className="product-intro-visual">
             <div className="glass-mockup small-mockup">
               <video autoPlay loop muted playsInline className="mockup-video">
                 <source src="/autoeletrica/logo.mp4" type="video/mp4" />
               </video>
               <img src="/autoeletrica/logo.jpg" alt="MBRepair Logo" className="logo-overlay" />
             </div>
           </div>

           <p>Esqueça os sistemas travados. O Mente Binária Repair conecta celular, nota fiscal e gestão financeira em um só lugar.</p>
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
      
      {/* Brand Philosophy Section */}
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
              Computadores funcionam com códigos binários de zeros e uns, 
              mas eles precisam de uma mente para ter propósito. 
              A <strong>Mente Binária</strong> nasceu da sintonia entre a criatividade humana 
              e a potência da Inteligência Artificial.
            </p>
            <p className="philosophy-highlight">
              Unimos o cérebro ao digital para transformar tecnologia fria em ferramentas vivas, 
              feitas para simplificar sua vida e potencializar seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="testimonials-section">
        <div className="section-header">
          <span className="section-badge">Prova Social</span>
          <h2>Quem usa o MBRepair, aprova.</h2>
          <p>Donos de oficinas e auto elétricas que transformaram sua gestão com o Mente Binária.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="testimonial-card"
            >
              <div className="quote-icon-wrapper">
                <Quote size={24} fill="currentColor" />
              </div>
              <p className="testimonial-content">"{t.content}"</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cross Selling - Outros Programas */}
      <section className="cross-sell-section">
        <div className="cross-sell-container">
          <ShieldCheck size={32} className="cross-sell-icon" />
          <h2>Fazemos parte de algo maior.</h2>
          <p>Conheça o ecossistema de soluções inteligentes da Mente Binária para outros segmentos.</p>
          
          <a href="/" className="btn-secondary-outline">
            Veja mais sistemas inteligentes
            <ArrowRight size={18} />
          </a>
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
