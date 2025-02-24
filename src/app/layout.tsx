import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ChatButton from "@/components/ChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Couraça Digital | Empréstimo Consignado e Proteção Veicular",
    template: "%s | Couraça Digital"
  },
  description: "Soluções financeiras e proteção veicular com as melhores taxas do mercado. Empréstimo consignado e proteção veicular completa para sua tranquilidade.",
  keywords: ["empréstimo consignado", "proteção veicular", "financiamento", "seguro", "consignado", "crédito"],
  authors: [{ name: "Couraça Digital" }],
  creator: "Couraça Digital",
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
      { rel: "icon", url: "/icon.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/manifest.json",
  themeColor: "#1E3A8A"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        <Providers>
          {children}
          <ChatButton />
        </Providers>
      </body>
    </html>
  );
} 