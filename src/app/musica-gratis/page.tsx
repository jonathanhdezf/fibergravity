"use client";

import { motion } from "framer-motion";
import { Music, ArrowLeft, Headphones, Radio, Mic2, Star, ShieldCheck, Apple, Smartphone } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

import { ModalProvider } from "@/components/ModalProvider";

const MusicaGratisClientPage = () => {
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

                        <GlassCard className="relative overflow-hidden border-white/10 shadow-2xl !p-0 rounded-[32px] h-[600px] md:h-[800px] w-full">
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

                    <div className="max-w-4xl mx-auto text-center mt-6">
                        <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                            Si no te deja agregar el código SMS, abre en una <a href="https://www.claromusica.com/home" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">nueva página</a>, genera el código, ingrésalo y ya podrás disfrutar de música. Puedes regresar a nuestra página cuando gustes a escuchar música.
                        </p>
                    </div>

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

                {/* Official Apps Downloads */}
                <div className="mt-24 pt-20 border-t border-white/5 relative z-10 px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black italic mb-4 uppercase tracking-tighter">Lleva la Música Contigo</h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
                            Descarga la aplicación oficial y lleva tus playlists favoritas a donde quiera que vayas. <span className="text-white font-bold">Sin consumir tus datos</span>.
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <GlassCard className="!p-8 border-white/10 group/app" hoverEffect={false}>
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8 text-center sm:text-left">
                                <div className="w-24 h-24 rounded-3xl bg-black border border-white/10 flex items-center justify-center p-4 shadow-2xl group-hover/app:border-neon-cyan/50 transition-colors duration-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent opacity-50" />
                                    <Music className="w-12 h-12 text-neon-cyan relative z-10" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                                        <h3 className="text-3xl font-black italic text-white">Claro Música</h3>
                                        <ShieldCheck className="w-5 h-5 text-neon-cyan" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black mb-4 flex items-center justify-center sm:justify-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                                        Stream & Download
                                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                                    </p>
                                    <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                                        Accede a millones de canciones, radios en vivo y listas de reproducción curadas. Escucha gratis y sin conexión con tu Plan Telcel.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a
                                    href="https://apps.apple.com/mx/app/claro-m%C3%BAsica/id566367878"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all group/store"
                                >
                                    <Apple className="w-6 h-6 text-slate-400 group-hover/store:text-white transition-colors" />
                                    <div className="text-left">
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Download on the</p>
                                        <p className="text-sm font-black text-white group-hover/store:text-neon-cyan transition-colors">App Store</p>
                                    </div>
                                </a>

                                <a
                                    href="https://play.google.com/store/apps/details?id=com.claro.claromusica.la"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all group/store"
                                >
                                    <Smartphone className="w-6 h-6 text-slate-400 group-hover/store:text-white transition-colors" />
                                    <div className="text-left">
                                        <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">Get it on</p>
                                        <p className="text-sm font-black text-white group-hover/store:text-neon-cyan transition-colors">Google Play</p>
                                    </div>
                                </a>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default function MusicaGratisPage() {
    return (
        <ModalProvider>
            <MusicaGratisClientPage />
        </ModalProvider>
    );
}
