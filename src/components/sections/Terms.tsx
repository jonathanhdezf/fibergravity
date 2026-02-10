"use client";

import { motion } from "framer-motion";
import { FileText, Scale, ShieldAlert, CheckCircle2, ArrowLeft, Clock } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import Link from "next/link";

const termSections = [
    {
        icon: <Scale className="w-8 h-8 text-neon-cyan" />,
        title: "Condiciones de Uso",
        content: "Al acceder a FiberGravity, aceptas nuestras condiciones de intermediación digital. Como marketplace, facilitamos la conexión entre tú y los proveedores de servicios en Teziutlán."
    },
    {
        icon: <ShieldAlert className="w-8 h-8 text-neon-magenta" />,
        title: "Responsabilidad Local",
        content: "Nuestra auditoría de señal es una herramienta de referencia. FiberGravity no es responsable directo de las fallas de infraestructura del proveedor, pero actuamos como tu defensor legal."
    },
    {
        icon: <Clock className="w-8 h-8 text-white" />,
        title: "Vigencia de Precios",
        content: "Los precios mostrados en nuestro comparador están sujetos a cambios por parte de los proveedores. FiberGravity garantiza la transparencia en la información al momento de la consulta."
    }
];

export const Terms = () => {
    return (
        <section className="relative py-32 overflow-hidden bg-[#020617]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                </Link>

                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                    >
                        <FileText className="w-3.5 h-3.5 animate-pulse" />
                        Marco Legal Digital
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black italic mb-8">
                        Términos y <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">Condiciones</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                        Este documento establece las reglas de navegación y uso de nuestra plataforma como marketplace de telecomunicaciones en la región de Puebla.
                    </p>
                </div>

                <div className="grid gap-8 max-w-3xl mx-auto">
                    {termSections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlassCard className="!p-8 border-white/5 hover:border-neon-cyan/20" hoverEffect={false}>
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4 italic text-white">{section.title}</h2>
                                        <p className="text-slate-400 leading-relaxed text-sm">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-24 p-8 rounded-3xl border border-white/5 bg-white/2 flex flex-col md:flex-row items-center gap-8 max-w-3xl mx-auto"
                >
                    <CheckCircle2 className="w-12 h-12 text-neon-cyan opacity-50 shrink-0" />
                    <p className="text-xs text-slate-500 uppercase tracking-widest text-center md:text-left leading-loose">
                        Al utilizar nuestros servicios de comparación y contratación, declaras conocer y aceptar los procesos de auditoría y gestión de datos detallados en este marco legal.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};
