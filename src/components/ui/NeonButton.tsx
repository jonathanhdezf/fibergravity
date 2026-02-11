"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
    variant?: "cyan" | "magenta" | "white";
}

export const NeonButton = ({ children, variant = "cyan", className, ...props }: NeonButtonProps) => {
    const styles = {
        cyan: "bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black neon-glow-cyan",
        magenta: "bg-neon-magenta/20 border-neon-magenta text-neon-magenta hover:bg-neon-magenta hover:text-black neon-glow-magenta",
        white: "bg-white/10 border-white/40 text-white hover:bg-white hover:text-black shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "px-8 py-3 rounded-full border-2 font-bold transition-all duration-300 uppercase tracking-widest text-sm",
                styles[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
