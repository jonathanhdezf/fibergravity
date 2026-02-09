"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps {
    children: React.ReactNode;
    variant?: "cyan" | "magenta";
    className?: string;
    onClick?: () => void;
}

export const NeonButton = ({ children, variant = "cyan", className, onClick }: NeonButtonProps) => {
    const styles = {
        cyan: "bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black neon-glow-cyan",
        magenta: "bg-neon-magenta/20 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-black neon-glow-magenta",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={cn(
                "px-8 py-3 rounded-full border-2 font-bold transition-all duration-300 uppercase tracking-widest text-sm",
                styles[variant],
                className
            )}
        >
            {children}
        </motion.button>
    );
};
