"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Terms } from "@/components/sections/Terms";
import { ModalProvider } from "@/components/ModalProvider";

export default function TerminosPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <Terms />
                <Footer />
            </main>
        </ModalProvider>
    );
}
