import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PlansHeader } from "@/components/sections/PlansHeader";
import { GamerPlans } from "@/components/sections/GamerPlans";
import { StreamerPlans } from "@/components/sections/StreamerPlans";
import { HomeOfficePlans } from "@/components/sections/HomeOfficePlans";
import { EnterprisePlans } from "@/components/sections/EnterprisePlans";
import { TVSection } from "@/components/sections/TVSection";
import { SpeedTest } from "@/components/sections/SpeedTest";
import { Coverage } from "@/components/sections/Coverage";
import { Footer } from "@/components/sections/Footer";

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
        <SpeedTest />
        <Coverage />
        <Partners />
        <Footer />
      </main>
    </ModalProvider>
  );
}
