"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { SupportSection } from "@/components/sections/SupportSection";
import { ModalProvider } from "@/components/ModalProvider";

export default function SoportePage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <SupportSection />
                <Footer />
            </main>
        </ModalProvider>
    );
}
