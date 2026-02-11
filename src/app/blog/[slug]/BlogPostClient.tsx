"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Eye, User, BookMarkCheck } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPostClientProps {
    initialPost: any;
    slug: string;
}

export default function BlogPostClient({ initialPost, slug }: BlogPostClientProps) {
    const [post, setPost] = useState<any>(initialPost);

    useEffect(() => {
        // Increment views only on client
        const incrementViews = async () => {
            await supabase.rpc('increment_post_views', { post_slug: slug });
        };
        incrementViews();
    }, [slug]);

    if (!post) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl font-black italic">ARTÍCULO NO ENCONTRADO</h1>
            <a href="/blog" className="text-neon-cyan font-black uppercase tracking-widest flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> VOLVER AL BLOG
            </a>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-neon-cyan selection:text-black">
            <Navbar />

            <main className="pt-32 pb-20">
                <article className="container mx-auto px-6 max-w-4xl">
                    {/* Breadcrumb & Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <a href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-neon-cyan transition-colors text-[10px] font-black uppercase tracking-[.2em]">
                            <ArrowLeft className="w-4 h-4" /> REGRESAR A LAS ÚLTIMAS PUBLICACIONES
                        </a>
                    </motion.div>

                    {/* Header */}
                    <div className="space-y-8 mb-16">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[9px] font-black uppercase tracking-widest"
                        >
                            <BookMarkCheck className="w-3 h-3" /> {post.blog_categories?.name || 'Blog'}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter leading-none uppercase"
                        >
                            {post.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl md:text-2xl text-slate-400 font-medium italic leading-relaxed"
                        >
                            "{post.excerpt}"
                        </motion.p>

                        <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center text-neon-cyan">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white">{post.author_name}</span>
                                    <span className="text-[8px] opacity-60">ADMINISTRACIÓN CENTRAL</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(post.created_at).toLocaleDateString()}</div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 MIN LECTURA</div>
                            <div className="flex items-center gap-2"><Eye className="w-4 h-4" /> {post.views || 0} VISTAS</div>
                            <button className="flex items-center gap-2 hover:text-white transition-colors ml-auto">
                                <Share2 className="w-4 h-4" /> COMPARTIR
                            </button>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative aspect-video md:aspect-[21/9] rounded-[3rem] overflow-hidden mb-20 shadow-2xl shadow-neon-cyan/5 border border-white/5"
                    >
                        <img
                            src={post.cover_image || 'https://via.placeholder.com/1200x600'}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="prose prose-invert prose-neon max-w-none 
                        prose-headings:font-black prose-headings:italic prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-white
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-l-4 prose-h2:border-neon-cyan prose-h2:pl-6
                        prose-h3:text-xl prose-h3:mt-8 prose-h3:text-neon-cyan
                        prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-p:font-medium
                        prose-strong:text-white prose-strong:font-black
                        prose-li:text-slate-400 prose-li:text-lg
                        prose-hr:border-white/10
                        "
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    </motion.div>

                    {/* Footer Actions */}
                    <div className="mt-32 p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 text-center space-y-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-neon-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        <h2 className="text-3xl font-black italic tracking-tighter uppercase relative z-10">¿Te ha servido este artículo?</h2>
                        <p className="text-slate-400 font-medium relative z-10">Compártelo con alguien que necesite mejorar su experiencia digital.</p>
                        <div className="flex justify-center gap-4 relative z-10">
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Compartir en WhatsApp</button>
                            <button className="px-8 py-4 bg-neon-cyan text-black rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Copiar Enlace</button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
