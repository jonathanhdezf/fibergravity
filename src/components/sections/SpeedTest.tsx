"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { Gauge, ArrowUpRight, RefreshCw } from "lucide-react";
import { useModal } from "../ModalProvider";

export const SpeedTest = () => {
    const { openSpeedTestModal } = useModal();
    const [speed, setSpeed] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let current = 0;
            const target = 985.4;
            const duration = 2000;
            const steps = duration / 16;
            const increment = target / steps;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    setSpeed(target);
                    clearInterval(timer);

                    // Start live fluctuation after reaching target
                    const liveTimer = setInterval(() => {
                        const fluctuation = (Math.random() - 0.5) * 15; // Jitter between -7.5 and +7.5
                        setSpeed(prev => {
                            const newSpeed = prev + fluctuation;
                            // Keep it within a realistic range near the peak
                            return Math.max(970, Math.min(999, newSpeed));
                        });
                    }, 150);

                    return () => clearInterval(liveTimer);
                } else {
                    setSpeed(current);
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView]);

    return (
        <section id="speed-test" className="py-24 container mx-auto px-6" ref={ref}>
            <GlassCard className="max-w-4xl mx-auto py-12 md:py-20 relative overflow-hidden" hoverEffect={false}>
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-neon-cyan/20 blur-[100px]" />

                <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center md:text-left">
                        <h2 className="text-4xl font-black mb-6 flex items-center justify-center md:justify-start gap-4 italic">
                            <Gauge className="text-neon-cyan w-10 h-10" />
                            Auditoría de Conexión
                        </h2>
                        <p className="text-slate-400 text-lg mb-8">
                            Mide el rendimiento real de tu proovedor actual. Como broker neutral, te ayudamos a auditar si estás recibiendo lo que pagas para recomendarte una alternativa superior si es necesario.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={() => openSpeedTestModal()}
                                className="px-8 py-4 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-black italic uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.1)] active:scale-95 flex items-center justify-center gap-3"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Iniciar Auditoría Live
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <ArrowUpRight className="text-neon-cyan" />
                                <span className="text-sm font-medium">Baja Latencia (Ping: 2ms)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <ArrowUpRight className="text-neon-cyan" />
                                <span className="text-sm font-medium">Upload Simétrico</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80">
                            {/* Speedometer Track */}
                            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="rgba(255,255,255,0.05)"
                                    strokeWidth="8"
                                    strokeDasharray="212 282"
                                />
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#speedGradientLive)"
                                    strokeWidth="8"
                                    strokeDasharray="212 282"
                                    initial={{ strokeDashoffset: 212 }}
                                    animate={{ strokeDashoffset: 212 - (212 * speed / 1000) }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                />
                                <defs>
                                    <linearGradient id="speedGradientLive" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00f3ff" />
                                        <stop offset="100%" stopColor="#ff00ff" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.div
                                    className="flex items-center gap-2 mb-1"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
                                    <span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">Live Test</span>
                                </motion.div>
                                <motion.span
                                    key={Math.floor(speed)}
                                    initial={{ scale: 1 }}
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 0.1 }}
                                    className="text-6xl md:text-7xl font-black neon-text-cyan tabular-nums"
                                >
                                    {Math.floor(speed)}
                                </motion.span>
                                <span className="text-slate-500 font-bold tracking-widest uppercase">Mbps</span>
                            </div>
                        </div>

                        <div className="mt-8 px-6 py-2 glass rounded-full text-xs font-bold text-neon-cyan tracking-widest uppercase flex items-center gap-3">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                            </span>
                            Conexión Activa de Ultra-Baja Latencia
                        </div>
                    </div>
                </div>
            </GlassCard>
        </section>
    );
};
