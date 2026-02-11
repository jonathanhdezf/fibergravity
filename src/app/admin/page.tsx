"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    ArrowRight,
    Tv,
    Gamepad2,
    Briefcase,
    Building2,
    Video,
    RefreshCw,
    LogOut
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { NeonButton } from "@/components/ui/NeonButton";

interface Lead {
    id: string;
    created_at: string;
    full_name: string;
    phone: string;
    location: string;
    category: string;
    provider: string;
    plan_name: string;
    speed: string;
    price: string;
    status: string;
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        if (isAuthenticated) {
            fetchLeads();
        }
    }, [isAuthenticated]);

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching leads:", error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) {
            console.error("Error updating status:", error);
        } else {
            fetchLeads();
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple security proof of concept - in production use Supabase Auth
        if (password === "fiber2026") {
            setIsAuthenticated(true);
        } else {
            alert("Acceso Denegado. Credenciales Inválidas.");
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
            case 'contacting': return <RefreshCw className="w-4 h-4 text-neon-cyan animate-spin-slow" />;
            case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            default: return <AlertCircle className="w-4 h-4 text-slate-500" />;
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Gamer': return <Gamepad2 className="w-4 h-4" />;
            case 'Streamer': return <Video className="w-4 h-4" />;
            case 'HomeOffice': return <Briefcase className="w-4 h-4" />;
            case 'Enterprise': return <Building2 className="w-4 h-4" />;
            case 'TV': return <Tv className="w-4 h-4" />;
            default: return <Users className="w-4 h-4" />;
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <GlassCard className="p-10 border-white/5 text-center">
                        <div className="w-20 h-20 bg-neon-cyan/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-neon-cyan/20">
                            <Building2 className="w-10 h-10 text-neon-cyan" />
                        </div>
                        <h1 className="text-3xl font-black italic mb-2">AUDITORÍA <span className="text-neon-cyan neon-text-cyan">LEADS</span></h1>
                        <p className="text-slate-500 text-sm mb-10">Acceso restringido a personal de FiberGravity.</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-4">Clave de Acceso</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-center tracking-widest text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-white/[0.05] transition-all"
                                />
                            </div>
                            <NeonButton type="submit" className="w-full">
                                DESBLOQUEAR PANEL
                            </NeonButton>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    const filteredLeads = filter === "all" ? leads : leads.filter(l => l.status === filter);

    return (
        <div className="min-h-screen bg-[#020617] text-white p-4 md:p-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Sistema en Vivo</span>
                    </div>
                    <h1 className="text-4xl font-black italic">CONTROL <span className="text-neon-cyan neon-text-cyan underline decoration-white/10 underline-offset-8">CENTRAL</span></h1>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={fetchLeads}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
                    >
                        <RefreshCw className={`w-5 h-5 text-slate-400 group-hover:text-white ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                    >
                        <LogOut className="w-4 h-4" /> SALIR
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 text-black">
                <GlassCard className="p-6 border-white/5 !bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Total Leads</p>
                    <p className="text-4xl font-black italic text-white">{leads.length}</p>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 !bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Pendientes</p>
                    <p className="text-4xl font-black italic text-white">{leads.filter(l => l.status === 'pending').length}</p>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 !bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neon-cyan mb-2">En Proceso</p>
                    <p className="text-4xl font-black italic text-white">{leads.filter(l => l.status === 'contacting').length}</p>
                </GlassCard>
                <GlassCard className="p-6 border-white/5 !bg-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-2">Exitosos</p>
                    <p className="text-4xl font-black italic text-white">{leads.filter(l => l.status === 'completed').length}</p>
                </GlassCard>
            </div>

            {/* Main Table */}
            <GlassCard className="overflow-hidden border-white/5 !bg-black/40 text-black">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            placeholder="Buscar por nombre o teléfono..."
                            className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all w-full md:w-80"
                        />
                    </div>
                    <div className="flex gap-2">
                        {['all', 'pending', 'contacting', 'completed'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === s
                                        ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                                        : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.02] text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                                <th className="px-8 py-6">Cliente & Contacto</th>
                                <th className="px-8 py-6">Plan & Proveedor</th>
                                <th className="px-8 py-6">Ubicación</th>
                                <th className="px-8 py-6">Estado</th>
                                <th className="px-8 py-6">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredLeads.map((lead) => (
                                <motion.tr
                                    layout
                                    key={lead.id}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                                                {getCategoryIcon(lead.category)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-white">{lead.full_name}</p>
                                                <p className="text-xs text-slate-500">{lead.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-slate-300">{lead.provider}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold py-0.5 px-2 rounded bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20">{lead.plan_name}</span>
                                                <span className="text-[10px] text-slate-500 italic">{lead.price}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-xs text-slate-400 uppercase font-medium">{lead.location}</p>
                                        <p className="text-[10px] text-slate-600 font-mono mt-1">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {getStatusIcon(lead.status)}
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${lead.status === 'completed' ? 'text-emerald-500' :
                                                    lead.status === 'contacting' ? 'text-neon-cyan' :
                                                        lead.status === 'pending' ? 'text-amber-500' : 'text-slate-500'
                                                }`}>
                                                {lead.status === 'pending' ? 'PENDIENTE' :
                                                    lead.status === 'contacting' ? 'PROCESANDO' : 'LISTO'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex gap-2">
                                            {lead.status !== 'contacting' && lead.status !== 'completed' && (
                                                <button
                                                    onClick={() => updateStatus(lead.id, 'contacting')}
                                                    className="p-2 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all"
                                                    title="Marcar como En Contacto"
                                                >
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                            )}
                                            {lead.status !== 'completed' && (
                                                <button
                                                    onClick={() => updateStatus(lead.id, 'completed')}
                                                    className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                                                    title="Marcar como Finalizado"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                            {filteredLeads.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-500 italic text-sm">
                                        No se encontraron leads con estos criterios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            <footer className="mt-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest">
                FiberGravity Internal Logistics System v2.1 • Teziutlán Command Center
            </footer>
        </div>
    );
}
