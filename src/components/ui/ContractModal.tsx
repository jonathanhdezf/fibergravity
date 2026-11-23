"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { GlassCard } from "./GlassCard";
import toast from "react-hot-toast";

interface ContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    planName?: string;
}

const brokerPlanOptions = [
    "Totalplay 150M Simétrico ($460/mes)",
    "Totalplay 250M Simétrico ($560/mes)",
    "Totalplay 1,000M (1 Gbps) ($1,000/mes)",
    "Totalplay Triple Play 150M + TV ($718/mes)",
    "Telmex Infinitum 200M + Tel ($389/mes)",
    "Telmex Infinitum 250M Simétrico ($499/mes)",
    "Telmex Infinitum 500M Simétrico ($649/mes)",
    "Megacable Triple Pack 200M + Xview+ ($430/mes)",
    "Megacable Fibra 500M Simétrico ($730/mes)",
    "izzi 150M + izzi tv+ ($639/mes)",
    "Telcel Internet en Casa WiFi 3 ($399/mes)",
    "Impactel Solo Internet ($280/mes) / Combo TV ($500/mes)"
];

export const ContractModal = ({ isOpen, onClose, planName }: ContractModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState(planName || brokerPlanOptions[0]);
    const [paymentMethod, setPaymentMethod] = useState("Tarjeta");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (planName) {
            setSelectedPlan(planName);
        }
    }, [planName]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanPhone = phone.replace(/\D/g, "");
        if (!firstName.trim() || cleanPhone.length !== 10 || !neighborhood.trim()) {
            toast.error("Ingresa tu nombre, teléfono a 10 dígitos y colonia para validar cobertura.");
            return;
        }

        const contractLead = {
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
            full_name: `${firstName} ${lastName}`.trim(),
            email,
            phone: cleanPhone,
            location: `${address} ${neighborhood} CP ${postalCode}`.trim(),
            notes,
            plan_name: selectedPlan,
            payment_method: paymentMethod,
            status: "pending"
        };

        const existing = JSON.parse(localStorage.getItem("fiberlink_play_leads") || "[]");
        localStorage.setItem("fiberlink_play_leads", JSON.stringify([contractLead, ...existing]));

        toast.success("¡Solicitud recibida! Un broker de Fiberlink Play validará cobertura y te contactará en breve.");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setNeighborhood("");
        setPostalCode("");
        setNotes("");
        onClose();
    };

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
                        className="relative w-full max-w-4xl z-10"
                    >
                        <GlassCard className="!p-0 border-white/10 shadow-2xl overflow-hidden" hoverEffect={false}>
                            <div className="grid lg:grid-cols-5 h-full max-h-[90vh] overflow-y-auto custom-scrollbar">
                                {/* Left Sidebar: Info & Steps */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-black p-8 border-r border-white/5 hidden lg:block">
                                    <div className="mb-12">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-widest mb-4">
                                            <ShieldCheck className="w-3 h-3" />
                                            Broker Digital Seguro
                                        </div>
                                        <h2 className="text-3xl font-black italic mb-2">Fiberlink <span className="text-neon-cyan">Play</span></h2>
                                        <p className="text-slate-400 text-sm">Gestionamos tu contratación con el mejor proveedor de tu zona.</p>
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
                                                <p className="text-slate-500 text-xs">Dirección exacta para validar cobertura.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full border border-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                            <div>
                                                <p className="text-slate-300 font-bold text-sm">Plan Seleccionado</p>
                                                <p className="text-neon-cyan font-bold text-xs uppercase tracking-tighter">{selectedPlan}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-16 p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-3 mb-4">
                                            <CheckCircle2 className="text-neon-cyan w-5 h-5" />
                                            <span className="text-sm font-bold">Asesoría Sin Costo</span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed">
                                            Comparamos precios vigentes y promociones de pronto pago para que contrates sin letras chiquitas.
                                        </p>
                                    </div>
                                </div>

                                {/* Right Content: Form */}
                                <div className="lg:col-span-3 p-8 md:p-12 relative">
                                    <button
                                        onClick={onClose}
                                        aria-label="Cerrar"
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-slate-500 hover:text-white transition-all"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>

                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        Solicitar Contratación
                                    </h3>

                                    <form className="space-y-5" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Plan de Interés</label>
                                            <select
                                                value={selectedPlan}
                                                onChange={(e) => setSelectedPlan(e.target.value)}
                                                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                            >
                                                {!brokerPlanOptions.includes(selectedPlan) && (
                                                    <option value={selectedPlan}>{selectedPlan}</option>
                                                )}
                                                {brokerPlanOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Personal Info Group */}
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <User className="w-3 h-3" /> Datos del Titular
                                            </p>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <input
                                                    required
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    placeholder="Nombres"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    placeholder="Apellidos"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                            </div>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="Email (opcional)"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                                    <input
                                                        required
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                        placeholder="Teléfono (10 dígitos)"
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
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Calle y Número Ext."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                            />
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <input
                                                    required
                                                    type="text"
                                                    value={neighborhood}
                                                    onChange={(e) => setNeighborhood(e.target.value)}
                                                    placeholder="Colonia / Fraccionamiento"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                                <input
                                                    type="text"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                    placeholder="Código Postal (ej. 73800)"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white"
                                                />
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                placeholder="Referencias Adicionales (Ej. Portón negro, frente a parque)"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-neon-cyan/50 transition-all text-white resize-none"
                                            />
                                        </div>

                                        {/* Payment Info Group */}
                                        <div className="space-y-4 pt-4 border-t border-white/5">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                                                <CreditCard className="w-3 h-3" /> Método de Pago Preferido
                                            </p>
                                            <div className="grid grid-cols-3 gap-3">
                                                {["Tarjeta", "Efectivo", "Transferencia"].map(method => (
                                                    <button
                                                        type="button"
                                                        key={method}
                                                        onClick={() => setPaymentMethod(method)}
                                                        className={`py-2.5 rounded-xl border text-[10px] font-bold transition-all uppercase tracking-tighter ${
                                                            paymentMethod === method
                                                                ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan"
                                                                : "border-white/5 bg-white/5 hover:border-neon-cyan/40 hover:text-neon-cyan"
                                                        }`}
                                                    >
                                                        {method}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-6 space-y-4">
                                            <NeonButton type="submit" className="w-full py-4 flex items-center justify-center gap-2 text-base">
                                                Finalizar Solicitud
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
                                                Al hacer clic en &quot;Finalizar&quot;, un broker de Fiberlink Play validará cobertura en los <span className="text-neon-cyan">próximos 15 minutos</span>.
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
