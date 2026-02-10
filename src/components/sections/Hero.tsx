"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { NeonButton } from "../ui/NeonButton";
import { GlassCard } from "../ui/GlassCard";
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

// Data Stream Animation Component
const DataStream = ({ delay, top }: { delay: number, top: string }) => (
    <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "200%", opacity: [0, 1, 1, 0] }}
        transition={{
            duration: 3,
            repeat: Infinity,
            delay: delay,
            ease: "linear"
        }}
        className="absolute h-[1px] w-[600px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent z-0"
        style={{ top }}
    />
);

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const { openModal } = useModal();

    // Mouse Parallax Effect
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#020617]"
        >
            {/* 1. ADVANCED BACKGROUND: Persistence Grid & Perspective */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* 3D Perspective Grid */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(to right, #00f3ff11 1px, transparent 1px), linear-gradient(to bottom, #00f3ff11 1px, transparent 1px)`,
                        backgroundSize: '100px 100px',
                        transform: 'perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)',
                        maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
                    }}
                />

                {/* Animated Data Streams */}
                <DataStream top="15%" delay={0} />
                <DataStream top="35%" delay={1.5} />
                <DataStream top="65%" delay={0.8} />
                <DataStream top="85%" delay={2.2} />

                {/* Ambient Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-neon-cyan/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-neon-magenta/15 rounded-full blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                {/* TEXT SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8 mt-12 md:mt-16"
                    >
                        <Cpu className="w-3.5 h-3.5 animate-pulse" />
                        Next-Gen Infrastructure
                    </motion.div>

                    <h1 className="text-5xl md:text-[90px] font-black tracking-tighter leading-[0.9] mb-8 italic pr-4 md:pr-10 shrink-0">
                        Tu conexión <br />
                        <motion.span
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan pr-6 md:pr-12 pb-2 bg-[length:200%_auto]"
                        >
                            perfecta en <br /> Teziutlán
                        </motion.span>
                    </h1>

                    <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed border-l-2 border-white/5 pl-6">
                        Trascendemos el simple acceso a la red. Auditamos y comparamos la <span className="text-white font-bold">gravedad de datos</span> de cada proveedor para ofrecerte el plan definitivo.
                    </p>

                    <div className="flex flex-wrap gap-6 items-center">
                        <a href="#plans-header" className="contents">
                            <NeonButton variant="cyan" className="!px-10 !py-5 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                                Ver Planes
                            </NeonButton>
                        </a>
                        <a href="#cobertura" className="contents">
                            <button className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors border-b border-transparent hover:border-white/20">
                                Cobertura Local
                            </button>
                        </a>
                    </div>

                    {/* Stats HUD */}
                    <div className="mt-16 grid grid-cols-2 gap-8 max-w-sm">
                        <motion.div className="flex flex-col gap-1">
                            <motion.span
                                className="text-neon-cyan font-black text-4xl italic"
                                animate={{ textShadow: ["0 0 20px rgba(0,243,255,0.5)", "0 0 10px rgba(0,243,255,0.1)", "0 0 20px rgba(0,243,255,0.5)"] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <CountUp end={1000} suffix="MB" duration={2} />
                            </motion.span>
                            <span className="text-[9px] text-slate-600 tracking-[0.4em] font-black uppercase">Core Capacity</span>
                        </motion.div>

                        <motion.div className="flex flex-col gap-1">
                            <motion.span
                                className="text-neon-magenta font-black text-4xl italic"
                                animate={{ textShadow: ["0 0 20px rgba(255,0,255,0.5)", "0 0 10px rgba(255,0,255,0.1)", "0 0 20px rgba(255,0,255,0.5)"] }}
                                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                            >
                                <CountUp start={80} end={2} suffix="ms" duration={3} />
                            </motion.span>
                            <span className="text-[9px] text-slate-600 tracking-[0.4em] font-black uppercase">Low Latency</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* VISUAL SIDE: The Gravity Hub */}
                <motion.div
                    style={{ y: y1 }}
                    animate={{ rotateX: mousePos.y / 2, rotateY: mousePos.x / 2 }}
                    className="relative flex justify-center items-center perspective-[1000px]"
                >
                    <div className="relative w-80 h-80 md:w-[550px] md:h-[550px]">
                        {/* Outer Orbit Layers */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                                transition={{ duration: 15 + (i * 10), repeat: Infinity, ease: "linear" }}
                                className={`absolute inset-0 rounded-full border border-dashed pointer-events-none
                                    ${i === 0 ? 'border-neon-cyan/20 m-0' : i === 1 ? 'border-neon-magenta/10 m-10' : 'border-white/5 m-20'}
                                `}
                            />
                        ))}

                        {/* Connection Nodes */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-0"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-neon-cyan shadow-[0_0_15px_#00f3ff]" />
                            <div className="absolute bottom-1/4 right-0 w-3 h-3 rounded-full bg-neon-magenta shadow-[0_0_15px_#ff00ff]" />
                        </motion.div>

                        {/* THE HUB CORE */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="relative group"
                            >
                                {/* Core Glow */}
                                <div className="absolute inset-[-40px] bg-neon-cyan/20 blur-[60px] rounded-full animate-pulse z-0" />

                                <GlassCard className="relative w-56 h-72 md:w-64 md:h-80 rounded-[40px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 overflow-hidden !p-0">
                                    <div className="h-full flex flex-col items-center justify-between py-10">
                                        {/* Status Header */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="flex gap-1 text-[8px] font-black text-neon-cyan uppercase tracking-[0.4em]">
                                                <span className="animate-pulse">●</span> Active Hub
                                            </div>
                                            <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
                                        </div>

                                        {/* Focal Point Icon */}
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-900 to-black border border-white/10 flex items-center justify-center shadow-inner group-hover:border-neon-cyan transition-colors"
                                        >
                                            <Radio className="text-neon-cyan w-12 h-12" />
                                        </motion.div>

                                        {/* Data Oscilloscope Layout */}
                                        <div className="w-full px-8 space-y-4">
                                            <div className="flex justify-between items-center text-[8px] text-slate-500 font-bold tracking-widest uppercase">
                                                <span>Fiber Link</span>
                                                <span className="text-neon-magenta">Optimized</span>
                                            </div>
                                            <div className="h-12 w-full flex items-center gap-[4px]">
                                                {[...Array(12)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{
                                                            height: [10, 20 + Math.random() * 20, 10],
                                                            opacity: [0.3, 1, 0.3]
                                                        }}
                                                        transition={{
                                                            duration: 1 + Math.random(),
                                                            repeat: Infinity,
                                                            delay: i * 0.1
                                                        }}
                                                        className="flex-1 rounded-full bg-neon-cyan/40"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-20 w-full animate-scanline pointer-events-none" />
                                </GlassCard>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Energy Divider */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent z-20" />
        </section>
    );
};
