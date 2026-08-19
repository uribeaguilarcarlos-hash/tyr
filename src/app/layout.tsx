import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TYR Cargo - Listado de Contenedores",
  description: "Sistema de gestión de contenedores y notificaciones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
