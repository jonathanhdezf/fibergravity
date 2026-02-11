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
    Eye,
    Edit2,
    Trash2,
    XCircle,
    Save,
    X,
    Menu,
    Package,
    Settings,
    Database,
    Plus,
    Check,
    Shield,
    Download,
    MessageCircle,
    FileText,
    Printer,
    FileUp,
    Loader2,
    User,
    Phone,
    AtSign,
    UserPlus,
    UserCheck
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
    rejection_reason?: string;
    ine_anverso?: string;
    ine_reverso?: string;
    comprobante_domicilio?: string;
    referencias_hogar?: string;
    assigned_to?: string;
}

interface Comisionista {
    id: string;
    full_name: string;
    phone: string;
    email: string;
    active: boolean;
    performance_score: number;
    created_at: string;
}

interface Provider {
    id: string;
    name: string;
    logo_url: string;
    website?: string;
    description?: string;
}

interface Plan {
    id: string;
    provider_id: string;
    name: string;
    type: string;
    category_name: string;
    speed: string;
    price: string;
    features: string[];
    recommendation?: string;
    ranking_score: number;
    color_scheme: string;
    icon_slug: string;
    is_active: boolean;
}

interface Visit {
    id: string;
    created_at: string;
    device_type: string;
    browser: string;
    os: string;
    page_path: string;
}

interface SystemLog {
    id: string;
    created_at: string;
    action: string;
    entity_type: string;
    entity_id: string;
    details: string;
    severity: string;
    admin_name: string;
}

const COLORS = ['#00f3ff', '#ff00ff', '#ffffff', '#3b82f6', '#10b981'];

export default function PremiumAdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [visits, setVisits] = useState<Visit[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "leads" | "traffic" | "inventory" | "integrations" | "logs" | "ventas">("overview");
    const [providers, setProviders] = useState<Provider[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [logs, setLogs] = useState<SystemLog[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [lastRefresh, setLastRefresh] = useState(new Date());
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [filter, setFilter] = useState("all");
    const [comisionistas, setComisionistas] = useState<Comisionista[]>([]);
    const [agentSelectionModal, setAgentSelectionModal] = useState<{ isOpen: boolean, leadId: string }>({ isOpen: false, leadId: "" });
    const [editingAgent, setEditingAgent] = useState<Comisionista | null>(null);

    // Print Style Fixes (Global for this page)
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @media print {
                html, body { 
                    background: white !important; 
                    color: black !important;
                    height: auto !important;
                    overflow: visible !important;
                }
                .print-hidden-important { display: none !important; }
                .print-force-visible { display: block !important; }
                #printable-dossier { 
                    display: block !important;
                    position: static !important;
                    width: 100% !important;
                    background: white !important;
                    padding: 40px !important;
                }
                @page { size: auto; margin: 15mm; }
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    // New States for Lead Management
    const [editingLead, setEditingLead] = useState<Lead | null>(null);
    const [editingProvider, setEditingProvider] = useState<Provider | null>(null);
    const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
    const [rejectionModal, setRejectionModal] = useState<{ isOpen: boolean, id: string, reason: string }>({ isOpen: false, id: "", reason: "" });
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [uploading, setUploading] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = event.target.files?.[0];
        if (!file || !editingLead) return;

        setUploading(field);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${editingLead.id}-${field}-${Date.now()}.${fileExt}`;
            const filePath = `leads/${editingLead.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('leads-documentation')
                .upload(filePath, file, {
                    upsert: true,
                    cacheControl: '3600'
                });

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('leads-documentation')
                .getPublicUrl(filePath);

            setEditingLead({ ...editingLead, [field]: publicUrl } as any);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error al subir el archivo. Asegúrate de que el bucket "leads-documentation" exista en Supabase.');
        } finally {
            setUploading(null);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
            const interval = setInterval(fetchData, 30000); // Auto refresh every 30s
            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        setLoading(true);
        const [leadsRes, visitsRes, providersRes, plansRes, logsRes, agentsRes] = await Promise.all([
            supabase.from('leads').select('*').order('created_at', { ascending: false }),
            supabase.from('site_visits').select('*').order('created_at', { ascending: false }).limit(1000),
            supabase.from('providers').select('*').order('name'),
            supabase.from('plans').select('*').order('ranking_score', { ascending: false }),
            supabase.from('system_logs').select('*').order('created_at', { ascending: false }).limit(500),
            supabase.from('comisionistas').select('*').order('full_name')
        ]);

        if (leadsRes.data) setLeads(leadsRes.data);
        if (visitsRes.data) setVisits(visitsRes.data);
        if (providersRes.data) setProviders(providersRes.data);
        if (plansRes.data) setPlans(plansRes.data);
        if (logsRes.data) setLogs(logsRes.data);
        if (agentsRes.data) setComisionistas(agentsRes.data);

        setLoading(false);
        setLastRefresh(new Date());
    };

    const logAction = async (action: string, entity_type: string, entity_id: string | null, details: string, severity: string = 'info') => {
        await supabase.from('system_logs').insert({
            action,
            entity_type,
            entity_id,
            details,
            severity,
            admin_name: 'System Admin'
        });
    };

    const updateStatus = async (id: string, newStatus: string, reason?: string, agentId?: string) => {
        // Validar flujo: No se puede finalizar sin haber pasado por contactando y tener agente
        if (newStatus === 'completed') {
            const currentLead = leads.find(l => l.id === id);
            if (!currentLead || currentLead.status !== 'contacting' || !currentLead.assigned_to) {
                alert("ERROR DE FLUJO: Solo los leads en estado 'Contactando' y con un agente asignado pueden ser finalizados.");
                return;
            }
        }

        // Si pasa a contactando y no hay agente, abrir modal de selección
        if (newStatus === 'contacting' && !agentId) {
            setAgentSelectionModal({ isOpen: true, leadId: id });
            return;
        }

        const updateData: any = { status: newStatus };
        if (reason) updateData.rejection_reason = reason;
        if (agentId) updateData.assigned_to = agentId;

        const { error } = await supabase.from('leads').update(updateData).eq('id', id);
        if (!error) {
            const agentName = agentId ? comisionistas.find(c => c.id === agentId)?.full_name : '';
            await logAction('STATUS_CHANGE', 'LEADS', id, `Cambiado status de lead a ${newStatus}${agentName ? ' (Asignado a ' + agentName + ')' : ''}${reason ? ': ' + reason : ''}`);
            fetchData();
            setRejectionModal({ isOpen: false, id: "", reason: "" });
            setAgentSelectionModal({ isOpen: false, leadId: "" });
        }
    };

    const saveAgent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingAgent) return;

        const { id, created_at, ...data } = editingAgent as any;
        const res = id
            ? await supabase.from('comisionistas').update(data).eq('id', id)
            : await supabase.from('comisionistas').insert(data);

        if (res.error) {
            console.error('Error saving agent:', res.error);
            alert(`Error al guardar agente: ${res.error.message}`);
            return;
        }

        await logAction(id ? 'UPDATE' : 'CREATE', 'AGENTS', id || 'NEW', `${id ? 'Actualizado' : 'Creado'} el comisionista: ${data.full_name}`);
        fetchData();
        setEditingAgent(null);
    };

    const deleteLead = async (id: string) => {
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) {
            console.error('Error deleting lead:', error);
            alert(`Error al eliminar lead: ${error.message}`);
            return;
        }

        await logAction('DELETE', 'LEADS', id, `Eliminado expediente de lead permanentemente`);
        fetchData();
        setDeleteConfirm(null);
    };

    const updateLeadData = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingLead) return;

        const { error } = await supabase
            .from('leads')
            .update({
                full_name: editingLead.full_name,
                phone: editingLead.phone,
                location: editingLead.location,
                plan_name: editingLead.plan_name,
                price: editingLead.price,
                ine_anverso: editingLead.ine_anverso,
                ine_reverso: editingLead.ine_reverso,
                comprobante_domicilio: editingLead.comprobante_domicilio,
                referencias_hogar: editingLead.referencias_hogar
            })
            .eq('id', editingLead.id);

        if (error) {
            console.error('Error updating lead data:', error);
            alert(`Error al actualizar lead: ${error.message}`);
            return;
        }

        await logAction('UPDATE', 'LEADS', editingLead.id, `Actualizados datos del lead: ${editingLead.full_name}`);
        fetchData();
        setEditingLead(null);
    };

    const deleteItem = async (table: string, id: string) => {
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) {
            console.error(`Error deleting from ${table}:`, error);
            alert(`Error al eliminar: ${error.message}`);
            return;
        }

        await logAction('DELETE', table.toUpperCase(), id, `Eliminado registro de la tabla ${table}`);
        fetchData();
    };

    const saveProvider = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProvider) return;

        const { id, ...data } = editingProvider as any;
        const res = id
            ? await supabase.from('providers').update(data).eq('id', id)
            : await supabase.from('providers').insert(data);

        if (res.error) {
            console.error('Error saving provider:', res.error);
            alert(`Error al guardar proveedor: ${res.error.message}`);
            return;
        }

        await logAction(id ? 'UPDATE' : 'CREATE', 'PROVIDERS', id || 'NEW', `${id ? 'Actualizado' : 'Creado'} el proveedor: ${data.name}`);
        fetchData();
        setEditingProvider(null);
    };

    const savePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingPlan) return;

        const { id, ...data } = editingPlan as any;
        // Fix for features which might be an array or string
        if (typeof data.features === 'string') {
            data.features = data.features.split(',').map((s: string) => s.trim());
        }

        const res = id
            ? await supabase.from('plans').update(data).eq('id', id)
            : await supabase.from('plans').insert(data);

        if (res.error) {
            console.error('Error saving plan:', res.error);
            alert(`Error al guardar plan: ${res.error.message}`);
            return;
        }

        await logAction(id ? 'UPDATE' : 'CREATE', 'PLANS', id || 'NEW', `${id ? 'Actualizado' : 'Creado'} el plan: ${data.name}`);
        fetchData();
        setEditingPlan(null);
    };

    // Filtered Content
    const filteredPlans = useMemo(() => {
        return plans.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            providers.find(prov => prov.id === p.provider_id)?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [plans, searchQuery, providers]);

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

    const agentPerformance = useMemo(() => {
        const stats: any = {};
        comisionistas.forEach(a => {
            const agentLeads = leads.filter(l => l.assigned_to === a.id);
            const completed = agentLeads.filter(l => l.status === 'completed').length;
            const total = agentLeads.length;
            stats[a.id] = total > 0 ? Math.round((completed / total) * 100) : 100;
        });
        return stats;
    }, [leads, comisionistas]);

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
                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-5 text-center tracking-[0.5em] text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-black text-lg"
                                autoFocus
                            />
                            <NeonButton type="submit" className="w-full py-5 text-sm">INITIALIZE SYSTEM</NeonButton>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-neon-cyan/30">
            {/* 1. ADMINISTRATION INTERFACE (Hidden when printing) */}
            <div className="print-hidden-important">
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
                                    { id: 'ventas', icon: UserPlus, label: 'Equipo Ventas' },
                                    { id: 'inventory', icon: Package, label: 'Catálogo' },
                                    { id: 'traffic', icon: Globe, label: 'Live Traffic' },
                                    { id: 'integrations', icon: Settings, label: 'Sistemas' },
                                    { id: 'logs', icon: Activity, label: 'Logs' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as any)}
                                        title={tab.label}
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

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                title="Menu"
                                className="md:hidden p-3 rounded-xl bg-white/5 text-white"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                            <button onClick={() => setIsAuthenticated(false)} title="Cerrar Sesión" className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-20 left-0 right-0 z-[49] bg-black/95 backdrop-blur-3xl border-b border-white/10 p-6 md:hidden"
                        >
                            <div className="flex flex-col gap-4">
                                {[
                                    { id: 'overview', icon: TrendingUp, label: 'Overview' },
                                    { id: 'leads', icon: Users, label: 'Leads Hub' },
                                    { id: 'ventas', icon: UserPlus, label: 'Equipo Ventas' },
                                    { id: 'inventory', icon: Package, label: 'Catálogo' },
                                    { id: 'traffic', icon: Globe, label: 'Live Traffic' },
                                    { id: 'integrations', icon: Settings, label: 'Sistemas' },
                                    { id: 'logs', icon: Activity, label: 'Logs' }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id as any);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`flex items-center gap-4 p-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-neon-cyan/10 text-neon-cyan' : 'text-slate-500'
                                            }`}
                                    >
                                        <tab.icon className="w-6 h-6" /> {tab.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                                                    <div
                                                        className="chart-legend-dot"
                                                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                                    />
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
                                    <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
                                        <div className="relative group w-full lg:w-96">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                            <input
                                                placeholder="Audit Search (Name, Phone, Location)..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/10 transition-all font-bold"
                                            />
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                                            {['all', 'pending', 'contacting', 'completed', 'rejected'].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setFilter(s)}
                                                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${filter === s
                                                        ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan'
                                                        : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                                                        }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => {
                                                const csv = [
                                                    ['ID', 'Fecha', 'Nombre', 'Telefono', 'Ubicacion', 'Categoria', 'Proveedor', 'Plan', 'Precio', 'Status'].join(','),
                                                    ...leads.map(l => [l.id, l.created_at, l.full_name, l.phone, l.location, l.category, l.provider, l.plan_name, l.price, l.status].join(','))
                                                ].join('\n');
                                                const blob = new Blob([csv], { type: 'text/csv' });
                                                const url = window.URL.createObjectURL(blob);
                                                const a = document.createElement('a');
                                                a.href = url;
                                                a.download = `leads_fibergravity_${new Date().toISOString().split('T')[0]}.csv`;
                                                a.click();
                                            }}
                                            className="px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" /> Exportar Leads
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {leads
                                            .filter(l => filter === 'all' || l.status === filter)
                                            .filter(l => l.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .map((lead, i) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                    key={lead.id}
                                                    className="group flex flex-col md:flex-row items-center justify-between p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all hover:bg-white/[0.04] gap-6"
                                                >
                                                    <div className="flex items-center gap-6 w-full md:w-auto mb-4 md:mb-0">
                                                        <div className={`p-5 rounded-[1.5rem] bg-${lead.category === 'Gamer' ? 'neon-cyan' : 'neon-magenta'}/10 border border-white/5`}>
                                                            {lead.category === 'Gamer' ? <Gamepad2 className="w-6 h-6 text-neon-cyan" /> : <Tv className="w-6 h-6 text-neon-magenta" />}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-3">
                                                                <h4 className="text-lg font-black text-white italic">{lead.full_name}</h4>
                                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${lead.status === 'rejected' ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                                    lead.status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                                        lead.status === 'contacting' ? 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan' :
                                                                            'bg-slate-500/10 border-white/10 text-slate-400'
                                                                    }`}>
                                                                    {lead.status}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-xs text-slate-500 font-bold uppercase tracking-widest">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        window.open(`https://wa.me/52${lead.phone.replace(/\D/g, '')}`, '_blank');
                                                                    }}
                                                                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all group cursor-pointer"
                                                                    title="Contactar por WhatsApp"
                                                                >
                                                                    <MessageCircle className="w-3.5 h-3.5" />
                                                                    <span className="font-mono">{lead.phone}</span>
                                                                </button>
                                                                <div className="w-1 h-1 rounded-full bg-slate-700" />
                                                                <span className="text-slate-400">{lead.location}</span>
                                                                {lead.assigned_to && (
                                                                    <>
                                                                        <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                                                                        <span className="text-emerald-500 font-black text-[9px] italic">
                                                                            ATENDIDO POR: {comisionistas.find(c => c.id === lead.assigned_to)?.full_name}
                                                                        </span>
                                                                    </>
                                                                )}
                                                                {(lead.ine_anverso || lead.referencias_hogar) && (
                                                                    <>
                                                                        <div className="w-1 h-1 rounded-full bg-neon-cyan/40" />
                                                                        <span className="text-neon-cyan font-black text-[9px] animate-pulse">DOCS OK</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-center md:items-start gap-1 mb-4 md:mb-0">
                                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{lead.provider}</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs font-black text-neon-cyan italic uppercase">{lead.plan_name}</span>
                                                            <span className="px-2 py-0.5 rounded-lg bg-white/5 text-[9px] font-bold text-slate-400 tracking-tighter">{lead.speed}</span>
                                                        </div>
                                                        {lead.status === 'rejected' && lead.rejection_reason && (
                                                            <span className="text-[9px] font-medium text-red-500/70 italic max-w-[200px] truncate" title={lead.rejection_reason}>
                                                                Motivo: {lead.rejection_reason}
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                                        <div className="text-right">
                                                            <p className="text-xl font-black italic text-white">{lead.price}</p>
                                                            <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{new Date(lead.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            {/* Status Update Actions */}
                                                            {lead.status === 'pending' && (
                                                                <button
                                                                    onClick={() => updateStatus(lead.id, 'contacting')}
                                                                    className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all"
                                                                    title="Procesar"
                                                                >
                                                                    <RefreshCw className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            {/* Solo permitir finalizar si está en seguimiento por un agente */}
                                                            {lead.status === 'contacting' && lead.assigned_to && (
                                                                <button
                                                                    onClick={() => updateStatus(lead.id, 'completed')}
                                                                    className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"
                                                                    title="Finalizar Contrato"
                                                                >
                                                                    <CheckCircle2 className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            {lead.status !== 'rejected' && (
                                                                <button
                                                                    onClick={() => setRejectionModal({ isOpen: true, id: lead.id, reason: "" })}
                                                                    className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                                    title="Rechazar"
                                                                >
                                                                    <XCircle className="w-5 h-5" />
                                                                </button>
                                                            )}

                                                            {/* Management Actions */}
                                                            <div className="w-px h-8 bg-white/10 mx-1 self-center" />

                                                            <button
                                                                onClick={() => setEditingLead(lead)}
                                                                className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                                                                title="Editar Datos"
                                                            >
                                                                <Edit2 className="w-5 h-5" />
                                                            </button>

                                                            <button
                                                                onClick={() => setDeleteConfirm(lead.id)}
                                                                className="p-3 rounded-xl bg-red-900/10 text-red-700 hover:bg-red-600 hover:text-white transition-all"
                                                                title="Eliminar Permanente"
                                                            >
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}

                        {activeTab === 'inventory' && (
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="space-y-8">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <h2 className="text-2xl font-black italic">CATÁLOGO DE <span className="text-neon-cyan neon-text-cyan">SERVICIOS</span></h2>
                                    <NeonButton className="py-3 px-6 text-[10px]" onClick={fetchData}>
                                        <RefreshCw className="w-3.5 h-3.5 mr-2" /> ACTUALIZAR DATOS
                                    </NeonButton>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-[1fr_2.5fr] gap-8">
                                    {/* Providers List */}
                                    <GlassCard className="p-6 border-white/5 !bg-black/40 h-fit text-black">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">Proveedores Activos</h3>
                                        <div className="space-y-3">
                                            {providers.map(p => (
                                                <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-white/5 p-2 border border-white/5 flex items-center justify-center">
                                                            {p.logo_url ? <img src={p.logo_url} alt={p.name} className="w-full h-full object-contain" /> : <Building2 className="w-5 h-5 text-slate-600" />}
                                                        </div>
                                                        <span className="font-bold text-sm text-white">{p.name}</span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => setEditingProvider(p)}
                                                            title="Editar Proveedor"
                                                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white/5 rounded-lg transition-all text-slate-500 hover:text-white"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteItem('providers', p.id)}
                                                            title="Eliminar Proveedor"
                                                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/10 rounded-lg transition-all text-slate-500 hover:text-red-500"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setEditingProvider({ id: '', name: '', logo_url: '' })}
                                            className="w-full mt-6 py-4 rounded-2xl border border-dashed border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:border-neon-cyan hover:text-neon-cyan transition-all flex items-center justify-center gap-2"
                                        >
                                            <Plus className="w-4 h-4" /> Registrar Proveedor
                                        </button>
                                    </GlassCard>

                                    {/* Plans Management */}
                                    <GlassCard className="p-8 border-white/5 !bg-black/40 text-black">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Gestión de Planes y Precios</h3>
                                            <div className="flex gap-4 w-full md:w-auto">
                                                <div className="relative group flex-1">
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                                    <input
                                                        placeholder="FILTRAR PLANES..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-3 text-[10px] text-white focus:outline-none focus:border-neon-cyan transition-all font-black tracking-widest"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setEditingPlan({ id: '', provider_id: providers[0]?.id || '', name: '', type: 'Gamer', category_name: '', speed: '', price: '', features: [], ranking_score: 0, color_scheme: 'cyan', icon_slug: 'zap', is_active: true })}
                                                    title="Nuevo Plan"
                                                    className="p-3 bg-neon-cyan text-black rounded-xl hover:scale-105 transition-all"
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto -mx-2">
                                            <table className="w-full text-left border-collapse min-w-[800px]">
                                                <thead>
                                                    <tr className="border-b border-white/5">
                                                        <th className="px-4 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-600">Plan / Producto</th>
                                                        <th className="px-4 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-600">Tipo</th>
                                                        <th className="px-4 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-600 text-center">Ranking</th>
                                                        <th className="px-4 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-600">Precio</th>
                                                        <th className="px-4 pb-4 text-[9px] font-black uppercase tracking-widest text-slate-600 text-right">Acciones</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/[0.02]">
                                                    {filteredPlans.length === 0 ? (
                                                        <tr>
                                                            <td colSpan={5} className="py-20 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest italic">
                                                                No hay planes que coincidan con la búsqueda.
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        filteredPlans.map(plan => (
                                                            <tr key={plan.id} className="group hover:bg-white/[0.01] transition-all">
                                                                <td className="px-4 py-6">
                                                                    <div>
                                                                        <p className="font-black italic text-lg text-white tracking-tighter mb-1">{plan.name}</p>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[9px] font-bold text-slate-500 uppercase">{providers.find(p => p.id === plan.provider_id)?.name || 'Desconocido'}</span>
                                                                            <div className="w-1 h-1 rounded-full bg-slate-800" />
                                                                            <span className="text-[9px] font-bold text-slate-400">{plan.speed}</span>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-6">
                                                                    <span className={`px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest text-neon-${plan.type === 'Gamer' ? 'cyan' : 'magenta'}`}>
                                                                        {plan.type}
                                                                    </span>
                                                                </td>
                                                                <td className="px-4 py-6 text-center">
                                                                    <div className="inline-flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                                        <Activity className="w-3 h-3 text-emerald-500" />
                                                                        <span className="text-[10px] font-black text-white">{plan.ranking_score}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="px-4 py-6">
                                                                    <span className="text-lg font-black italic text-white">{plan.price}</span>
                                                                </td>
                                                                <td className="px-4 py-6 text-right">
                                                                    <div className="flex justify-end gap-2">
                                                                        <button
                                                                            onClick={() => setEditingPlan(plan)}
                                                                            title="Editar Plan"
                                                                            className="p-3 rounded-xl bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all"
                                                                        >
                                                                            <Edit2 className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => deleteItem('plans', plan.id)}
                                                                            title="Eliminar Plan"
                                                                            className="p-3 rounded-xl bg-red-500/5 text-red-900/50 hover:text-red-500 hover:bg-red-500/10 transition-all"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </GlassCard>
                                </div>
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

                        {activeTab === 'integrations' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
                                <h2 className="text-2xl font-black italic">SISTEMAS E <span className="text-neon-magenta neon-text-magenta">INTEGRACIONES</span></h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
                                    <GlassCard className="p-8 border-white/5 !bg-white/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 rounded-xl bg-neon-magenta/10 text-neon-magenta">
                                                <Database className="w-6 h-6" />
                                            </div>
                                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase">Online</span>
                                        </div>
                                        <h3 className="text-sm font-black italic uppercase text-white mb-2">Database Cluster</h3>
                                        <p className="text-[10px] text-slate-500 font-bold mb-6">Supabase PostgreSQL Connection</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[95%] bg-neon-magenta shadow-[0_0_10px_#ff00ff]" />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-500">95%</span>
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="p-8 border-white/5 !bg-white/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 rounded-xl bg-neon-cyan/10 text-neon-cyan">
                                                <Globe className="w-6 h-6" />
                                            </div>
                                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase">Active</span>
                                        </div>
                                        <h3 className="text-sm font-black italic uppercase text-white mb-2">CDN Edge Nodes</h3>
                                        <p className="text-[10px] text-slate-500 font-bold mb-6">Global Content Delivery Network</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[88%] bg-neon-cyan shadow-[0_0_10px_#00f3ff]" />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-500">88%</span>
                                        </div>
                                    </GlassCard>

                                    <GlassCard className="p-8 border-white/5 !bg-white/5">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 rounded-xl bg-white/10 text-white">
                                                <Shield className="w-6 h-6" />
                                            </div>
                                            <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase">Secure</span>
                                        </div>
                                        <h3 className="text-sm font-black italic uppercase text-white mb-2">Auth Firewall</h3>
                                        <p className="text-[10px] text-slate-500 font-bold mb-6">Security Layer & Authentication</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[100%] bg-white shadow-[0_0_10px_#ffffff]" />
                                            </div>
                                            <span className="text-[9px] font-mono text-slate-500">100%</span>
                                        </div>
                                    </GlassCard>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'ventas' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h2 className="text-5xl font-black italic tracking-tighter mb-2 uppercase">EQUIPO DE <span className="text-neon-cyan">VENTAS</span></h2>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Gestión de Comisionistas y Performance</p>
                                    </div>
                                    <button
                                        onClick={() => setEditingAgent({ id: '', full_name: '', phone: '', email: '', active: true, performance_score: 100, created_at: '' })}
                                        className="px-8 py-4 bg-neon-cyan text-black font-black italic tracking-tighter rounded-2xl hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-neon-cyan/20"
                                    >
                                        + ALTA COMISIONISTA
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {comisionistas.map((agent) => (
                                        <GlassCard key={agent.id} className="p-8 border-white/5 group hover:border-neon-cyan/20 transition-all text-black">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                                    <User className="w-8 h-8 text-slate-400 group-hover:text-neon-cyan transition-colors" />
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Success Rate</p>
                                                    <p className="text-2xl font-black text-white italic">{agentPerformance[agent.id] || 0}%</p>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black italic uppercase mb-2 tracking-tight text-white">{agent.full_name}</h3>
                                            <div className="space-y-2 mb-8">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                    <Phone className="w-3 h-3" /> {agent.phone}
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                                    <AtSign className="w-3 h-3" /> {agent.email}
                                                </p>
                                            </div>
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => setEditingAgent(agent)}
                                                    className="flex-1 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all text-white"
                                                >
                                                    EDITAR
                                                </button>
                                                <button
                                                    onClick={() => deleteItem('comisionistas', agent.id)}
                                                    title="Eliminar Agente"
                                                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>

                                {/* Agent Edit Modal */}
                                {editingAgent && (
                                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingAgent(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg">
                                            <GlassCard className="p-10 border-white/10 !bg-slate-900 shadow-2xl rounded-[2.5rem] text-white">
                                                <form onSubmit={saveAgent} className="space-y-6">
                                                    <div className="text-center mb-8">
                                                        <h3 className="text-2xl font-black italic uppercase">Gestión de <span className="text-neon-cyan">Agente</span></h3>
                                                        <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">{editingAgent.id ? 'Actualizar Expediente' : 'Nuevo Registro de Ventas'}</p>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="space-y-1">
                                                            <label className="text-[10PX] font-black uppercase text-slate-500 ml-2">Nombre Completo</label>
                                                            <input
                                                                title="Nombre Agente"
                                                                value={editingAgent.full_name}
                                                                onChange={e => setEditingAgent({ ...editingAgent, full_name: e.target.value })}
                                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-neon-cyan focus:outline-none uppercase"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-1">
                                                                <label className="text-[10PX] font-black uppercase text-slate-500 ml-2">Teléfono</label>
                                                                <input
                                                                    title="Teléfono Agente"
                                                                    value={editingAgent.phone}
                                                                    onChange={e => setEditingAgent({ ...editingAgent, phone: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-neon-cyan focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <label className="text-[10PX] font-black uppercase text-slate-500 ml-2">Score (%)</label>
                                                                <input
                                                                    title="Score Agente"
                                                                    type="number"
                                                                    value={editingAgent.performance_score}
                                                                    onChange={e => setEditingAgent({ ...editingAgent, performance_score: parseInt(e.target.value) || 0 })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-neon-cyan focus:outline-none"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <label className="text-[10PX] font-black uppercase text-slate-500 ml-2">Email Corporativo</label>
                                                            <input
                                                                title="Email Agente"
                                                                type="email"
                                                                value={editingAgent.email}
                                                                onChange={e => setEditingAgent({ ...editingAgent, email: e.target.value })}
                                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-neon-cyan focus:outline-none"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4 pt-4">
                                                        <button type="button" onClick={() => setEditingAgent(null)} className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest">DESCARTAR</button>
                                                        <NeonButton type="submit" className="flex-1 py-4 text-[10px]">GUARDAR AGENTE</NeonButton>
                                                    </div>
                                                </form>
                                            </GlassCard>
                                        </motion.div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                        {activeTab === 'logs' && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-black italic">AUDITORÍA DE <span className="text-emerald-500 neon-text-emerald">SISTEMA</span></h2>
                                    <button
                                        onClick={() => {
                                            const csv = [
                                                ['Fecha', 'Action', 'Entity', 'Details', 'Admin'].join(','),
                                                ...logs.map(log => [new Date(log.created_at).toLocaleString(), log.action, log.entity_type, log.details, log.admin_name].join(','))
                                            ].join('\n');
                                            const blob = new Blob([csv], { type: 'text/csv' });
                                            const url = window.URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `audit_logs_${new Date().toISOString()}.csv`;
                                            a.click();
                                        }}
                                        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" /> Exportar Auditoría
                                    </button>
                                </div>

                                <GlassCard className="p-0 border-white/5 !bg-black/60 overflow-hidden text-black">
                                    <div className="max-h-[700px] overflow-auto custom-scrollbar">
                                        <table className="w-full text-left border-collapse min-w-[1000px]">
                                            <thead className="sticky top-0 bg-slate-900 border-b border-white/5 z-10">
                                                <tr>
                                                    <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-500">Timestamp</th>
                                                    <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-slate-500">Acción</th>
                                                    <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-slate-500">Entidad</th>
                                                    <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-slate-500">Descripción del Cambio</th>
                                                    <th className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-slate-500">Admin</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/[0.02]">
                                                {logs.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={5} className="py-20 text-center text-slate-600 font-bold uppercase text-[10px] tracking-widest">No se registran actividades recientes en el núcleo.</td>
                                                    </tr>
                                                ) : (
                                                    logs.map((log) => (
                                                        <tr key={log.id} className="hover:bg-white/[0.01] transition-all group">
                                                            <td className="px-8 py-5 whitespace-nowrap">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[11px] font-mono text-emerald-500/70">{new Date(log.created_at).toLocaleDateString()}</span>
                                                                    <span className="text-[10px] font-mono text-slate-500">{new Date(log.created_at).toLocaleTimeString()}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase border ${log.action.includes('DELETE') ? 'bg-red-500/10 border-red-500/20 text-red-500' :
                                                                    log.action.includes('CREATE') ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                                                        log.action.includes('UPDATE') ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                                                                            'bg-white/5 border-white/10 text-slate-400'
                                                                    }`}>
                                                                    {log.action}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <span className="text-[10px] font-black uppercase text-slate-400 font-mono tracking-tighter">
                                                                    {log.entity_type}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-5">
                                                                <p className="text-xs text-slate-200 font-medium">{log.details}</p>
                                                            </td>
                                                            <td className="px-6 py-5 whitespace-nowrap">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{log.admin_name}</span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* MODALS SECTION */}
                <AnimatePresence>
                    {editingLead && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingLead(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-3xl max-h-[90vh] flex flex-col"
                            >
                                <GlassCard className="border-white/10 !bg-slate-950/90 shadow-2xl flex flex-col overflow-hidden p-0 rounded-[2.5rem]">
                                    {/* FIXED HEADER */}
                                    <div className="p-8 pb-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                        <div>
                                            <h2 className="text-2xl font-black italic mb-1 uppercase tracking-tighter">
                                                MODIFICAR <span className="text-neon-cyan neon-text-cyan">EXPEDIENTE</span>
                                            </h2>
                                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID: {editingLead.id.split('-')[0]}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => window.print()}
                                                title="Descargar Dossier"
                                                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
                                            >
                                                <Printer className="w-5 h-5" /> EXPEDIENTE
                                            </button>
                                            <button onClick={() => setEditingLead(null)} title="Cerrar" className="p-3 hover:bg-white/5 rounded-2xl transition-all text-slate-500 hover:text-white border border-transparent hover:border-white/10"><X className="w-6 h-6" /></button>
                                        </div>
                                    </div>

                                    {/* SCROLLABLE BODY */}
                                    <form onSubmit={updateLeadData} className="flex-1 overflow-y-auto custom-scrollbar p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Nombre Completo</label>
                                                    <input
                                                        title="Nombre Completo"
                                                        placeholder="Nombre del Cliente"
                                                        value={editingLead.full_name}
                                                        onChange={(e) => setEditingLead({ ...editingLead, full_name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all uppercase"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Teléfono</label>
                                                    <input
                                                        title="Teléfono"
                                                        placeholder="Número de contacto"
                                                        value={editingLead.phone}
                                                        onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Plan Seleccionado</label>
                                                    <input
                                                        title="Nombre del Plan"
                                                        placeholder="Ej. Gamer 500MB"
                                                        value={editingLead.plan_name}
                                                        onChange={(e) => setEditingLead({ ...editingLead, plan_name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all uppercase"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Precio</label>
                                                    <input
                                                        title="Precio"
                                                        placeholder="Costo mensual"
                                                        value={editingLead.price}
                                                        onChange={(e) => setEditingLead({ ...editingLead, price: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-[10px] font-black uppercase text-slate-500 ml-2">Ubicación / Barrio</label>
                                                <input
                                                    title="Ubicación"
                                                    placeholder="Ciudad o Barrio"
                                                    value={editingLead.location}
                                                    onChange={(e) => setEditingLead({ ...editingLead, location: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all uppercase"
                                                />
                                            </div>

                                            {editingLead.status === 'rejected' && editingLead.rejection_reason && (
                                                <div className="md:col-span-2 p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10">
                                                    <label className="text-[9px] font-black uppercase text-red-500/60 ml-1">Motivo de Rechazo</label>
                                                    <p className="text-sm font-bold text-red-500/90 mt-1 italic uppercase underline decoration-red-500/20 underline-offset-4">
                                                        {editingLead.rejection_reason}
                                                    </p>
                                                </div>
                                            )}

                                            {/* DOCUMENTACIÓN DINÁMICA */}
                                            {(editingLead.status === 'contacting' || editingLead.status === 'completed' || editingLead.ine_anverso) && (
                                                <div className="md:col-span-2 space-y-8 pt-8 border-t border-white/5">
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="text-xs font-black text-neon-cyan flex items-center gap-3">
                                                            <Shield className="w-5 h-5" /> ARCHIVO OFICIAL DEL CLIENTE
                                                        </h3>
                                                        <span className="text-[8px] font-black bg-neon-cyan/10 text-neon-cyan px-2 py-1 rounded border border-neon-cyan/20">Fase: GESTIÓN</span>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        {/* INE ANVERSO */}
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">INE (Anverso)</label>
                                                            <div className="relative group">
                                                                {editingLead.ine_anverso ? (
                                                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40">
                                                                        <img src={editingLead.ine_anverso} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="INE Anverso" />
                                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 gap-4">
                                                                            <label className="p-3 bg-neon-cyan/20 border border-neon-cyan/40 rounded-2xl text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all cursor-pointer">
                                                                                <FileUp className="w-5 h-5" />
                                                                                <input title="Cambiar Foto Anverso" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'ine_anverso')} />
                                                                            </label>
                                                                            <button
                                                                                type="button"
                                                                                title="Eliminar Foto"
                                                                                onClick={() => setEditingLead({ ...editingLead, ine_anverso: "" })}
                                                                                className="p-3 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                                            >
                                                                                <Trash2 className="w-5 h-5" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <label className="aspect-video rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:border-neon-cyan/30 transition-all cursor-pointer">
                                                                        {uploading === 'ine_anverso' ? (
                                                                            <Loader2 className="w-8 h-8 text-neon-cyan animate-spin" />
                                                                        ) : (
                                                                            <FileUp className="w-8 h-8 text-slate-700" />
                                                                        )}
                                                                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-center px-4">Seleccionar Imagen Anverso</p>
                                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'ine_anverso')} />
                                                                    </label>
                                                                )}
                                                                <div className="mt-4 flex gap-2">
                                                                    <input
                                                                        title="INE Anverso URL"
                                                                        placeholder="O ingresa URL manual..."
                                                                        value={editingLead.ine_anverso || ""}
                                                                        onChange={(e) => setEditingLead({ ...editingLead, ine_anverso: e.target.value })}
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[10px] focus:border-neon-cyan focus:outline-none placeholder:text-slate-700"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* INE REVERSO */}
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">INE (Reverso)</label>
                                                            <div className="relative group">
                                                                {editingLead.ine_reverso ? (
                                                                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black/40">
                                                                        <img src={editingLead.ine_reverso} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="INE Reverso" />
                                                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 gap-4">
                                                                            <label className="p-3 bg-neon-magenta/20 border border-neon-magenta/40 rounded-2xl text-neon-magenta hover:bg-neon-magenta hover:text-white transition-all cursor-pointer">
                                                                                <FileUp className="w-5 h-5" />
                                                                                <input title="Cambiar Foto Reverso" type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'ine_reverso')} />
                                                                            </label>
                                                                            <button
                                                                                type="button"
                                                                                title="Eliminar Foto"
                                                                                onClick={() => setEditingLead({ ...editingLead, ine_reverso: "" })}
                                                                                className="p-3 bg-red-500/20 border border-red-500/40 rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                                            >
                                                                                <Trash2 className="w-5 h-5" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <label className="aspect-video rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:border-neon-magenta/30 transition-all cursor-pointer">
                                                                        {uploading === 'ine_reverso' ? (
                                                                            <Loader2 className="w-8 h-8 text-neon-magenta animate-spin" />
                                                                        ) : (
                                                                            <FileUp className="w-8 h-8 text-slate-700" />
                                                                        )}
                                                                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest text-center px-4">Seleccionar Imagen Reverso</p>
                                                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'ine_reverso')} />
                                                                    </label>
                                                                )}
                                                                <div className="mt-4 flex gap-2">
                                                                    <input
                                                                        title="INE Reverso URL"
                                                                        placeholder="O ingresa URL manual..."
                                                                        value={editingLead.ine_reverso || ""}
                                                                        onChange={(e) => setEditingLead({ ...editingLead, ine_reverso: e.target.value })}
                                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[10px] focus:border-neon-magenta focus:outline-none placeholder:text-slate-700"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* COMPROBANTE DOMICILIO */}
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Comprobante de Domicilio</label>
                                                            <div className="flex gap-4">
                                                                <label className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 cursor-pointer hover:bg-white/10 transition-all">
                                                                    {uploading === 'comprobante_domicilio' ? (
                                                                        <Loader2 className="w-6 h-6 text-neon-cyan animate-spin" />
                                                                    ) : (
                                                                        <FileUp className="w-6 h-6 text-slate-500" />
                                                                    )}
                                                                    <input type="file" className="hidden" accept="image/*,application/pdf" onChange={(e) => handleFileUpload(e, 'comprobante_domicilio')} />
                                                                </label>
                                                                <input
                                                                    title="Comprobante Domicilio"
                                                                    placeholder="URL del documento o usa el botón de subir..."
                                                                    value={editingLead.comprobante_domicilio || ""}
                                                                    onChange={(e) => setEditingLead({ ...editingLead, comprobante_domicilio: e.target.value })}
                                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* REFERENCIAS */}
                                                        <div className="space-y-2 md:col-span-2">
                                                            <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Notas y Referencias del Hogar</label>
                                                            <textarea
                                                                title="Referencias del Hogar"
                                                                placeholder="Describe detalladamente la fachada, puntos de referencia, entre qué calles se encuentra..."
                                                                value={editingLead.referencias_hogar || ""}
                                                                onChange={(e) => setEditingLead({ ...editingLead, referencias_hogar: e.target.value })}
                                                                rows={3}
                                                                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-sm focus:border-neon-cyan focus:outline-none transition-all resize-none uppercase leading-relaxed font-bold tracking-tight bg-gradient-to-br from-white/[0.02] to-transparent"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* FIXED FOOTER */}
                                        <div className="mt-12 sticky bottom-0 bg-slate-950/80 backdrop-blur-md pt-6 pb-2 border-t border-white/5 -mx-8 -mb-8 px-8">
                                            <NeonButton type="submit" className="w-full py-5 !tracking-[0.5em] text-xs font-black italic">
                                                SINCRONIZAR CAMBIOS DE EXPEDIENTE
                                            </NeonButton>
                                        </div>
                                    </form>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}

                    {/* 1b. PROVIDER MODAL (Add/Edit) */}
                    {editingProvider && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingProvider(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md">
                                <GlassCard className="p-10 border-white/10 !bg-slate-900 shadow-2xl">
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-xl font-black italic">{editingProvider.id ? 'EDITAR' : 'NUEVO'} <span className="text-neon-cyan">PROVEEDOR</span></h2>
                                        <button onClick={() => setEditingProvider(null)} title="Cerrar" className="p-2 hover:bg-white/5 rounded-lg transition-all"><X className="w-6 h-6" /></button>
                                    </div>
                                    <form onSubmit={saveProvider} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nombre Comercial</label>
                                            <input
                                                required
                                                title="Nombre del Proveedor"
                                                placeholder="Ej. Totalplay"
                                                value={editingProvider.name}
                                                onChange={(e) => setEditingProvider({ ...editingProvider, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">URL del Logo (PNG/SVG)</label>
                                            <input
                                                required
                                                title="URL del Logo"
                                                placeholder="https://..."
                                                value={editingProvider.logo_url}
                                                onChange={(e) => setEditingProvider({ ...editingProvider, logo_url: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <NeonButton type="submit" className="w-full py-4">GUARDAR PROVEEDOR</NeonButton>
                                    </form>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}

                    {/* 1c. PLAN MODAL (Add/Edit) */}
                    {editingPlan && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingPlan(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-2xl">
                                <GlassCard className="p-10 border-white/10 !bg-slate-900 shadow-2xl h-[80vh] overflow-y-auto custom-scrollbar">
                                    <div className="flex justify-between items-center mb-10">
                                        <h2 className="text-xl font-black italic">{editingPlan.id ? 'EDITAR' : 'NUEVO'} <span className="text-neon-magenta">PLAN</span></h2>
                                        <button onClick={() => setEditingPlan(null)} title="Cerrar" className="p-2 hover:bg-white/5 rounded-lg transition-all"><X className="w-6 h-6" /></button>
                                    </div>
                                    <form onSubmit={savePlan} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Proveedor</label>
                                            <select
                                                title="Seleccionar Proveedor"
                                                value={editingPlan.provider_id}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, provider_id: e.target.value })}
                                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            >
                                                {providers.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Nombre del Plan</label>
                                            <input
                                                required
                                                title="Nombre del Plan"
                                                placeholder="Ej. Plan Ultra 500"
                                                value={editingPlan.name}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Tipo</label>
                                            <select
                                                title="Tipo de Plan"
                                                value={editingPlan.type}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, type: e.target.value })}
                                                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            >
                                                <option value="Gamer">Gamer</option>
                                                <option value="Streamer">Streamer</option>
                                                <option value="Home Office">Home Office</option>
                                                <option value="Empresas">Empresas</option>
                                                <option value="Television">Television</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Velocidad</label>
                                            <input
                                                title="Velocidad del Plan"
                                                placeholder="Ej. 500 MB"
                                                value={editingPlan.speed}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, speed: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Precio</label>
                                            <input
                                                title="Precio Mensual"
                                                placeholder="Ej. $499"
                                                value={editingPlan.price}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, price: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Ranking (0-100)</label>
                                            <input
                                                type="number"
                                                title="Puntuación de Ranking"
                                                placeholder="95"
                                                value={editingPlan.ranking_score}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, ranking_score: parseInt(e.target.value) })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <label className="text-[9px] font-black uppercase text-slate-500 ml-2">Características (Separadas por coma)</label>
                                            <textarea
                                                title="Características del Plan"
                                                placeholder="WIFI 6, Instalación Gratis, App Premium"
                                                value={Array.isArray(editingPlan.features) ? editingPlan.features.join(', ') : editingPlan.features}
                                                onChange={(e) => setEditingPlan({ ...editingPlan, features: e.target.value as any })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-neon-cyan focus:outline-none transition-all h-24"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <NeonButton variant="magenta" type="submit" className="w-full py-4">GUARDAR PLAN</NeonButton>
                                        </div>
                                    </form>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}

                    {/* 2. REJECTION MODAL */}
                    {rejectionModal.isOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRejectionModal({ isOpen: false, id: "", reason: "" })} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-md">
                                <GlassCard className="p-8 border-red-500/20 !bg-slate-900 shadow-2xl shadow-red-500/10">
                                    <div className="text-center mb-8">
                                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
                                            <XCircle className="w-8 h-8 text-red-500" />
                                        </div>
                                        <h3 className="text-xl font-black italic">RECHAZAR <span className="text-red-500">CLIENTE</span></h3>
                                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2">Justifica la cancelación del lead</p>
                                    </div>
                                    <div className="space-y-6">
                                        <textarea
                                            placeholder="Ej. Fuera de cobertura, No responde llamadas, Plan no viable..."
                                            value={rejectionModal.reason}
                                            onChange={(e) => setRejectionModal({ ...rejectionModal, reason: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:border-red-500 focus:outline-none transition-all h-32 uppercase font-bold"
                                            autoFocus
                                        />
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setRejectionModal({ isOpen: false, id: "", reason: "" })}
                                                className="flex-1 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                CANCELAR
                                            </button>
                                            <button
                                                onClick={() => updateStatus(rejectionModal.id, 'rejected', rejectionModal.reason)}
                                                disabled={!rejectionModal.reason}
                                                className="flex-1 py-4 rounded-2xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                                            >
                                                RECHAZAR LEAD
                                            </button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}

                    {/* 3. DELETE CONFIRMATION */}
                    {deleteConfirm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteConfirm(null)} className="absolute inset-0 bg-red-950/40 backdrop-blur-xl" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-sm text-center">
                                <GlassCard className="p-8 border-red-500/50 !bg-black">
                                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Trash2 className="w-10 h-10 text-red-500 animate-bounce" />
                                    </div>
                                    <h3 className="text-2xl font-black italic mb-2">¿ELIMINAR <span className="text-red-500">LEAD?</span></h3>
                                    <p className="text-slate-400 text-xs mb-8">Esta acción es irreversible y eliminará el expediente de la base de datos centralizada.</p>
                                    <div className="flex gap-4">
                                        <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-white/10 font-bold transition-all">NO, VOLVER</button>
                                        <button onClick={() => deleteLead(deleteConfirm)} className="flex-1 py-4 rounded-xl bg-red-600 hover:bg-red-700 font-bold transition-all shadow-xl shadow-red-600/20">SÍ, ELIMINAR</button>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}

                    {/* 4. AGENT SELECTION MODAL */}
                    {agentSelectionModal.isOpen && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setAgentSelectionModal({ isOpen: false, leadId: "" })} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-xl text-white">
                                <GlassCard className="p-10 border-neon-cyan/20 !bg-slate-900 shadow-2xl rounded-[2.5rem]">
                                    <div className="text-center mb-10">
                                        <div className="w-20 h-20 bg-neon-cyan/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-cyan/20">
                                            <UserCheck className="w-10 h-10 text-neon-cyan" />
                                        </div>
                                        <h3 className="text-2xl font-black italic uppercase">ASIGNAR <span className="text-neon-cyan">COMISIONISTA</span></h3>
                                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Selecciona al responsable de este cierre de ventas</p>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                                        {comisionistas.filter(c => c.active).map((agent) => (
                                            <button
                                                key={agent.id}
                                                onClick={() => updateStatus(agentSelectionModal.leadId, 'contacting', undefined, agent.id)}
                                                className="group flex items-center justify-between p-6 bg-white/5 border border-white/5 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 rounded-[2rem] transition-all text-left"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-all">
                                                        <User className="w-6 h-6 text-slate-500 group-hover:text-neon-cyan" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black italic uppercase text-white group-hover:text-neon-cyan transition-colors">{agent.full_name}</p>
                                                        <p className="text-[10px] font-bold text-slate-500 uppercase">Score: {agent.performance_score}%</p>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-5 h-5 text-slate-700 group-hover:text-neon-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setAgentSelectionModal({ isOpen: false, leadId: "" })}
                                        className="w-full mt-8 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        CANCELAR ASIGNACIÓN
                                    </button>
                                </GlassCard>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence >
            </div >

            {/* 2. PREMIUM PRINTABLE DOSSIER (Visible ONLY during print spools) */}
            {
                editingLead && (
                    <div id="printable-dossier" className="hidden print-force-visible dossier-root">
                        {/* Stamp: RECHAZADO */}
                        {editingLead.status === 'rejected' && (
                            <div className="dossier-stamp-rejected">
                                RECHAZADO
                                <div className="dossier-rejected-reason">
                                    MOTIVO: {editingLead.rejection_reason || "PENDIENTE DE ESPECIFICAR"}
                                </div>
                            </div>
                        )}
                        {/* Header: High Contrast & Simple */}
                        <div className="dossier-header">
                            <div>
                                <h1 className="dossier-header-title">FIBERGRAVITY</h1>
                                <p className="dossier-header-subtitle">OFFICIAL LOGISTICS DOSSIER v3.0</p>
                            </div>
                            <div>
                                <p className="dossier-folio-label">FOLIO DE GESTIÓN</p>
                                <p className="dossier-folio-value">#{editingLead.id.split('-')[0].toUpperCase()}</p>
                                <p className="dossier-timestamp">{new Date().toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Section 01: Client Data */}
                        <div className="dossier-section">
                            <h3 className="dossier-section-title">01. IDENTIFICACIÓN DEL CLIENTE</h3>
                            <div className="dossier-grid-card">
                                <div>
                                    <p className="dossier-field-label">NOMBRE COMPLETO</p>
                                    <p className="dossier-field-value">{editingLead.full_name}</p>
                                </div>
                                <div>
                                    <p className="dossier-field-label">TELÉFONO DE CONTACTO</p>
                                    <p className="dossier-field-value">{editingLead.phone}</p>
                                </div>
                                <div className="col-span-2">
                                    <p className="dossier-field-label">UBICACIÓN REGISTRADA</p>
                                    <p className="dossier-field-value">{editingLead.location}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 02: Service Details */}
                        <div className="dossier-section">
                            <h3 className="dossier-section-title">02. DETALLES DEL SERVICIO ASIGNADO</h3>
                            <div className="dossier-grid-card">
                                <div>
                                    <p className="dossier-field-label">PROVEEDOR</p>
                                    <p className="dossier-field-value-heavy">{editingLead.provider}</p>
                                </div>
                                <div>
                                    <p className="dossier-field-label">PLAN CONTRATADO</p>
                                    <p className="dossier-field-value">{editingLead.plan_name}</p>
                                </div>
                                <div>
                                    <p className="dossier-field-label">PAGO MENSUAL</p>
                                    <p className="dossier-field-value">{editingLead.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Section 03: Documents */}
                        <div className="dossier-section !page-break-inside-avoid">
                            <h3 className="dossier-section-title">03. EVIDENCIA DOCUMENTAL (INE Y DOMICILIO)</h3>
                            <div className="dossier-doc-grid">
                                <div className="dossier-doc-container">
                                    <p className="dossier-doc-label">ANVERSO (FRONTAL)</p>
                                    <div className="dossier-image-frame">
                                        {editingLead.ine_anverso ? (
                                            <img src={editingLead.ine_anverso} className="dossier-img" alt="INE Front" />
                                        ) : (
                                            <p className="dossier-no-image">SIN IMAGEN</p>
                                        )}
                                    </div>
                                </div>
                                <div className="dossier-doc-container">
                                    <p className="dossier-doc-label">REVERSO (TRASERO)</p>
                                    <div className="dossier-image-frame">
                                        {editingLead.ine_reverso ? (
                                            <img src={editingLead.ine_reverso} className="dossier-img" alt="INE Back" />
                                        ) : (
                                            <p className="dossier-no-image">SIN IMAGEN</p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 dossier-doc-container mt-4">
                                    <p className="dossier-doc-label">COMPROBANTE DE DOMICILIO</p>
                                    <div className="dossier-image-frame-large">
                                        {editingLead.comprobante_domicilio ? (
                                            <img src={editingLead.comprobante_domicilio} className="dossier-img" alt="Proof of Residence" />
                                        ) : (
                                            <p className="dossier-no-image-large">SIN IMAGEN / ARCHIVO PENDIENTE</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 04: References */}
                        <div className="!page-break-inside-avoid">
                            <h3 className="dossier-section-title">04. REFERENCIAS DE INSTALACIÓN</h3>
                            <div className="dossier-references-box">
                                <p className="dossier-references-text">
                                    {editingLead.referencias_hogar || "No se registraron referencias específicas."}
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="dossier-footer">
                            <p className="dossier-footer-text">© 2026 FIBERGRAVITY • DOCUMENTO DE USO CONFIDENCIAL</p>
                            <p className="dossier-footer-tag">NOC - INFRASTRUCTURE OPERATIONS</p>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
