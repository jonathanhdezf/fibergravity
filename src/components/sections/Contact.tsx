"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe2, ArrowLeft } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import Link from "next/link";
import toast from "react-hot-toast";

const contactInfo = [
    {
        icon: <Phone className="w-6 h-6 text-neon-cyan" />,
        label: "Llámanos",
        value: "231 102 4672",
        subValue: "Atención 24/7",
        delay: 0.1
    },
    {
        icon: <Mail className="w-6 h-6 text-neon-magenta" />,
        label: "Email",
        value: "fiberlink.serviciostic@gmail.com",
        subValue: "Respuesta en < 2h",
        delay: 0.2
    },
    {
        icon: <MapPin className="w-6 h-6 text-white" />,
        label: "Oficina Central",
        value: "Matamoros 507, Centro",
        subValue: "Teziutlán Puebla, México",
        delay: 0.3
    }
];

export const Contact = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName.trim() || !email.trim() || !message.trim()) {
            toast.error("Por favor completa nombre, correo y mensaje.");
            return;
        }

        try {
            const payload = {
                id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
                created_at: new Date().toISOString(),
                full_name: fullName.trim(),
                email: email.trim(),
                subject: subject.trim() || "Solicitud de asesoría Fiberlink Play",
                message: message.trim(),
            };
            const existing = JSON.parse(localStorage.getItem("fiberlink_play_contacts") || "[]");
            localStorage.setItem("fiberlink_play_contacts", JSON.stringify([payload, ...existing]));
            toast.success("Mensaje enviado. Un asesor de Fiberlink Play te contactará pronto.");
            setSent(true);
            setFullName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch {
            toast.error("No se pudo registrar el mensaje.");
        }
    };

    return (
        <section id="contacto" className="relative py-32 overflow-hidden bg-[#020617]">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-magenta/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Volver al Inicio
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info & Text */}
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
                            <MessageSquare className="w-3.5 h-3.5 animate-pulse" />
                            Contacto Directo
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight italic">
                            ¿Listo para el <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-magenta">
                                siguiente nivel?
                            </span>
                        </h2>

                        <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed">
                            Nuestro equipo está listo para ayudarte a comparar y contratar la conexión que transformará tu experiencia digital. No esperes más.
                        </p>

                        <div className="grid gap-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: info.delay }}
                                    viewport={{ once: true }}
                                >
                                    <GlassCard className="flex items-center gap-6 p-4 border-white/5 hover:border-neon-cyan/20 group cursor-default" hoverEffect={false}>
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan/10 transition-colors">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{info.label}</p>
                                            <p className="text-white font-bold text-lg">{info.value}</p>
                                            <p className="text-sm text-slate-400">{info.subValue}</p>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12 flex items-center gap-4 text-slate-500">
                            <Globe2 className="w-5 h-5 animate-spin-slow" />
                            <span className="text-sm font-medium">Broker digital conectando los mejores proveedores de México.</span>
                        </div>
                    </motion.div>

                    {/* Right Column: Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <GlassCard className="p-8 md:p-12 border-white/10" hoverEffect={false}>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Ej. Carlos Mendoza"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Email</label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="carlos@correo.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-magenta/50 focus:ring-1 focus:ring-neon-magenta/50 transition-all text-white placeholder:text-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Asunto</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Quiero comparar planes de Fibra Óptica"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all text-white placeholder:text-slate-600"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold ml-1">Mensaje</label>
                                    <textarea
                                        rows={4}
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Cuéntanos sobre tus necesidades de conexión y tu zona..."
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 transition-all text-white placeholder:text-slate-600 resize-none"
                                    />
                                </div>

                                <div className="pt-4">
                                    <NeonButton type="submit" className="w-full flex items-center justify-center gap-3">
                                        {sent ? "Enviar Otro Mensaje" : "Enviar Mensaje"}
                                        <Send className="w-4 h-4" />
                                    </NeonButton>
                                    <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-tighter">
                                        Al enviar este formulario, aceptas nuestros <Link href="/terminos" className="text-neon-cyan hover:underline">Términos de Servicio</Link>.
                                    </p>
                                </div>
                            </form>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
