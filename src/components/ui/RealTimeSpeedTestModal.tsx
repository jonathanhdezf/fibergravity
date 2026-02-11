"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gauge, Activity, ArrowDown, ArrowUp, RefreshCw, Smartphone, Monitor, ShieldCheck, Zap } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { NeonButton } from "./NeonButton";

interface RealTimeSpeedTestModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type TestPhase = "idle" | "ping" | "download" | "upload" | "complete";

export const RealTimeSpeedTestModal = ({ isOpen, onClose }: RealTimeSpeedTestModalProps) => {
    const [phase, setPhase] = useState<TestPhase>("idle");
    const [ping, setPing] = useState(0);
    const [download, setDownload] = useState(0);
    const [upload, setUpload] = useState(0);
    const [jitter, setJitter] = useState(0);
    const [progress, setProgress] = useState(0);

    // Simulation Targets
    const targetDownload = 850 + Math.random() * 140;
    const targetUpload = 400 + Math.random() * 100;
    const targetPing = 5 + Math.random() * 10;
    const targetJitter = 1 + Math.random() * 3;

    useEffect(() => {
        if (!isOpen) {
            setPhase("idle");
            setPing(0);
            setDownload(0);
            setUpload(0);
            setJitter(0);
            setProgress(0);
            return;
        }
    }, [isOpen]);

    const runTest = () => {
        setPhase("ping");
        setProgress(0);

        // Phase 1: Ping
        let p = 0;
        const pingInterval = setInterval(() => {
            p += 2;
            setProgress(p);
            setPing(parseFloat((Math.random() * targetPing).toFixed(1)));
            if (p >= 100) {
                clearInterval(pingInterval);
                setPing(targetPing);
                setJitter(targetJitter);
                startDownload();
            }
        }, 30);
    };

    const startDownload = () => {
        setPhase("download");
        setProgress(0);

        let p = 0;
        const downloadInterval = setInterval(() => {
            p += 0.8;
            setProgress(p);

            // Logarithmic-ish curve
            const currentTarget = targetDownload * (p / 100);
            const fluctuation = (Math.random() - 0.5) * 50;
            setDownload(Math.max(0, currentTarget + fluctuation));

            if (p >= 100) {
                clearInterval(downloadInterval);
                setDownload(targetDownload);
                startUpload();
            }
        }, 16);
    };

    const startUpload = () => {
        setPhase("upload");
        setProgress(0);

        let p = 0;
        const uploadInterval = setInterval(() => {
            p += 1.2;
            setProgress(p);

            const currentTarget = targetUpload * (p / 100);
            const fluctuation = (Math.random() - 0.5) * 20;
            setUpload(Math.max(0, currentTarget + fluctuation));

            if (p >= 100) {
                clearInterval(uploadInterval);
                setUpload(targetUpload);
                setPhase("complete");
            }
        }, 16);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-4xl z-10"
                    >
                        <GlassCard className="p-8 md:p-12 border-white/10 !overflow-visible relative" hoverEffect={false}>
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Cerrar modal"
                                className="absolute -top-4 -right-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-500 transition-all z-20 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                                    Terminal de Auditoría en Tiempo Real
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-2">SPEEDTEST <span className="text-neon-cyan drop-shadow-[0_0_10px_#00f3ff]">PRECISION V4</span></h2>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Protocolo de Análisis de Red FiberGravity</p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Speedometer Visualization */}
                                <div className="relative flex flex-col items-center">
                                    <div className="relative w-64 h-64 md:w-80 md:h-80">
                                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 transition-transform duration-500">
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="rgba(255,255,255,0.05)"
                                                strokeWidth="4"
                                                strokeDasharray="212 282"
                                            />
                                            {/* Progress Indicator */}
                                            <motion.circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke={phase === "upload" ? "url(#uploadGrad)" : "url(#downloadGrad)"}
                                                strokeWidth="6"
                                                strokeDasharray="212 282"
                                                initial={{ strokeDashoffset: 212 }}
                                                animate={{
                                                    strokeDashoffset: phase === "download"
                                                        ? 212 - (212 * download / 1200)
                                                        : phase === "upload"
                                                            ? 212 - (212 * upload / 1200)
                                                            : 212
                                                }}
                                                transition={{ duration: 0.1, ease: "linear" }}
                                            />
                                            <defs>
                                                <linearGradient id="downloadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#00f3ff" />
                                                    <stop offset="100%" stopColor="#ffffff" />
                                                </linearGradient>
                                                <linearGradient id="uploadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#ff00ff" />
                                                    <stop offset="100%" stopColor="#ffffff" />
                                                </linearGradient>
                                            </defs>
                                        </svg>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            {phase === "idle" ? (
                                                <button
                                                    onClick={runTest}
                                                    title="Comenzar Auditoría"
                                                    aria-label="Comenzar Auditoría"
                                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neon-cyan/10 border-2 border-neon-cyan/50 flex items-center justify-center hover:bg-neon-cyan active:scale-95 transition-all group shadow-[0_0_30px_rgba(0,243,255,0.2)]"
                                                >
                                                    <span className="text-xl md:text-2xl font-black italic tracking-tighter text-neon-cyan group-hover:text-black transition-colors">GO</span>
                                                </button>
                                            ) : (
                                                <>
                                                    <motion.div
                                                        key={phase}
                                                        initial={{ opacity: 0, scale: 0.5 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="text-6xl md:text-8xl font-black italic tracking-tighter tabular-nums"
                                                    >
                                                        {phase === "download" || phase === "complete" ? Math.floor(download) : phase === "upload" ? Math.floor(upload) : "---"}
                                                    </motion.div>
                                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-sm">Mbps</span>

                                                    {phase !== "complete" && (
                                                        <div className="mt-4 flex items-center gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-neon-cyan">Analizando...</span>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Stats & Phases */}
                                <div className="space-y-6">
                                    {/* Real metrics grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <GlassCard className={`p-6 border-white/5 transition-all ${phase === 'download' ? 'border-neon-cyan bg-neon-cyan/5 scale-105 z-10' : ''}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <ArrowDown className={`w-5 h-5 ${phase === 'download' ? 'text-neon-cyan' : 'text-slate-500'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Download</span>
                                            </div>
                                            <div className="text-3xl font-black tabular-nums">{download > 0 ? download.toFixed(1) : "---"}</div>
                                            <div className="text-[9px] font-bold text-slate-600 mt-1 uppercase">Mbps</div>
                                        </GlassCard>

                                        <GlassCard className={`p-6 border-white/5 transition-all ${phase === 'upload' ? 'border-neon-magenta bg-neon-magenta/5 scale-105 z-10' : ''}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <ArrowUp className={`w-5 h-5 ${phase === 'upload' ? 'text-neon-magenta' : 'text-slate-500'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Upload</span>
                                            </div>
                                            <div className="text-3xl font-black tabular-nums">{upload > 0 ? upload.toFixed(1) : "---"}</div>
                                            <div className="text-[9px] font-bold text-slate-600 mt-1 uppercase">Mbps</div>
                                        </GlassCard>

                                        <GlassCard className={`p-6 border-white/5 transition-all ${phase === 'ping' ? 'border-white bg-white/10 scale-105 z-10' : ''}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <RefreshCw className={`w-5 h-5 ${phase === 'ping' ? 'text-white translate-x-1' : 'text-slate-500'}`} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Latency</span>
                                            </div>
                                            <div className="text-3xl font-black tabular-nums">{ping > 0 ? ping.toFixed(1) : "---"}</div>
                                            <div className="text-[9px] font-bold text-slate-600 mt-1 uppercase">Ping ms</div>
                                        </GlassCard>

                                        <GlassCard className="p-6 border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <Zap className="w-5 h-5 text-slate-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Jitter</span>
                                            </div>
                                            <div className="text-3xl font-black tabular-nums">{jitter > 0 ? jitter.toFixed(1) : "---"}</div>
                                            <div className="text-[9px] font-bold text-slate-600 mt-1 uppercase">ms</div>
                                        </GlassCard>
                                    </div>

                                    {/* Action Footer Group */}
                                    <div className="pt-6 border-t border-white/5">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="flex items-center gap-2">
                                                <Smartphone className="w-4 h-4 text-slate-500" />
                                                <span className="text-[10px] font-bold text-slate-400">iPhone 15 Pro</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Gauge className="w-4 h-4 text-slate-500" />
                                                <span className="text-[10px] font-bold text-slate-400">FiberGravity V4 Core</span>
                                            </div>
                                            <div className="ml-auto">
                                                <ShieldCheck className="w-5 h-5 text-neon-cyan" />
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <NeonButton
                                                variant="cyan"
                                                disabled={phase !== 'idle' && phase !== 'complete'}
                                                className="flex-1 !py-5 uppercase text-xs tracking-widest font-black"
                                                onClick={() => {
                                                    if (phase === 'complete') {
                                                        setPhase('idle');
                                                        setPing(0);
                                                        setDownload(0);
                                                        setUpload(0);
                                                        setJitter(0);
                                                    } else {
                                                        runTest();
                                                    }
                                                }}
                                            >
                                                {phase === 'complete' ? "Reiniciar Prueba" : "Comenzar Auditoría"}
                                            </NeonButton>
                                            <button
                                                onClick={onClose}
                                                className="px-8 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
