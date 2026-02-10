"use client";

import { motion } from "framer-motion";
import { Download, FileText, Smartphone, Layout, Shield, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";
import Link from "next/link";
import { ModalProvider } from "@/components/ModalProvider";

const downloadCategories = [
    {
        title: "Contratos y Legal",
        icon: <FileText className="w-8 h-8 text-neon-cyan" />,
        items: [
            { name: "Contrato de Adhesión Totalplay", size: "1.2 MB", type: "PDF" },
            { name: "Términos y Condiciones FiberGravity", size: "850 KB", type: "PDF" },
            { name: "Aviso de Privacidad Integral", size: "450 KB", type: "PDF" },
            { name: "Políticas de Uso Justo", size: "620 KB", type: "PDF" }
        ]
    },
    {
        title: "Aplicaciones Móviles",
        icon: <Smartphone className="w-8 h-8 text-neon-magenta" />,
        items: [
            { name: "App Totalplay (Android/iOS)", size: "45 MB", type: "App Store" },
            { name: "Megacable App", size: "38 MB", type: "Play Store" },
            { name: "Telmex Infinitum App", size: "42 MB", type: "Play Store" }
        ]
    },
    {
        title: "Guías de Usuario",
        icon: <Layout className="w-8 h-8 text-white" />,
        items: [
            { name: "Guía de Configuración Router", size: "2.5 MB", type: "PDF" },
            { name: "Manual de Canales TV", size: "5.1 MB", type: "PDF" },
            { name: "Guía de Autogestión de Pagos", size: "1.8 MB", type: "PDF" }
        ]
    }
];

export default function DescargasPage() {
    return (
        <ModalProvider>
            <main className="min-h-screen bg-[#020617]">
                <Navbar />

                <section className="pt-32 pb-24 relative overflow-hidden">
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-neon-cyan/10 blur-[150px] rounded-full pointer-events-none" />

                    <div className="container mx-auto px-6 relative z-10">
                        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver al Inicio
                        </Link>

                        <div className="max-w-4xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-magenta/20 bg-neon-magenta/5 text-neon-magenta text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                                    <Download className="w-3.5 h-3.5 animate-bounce" />
                                    Centro de Recursos
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black italic mb-8">
                                    Centro de <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-magenta neon-text-cyan pr-6 pb-2">Descargas</span>
                                </h1>
                                <p className="text-xl text-slate-400 mb-16 leading-relaxed max-w-2xl">
                                    Accede a toda la documentación oficial, guías de configuración y aplicaciones necesarias para gestionar tus servicios en Teziutlán.
                                </p>
                            </motion.div>

                            <div className="grid md:grid-cols-1 gap-12">
                                {downloadCategories.map((category, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
                                                {category.icon}
                                            </div>
                                            <h2 className="text-2xl font-black italic">{category.title}</h2>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            {category.items.map((item, i) => (
                                                <GlassCard
                                                    key={i}
                                                    className="group hover:border-white/20 transition-all duration-500"
                                                    hoverEffect={true}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="space-y-1">
                                                            <h3 className="font-bold text-white group-hover:text-neon-cyan transition-colors">{item.name}</h3>
                                                            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5">{item.type}</span>
                                                                <span>{item.size}</span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            aria-label={`Descargar ${item.name}`}
                                                            className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 group-hover:text-neon-cyan group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 transition-all"
                                                        >
                                                            <Download className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </GlassCard>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Verification Badge */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-24 p-8 rounded-[40px] border border-white/5 bg-gradient-to-br from-white/5 to-transparent flex flex-col md:flex-row items-center gap-8"
                            >
                                <div className="p-6 rounded-full bg-neon-cyan/10 border border-neon-cyan/20">
                                    <Shield className="w-12 h-12 text-neon-cyan" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">Descargas Seguras</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        Todos nuestros archivos y enlaces externos son auditados semanalmente por nuestro equipo técnico en local para garantizar que son libres de malware y están en su versión más reciente.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </ModalProvider>
    );
}
