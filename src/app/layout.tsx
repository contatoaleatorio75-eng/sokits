import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Só Kits – Sua vida facilitada em um clique | lojasokits.com.br",
  description:
    "Curadoria dos melhores kits e conjuntos do mercado: ferramentas, automotivo, domésticos, tecnologia e casa inteligente. Economize tempo e dinheiro com a Só Kits.",
  keywords: "kits, conjuntos, ferramentas, limpeza automotiva, casa inteligente, tecnologia, curadoria",
  openGraph: {
    title: "Só Kits – Sua vida facilitada em um clique",
    description: "Os melhores conjuntos e bundles da Amazon, Shopee e Mercado Livre em um só lugar.",
    url: "https://lojasokits.com.br",
    siteName: "Só Kits",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
