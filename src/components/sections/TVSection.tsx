"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Tv, Wifi, Phone, Zap, Play, ChevronRight, Star, Shield, Home, Users, Heart } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const tvBundlePlans = [
    {
        category: "HOGARES ALTA DEMANDA (FAMILIAS / 4K)",
        provider: "Totalplay Triple Play",
        speed: "150 – 500 Mbps + Totalplay TV 4K",
        features: [
            "150M + TV desde $718 • 250M + TV $779 • 500M $999",
            "Decodificador 4K con 80 a 280+ canales HD",
            "Internet simétrico por fibra XGS-PON + telefonía",
            "App Totalplay TV y add-ons de Netflix / Max / Disney+"
        ],
        price: "$718 – $999",
        recommendation: "ESTABILIDAD 4K SIMÉTRICA",
        color: "cyan",
        icon: <Zap className="w-8 h-8" />
    },
    {
        category: "ENTRETENIMIENTO TOTAL",
        provider: "Megacable Triple Pack",
        speed: "200 – 500 Mbps + Xview+",
        features: [
            "Desde $430 (200M promo) hasta $800 MXN (500M)",
            "Xview+ interactivo con +80 canales HD y VOD",
            "Amazon Prime / Netflix / Max según paquete",
            "Telefonía ilimitada + descuento por domiciliación"
        ],
        price: "$430 – $800",
        recommendation: "ENTRETENIMIENTO TOTAL",
        color: "magenta",
        icon: <Tv className="w-8 h-8" />
    },
    {
        category: "EL REY DEL CABLE Y STREAMING",
        provider: "izzi Internet + izzi tv+",
        speed: "100 – 200 Mbps + 100–200 Canales",
        features: [
            "100M + TV desde $499 • 150M $639 • 200M $720 MXN",
            "ViX Premium + Max / Disney+ / Apple TV (promo 12m)",
            "App izzi go para ver TV en vivo desde tu celular",
            "Opción Cuádruple Play con izzi móvil desde $699"
        ],
        price: "$499 – $720",
        recommendation: "MÁS STREAMING INCLUIDO",
        color: "white",
        icon: <Users className="w-8 h-8" />
    },
    {
        category: "INTERNET + PLATAFORMAS",
        provider: "Telmex Infinitum + Streaming",
        speed: "150 – 500 Mbps Simétricos",
        features: [
            "150M $435 • 250M $499 • 500M $649 MXN/mes",
            "Claro Video incluido sin costo adicional",
            "Agrega Netflix, Max o Disney+ en el mismo recibo",
            "Llamadas ilimitadas a México, EE.UU. y Canadá"
        ],
        price: "$435 – $649",
        recommendation: "CINE Y SERIES EN TU RECIBO",
        color: "cyan",
        icon: <Play className="w-8 h-8" />
    },
    {
        category: "HOGARES BÁSICOS (ECONOMÍA)",
        provider: "Cablecom Estándar",
        speed: "100 – 300 Mbps + TV Digital",
        features: [
            "Combo Internet + TV Esencial desde $350 MXN",
            "Paquetes Plus 300M hasta $550 MXN/mes",
            "Telefonía incluida y módem Dual Band",
            "Excelente relación calidad/precio regional"
        ],
        price: "$350 – $550",
        recommendation: "ESENCIAL AL MEJOR PRECIO",
        color: "cyan",
        icon: <Home className="w-8 h-8" />
    },
    {
        category: "HOGARES BÁSICOS (ECONOMÍA)",
        provider: "Impactel TV & Internet",
        speed: "Elige tu modalidad local",
        features: [
            "🌐 Solo Internet: $280 MXN mensuales",
            "📺 TV + Internet: $500 MXN mensuales",
            "Señal regional 100% estable sin plazos forzosos",
            "Más de 100 canales hasta en 4 Televisiones"
        ],
        price: "$280 o $500",
        recommendation: "DÚO DE AHORRO",
        color: "white",
        icon: <Heart className="w-8 h-8" />
    }
];

const categories = ["Todos", "Películas", "Series", "Crimen", "MTV / Reality", "Música", "Infantil", "Estilo de Vida"];

const channelList = [
    { id: 100, name: "Pluto TV Cine Estelar", url: "https://pluto.tv/latam/live-tv/100", category: "Películas", logo: "STELLAR" },
    { id: 105, name: "Pluto TV Cine Acción", url: "https://pluto.tv/latam/live-tv/105", category: "Películas", logo: "ACTION" },
    { id: 110, name: "Pluto TV Sci-Fi", url: "https://pluto.tv/latam/live-tv/110", category: "Películas", logo: "SCIFI" },
    { id: 115, name: "Pluto TV Thrillers", url: "https://pluto.tv/latam/live-tv/115", category: "Películas", logo: "THRILL" },
    { id: 120, name: "Pluto TV Cine Romántico", url: "https://pluto.tv/latam/live-tv/120", category: "Películas", logo: "ROMANCE" },
    { id: 125, name: "Pluto TV Cine Drama", url: "https://pluto.tv/latam/live-tv/125", category: "Películas", logo: "DRAMA" },
    { id: 130, name: "Pluto TV Cine Comedia", url: "https://pluto.tv/latam/live-tv/130", category: "Películas", logo: "COMEDY" },
    { id: 135, name: "Pluto TV Cine Latino", url: "https://pluto.tv/latam/live-tv/135", category: "Películas", logo: "LATINO" },
    { id: 200, name: "Pluto TV Series", url: "https://pluto.tv/latam/live-tv/200", category: "Series", logo: "SERIES" },
    { id: 203, name: "Andrómeda", url: "https://pluto.tv/latam/live-tv/203", category: "Series", logo: "ANDROM" },
    { id: 205, name: "Las reglas del juego", url: "https://pluto.tv/latam/live-tv/205", category: "Series", logo: "RULES" },
    { id: 210, name: "Los asesinatos de Midsomer", url: "https://pluto.tv/latam/live-tv/210", category: "Series", logo: "MURDER" },
    { id: 220, name: "Mutante X", url: "https://pluto.tv/latam/live-tv/220", category: "Series", logo: "MUTANT" },
    { id: 600, name: "Archivos Forenses", url: "https://pluto.tv/latam/live-tv/600", category: "Crimen", logo: "FORENS" },
    { id: 602, name: "Investiga", url: "https://pluto.tv/latam/live-tv/602", category: "Crimen", logo: "INVEST" },
    { id: 605, name: "Los nuevos detectives", url: "https://pluto.tv/latam/live-tv/605", category: "Crimen", logo: "DETECT" },
    { id: 610, name: "Los archivos del FBI", url: "https://pluto.tv/latam/live-tv/610", category: "Crimen", logo: "FBI" },
    { id: 300, name: "MTV Originals", url: "https://pluto.tv/latam/live-tv/300", category: "MTV / Reality", logo: "MTV" },
    { id: 305, name: "MTV Catfish", url: "https://pluto.tv/latam/live-tv/305", category: "MTV / Reality", logo: "CATFISH" },
    { id: 307, name: "Teen Mom", url: "https://pluto.tv/latam/live-tv/307", category: "MTV / Reality", logo: "TEEN" },
    { id: 315, name: "MTV Cribs", url: "https://pluto.tv/latam/live-tv/315", category: "MTV / Reality", logo: "CRIBS" },
    { id: 335, name: "Embarazada a los 16", url: "https://pluto.tv/latam/live-tv/335", category: "MTV / Reality", logo: "16PREG" },
    { id: 50, name: "MTV Hits", url: "https://pluto.tv/latam/live-tv/50", category: "Música", logo: "HITS" },
    { id: 750, name: "VH1 Clásico", url: "https://pluto.tv/latam/live-tv/750", category: "Música", logo: "VH1" },
    { id: 752, name: "MTV Love Music", url: "https://pluto.tv/latam/live-tv/752", category: "Música", logo: "LOVE" },
    { id: 755, name: "Clubbing TV", url: "https://pluto.tv/latam/live-tv/755", category: "Música", logo: "CLUB" },
    { id: 900, name: "Bob Esponja", url: "https://pluto.tv/latam/live-tv/900", category: "Infantil", logo: "SPONGE" },
    { id: 902, name: "Big Time Rush", url: "https://pluto.tv/latam/live-tv/902", category: "Infantil", logo: "BTR" },
    { id: 905, name: "Animakids", url: "https://pluto.tv/latam/live-tv/905", category: "Infantil", logo: "KIDS" },
    { id: 910, name: "Pluto TV Kids", url: "https://pluto.tv/latam/live-tv/910", category: "Infantil", logo: "PLUTO" },
    { id: 915, name: "Las pistas de Blue", url: "https://pluto.tv/latam/live-tv/915", category: "Infantil", logo: "BLUE" },
    { id: 700, name: "Cocina Pluto TV", url: "https://pluto.tv/latam/live-tv/700", category: "Estilo de Vida", logo: "CHEF" },
];

export const TVSection = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [channels, setChannels] = useState<any[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { scrollXProgress } = useScroll({ container: carouselRef });
    const { openCategoryModal, openPlayerModal } = useModal();

    useEffect(() => {
        const enrichedChannels = channelList.map(ch => ({
            ...ch,
            currentShow: [
                "Transmisión Especial",
                "Maratón de Temporada",
                "Lo Mejor de la Semana",
                "Estreno Exclusivo",
                "Cine Fiberlink Play",
                "Contenido Premium"
            ][Math.floor(Math.random() * 6)],
            nextShow: "Gran Estreno: 20:00 hrs",
            progress: Math.floor(Math.random() * 80) + 10
        }));
        setChannels(enrichedChannels);
    }, []);

    const filteredChannels = activeCategory === "Todos"
        ? channels
        : channels.filter(c => c.category === activeCategory);

    return (
        <section id="television" className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-slate-900/50">
            {/* Background Effects */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-magenta/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-magenta/30 bg-neon-magenta/10 text-neon-magenta text-[10px] font-black uppercase tracking-widest mb-4 mx-auto md:mx-0">
                            <Tv className="w-3 h-3" />
                            Paquetes combinados
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic pr-4">
                            Internet + <span className="inline-block text-neon-magenta neon-text-magenta pr-6 pb-1">TV de Cable</span> <br />
                            <span className="text-white">Seleccionados para ti</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-slate-400 max-w-md text-sm leading-relaxed mx-auto md:mx-0"
                    >
                        Maximizamos tu inversión en ocio. Comparamos los mejores paquetes de TV e Internet para encontrar el equilibrio perfecto entre apps de streaming, canales HD y velocidad real.
                    </motion.p>
                </div>
            </div>

            {/* Horizontal Carousel of TV Plans */}
            <div className="relative group/carousel mb-32">
                {/* Desktop Navigation Buttons */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 z-40 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
                    <button
                        onClick={() => {
                            if (carouselRef.current) carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                        }}
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-neon-magenta/20 hover:border-neon-magenta/50 hover:text-neon-magenta transition-all shadow-2xl group/btn"
                        aria-label="Anterior"
                    >
                        <ChevronRight className="w-8 h-8 rotate-180 group-hover/btn:-translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 z-40 hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-500">
                    <button
                        onClick={() => {
                            if (carouselRef.current) carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                        }}
                        className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-neon-magenta/20 hover:border-neon-magenta/50 hover:text-neon-magenta transition-all shadow-2xl group/btn"
                        aria-label="Siguiente"
                    >
                        <ChevronRight className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div
                    ref={carouselRef}
                    className="flex overflow-x-auto gap-8 px-6 pt-10 pb-12 snap-x snap-mandatory no-scrollbar cursor-grab active:cursor-grabbing scroll-smooth"
                >
                    <div className="min-w-[5vw] h-1 md:block hidden" />

                    {tvBundlePlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="min-w-[300px] md:min-w-[380px] snap-center py-4"
                        >
                            <GlassCard
                                className={`h-full border-white/5 relative group hover:border-${plan.color === 'magenta' ? 'neon-magenta' : plan.color === 'cyan' ? 'neon-cyan' : 'white'}/30 transition-all duration-500 !overflow-visible`}
                                hoverEffect={true}
                            >
                                {plan.recommendation && (
                                    <div className={`absolute -top-3 right-6 z-20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border shadow-xl
                                        ${plan.color === 'magenta' ? 'bg-black border-neon-magenta text-neon-magenta shadow-neon-magenta/20' :
                                            plan.color === 'cyan' ? 'bg-black border-neon-cyan text-neon-cyan shadow-neon-cyan/20' :
                                                'bg-black border-white text-white'}
                                    `}>
                                        <span className="flex items-center gap-1">
                                            <Star className="w-2.5 h-2.5 fill-current" />
                                            {plan.recommendation}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl bg-${plan.color === 'magenta' ? 'neon-magenta' : plan.color === 'cyan' ? 'neon-cyan' : 'white'}/10 border border-white/5`}>
                                        <div className={`text-${plan.color === 'magenta' ? 'neon-magenta' : plan.color === 'cyan' ? 'neon-cyan' : 'white'}`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 block max-w-[180px] text-right leading-tight">
                                        {plan.category}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-black mb-1 group-hover:text-neon-magenta transition-colors">{plan.provider}</h3>
                                <p className="text-neon-cyan text-xs font-bold mb-6 tracking-tight uppercase">{plan.speed}</p>

                                <ul className="space-y-4 mb-10 min-h-[160px]">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-3 group/item">
                                            <Shield className={`w-4 h-4 mt-0.5 shrink-0 transition-transform group-hover/item:scale-110 ${plan.color === 'magenta' ? 'text-neon-magenta' : 'text-slate-500'}`} />
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
                                        onClick={() => openCategoryModal("TV", plan.provider)}
                                        variant={plan.color === "magenta" ? "magenta" : plan.color === "cyan" ? "cyan" : "white"}
                                        className="!py-2.5 !px-5 text-[10px]"
                                    >
                                        Disfrutar Ahora
                                    </NeonButton>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}

                    <div className="min-w-[5vw] h-1 md:block hidden" />
                </div>
            </div>

            {/* Bundle Plans Section is enough for now */}
            <div className="mt-12 flex justify-center pb-24">
                <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse shadow-[0_0_10px_rgba(255,0,255,0.5)]" />
                        Señal Digital Estabilidad 99.9%
                    </span>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-neon-cyan">Fiberlink Play Streaming</span>
                </div>
            </div>
        </section>
    );
};
