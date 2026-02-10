"use client";

import { motion } from "framer-motion";
import { Cookie, ShieldCheck, Activity, Settings2, ArrowLeft, Info } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import Link from "next/link";

const cookieTypes = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-neon-cyan" />,
        title: "Cookies Esenciales",
        desc: "Necesarias para el funcionamiento del cotizador y el flujo de contratación. No pueden ser desactivadas.",
        status: "Siempre Activas"
    },
    {
        icon: <Activity className="w-8 h-8 text-neon-magenta" />,
        title: "Cookies de Rendimiento",
        desc: "Analizamos el tráfico local en Teziutlán para mejorar el tiempo de respuesta de nuestras auditorías de velocidad.",
        status: "Opcional"
    },
    {
        icon: <Settings2 className="w-8 h-8 text-white" />,
        title: "Preferencias",
        desc: "Recuerdan tu ubicación regional y tus proovedores de interés para ofrecerte una comparativa personalizada.",
        status: "Opcional"
    }
];

export const CookiesContent = () => {
    return (
        <section className="relative py-32 overflow-hidden bg-[#020617]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,255,0.05)_0%,transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                </Link>

                <div className="max-w-4xl mx-auto mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-magenta/20 bg-neon-magenta/5 text-neon-magenta text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                    >
                        <Cookie className="w-3.5 h-3.5 animate-bounce" />
                        Transparencia en Datos
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black italic mb-8">
                        Política de <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">Cookies</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                        En FiberGravity utilizamos tecnologías de rastreo mínimo para asegurar que tu experiencia de comparación sea rápida y segura.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {cookieTypes.map((type, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="h-full border-white/5 flex flex-col items-center text-center group" hoverEffect={true}>
                                <div className="p-5 rounded-3xl bg-white/5 border border-white/10 mb-8 group-hover:bg-neon-cyan/10 transition-colors">
                                    {type.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 italic text-white">{type.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed mb-8 flex-1">
                                    {type.desc}
                                </p>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neon-cyan/60">
                                    {type.status}
                                </span>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-[32px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex gap-6 items-start max-w-2xl mx-auto"
                >
                    <div className="p-3 rounded-xl bg-neon-cyan/20 border border-neon-cyan/30">
                        <Info className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-2 italic">¿Cómo gestionar tus cookies?</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Puedes configurar tu navegador para bloquear estas tecnologías. Ten en cuenta que esto podría afectar la precisión del medidor de velocidad y el guardado de tus comparativas locales.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
