"use client";

import { useState, useEffect, useRef } from "react";
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
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="relative w-full max-w-5xl z-10"
                    >
                        <GlassCard className="p-4 md:p-8 border-white/10 !overflow-hidden relative" hoverEffect={false}>
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Cerrar modal"
                                className="absolute top-4 right-4 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-500 transition-all z-20 group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                                    Terminal ISP Grade Precision
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter mb-1 uppercase">Auditoría <span className="text-neon-cyan drop-shadow-[0_0_10px_#00f3ff]">Speedtest®</span></h2>
                                <p className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-[0.2em]">Powered by Ookla Engine — Análisis Certificado</p>
                            </div>

                            {/* Iframe Container con Recorte de Publicidad */}
                            <div className="relative w-full h-[500px] md:h-[600px] bg-black/40 rounded-2xl overflow-hidden border border-white/5">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <iframe
                                        src="https://www.speedtest.net/es"
                                        className="absolute w-full h-[150%] sm:h-[180%] border-none"
                                        style={{
                                            top: '-180px', // Oculta el header de speedtest.net
                                        }}
                                        title="Speedtest"
                                    />
                                </div>

                                {/* Overlay para bloquear clics en zonas de publicidad externas al widget central si fuera necesario */}
                                <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 rounded-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"></div>
                            </div>

                            <div className="mt-6 flex items-center justify-between text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-4 h-4 text-neon-cyan" /> Auditoría de Red Segura
                                </div>
                                <p className="hidden sm:block italic italic">Transmisión de datos via FiberGravity Core</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
