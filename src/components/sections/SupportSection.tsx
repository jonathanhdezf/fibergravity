"use client";

import { motion } from "framer-motion";
import {
    Headphones,
    MessageSquare,
    Settings,
    ShieldCheck,
    Clock,
    Zap,
    ArrowRight,
    ArrowLeft
} from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import Link from "next/link";

const supportSteps = [
    {
        icon: <MessageSquare className="w-6 h-6 text-neon-cyan" />,
        title: "Gestión de Broker",
        description: "Servimos de puente ante cualquier falla. Nosotros gestionamos el reporte con el proveedor por ti."
    },
    {
        icon: <Settings className="w-6 h-6 text-neon-magenta" />,
        title: "Auditoría de Señal",
        description: "Monitoreamos la calidad de tu conexión local para asegurar que recibes los Megas contratados."
    },
    {
        icon: <ShieldCheck className="w-6 h-6 text-white" />,
        title: "Garantía de Resolución",
        description: "Si el proovedor no cumple, nuestro equipo técnico local interviene para encontrar una solución."
    }
];

import { useModal } from "../ModalProvider";

export const SupportSection = () => {
    const { openSupportModal } = useModal();

    return (
        <section id="soporte" className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100
                            }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                        >
                            <Clock className="w-3.5 h-3.5 animate-pulse" />
                            Soporte Local Teziutlán
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            Resolución <span className="text-neon-cyan neon-text-cyan">Experta</span> <br />
                            y Defensa del Usuario
                        </h2>

                        <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-xl">
                            Como tu broker de confianza, no solo buscamos el plan perfecto; nos aseguramos de que se mantenga así. Un solo punto de contacto para gestionar todo tu ecosistema digital.
                        </p>

                        <div className="grid gap-6">
                            {supportSteps.map((step, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl glass flex items-center justify-center border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-neon-cyan transition-colors">{step.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 flex flex-wrap gap-4">
                            <NeonButton onClick={openSupportModal} variant="cyan" className="flex items-center gap-2">
                                Abrir Ticket <ArrowRight className="w-4 h-4" />
                            </NeonButton>
                            <div className="flex items-center gap-3 px-6 py-2 glass rounded-full">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                                <span className="text-xs font-bold uppercase tracking-widest">Técnicos Online</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <GlassCard className="p-8 md:p-12 border-neon-magenta/20 relative z-10" hoverEffect={false}>
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <Headphones className="w-40 h-40 text-neon-magenta" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-neon-magenta/20 rounded-3xl flex items-center justify-center mb-8 neon-glow-magenta border border-neon-magenta/40">
                                    <Headphones className="w-10 h-10 text-neon-magenta" />
                                </div>

                                <h3 className="text-3xl font-black mb-4 italic">¿Necesitas ayuda ahora mismo?</h3>
                                <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                                    ¿Problemas con tu servicio actual? Escanea el código para hablar con un especialista en conectividad regional. Auditamos tu conexión y gestionamos soluciones inmediatas con el proovedor.
                                </p>

                                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 flex flex-col items-center gap-6 group/qr transition-all hover:border-neon-cyan/30">
                                    {/* Real QR Code UI */}
                                    <div className="w-full max-w-[180px] aspect-square overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative">
                                        <div className="absolute inset-0 bg-white group-hover/qr:opacity-90 transition-opacity" />
                                        <img
                                            src="/qr-soporte.jpg"
                                            alt="QR Soporte Técnico"
                                            className="w-full h-full object-contain relative z-10 p-2"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Escanea para Soporte</span>
                                        <div className="text-neon-cyan font-bold mt-1 tracking-widest">01-800-GRAVITY</div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-slate-500">
                                    <span className="flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-neon-cyan" /> Latencia de respuesta: 2min
                                    </span>
                                    <span className="text-neon-magenta">FIBERGRAVITY SUPPORT</span>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Decorative fast blurred element */}
                        <motion.div
                            animate={{
                                x: [0, 50, 0],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -bottom-10 -right-10 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px] -z-10"
                        />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
