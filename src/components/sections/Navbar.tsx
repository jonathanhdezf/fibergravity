"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Menu, X, ArrowUpRight, Zap, Shield, Tv, Radar, Gauge, Users } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const navLinks = [
    { name: "Inicio", href: "#hero", icon: <Zap className="w-4 h-4" /> },
    { name: "Marketplace", href: "#nosotros", icon: <Users className="w-4 h-4" /> },
    { name: "Planes Auditados", href: "#plans-header", icon: <Shield className="w-4 h-4" /> },
    { name: "TV & Cable", href: "#television", icon: <Tv className="w-4 h-4" /> },
    { name: "Soporte", href: "#soporte", icon: <ArrowUpRight className="w-4 h-4" /> },
    { name: "Cobertura", href: "#cobertura", icon: <Radar className="w-4 h-4" /> },
    { name: "Audit Speed", href: "#speed-test", icon: <Gauge className="w-4 h-4" /> },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { openModal } = useModal();

    // Fix: Handle physical back button to close menu
    useEffect(() => {
        if (mobileMenu) {
            window.history.pushState({ menuOpen: true }, "");
        }

        const handlePopState = (e: PopStateEvent) => {
            if (mobileMenu) {
                setMobileMenu(false);
            }
        };

        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [mobileMenu]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        if (mobileMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "unset";
        };
    }, [mobileMenu]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled ? "py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-8 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#hero" className="flex items-center gap-2 group cursor-pointer z-[110]">
                    <div className="relative">
                        <Wifi className="w-8 h-8 text-neon-cyan group-hover:scale-110 transition-transform relative z-10" />
                        <div className="absolute inset-0 bg-neon-cyan blur-lg opacity-40 animate-pulse" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter italic text-white no-underline">
                        FIBER<span className="text-neon-cyan neon-text-cyan">GRAVITY</span>
                    </span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-neon-cyan transition-colors flex items-center gap-2 group"
                                >
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-neon-cyan">/</span>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <NeonButton
                        onClick={() => openModal()}
                        className="!py-2 !px-6 text-[10px] font-black tracking-widest"
                        variant="cyan"
                    >
                        CONTRATAR
                    </NeonButton>
                </div>

                {/* Mobile Trigger */}
                <button
                    className="lg:hidden z-[1100] p-2 hover:bg-white/5 rounded-full transition-colors relative"
                    onClick={() => {
                        if (mobileMenu) {
                            window.history.back(); // Use back to close if we pushed state
                        } else {
                            setMobileMenu(true);
                        }
                    }}
                    aria-label={mobileMenu ? "Cerrar menú" : "Abrir menú"}
                >
                    {mobileMenu ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8 text-white" />}
                </button>
            </div>

            {/* Stunning Mobile Menu Experience */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[1100] lg:hidden overflow-y-auto bg-black/95 backdrop-blur-xl"
                    >
                        <div className="relative min-h-full flex flex-col pt-32 pb-16 px-8 items-center z-10">
                            <div className="w-full max-w-sm space-y-2">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{
                                            delay: i * 0.04,
                                            duration: 0.3,
                                            ease: "easeOut"
                                        }}
                                        onClick={() => {
                                            if (mobileMenu) window.history.back();
                                        }}
                                        className="flex items-center justify-between group p-4 rounded-2xl bg-white/[0.02] border border-white/5 active:bg-white/10 transition-all text-white no-underline w-full will-change-transform"
                                    >
                                        <div className="flex items-center gap-6">
                                            <span className="text-white/20 font-black text-xl group-hover:text-neon-cyan transition-colors">0{i + 1}</span>
                                            <div className="flex flex-col">
                                                <span className="text-xl font-black uppercase tracking-tighter italic group-hover:text-white transition-all">
                                                    {link.name}
                                                </span>
                                                <span className="text-[7px] font-black tracking-[0.3em] text-slate-500 uppercase flex items-center gap-2">
                                                    {link.icon} Live Analysis
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-neon-cyan transition-colors" />
                                    </motion.a>
                                ))}
                            </div>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 20, opacity: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="mt-8 w-full max-w-sm pt-8 border-t border-white/10 flex flex-col gap-6 will-change-transform"
                            >
                                <div className="flex justify-between items-center text-[10px] font-black tracking-widest text-slate-500 uppercase">
                                    <span>Broker Digital</span>
                                    <span className="text-neon-cyan">Teziutlán v2.4</span>
                                </div>
                                <NeonButton
                                    onClick={() => {
                                        if (mobileMenu) window.history.back();
                                        openModal();
                                    }}
                                    className="w-full !py-4 text-xs font-black tracking-[0.2em]"
                                    variant="cyan"
                                >
                                    INICIAR CONTRATACIÓN
                                </NeonButton>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
