"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Wrench, LifeBuoy, ChevronDown } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { GlassCard } from "./GlassCard";
import { useState, useEffect } from "react";

interface SupportTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportTicketModal = ({ isOpen, onClose }: SupportTicketModalProps) => {
    const [ticketType, setTicketType] = useState("internet");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phone, setPhone] = useState("");

    const options = [
        { value: "internet", label: "Problemas con el Internet" },
        { value: "tv", label: "Problemas con la TV" },
        { value: "pago", label: "Dudas con mi Pago" },
        { value: "cambio", label: "Cambio de domicilio" },
        { value: "otro", label: "Otro motivo" }
    ];

    useEffect(() => {
        if (!isOpen) {
            setPhone("");
            setIsDropdownOpen(false);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-start justify-center p-4 md:p-6 overflow-y-auto pt-12 md:pt-20">
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
                                    title="Cerrar"
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
                                                required
                                                value={phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    setPhone(val);
                                                }}
                                                placeholder="10 DÍGITOS"
                                                className={`w-full bg-white/5 border ${phone.length > 0 && phone.length < 10 ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white placeholder:text-slate-700 font-bold`}
                                            />
                                            {phone.length > 0 && phone.length < 10 && (
                                                <p className="text-[9px] text-red-500 font-bold ml-1 mt-1">FALTAN {10 - phone.length} DÍGITOS</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                            <AlertCircle className="w-3 h-3" /> Tipo de Incidencia
                                        </label>
                                        <div className="relative">
                                            <button
                                                type="button"
                                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex items-center justify-between text-white hover:bg-white/10 transition-all outline-none focus:border-neon-cyan/50"
                                            >
                                                <span>{options.find(opt => opt.value === ticketType)?.label}</span>
                                                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-neon-cyan' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {isDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 5, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        className="absolute top-full left-0 w-full z-50 bg-[#0f172a] border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
                                                    >
                                                        {options.map((option) => (
                                                            <button
                                                                key={option.value}
                                                                type="button"
                                                                onClick={() => {
                                                                    setTicketType(option.value);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between group ${ticketType === option.value ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                                                            >
                                                                {option.label}
                                                                {ticketType === option.value && <CheckCircle2 className="w-3 h-3 text-neon-cyan" />}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
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
