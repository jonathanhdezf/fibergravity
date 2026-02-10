"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Menu, X, ArrowUpRight, Zap, Shield, Tv, Radar, Gauge, Users } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const navLinks = [
    { name: "Inicio", href: "#hero", icon: <Zap className="w-4 h-4" /> },
    { name: "Planes de Internet", href: "#plans-header", icon: <Shield className="w-4 h-4" /> },
    { name: "Internet + TV", href: "#television", icon: <Tv className="w-4 h-4" /> },
    { name: "Medidor de Velocidad", href: "#speed-test", icon: <Gauge className="w-4 h-4" /> },
    { name: "Cobertura", href: "#cobertura", icon: <Radar className="w-4 h-4" /> },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { openModal } = useModal();

    // Sturdy history management for mobile back button
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            if (mobileMenu) {
                setMobileMenu(false);
            }
        };

        if (mobileMenu) {
            window.history.pushState({ menuOpen: true }, "");
            window.addEventListener("popstate", handlePopState);
        }

        return () => window.removeEventListener("popstate", handlePopState);
    }, [mobileMenu]);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) setScrolled(isScrolled);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        if (mobileMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "unset";
        };
    }, [mobileMenu, scrolled]);

    const closeMenu = () => {
        if (mobileMenu) {
            if (window.history.state?.menuOpen) {
                window.history.back();
            } else {
                setMobileMenu(false);
            }
        }
    };

    return (
        <>
            {/* SENIOR PERSISTENT FLOATING BRIDGE */}
            <div className="fixed top-0 inset-x-0 z-[9999] pointer-events-none flex justify-center pt-4 md:pt-6">
                <motion.nav
                    initial={false}
                    animate={{
                        width: scrolled ? "92%" : "98%",
                        y: scrolled ? 0 : 0,
                    }}
                    className={`max-w-7xl flex items-center justify-between p-2 md:p-3 rounded-full border shadow-2xl pointer-events-auto transition-all duration-300 ${scrolled
                        ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-neon-cyan/5"
                        : "bg-black/30 backdrop-blur-md border-white/5"
                        }`}
                >
                    {/* Logo Area */}
                    <a href="#hero" className="flex items-center gap-2 pl-3 md:pl-5 group">
                        <div className="relative">
                            <img src="/favicon.svg" alt="FiberGravity Logo" className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-neon-cyan blur-md opacity-20" />
                        </div>
                        <span className="text-xl font-black tracking-tighter italic text-white hidden sm:block">
                            FIBER<span className="text-neon-cyan">GRAVITY</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8 pr-2">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="w-px h-6 bg-white/10" />
                        <NeonButton
                            onClick={() => openModal()}
                            className="!py-2 !px-6 text-[10px] font-black tracking-widest"
                            variant="cyan"
                        >
                            CONTRATAR
                        </NeonButton>
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 lg:hidden pr-1">
                        <NeonButton
                            onClick={() => openModal()}
                            className="!py-2 !px-4 text-[9px] font-black tracking-widest"
                            variant="cyan"
                        >
                            CONTRATAR
                        </NeonButton>
                        <button
                            className="p-3 hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => mobileMenu ? closeMenu() : setMobileMenu(true)}
                        >
                            {mobileMenu ? <X className="w-7 h-7 text-white" /> : <Menu className="w-7 h-7 text-white" />}
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* HIGH-PERFORMANCE MOBILE BRIDGE */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[9998] lg:hidden bg-black/98 backdrop-blur-2xl flex flex-col pt-32 px-6 pb-12 overflow-y-auto"
                    >
                        <div className="w-full max-w-sm mx-auto flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    onClick={(e) => {
                                        // SENIOR FIX: Real mobile devices need a moment to process anchor links
                                        // before the body overflow is restored and the overlay is hidden.

                                        // Close menu first to restore body scroll
                                        setMobileMenu(false);

                                        // If it's a hash link, we manually trigger the scroll to be 100% sure
                                        const targetId = link.href.replace('#', '');
                                        const element = document.getElementById(targetId);
                                        if (element) {
                                            // Small timeout to wait for 'overflow: hidden' to be removed from body
                                            setTimeout(() => {
                                                element.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }
                                    }}
                                    className="flex items-center justify-between p-5 rounded-3xl bg-white/[0.03] border border-white/5 active:bg-white/10 active:scale-[0.98] transition-all no-underline group"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className="text-white/20 font-black text-lg group-hover:text-neon-cyan transition-colors">0{i + 1}</span>
                                        <span className="text-xl font-black uppercase tracking-tighter italic text-white group-hover:translate-x-1 transition-transform">
                                            {link.name}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-neon-cyan transition-colors" />
                                </motion.a>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-neon-cyan/10 to-transparent border border-neon-cyan/10 text-center"
                            >
                                <div className="text-[10px] font-black tracking-[0.4em] text-neon-cyan uppercase mb-4">
                                    Digital Experience 2026
                                </div>
                                <h4 className="text-white text-lg font-black italic mb-6">
                                    ¿Listo para la máxima potencia?
                                </h4>
                                <NeonButton
                                    onClick={() => {
                                        closeMenu();
                                        setTimeout(openModal, 150);
                                    }}
                                    className="w-full !py-5 text-xs font-black tracking-[0.3em]"
                                    variant="cyan"
                                >
                                    CONTRATAR AHORA
                                </NeonButton>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
