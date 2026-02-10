"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { NeonButton } from "../ui/NeonButton";
import { Cpu, Zap, Radio } from "lucide-react";

import { useModal } from "../ModalProvider";

const CountUp = ({ start = 0, end, duration = 2, suffix = "" }: { start?: number, end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const currentCount = start + (end - start) * progress;
            setCount(Math.floor(currentCount));
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [start, end, duration]);

    return <span>{count}{suffix}</span>;
};

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const { openModal } = useModal();

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-magenta/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-6 italic pr-4 md:pr-10 shrink-0">
                        Tu conexión <br />
                        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan pr-6 md:pr-12 pb-2">
                            perfecta en <br /> Teziutlán
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        El comparador de Internet y TV que te conecta con el plan ideal para tu estilo de vida o negocio. Analizamos, comparamos y tú eliges la máxima potencia.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#plans-header" className="contents">
                            <NeonButton variant="cyan">Ver Planes</NeonButton>
                        </a>
                        <a href="#cobertura" className="contents">
                            <NeonButton variant="magenta" className="bg-transparent border-white/20 text-white">Cobertura</NeonButton>
                        </a>
                    </div>

                    <div className="mt-12 flex gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col gap-2 relative group"
                        >
                            <motion.span
                                animate={{
                                    color: ["#00f3ff", "#ffffff", "#00f3ff"],
                                    scale: [1, 1.05, 1],
                                    textShadow: ["0 0 20px rgba(0,243,255,0.5)", "0 0 10px rgba(0,243,255,0.2)", "0 0 20px rgba(0,243,255,0.5)"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="text-neon-cyan font-black text-3xl italic"
                            >
                                <CountUp end={1000} suffix="MB" duration={2.5} />
                            </motion.span>
                            <span className="text-[10px] text-slate-500 tracking-[0.2em] font-black uppercase">Velocidad Máxima</span>
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>

                        <div className="w-px h-12 bg-white/10" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex flex-col gap-2 relative group"
                        >
                            <motion.span
                                animate={{
                                    color: ["#ff00ff", "#ffffff", "#ff00ff"],
                                    scale: [1, 1.05, 1],
                                    textShadow: ["0 0 20px rgba(255,0,255,0.5)", "0 0 10px rgba(255,0,255,0.2)", "0 0 20px rgba(255,0,255,0.5)"]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="text-neon-magenta font-black text-3xl italic"
                            >
                                <CountUp start={99} end={0} suffix="ms" duration={3} />
                            </motion.span>
                            <span className="text-[10px] text-slate-500 tracking-[0.2em] font-black uppercase">Latencia Local</span>
                            <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-neon-magenta to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: y1 }}
                    className="relative flex justify-center items-center"
                >
                    {/* Floating Orb / Router Representation */}
                    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute inset-0 rounded-full border border-dashed border-neon-cyan/30"
                        />
                        <motion.div
                            animate={{
                                rotate: -360,
                                scale: [1, 0.95, 1],
                            }}
                            transition={{
                                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                                scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute inset-4 rounded-full border border-dashed border-neon-magenta/20"
                        />

                        <motion.div
                            className="absolute inset-0 flex items-center justify-center animate-float"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-neon-cyan blur-[80px] opacity-20" />
                                <div className="glass w-48 h-64 md:w-64 md:h-80 rounded-3xl flex flex-col items-center justify-center gap-6 border-neon-cyan/40 shadow-2xl">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-cyan to-blue-600 flex items-center justify-center">
                                        <Radio className="text-white w-8 h-8" />
                                    </div>
                                    <div className="space-y-2 text-center px-4">
                                        <div className="h-1 w-12 bg-neon-cyan mx-auto rounded-full" />
                                        <div className="h-1 w-8 bg-neon-magenta mx-auto rounded-full" />
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ delay: i * 0.2, duration: 2, repeat: Infinity }}
                                                className="w-2 h-2 rounded-full bg-neon-cyan"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Lines of energy */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-20" />
        </section>
    );
};
