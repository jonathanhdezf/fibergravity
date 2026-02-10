"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Video, Zap, Cloud, Smartphone, Users, ChevronRight, Star, Shield, Camera, Radio } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const streamerPlans = [
    {
        category: "STREAMER PROFESIONAL (4K/8K)",
        provider: "Totalplay 1200 Megas",
        speed: "Fibra XGS-PON (Hasta 10 Gbps)",
        features: [
            "Velocidad brutal para multitarea masiva",
            "Optimizado para streaming 4K y 8K",
            "WiFi Pro de última generación incluido",
            "Estabilidad premium para transmisiones largas"
        ],
        price: "$1,470",
        recommendation: "MÁXIMO RENDIMIENTO PROFESIONAL",
        color: "cyan",
        icon: <Video className="w-8 h-8" />
    },
    {
        category: "STREAMER PROFESIONAL (4K/8K)",
        provider: "Megacable Streamers",
        speed: "500 Mbps Estables",
        features: [
            "Transmisión 8K garantizada sin lag",
            "Incluye suscripción a Netflix",
            "Incluye TV XVIEW+ para monitoreo",
            "Gestión avanzada de contenido multimedia"
        ],
        price: "$880",
        recommendation: "IDEAL CREADORES MULTIMEDIA",
        color: "magenta",
        icon: <Zap className="w-8 h-8" />
    },
    {
        category: "STREAMER PROFESIONAL (4K/8K)",
        provider: "Telmex Infinitum Gamer",
        speed: "150 Mbps Simétricos",
        features: [
            "IP Pública fija para servidores propios",
            "Incluye Claro Video y Antivirus",
            "Almacenamiento masivo en la nube",
            "Baja latencia a precio competitivo"
        ],
        price: "$499 – $999",
        recommendation: "OPCIÓN COSTO-BENEFICIO",
        color: "white",
        icon: <Cloud className="w-8 h-8" />
    },
    {
        category: "STREAMER CASUAL (REDES SOCIALES)",
        provider: "Telcel Casa Libre 4",
        speed: "50 Mbps / 125 GB Datos",
        features: [
            "Perfecto para Instagram y TikTok Live",
            "Incluye Claro Video + Paramount+",
            "Fácil instalación, solo conecta y transmite",
            "Movilidad total dentro de tu hogar"
        ],
        price: "$499",
        recommendation: "PERFECTO PARA LIVES MÓVILES",
        color: "cyan",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        category: "STREAMER CASUAL (REDES SOCIALES)",
        provider: "Cablecom / Impactel",
        speed: "Paquetes Estándar",
        features: [
            "La opción más económica para iniciar",
            "Suficiente para lives esporádicos en FB",
            "Internet estable para uso doméstico",
            "Sin contratos de larga duración"
        ],
        price: "$280",
        recommendation: "OPCIÓN ECONOMICA",
        color: "white",
        icon: <Users className="w-8 h-8" />
    }
];

export const StreamerPlans = () => {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900/50 to-black">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-magenta/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta text-[10px] font-black uppercase tracking-widest mb-4">
                            <Radio className="w-3 h-3 animate-pulse" />
                            Streamer Hub
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic">
                            Tu Set-Up Merece <br />
                            <span className="text-neon-magenta neon-text-magenta">Conexión</span> de <span className="text-neon-cyan neon-text-cyan">Élite</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-400 max-w-md text-sm leading-relaxed"
                    >
                        Transmite en 4K/8K sin fotogramas perdidos. Hemos filtrado los planes con el mejor bitrate y estabilidad para creadores de contenido.
                    </motion.p>
                </div>
            </div>

            {/* Horizontal Carousel */}
            <div className="relative group/carousel">
                {/* Desktop Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-40 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
                    <button
                        onClick={() => {
                            if (containerRef.current) containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }}
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] group/btn"
                        aria-label="Anterior"
                    >
                        <ChevronRight className="w-8 h-8 rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-40 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
                    <button
                        onClick={() => {
                            if (containerRef.current) containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }}
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-neon-magenta/20 hover:border-neon-magenta/50 hover:text-neon-magenta transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] group/btn"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div
                    ref={containerRef}
                    className="flex overflow-x-auto gap-8 px-6 pt-10 pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
                >
                    {/* Spacer for centering logic */}
                    <div className="min-w-[5vw] h-1 md:block hidden" />

                    {streamerPlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="min-w-[300px] md:min-w-[380px] snap-center py-4"
                        >
                            <GlassCard
                                className={`h-full border-white/5 relative group hover:border-${plan.color === 'cyan' ? 'neon-cyan' : plan.color === 'magenta' ? 'neon-magenta' : 'white'}/30 transition-all duration-500 !overflow-visible`}
                                hoverEffect={true}
                            >
                                {plan.recommendation && (
                                    <div className={`absolute -top-3 right-6 z-20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-xl
                                        ${plan.color === 'cyan' ? 'bg-black border-neon-cyan text-neon-cyan' : plan.color === 'magenta' ? 'bg-black border-neon-magenta text-neon-magenta' : 'bg-black border-white text-white'}
                                    `}>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            {plan.recommendation}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl bg-${plan.color === 'cyan' ? 'neon-cyan' : plan.color === 'magenta' ? 'neon-magenta' : 'white'}/10 border border-white/5`}>
                                        <div className={`text-${plan.color === 'cyan' ? 'neon-cyan' : plan.color === 'magenta' ? 'neon-magenta' : 'white'}`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{plan.category}</span>
                                </div>

                                <h3 className="text-2xl font-black mb-1 group-hover:text-neon-cyan transition-colors">{plan.provider}</h3>
                                <p className="text-neon-magenta text-xs font-bold mb-6 tracking-tight uppercase">{plan.speed}</p>

                                <ul className="space-y-4 mb-10 min-h-[160px]">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group/item">
                                            <Shield className={`w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110 ${plan.color === 'cyan' ? 'text-neon-cyan' : plan.color === 'magenta' ? 'text-neon-magenta' : 'text-slate-500'}`} />
                                            <span className="text-xs text-slate-400 leading-tight group-hover/item:text-slate-200 transition-colors">{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div>
                                        <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest">Inversión mensual</span>
                                        <div className="text-2xl font-black italic">
                                            <span className="text-sm font-normal not-italic text-slate-400 mr-1">Desde</span>
                                            {plan.price}
                                            <span className="text-[10px] font-normal not-italic text-slate-500 ml-1">MXN</span>
                                        </div>
                                    </div>
                                    <NeonButton
                                        onClick={() => openModal(plan.provider)}
                                        variant={plan.color === "magenta" ? "magenta" : plan.color === "cyan" ? "cyan" : "white"}
                                        className="!py-2.5 !px-5 text-[10px]"
                                    >
                                        Live Now
                                    </NeonButton>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}

                    {/* Spacer for centering logic */}
                    <div className="min-w-[5vw] h-1 md:block hidden" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4">
                <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollXProgress }}
                        className="h-full bg-gradient-to-r from-neon-magenta to-neon-cyan origin-left"
                    />
                </div>
            </div>

            {/* Comparison Grid Area - Streamer Focus */}
            <div className="container mx-auto px-6 mt-24">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Camera className="w-4 h-4 text-neon-cyan" /> Ganador profesional
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Totalplay 1200M</span> es la elección definitiva para multitarea y transmisiones simultáneas en 4K/8K.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Radio className="w-4 h-4 text-neon-magenta" /> Ganador Multimedia
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Megacable Streamers</span> equilibra perfectamente costo y estabilidad con beneficios de entretenimiento incluidos.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Smartphone className="w-4 h-4 text-white" /> Ganador casual
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Telcel Casa Libre</span> permite lives espontáneos con calidad constante sin depender de cableado tradicional.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
