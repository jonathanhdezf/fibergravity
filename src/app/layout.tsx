import type { Metadata } from "next";
import { Space_Grotesk, Inter, Orbitron, Exo_2, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fiberlink Play | Broker Digital de Internet, Fibra Óptica y TV",
  description: "Broker digital #1 de telecomunicaciones en Teziutlán y la región. Compara planes reales de fibra óptica, telefonía y televisión.",
  icons: {
    icon: "/favicon.svg",
  },
};

import { AnalyticsTracker } from "@/components/AnalyticsTracker";

import { Toaster } from "react-hot-toast";
import { WhatsAppWidget } from "@/components/ui/WhatsAppWidget";
import { Providers } from "@/components/Providers";
import { ScrollExperience } from "@/components/ui/ScrollExperience";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${orbitron.variable} ${exo2.variable} ${plusJakarta.variable} font-inter antialiased bg-[#020617] text-white selection:bg-neon-cyan/30`}
      >
        <ScrollExperience />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '16px',
            },
          }}
        />
        <AnalyticsTracker />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-black overflow-hidden" />
        <Providers>
          {children}
        </Providers>
        <WhatsAppWidget />
      </body>
    </html>
  );
}

