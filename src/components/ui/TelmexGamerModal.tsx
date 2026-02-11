"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Zap, ShieldCheck, Globe, Wifi, Check, Sparkles, MonitorPlay } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";

interface TelmexGamerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const gamerPlans = [
    {
        name: "Infinitum Gamer 150",
        speed: "150 Megas",
        type: "Simétrico",
        price: "$499",
        period: "al mes",
        features: [
            "150 MB de Bajada / 150 MB de Subida",
            "IP Pública Dinámica (Ideal para servidores)",
            "Optimización de Latencia (Ping reducido)",
            "Wi-Fi Mesh incluido gratis",
            "Unlimited Calls a todo México",
            "Netflix incluido (6 meses promo)",
            "Claro Video & Claro Drive (100GB)"
        ],
        highlight: false
    },
    {
        name: "Infinitum Gamer 300",
        speed: "300 Megas",
        type: "Simétrico",
        price: "$649",
        period: "al mes",
        features: [
            "300 MB de Bajada / 300 MB de Subida",
            "Análisis de Red Prioritaria",
            "VPN Optimized Gaming Support",
            "2 Equipos Wi-Fi Mesh",
            "HBO Max incluido (3 meses)",
            "Seguridad McAfee integrada",
            "Disney+ opcional con descuento"
        ],
        highlight: true
    }
];

import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export const TelmexGamerModal = ({ isOpen, onClose }: TelmexGamerModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState(0);
    const [step, setStep] = useState(1); // 1: Info, 2: Form
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        location: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setFormData({ fullName: "", phone: "", location: "" });
            setTimeout(() => {
                setStep(1);
            }, 300);
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const { error } = await supabase.from('leads').insert([
                {
                    full_name: formData.fullName,
                    phone: formData.phone,
                    location: formData.location,
                    category: 'Gamer',
                    provider: 'Telmex Infinitum Gamer',
                    plan_name: gamerPlans[selectedPlan].name,
                    speed: gamerPlans[selectedPlan].speed,
                    price: gamerPlans[selectedPlan].price,
                    status: 'pending'
                }
            ]);

            if (error) throw error;

            toast.success(`¡Enviado con éxito! En breve un representante de FiberGravity se pondrá en contacto contigo.`, {
                icon: '📞',
                style: {
                    borderRadius: '20px',
                    background: '#020617',
                    color: '#fff',
                    border: '1px solid rgba(0, 243, 255, 0.2)',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '16px 24px'
                }
            });
            onClose();
        } catch (error: any) {
            console.error('Error submitting lead:', error);
            toast.error('Hubo un error al enviar tus datos. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto pt-12 md:pt-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl bg-slate-950 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
                    >
                        <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-[600px]">
                            {/* Left Side: Plan Details */}
                            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br from-blue-600/10 via-transparent to-magenta-600/5">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 rounded-2xl bg-neon-cyan/10 border border-neon-cyan/20">
                                        <Gamepad2 className="w-6 h-6 text-neon-cyan" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-[0.4em] text-neon-cyan">
                                        Infinitum Gamer Squad
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black italic mb-6 leading-tight">
                                    Zero Latency <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
                                        Experience
                                    </span>
                                </h2>

                                <div className="space-y-4 mb-10">
                                    {gamerPlans.map((plan, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPlan(idx)}
                                            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 group relative overflow-hidden ${selectedPlan === idx
                                                ? "bg-white/5 border-neon-cyan shadow-[0_0_30px_rgba(0,243,255,0.1)]"
                                                : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            {plan.highlight && (
                                                <div className="absolute top-0 right-0 p-2">
                                                    <Sparkles className="w-4 h-4 text-neon-cyan animate-pulse" />
                                                </div>
                                            )}
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-black uppercase tracking-widest text-[10px] ${selectedPlan === idx ? "text-neon-cyan" : "text-slate-500"}`}>
                                                    {plan.name}
                                                </span>
                                                <span className="text-2xl font-black italic">
                                                    {plan.price}
                                                    <span className="text-[10px] font-normal not-italic text-slate-500 ml-1 uppercase">{plan.period}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-neon-cyan" />
                                                    <span className="text-sm font-bold">{plan.speed}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">{plan.type}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Beneficios Gamer Incluidos:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {gamerPlans[selectedPlan].features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                                                <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan/50" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <div className="p-8 md:p-12 flex flex-col justify-center bg-black/40">
                                <button
                                    onClick={onClose}
                                    aria-label="Cerrar modal"
                                    className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/5 transition-colors group"
                                >
                                    <X className="w-6 h-6 text-slate-500 group-hover:text-white" />
                                </button>

                                <div className="mb-10 text-center lg:text-left">
                                    <h3 className="text-2xl font-black italic mb-2 uppercase tracking-tighter">
                                        Configuración Final
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Completa tus datos para activar tu perfil <span className="text-neon-cyan font-bold italic">Gamer Alpha</span>.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Nombre del Titular</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="EJ. JUAN PÉREZ"
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.05] transition-all uppercase placeholder:text-slate-700"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Teléfono</label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="231 123 4567"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Código Postal</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="73800"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.05] transition-all placeholder:text-slate-700"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center p-4 rounded-2xl border border-dashed border-white/5 bg-white/[0.01]">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 block mb-2">Plan Seleccionado</span>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/5 border border-neon-cyan/20">
                                            <ShieldCheck className="w-3.5 h-3.5 text-neon-cyan" />
                                            <span className="text-[10px] font-black text-neon-cyan uppercase tracking-widest">{gamerPlans[selectedPlan].name}</span>
                                        </div>
                                    </div>

                                    <NeonButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant="cyan"
                                        className="w-full !py-6 text-xs font-black tracking-[0.4em] shadow-[0_0_40px_rgba(0,243,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "ACTIVANDO..." : "ACTIVAR CONEXIÓN"}
                                    </NeonButton>

                                    <p className="text-[9px] text-center text-slate-600 uppercase tracking-widest leading-relaxed">
                                        Al presionar activar, un broker profesional de FiberGravity validará tu cobertura gamer en Teziutlán.
                                    </p>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
