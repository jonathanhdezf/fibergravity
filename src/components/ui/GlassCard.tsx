"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -10, scale: 1.02 } : {}}
            className={cn(
                "glass rounded-2xl p-6 transition-all duration-300 relative overflow-hidden group",
                hoverEffect && "hover:neon-glow-cyan border-white/20",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {children}
        </motion.div>
    );
};
