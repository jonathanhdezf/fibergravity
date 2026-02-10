"use client";

import { motion } from "framer-motion";
import { MapPin, Globe, Radar, Landmark, Signal } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const regionalZones = [
    {
        name: "Teziutlán Centro",
        description: "Cobertura total en la Perla de la Sierra, desde el Palacio hasta los barrios emblemáticos.",
        status: "Full Fiber",
        delay: 0.1
    },
    {
        name: "Chignautla",
        description: "Conexión estable a las faldas del Cerro del Cristo para una navegación sin interrupciones.",
        status: "Active",
        delay: 0.2
    },
    {
        name: "Xiutetelco",
        description: "Infraestructura de alta capacidad conectando historia y tecnología en cada punto.",
        status: "Full Fiber",
        delay: 0.3
    },
    {
        name: "Atempan",
        description: "Red ampliada cubriendo zonas urbanas y rurales con tecnología GPON de última milla.",
        status: "Active",
        delay: 0.4
    },
    {
        name: "Tlatlauquitepec",
        description: "Llevando la velocidad a los destinos más altos de la región con estabilidad garantizada.",
        status: "Expansion",
        delay: 0.5
    },
    {
        name: "Hueyapan",
        description: "Conectando la tradición textil con el ancho de banda necesario para el comercio digital.",
        status: "Active",
        delay: 0.6
    }
];

export const Coverage = () => {
    return (
        <section id="cobertura" className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Background Mist Effect (Teziutlán Aesthetic) */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-full h-[500px] bg-gradient-to-t from-neon-cyan/5 via-transparent to-transparent opacity-40 blur-[100px] -translate-y-1/2" />
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        x: [-100, 100, -100]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.05),transparent_70%)]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-magenta/30 bg-neon-magenta/5 text-neon-magenta text-xs font-black tracking-widest uppercase mb-6"
                        >
                            <Radar className="w-3.5 h-3.5" />
                            Cobertura regional
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-7xl font-black italic leading-[0.9] mb-8"
                        >
                            Sabemos quién llega <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">
                                hasta tu domicilio
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-xl text-slate-400 font-light leading-relaxed"
                        >
                            No pierdas tiempo con ventas falsas. Auditamos la cobertura real de cada proveedor en la Sierra Nororiental para decirte exactamente quién ofrece la mejor señal en tu ubicación.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex items-center gap-6 glass p-6 rounded-[2.5rem] border-white/5"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20" />
                                </div>
                            ))}
                        </div>
                        <div className="text-sm font-bold">
                            <span className="text-neon-cyan">+15,000</span> <br />
                            <span className="text-slate-500 uppercase text-[10px] tracking-widest">Hogares Conectados</span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regionalZones.map((zone, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: zone.delay }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="group h-full p-8 border-white/5 hover:border-neon-cyan/30 transition-all duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-neon-cyan/10 transition-all duration-500">
                                        <MapPin className="w-6 h-6 text-neon-cyan" />
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${zone.status === 'Full Fiber'
                                        ? 'border-neon-cyan/40 text-neon-cyan bg-neon-cyan/5'
                                        : zone.status === 'Active'
                                            ? 'border-white/20 text-white bg-white/5'
                                            : 'border-neon-magenta/40 text-neon-magenta bg-neon-magenta/5'
                                        }`}>
                                        {zone.status}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 italic group-hover:text-neon-cyan transition-colors">{zone.name}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                    {zone.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                                    <Signal className="w-3.5 h-3.5" />
                                    <span>Latencia Directa: &lt; 5ms</span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Regional Trust Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mt-20 glass p-8 rounded-3xl border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                        <Landmark className="w-32 h-32" />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-neon-magenta/10 flex items-center justify-center animate-pulse">
                            <Globe className="w-8 h-8 text-neon-magenta" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold italic">Presencia Física en la Región</h4>
                            <p className="text-slate-500 text-sm">Oficinas locales y cuadrillas de técnicos siempre cerca de ti.</p>
                        </div>
                    </div>

                    <div className="flex gap-4 md:gap-12 flex-wrap justify-center">
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">99.9%</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Simpre Activo</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">24/7</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Soporte</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-black text-white">X6 Plan</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">Escalabilidad</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
