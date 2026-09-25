import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tyrcargo.com"),
  title: "TYR Cargo - Logística Internacional",
  description: "Soluciones logísticas integrales y de excelencia.",
  openGraph: {
    title: "TYR Cargo - Logística Internacional",
    description: "Soluciones logísticas integrales y de excelencia.",
    url: "https://www.tyrcargo.com",
    siteName: "TYR Cargo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new window.google.translate.TranslateElement({
                pageLanguage: 'es',
                includedLanguages: 'es,en,zh-CN,de,fr,it,pt',
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5Z9BDTLD');
          `}
        </Script>
        {/* Google Analytics & Google Ads */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-Y1TZGMHJYW" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-Y1TZGMHJYW');
            gtag('config', 'AW-18474841726');
            
            gtag('event', 'conversion', {
                'send_to': 'AW-18474841726/nHg1CPTJoIUdEP7svulE',
                'value': 1.0,
                'currency': 'MXN'
            });
          `}
        </Script>
</head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z9BDTLD"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
        {children}
      </body>
    </html>
  );
}


