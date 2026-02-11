"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Wifi, Menu, X, ArrowUpRight, Zap, Shield, Tv, Radar, Gauge, Users, ChevronDown } from "lucide-react";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const navLinks = [
    { name: "Inicio", href: "#hero", icon: <Zap className="w-4 h-4" /> },
    {
        name: "Planes de Internet",
        href: "#plans-header",
        icon: <Shield className="w-4 h-4" />,
        submenu: [
            { name: "Gamer", href: "#gamer" },
            { name: "Streamer", href: "#streamer" },
            { name: "Música Gratis", href: "/musica-gratis" },
            { name: "Home Office", href: "#home-office" },
            { name: "Empresas", href: "#empresas" },
        ]
    },
    { name: "TV", href: "#television", icon: <Tv className="w-4 h-4" /> },
    { name: "Medidor", href: "#speed-test", icon: <Gauge className="w-4 h-4" /> },
    { name: "Cobertura", href: "#cobertura", icon: <Radar className="w-4 h-4" /> },
    { name: "Partners", href: "#socios", icon: <Users className="w-4 h-4" /> },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { openModal } = useModal();
    const pathname = usePathname();
    const isHomePage = pathname === "/";

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

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("#")) {
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);

            if (element) {
                e.preventDefault();
                closeMenu();

                // Allow time for menu to close and body scroll-lock to release
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                    // Update URL hash without jump
                    if (window.history.pushState) {
                        window.history.pushState(null, '', href);
                    }
                }, 350);
            } else {
                closeMenu();
            }
        } else {
            closeMenu();
        }
    };

    const getLinkHref = (href: string) => {
        if (href.startsWith("#") && !isHomePage) {
            return `/${href}`;
        }
        return href;
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
                    className={`max-w-7xl flex items-center justify-between p-2 md:p-3 rounded-full border shadow-2xl pointer-events-auto transition-all duration-300 ${mobileMenu ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                        } ${scrolled
                            ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-neon-cyan/5"
                            : "bg-black/30 backdrop-blur-md border-white/5"
                        }`}
                >
                    {/* Logo Area */}
                    <a
                        href={getLinkHref("#hero")}
                        onClick={(e) => handleLinkClick(e, "#hero")}
                        className="flex items-center gap-2 pl-3 md:pl-5 group"
                    >
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
                                <li key={link.name} className="relative group/item">
                                    <div className="flex items-center gap-1">
                                        <a
                                            href={getLinkHref(link.href)}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors py-4 flex items-center gap-1"
                                        >
                                            {link.name}
                                            {link.submenu && <ChevronDown className="w-3 h-3 group-hover/item:rotate-180 transition-transform duration-300" />}
                                        </a>
                                    </div>

                                    {link.submenu && (
                                        <div className="absolute top-[100%] left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/item:opacity-100 group-hover/item:translate-y-0 group-hover/item:pointer-events-auto transition-all duration-300 z-[10000]">
                                            <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 min-w-[160px] shadow-2xl">
                                                {link.submenu.map((sub) => (
                                                    <a
                                                        key={sub.name}
                                                        href={getLinkHref(sub.href)}
                                                        onClick={(e) => handleLinkClick(e, sub.href)}
                                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-neon-cyan transition-all"
                                                    >
                                                        <div className="w-1 h-1 rounded-full bg-neon-cyan/50" />
                                                        {sub.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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
                        className="fixed inset-0 z-[11000] lg:hidden bg-black/98 backdrop-blur-2xl flex flex-col pt-32 px-6 pb-12 overflow-y-auto"
                    >
                        {/* Mobile Dedicated Close Button */}
                        <button
                            onClick={closeMenu}
                            title="Cerrar Menú"
                            className="absolute top-6 right-8 p-3 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-all transform active:scale-95 z-[11001]"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
                            {/* Premium Animated Brand Header */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex flex-col items-center justify-center mb-4 relative"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        filter: ["drop-shadow(0 0 10px rgba(0,243,255,0.2))", "drop-shadow(0 0 25px rgba(0,243,255,0.5))", "drop-shadow(0 0 10px rgba(0,243,255,0.2))"]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative mb-4"
                                >
                                    <img src="/favicon.svg" alt="FiberGravity Logo" className="w-20 h-20" />
                                    <div className="absolute inset-0 bg-neon-cyan blur-2xl opacity-20 -z-10" />
                                </motion.div>
                                <h3 className="text-3xl font-black italic tracking-tighter text-white">
                                    FIBER<span className="text-neon-cyan">GRAVITY</span>
                                </h3>
                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4" />
                            </motion.div>

                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, i) => (
                                    <div key={link.name} className="flex flex-col gap-2">
                                        <motion.a
                                            href={getLinkHref(link.href)}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            onClick={(e) => handleLinkClick(e, link.href)}
                                            className="relative z-20 flex items-center justify-between p-5 rounded-3xl bg-white/[0.03] border border-white/5 active:bg-white/10 active:scale-[0.98] transition-all no-underline group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <span className="text-white/20 font-black text-lg group-hover:text-neon-cyan transition-colors">0{i + 1}</span>
                                                <span className="text-xl font-black uppercase tracking-tighter italic text-white group-hover:translate-x-1 transition-transform">
                                                    {link.name}
                                                </span>
                                            </div>
                                            {link.submenu ? (
                                                <ChevronDown className="w-5 h-5 text-slate-700" />
                                            ) : (
                                                <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-neon-cyan transition-colors" />
                                            )}
                                        </motion.a>

                                        {link.submenu && (
                                            <div className="grid grid-cols-2 gap-2 px-2 pb-4">
                                                {link.submenu.map((sub, subIdx) => (
                                                    <motion.a
                                                        key={sub.name}
                                                        href={getLinkHref(sub.href)}
                                                        initial={{ opacity: 0, scale: 0.95 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: (i * 0.04) + (subIdx * 0.05) }}
                                                        onClick={(e) => handleLinkClick(e, sub.href)}
                                                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-slate-500 active:text-neon-cyan"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/30" />
                                                        {sub.name}
                                                    </motion.a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
