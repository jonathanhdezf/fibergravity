"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wifi, Monitor, Cpu, Briefcase, Tv, Star, Shield, ArrowRight, Smartphone, MapPin, User, CheckCircle2 } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

export type PlanCategory = "Streamer" | "HomeOffice" | "Enterprise" | "TV";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: PlanCategory;
    providerName: string;
}

const providerData: any = {
    Totalplay: {
        plans: {
            Streamer: [
                { name: "Plan Simétrico 150", speed: "150 MB", type: "Internet Simétrico", price: "$569", features: ["12 Meses de descuento", "Club Totalplay", "Wifi 6"] },
                { name: "Plan Simétrico 300", speed: "300 MB", type: "Internet Simétrico", price: "$689", features: ["Ideal para 4K", "Prioridad Gamer", "Wifi 6"] },
            ],
            HomeOffice: [
                { name: "Productividad 500", speed: "500 MB", type: "Fibra Profesional", price: "$859", features: ["Soporte Premium", "Antivirus incluido", "IP Dinámica"] },
            ],
            Enterprise: [
                { name: "Empresarial 1000", speed: "1 GB", type: "Fibra Dedicada", price: "$1,299", features: ["SLA 99.9%", "IP Fija disponible", "Soporte 24/7"] },
            ],
            TV: [
                { name: "Plan TV Plus", speed: "250 MB", type: "Internet + TV", price: "$729", features: ["140 Canales", "App Totalplay", "4K HDR"] },
            ]
        }
    },
    Megacable: {
        plans: {
            Streamer: [
                { name: "Internet Ilimitado 100", speed: "100 MB", type: "Fibra Óptica", price: "$450", features: ["Hbo Max Incluido", "Módem Dual Band"] },
                { name: "Internet Ilimitado 200", speed: "200 MB", type: "Fibra Óptica", price: "$550", features: ["Paramount+ Incluido", "Módem Dual Band"] },
            ],
            TV: [
                { name: "Tríple Clásico", speed: "150 MB", type: "Internet + TV + Telef", price: "$650", features: ["80 Canales HD", "Xview+ Incluido"] },
            ]
        }
    }
};

export const CategoryModal = ({ isOpen, onClose, category, providerName }: CategoryModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState(0);

    const getProviderPlans = () => {
        const data = providerData[providerName] || providerData.Totalplay;
        const plans = data.plans[category];
        if (plans) return plans;

        const allCategories = Object.keys(data.plans);
        const closeMatchKey = allCategories.find(k => k.toLowerCase().includes(category.toLowerCase()));
        return closeMatchKey ? data.plans[closeMatchKey] : null;
    };

    const currentPlans = getProviderPlans() || [
        { name: "Plan Personalizado", speed: "Velocidad Máxima", type: "Fibra Óptica", price: "$---", features: ["Solicita cotización especial"] }
    ];

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
                    category: category,
                    provider: providerName,
                    plan_name: currentPlans[selectedPlan].name,
                    speed: currentPlans[selectedPlan].speed,
                    price: currentPlans[selectedPlan].price,
                    status: 'pending'
                }
            ]);

            if (error) throw error;

            toast.success(`¡Enviado con éxito! En breve un representante de FiberGravity se pondrá en contacto contigo.`, {
                icon: '🚀',
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
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#020617] md:rounded-[3rem] border border-white/10 shadow-2xl shadow-neon-cyan/10 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
                            {/* Left Side: Plan Selector */}
                            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-cyan">Plan Selection</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">
                                            {category === 'Enterprise' ? 'SOLUCIONES EMPRESARIALES' :
                                                category === 'HomeOffice' ? 'PODER HOME OFFICE' :
                                                    category === 'TV' ? 'ENTRETENIMIENTO TOTAL' :
                                                        'MÁXIMO STREAMING'}
                                        </h2>
                                        <p className="text-slate-400 mt-2 text-sm max-w-md font-medium">
                                            Selecciona el paquete que mejor se adapte a tus necesidades con {providerName}.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="lg:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {currentPlans.map((plan: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedPlan(i)}
                                            className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group ${selectedPlan === i
                                                ? 'bg-neon-cyan/5 border-neon-cyan shadow-xl shadow-neon-cyan/5'
                                                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-2xl ${selectedPlan === i ? 'bg-neon-cyan/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                                                    {category === 'Streamer' ? <Wifi className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} /> :
                                                        category === 'HomeOffice' ? <Monitor className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} /> :
                                                            category === 'TV' ? <Tv className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} /> :
                                                                <Briefcase className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} />}
                                                </div>
                                                <div className={`text-xl font-black italic ${selectedPlan === i ? 'text-neon-cyan' : 'text-white'}`}>
                                                    {plan.price}
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-lg text-white mb-1">{plan.name}</h3>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{plan.speed}</div>

                                            <div className="space-y-2">
                                                {plan.features.map((feature: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                                                        <CheckCircle2 className={`w-3 h-3 ${selectedPlan === i ? 'text-neon-cyan' : 'text-emerald-500'}`} />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            {selectedPlan === i && (
                                                <motion.div
                                                    layoutId="selected-indicator"
                                                    className="absolute top-4 right-4"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <div className="w-4 h-4 rounded-full bg-neon-cyan flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-black" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Deployment Form */}
                            <div className="bg-black/40 p-8 md:p-12 flex flex-col">
                                <button
                                    onClick={onClose}
                                    className="hidden lg:flex self-end p-2 hover:bg-white/5 rounded-full transition-colors mb-4"
                                >
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>

                                <div className="flex-1">
                                    <h3 className="text-xl font-black italic text-white mb-2">VALIDAR COBERTURA</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
                                        Instalación inmediata en Teziutlán
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <User className="w-3 h-3 text-neon-cyan" /> Nombre Titular
                                            </label>
                                            <input
                                                required
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                placeholder="EJ. JUAN PÉREZ"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <Smartphone className="w-3 h-3 text-neon-cyan" /> Whatsapp / Celular
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="EJ. 231 123 4567"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <MapPin className="w-3 h-3 text-neon-cyan" /> Barrio / Colonia
                                            </label>
                                            <input
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="EJ. CENTRO, CHOWIS..."
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700 uppercase"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <NeonButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full !py-5 font-black tracking-[0.3em]"
                                                variant="cyan"
                                            >
                                                {isSubmitting ? "ENVIANDO..." : "SOLICITAR AHORA"}
                                            </NeonButton>
                                        </div>

                                        <p className="text-[9px] text-center text-slate-600 font-bold tracking-tighter mt-4">
                                            AL ENVIAR ACEPTAS NUESTRA POLÍTICA DE PRIVACIDAD. <br />
                                            FIBERGRAVITY ZERO DATA PROTECTION 2026.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
