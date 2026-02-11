"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, MessageSquare, Send, CheckCircle2, AlertCircle, Wrench, LifeBuoy, ChevronDown } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { GlassCard } from "./GlassCard";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface SupportTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SupportTicketModal = ({ isOpen, onClose }: SupportTicketModalProps) => {
    const [ticketType, setTicketType] = useState("internet");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [fullName, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
            setFullName("");
            setDescription("");
            setTicketType("internet");
            setIsDropdownOpen(false);
            setIsSuccess(false);
            setIsSubmitting(false);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10 || !fullName || !description) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase.from('support_tickets').insert({
                full_name: fullName,
                phone: phone,
                type: ticketType,
                description: description,
                status: 'pending'
            });

            if (error) throw error;
            setIsSuccess(true);
        } catch (error: any) {
            console.error('Error submitting ticket:', error);
            if (error?.message) console.error('Error message:', error.message);
            if (error?.details) console.error('Error details:', error.details);
            alert('Error al enviar el ticket. Por favor intenta de nuevo. (' + (error?.message || 'Desconocido') + ')');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
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
                            <div className="p-8 md:p-12 relative min-h-[500px] flex flex-col justify-center">
                                <button
                                    onClick={onClose}
                                    title="Cerrar"
                                    aria-label="Cerrar"
                                    className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all transition-colors z-20"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <AnimatePresence mode="wait">
                                    {!isSuccess ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <div className="flex items-center gap-4 mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-neon-cyan/20 flex items-center justify-center border border-neon-cyan/40">
                                                    <Wrench className="w-6 h-6 text-neon-cyan" />
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold italic">Abrir Ticket de Soporte</h3>
                                                    <p className="text-slate-500 text-sm">Nuestro equipo técnico te responderá en minutos.</p>
                                                </div>
                                            </div>

                                            <form className="space-y-6" onSubmit={handleSubmit}>
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 px-1">
                                                            <User className="w-3 h-3" /> Nombre Completo
                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={fullName}
                                                            onChange={(e) => setFullName(e.target.value)}
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
                                                        required
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        placeholder="Cuéntanos qué sucede para ayudarte mejor..."
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white resize-none"
                                                    />
                                                </div>

                                                <div className="pt-4 space-y-4">
                                                    <NeonButton
                                                        type="submit"
                                                        disabled={isSubmitting || phone.length < 10}
                                                        className="w-full py-4 flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                                Procesando...
                                                            </div>
                                                        ) : (
                                                            <>
                                                                Enviar Reporte Técnico
                                                                <Send className="w-4 h-4" />
                                                            </>
                                                        )}
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
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-10"
                                        >
                                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/40">
                                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                            </div>
                                            <h3 className="text-3xl font-black italic mb-4">¡Ticket Generado con Éxito!</h3>
                                            <p className="text-slate-400 mb-8 max-w-sm mx-auto">
                                                Hemos recibido tu reporte. Un técnico especialista se pondrá en contacto contigo al número <span className="text-white font-bold">{phone}</span> en los próximos minutos.
                                            </p>
                                            <NeonButton onClick={onClose} variant="emerald" className="px-12">
                                                Entendido
                                            </NeonButton>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
