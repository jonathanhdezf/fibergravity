"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Menu, X } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { openModal } = useModal();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 glass-dark" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <Wifi className="w-8 h-8 text-neon-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-2xl font-bold tracking-tighter">
                        FIBER<span className="text-neon-cyan">GRAVITY</span>
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    <a href="#planes" className="hover:text-neon-cyan transition-colors">PLANES</a>
                    <a href="#television" className="hover:text-neon-cyan transition-colors">TELEVISIÓN</a>
                    <a href="#soporte" className="hover:text-neon-cyan transition-colors">SOPORTE</a>
                    <a href="#cobertura" className="hover:text-neon-cyan transition-colors">COBERTURA</a>
                    <a href="#nosotros" className="hover:text-neon-cyan transition-colors">NOSOTROS</a>
                    <NeonButton
                        onClick={() => openModal()}
                        className="px-6 py-2 text-xs"
                    >
                        CONTRATAR
                    </NeonButton>
                </div>

                <button
                    className="md:hidden"
                    onClick={() => setMobileMenu(!mobileMenu)}
                    aria-label={mobileMenu ? "Cerrar menú" : "Abrir menú"}
                >
                    {mobileMenu ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute top-full left-0 right-0 glass-dark p-6 flex flex-col gap-4 text-center"
                >
                    <a href="#planes" onClick={() => setMobileMenu(false)} className="text-lg">PLANES</a>
                    <a href="#television" onClick={() => setMobileMenu(false)} className="text-lg">TELEVISIÓN</a>
                    <a href="#soporte" onClick={() => setMobileMenu(false)} className="text-lg">SOPORTE</a>
                    <a href="#cobertura" onClick={() => setMobileMenu(false)} className="text-lg">COBERTURA</a>
                    <a href="#nosotros" onClick={() => setMobileMenu(false)} className="text-lg">NOSOTROS</a>
                    <NeonButton
                        onClick={() => {
                            setMobileMenu(false);
                            openModal();
                        }}
                        className="px-6 py-2 text-xs w-full"
                    >
                        CONTRATAR
                    </NeonButton>
                </motion.div>
            )}
        </nav>
    );
};
