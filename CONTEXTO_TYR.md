# Contexto del Proyecto: TYR Cargo

## 🌐 Información General
- **Empresa:** TYR Cargo (Logística Internacional, Freight Forwarder).
- **Dominio de Producción:** tyrcargo.com
- **Hosting de Producción:** DigitalServer (cPanel). Se sube únicamente el contenido de la carpeta comprimida `out/`.
- **Entorno de QA:** Azure Static Web Apps (Despliegue automático vía GitHub Actions).
- **Tecnologías:** Next.js (con `output: 'export'`), React, CSS Modules, TypeScript.

## 🚀 Lo que logramos hoy (Última Sesión)
1. **Diseño Móvil (Mobile First):**
   - Se arregló el desbordamiento de las tarjetas "Misión/Visión" forzando una sola columna (`1fr`).
   - Se agregó un **Menú de Hamburguesa** responsivo que incluye la navegación y el selector de idiomas.
   - Se desactivó la interacción del globo terráqueo en móviles (`interactive={false}`) para evitar que estorbe al hacer scroll.
2. **Formulario de Contacto (Formspree):**
   - Se conectó con el ID `mqpakvpl`.
   - Se implementó envío por AJAX (fetch) en segundo plano.
   - El formulario ya no redirige a una página externa; muestra una alerta de éxito y **se limpia automáticamente** (`form.reset()`).
3. **Selector de Idiomas (Google Translate):**
   - Se solucionó el bug donde la página se quedaba atrapada en inglés en producción.
   - Se implementó lógica agresiva para limpiar cookies en todas las variantes del dominio (`tyrcargo.com`, `.tyrcargo.com`, `www...`).
   - El `<select>` ahora es un componente controlado por el estado de React (`value={currentLang}`).
   - Los botones de cotización ahora redirigen a diferentes Google Forms dependiendo del idioma activo.
4. **Detalles Visuales:**
   - Se eliminó el filtro blanco y negro de los logos de los partners.
   - Se agregó el logo oficial como `icon.png` (Favicon) para la pestaña del navegador.
   - Se cuidó la codificación UTF-8 para garantizar que los acentos y caracteres especiales (Español, Chino, Francés) se rendericen perfectamente.

## 📊 Integraciones Clave
- **Google Analytics:** `G-Y1TZGMHJYW` (Activo en `layout.tsx`).
- **Formspree (Contacto):** `https://formspree.io/f/mqpakvpl`.
- **Google Forms (Cotizaciones):** Configurados condicionalmente para Español, Inglés, Francés y Chino.

## 🎯 Próximos Pasos (Ideas para el futuro)
- **Crecimiento Orgánico (SEO y Redes):**
  - Configurar al 100% Google Mi Negocio.
  - Estrategia de prospección B2B por LinkedIn.
  - Posible creación de una sección de "Blog" o "Recursos" para SEO orgánico (responder dudas sobre Incoterms, aduanas, etc.).
- **Campañas Pagadas (SEM):**
  - Lanzar campañas de búsqueda en Google Ads utilizando los 3 títulos generados ("TYR Cargo: Freight Forwarder", "Cotiza Tu Flete Internacional", etc.).
- **Expansión Tecnológica:**
  - Desarrollo de un portal de rastreo de envíos para clientes.
  - Automatización de correos a prospectos.

---
*Archivo generado para retomar el contexto en la siguiente sesión con Antigravity.*
