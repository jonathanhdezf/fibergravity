"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { About } from "@/components/sections/About";
import { ModalProvider } from "@/components/ModalProvider";

export default function NosotrosPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <About />
                <Footer />
            </main>
        </ModalProvider>
    );
}
