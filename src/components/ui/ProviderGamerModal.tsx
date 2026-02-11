"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Zap, ShieldCheck, Sparkles } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";

interface ProviderGamerModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: "Totalplay" | "Megacable" | "Telcel" | "Impactel/Cablecom";
}

const providerData = {
    Totalplay: {
        title: "Totalplay Gamer",
        subtitle: "Fiber Optic XGS-PON",
        accent: "neon-cyan",
        plans: [
            {
                name: "Internet Simétrico 150",
                speed: "150 Megas",
                type: "Simétrico",
                price: "$599",
                period: "al mes",
                features: [
                    "WiFi 7 de última generación",
                    "Latencia ultra baja auditada",
                    "Disney+ incluido (promo)",
                    "Soporte 24/7 especializado",
                    "WiFi Mesh gratis en planes altos"
                ]
            },
            {
                name: "Internet Simétrico 500",
                speed: "500 Megas",
                type: "Simétrico",
                price: "$999",
                period: "al mes",
                features: [
                    "Canales de TV 4K incluidos",
                    "Streaming sin pérdida de calidad",
                    "WiFi Pro Prioritized Gaming",
                    "Instalación Express",
                    "APP Totalplay para gestión"
                ]
            }
        ]
    },
    Megacable: {
        title: "Megacable Gamer",
        subtitle: "Gamer & Streaming Pack",
        accent: "white",
        plans: [
            {
                name: "Internet + Netflix 200",
                speed: "200 Megas",
                type: "Fibra Óptica",
                price: "$430",
                period: "al mes",
                features: [
                    "Netflix incluido (promocional)",
                    "WIFI Ultra sin costo",
                    "Velocidad estable de subida",
                    "Ideal para descargas de Day-0",
                    "Xview+ con 80 canales"
                ]
            },
            {
                name: "Internet + Netflix 500",
                speed: "500 Megas",
                type: "Fibra Óptica",
                price: "$730",
                period: "al mes",
                features: [
                    "Suscripción Amazon Prime incluida",
                    "Max (HBO) incluido",
                    "2 Equipos WIFI Ultra",
                    "Prioridad en red Megacable",
                    "Telefonía fija ilimitada"
                ]
            }
        ]
    },
    Telcel: {
        title: "Telcel COD Mobile",
        subtitle: "Alpha Mobile Connection",
        accent: "neon-cyan",
        plans: [
            {
                name: "COD Mobile Pack 2Hrs",
                speed: "Red 5G Ready",
                type: "Ilimitado x Tiempo",
                price: "$30",
                period: "x activación",
                features: [
                    "2 Horas de Red Ilimitada",
                    "Cupones de Cajas COD",
                    "Prioridad de Red 5G",
                    "Redes Sociales Incluidas",
                    "Activación Instantánea SMS"
                ]
            },
            {
                name: "COD Mobile Premium",
                speed: "Red 5G Ultra",
                type: "Ilimitado + CP",
                price: "$99",
                period: "x activación",
                features: [
                    "Datos Ilimitados x 24Hrs",
                    "COD Points (CP) de Regalo",
                    "Baja Latencia Móvil",
                    "Soporte Gamer Remoto",
                    "Acumulable con tu Plan"
                ]
            }
        ]
    },
    "Impactel/Cablecom": {
        title: "Impactel Gamer Lite",
        subtitle: "Essential Gaming",
        accent: "white",
        plans: [
            {
                name: "Lite Gamer Hub",
                speed: "50 Megas",
                type: "Estándar HFC",
                price: "$280",
                period: "al mes",
                features: [
                    "Internet estable para MOBA",
                    "Precio más bajo de Teziutlán",
                    "TV Básica de regalo",
                    "Sin plazos forzosos",
                    "Mantenimiento incluido"
                ]
            },
            {
                name: "Family Gamer Hub",
                speed: "100 Megas",
                type: "Estándar HFC",
                price: "$500",
                period: "al mes",
                features: [
                    "Suficiente para 3 jugadores",
                    "Ruta nacional optimizada",
                    "Soporte local en Teziutlán",
                    "Instalación rápida",
                    "Paquete Familiar TV"
                ]
            }
        ]
    }
};

import { supabase } from "@/lib/supabase";

export const ProviderGamerModal = ({ isOpen, onClose, provider }: ProviderGamerModalProps) => {
    const data = providerData[provider] || providerData.Totalplay;
    const [selectedPlan, setSelectedPlan] = useState(0);
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
            setSelectedPlan(0);
            setFormData({ fullName: "", phone: "", location: "" });
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
                    provider: data.title,
                    plan_name: data.plans[selectedPlan].name,
                    speed: data.plans[selectedPlan].speed,
                    price: data.plans[selectedPlan].price,
                    status: 'pending'
                }
            ]);

            if (error) throw error;

            alert(`¡Solicitud enviada! Un asesor de FiberGravity especializado en ${data.title} validará tu cobertura en Teziutlán.`);
            onClose();
        } catch (error: any) {
            console.error('Error submitting lead:', error);
            alert('Hubo un error al enviar tus datos. Por favor intenta de nuevo.');
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
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl bg-slate-950 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
                    >
                        <div className="grid lg:grid-cols-[1.2fr_1fr] min-h-[600px]">
                            {/* Left Side */}
                            <div className={`p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br ${data.accent === 'neon-cyan' ? 'from-blue-600/10' : 'from-slate-600/10'} via-transparent to-transparent`}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`p-3 rounded-2xl bg-${data.accent}/10 border border-${data.accent}/20`}>
                                        <Gamepad2 className={`w-6 h-6 text-${data.accent}`} />
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-[0.4em] text-${data.accent}`}>
                                        {data.subtitle}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black italic mb-6 leading-tight">
                                    {data.title.split(' ')[0]} <br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${data.accent} to-white`}>
                                        {data.title.split(' ')[1]}
                                    </span>
                                </h2>

                                <div className="space-y-4 mb-10">
                                    {data.plans.map((plan, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPlan(idx)}
                                            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 group relative overflow-hidden ${selectedPlan === idx
                                                ? `bg-white/5 border-${data.accent} shadow-[0_0_30px_rgba(0,243,255,0.1)]`
                                                : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-black uppercase tracking-widest text-[10px] ${selectedPlan === idx ? `text-${data.accent}` : "text-slate-500"}`}>
                                                    {plan.name}
                                                </span>
                                                <span className="text-2xl font-black italic">
                                                    {plan.price}
                                                    <span className="text-[10px] font-normal not-italic text-slate-500 ml-1 uppercase">{plan.period}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Zap className={`w-4 h-4 text-${data.accent}`} />
                                                    <span className="text-sm font-bold">{plan.speed}</span>
                                                </div>
                                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">{plan.type}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Specs de Conectividad:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {data.plans[selectedPlan].features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                                                <div className={`w-1.5 h-1.5 rounded-full bg-${data.accent}/50`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side */}
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
                                        Verificar Cobertura
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Escritorio de auditoría <span className={`text-${data.accent} font-bold italic underline`}>FiberGravity</span> para Teziutlán.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Titular de Cuenta</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="EJ. JUAN PÉREZ"
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all uppercase placeholder:text-slate-700 font-bold"
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
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Zona / Colonia</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="EJ. CENTRO"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 uppercase font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 block mb-2">Selección del Gamer</span>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${data.accent}/5 border border-${data.accent}/20`}>
                                            <ShieldCheck className={`w-3.5 h-3.5 text-${data.accent}`} />
                                            <span className={`text-[10px] font-black text-${data.accent} uppercase tracking-widest`}>{data.plans[selectedPlan].name}</span>
                                        </div>
                                    </div>

                                    <NeonButton
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant={data.accent === 'neon-cyan' ? 'cyan' : 'white'}
                                        className="w-full !py-6 text-xs font-black tracking-[0.4em] shadow-[0_0_40px_rgba(0,0,0,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "ENVIANDO..." : "VERIFICAR PACK"}
                                    </NeonButton>

                                    <p className="text-[9px] text-center text-slate-600 uppercase tracking-widest leading-relaxed font-bold">
                                        FiberGravity audita la señal de {data.title} en tiempo real.
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
