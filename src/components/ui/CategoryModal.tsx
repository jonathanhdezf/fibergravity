"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, ShieldCheck, Video, Briefcase, Building2, Globe, Star, Check, Sparkles } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";

export type PlanCategory = "Streamer" | "HomeOffice" | "Enterprise";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: PlanCategory;
    providerName: string;
}

const categoryData: Record<string, any> = {
    Streamer: {
        title: "Creator Hub",
        tag: "Bitrate Priority",
        icon: <Video className="w-6 h-6" />,
        accent: "neon-magenta",
        bgGradient: "from-magenta-600/10",
        plans: {
            "Totalplay 1200 Megas": [
                { name: "Pro Multi-Stream", speed: "1200 Megas", type: "XGS-PON", price: "$1,470", features: ["Bitrate 8K Garantizado", "WiFi 7 Multilink", "Prioridad en Nodos", "SLA 99.9% Stream"] },
                { name: "Creator Essentials", speed: "500 Megas", type: "XGS-PON", price: "$999", features: ["Streaming 4K Fluido", "WiFi Pro 6E", "Cuentas Multidispositivo", "Soporte VIP"] }
            ],
            "Megacable Streamers": [
                { name: "Xview+ Creator", speed: "500 Megas", type: "Simétrico", price: "$880", features: ["Netflix Estándar Incluido", "Xview+ TV Monitoreo", "WiFi Ultra Dual", "Instalación Gold"] }
            ],
            "Telmex Infinitum Gamer": [
                { name: "Infinitum 150 Sim", speed: "150 Megas", type: "Simétrico", price: "$499", features: ["IP Pública Dinámica", "Zero Lag Nodes", "Claro Video Incluido", "Antivirus McAfee"] }
            ],
            "Telcel Casa Libre 4": [
                { name: "Mobile Streamers", speed: "50 Megas", type: "Inalámbrico", price: "$499", features: ["125GB High Speed", "Paramount+ & Claro", "Sin Instalación", "Plug & Play"] }
            ],
            "Cablecom / Impactel": [
                { name: "Impactel Start", speed: "30 Megas", type: "HFC Estándar", price: "$280", features: ["TV Básica Incluida", "Soporte Local", "Sin Plazo Forzoso", "Internet Estable"] }
            ]
        }
    },
    HomeOffice: {
        title: "Productivity Suite",
        tag: "Encryption Ready",
        icon: <Briefcase className="w-6 h-6" />,
        accent: "neon-cyan",
        bgGradient: "from-blue-600/10",
        plans: {
            "Totalplay Business": [
                { name: "Business Pro", speed: "500 Megas", type: "Simétrico", price: "$680", features: ["Prioridad Conferencias 4K", "Seguridad Web Pro", "Llamadas Ilimitadas", "Cloud Storage 1TB"] }
            ],
            "Megacable Pro-Work": [
                { name: "Pro-Work Netflix", speed: "500 Megas", type: "Simétrico", price: "$880", features: ["Canales HD Incluidos", "Netflix Premium 4K", "WiFi Ultra Mesh", "Asistencia Pro"] }
            ],
            "Telmex Infinitum Office": [
                { name: "Office Premium", speed: "100 Megas", type: "Simétrico", price: "$499", features: ["Netflix & Disney+ Inc.", "HBO Max Promo", "Soporte Prioritario", "Configuración VPN"] }
            ],
            "Telcel Casa Freelance": [
                { name: "Freelance 5G", speed: "50 Megas", type: "Inalámbrico", price: "$499", features: ["Portabilidad Total", "Redes Sociales Inc.", "Fácil Activación", "125GB de Datos"] }
            ],
            "Cablecom / Impactel": [
                { name: "Office Lite", speed: "30 Megas", type: "Estándar", price: "$280", features: ["Económico & Estable", "Atención Teziutlán", "Soporte Presencial", "Internet + TV"] }
            ]
        }
    },
    Enterprise: {
        title: "B2B Infrastructure",
        tag: "SLA Guaranteed",
        icon: <Building2 className="w-6 h-6" />,
        accent: "white",
        bgGradient: "from-slate-600/10",
        plans: {
            "Totalplay Negocios": [
                { name: "Digital Business", speed: "250 Megas", type: "Simétrico", price: "$650", features: ["Página Web Gratis", "Tienda en Línea", "Internet Seguro Pro", "Dominio .com"] }
            ],
            "Telmex Negocios": [
                { name: "Infinitum Business", speed: "150 Megas", type: "Fibra Opt.", price: "$549", features: ["Sección Amarilla Inc.", "Facturación Electrónica", "Corros Ilimitados", "Almacenaje Nube"] }
            ],
            "Megacable Empresas": [
                { name: "Empresa Conectada", speed: "300 Megas", type: "Simétrico", price: "$550", features: ["Asesor Dedicado", "WiFi Inteligente", "Ciberseguridad Inc.", "Llamadas Mundiales"] }
            ],
            "Cablecom Empresas": [
                { name: "Pyme Hub", speed: "300 Megas", type: "Estándar", price: "$550", features: ["TV Corporativa", "Facturación Portal", "Instalación Express", "Sin Anualidades"] }
            ],
            "Telcel Internet Empresa": [
                { name: "Logística 5G", speed: "60GB High Speed", type: "Red 5G", price: "$1,219", features: ["Equipos en Campo", "Monitoreo GPS Ready", "Red Segura VPN", "Escalabilidad Total"] }
            ],
            "Impactel Negocios": [
                { name: "Básico Negocio", speed: "50 Megas", type: "HFC Cable", price: "$500", features: ["Internet + TV Local", "Precio Fijo", "Atención de Fallas", "Simple & Funcional"] }
            ]
        }
    }
};

export const CategoryModal = ({ isOpen, onClose, category, providerName }: CategoryModalProps) => {
    const data = categoryData[category] || categoryData.HomeOffice;
    const [selectedPlan, setSelectedPlan] = useState(0);

    const getProviderPlans = () => {
        const plans = data.plans[providerName];
        if (plans) return plans;

        const closeMatchKey = Object.keys(data.plans).find(key =>
            providerName.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(providerName.toLowerCase())
        );

        return closeMatchKey ? data.plans[closeMatchKey] : null;
    };

    const currentPlans = getProviderPlans() || [
        { name: "Plan Personalizado", speed: "Velocidad Máxima", type: "Fibra Óptica", price: "$---", features: ["Solicita cotización especial"] }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setSelectedPlan(0);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`¡Registro Exitoso! Un ejecutivo de FiberGravity especializado en ${category === 'Enterprise' ? 'Empresas' : category === 'HomeOffice' ? 'Productividad' : 'Streaming'} te contactará.`);
        onClose();
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
                            {/* Left Side: Category Details */}
                            <div className={`p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 bg-gradient-to-br ${data.bgGradient} via-transparent to-transparent`}>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className={`p-3 rounded-2xl bg-${data.accent}/10 border border-${data.accent}/20`}>
                                        <div className={`text-${data.accent}`}>{data.icon}</div>
                                    </div>
                                    <span className={`text-xs font-black uppercase tracking-[0.4em] text-${data.accent}`}>
                                        {data.tag}
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-black italic mb-6 leading-tight">
                                    {data.title.split(' ')[0]} <br />
                                    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${data.accent} to-white`}>
                                        {data.title.split(' ')[1]}
                                    </span>
                                </h2>

                                <div className="space-y-4 mb-10">
                                    {currentPlans.map((plan: any, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPlan(idx)}
                                            className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 group relative overflow-hidden ${selectedPlan === idx
                                                ? `bg-white/5 border-${data.accent} shadow-[0_0_30px_rgba(255,255,255,0.05)]`
                                                : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <span className={`font-black uppercase tracking-widest text-[10px] ${selectedPlan === idx ? `text-${data.accent}` : "text-slate-500"}`}>
                                                    {plan.name}
                                                </span>
                                                <span className="text-2xl font-black italic">
                                                    {plan.price}
                                                    <span className="text-[10px] font-normal not-italic text-slate-500 ml-1 uppercase">AL MES</span>
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
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Certificación de Servicio:</p>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {currentPlans[selectedPlan].features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                                                <Check className={`w-4 h-4 text-${data.accent}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right Side: Specialized Form */}
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
                                        Expediente de {category === 'Enterprise' ? 'Negocio' : 'Perfil'}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        Validación inteligente de {providerName} <span className={`text-${data.accent} font-bold italic`}>Teziutlán Zone</span>.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">
                                            {category === 'Enterprise' ? 'Razón Social / Representante' : 'Nombre Completo'}
                                        </label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="EJ. JUAN PÉREZ / EMPRESA S.A."
                                            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all uppercase placeholder:text-slate-700 font-bold"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Teléfono Directo</label>
                                            <input
                                                required
                                                type="tel"
                                                placeholder="231 123 4567"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 pl-4">Ubicación</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="ZONA / BARRIO"
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 focus:bg-white/[0.05] transition-all placeholder:text-slate-700 uppercase font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-center p-4 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 block mb-2">Plan Auditado</span>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${data.accent}/5 border border-${data.accent}/20`}>
                                            <ShieldCheck className={`w-3.5 h-3.5 text-${data.accent}`} />
                                            <span className={`text-[10px] font-black text-${data.accent} uppercase tracking-widest`}>{currentPlans[selectedPlan].name}</span>
                                        </div>
                                    </div>

                                    <NeonButton
                                        type="submit"
                                        variant={data.accent === 'neon-cyan' ? 'cyan' : data.accent === 'neon-magenta' ? 'magenta' : 'white'}
                                        className="w-full !py-6 text-xs font-black tracking-[0.4em] shadow-xl active:scale-95"
                                    >
                                        VERIFICAR PACK
                                    </NeonButton>

                                    <div className="flex items-center justify-center gap-4 mt-6">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-6 h-6 rounded-full border border-black bg-slate-800" />
                                            ))}
                                        </div>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                                            +40 auditorías activas hoy
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
