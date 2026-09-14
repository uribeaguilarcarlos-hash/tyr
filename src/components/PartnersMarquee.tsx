"use client";

import styles from './PartnersMarquee.module.css';

const PARTNERS = [
  { name: "ZIM", id: "zim" },
  { name: "YML", id: "yml" },
  { name: "WHL", id: "whl" },
  { name: "PIL", id: "pil" },
  { name: "COSCO", id: "cosco" },
  { name: "OOCL", id: "oocl" },
  { name: "ONE", id: "one" },
  { name: "MAERSK", id: "maersk" },
  { name: "MSC", id: "msc" },
  { name: "Hapag-Lloyd", id: "hapag-lloyd" },
  { name: "HMM", id: "hmm" },
  { name: "EVERGREEN", id: "evergreen" },
  { name: "CMA CGM", id: "cma-cgm" }
];

const AIRLINES = [
  { name: "Aeroméxico", id: "aeromexico" },
  { name: "Lufthansa", id: "lufthansa" },
  { name: "Iberia", id: "iberia" },
  { name: "American Airways", id: "american-airways" },
  { name: "British Airways", id: "british-airways" },
  { name: "United Airlines", id: "united-airlines" },
  { name: "Air Canada", id: "air-canada" },
  { name: "KLM", id: "klm" },
  { name: "Delta Air", id: "delta-air" },
  { name: "Air France", id: "air-france" }
];

export default function PartnersMarquee() {
  return (
    <section className={styles.partnersSection}>
      {/* SECCIÓN NAVIERAS */}
      <div className={styles.partnersHeader}>
        <h2>ALIANZAS ESTRATÉGICAS</h2>
        <p>NAVIERAS QUE NOS IMPULSAN</p>
      </div>
      
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          {PARTNERS.map((partner, index) => (
            <div key={`p1-${index}`} className={styles.partnerCard}>
              <img 
                src={`/logos/${partner.id}.png`} 
                alt={`${partner.name} Logo`} 
                className={styles.partnerLogo}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <span className={styles.partnerText} style={{ display: 'none' }}>
                {partner.name}
              </span>
            </div>
          ))}
          {/* Duplicate for infinite loop effect */}
          {PARTNERS.map((partner, index) => (
            <div key={`p2-${index}`} className={styles.partnerCard}>
              <img 
                src={`/logos/${partner.id}.png`} 
                alt={`${partner.name} Logo`} 
                className={styles.partnerLogo}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <span className={styles.partnerText} style={{ display: 'none' }}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN AEROLÍNEAS */}
      <div className={styles.partnersHeader} style={{ marginTop: '3rem' }}>
        <p>AEROLÍNEAS ASOCIADAS</p>
      </div>
      
      <div className={styles.marqueeContainer}>
        {/* Usamos una dirección inversa o la misma, aquí puedes jugar con CSS si quieres que vaya al revés */}
        <div className={styles.marqueeContent}>
          {AIRLINES.map((partner, index) => (
            <div key={`a1-${index}`} className={styles.partnerCard}>
              <img 
                src={`/logos/${partner.id}.png`} 
                alt={`${partner.name} Logo`} 
                className={styles.partnerLogo}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <span className={styles.partnerText} style={{ display: 'none' }}>
                {partner.name}
              </span>
            </div>
          ))}
          {/* Duplicate for infinite loop effect */}
          {AIRLINES.map((partner, index) => (
            <div key={`a2-${index}`} className={styles.partnerCard}>
              <img 
                src={`/logos/${partner.id}.png`} 
                alt={`${partner.name} Logo`} 
                className={styles.partnerLogo}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
                  if (nextSibling) nextSibling.style.display = 'block';
                }}
              />
              <span className={styles.partnerText} style={{ display: 'none' }}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
