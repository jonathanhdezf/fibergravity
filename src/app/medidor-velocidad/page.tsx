"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import { Activity, Gauge, ShieldCheck, Zap, Globe, ArrowRight, Monitor, Laptop, Smartphone, Wifi, Cpu, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { ModalProvider, useModal } from "@/components/ModalProvider";

const SpeedTestTrigger = () => {
    const { openSpeedTestModal } = useModal();
    return (
        <NeonButton
            variant="cyan"
            className="w-full md:w-auto px-10 py-5 text-sm font-black uppercase tracking-widest"
            onClick={openSpeedTestModal}
        >
            <Gauge className="w-5 h-5 mr-3" />
            Iniciar Auditoría FiberGravity
        </NeonButton>
    );
};

export default function MedidorVelocidadPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen bg-[#020617]">
                <Navbar />

                {/* Hero Section */}
                <section className="pt-32 pb-20 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full -z-10" />

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-6"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Compromiso de Velocidad Real
                        </motion.div>
                        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter mb-6 uppercase leading-tight">
                            INFRAESTRUCTURA <br className="hidden md:block" />
                            <span className="text-neon-cyan drop-shadow-[0_0_15px_#00f3ff]">XGS-PON</span> CERTIFICADA
                        </h1>
                        <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10">
                            En FiberGravity la transparencia es nuestro pilar. No vendemos "hasta" cierta velocidad; entregamos el rendimiento técnico que tu vida digital exige.
                        </p>

                        <div className="flex justify-center">
                            <SpeedTestTrigger />
                        </div>
                    </div>
                </section>

                <section className="pb-32 container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

                        {/* Our commitment */}
                        <GlassCard className="p-8 md:p-12 space-y-8 flex flex-col justify-between border-white/5" hoverEffect={false}>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black italic mb-8 flex items-center gap-3">
                                    <Zap className="text-neon-cyan w-8 h-8" /> NUESTRA PROMESA
                                </h2>
                                <div className="space-y-8 text-slate-300">
                                    <p className="text-lg leading-relaxed">
                                        Nuestra red está optimizada para Teziutlán con nodos de salida directa hacia los principales centros de datos del mundo.
                                    </p>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest">
                                                <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Simetría Total
                                            </div>
                                            <p className="text-xs text-slate-500">Sube archivos 4K a la misma velocidad que los descargas.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest">
                                                <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Latencia Zero
                                            </div>
                                            <p className="text-xs text-slate-500">Rutas optimizadas para Gaming con ping estable de un solo dígito.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest">
                                                <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Ancho de Banda
                                            </div>
                                            <p className="text-xs text-slate-500">Capacidad masiva para conectar decenas de dispositivos IoT sin saturación.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest">
                                                <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Seguridad Core
                                            </div>
                                            <p className="text-xs text-slate-500">Cifrado de grado militar en el transporte de tus datos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 pt-10 border-t border-white/5 opacity-50">
                                <Monitor className="w-6 h-6 mx-auto" />
                                <Laptop className="w-6 h-6 mx-auto" />
                                <Smartphone className="w-6 h-6 mx-auto" />
                            </div>
                        </GlassCard>

                        {/* External Sources and Tips */}
                        <div className="flex flex-col gap-8">
                            <GlassCard className="p-8 md:p-10 border-neon-cyan/20 bg-neon-cyan/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                    <Globe className="w-40 h-40 text-neon-cyan" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-black italic mb-4 flex items-center gap-3">
                                        <Globe className="text-neon-cyan" /> AUDITORÍA EXTERNA
                                    </h3>
                                    <p className="text-slate-300 mb-8 max-w-md leading-relaxed">
                                        Contamos con nuestro propio motor de medición de precisión ISP grado terminal, pero creemos en la validación externa. Recomendamos el estándar de la industria para pruebas comparativas.
                                    </p>
                                    <a
                                        href="https://www.speedtest.net/es"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-neon-cyan text-black font-black uppercase tracking-widest text-[11px] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all active:scale-95 group"
                                    >
                                        Ir a Speedtest.net <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </GlassCard>

                            <GlassCard className="p-8 md:p-10 border-white/5 flex-1 glass">
                                <h3 className="text-xl font-black italic mb-6 flex items-center gap-3">
                                    <Cpu className="text-slate-400" /> FACTORES DE RENDIMIENTO
                                </h3>
                                <div className="space-y-6">
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        Para obtener una medición 100% precisa, asegúrate de cumplir con estas condiciones técnicas:
                                    </p>
                                    <div className="grid gap-4">
                                        {[
                                            { icon: Wifi, title: "Estándar WiFi", desc: "Usa dispositivos compatibles con WiFi 6 para planes de +500 Mbps." },
                                            { icon: Lock, title: "Interferencias", desc: "Asegúrate de estar cerca del router o usar cable Ethernet Cat6." },
                                            { icon: Activity, title: "Carga de Red", desc: "Cierra descargas activas o streamings antes de iniciar el test." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                                <item.icon className="w-5 h-5 text-neon-cyan shrink-0" />
                                                <div>
                                                    <h4 className="text-xs font-black uppercase tracking-widest text-white mb-1">{item.title}</h4>
                                                    <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </ModalProvider>
    );
}
