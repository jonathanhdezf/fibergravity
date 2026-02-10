import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { GamerPlans } from "@/components/sections/GamerPlans";
import { TVSection } from "@/components/sections/TVSection";
import { SupportSection } from "@/components/sections/SupportSection";
import { SpeedTest } from "@/components/sections/SpeedTest";
import { Coverage } from "@/components/sections/Coverage";
import { Footer } from "@/components/sections/Footer";

import { Contact } from "@/components/sections/Contact";
import { Privacy } from "@/components/sections/Privacy";
import { Partners } from "@/components/sections/Partners";

import { ModalProvider } from "@/components/ModalProvider";

export default function Home() {
  return (
    <ModalProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <BentoGrid />
        <GamerPlans />
        <TVSection />
        <SupportSection />
        <SpeedTest />
        <Coverage />
        <Contact />
        <Privacy />
        <Partners />
        <Footer />
      </main>
    </ModalProvider>
  );
}
