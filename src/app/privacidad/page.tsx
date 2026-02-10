"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Privacy } from "@/components/sections/Privacy";
import { ModalProvider } from "@/components/ModalProvider";

export default function PrivacyPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <div className="pt-20">
                    <Privacy />
                </div>
                <Footer />
            </main>
        </ModalProvider>
    );
}
