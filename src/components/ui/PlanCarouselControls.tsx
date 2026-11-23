"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function useHorizontalDragScroll(ref: RefObject<HTMLDivElement | null>) {
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        // Do not hijack clicks on interactive buttons/links
        if ((e.target as HTMLElement).closest("button, a, input, select")) return;
        isDraggingRef.current = true;
        startXRef.current = e.pageX - el.offsetLeft;
        scrollLeftRef.current = el.scrollLeft;
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || !isDraggingRef.current) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startXRef.current) * 1.4;
        el.scrollLeft = scrollLeftRef.current - walk;
    };

    const stopDragging = () => {
        isDraggingRef.current = false;
    };

    return {
        onMouseDown,
        onMouseMove,
        onMouseUp: stopDragging,
        onMouseLeave: stopDragging,
    };
}

interface PlanCarouselControlsProps {
    containerRef: RefObject<HTMLDivElement | null>;
    labels: string[];
    scrollXProgress: MotionValue<number>;
    accent?: "cyan" | "magenta" | "sky";
}

export const PlanCarouselControls = ({
    containerRef,
    labels,
    scrollXProgress,
    accent = "cyan",
}: PlanCarouselControlsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const handleScroll = () => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            if (maxScroll <= 0) {
                setActiveIndex(0);
                return;
            }
            const ratio = Math.min(1, Math.max(0, el.scrollLeft / maxScroll));
            const idx = Math.round(ratio * Math.max(0, labels.length - 1));
            setActiveIndex(idx);
        };

        el.addEventListener("scroll", handleScroll, { passive: true });
        return () => el.removeEventListener("scroll", handleScroll);
    }, [containerRef, labels.length]);

    const scrollToIndex = (index: number) => {
        const el = containerRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        if (labels.length <= 1 || maxScroll <= 0) return;
        const target = (index / (labels.length - 1)) * maxScroll;
        el.scrollTo({ left: target, behavior: "smooth" });
    };

    const scrollByStep = (direction: -1 | 1) => {
        const el = containerRef.current;
        if (!el) return;
        const step = Math.min(420, Math.max(300, el.clientWidth * 0.45));
        el.scrollBy({ left: direction * step, behavior: "smooth" });
    };

    const gradientClass =
        accent === "magenta"
            ? "from-neon-magenta to-neon-cyan"
            : accent === "sky"
                ? "from-sky-400 to-neon-cyan"
                : "from-neon-cyan to-neon-magenta";

    const activePillClass =
        accent === "magenta"
            ? "bg-neon-magenta/15 border-neon-magenta/50 text-neon-magenta shadow-[0_0_15px_rgba(255,0,255,0.2)]"
            : accent === "sky"
                ? "bg-sky-400/15 border-sky-400/50 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                : "bg-neon-cyan/15 border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.2)]";

    return (
        <div className="container mx-auto px-6 mt-2 flex flex-col items-center gap-4">
            {/* Sleek Progress Track + Nav Controls */}
            <div className="flex items-center gap-4 w-full max-w-2xl justify-center">
                <button
                    type="button"
                    onClick={() => scrollByStep(-1)}
                    aria-label="Plan anterior"
                    className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-neon-cyan/40 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 shrink-0 cursor-pointer"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex-1 max-w-xs h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                    <motion.div
                        style={{ scaleX: scrollXProgress }}
                        className={`h-full bg-gradient-to-r ${gradientClass} origin-left rounded-full`}
                    />
                </div>

                <button
                    type="button"
                    onClick={() => scrollByStep(1)}
                    aria-label="Siguiente plan"
                    className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 hover:border-neon-cyan/40 flex items-center justify-center text-slate-300 hover:text-white transition-all active:scale-95 shrink-0 cursor-pointer"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Interactive Provider Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
                {labels.map((label, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                        <button
                            key={`${label}-${idx}`}
                            type="button"
                            onClick={() => scrollToIndex(idx)}
                            className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                                isActive
                                    ? activePillClass
                                    : "bg-white/[0.02] border-white/10 text-slate-500 hover:text-white hover:border-white/25"
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
