"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { CookiesContent } from "@/components/sections/Cookies";
import { ModalProvider } from "@/components/ModalProvider";

export default function CookiesPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen">
                <Navbar />
                <CookiesContent />
                <Footer />
            </main>
        </ModalProvider>
    );
}
