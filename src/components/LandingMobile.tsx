"use client";
import Image from 'next/image';
import styles from '@/app/landingMobile.module.css';
import dynamic from 'next/dynamic';
import ProcessTabs from '@/components/ProcessTabs';
import PartnersMarquee from '@/components/PartnersMarquee';

const GlobeAnimation = dynamic(() => import('@/components/GlobeAnimation'), {
  ssr: false, // El globo no debe renderizarse en el servidor para evitar bloqueos
  loading: () => <div style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className={styles.heroGlobePlaceholder}></div>
  </div>
});

import React, { useEffect, useRef } from 'react';

export default function LandingMobile() {
  const [currentLang, setCurrentLang] = React.useState('es');
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showGlobe, setShowGlobe] = React.useState(false);

  useEffect(() => {
    // Retrasar la inicialización del globo 3D para mejorar el TBT en dispositivos móviles
    const timer = setTimeout(() => setShowGlobe(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/es\/([^;]+)/);
    if (match) {
      setCurrentLang(match[1]);
    }
  }, []);

  const getFormLink = (lang: string) => {
    switch (lang) {
      case 'es': return 'https://docs.google.com/forms/d/e/1FAIpQLSfdZ1V047jaOvE8LMzqWBNgNU7Wpb4dssR2UazgLxuzdPuiyg/viewform';
      case 'zh-CN': return 'https://forms.gle/eCAT7hQMELHVwqmV8';
      case 'fr': return 'https://forms.gle/5xpbnMwdCHi46arQ8';
      default: return 'https://forms.gle/toir5h2jWTGsd9PE9';
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mqpakvpl", {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        form.reset();
        alert("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.");
      } else {
        alert("Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} style={{ display: 'flex', alignItems: 'center' }}>
            <Image src="/logo.png" alt="TYR Cargo Logo" width={140} height={60} style={{ objectFit: 'contain' }} />
          </a>
        </div>
        
        <button 
            className={styles.hamburgerBtn}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {menuOpen && (
            <div className={styles.mobileMenu}>
              <button className={styles.closeMenuBtn} onClick={() => setMenuOpen(false)}>&times;</button>
              <a href="#servicios" className={styles.navLink} onClick={() => setMenuOpen(false)}>Servicios</a>
              <a href="#nosotros" className={styles.navLink} onClick={() => setMenuOpen(false)}>Nosotros</a>
              <a href="#contacto" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contacto</a>
              
              <div className={styles.langSelector}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                <select 
                  aria-label="Seleccionar idioma"
                  className={styles.langSelect} 
                  value={currentLang}
                  onChange={(e) => {
                    const lang = e.target.value;
                    const host = window.location.hostname;
                    const baseHost = host.startsWith('www.') ? host.substring(4) : host;
                    
                    // Limpiar TODAS las posibles cookies de Google Translate
                    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + host;
                    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + host;
                    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + baseHost;
                    
                    if (lang !== 'es') {
                      document.cookie = "googtrans=/es/" + lang + "; path=/;";
                      document.cookie = "googtrans=/es/" + lang + "; path=/; domain=" + host;
                      document.cookie = "googtrans=/es/" + lang + "; path=/; domain=." + baseHost;
                    }
                    window.location.reload();
                  }}
                >
                  <option value="es">ES Español</option>
                  <option value="en">US English</option>
                  <option value="zh-CN">CN 中文</option>
                  <option value="de">DE Deutsch</option>
                  <option value="fr">FR Français</option>
                  <option value="it">IT Italiano</option>
                  <option value="pt">PT Português</option>
                </select>
              </div>
            </div>
          )}
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroGlobe}>
              {showGlobe && <GlobeAnimation interactive={false} />}
            </div>
            <div className={styles.heroContent}>
              <span className={styles.heroBadge}>Soluciones Logísticas</span>
              <h1 className={styles.heroTitle}>
                LOGÍSTICA QUE RESPONDE,<br />
                <span style={{ color: 'white' }}>SOLUCIONES QUE CONECTAN.</span>
              </h1>
              <p className={styles.heroLead}>Comercio Internacional sin fronteras.</p>
              <div className={styles.heroCtas}>
                <a href={getFormLink(currentLang)} target="_blank" rel="noopener noreferrer" className={styles.btnPrimaryHero}>Cotiza ahora</a>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.servicesSection} id="servicios">
          <div className={styles.servicesHeader}>
            <h2>COMERCIO INTERNACIONAL</h2>
            <h3>SOLUCIONES INTEGRALES</h3>
            <p>SERVICIOS QUE MUEVEN TU NEGOCIO</p>
          </div>
          <div className={styles.servicesGrid}>
            
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path><path d="M12 10v4"></path><path d="M12 2v3"></path></svg>
              </div>
              <h4>Marítimo</h4>
              <ul>
                <li>FCL / LCL</li>
                <li>Consolidados</li>
                <li>Proyectos</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.3 2.6c-.2.4.1 1 .6 1.1l7.4 2.2-3.1 3.1-3.6-.9c-.5-.1-1 .2-1.2.6L1.3 18c-.2.4.1 1 .6 1.1l4.9 1.2 1.2 4.9c.1.5.7.8 1.1.6l2.5-1.2c.4-.2.7-.7.6-1.2l-.9-3.6 3.1-3.1 2.2 7.4c.1.5.7.8 1.1.6l2.6-1.3c.5-.2.8-.6.7-1.1z"></path></svg>
              </div>
              <h4>Aéreo</h4>
              <ul>
                <li>Carga general</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              <h4>Terrestre</h4>
              <ul>
                <li>Nacional</li>
                <li>Internacional</li>
                <li>Carga consolidada</li>
                <li>Transporte dedicado</li>
              </ul>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h4>Agencia Aduanal</h4>
              <ul>
                <li>Importación</li>
                <li>Exportación</li>
                <li>Despacho aduanal</li>
                <li>Asesoría regulatoria</li>
              </ul>
            </div>

          </div>
        </section>

        <ProcessTabs />
        <PartnersMarquee />

        <section className={styles.whySection} id="nosotros">
          <div className={styles.whyInner}>
            <div className={styles.whyText}>
              <h2>¿POR QUÉ TYR CARGO?</h2>
              <h3>TU SOCIO LOGÍSTICO DE CONFIANZA</h3>
              <ul className={styles.whyList}>
                <li>
                  <div className={styles.whyIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4>Atención Directa y a la Medida</h4>
                    <p>Un equipo experto disponible para ti, con soluciones adaptadas a tu negocio.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.whyIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4>Comunicación Clara y Oportuna</h4>
                    <p>Información precisa, a tiempo, siempre. Visibilidad total de tu carga en todo momento.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.whyIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4>Seguridad y Cumplimiento</h4>
                    <p>Compromiso absoluto con la seguridad en cada etapa del proceso logístico.</p>
                  </div>
                </li>
                <li>
                  <div className={styles.whyIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <div>
                    <h4>Acompañamiento Estratégico</h4>
                    <p>Tu operación no es un número, es nuestra prioridad. Estamos contigo en cada decisión.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.whyImage}>
              <Image 
                src="/logistics-illustration.png" 
                alt="Logística TYR Cargo" 
                width={600} 
                height={600} 
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </section>

        <section className={styles.misionVisionSection}>
          <div className={styles.misionVisionInner}>
            <div className={styles.mvCard}>
              <div className={styles.mvIcon}>
                <img src="/mision.png" alt="Misión" width="80" height="80" style={{ objectFit: 'contain' }} />
              </div>
              <h3>Nuestra Misión</h3>
              <p>Brindar soluciones logísticas integrales y de excelencia, conectando a nuestros clientes con el mundo de manera eficiente, transparente y totalmente segura.</p>
            </div>
            <div className={styles.mvCard}>
              <div className={styles.mvIcon}>
                <img src="/vision.png" alt="Visión" width="80" height="80" style={{ objectFit: 'contain' }} />
              </div>
              <h3>Nuestra Visión</h3>
              <p>Ser la empresa líder en logística internacional en México, reconocida por nuestra innovación tecnológica, confiabilidad operativa y compromiso absoluto con el éxito de cada operación.</p>
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contacto">
          <div className={styles.contactInner}>
            <div className={styles.contactForm}>
              <h3>Escríbenos</h3>
              <p>Llena el formulario y un asesor se pondrá en contacto contigo.</p>
              <form onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                  <label>Nombre</label>
                  <input type="text" name="nombre" placeholder="Tu nombre" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Correo Electrónico</label>
                  <input type="email" name="email" placeholder="tu@correo.com" required />
                </div>
                <div className={styles.formGroup}>
                  <label>Mensaje</label>
                  <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" required></textarea>
                </div>
                <button type="submit" className={styles.btnSubmit}>Enviar Mensaje</button>
              </form>
            </div>
            <div className={styles.contactInfo}>
              <h3>Hablemos de tu próxima operación exitosa.</h3>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className={styles.infoText}>
                  <h4>Email</h4>
                  <p>logistica@tyrcargo.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className={styles.infoText}>
                  <h4>Oficina</h4>
                  <p>55 55 74 61 08</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                </div>
                <div className={styles.infoText}>
                  <h4>Celulares</h4>
                  <p>55 31 46 40 83 / 55 35 03 99 05<br/>56 62 22 78 31</p>
                </div>
              </div>
              <a href="https://wa.me/525563000116" target="_blank" rel="noopener noreferrer" className={styles.btnWhatsapp}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp 55 6300 0116
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div className={styles.footerLogo}>TYR CARGO</div>
            <div className={styles.footerNav}>
              <a href="#servicios">Servicios</a>
              <a href="#nosotros">Nosotros</a>
              <a href="#contacto">Contacto</a>
              <a href="https://www.linkedin.com/company/tyr-cargo/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} TYR Cargo. Todos los derechos reservados.</p>
          <div className={styles.footerLegal}>
            <a href="/documentos/aviso-de-privacidad.pdf" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>
            <a href="/documentos/terminos-y-condiciones.pdf" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
            <a href="/documentos/carta-presentacion.pdf" target="_blank" rel="noopener noreferrer">Carta Presentación</a>
          </div>
        </div>
      </footer>
    </>
  );
}




