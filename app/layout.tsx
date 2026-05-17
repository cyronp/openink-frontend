import type { Metadata } from "next";
import { Tinos } from "next/font/google";
import "./globals.css";

const tinos = Tinos({
  variable: "--font-tinos-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "openink",
  description: "Sem Conta. Sem algoritmo. Apenas escrita.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${tinos.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
