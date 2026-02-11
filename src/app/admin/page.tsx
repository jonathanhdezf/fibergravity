"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    Filter,
    ArrowUpRight,
    Tv,
    Gamepad2,
    Briefcase,
    Building2,
    Video,
    RefreshCw,
    LogOut,
    TrendingUp,
    Smartphone,
    Monitor,
    Globe,
    Activity,
    Calendar,
    MousePointer2,
    Eye
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from "recharts";
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

interface Visit {
    id: string;
    created_at: string;
    device_type: string;
    browser: string;
    os: string;
    page_path: string;
}

const COLORS = ['#00f3ff', '#ff00ff', '#ffffff', '#3b82f6', '#10b981'];

export default function PremiumAdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "leads" | "traffic">("overview");
    const [searchQuery, setSearchQuery] = useState("");
    const [lastRefresh, setLastRefresh] = useState(new Date());

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
            const interval = setInterval(fetchData, 30000); // Auto refresh every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        const [leadsRes, visitsRes] = await Promise.all([
            supabase.from('leads').select('*').order('created_at', { ascending: false }),
            supabase.from('site_visits').select('*').order('created_at', { ascending: false }).limit(1000)
        ]);

        if (leadsRes.data) setLeads(leadsRes.data);
        if (visitsRes.data) setVisits(visitsRes.data);

        setLoading(false);
        setLastRefresh(new Date());
    };

    const updateStatus = async (id: string, newStatus: string) => {
        const { error } = await supabase.from('leads').update({ status: newStatus }).eq('id', id);
        if (!error) fetchData();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "fiber2026") setIsAuthenticated(true);
        else alert("Acceso Denegado.");
    };

    // Data Processing for Charts
    const chartData = useMemo(() => {
        const days: any = {};
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        last7Days.forEach(day => days[day] = { date: day.split('-').slice(1).join('/'), visits: 0, leads: 0 });

        visits.forEach(v => {
            const day = v.created_at.split('T')[0];
            if (days[day]) days[day].visits++;
        });

        leads.forEach(l => {
            const day = l.created_at.split('T')[0];
            if (days[day]) days[day].leads++;
        });

        return Object.values(days);
    }, [visits, leads]);

    const deviceData = useMemo(() => {
        const counts: any = { desktop: 0, mobile: 0, tablet: 0 };
        visits.forEach(v => { counts[v.device_type] = (counts[v.device_type] || 0) + 1; });
        return Object.entries(counts).map(([name, value]) => ({ name: name.toUpperCase(), value }));
    }, [visits]);

    const categoryData = useMemo(() => {
        const counts: any = {};
        leads.forEach(l => { counts[l.category] = (counts[l.category] || 0) + 1; });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [leads]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <GlassCard className="p-12 border-white/5 text-center max-w-md">
                        <div className="w-24 h-24 bg-gradient-to-tr from-cyan-500 to-magenta-500 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-cyan-500/20 rotate-12">
                            <Activity className="w-12 h-12 text-white -rotate-12" />
                        </div>
                        <h1 className="text-4xl font-black italic mb-2 tracking-tighter">FIBER<span className="text-neon-cyan neon-text-cyan">OS</span></h1>
                        <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-12">Command Center v3.0</p>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="ENTER KEY"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-center tracking-[0.5em] text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-black"
                                autoFocus
                            />
                            <NeonButton type="submit" className="w-full py-5">INITIALIZE SYSTEM</NeonButton>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-neon-cyan/30">
            {/* Sidebar / Top Nav */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-neon-cyan rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-black" />
                            </div>
                            <span className="font-black italic tracking-tighter text-xl">FIBER<span className="text-neon-cyan">OS</span></span>
                        </div>
                        <div className="hidden md:flex gap-1">
                            {[
                                { id: 'overview', icon: TrendingUp, label: 'Overview' },
                                { id: 'leads', icon: Users, label: 'Leads Hub' },
                                { id: 'traffic', icon: Globe, label: 'Live Traffic' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/10 text-neon-cyan' : 'text-slate-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <tab.icon className="w-4 h-4" /> {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex flex-col items-end mr-4">
                            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-1">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM ACTIVE
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 font-mono">Synced {lastRefresh.toLocaleTimeString()}</span>
                        </div>
                        <button onClick={() => setIsAuthenticated(false)} className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-24 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto">
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                            {/* Key Performance Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
                                {[
                                    { label: 'Visitas Totales', val: visits.length, icon: Eye, color: 'cyan', trend: '+12%' },
                                    { label: 'Nuevos Leads', val: leads.length, icon: Users, color: 'magenta', trend: '+5%' },
                                    { label: 'Conversión', val: `${((leads.length / Math.max(1, visits.length)) * 100).toFixed(1)}%`, icon: TrendingUp, color: 'emerald', trend: 'Optimized' },
                                    { label: 'Tiempo Real', val: Math.floor(Math.random() * 5) + 2, icon: Activity, color: 'white', trend: 'Live' }
                                ].map((stat, i) => (stat.val && (
                                    <GlassCard key={i} className="p-8 border-white/5 group hover:border-white/20 transition-all !bg-white/5">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-4 rounded-2xl bg-${stat.color === 'cyan' ? 'neon-cyan' : stat.color === 'magenta' ? 'neon-magenta' : 'white'}/10 border border-white/5`}>
                                                <stat.icon className={`w-6 h-6 text-${stat.color === 'cyan' ? 'neon-cyan' : stat.color === 'magenta' ? 'neon-magenta' : stat.color === 'emerald' ? 'emerald-500' : 'white'}`} />
                                            </div>
                                            <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">{stat.trend}</span>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                        <p className="text-4xl font-black italic text-white tracking-tighter">{stat.val}</p>
                                    </GlassCard>
                                )))}
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 text-black">
                                <GlassCard className="p-8 border-white/5 !bg-white/5 h-[450px]">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-neon-cyan" /> Traffic & Engagement Analysis
                                    </h3>
                                    <div className="h-[320px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={chartData}>
                                                <defs>
                                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3} />
                                                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="date" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                                <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                                />
                                                <Area type="monotone" dataKey="visits" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                                                <Area type="monotone" dataKey="leads" stroke="#ff00ff" strokeWidth={3} fill="transparent" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </GlassCard>

                                <GlassCard className="p-8 border-white/5 !bg-white/5 h-[450px]">
                                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Dispositivos</h3>
                                    <div className="h-[300px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={deviceData}
                                                    innerRadius={60}
                                                    outerRadius={100}
                                                    paddingAngle={8}
                                                    dataKey="value"
                                                >
                                                    {deviceData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-center gap-6 mt-4">
                                        {deviceData.map((d, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                                <span className="text-[10px] font-black uppercase text-slate-400">{d.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'leads' && (
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-6">
                            <GlassCard className="p-8 border-white/5 !bg-black/40 text-black">
                                <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                                    <div className="relative group w-full md:w-96">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                        <input
                                            placeholder="Audit Search (Name, Phone, Location)..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                        {['all', 'pending', 'contacting', 'completed'].map((s) => (
                                            <button
                                                key={s}
                                                className="px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 text-slate-500 hover:text-white transition-all whitespace-nowrap"
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {leads.filter(l => l.full_name.toLowerCase().includes(searchQuery.toLowerCase())).map((lead, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={lead.id}
                                            className="group flex flex-col md:flex-row items-center justify-between p-6 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04]"
                                        >
                                            <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                                                <div className={`p-5 rounded-[1.5rem] bg-${lead.category === 'Gamer' ? 'neon-cyan' : 'neon-magenta'}/10 border border-white/5`}>
                                                    {lead.category === 'Gamer' ? <Gamepad2 className="w-6 h-6 text-neon-cyan" /> : <Tv className="w-6 h-6 text-neon-magenta" />}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black text-white italic">{lead.full_name}</h4>
                                                    <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-widest">
                                                        <span>{lead.phone}</span>
                                                        <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                        <span className="text-slate-400">{lead.location}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center md:items-start gap-1 mb-4 md:mb-0">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{lead.provider}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs font-black text-neon-cyan italic uppercase">{lead.plan_name}</span>
                                                    <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 tracking-tighter">{lead.speed}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                <div className="text-right">
                                                    <p className="text-xl font-black italic text-white">{lead.price}</p>
                                                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{new Date(lead.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    {lead.status === 'pending' && (
                                                        <button onClick={() => updateStatus(lead.id, 'contacting')} className="p-4 rounded-2xl bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all">
                                                            <RefreshCw className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                    {lead.status !== 'completed' && (
                                                        <button onClick={() => updateStatus(lead.id, 'completed')} className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all">
                                                            <CheckCircle2 className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}

                    {activeTab === 'traffic' && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <GlassCard className="p-8 border-white/5 !bg-black/40 h-[600px] overflow-hidden flex flex-col text-black">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-emerald-500" /> Real-time Node Monitoring
                                </h3>
                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                    {visits.map((visit, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-white/5">
                                                    {visit.device_type === 'mobile' ? <Smartphone className="w-4 h-4 text-neon-magenta" /> : <Monitor className="w-4 h-4 text-neon-cyan" />}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-200 uppercase tracking-widest">{visit.page_path}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-bold text-slate-500">{visit.browser} on {visit.os}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] font-mono text-slate-600">{new Date(visit.created_at).toLocaleTimeString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="py-12 border-t border-white/5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-700">FiberGravity Intelligent Infrastructure • 2026</p>
            </footer>
        </div>
    );
}
