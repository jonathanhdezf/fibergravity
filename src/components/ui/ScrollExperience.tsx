"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface SectionItem {
    id: string;
    label: string;
    code: string;
}

const HOME_SECTIONS: SectionItem[] = [
    { id: "hero", label: "Inicio", code: "01" },
    { id: "lanzamiento", label: "Lanzamiento", code: "02" },
    { id: "plans-header", label: "Planes", code: "03" },
    { id: "gamer", label: "Gamer", code: "04" },
    { id: "streamer", label: "Streamer", code: "05" },
    { id: "home-office", label: "Home Office", code: "06" },
    { id: "empresas", label: "Empresas", code: "07" },
    { id: "television", label: "TV + Fibra", code: "08" },
    { id: "speed-test", label: "SpeedTest", code: "09" },
    { id: "cobertura", label: "Cobertura", code: "10" },
    { id: "socios", label: "Aliados", code: "11" },
];

export const ScrollExperience = () => {
    const pathname = usePathname();
    const isHome = pathname === "/";

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 28,
        restDelta: 0.001,
    });

    const [activeSection, setActiveSection] = useState<string>("hero");
    const [showBackTop, setShowBackTop] = useState(false);

    useEffect(() => {
        const updateActive = () => {
            setShowBackTop(window.scrollY > 450);
            if (!isHome) return;

            const probe = window.scrollY + window.innerHeight * 0.35;
            let current = HOME_SECTIONS[0].id;
            for (const sec of HOME_SECTIONS) {
                const el = document.getElementById(sec.id);
                if (el && el.offsetTop <= probe) {
                    current = sec.id;
                }
            }
            setActiveSection(current);
        };

        const rafId = window.requestAnimationFrame(updateActive);
        window.addEventListener("scroll", updateActive, { passive: true });
        return () => {
            window.cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", updateActive);
        };
    }, [isHome]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Top Fiber-Optic Progress Laser */}
            <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-white/[0.04] pointer-events-none">
                <motion.div
                    style={{ scaleX }}
                    className="h-full origin-left bg-gradient-to-r from-neon-cyan via-white to-neon-magenta shadow-[0_0_16px_rgba(0,243,255,0.85)]"
                />
            </div>

            {/* Right-Side Optical Section Rail (Desktop on Home) */}
            {isHome && (
                <nav
                    aria-label="Navegación de secciones"
                    className="hidden xl:flex fixed right-3 top-1/2 -translate-y-1/2 z-[9000] flex-col items-center gap-2.5 px-2 py-3.5 rounded-full bg-slate-950/35 backdrop-blur-md border border-white/10 shadow-[0_0_24px_rgba(0,0,0,0.35)]"
                >
                    {HOME_SECTIONS.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                type="button"
                                onClick={() => scrollToSection(section.id)}
                                aria-label={`Ir a ${section.label}`}
                                className="group relative flex items-center justify-center p-0.5 cursor-pointer outline-none"
                            >
                                <span
                                    className="pointer-events-none absolute right-full mr-3 whitespace-nowrap font-digital text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-md border opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-neon-cyan bg-slate-950/85 border-neon-cyan/30 backdrop-blur-md shadow-[0_0_12px_rgba(0,243,255,0.25)] transition-all duration-200"
                                >
                                    {section.code} {section.label}
                                </span>

                                <span className="relative flex items-center justify-center w-3 h-3">
                                    {isActive && (
                                        <motion.span
                                            layoutId="active-rail-glow"
                                            transition={{ type: "spring", stiffness: 300, damping: 28 }}
                                            className="absolute inset-0 rounded-full bg-neon-cyan/40 blur-[4px]"
                                        />
                                    )}
                                    <span
                                        className={`block rounded-full transition-all duration-300 ${
                                            isActive
                                                ? "w-2.5 h-2.5 bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                                                : "w-1.5 h-1.5 bg-slate-600 group-hover:bg-white group-hover:scale-125"
                                        }`}
                                    />
                                </span>
                            </button>
                        );
                    })}

                    {showBackTop && (
                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Volver arriba"
                            className="mt-1 pt-2 border-t border-white/10 w-full flex justify-center text-slate-400 hover:text-neon-cyan transition-colors cursor-pointer"
                        >
                            <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                    )}
                </nav>
            )}
        </>
    );
};
