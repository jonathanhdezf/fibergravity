import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FiberGravity | Internet de Alta Velocidad | Fibra Óptica + TV",
  description: "Marketplace #1 de telecomunicaciones en Teziutlán. Fibra óptica y televisión con tecnología Zero Gravity.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-inter antialiased bg-[#020617] text-white selection:bg-neon-cyan/30`}
      >
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-black overflow-hidden" />
        {children}
      </body>
    </html>
  );
}

