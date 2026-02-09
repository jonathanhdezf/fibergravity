"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NeonButton } from "../ui/NeonButton";
import { Cpu, Zap, Radio } from "lucide-react";

import { useModal } from "../ModalProvider";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const { openModal } = useModal();

    return (
        <section
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
                    <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight mb-6">
                        Internet que <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan">
                            desafía la <br /> gravedad
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
                        Experimenta la fibra óptica de ultra alta velocidad. Sin fricción, sin retrasos, solo pura potencia digital.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#planes" className="contents">
                            <NeonButton variant="cyan">Ver Planes</NeonButton>
                        </a>
                        <a href="#cobertura" className="contents">
                            <NeonButton variant="magenta" className="bg-transparent border-white/20 text-white">Cobertura</NeonButton>
                        </a>
                    </div>

                    <div className="mt-12 flex gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-neon-cyan font-bold text-2xl">1000MB</span>
                            <span className="text-xs text-slate-500 tracking-widest uppercase">Velocidad Máxima</span>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div className="flex flex-col gap-2">
                            <span className="text-neon-magenta font-bold text-2xl">0ms</span>
                            <span className="text-xs text-slate-500 tracking-widest uppercase">Latencia Local</span>
                        </div>
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
