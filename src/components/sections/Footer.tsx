"use client";

import { Wifi, Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
    return (
        <footer className="pt-20 pb-10 bg-slate-950/80 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 cursor-pointer">
                            <img src="/favicon.svg" alt="FiberGravity Logo" className="w-10 h-10" />
                            <span className="text-2xl font-bold tracking-tighter">
                                FIBER<span className="text-neon-cyan">GRAVITY</span>
                            </span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-6 leading-relaxed text-sm">
                            El marketplace #1 de telecomunicaciones en Teziutlán. Comparamos proovedores para conectarte con el futuro, sin complicaciones y con asesoría experta.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Instagram, label: "Instagram" },
                                { Icon: Twitter, label: "Twitter" },
                                { Icon: Facebook, label: "Facebook" }
                            ].map(({ Icon, label }, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    aria-label={label}
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:text-neon-cyan hover:border-neon-cyan transition-all"
                                >
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Servicios</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#plans-header" className="hover:text-neon-cyan transition-colors">Internet Fibra</a></li>
                            <li><a href="#television" className="hover:text-neon-cyan transition-colors">TV de Cable</a></li>
                            <li><a href="/streaming" className="hover:text-neon-cyan transition-colors">Streaming Gratis</a></li>
                            <li><a href="/musica-gratis" className="hover:text-neon-cyan transition-colors">Música Gratis</a></li>
                            <li><a href="#gamer" className="hover:text-neon-cyan transition-colors">Planes Gamer</a></li>
                            <li><a href="#home-office" className="hover:text-neon-cyan transition-colors">Home Office</a></li>
                            <li><a href="#empresas" className="hover:text-neon-cyan transition-colors">Empresas</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">Compañía</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="/nosotros" className="hover:text-neon-cyan transition-colors">Nosotros</a></li>
                            <li><a href="/soporte" className="hover:text-neon-cyan transition-colors">Soporte Técnico</a></li>
                            <li><a href="/descargas" className="hover:text-neon-cyan transition-colors">Descargas</a></li>
                            <li><a href="/privacidad" className="hover:text-neon-cyan transition-colors">Privacidad</a></li>
                            <li><a href="/contacto" className="hover:text-neon-cyan transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 FiberGravity - Marketplace Digital de Telecomunicaciones. Teziutlán, Puebla.</p>
                    <div className="flex gap-6">
                        <a href="/terminos" className="hover:text-white transition-colors">Términos</a>
                        <a href="/cookies" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>

        </footer>
    );
};
