"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Tv, Wifi, Phone, Zap, Play, ChevronRight } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { useModal } from "../ModalProvider";

const bundles = [
    {
        title: "Duo Power",
        services: ["TV", "INTERNET"],
        price: "$55",
        features: ["180+ Canales HD", "500 Mbps Fibra", "Smart Box 4K", "WiFi 6 Incluido"],
        badge: "Más Popular",
        color: "cyan"
    },
    {
        title: "Solo Fibra",
        services: ["INTERNET"],
        price: "$35",
        features: ["500 Mbps Simétricos", "Latencia Ultra Baja", "Instalación Gratis", "Soporte 24/7"],
        color: "white"
    },
    {
        title: "Triple Play Elite",
        services: ["TV", "INTERNET", "PHONE"],
        price: "$65",
        features: ["220+ Canales Premium", "1 GBps Fibra", "Llamadas Ilimitadas", "HbO Max Incluido"],
        badge: "Más Valor",
        color: "magenta"
    },
    {
        title: "Solo TV",
        services: ["TV"],
        price: "$25",
        features: ["180 Canales Base", "Calidad HD/4K", "Grabación en Nube", "Control por Voz"],
        color: "white"
    }
];

const categories = ["Todos", "Películas", "Series", "Crimen", "MTV / Reality", "Música", "Infantil", "Estilo de Vida"];

const channelList = [
    // PELÍCULAS
    { id: 100, name: "Pluto TV Cine Estelar", url: "https://pluto.tv/latam/live-tv/100", category: "Películas", logo: "STELLAR" },
    { id: 105, name: "Pluto TV Cine Acción", url: "https://pluto.tv/latam/live-tv/105", category: "Películas", logo: "ACTION" },
    { id: 110, name: "Pluto TV Sci-Fi", url: "https://pluto.tv/latam/live-tv/110", category: "Películas", logo: "SCIFI" },
    { id: 115, name: "Pluto TV Thrillers", url: "https://pluto.tv/latam/live-tv/115", category: "Películas", logo: "THRILL" },
    { id: 120, name: "Pluto TV Cine Romántico", url: "https://pluto.tv/latam/live-tv/120", category: "Películas", logo: "ROMANCE" },
    { id: 125, name: "Pluto TV Cine Drama", url: "https://pluto.tv/latam/live-tv/125", category: "Películas", logo: "DRAMA" },
    { id: 130, name: "Pluto TV Cine Comedia", url: "https://pluto.tv/latam/live-tv/130", category: "Películas", logo: "COMEDY" },
    { id: 135, name: "Pluto TV Cine Latino", url: "https://pluto.tv/latam/live-tv/135", category: "Películas", logo: "LATINO" },

    // SERIES
    { id: 200, name: "Pluto TV Series", url: "https://pluto.tv/latam/live-tv/200", category: "Series", logo: "SERIES" },
    { id: 203, name: "Andrómeda", url: "https://pluto.tv/latam/live-tv/203", category: "Series", logo: "ANDROM" },
    { id: 205, name: "Las reglas del juego", url: "https://pluto.tv/latam/live-tv/205", category: "Series", logo: "RULES" },
    { id: 210, name: "Los asesinatos de Midsomer", url: "https://pluto.tv/latam/live-tv/210", category: "Series", logo: "MURDER" },
    { id: 220, name: "Mutante X", url: "https://pluto.tv/latam/live-tv/220", category: "Series", logo: "MUTANT" },

    // CRIMEN & DOCUMENTALES
    { id: 600, name: "Archivos Forenses", url: "https://pluto.tv/latam/live-tv/600", category: "Crimen", logo: "FORENS" },
    { id: 602, name: "Investiga", url: "https://pluto.tv/latam/live-tv/602", category: "Crimen", logo: "INVEST" },
    { id: 605, name: "Los nuevos detectives", url: "https://pluto.tv/latam/live-tv/605", category: "Crimen", logo: "DETECT" },
    { id: 610, name: "Los archivos del FBI", url: "https://pluto.tv/latam/live-tv/610", category: "Crimen", logo: "FBI" },

    // MTV / REALITY / ENTRETENIMIENTO
    { id: 300, name: "MTV Originals", url: "https://pluto.tv/latam/live-tv/300", category: "MTV / Reality", logo: "MTV" },
    { id: 305, name: "MTV Catfish", url: "https://pluto.tv/latam/live-tv/305", category: "MTV / Reality", logo: "CATFISH" },
    { id: 307, name: "Teen Mom", url: "https://pluto.tv/latam/live-tv/307", category: "MTV / Reality", logo: "TEEN" },
    { id: 315, name: "MTV Cribs", url: "https://pluto.tv/latam/live-tv/315", category: "MTV / Reality", logo: "CRIBS" },
    { id: 335, name: "Embarazada a los 16", url: "https://pluto.tv/latam/live-tv/335", category: "MTV / Reality", logo: "16PREG" },

    // MÚSICA
    { id: 50, name: "MTV Hits", url: "https://pluto.tv/latam/live-tv/50", category: "Música", logo: "HITS" },
    { id: 750, name: "VH1 Clásico", url: "https://pluto.tv/latam/live-tv/750", category: "Música", logo: "VH1" },
    { id: 752, name: "MTV Love Music", url: "https://pluto.tv/latam/live-tv/752", category: "Música", logo: "LOVE" },
    { id: 755, name: "Clubbing TV", url: "https://pluto.tv/latam/live-tv/755", category: "Música", logo: "CLUB" },

    // INFANTIL
    { id: 900, name: "Bob Esponja", url: "https://pluto.tv/latam/live-tv/900", category: "Infantil", logo: "SPONGE" },
    { id: 902, name: "Big Time Rush", url: "https://pluto.tv/latam/live-tv/902", category: "Infantil", logo: "BTR" },
    { id: 905, name: "Animakids", url: "https://pluto.tv/latam/live-tv/905", category: "Infantil", logo: "KIDS" },
    { id: 910, name: "Pluto TV Kids", url: "https://pluto.tv/latam/live-tv/910", category: "Infantil", logo: "PLUTO" },
    { id: 915, name: "Las pistas de Blue", url: "https://pluto.tv/latam/live-tv/915", category: "Infantil", logo: "BLUE" },

    // ESTILO DE VIDA
    { id: 700, name: "Cocina Pluto TV", url: "https://pluto.tv/latam/live-tv/700", category: "Estilo de Vida", logo: "CHEF" },
];

export const TVSection = () => {
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [channels, setChannels] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const { openModal, openPlayerModal } = useModal();

    useEffect(() => {
        // Enriquecer la lista con datos simulados de programa actual
        const enrichedChannels = channelList.map(ch => ({
            ...ch,
            currentShow: [
                "Transmisión Especial",
                "Maratón de Temporada",
                "Lo Mejor de la Semana",
                "Estreno Exclusivo",
                "Cine FiberGravity",
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
        <section id="television" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6"
                    >
                        Entretenimiento <span className="text-neon-magenta neon-text-magenta">sin límites</span>
                    </motion.h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Combinamos la potencia de nuestra fibra óptica con la mejor programación en alta definición. Elige el plan que mejor se adapte a tu ritmo.
                    </p>
                </div>

                {/* Bundles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 overflow-visible">
                    {bundles.map((bundle, i) => (
                        <div key={i}>
                            <GlassCard
                                className={`relative group h-full flex flex-col pt-8 ${bundle.badge ? "!overflow-visible border-neon-cyan/30" : "border-white/5"}`}
                            >
                                {bundle.badge && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                                        <div className={`
                                            px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] 
                                            whitespace-nowrap border backdrop-blur-xl shadow-2xl transition-all duration-300
                                            group-hover:-translate-y-1
                                            ${bundle.color === 'magenta'
                                                ? 'bg-neon-magenta/20 border-neon-magenta/40 text-neon-magenta shadow-neon-magenta/20 neon-glow-magenta'
                                                : 'bg-neon-cyan/20 border-neon-cyan/40 text-neon-cyan shadow-neon-cyan/20 neon-glow-cyan'}
                                        `}>
                                            <span className="relative z-10">{bundle.badge}</span>
                                            <div className={`absolute inset-0 rounded-full opacity-20 animate-pulse ${bundle.color === 'magenta' ? 'bg-neon-magenta' : 'bg-neon-cyan'}`} />
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-2 mb-4 justify-center">
                                    {bundle.services.map(s => (
                                        <div key={s} className="p-2 bg-white/5 rounded-lg">
                                            {s === "TV" && <Tv className="w-5 h-5 text-neon-magenta" />}
                                            {s === "INTERNET" && <Wifi className="w-5 h-5 text-neon-cyan" />}
                                            {s === "PHONE" && <Phone className="w-5 h-5 text-white" />}
                                        </div>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-1">{bundle.title}</h3>
                                <div className="text-3xl font-black mb-6">
                                    {bundle.price}<span className="text-sm font-normal text-slate-500">/mes</span>
                                </div>

                                <ul className="space-y-4 mb-8">
                                    {bundle.features.map((f, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                                            <Zap className="w-3 h-3 text-neon-cyan" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <NeonButton
                                    onClick={() => openModal(bundle.title)}
                                    variant={bundle.color === "magenta" ? "magenta" : "cyan"}
                                    className="w-full text-xs py-2"
                                >
                                    Contratar
                                </NeonButton>
                            </GlassCard>
                        </div>
                    ))}
                </div>

                {/* EPG / Channel Guide */}
                <div className="mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                        <div>
                            <h3 className="text-3xl font-black mb-2 flex items-center gap-3">
                                <Play className="text-neon-cyan fill-current" />
                                Guía de Canales
                            </h3>
                            <p className="text-slate-500">Programación en tiempo real para hoy</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                                        ? "bg-neon-cyan text-black"
                                        : "bg-white/5 text-slate-400 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <GlassCard className="!p-0 border-white/5 relative" hoverEffect={false}>
                        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 border-b border-white/5 bg-white/5 p-4 text-[10px] font-black uppercase tracking-widest text-slate-500 sticky top-0 z-20 backdrop-blur-md">
                            <div className="col-span-1">Canal</div>
                            <div className="hidden md:block md:col-span-2 lg:col-span-3">Programación Actual</div>
                            <div className="hidden lg:block lg:col-span-1">Categoría</div>
                            <div className="md:text-right">Acción</div>
                        </div>

                        <div
                            ref={scrollRef}
                            className="max-h-[600px] overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10"
                            style={{ scrollBehavior: 'smooth' }}
                        >
                            {filteredChannels.map((channel) => (
                                <div
                                    key={`${channel.id}-${channel.name}`}
                                    className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 items-center p-4 border-b border-white/5 hover:bg-white/5 transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-xs font-bold text-slate-500 w-8">{channel.id}</span>
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-black border border-white/10 flex items-center justify-center text-[8px] font-black group-hover:border-neon-cyan transition-colors">
                                            {channel.logo}
                                        </div>
                                        <span className="font-bold text-sm">{channel.name}</span>
                                    </div>

                                    <div className="hidden md:flex md:col-span-2 lg:col-span-3 flex-col gap-2">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <span className="text-sm font-medium text-white group-hover:text-neon-cyan transition-colors tracking-tight">
                                                {channel.currentShow}
                                            </span>
                                            <span className="text-[10px] text-slate-500">{channel.progress}% completado</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${channel.progress}%` }}
                                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-magenta"
                                            />
                                        </div>
                                        <span className="text-[10px] text-slate-500 italic">Sigue: {channel.nextShow}</span>
                                    </div>

                                    <div className="hidden lg:block lg:col-span-1">
                                        <span className="px-2 py-1 rounded bg-white/5 text-[10px] text-slate-500 uppercase font-bold">
                                            {channel.category}
                                        </span>
                                    </div>

                                    <div className="flex md:justify-end gap-4 mt-4 md:mt-0">
                                        <button
                                            onClick={() => openPlayerModal(channel.name, channel.url)}
                                            className="flex items-center gap-2 text-xs font-bold text-neon-cyan hover:neon-text-cyan transition-all"
                                        >
                                            VER AHORA <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Shadow overlay to indicate more content */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-20" />
                    </GlassCard>

                    <div className="mt-8 flex justify-center">
                        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                                Transmisión Local Activa
                            </span>
                            <div className="w-px h-4 bg-white/10" />
                            <span>Contenido Premium vía Pluto TV</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
