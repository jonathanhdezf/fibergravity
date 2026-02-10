"use client";

import { motion } from "framer-motion";
import { Play, Tv, Info, ArrowLeft, ExternalLink, Monitor, Globe, ShieldCheck, Apple, Smartphone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { ModalProvider, useModal } from "@/components/ModalProvider";

const featuredChannels = [
    { name: "Pluto TV Cine Estelar", category: "Películas", id: "5ed53be386ed0b0007804473" },
    { name: "Pluto TV Acción", category: "Acción", id: "5ed53bfb17e42f0007208d13" },
    { name: "Pluto TV Fútbol", category: "Deportes", id: "5f3a0a4c2f4a4c00073e04ed" },
    { name: "Pluto TV Noticias", category: "Noticias", id: "5ed53c0a5b8f720007c030d9" },
    { name: "Nick Clásico", category: "Infantil", id: "5ed53c1b17e42f0007208d14" },
    { name: "MasterChef Pluto TV", category: "Reality", id: "5ed53c2a86ed0b0007804474" }
];

const StreamingClientPage = () => {
    const { openPlayerModal } = useModal();

    return (
        <main className="min-h-screen bg-[#020617]">
            <Navbar />

            <section className="pt-32 pb-24 relative overflow-hidden">
                {/* Visual Background Effects */}
                <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-neon-magenta/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-neon-cyan/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Volver al Inicio
                    </Link>

                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Play className="w-3.5 h-3.5 animate-pulse fill-current" />
                                On-Demand & Live
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black italic mb-8">
                                Streaming <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan pr-6 pb-2">Sin Costo</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
                                Mira una variedad de canales de TV en vivo gratuitos, con noticias, deportes, programas favoritos de los fanáticos, películas y más. Transmita ahora en <span className="text-white font-bold">Pluto TV</span> directamente desde nuestra plataforma optimizada.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <NeonButton
                                    onClick={() => openPlayerModal("Pluto TV Latino", "https://pluto.tv/latam/live-tv/")}
                                    variant="magenta"
                                    className="!px-10 !py-5 text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(255,0,255,0.2)]"
                                >
                                    Ver Todo en Vivo
                                </NeonButton>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-[-20px] bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                            <GlassCard className="relative aspect-video overflow-hidden border-white/10 shadow-2xl !p-0 rounded-[32px]">
                                <img
                                    src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=2070"
                                    alt="Streaming Experience"
                                    className="w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => openPlayerModal("Pluto TV", "https://pluto.tv/latam/live-tv/")}
                                        className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center group/play"
                                    >
                                        <Play className="w-8 h-8 text-white group-hover:text-neon-cyan transition-colors fill-current" />
                                    </motion.button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>

                    {/* Featured List */}
                    <div className="mb-24">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-black italic">Canales Destacados</h2>
                            <div className="hidden md:flex gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <Monitor className="w-4 h-4" /> Multi-Plataforma
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredChannels.map((channel, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <GlassCard
                                        className="group hover:border-neon-cyan/30 transition-all duration-500 cursor-pointer"
                                        hoverEffect={true}
                                        onClick={() => openPlayerModal(channel.name, `https://pluto.tv/latam/live-tv/${channel.id}`)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/20 transition-all">
                                                <Tv className="w-6 h-6 text-slate-400 group-hover:text-neon-cyan" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-white group-hover:text-neon-cyan transition-colors">{channel.name}</h3>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{channel.category}</span>
                                            </div>
                                            <div className="p-2 rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Play className="w-3 h-3 text-neon-cyan fill-current" />
                                            </div>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Features HUD */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Globe className="w-6 h-6" />, title: "Acceso Global", desc: "Todo el contenido de Pluto TV disponible sin restricciones regionales en FiberGravity." },
                            { icon: <ShieldCheck className="w-6 h-6" />, title: "Seguro & Legal", desc: "Plataforma 100% legal y segura, sin necesidad de suscripciones o registros." },
                            { icon: <Info className="w-6 h-6" />, title: "Guía Integrada", desc: "Consulta la programación en tiempo real desde nuestra terminal de visualización." }
                        ].map((feat, i) => (
                            <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                                <div className="text-neon-cyan mb-4">{feat.icon}</div>
                                <h4 className="text-lg font-bold mb-2 uppercase tracking-tight">{feat.title}</h4>
                                <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Official Apps Downloads */}
                    <div className="mt-32 pt-20 border-t border-white/5">
                        <div className="text-center mb-16 px-4">
                            <h2 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">Lleva el Streaming Contigo</h2>
                            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                                Como parte de nuestro compromiso con la <span className="text-white font-bold">neutralidad tecnológica</span>, facilitamos el acceso a las aplicaciones oficiales para que disfrutes de contenido gratuito en cualquier dispositivo.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Pluto TV */}
                            <GlassCard className="!p-8 border-white/10 group/app" hoverEffect={false}>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                                    <div className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center p-3 shadow-2xl group-hover/app:border-neon-cyan/50 transition-colors duration-500">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Pluto_TV_logo.svg/1024px-Pluto_TV_logo.svg.png" alt="Pluto TV Logo" className="w-full h-auto" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                            <h3 className="text-2xl font-black italic">Pluto TV</h3>
                                            <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-4">Live TV & Movies • 100% Gratis</p>
                                        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">Cientos de canales en vivo y miles de películas on-demand sin suscripción.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="https://apps.apple.com/us/app/pluto-tv-live-tv-and-movies/id751717277" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all group/store">
                                        <Apple className="w-5 h-5 text-slate-400 group-hover/store:text-white" />
                                        <div className="text-left">
                                            <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest leading-none">Download on the</p>
                                            <p className="text-xs font-black text-white">App Store</p>
                                        </div>
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=tv.pluto.android" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all group/store">
                                        <Smartphone className="w-5 h-5 text-slate-400 group-hover/store:text-white" />
                                        <div className="text-left">
                                            <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest leading-none">Get it on</p>
                                            <p className="text-xs font-black text-white">Google Play</p>
                                        </div>
                                    </a>
                                </div>
                            </GlassCard>

                            {/* Tubi TV */}
                            <GlassCard className="!p-8 border-white/10 group/app" hoverEffect={false}>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-left">
                                    <div className="w-20 h-20 rounded-3xl bg-[#ff4b2b] border border-white/10 flex items-center justify-center p-4 shadow-2xl group-hover/app:border-neon-magenta/50 transition-colors duration-500">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tubi_logo.svg/1280px-Tubi_logo.svg.png" alt="Tubi Logo" className="w-full h-auto brightness-0 invert" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                            <h3 className="text-2xl font-black italic">Tubi TV</h3>
                                            <ShieldCheck className="w-4 h-4 text-neon-magenta" />
                                        </div>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-4">Fox Corp • Streaming Gratuito</p>
                                        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">La colección más grande de películas y series gratuitas, 100% legal.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <a href="https://apps.apple.com/us/app/tubi-watch-movies-tv-shows/id886445756" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-magenta/10 hover:border-neon-magenta/30 transition-all group/store">
                                        <Apple className="w-5 h-5 text-slate-400 group-hover/store:text-white" />
                                        <div className="text-left">
                                            <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest leading-none">Download on the</p>
                                            <p className="text-xs font-black text-white">App Store</p>
                                        </div>
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.tubitv" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-magenta/10 hover:border-neon-magenta/30 transition-all group/store">
                                        <Smartphone className="w-5 h-5 text-slate-400 group-hover/store:text-white" />
                                        <div className="text-left">
                                            <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest leading-none">Get it on</p>
                                            <p className="text-xs font-black text-white">Google Play</p>
                                        </div>
                                    </a>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default function StreamingPage() {
    return (
        <ModalProvider>
            <StreamingClientPage />
        </ModalProvider>
    );
}
