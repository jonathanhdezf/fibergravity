"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Headphones, Globe, ArrowRight } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const features = [
    {
        icon: <Zap className="w-8 h-8 text-neon-cyan" />,
        title: "Internet de Ultra Velocidad",
        description: "Conexiones eficientes de fibra óptica que eliminan cualquier rastro de latencia en tu vida digital.",
        delay: 0.1
    },
    {
        icon: <Globe className="w-8 h-8 text-neon-magenta" />,
        title: "Transmisión de Datos",
        description: "Infraestructura robusta para el envío masivo de información con estabilidad garantizada al 99.9%.",
        delay: 0.2
    },
    {
        icon: <Shield className="w-8 h-8 text-white" />,
        title: "Telefonía Fija Cristalina",
        description: "Comunicación sin interferencias, uniendo hogares y empresas con la máxima calidad de voz.",
        delay: 0.3
    },
    {
        icon: <Headphones className="w-8 h-8 text-neon-cyan" />,
        title: "Soporte Especializado",
        description: "Un equipo técnico de élite monitoreando tu conexión 24/7 para que nunca dejes de avanzar.",
        delay: 0.4
    }
];

export const About = () => {
    return (
        <section id="nosotros" className="relative py-24 overflow-hidden">
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
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            Más que internet, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
                                impulsamos tu futuro
                            </span>
                        </h2>
                        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                            En <span className="text-white font-bold italic font-space">FiberGravity</span>, no solo instalamos cables. Diseñamos autopistas digitales de alta eficiencia para que la comunicación de nuestros clientes fluya sin límites.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-12 h-px bg-neon-cyan group-hover:w-20 transition-all duration-500" />
                                <span className="text-sm uppercase tracking-[0.3em] font-bold text-slate-500 group-hover:text-neon-cyan transition-colors">Innovación Constante</span>
                            </div>
                            <div className="flex items-center gap-4 group cursor-help">
                                <div className="w-12 h-px bg-neon-magenta group-hover:w-20 transition-all duration-500" />
                                <span className="text-sm uppercase tracking-[0.3em] font-bold text-slate-500 group-hover:text-neon-magenta transition-colors">Estabilidad Absoluta</span>
                            </div>
                        </div>

                        <motion.div
                            className="mt-12 p-8 glass rounded-3xl relative overflow-hidden group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                                <Zap className="w-16 h-16 text-neon-cyan" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Nuestro Compromiso</h3>
                            <p className="text-slate-400">
                                Garantizar calidad y soporte técnico de nivel superior, transformando la manera en que el mundo se conecta.
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
