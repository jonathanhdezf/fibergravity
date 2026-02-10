"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Wrench, LifeBuoy } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { GlassCard } from "./GlassCard";

interface SupportTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportTicketModal = ({ isOpen, onClose }: SupportTicketModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-start justify-center p-4 md:p-6 overflow-y-auto pt-24 md:pt-32">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-2xl z-10"
                    >
                        <GlassCard className="!p-0 border-white/10 shadow-2xl overflow-hidden" hoverEffect={false}>
                            <div className="p-8 md:p-12 relative">
                                <button
                                    onClick={onClose}
                                    aria-label="Cerrar"
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-2xl bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/40">
                                        <Wrench className="w-6 h-6 text-neon-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold italic">Abrir Ticket de Soporte</h3>
                                        <p className="text-slate-500 text-sm">Nuestro equipo técnico te responderá en minutos.</p>
                                    </div>
                                </div>

                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                                <User className="w-3 h-3" /> Nombre Completo
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Ej. Juan Pérez"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                                <Phone className="w-3 h-3" /> Teléfono de Contacto
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Ej. 2311234567"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                            <AlertCircle className="w-3 h-3" /> Tipo de Incidencia
                                        </label>
                                        <select
                                            id="ticket-type"
                                            aria-label="Tipo de Incidencia"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white appearance-none cursor-pointer"
                                        >
                                            <option className="bg-slate-900" value="internet">Problemas con el Internet</option>
                                            <option className="bg-slate-900" value="tv">Problemas con la TV</option>
                                            <option className="bg-slate-900" value="pago">Dudas con mi Pago</option>
                                            <option className="bg-slate-900" value="cambio">Cambio de domicilio</option>
                                            <option className="bg-slate-900" value="otro">Otro motivo</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                            <MessageSquare className="w-3 h-3" /> Descripción del Problema
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Cuéntanos qué sucede para ayudarte mejor..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white resize-none"
                                        />
                                    </div>

                                    <div className="pt-4 space-y-4">
                                        <NeonButton className="w-full py-4 flex items-center justify-center gap-2 text-base">
                                            Enviar Reporte Técnico
                                            <Send className="w-4 h-4" />
                                        </NeonButton>

                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors text-center"
                                        >
                                            [ Regresar / Cancelar ]
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-neon-cyan/5 border border-neon-cyan/10">
                                        <LifeBuoy className="w-5 h-5 text-neon-cyan shrink-0" />
                                        <p className="text-[10px] text-slate-400 leading-tight">
                                            Al enviar este ticket, un sistema de <span className="text-neon-cyan font-bold">diagnóstico remoto</span> analizará tu conexión automáticamente para acelerar la solución.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
