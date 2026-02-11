"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, ShieldCheck, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GlassCard } from "./GlassCard";

export const WhatsAppWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBadge, setShowBadge] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const pathname = usePathname();

    const isAdminPage = pathname?.startsWith('/admin');

    const phoneNumber = "2311024672";
    const message = encodeURIComponent("Este es un mensaje enviado desde el boton *mensaje directo* de tu sitio web");
    const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${message}`;

    useEffect(() => {
        // Show notification badge after a short delay
        const timer = setTimeout(() => {
            setShowBadge(true);
            setShowTooltip(true);
        }, 3000);

        // Hide tooltip after some time
        const tooltipTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(tooltipTimer);
        };
    }, []);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        setShowBadge(false);
        setShowTooltip(false);
    };

    if (isAdminPage) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[10000] flex flex-col items-end gap-4">
            <AnimatePresence>
                {/* Chat Window */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-full max-w-[320px] md:max-w-[360px]"
                    >
                        <GlassCard className="!p-0 border-white/10 shadow-2xl overflow-hidden" hoverEffect={false}>
                            {/* Header */}
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-6 border-b border-white/5 relative">
                                <button
                                    onClick={toggleChat}
                                    title="Cerrar chat"
                                    className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center border-2 border-white/10 shadow-lg shadow-green-500/20">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#020617] animate-pulse" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg leading-tight">Asesor FiberGravity</h4>
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <ShieldCheck className="w-3 h-3 text-green-400" />
                                            <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">En Línea • Ventas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 bg-slate-950/50 backdrop-blur-md">
                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="bg-white/5 rounded-2xl p-4 border border-white/5 max-w-[85%]"
                                    >
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            ¡Hola! 👋 Bienvenido a la conexión del futuro.
                                        </p>
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.8 }}
                                        className="bg-white/5 rounded-2xl p-4 border border-white/5 max-w-[85%]"
                                    >
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            ¿En qué puedo ayudarte hoy? Estoy listo para validar tu cobertura.
                                        </p>
                                    </motion.div>

                                    {/* Typing Indicator */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                                        className="flex gap-1 ml-2"
                                    >
                                        <span className="w-1 h-1 bg-green-500/50 rounded-full animate-bounce" />
                                        <span className="w-1 h-1 bg-green-500/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1 h-1 bg-green-500/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2 }}
                                    className="mt-8"
                                >
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full h-14 bg-green-500 hover:bg-green-400 text-white rounded-2xl flex items-center justify-center gap-3 font-bold text-sm transition-all shadow-lg shadow-green-500/30 group active:scale-95"
                                    >
                                        Iniciar Chat Directo
                                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>
                                </motion.div>
                                <p className="text-center text-[9px] text-slate-500 mt-4 uppercase tracking-widest font-black opacity-50">
                                    Responde usualmente en minutos
                                </p>
                            </div>
                        </GlassCard>
                    </motion.div>
                )}

                {/* Initial Tooltip */}
                {!isOpen && showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="bg-neon-cyan/90 backdrop-blur-md text-black px-4 py-2 rounded-2xl rounded-br-none text-[11px] font-black uppercase tracking-wider shadow-lg shadow-neon-cyan/20 pointer-events-none mb-2"
                    >
                        ¡Habla con un asesor!
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                title={isOpen ? "Cerrar menú de contacto" : "Contactar por WhatsApp"}
                className={`relative w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen
                    ? "bg-slate-900 border border-white/10 text-white shadow-white/5"
                    : "bg-green-500 text-white shadow-green-500/20 hover:shadow-green-500/40"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                        >
                            <MessageCircle className="w-8 h-8 fill-current" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {!isOpen && showBadge && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-[#020617] flex items-center justify-center font-bold text-[10px]"
                        >
                            1
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Pulse Effect */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-3xl bg-green-500 animate-ping opacity-20" />
                )}
            </motion.button>
        </div>
    );
};
