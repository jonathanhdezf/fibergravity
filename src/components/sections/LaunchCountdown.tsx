"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Rocket, Zap, Timer } from "lucide-react";

export const LaunchCountdown = () => {
    const [isMounted, setIsMounted] = useState(false);

    // Definimos la fecha objetivo de forma estable
    const targetDate = useMemo(() => {
        const date = new Date("2026-02-12T00:00:00");
        return date;
    }, []);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();
            let timeLeftObj = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeftObj = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeftObj;
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    // Generar partículas estables para evitar errores de hidratación
    const particles = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            top: `${(i * 7) % 100}%`,
            left: `${(i * 13) % 100}%`,
            scale: 0.2 + ((i * 3) % 10) / 10,
            duration: 3 + (i % 3),
            delay: (i % 2)
        }));
    }, []);

    const TimeUnit = ({ value, label, color }: { value: number; label: string; color: string }) => (
        <div className="flex flex-col items-center">
            <div className="relative group">
                {/* Glow effect background */}
                <div className={`absolute -inset-1 rounded-2xl bg-${color} blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-pulse`} />

                {/* Card */}
                <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl w-20 h-24 md:w-28 md:h-32 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={value}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`text-4xl md:text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                        >
                            {isMounted ? value.toString().padStart(2, '0') : "00"}
                        </motion.span>
                    </AnimatePresence>

                    {/* Decorative glass line */}
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/5" />
                </div>
            </div>
            <span className="mt-4 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500">{label}</span>
        </div>
    );

    if (!isVisible) return null;

    return (
        <section className="relative py-24 overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-magenta/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
                    >
                        <Rocket className="w-4 h-4 text-neon-cyan animate-bounce" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Countdown para el Gran Despegue</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black italic mb-6 tracking-tighter"
                    >
                        PREPÁRATE PARA <span className="text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.3)] uppercase">EL FUTURO</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-sm md:text-lg max-w-2xl mb-16 uppercase font-bold tracking-widest"
                    >
                        FiberGravity v3.0 se lanza globalmente. Estamos optimizando los últimos nodos para ofrecerte la experiencia definitiva.
                    </motion.p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-20">
                        <TimeUnit value={timeLeft.days} label="Días" color="neon-cyan" />
                        <TimeUnit value={timeLeft.hours} label="Horas" color="white" />
                        <TimeUnit value={timeLeft.minutes} label="Minutos" color="neon-magenta" />
                        <TimeUnit value={timeLeft.seconds} label="Segundos" color="white" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col md:flex-row gap-6"
                    >
                        <div className="flex items-center gap-4 px-8 py-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl group hover:border-neon-cyan/30 transition-all cursor-default">
                            <Zap className="w-6 h-6 text-neon-cyan group-hover:scale-125 transition-transform" />
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Velocidad Actual de Sincronización</p>
                                <p className="text-xl font-black italic text-white">98.4% COMPLETE</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-8 py-6 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl group hover:border-neon-magenta/30 transition-all cursor-default">
                            <Timer className="w-6 h-6 text-neon-magenta group-hover:scale-125 transition-transform" />
                            <div className="text-left">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tiempo Estimado de Finalización</p>
                                <p className="text-xl font-black italic text-white">SYSTEM ONLINE SOON</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative particles */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                        style={{ top: p.top, left: p.left }}
                        initial={{ scale: p.scale }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay
                        }}
                    />
                ))}
            </div>
        </section>
    );
};
