"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Volume2, Shield, Activity, MonitorPause as Monitor } from "lucide-react";

interface TVPlayerModalProps {
    isOpen: boolean;
    onClose: () => void;
    channelName?: string;
    channelUrl?: string;
}

export const TVPlayerModal = ({ isOpen, onClose, channelName = "Canal en Vivo", channelUrl = "https://pluto.tv/latam" }: TVPlayerModalProps) => {
    const [isTheater, setIsTheater] = useState(false);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/98 backdrop-blur-3xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            width: isTheater ? "100%" : "90%",
                            maxWidth: isTheater ? "100%" : "1200px"
                        }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className={`relative z-10 bg-black overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border-white/5 transition-all duration-500
                            ${isTheater ? "h-screen rounded-none border-0" : "aspect-video rounded-3xl border md:p-0"}
                        `}
                    >
                        {/* Player Header - Auto hide in theater */}
                        <div className="absolute top-0 left-0 right-0 p-8 bg-gradient-to-b from-black/90 to-transparent z-30 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-full bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/40 shadow-neon-cyan/20">
                                    <Activity className="w-6 h-6 text-neon-cyan animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-xl md:text-2xl font-black italic tracking-widest text-white uppercase">{channelName}</h3>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[9px] text-red-500 uppercase font-black tracking-tighter">Live</span>
                                        </div>
                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">FiberGravity Ultra-Stream</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsTheater(!isTheater)}
                                    aria-label="Modo Teatro"
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-bold text-[10px] uppercase tracking-widest
                                        ${isTheater
                                            ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan"
                                            : "bg-white/5 border-white/10 hover:border-white/30 text-white"}
                                    `}
                                >
                                    <Monitor className="w-4 h-4" />
                                    {isTheater ? "Salir de Teatro" : "Modo Teatro"}
                                </button>

                                <div className="h-8 w-px bg-white/10 mx-2" />

                                <button aria-label="Mute" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110">
                                    <Volume2 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-white text-[10px] font-bold uppercase tracking-widest transition-all"
                                >
                                    Regresar
                                </button>

                                <button
                                    onClick={onClose}
                                    aria-label="Cerrar Reproductor"
                                    className="p-3 rounded-full bg-red-500/10 hover:bg-red-500/40 text-red-500 transition-all group/close"
                                >
                                    <X className="w-6 h-6 group-hover/close:rotate-90 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Iframe Pluto TV */}
                        <div className={`w-full h-full transition-all duration-500 ${isTheater ? "p-0" : ""}`}>
                            <iframe
                                title={`Reproductor ${channelName}`}
                                src={channelUrl}
                                className="w-full h-full border-0 select-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Theater Mode Side Decorations (only if not theater to hint at it) */}
                        {!isTheater && (
                            <div className="absolute inset-0 pointer-events-none border border-neon-cyan/5 rounded-[inherit]" />
                        )}

                        {/* Player Footer Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 backdrop-blur-xl">
                                        <Shield className="w-3.5 h-3.5 text-neon-cyan" />
                                        <span className="text-[10px] font-black text-neon-cyan uppercase tracking-[0.2em]">Señal Protegida</span>
                                    </div>
                                    <span className="text-[11px] text-slate-500 font-medium">Resolución Dinámica: 3840 x 2160</span>
                                </div>
                                <div className="flex items-center gap-8 text-[10px] text-slate-600 font-bold uppercase tracking-[0.3em]">
                                    <span>Latencia: 0.002s</span>
                                    <span className="text-neon-cyan">FiberGravity Core V2</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
