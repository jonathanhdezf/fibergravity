"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";
import { Search, Globe, Zap, Server, Activity, Wifi } from "lucide-react";

export default function GlossaryPage() {
    const terms = [
        {
            term: "Ping",
            definition: "Latencia de red, medida en milisegundos (ms). Indica el tiempo que tarda un paquete de datos en ir desde tu dispositivo hasta el servidor y volver. Un ping bajo es crucial para juegos en línea y videollamadas.",
            icon: <Activity className="w-6 h-6 text-neon-cyan" />,
            category: "Rendimiento"
        },
        {
            term: "Latencia",
            definition: "También conocida como retardo, es el tiempo que tarda la información en viajar a través de la red. A diferencia del ancho de banda que es la 'cantidad' de datos, la latencia es la 'velocidad' de respuesta.",
            icon: <Zap className="w-6 h-6 text-neon-purple" />,
            category: "Rendimiento"
        },
        {
            term: "Fibra Óptica",
            definition: "Tecnología de transmisión que utiliza hilos de vidrio o plástico para enviar datos mediante pulsos de luz. Ofrece velocidades simétricas (igual subida y bajada) y es inmune a interferencias electromagnéticas.",
            icon: <Globe className="w-6 h-6 text-neon-cyan" />,
            category: "Infraestructura"
        },
        {
            term: "Ancho de Banda",
            definition: "La capacidad máxima de transmisión de datos de una conexión. Imagina una autopista: más carriles (ancho de banda) permiten más autos (datos) simultáneamente, pero no necesariamente más rápido si hay tráfico (latencia).",
            icon: <Server className="w-6 h-6 text-neon-purple" />,
            category: "Capacidad"
        },
        {
            term: "WiFi 6 (802.11ax)",
            definition: "La última generación de estándares WiFi. Diseñado para entornos con muchos dispositivos conectados, ofrece mayor velocidad, menor latencia y mejor gestión de la batería en dispositivos móviles.",
            icon: <Wifi className="w-6 h-6 text-neon-cyan" />,
            category: "Tecnología"
        },
        {
            term: "Mbps / Gbps",
            definition: "Megabits por segundo y Gigabits por segundo. Unidades que miden la velocidad de transferencia de datos. 1 Gbps equivale a 1000 Mbps. Una película 4K suele requerir unos 25 Mbps estables.",
            icon: <Activity className="w-6 h-6 text-neon-purple" />,
            category: "Medición"
        },
        {
            term: "Router / Módem",
            definition: "El Módem se conecta a tu ISP (proveedor) y recibe la señal (fibra/cable). El Router toma esa señal y la distribuye a tus dispositivos vía WiFi o cable Ethernet. A menudo vienen combinados en un solo aparato.",
            icon: <Server className="w-6 h-6 text-neon-cyan" />,
            category: "Hardware"
        },
        {
            term: "ISP",
            definition: "Internet Service Provider (Proveedor de Servicios de Internet). Es la compañía (como FiberGravity) que te brinda acceso a internet.",
            icon: <Globe className="w-6 h-6 text-neon-purple" />,
            category: "Entidad"
        },
        {
            term: "Simetría",
            definition: "Característica de una conexión donde la velocidad de subida (cargar archivos) es igual a la velocidad de bajada (descargar contenidos). Ideal para creadores de contenido y videollamadas.",
            icon: <Activity className="w-6 h-6 text-neon-cyan" />,
            category: "Característica"
        },
        {
            term: "IP (Protocolo de Internet)",
            definition: "Una dirección única que identifica a un dispositivo en internet o en una red local. Es como tu dirección postal digital para que los datos sepan dónde llegar.",
            icon: <Globe className="w-6 h-6 text-neon-purple" />,
            category: "Redes"
        },
    ];

    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />
                <div className="container mx-auto max-w-6xl relative z-10 text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                        <span className="text-sm font-medium text-neon-cyan tracking-widest uppercase">Base de Conocimiento</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic"
                    >
                        GLOSARIO <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-600">FIBERGRAVITY</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Domina el lenguaje de la velocidad. Entiende los términos técnicos que definen tu experiencia de conexión premium.
                    </motion.p>
                </div>
            </section>

            {/* Glossary Grid */}
            <section className="pb-32 px-6 relative z-10">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {terms.map((item, index) => (
                            <GlassCard
                                key={index}
                                className="flex flex-col h-full border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-cyan/30 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/5 px-2 py-1 rounded-md">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 italic tracking-tight group-hover:text-neon-cyan transition-colors">
                                    {item.term}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {item.definition}
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
