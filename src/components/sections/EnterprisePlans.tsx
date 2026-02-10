"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { Building2, Zap, Globe, Smartphone, Users, ChevronRight, Star, Shield, Briefcase, BarChart3, Truck } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const enterprisePlans = [
    {
        category: "CORPORATIVOS / EMPRESAS GRANDES",
        provider: "Totalplay Negocios",
        speed: "150 – 250 Mbps Simétricos",
        features: [
            "Fibra XGS-PON con Internet Seguro",
            "Página web y Tienda en línea incluida",
            "Gestión en la nube y WiFi Pro",
            "Infraestructura digital completa"
        ],
        price: "$450 – $650",
        recommendation: "INFRAESTRUCTURA TOTAL",
        color: "cyan",
        icon: <Building2 className="w-8 h-8" />
    },
    {
        category: "CORPORATIVOS / EMPRESAS GRANDES",
        provider: "Telmex Negocios",
        speed: "80 – 150 Mbps Infinitum",
        features: [
            "Telefonía ilimitada y Correo Empresarial",
            "Publicidad en Sección Amarilla",
            "Antivirus y Almacenamiento en la Nube",
            "Netflix, Disney+ y HBO Max Premium"
        ],
        price: "$399 – $549",
        recommendation: "ESTABILIDAD Y VALOR AGREGADO",
        color: "white",
        icon: <Shield className="w-8 h-8" />
    },
    {
        category: "PyMEs / OFICINAS PEQUEÑAS",
        provider: "Megacable Empresas",
        speed: "100 – 300 Mbps Simétricos",
        features: [
            "Dominio web y Cuentas de correo ilimitadas",
            "Módulo de Facturación Electrónica",
            "Telefonía fija ilimitada + Protección",
            "Equilibrio perfecto precio/rendimiento"
        ],
        price: "$350 – $550",
        recommendation: "IDEAL PARA CRECIMIENTO",
        color: "cyan",
        icon: <BarChart3 className="w-8 h-8" />
    },
    {
        category: "PyMEs / OFICINAS PEQUEÑAS",
        provider: "Cablecom Empresas",
        speed: "100 – 300 Mbps Estables",
        features: [
            "Combo Internet + TV Corporativa",
            "Facturación electrónica incluida",
            "Cuentas de correo empresarial",
            "Telefonía fija de alto rendimiento"
        ],
        price: "$350 – $550",
        recommendation: "SOLUCIÓN COMPETITIVA PyME",
        color: "white",
        icon: <Briefcase className="w-8 h-8" />
    },
    {
        category: "MOVILIDAD Y LOGÍSTICA",
        provider: "Telcel Internet Empresa",
        speed: "Planes 2GB – 60GB 5G",
        features: [
            "Movilidad total para equipos en campo",
            "Redes sociales ilimitadas para ventas",
            "Conexión constante en movimiento",
            "Planes flexibles según necesidad"
        ],
        price: "$149 – $1,219",
        recommendation: "LÍDER EN MOVILIDAD",
        color: "cyan",
        icon: <Truck className="w-8 h-8" />
    },
    {
        category: "BAJO PRESUPUESTO",
        provider: "Impactel Negocios",
        speed: "Internet + TV Básico",
        features: [
            "La inversión más baja del mercado",
            "Ideal para oficinas con bajo consumo",
            "Conexión básica funcional 24/7",
            "Sin cargos extras por servicios pro"
        ],
        price: "$280 – $500",
        recommendation: "ECONOMÍA EMPRESARIAL",
        color: "white",
        icon: <Users className="w-8 h-8" />
    }
];

export const EnterprisePlans = () => {
    const { openModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: containerRef });

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-900/50 to-black">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-slate-400/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <Building2 className="w-3 h-3" />
                            B2B Connectivity Expert
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic pr-4">
                            Consultoría <span className="text-neon-cyan neon-text-cyan pr-2">Corporativa</span> <br />
                            <span className="text-white">Especializada</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-400 max-w-md text-sm leading-relaxed"
                    >
                        Tu empresa requiere certezas. Comparamos niveles de servicio (SLA) y capacidad de escalabilidad para conectarte con el proveedor que garantice tu operación 24/7.
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
                    className="flex overflow-x-auto gap-8 px-6 pt-10 pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
                >
                    {/* Spacer for centering logic */}
                    <div className="min-w-[5vw] h-1 md:block hidden" />

                    {enterprisePlans.map((plan, i) => (
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
                                        onClick={() => openModal(plan.provider)}
                                        variant={plan.color === "cyan" ? "cyan" : "white"}
                                        className="!py-2.5 !px-5 text-[10px]"
                                    >
                                        Empower Now
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
                        className="h-full bg-gradient-to-r from-sky-400 to-slate-400 origin-left"
                    />
                </div>
            </div>

            {/* Comparison Grid Area - Business Focus */}
            <div className="container mx-auto px-6 mt-24">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Building2 className="w-4 h-4 text-neon-cyan" /> Ganador Corporativo
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Totalplay Negocios</span> domina el sector corporativo con infraestructura XGS-PON y servicios digitales 360°.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <BarChart3 className="w-4 h-4 text-white" /> Ganador PyME
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Megacable Empresas</span> ofrece el mejor valor en servicios de facturación y correos ilimitados para oficinas en crecimiento.
                        </p>
                    </div>
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <h4 className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white mb-4">
                            <Truck className="w-4 h-4 text-neon-cyan" /> Ganador Logística
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            <span className="text-white font-bold">Telcel Empresa</span> es imbatible para fuerzas de ventas y personal en campo gracias a su cobertura 5G nacional.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
