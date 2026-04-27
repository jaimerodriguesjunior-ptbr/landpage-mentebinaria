import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mente Binária | Soluções Inteligentes para sua Oficina",
  description: "O sistema em nuvem mais completo para Auto Elétricas e Oficinas Automotivas. O.S. com fotos, emissão de notas e Portal do Cliente.",
  icons: {
    icon: "/mentebinariabrain.png",
    apple: "/mentebinariabrain.png",
  },
  openGraph: {
    title: "Mente Binária | Hub de Soluções Digitais",
    description: "Sua oficina gerenciada de forma brilhante. Conheça o MBRepair.",
    url: "https://mentebinaria.com",
    siteName: "Mente Binária",
    images: [
      {
        url: "/mentebinaria.png",
        width: 1200,
        height: 630,
        alt: "Mente Binária - MBRepair",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
