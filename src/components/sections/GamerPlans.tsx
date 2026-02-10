"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Gamepad2, Cpu, Zap, Trophy, Shield, Smartphone, Users, ChevronRight, Star } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const gamerPlans = [
    {
        category: "PC / CONSOLA (COMPETITIVO)",
        provider: "Totalplay Gamer",
        speed: "200 – 1200 Mbps (Hasta 10 Gbps)",
        features: [
            "Fibra óptica XGS-PON de última generación",
            "Ultra baja latencia optimizada para gaming",
            "Perfecto para streaming y juego competitivo",
            "Estabilidad de nivel profesional"
        ],
        price: "$460 – $1,470",
        recommendation: "MÁXIMA VELOCIDAD Y ESTABILIDAD",
        color: "cyan",
        icon: <Trophy className="w-8 h-8" />
    },
    {
        category: "PC / CONSOLA (COMPETITIVO)",
        provider: "Telmex Infinitum Gamer",
        speed: "150 Mbps Simétricos",
        features: [
            "IP Pública incluida para mejores partidas",
            "Baja latencia garantizada",
            "Soporte especializado para gamers",
            "Conexión sólida y balanceada"
        ],
        price: "$499",
        recommendation: "SÓLIDO Y ECONÓMICO",
        color: "magenta",
        icon: <Cpu className="w-8 h-8" />
    },
    {
        category: "PC / CONSOLA (COMPETITIVO)",
        provider: "Megacable Gamer",
        speed: "500 Mbps",
        features: [
            "Velocidad alta y estable",
            "Incluye suscripción a Netflix",
            "Excelente balance precio/rendimiento",
            "Ideal para descargas pesadas"
        ],
        price: "$880",
        color: "white",
        icon: <Zap className="w-8 h-8" />
    },
    {
        category: "GAMER MÓVIL",
        provider: "Telcel COD Mobile Pack",
        speed: "Velocidad 5G Optimizado",
        features: [
            "Internet ilimitado por horas para jugar",
            "Beneficios exclusivos dentro de COD Mobile",
            "Optimización de señal para redes móviles",
            "Sin lag en tus partidas fuera de casa"
        ],
        price: "$30 – $99",
        recommendation: "EL REY DEL GAMING MÓVIL",
        color: "cyan",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        category: "GAMER CASUAL / FAMILIAR",
        provider: "Impactel / Cablecom",
        speed: "Paquetes Estándar",
        features: [
            "Internet estable para uso diario",
            "Incluye servicios de TV básicos",
            "La opción más económica del mercado",
            "Suficiente para juegos no competitivos"
        ],
        price: "$280 – $500",
        recommendation: "ECONOMÍA Y HOGAR",
        color: "white",
        icon: <Users className="w-8 h-8" />
    }
];

export const GamerPlans = () => {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <section id="gamer" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-slate-900/50">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-magenta/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-widest mb-4">
                            <Zap className="w-3 h-3" />
                            Auditoría de Latencia
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic pr-4">
                            Dominio <span className="inline-block text-neon-cyan neon-text-cyan pr-6 pb-1">Gamer</span> <br />
                            <span className="text-white">Auditado</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-400 max-w-md text-sm leading-relaxed"
                    >
                        No todos los Megas son iguales. Hemos auditado las rutas de red de cada proovedor en Teziutlán para recomendarte los planes con el Ping más bajo hacia tus servidores favoritos.
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

                    {gamerPlans.map((plan, i) => (
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
                                        Elegir Pack
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
                        className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta origin-left"
                    />
                </div>
            </div>

            {/* Conclusion / Comparison Grid Area */}
            <div className="container mx-auto px-6 mt-24">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Zap className="w-4 h-4 text-neon-cyan" /> Ganador PC/Consola
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Totalplay</span> domina el terreno competitivo gracias a su infraestructura XGS-PON y latencia líder.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Smartphone className="w-4 h-4 text-neon-magenta" /> Ganador Móvil
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Telcel</span> es imbatible si tu campo de batalla es COD Mobile con sus packs de datos ilimitados por tiempo.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Users className="w-4 h-4 text-white" /> Ganador Casual
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Impactel/Cablecom</span> ofrecen el mejor punto de entrada para hogares que buscan estabilidad a bajo costo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
