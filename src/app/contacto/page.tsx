"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { ModalProvider } from "@/components/ModalProvider";

export default function ContactoPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <div className="pt-20">
                    <Contact />
                </div>
                <Footer />
            </main>
        </ModalProvider>
    );
}
