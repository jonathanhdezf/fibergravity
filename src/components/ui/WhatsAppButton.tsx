"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
    planName: string;
    provider: string;
    price: string | number;
    phoneNumber?: string;
    className?: string;
}

/**
 * WhatsAppButton - Componente de conversión premium para FiberGravity
 * Genera un enlace dinámico de WhatsApp con mensaje preconfigurado del plan solicitado.
 */
export const WhatsAppButton = ({
    planName,
    provider,
    price,
    phoneNumber = "2311024672",
    className = ""
}: WhatsAppButtonProps) => {

    // Construcción del mensaje dinámico
    const rawMessage = `¡Hola FiberGravity! 🚀 Estoy en Teziutlán y me interesa contratar el plan ${planName} de ${provider} por $${price}. ¿Me ayudan a validar mi cobertura?`;

    // Formateo seguro para URL
    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/52${phoneNumber}?text=${encodedMessage}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
                relative group flex items-center justify-center gap-3 
                px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em]
                transition-all duration-300 overflow-hidden
                ${className}
            `}
        >
            {/* Efecto Glassmorphism de Fondo */}
            <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-md border border-white/10 group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors duration-300" />

            {/* Resplandor Neon Interno (Solo visible en hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-green-500/10 via-transparent to-emerald-500/10 transition-opacity duration-300" />

            {/* Contenido del Botón */}
            <div className="relative z-10 flex items-center gap-3 text-white group-hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4 fill-current md:w-5 md:h-5" />
                <span>Contratar vía WhatsApp</span>
            </div>

            {/* Scanline premium decorativo */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent h-1/2 w-full -translate-y-full group-hover:translate-y-[200%] transition-transform duration-1000 ease-in-out pointer-events-none" />
        </motion.a>
    );
};
