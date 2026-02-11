"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Zap, Timer, Cpu } from "lucide-react";

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

    const particles = useMemo(() => {
        return [...Array(25)].map((_, i) => ({
            id: i,
            top: `${(i * 17) % 100}%`,
            left: `${(i * 23) % 100}%`,
            scale: 0.1 + ((i * 3) % 10) / 20,
            duration: 4 + (i % 5),
            delay: (i % 4) * 0.5
        }));
    }, []);

    const TimeUnit = ({ value, label, color, delay }: { value: number; label: string; color: string; delay: number }) => {
        const colorMap: Record<string, string> = {
            'neon-cyan': 'rgba(0, 243, 255, 0.5)',
            'neon-magenta': 'rgba(255, 0, 255, 0.5)',
            'white': 'rgba(255, 255, 255, 0.3)'
        };

        return (
            <div className="flex flex-col items-center">
                <div className="relative group perspective-1000">
                    {/* Advanced Pulsating Glow - Staggered */}
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 3 + delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: delay
                        }}
                        className={`absolute -inset-2 rounded-[2rem] bg-${color} blur-2xl pointer-events-none`}
                    />

                    {/* Card Container */}
                    <div className="relative bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] w-24 h-28 md:w-32 md:h-36 flex items-center justify-center overflow-hidden group-hover:border-neon-cyan/40 transition-colors duration-500">
                        {/* Internal Holographic Sweep */}
                        <motion.div
                            animate={{ x: ["-200%", "200%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: delay * 1.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                        />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={value}
                                initial={{ y: 30, opacity: 0, rotateX: -45 }}
                                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                                exit={{ y: -30, opacity: 0, rotateX: 45 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-4xl md:text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                    {isMounted ? value.toString().padStart(2, '0') : "--"}
                                </span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Grid Pattern Overlay */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />

                        {/* Tech Borders */}
                        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
                        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />
                    </div>
                </div>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + delay }}
                    className="mt-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-slate-500"
                >
                    {label}
                </motion.span>
            </div>
        );
    };

    return (
        <section className="relative py-28 md:py-36 overflow-hidden bg-black">
            {/* Ambient Background Audio-visual simulation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-neon-cyan/10 rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1.2, 1, 1.2]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-neon-magenta/10 rounded-full blur-[150px]"
                />

                {/* Horizontal Scanner Line */}
                <motion.div
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent z-0"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-xl"
                    >
                        <Cpu className="w-4 h-4 text-neon-cyan animate-pulse" />
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">Quantum Sincronización v3.0</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-8xl font-black italic mb-8 tracking-tighter leading-[0.9]"
                    >
                        EL FUTURO<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta drop-shadow-[0_0_30px_rgba(0,243,255,0.2)] uppercase">EMPIEZA AQUÍ</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-slate-400 text-[10px] md:text-lg max-w-xl mb-20 uppercase font-bold tracking-[0.2em] leading-relaxed opacity-70"
                    >
                        Estamos orquestando el despliegue de infraestructura más grande de la década. Prepárate para la velocidad luz.
                    </motion.p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-14 mb-24">
                        <TimeUnit value={timeLeft.days} label="Días Estelares" color="neon-cyan" delay={0.1} />
                        <TimeUnit value={timeLeft.hours} label="Horas Nucleares" color="white" delay={0.2} />
                        <TimeUnit value={timeLeft.minutes} label="Minutos Críticos" color="neon-magenta" delay={0.3} />
                        <TimeUnit value={timeLeft.seconds} label="Segundos de Salto" color="white" delay={0.4} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 backdrop-blur-2xl group hover:border-neon-cyan/30 transition-all duration-500"
                        >
                            <Zap className="w-8 h-8 text-neon-cyan group-hover:rotate-12 transition-transform duration-500" />
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Carga de Datos</p>
                                <p className="text-2xl font-black italic text-white tracking-tighter">98.4% <span className="text-xs text-neon-cyan">SYNC</span></p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/5 backdrop-blur-2xl group hover:border-neon-magenta/30 transition-all duration-500"
                        >
                            <Timer className="w-8 h-8 text-neon-magenta group-hover:-rotate-12 transition-transform duration-500" />
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Estado de Red</p>
                                <p className="text-2xl font-black italic text-white tracking-tighter">HYPER<span className="text-xs text-neon-magenta">ACTIVE</span></p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Premium Star/Particle Field */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-px h-px bg-white rounded-full bg-gradient-to-t from-transparent to-white"
                        style={{ top: p.top, left: p.left }}
                        initial={{ scale: p.scale, opacity: 0 }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 0.8, 0],
                            height: [1, 20, 1]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </section>
    );
};
