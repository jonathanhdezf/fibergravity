import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PlansHeader } from "@/components/sections/PlansHeader";
import { GamerPlans } from "@/components/sections/GamerPlans";
import { StreamerPlans } from "@/components/sections/StreamerPlans";
import { HomeOfficePlans } from "@/components/sections/HomeOfficePlans";
import { EnterprisePlans } from "@/components/sections/EnterprisePlans";
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
        <PlansHeader />
        <GamerPlans />
        <StreamerPlans />
        <HomeOfficePlans />
        <EnterprisePlans />
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
