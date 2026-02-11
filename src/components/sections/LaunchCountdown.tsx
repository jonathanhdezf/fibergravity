"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Timer } from "lucide-react";

export const LaunchCountdown = () => {
    const [isMounted, setIsMounted] = useState(false);

    // Fecha objetivo estable
    const targetDate = useMemo(() => new Date("2026-02-12T00:00:00"), []);

    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        setIsMounted(true);
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        setTimeLeft(calculateTimeLeft());
        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ value, label, isSeconds = false }: { value: number; label: string; isSeconds?: boolean }) => {
        return (
            <div className="flex flex-col items-center">
                <div className="relative group perspective-1000">
                    {/* Card Container - Performance Optimized */}
                    <div className="relative bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] w-24 h-28 md:w-32 md:h-36 flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={value}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 35,
                                    restDelta: 0.001
                                }}
                                className="flex flex-col items-center"
                            >
                                <span className={`text-4xl md:text-6xl font-black italic tracking-tighter text-white ${isSeconds ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.3)]' : 'opacity-80'}`}>
                                    {isMounted ? value.toString().padStart(2, '0') : "--"}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
                    </div>
                </div>
                <span className="mt-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500/60 pointer-events-none">
                    {label}
                </span>
            </div>
        );
    };

    return (
        <section className="relative py-28 md:py-36 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-10"
                    >
                        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">Sincronización v3.0</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-8xl font-black italic mb-8 tracking-tighter leading-[0.9] text-white"
                    >
                        EL FUTURO<br />
                        <span className="text-neon-cyan uppercase">EMPIEZA AQUÍ</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-slate-400 text-[10px] md:text-lg max-w-xl mb-20 uppercase font-bold tracking-[0.2em] leading-relaxed opacity-70"
                    >
                        Estamos orquestando el despliegue de infraestructura más grande de la década. Prepárate para la velocidad luz.
                    </motion.p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-14 mb-24">
                        <TimeUnit value={timeLeft.days} label="Días" />
                        <TimeUnit value={timeLeft.hours} label="Horas" />
                        <TimeUnit value={timeLeft.minutes} label="Minutos" />
                        <TimeUnit value={timeLeft.seconds} label="Segundos" isSeconds />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:border-white/10 transition-all duration-300 text-left"
                        >
                            <Zap className="w-8 h-8 text-neon-cyan" />
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Carga de Datos</p>
                                <p className="text-2xl font-black italic text-white tracking-tighter">98.4% <span className="text-xs text-neon-cyan">SYNC</span></p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 group hover:border-white/10 transition-all duration-300 text-left"
                        >
                            <Timer className="w-8 h-8 text-white/40" />
                            <div>
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Estado de Red</p>
                                <p className="text-2xl font-black italic text-white tracking-tighter uppercase">ACTIVO</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
