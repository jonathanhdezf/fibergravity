"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Headphones, Globe, ArrowRight, Users, ArrowLeft } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import Link from "next/link";

const features = [
    {
        icon: <Zap className="w-8 h-8 text-neon-cyan" />,
        title: "Comparativa Inteligente",
        description: "Filtramos los mejores planes de Teziutlán basándonos en velocidad real, precio y beneficios de cada proovedor.",
        delay: 0.1
    },
    {
        icon: <Globe className="w-8 h-8 text-neon-magenta" />,
        title: "Neutralidad Total",
        description: "No favorecemos a ninguna marca; nuestro único compromiso es encontrar la opción más eficiente para tu hogar o empresa.",
        delay: 0.2
    },
    {
        icon: <Shield className="w-8 h-8 text-white" />,
        title: "Gestión Directa",
        description: "Nosotros nos encargamos de los trámites y la logística con el proveedor para que tú solo disfrutes de la conexión.",
        delay: 0.3
    },
    {
        icon: <Headphones className="w-8 h-8 text-neon-cyan" />,
        title: "Asesoría de Élite",
        description: "Un equipo experto te guía en la elección del plan, asegurando que no pagues de más por servicios que no necesitas.",
        delay: 0.4
    }
];

export const About = () => {
    return (
        <section id="nosotros" className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Dynamic Light Streaks (Speed Visual) */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: "-100%", y: `${20 * i}%` }}
                        animate={{ x: "200%" }}
                        transition={{
                            duration: 2 + i,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.5
                        }}
                        className="absolute h-[1px] w-[300px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                    />
                ))}
            </div>

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
                            <Users className="w-3.5 h-3.5 animate-pulse" />
                            Marketplace Digital
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            Comparamos redes, <br />
                            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta pr-4 pb-1">
                                conectamos estilos
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            En <span className="text-white font-bold italic font-space">FiberGravity</span>, funcionamos como tu broker digital de telecomunicaciones en Teziutlán. Nuestra misión es simplificar tu búsqueda, analizando el mercado para ofrecerte la recomendación perfecta.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-12 h-px bg-neon-cyan group-hover:w-20 transition-all duration-500" />
                                <span className="text-sm uppercase tracking-[0.3em] font-bold text-slate-500 group-hover:text-neon-cyan transition-colors">Broker Especializado</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-12 h-px bg-neon-magenta group-hover:w-20 transition-all duration-500" />
                                <span className="text-sm uppercase tracking-[0.3em] font-bold text-slate-500 group-hover:text-neon-magenta transition-colors">Análisis de Mercado</span>
                            </div>
                        </div>

                        <motion.div
                            className="mt-12 p-8 glass rounded-3xl relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Zap className="w-16 h-16 text-neon-cyan" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Misión Marketplace</h3>
                            <p className="text-slate-400">
                                Ser el puente tecnológico entre los mejores proveedores y los usuarios de Teziutlán, garantizando transparencia y ahorro en cada conexión.
                            </p>
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: feature.delay }}
                                viewport={{ once: true }}
                            >
                                <GlassCard className="h-full border-white/5 hover:border-neon-cyan/20 group">
                                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 group-hover:text-neon-cyan transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
