import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Funil de Feedbacks — LUMYF Beta",
  description: "Sistema de gerenciamento de leads e feedbacks do LUMYF Beta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
