import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
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
    <html lang="pt-br" className={`${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-main">{children}</body>
    </html>
  );
}
