"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { GlassCard } from "./GlassCard";

interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName?: string;
}

export const ContractModal = ({ isOpen, onClose, planName = "Plan Fibra X" }: ContractModalProps) => {
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
                        className="relative w-full max-w-4xl z-10"
                    >
                        <GlassCard className="!p-0 border-white/10 shadow-2xl overflow-hidden" hoverEffect={false}>
                            <div className="grid lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto custom-scrollbar">
                                {/* Left Sidebar: Info & Steps */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-black p-8 border-r border-white/5 hidden lg:block">
                                    <div className="mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-widest mb-4">
                                            <ShieldCheck className="w-3 h-3" />
                                            Contrato Seguro
                                        </div>
                                        <h2 className="text-3xl font-black italic mb-2">Fiber<span className="text-neon-cyan">Gravity</span></h2>
                                        <p className="text-slate-400 text-sm">Estás a un paso de la conexión del futuro.</p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full border border-neon-cyan text-neon-cyan flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                            <div>
                                                <p className="text-white font-bold text-sm">Datos de Usuario</p>
                                                <p className="text-slate-500 text-xs">Información personal para el titular.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full border border-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                            <div>
                                                <p className="text-slate-300 font-bold text-sm">Ubicación</p>
                                                <p className="text-slate-500 text-xs">Dirección exacta para instalación.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full border border-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                            <div>
                                                <p className="text-slate-300 font-bold text-sm">Plan Seleccionado</p>
                                                <p className="text-neon-cyan font-bold text-xs uppercase tracking-tighter">{planName}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-20 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle2 className="text-neon-cyan w-5 h-5" />
                                            <span className="text-sm font-bold">Garantía VIP</span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            Instalación en menos de 24h garantizada por nuestros técnicos certificados.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Content: Form */}
                                <div className="lg:col-span-3 p-8 md:p-12 relative">
                                    <button
                                        onClick={onClose}
                                        aria-label="Cerrar"
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        Levantar Contrato de Servicio
                                    </h3>

                                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                        {/* Personal Info Group */}
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <User className="w-3 h-3" /> Datos del Titular
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Nombres"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Apellidos"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="email"
                                                        placeholder="Email"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="tel"
                                                        placeholder="Teléfono"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Location Info Group */}
                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <MapPin className="w-3 h-3" /> Ubicación del Servicio
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="Calle y Número Ext."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                            />
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    placeholder="Colonia / Fraccionamiento"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Código Postal"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                            </div>
                                            <textarea
                                                rows={2}
                                                placeholder="Referencias Adicionales (Ej. Portón negro, frente a parque)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white resize-none"
                                            />
                                        </div>

                                        {/* Payment Info Group (Simplified) */}
                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <CreditCard className="w-3 h-3" /> Método de Pago Preferido
                                            </p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {["Tarjeta", "Efectivo", "Transferencia"].map(method => (
                                                    <button
                                                        key={method}
                                                        className="py-2.5 rounded-xl border border-white/5 bg-white/5 text-[10px] font-bold hover:border-neon-cyan/40 hover:text-neon-cyan transition-all uppercase tracking-tighter"
                                                    >
                                                        {method}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 space-y-4">
                                            <NeonButton className="w-full py-4 flex items-center justify-center gap-2 text-base">
                                                Finalizar Contratación
                                                <Send className="w-4 h-4" />
                                            </NeonButton>

                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="w-full py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
                                            >
                                                [ Regresar / Cancelar ]
                                            </button>

                                            <p className="text-center text-[9px] text-slate-500 mt-2 uppercase tracking-widest leading-relaxed">
                                                Al hacer clic en "Finalizar", un asesor se pondrá en contacto contigo en los <span className="text-neon-cyan">próximos 15 minutos</span> para validar tu identidad e iniciar la instalación.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
