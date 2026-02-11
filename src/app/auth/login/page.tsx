"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, LogIn, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Credenciales inválidas");
        } else {
            router.push("/admin"); // Redirect to admin or user dashboard based on role? (For now, Admin)
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white selection:bg-neon-cyan selection:text-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-neon-magenta/20 rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl shadow-black/50 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-slate-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500 relative">
                            <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full opacity-50 animate-pulse" />
                            <ShieldCheck className="w-10 h-10 text-neon-cyan relative z-10 drop-shadow-[0_0_15px_rgba(0,243,255,0.8)]" />
                        </div>
                        <h1 className="text-3xl font-black italic tracking-tighter mb-2">FIBER<span className="text-neon-cyan neon-text-cyan">GRAVITY</span></h1>
                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em]">Acceso Seguro al Panel de Control</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Usuario</label>
                            <div className="relative group/input">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-neon-cyan transition-colors" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium"
                                    placeholder="admin"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-4 tracking-widest">Contraseña</label>
                            <div className="relative group/input">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within/input:text-neon-cyan transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm focus:outline-none focus:border-neon-cyan/50 focus:bg-white/10 transition-all placeholder:text-slate-600 font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center uppercase tracking-wider flex items-center justify-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-neon-cyan to-blue-500 text-black font-black italic uppercase tracking-tighter text-lg rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.5)] flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center gap-2">INGRESAR AL SISTEMA <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                            Protegido por FiberGravity Auth v2.0
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
