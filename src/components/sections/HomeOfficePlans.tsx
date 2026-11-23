"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Briefcase, Zap, Video, Smartphone, Users, ChevronRight, Star, Shield, Layout, Globe } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";
import { PlanCarouselControls, useHorizontalDragScroll } from "../ui/PlanCarouselControls";

const homeOfficePlans = [
    {
        category: "HOME OFFICE PROFESIONAL (ZOOM / MULTITAREA)",
        provider: "Totalplay Home & Business",
        speed: "150 – 350 Mbps Simétricos",
        features: [
            "150M $460, 250M $560 o 350M $660 MXN (pronto pago)",
            "Velocidad simétrica para videollamadas 4K y VPN",
            "Llamadas ilimitadas MX/EUA/CAN incluidas",
            "WiFi Pro con cobertura extendida para oficina en casa"
        ],
        price: "$460 – $660",
        recommendation: "MÁXIMA ESTABILIDAD Y VELOCIDAD",
        color: "cyan",
        icon: <Video className="w-8 h-8" />
    },
    {
        category: "HOME OFFICE PROFESIONAL (ZOOM / MULTITAREA)",
        provider: "Megacable Pro-Work",
        speed: "200 – 500 Mbps Simétricos",
        features: [
            "Doble Pack 200M desde $350–$400 o 500M hasta $800",
            "Ideal para diseño, nube y archivos pesados",
            "Xview+ y plataformas de streaming en Triple Pack",
            "Descuento adicional domiciliando tu tarjeta"
        ],
        price: "$400 – $800",
        recommendation: "PERFECTO PARA DISEÑO Y VIDEO",
        color: "white",
        icon: <Layout className="w-8 h-8" />
    },
    {
        category: "HOME OFFICE CONFIABLE",
        provider: "Telmex Infinitum Office",
        speed: "120 – 350 Mbps Simétricos",
        features: [
            "Desde $389 (120–200M) hasta $599 MXN (350M)",
            "Solo internet disponible desde $349 MXN/mes",
            "Claro Drive 100 GB + telefonía fija ilimitada",
            "Cobertura consolidada y atención prioritaria"
        ],
        price: "$349 – $599",
        recommendation: "CONFIABILIDAD Y PRECIO FIJO",
        color: "cyan",
        icon: <Shield className="w-8 h-8" />
    },
    {
        category: "HOME OFFICE MOVILIDAD / RESPALDO",
        provider: "Telcel Internet en Casa",
        speed: "10 – 20 Mbps (150 GB • Red 4G/5G)",
        features: [
            "Conexión inalámbrica instantánea sin visita técnica",
            "Plan WiFi Telcel 3 a $399 MXN o Gama Alta $799",
            "Respaldo perfecto ante cortes de fibra en tu zona",
            "Opciones prepago Amigo desde $200 MXN"
        ],
        price: "$399 – $799",
        recommendation: "CONEXIÓN RÁPIDA SIN CABLES",
        color: "white",
        icon: <Smartphone className="w-8 h-8" />
    },
    {
        category: "HOME OFFICE BÁSICO (TRABAJO LIGERO)",
        provider: "Cablecom / Impactel",
        speed: "50 – 100 Mbps Regional",
        features: [
            "La solución más económica del catálogo ($280–$500)",
            "Internet estable + TV opcional para el hogar",
            "Perfecto para correos, ERP y juntas en Meet/Teams",
            "Sin plazos forzosos y atención local directa"
        ],
        price: "$280 – $500",
        recommendation: "ECONOMÍA Y PRODUCTIVIDAD",
        color: "cyan",
        icon: <Globe className="w-8 h-8" />
    }
];

export const HomeOfficePlans = () => {
    const { openCategoryModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const dragHandlers = useHorizontalDragScroll(containerRef);

    return (
        <section id="home-office" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-slate-900/50">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-slate-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Briefcase className="w-3 h-3" />
                            Productivity Audit
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic pr-4">
                            Productividad <span className="inline-block text-neon-cyan neon-text-cyan pr-6 pb-1">Bajo</span> <br />
                            <span className="text-white">Análisis</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-400 max-w-md text-sm leading-relaxed"
                    >
                        Analizamos la estabilidad bajo carga masiva. Selecciona los planes con mejor desempeño en videoconferencias y multitarea según nuestras auditorías en Teziutlán.
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
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-neon-cyan/20 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all shadow-2xl group/btn"
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
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/30 transition-all shadow-2xl group/btn"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div
                    ref={containerRef}
                    {...dragHandlers}
                    className="flex overflow-x-auto gap-8 px-6 pt-10 pb-8 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth select-none"
                >
                    {/* Spacer for centering logic */}
                    <div className="min-w-[5vw] h-1 md:block hidden" />

                    {homeOfficePlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="min-w-[300px] md:min-w-[380px] snap-center py-4"
                        >
                            <GlassCard
                                className={`h-full border-white/5 relative group hover:border-${plan.color === 'cyan' ? 'neon-cyan' : 'white'}/30 transition-all duration-500 !overflow-visible`}
                                hoverEffect={true}
                            >
                                {plan.recommendation && (
                                    <div className={`absolute -top-3 right-6 z-20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-xl
                                        ${plan.color === 'cyan' ? 'bg-black border-neon-cyan text-neon-cyan' : 'bg-black border-white text-white'}
                                    `}>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            {plan.recommendation}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl bg-${plan.color === 'cyan' ? 'neon-cyan' : 'white'}/10 border border-white/5`}>
                                        <div className={`text-${plan.color === 'cyan' ? 'neon-cyan' : 'white'}`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">{plan.category}</span>
                                </div>

                                <h3 className="text-2xl font-black mb-1 group-hover:text-neon-cyan transition-colors">{plan.provider}</h3>
                                <p className="text-neon-cyan text-xs font-bold mb-6 tracking-tight uppercase">{plan.speed}</p>

                                <ul className="space-y-4 mb-10 min-h-[160px]">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group/item">
                                            <Shield className={`w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110 ${plan.color === 'cyan' ? 'text-neon-cyan' : 'text-slate-500'}`} />
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
                                        onClick={() => openCategoryModal("HomeOffice", plan.provider)}
                                        variant={plan.color === "cyan" ? "cyan" : "white"}
                                        className="!py-2.5 !px-5 text-[10px]"
                                    >
                                        Upgrade Now
                                    </NeonButton>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}

                    {/* Spacer for centering logic */}
                    <div className="min-w-[5vw] h-1 md:block hidden" />
                </div>
            </div>

            {/* Modern Carousel Controls & Provider Pills */}
            <PlanCarouselControls
                containerRef={containerRef}
                labels={homeOfficePlans.map((p) => p.provider.replace(/ Home & Business| Home Office| Internet en Casa| Infinitum/gi, ""))}
                scrollXProgress={scrollXProgress}
                accent="cyan"
            />

            {/* Comparison Grid Area - Home Office Focus */}
            <div className="container mx-auto px-6 mt-24">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Video className="w-4 h-4 text-neon-cyan" /> Ganador profesional
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Totalplay Home & Business</span> ofrece simetría XGS-PON para videollamadas fluidas desde $460 MXN.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Smartphone className="w-4 h-4 text-white" /> Ganador Balanceado
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Telcel Internet en Casa</span> es ideal para zonas sin fibra o como respaldo inmediato desde $399 MXN.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Users className="w-4 h-4 text-neon-cyan" /> Ganador Básico
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Impactel/Cablecom</span> garantizan la conexión necesaria para labores administrativas al precio más bajo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
