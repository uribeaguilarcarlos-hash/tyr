'use client';

import React, { useState } from 'react';
import styles from './ProcessTabs.module.css';

const TABS = {
  ADUANA: 'aduana',
  MARITIMO: 'maritimo',
  AEREO: 'aereo',
  TERRESTRE: 'terrestre',
};

export default function ProcessTabs() {
  const [activeTab, setActiveTab] = useState(TABS.ADUANA);

  return (
    <section id="proceso" className={styles.container}>
      <div className={styles.header}>
        <h2>Nuestros Procesos Logísticos</h2>
        <p>Conoce paso a paso cómo gestionamos tu carga con seguridad y rapidez</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabButton} ${activeTab === TABS.ADUANA ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(TABS.ADUANA)}
        >
          🏢 Despacho Aduanal
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === TABS.MARITIMO ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(TABS.MARITIMO)}
        >
          🚢 Flete Marítimo
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === TABS.AEREO ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(TABS.AEREO)}
        >
          ✈️ Flete Aéreo
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === TABS.TERRESTRE ? styles.activeTab : ''}`}
          onClick={() => setActiveTab(TABS.TERRESTRE)}
        >
          🚛 Transporte Terrestre
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === TABS.ADUANA && <AduanaTimeline />}
        {activeTab === TABS.MARITIMO && <MaritimoTimeline />}
        {activeTab === TABS.AEREO && <AereoTimeline />}
        {activeTab === TABS.TERRESTRE && <TerrestreTimeline />}
      </div>
    </section>
  );
}

// === TIMELINES ===

function AduanaTimeline() {
  return (
    <div className={styles.timeline}>
      <TimelineStep step="1. Revisión Documental" desc="Pre-alerta y validación de Invoice, BL y Packing List antes del arribo." icon={DocIcon} />
      <TimelineStep step="2. Revalidación de BL" desc="Pago de fletes locales a la naviera para liberar el contenedor." icon={ShipIcon} />
      <TimelineStep step="3. Previo de Mercancía" desc="Inspección física en el puerto para cotejar contra documentos." icon={EyeIcon} />
      <TimelineStep step="4. Pedimento y Clasificación" desc="Asignación de fracción arancelaria y cálculo de impuestos." icon={ScaleIcon} />
      <TimelineStep step="5. Pago de Contribuciones" desc="Liquidación electrónica de impuestos de importación/exportación." icon={CardIcon} />
      <TimelineStep step="6. Semáforo Fiscal" desc="Selección automatizada: Verde (Libre) o Rojo (Reconocimiento)." icon={LightIcon} />
      <TimelineStep step="7. Desaduanamiento Libre" desc="Salida rápida del puerto y devolución inmediata del contenedor." icon={TruckIcon} />
    </div>
  );
}

function MaritimoTimeline() {
  return (
    <div className={styles.timeline}>
      <TimelineStep step="1. Reserva (Booking)" desc="Confirmación de espacio y equipo con la naviera en puerto origen." icon={DocIcon} />
      <TimelineStep step="2. Posicionamiento" desc="Envío del contenedor vacío al proveedor para su llenado seguro." icon={BoxIcon} />
      <TimelineStep step="3. Ingreso a Terminal" desc="Recepción de la carga en puerto y trámites de exportación." icon={EyeIcon} />
      <TimelineStep step="4. Zarpe" desc="Salida del buque hacia el puerto de destino programado." icon={ShipIcon} />
      <TimelineStep step="5. Tránsito y Monitoreo" desc="Seguimiento constante de tu mercancía durante la travesía oceánica." icon={GlobeIcon} />
      <TimelineStep step="6. Arribo a Destino" desc="Llegada puntual al puerto mexicano y maniobras de descarga." icon={AnchorIcon} />
    </div>
  );
}

function AereoTimeline() {
  return (
    <div className={styles.timeline}>
      <TimelineStep step="1. Reserva de Espacio" desc="Confirmación de itinerario y capacidad en vuelo con la aerolínea." icon={PlaneIcon} />
      <TimelineStep step="2. Recepción en Terminal" desc="Ingreso de la mercancía al recinto fiscalizado del aeropuerto." icon={BoxIcon} />
      <TimelineStep step="3. Control de Seguridad" desc="Inspección de rayos X y cumplimiento de normas aeronáuticas." icon={EyeIcon} />
      <TimelineStep step="4. Vuelo Directo/Conexión" desc="Tránsito aéreo expedito con monitoreo de estatus de vuelo." icon={GlobeIcon} />
      <TimelineStep step="5. Arribo y Desconsolidación" desc="Llegada al aeropuerto destino y liberación de guías aéreas." icon={CheckIcon} />
    </div>
  );
}

function TerrestreTimeline() {
  return (
    <div className={styles.timeline}>
      <TimelineStep step="1. Asignación de Unidad" desc="Selección del transporte ideal (caja seca, plataforma, refrigerado)." icon={TruckIcon} />
      <TimelineStep step="2. Carga en Origen" desc="Recolección de la mercancía en puerto, frontera o bodega del proveedor." icon={BoxIcon} />
      <TimelineStep step="3. Ruta Segura" desc="Tránsito exclusivo por autopistas de cuota y rutas certificadas." icon={MapIcon} />
      <TimelineStep step="4. Monitoreo 24/7" desc="Rastreo satelital GPS constante hasta el punto de entrega." icon={GlobeIcon} />
      <TimelineStep step="5. Cruce Fronterizo" desc="Coordinación y transfer en puentes internacionales (si aplica)." icon={BridgeIcon} />
      <TimelineStep step="6. Llegada y Descarga" desc="Entrega final en tus instalaciones y firma de documentos (Carta Porte)." icon={CheckIcon} />
    </div>
  );
}

// === HELPERS & ICONS ===

function TimelineStep({ step, desc, icon: Icon }: { step: string, desc: string, icon: any }) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDot}></div>
      <div className={styles.timelineContent}>
        <div className={styles.timelineIcon}><Icon /></div>
        <div className={styles.timelineText}>
          <h3>{step}</h3>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
}

// (Reusing simple SVG icons for standard look without dependencies)
const DocIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ShipIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"></path><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path><path d="M12 10v4"></path><path d="M12 2v3"></path></svg>;
const EyeIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
const ScaleIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path></svg>;
const CardIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const LightIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const TruckIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
const BoxIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const GlobeIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const AnchorIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12H2a10 10 0 0 0 20 0h-3"></path></svg>;
const PlaneIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.3 2.6c-.2.4.1 1 .6 1.1l7.4 2.2-3.1 3.1-3.6-.9c-.5-.1-1 .2-1.2.6L1.3 18c-.2.4.1 1 .6 1.1l4.9 1.2 1.2 4.9c.1.5.7.8 1.1.6l2.5-1.2c.4-.2.7-.7.6-1.2l-.9-3.6 3.1-3.1 2.2 7.4c.1.5.7.8 1.1.6l2.6-1.3c.5-.2.8-.6.7-1.1z"></path></svg>;
const MapIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>;
const BridgeIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 20v-8h-2v8"></path><path d="M4 20v-8H2v8"></path><path d="M22 12V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6"></path><path d="M12 12V4"></path><path d="M7 12V4"></path><path d="M17 12V4"></path></svg>;
const CheckIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
