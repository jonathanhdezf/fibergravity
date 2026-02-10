"use client";

import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

export const PlansHeader = () => {
    return (
        <section id="plans-header" className="pt-24 pb-12 bg-black relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        <Rocket className="w-3.5 h-3.5 text-neon-cyan" />
                        Nuestras Soluciones
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black italic mb-6">
                        Planes que <span className="text-neon-cyan neon-text-cyan">Transforman</span> <br />
                        tu Experiencia <span className="text-neon-magenta neon-text-magenta">Digital</span>
                    </h2>

                    <div className="w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-magenta mx-auto rounded-full mb-8" />

                    <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Explora nuestras categorías especializadas. Hemos diseñado cada plan basándonos en métricas reales de uso para garantizar que pagues exactamente por la potencia que necesitas.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
