"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { Gamepad2, Tv, Home, Building2, Zap, Rocket } from "lucide-react";

const plans = [
    {
        title: "Plan Gamer",
        speed: "500 MB",
        price: "$49",
        icon: <Gamepad2 className="w-8 h-8 text-neon-cyan" />,
        features: ["Baja latencia", "Ping optimizado", "Upload simétrico"],
        size: "md:col-span-2",
        accent: "cyan"
    },
    {
        title: "Streamer Plus",
        speed: "800 MB",
        price: "$69",
        icon: <Tv className="w-10 h-10 text-neon-magenta" />,
        features: ["4K Sin Cortes", "Multidispositivo", "TV Premium"],
        size: "md:col-span-1",
        accent: "magenta"
    },
    {
        title: "Home Office",
        speed: "300 MB",
        price: "$35",
        icon: <Home className="w-8 h-8 text-white" />,
        features: ["WiFi 6", "Soporte 24/7", "Seguridad Avanzada"],
        size: "md:col-span-1",
        accent: "white"
    },
    {
        title: "Empresarial",
        speed: "1 GB",
        price: "$99",
        icon: <Building2 className="w-12 h-12 text-neon-cyan" />,
        features: ["IP Fijo", "Enlace Dedicado", "Garantía de Servicio"],
        size: "md:col-span-2",
        accent: "cyan"
    },
];

import { useModal } from "../ModalProvider";

export const BentoGrid = () => {
    const { openModal } = useModal();

    return (
        <section id="planes" className="py-24 container mx-auto px-6 overflow-visible">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black mb-4">Planes sin fricción</h2>
                <p className="text-slate-400">Selecciona la potencia que tu vida digital necesita.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
                {plans.map((plan, index) => (
                    <div key={index} className={`${plan.size} p-2`}>
                        <GlassCard
                            className="h-full flex flex-col justify-between min-h-[350px] border-white/5 hover:border-neon-cyan/20 transition-colors"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                        {plan.icon}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-slate-500 uppercase tracking-tighter">Desde</span>
                                        <div className="text-3xl font-black">{plan.price}<span className="text-sm font-normal text-slate-500">/mes</span></div>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                                <div className="text-4xl font-black text-neon-cyan mb-6">{plan.speed}</div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2 text-sm text-slate-300">
                                            <Zap className="w-4 h-4 text-neon-magenta" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <NeonButton
                                onClick={() => openModal(plan.title)}
                                variant={plan.accent === "magenta" ? "magenta" : "cyan"}
                                className="w-full"
                            >
                                Lo quiero
                            </NeonButton>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </section>
    );
};
