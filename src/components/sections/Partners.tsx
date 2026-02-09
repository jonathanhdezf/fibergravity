"use client";

import { motion } from "framer-motion";

const partners = [
    { name: "Telcel", logo: "TELCEL" },
    { name: "Telmex", logo: "TELMEX" },
    { name: "Megacable", logo: "MEGACABLE" },
    { name: "Totalplay", logo: "TOTALPLAY" },
    { name: "Cablecom", logo: "CABLECOM" },
    { name: "Impactel", logo: "IMPACTEL" },
    { name: "Ubiquiti", logo: "UBIQUITI" },
    { name: "Cisco", logo: "CISCO" }
];

export const Partners = () => {
    return (
        <section className="py-20 border-t border-white/5 bg-[#020617]/50">
            <div className="container mx-auto px-6">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-12"
                >
                    Impulsado por tecnología líder y aliados estratégicos
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-40 hover:opacity-100 transition-opacity duration-700">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-center group"
                        >
                            <span className="text-xl md:text-2xl font-black text-slate-600 group-hover:text-white transition-colors cursor-default tracking-tighter italic">
                                {partner.logo}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Subtle glow behind the logos */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-2/3 h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent" />
        </section>
    );
};
