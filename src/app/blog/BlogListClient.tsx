"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

interface BlogListClientProps {
    initialPosts: any[];
    initialCategories: any[];
}

export default function BlogListClient({ initialPosts, initialCategories }: BlogListClientProps) {
    const [posts, setPosts] = useState<any[]>(initialPosts);
    const [categories, setCategories] = useState<any[]>(initialCategories);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // We can still use effect for real-time updates if needed, but for now filtering is pure client
    // Or we can fetch updates. Since we pass initialPosts, we don't strictly need to fetch on mount unless we want fresh data.
    // Let's keep it simple and just use initialPosts for now, but if we want live updates we could fetch relative to time?
    // Actually, let's just work with initialPosts to be fast and SEO friendly.

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "all" || post.category_id === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-neon-cyan selection:text-black">
            <Navbar />

            <main className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neon-cyan text-[10px] font-black uppercase tracking-[0.3em]"
                        >
                            <BookOpen className="w-3 h-3" /> Blog Oficial FiberGravity
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black italic tracking-tighter"
                        >
                            CONECTANDO <span className="text-neon-cyan neon-text-cyan">IDEAS</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed font-medium"
                        >
                            Explora las últimas tendencias en tecnología, guías de internet y consejos para maximizar tu conexión digital.
                        </motion.p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Buscar artículos..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-neon-cyan transition-all"
                            />
                        </div>
                        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto max-w-full">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === 'all' ? 'bg-neon-cyan text-black' : 'hover:bg-white/5 text-slate-400'}`}
                            >
                                TODOS
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat.id ? 'bg-neon-cyan text-black' : 'hover:bg-white/5 text-slate-400'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse rounded-[2.5rem]" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredPosts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <a href={`/blog/${post.slug}`} className="group block h-full">
                                        <GlassCard className="h-full !p-0 overflow-hidden border-white/5 !bg-black/20 hover:border-neon-cyan/30 transition-all duration-500 shadow-2xl flex flex-col rounded-[2.5rem]">
                                            <div className="relative aspect-video overflow-hidden">
                                                <img
                                                    src={post.cover_image || 'https://via.placeholder.com/800x450'}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-neon-cyan text-black text-[8px] font-black uppercase tracking-tighter rounded-full shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                                                        {post.blog_categories?.name || 'Varios'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-8 flex-1 flex flex-col">
                                                <div className="flex items-center gap-4 mb-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {new Date(post.created_at).toLocaleDateString()}</span>
                                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> 5 MIN</span>
                                                </div>
                                                <h3 className="text-xl font-black italic mb-4 text-white group-hover:text-neon-cyan transition-colors line-clamp-2 uppercase tracking-tighter leading-none">
                                                    {post.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 font-medium italic">
                                                    "{post.excerpt}"
                                                </p>
                                                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-white italic uppercase tracking-widest group-hover:text-neon-cyan transition-colors inline-flex items-center gap-2">
                                                        LEER MÁS <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan text-[8px] font-black">
                                                            FG
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredPosts.length === 0 && (
                        <div className="text-center py-32 space-y-6">
                            <Search className="w-16 h-16 text-slate-800 mx-auto" />
                            <p className="text-xl font-black italic text-slate-600 uppercase tracking-widest">No se encontraron artículos</p>
                            <button
                                onClick={() => { setSearch(""); setSelectedCategory("all"); }}
                                className="text-neon-cyan text-[10px] font-black uppercase tracking-widest border-b border-neon-cyan pb-1"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
