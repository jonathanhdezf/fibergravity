"use client";

import { motion } from "framer-motion";
import { Music, ArrowLeft, Headphones, Radio, Mic2, Star } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

const MusicaGratisPage = () => {
    return (
        <main className="min-h-screen bg-[#020617]">
            <Navbar />

            <section className="pt-32 pb-24 relative overflow-hidden">
                {/* Visual Background Effects */}
                <div className="absolute top-0 right-1/4 w-[800px] h-[400px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-[800px] h-[400px] bg-neon-magenta/5 blur-[150px] rounded-full pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Volver al Inicio
                    </Link>

                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                <Music className="w-3.5 h-3.5 animate-pulse" />
                                Premium Audio Experience
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black italic mb-8">
                                Música <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan pr-6 pb-2">Sin Límites</span>
                            </h1>
                            <p className="text-xl text-slate-400 mb-6 leading-relaxed">
                                Si eres cliente <span className="text-white font-bold">Telcel</span>, puedes disfrutar de millones de canciones sin costo adicional.
                            </p>

                            <div className="flex items-center justify-center gap-8 mb-12">
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                    <Headphones className="w-4 h-4 text-neon-cyan" /> Alta Fidelidad
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                    <Radio className="w-4 h-4 text-neon-magenta" /> Estaciones en Vivo
                                </div>
                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500">
                                    <Mic2 className="w-4 h-4 text-white" /> Podcasts Exclusivos
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Iframe Player Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-[-20px] bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 blur-[60px] rounded-[40px] opacity-30" />

                        <GlassCard className="relative overflow-hidden border-white/10 shadow-2xl !p-0 rounded-[32px] aspect-video md:aspect-[21/9] min-h-[500px]">
                            <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-md border-b border-white/5 z-20 flex items-center px-6 justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                    </div>
                                    <div className="h-4 w-px bg-white/10 mx-2" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Claro Música Official Player</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10">
                                    <Star className="w-3 h-3 text-neon-cyan fill-current" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">Telcel Benefit active</span>
                                </div>
                            </div>

                            <div className="w-full h-full pt-12">
                                <iframe
                                    src="https://www.claromusica.com/home"
                                    className="w-full h-full border-0"
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    title="Claro Música"
                                />
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Content Logic & Features */}
                    <div className="grid md:grid-cols-2 gap-12 mt-24">
                        <GlassCard className="p-8 border-white/5 hover:border-neon-cyan/20 transition-all">
                            <h3 className="text-xl font-black italic mb-4 uppercase tracking-tight text-neon-cyan">Beneficio Exclusivo</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Los usuarios con planes Telcel activos pueden acceder a la versión Premium de Claro Música sin consumir sus datos. Disfruta de tus artistas favoritos en casa o en movimiento con la mejor calidad de audio.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 border-white/5 hover:border-neon-magenta/20 transition-all">
                            <h3 className="text-xl font-black italic mb-4 uppercase tracking-tight text-neon-magenta">Sin Publicidad</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Al vincular tu cuenta Telcel, eliminas las interrupciones. Escucha álbumes completos y crea playlists personalizadas que se sincronizan con todos tus dispositivos automáticamente.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default MusicaGratisPage;
