"use client";

import { motion } from "framer-motion";
import { Shield, Lock, EyeOff, FileText, CheckCircle2 } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const privacyFeatures = [
    {
        icon: <Lock className="w-10 h-10 text-neon-cyan" />,
        title: "Encriptación de Élite",
        description: "Protocolos de seguridad avanzados que aseguran que tu información sea ilegible para terceros no autorizados.",
        delay: 0.1
    },
    {
        icon: <EyeOff className="w-10 h-10 text-neon-magenta" />,
        title: "Cero Rastreo",
        description: "Garantizamos que tu actividad de navegación es exclusivamente tuya. No recopilamos datos de comportamiento.",
        delay: 0.2
    },
    {
        icon: <Shield className="w-10 h-10 text-white" />,
        title: "Protección Robusta",
        description: "Sistemas de defensa activos contra intrusiones y ataques de denegación de servicio en tiempo real.",
        delay: 0.3
    },
    {
        icon: <FileText className="w-10 h-10 text-neon-cyan" />,
        title: "Transparencia Total",
        description: "Contratos claros sin letras pequeñas. Sabes exactamente qué datos procesamos y para qué.",
        delay: 0.4
    }
];

export const Privacy = () => {
    return (
        <section id="privacidad" className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/4 right-[10%] w-[300px] h-[300px] bg-neon-magenta/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan text-sm font-bold tracking-widest uppercase mb-6"
                    >
                        <Shield className="w-4 h-4" />
                        Privacidad Avanzada
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black mb-8 leading-tight italic"
                    >
                        Tus datos, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
                            tu elección protegida
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl text-slate-400 leading-relaxed font-light"
                    >
                        Como broker digital, en <span className="text-white font-bold italic">FiberGravity</span> actuamos como tu escudo. Tu información solo fluye hacia el proveedor que tú elijas bajo los más altos estándares de encriptación y transparencia.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {privacyFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: feature.delay }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="h-full border-white/5 hover:border-neon-cyan/30 flex flex-col items-center text-center group">
                                <div className="p-4 rounded-2xl bg-white/5 mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-neon-cyan/10">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-neon-cyan transition-colors italic">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Trust Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-24 p-1 rounded-3xl bg-gradient-to-r from-neon-cyan/20 via-transparent to-neon-magenta/20"
                >
                    <div className="bg-[#020617] rounded-[22px] px-8 py-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 italic">¿Cómo gestionamos tus datos?</h3>
                            <p className="text-slate-400 mb-8">
                                Nuestro compromiso es la transparencia absoluta. Puedes consultar los detalles técnicos de nuestro protocolo de privacidad o solicitar la eliminación de tus datos en un solo click.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Cumplimiento GDPR",
                                    "Auditorías Mensuales",
                                    "Encriptación AES-256",
                                    "Soporte Legal 24/7"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                                        <CheckCircle2 className="w-4 h-4 text-neon-cyan" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-dashed border-neon-cyan/20 flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-neon-cyan/5 rounded-full animate-pulse" />
                                <Shield className="w-24 h-24 md:w-32 md:h-32 text-neon-cyan opacity-40" />
                            </motion.div>
                            <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        </section>
    );
};
