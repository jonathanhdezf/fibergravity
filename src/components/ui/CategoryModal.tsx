"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Wifi, Monitor, Cpu, Briefcase, Tv, Star, Shield, ArrowRight, Smartphone, MapPin, User, CheckCircle2 } from "lucide-react";
import { NeonButton } from "./NeonButton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type PlanCategory = "Streamer" | "HomeOffice" | "Enterprise" | "TV";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: PlanCategory;
    providerName: string;
}

const providerData: Record<string, { plans: Partial<Record<PlanCategory, { name: string; speed: string; type: string; price: string; features: string[] }[]>> }> = {
    Totalplay: {
        plans: {
            Streamer: [
                { name: "Totalplay 500 Megas", speed: "500 Mbps Simétricos", type: "Fibra XGS-PON", price: "$860", features: ["Pronto pago mensual", "Subida 500 Mbps", "WiFi 6 incluido"] },
                { name: "Totalplay 1,000 Megas", speed: "1,000 Mbps Simétricos", type: "Fibra XGS-PON", price: "$1,000", features: ["1 Gbps simétrico", "Ideal 4K/8K OBS", "WiFi Pro disponible"] },
            ],
            HomeOffice: [
                { name: "Totalplay Simétrico 150", speed: "150 Mbps Simétricos", type: "Internet + Telefonía", price: "$460", features: ["Pronto pago", "Llamadas ilimitadas", "Estabilidad Zoom/Teams"] },
                { name: "Totalplay Simétrico 250", speed: "250 Mbps Simétricos", type: "Fibra Profesional", price: "$560", features: ["Subida rápida nube", "WiFi Pro opcional", "Apps streaming promo"] },
                { name: "Totalplay Simétrico 350", speed: "350 Mbps Simétricos", type: "Fibra Profesional", price: "$660", features: ["Multitarea intensiva", "Cobertura extendida", "Soporte 24/7"] },
            ],
            Enterprise: [
                { name: "Negocios Esencial 100", speed: "100 Mbps Simétricos", type: "Fibra Negocios", price: "$420", features: ["2 líneas telefónicas", "Facturación ilimitada", "Página web incluida"] },
                { name: "Negocios Pro 250", speed: "250 Mbps Simétricos", type: "Fibra Negocios", price: "$560", features: ["Tienda en línea", "Nube y TPV estables", "WiFi Seguro"] },
                { name: "Negocios Max 350", speed: "350 Mbps Simétricos", type: "Fibra Empresarial", price: "$660", features: ["Alta concurrencia", "Soporte comercial", "Escalable a Dedicado"] },
            ],
            TV: [
                { name: "Triple Play 150 + TV", speed: "150 Mbps + 80 Canales", type: "Internet + TV 4K", price: "$718", features: ["Decodificador 4K", "App Totalplay TV", "Telefonía ilimitada"] },
                { name: "Triple Play 250 + TV", speed: "250 Mbps + TV HD", type: "Internet + TV 4K", price: "$779", features: ["WiFi Pro incluido", "Add-on Netflix/Max", "Pronto pago"] },
                { name: "Triple Play 500 + TV", speed: "500 Mbps + TV Premium", type: "Internet + TV 4K", price: "$999", features: ["Hasta 280 canales", "Simetría total", "Multi-dispositivo"] },
            ]
        }
    },
    Megacable: {
        plans: {
            Streamer: [
                { name: "MEGA Fibra 300", speed: "300 Mbps Simétricos", type: "Fibra Óptica", price: "$650", features: ["Xview+ incluido", "Subida simétrica", "Domiciliación promo"] },
                { name: "MEGA Fibra 500", speed: "500 Mbps Simétricos", type: "Fibra Óptica", price: "$730", features: ["Extensor WiFi", "Amazon Prime / Max", "Bitrate 4K estable"] },
            ],
            HomeOffice: [
                { name: "Doble Pack 200", speed: "200 Mbps Simétricos", type: "Internet + Telefonía", price: "$400", features: ["Tarifa domiciliada", "Llamadas ilimitadas", "Estabilidad Zoom"] },
                { name: "MEGA Pro-Work 500", speed: "500 Mbps Simétricos", type: "Fibra Simétrica", price: "$800", features: ["Extensor WiFi Mesh", "Xview+ incluido", "Transferencia rápida"] },
            ],
            Enterprise: [
                { name: "MEGA Empresas 200", speed: "200 Mbps Simétricos", type: "Fibra PyME", price: "$450", features: ["Telefonía MX/EUA", "Xview+ sala de espera", "Soporte comercial"] },
                { name: "MEGA Empresas 1000", speed: "1,000 Mbps Simétricos", type: "Fibra Corporativa", price: "$1,000", features: ["Dominio y Cloud", "Mesh empresarial", "Máximo ancho de banda"] },
            ],
            TV: [
                { name: "Triple Pack 200 + Xview+", speed: "200 Mbps + 80 Canales", type: "Internet + TV + Tel", price: "$430", features: ["Promo domiciliada", "Xview+ interactivo", "Amazon Prime promo"] },
                { name: "Triple Pack 500 + Xview+", speed: "500 Mbps + TV HD", type: "Internet + TV + Tel", price: "$800", features: ["Netflix / Max opcional", "Extensor WiFi", "Fibra simétrica"] },
            ]
        }
    },
    Telmex: {
        plans: {
            Streamer: [
                { name: "Infinitum 250 Simétrico", speed: "250 Mbps Simétricos", type: "Fibra Óptica", price: "$499", features: ["Claro Video gratis", "Claro Drive 100 GB", "Estabilidad OBS"] },
                { name: "Infinitum 600 Simétrico", speed: "600 Mbps Simétricos", type: "Fibra Óptica", price: "$725", features: ["Subida 600 Mbps", "Promos Netflix/Max", "Llamadas ilimitadas"] },
            ],
            HomeOffice: [
                { name: "Solo Internet 100", speed: "100 Mbps Fibra", type: "Solo Internet", price: "$349", features: ["Sin línea fija", "Precio fijo mensual", "Ideal trabajo remoto"] },
                { name: "Infinitum 200 + Tel", speed: "120–200 Mbps Fibra", type: "Internet + Telefonía", price: "$389", features: ["Llamadas ilimitadas", "Claro Video incluido", "Cobertura nacional"] },
                { name: "Infinitum 350 Simétrico", speed: "350 Mbps Simétricos", type: "Internet + Telefonía", price: "$599", features: ["Videollamadas 4K", "Claro Drive 100 GB", "Antivirus incluido"] },
            ],
            Enterprise: [
                { name: "Infinitum Negocio 150", speed: "150 Mbps Fibra", type: "PyME / Comercio", price: "$460", features: ["ADM Factura", "Claro Drive respaldo", "Correo comercial"] },
                { name: "Infinitum Negocio 1000", speed: "1,000 Mbps Fibra", type: "Corporativo", price: "$2,289", features: ["Múltiples líneas", "Google My Business", "Seguridad avanzada"] },
            ],
            TV: [
                { name: "Infinitum 150 + Claro Video", speed: "150 Mbps Simétricos", type: "Internet + Streaming", price: "$435", features: ["Claro Video incluido", "Agrega Netflix o Max", "Telefonía ilimitada"] },
                { name: "Infinitum 250 + Streaming", speed: "250 Mbps Simétricos", type: "Internet + Streaming", price: "$499", features: ["Ideal Smart TV 4K", "Disney+ / Max en recibo", "Fibra directa"] },
            ]
        }
    },
    izzi: {
        plans: {
            Enterprise: [
                { name: "izzi Negocios 100 + TV", speed: "100 Mbps + 100 Canales", type: "Internet + TV", price: "$499", features: ["Ideal sala de espera", "ViX Premium incluido", "Telefonía ilimitada"] },
                { name: "izzi Negocios 200 + TV+", speed: "200 Mbps + 200 Canales", type: "Internet + TV", price: "$720", features: ["Max y Disney+ promo", "App izzi go", "Facturación fiscal"] },
            ],
            TV: [
                { name: "izzi 100 + izzi tv+", speed: "100 Mbps + 100 Canales", type: "Internet + TV + Tel", price: "$579", features: ["ViX Premium", "Max / Apple TV promo", "Primer mes promo"] },
                { name: "izzi 150 + izzi tv+", speed: "150 Mbps + 200 Canales", type: "Internet + TV + Tel", price: "$639", features: ["Disney+ y Max 12m", "App izzi go móvil", "Llamadas ilimitadas"] },
                { name: "izzi 200 + izzi tv+", speed: "200 Mbps + 200 Canales", type: "Internet + TV + Tel", price: "$720", features: ["200+ canales HD", "Streaming incluido", "Opción izzi móvil"] },
            ]
        }
    },
    Telcel: {
        plans: {
            Streamer: [
                { name: "WiFi Telcel 3", speed: "10–20 Mbps (150 GB PUJ)", type: "Internet Inalámbrico", price: "$399", features: ["Sin instalación fija", "Conecta a la luz", "Red 4G/5G Telcel"] },
                { name: "WiFi Telcel 7", speed: "Alta Velocidad 4G/5G", type: "Internet Inalámbrico", price: "$799", features: ["Mayor cuota de datos", "Ideal lives en exterior", "Portabilidad en casa"] },
            ],
            HomeOffice: [
                { name: "WiFi Telcel 3 (Respaldo)", speed: "10–20 Mbps (150 GB PUJ)", type: "Internet en Casa", price: "$399", features: ["Plug & Play inmediato", "Ideal sin cobertura fibra", "Renta mensual fija"] },
                { name: "Amigo Internet Casa", speed: "Prepago (30 GB+)", type: "Sin Plazos", price: "$200", features: ["Recarga cuando quieras", "Sin contrato forzoso", "Movilidad inmediata"] },
            ],
            Enterprise: [
                { name: "Telcel Empresa Base", speed: "Datos 4G/5G + Redes", type: "Plan Corporativo", price: "$199", features: ["WhatsApp y llamadas", "Ideal vendedores", "Control de gasto"] },
                { name: "Telcel Empresa Pro 5G", speed: "Alto Volumen 5G", type: "Plan Corporativo", price: "$1,219", features: ["Datos masivos 5G", "Roaming EUA/CAN", "Soporte flotillas"] },
            ]
        }
    },
    Cablecom: {
        plans: {
            Streamer: [
                { name: "Regional Esencial 50", speed: "50 Mbps Estables", type: "Internet Regional", price: "$280", features: ["El más económico", "Sin plazos forzosos", "Atención en Teziutlán"] },
                { name: "Regional Plus 100", speed: "100 Mbps Estables", type: "Internet Regional", price: "$500", features: ["Lives en 1080p", "Incluye TV básica", "Soporte local rápido"] },
            ],
            HomeOffice: [
                { name: "Oficina Esencial 50", speed: "50 Mbps Estables", type: "Internet Regional", price: "$280", features: ["Correos y Meet", "Precio más bajo", "Sin plazos forzosos"] },
                { name: "Oficina Dúo 100", speed: "100 Mbps + TV", type: "Internet + TV", price: "$500", features: ["Estabilidad regional", "Módem Dual Band", "Técnicos locales"] },
            ],
            Enterprise: [
                { name: "Comercio Local 50", speed: "50 Mbps Estables", type: "Internet Negocio", price: "$280", features: ["Ideal punto de venta", "Mínima inversión", "Soporte en sitio"] },
                { name: "PyME Regional 100", speed: "100 Mbps + TV", type: "Internet + TV", price: "$500", features: ["Hasta 4 TVs locales", "Sin cargos ocultos", "Atención directa"] },
            ],
            TV: [
                { name: "Combo Esencial 100", speed: "100 Mbps + TV Digital", type: "Internet + TV", price: "$350", features: ["TV Básica Digital", "Telefonía incluida", "Soporte local"] },
                { name: "Combo Plus 300", speed: "300 Mbps + TV HD", type: "Internet + TV", price: "$550", features: ["TV Premium HD", "Módem Dual Band", "Alta capacidad"] },
            ]
        }
    },
    Impactel: {
        plans: {
            Streamer: [
                { name: "Solo Internet Impactel", speed: "50 Mbps Regional", type: "Internet Local", price: "$280", features: ["El más accesible", "Sin plazos forzosos", "Cobertura Teziutlán"] },
                { name: "Combo Impactel 100", speed: "100 Mbps + TV", type: "Internet + TV", price: "$500", features: ["100+ canales locales", "Hasta 4 TVs", "Soporte directo"] },
            ],
            HomeOffice: [
                { name: "Solo Internet Impactel", speed: "50 Mbps Regional", type: "Internet Local", price: "$280", features: ["Ideal tareas y Meet", "Mínima mensualidad", "Atención inmediata"] },
                { name: "Combo Impactel 100", speed: "100 Mbps + TV", type: "Internet + TV", price: "$500", features: ["Trabajo + ocio familiar", "Sin contrato forzoso", "Técnicos en zona"] },
            ],
            Enterprise: [
                { name: "Impactel Comercio", speed: "50 Mbps Regional", type: "Internet Negocio", price: "$280", features: ["Ideal para TPV y POS", "Ahorro garantizado", "Soporte local"] },
                { name: "Impactel Negocio + TV", speed: "100 Mbps + 100 Canales", type: "Internet + TV", price: "$500", features: ["Hasta 4 pantallas", "Señal regional estable", "Sin cargos extras"] },
            ],
            TV: [
                { name: "Solo Internet", speed: "50 Mbps", type: "Internet", price: "$280", features: ["Señal regional estable", "Sin plazos forzosos", "Soporte local"] },
                { name: "TV + Internet", speed: "100 Mbps + 100 Canales", type: "Internet + TV", price: "$500", features: ["Más de 100 canales", "Hasta 4 Televisiones", "Servicio Residencial"] },
            ]
        }
    }
};

export const CategoryModal = ({ isOpen, onClose, category, providerName }: CategoryModalProps) => {
    const [selectedPlan, setSelectedPlan] = useState(0);

    const getProviderPlans = () => {
        const lower = providerName.toLowerCase();
        const key = Object.keys(providerData).find(k =>
            lower.includes(k.toLowerCase()) || k.toLowerCase().includes(lower)
        );
        const data = key ? providerData[key] : providerData.Totalplay;

        const plans = data.plans[category];
        if (plans) return plans;

        const allCategories = Object.keys(data.plans) as PlanCategory[];
        const fallbackCat = allCategories[0];
        return fallbackCat ? data.plans[fallbackCat] : null;
    };

    const currentPlans = getProviderPlans() || [
        { name: "Plan Personalizado", speed: "Velocidad Máxima", type: "Fibra Óptica", price: "$---", features: ["Solicita cotización especial"] }
    ];

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        location: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            setSelectedPlan(0);
            setFormData({ fullName: "", phone: "", location: "" });
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validar teléfono (exactamente 10 dígitos)
        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            toast.error('El número de teléfono debe tener exactamente 10 dígitos.');
            setIsSubmitting(false);
            return;
        }

        try {
            const plan = currentPlans[selectedPlan];
            const lead = {
                id: crypto.randomUUID(),
                created_at: new Date().toISOString(),
                full_name: formData.fullName,
                phone: formData.phone,
                location: formData.location,
                category: category,
                provider: providerName,
                plan_name: plan.name,
                speed: plan.speed,
                price: plan.price,
                status: 'pending'
            };

            const existing = JSON.parse(localStorage.getItem('fiberlink_play_leads') || '[]');
            localStorage.setItem('fiberlink_play_leads', JSON.stringify([lead, ...existing]));

            toast.success(`¡Solicitud enviada! Un asesor de Fiberlink Play se pondrá en contacto contigo.`, {
                icon: '🚀',
                style: {
                    borderRadius: '20px',
                    background: '#020617',
                    color: '#fff',
                    border: '1px solid rgba(0, 243, 255, 0.2)',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '16px 24px'
                }
            });
            onClose();
        } catch {
            toast.error('Hubo un error al procesar tus datos. Por favor intenta de nuevo.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[11000] flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto pt-12 md:pt-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl bg-[#020617] md:rounded-[3rem] border border-white/10 shadow-2xl shadow-neon-cyan/10 overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px]">
                            {/* Left Side: Plan Selector */}
                            <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neon-cyan">Plan Selection</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white">
                                            {category === 'Enterprise' ? 'SOLUCIONES EMPRESARIALES' :
                                                category === 'HomeOffice' ? 'PODER HOME OFFICE' :
                                                    category === 'TV' ? 'ENTRETENIMIENTO TOTAL' :
                                                        'MÁXIMO STREAMING'}
                                        </h2>
                                        <p className="text-slate-400 mt-2 text-sm max-w-md font-medium">
                                            Selecciona el paquete que mejor se adapte a tus necesidades con {providerName}.
                                        </p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        title="Cerrar"
                                        className="lg:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                                    >
                                        <X className="w-6 h-6 text-slate-500" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-fit max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {currentPlans.map((plan: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedPlan(i)}
                                            className={`relative p-6 rounded-3xl border-2 transition-all cursor-pointer group ${selectedPlan === i
                                                ? 'bg-neon-cyan/5 border-neon-cyan shadow-xl shadow-neon-cyan/5'
                                                : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-2xl ${selectedPlan === i ? 'bg-neon-cyan/20' : 'bg-white/5 group-hover:bg-white/10'} transition-colors`}>
                                                    {plan.type?.toLowerCase().includes('tv') ? (
                                                        <Tv className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} />
                                                    ) : (plan.type?.toLowerCase().includes('internet') || category === 'Streamer') ? (
                                                        <Wifi className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} />
                                                    ) : category === 'HomeOffice' ? (
                                                        <Monitor className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} />
                                                    ) : (
                                                        <Briefcase className={`w-5 h-5 ${selectedPlan === i ? 'text-neon-cyan' : 'text-slate-500'}`} />
                                                    )}
                                                </div>
                                                <div className={`text-xl font-black italic ${selectedPlan === i ? 'text-neon-cyan' : 'text-white'}`}>
                                                    {plan.price}
                                                </div>
                                            </div>

                                            <h3 className="font-bold text-lg text-white mb-1">{plan.name}</h3>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">{plan.speed}</div>

                                            <div className="space-y-2">
                                                {plan.features.map((feature: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold">
                                                        <CheckCircle2 className={`w-3 h-3 ${selectedPlan === i ? 'text-neon-cyan' : 'text-emerald-500'}`} />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>

                                            {selectedPlan === i && (
                                                <motion.div
                                                    layoutId="selected-indicator"
                                                    className="absolute top-4 right-4"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    <div className="w-4 h-4 rounded-full bg-neon-cyan flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-black" />
                                                    </div>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Deployment Form */}
                            <div className="bg-black/40 p-8 md:p-12 flex flex-col">
                                <button
                                    onClick={onClose}
                                    title="Cerrar"
                                    className="hidden lg:flex self-end p-2 hover:bg-white/5 rounded-full transition-colors mb-4"
                                >
                                    <X className="w-6 h-6 text-slate-500" />
                                </button>

                                <div className="flex-1">
                                    <h3 className="text-xl font-black italic text-white mb-2">VALIDAR COBERTURA</h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-8">
                                        Instalación inmediata en Teziutlán
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <User className="w-3 h-3 text-neon-cyan" /> Nombre Titular
                                            </label>
                                            <input
                                                required
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                placeholder="EJ. JUAN PÉREZ"
                                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <Smartphone className="w-3 h-3 text-neon-cyan" /> Whatsapp / Celular
                                            </label>
                                            <input
                                                required
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                                    setFormData({ ...formData, phone: val });
                                                }}
                                                placeholder="10 DÍGITOS (EJ. 2311234567)"
                                                className={`w-full bg-white/[0.03] border ${formData.phone.length > 0 && formData.phone.length < 10 ? 'border-red-500/50' : 'border-white/5'} rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700`}
                                            />
                                            {formData.phone.length > 0 && formData.phone.length < 10 && (
                                                <p className="text-[9px] text-red-500 font-bold ml-2 mt-1">FALTAN {10 - formData.phone.length} DÍGITOS</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                                                <MapPin className="w-3 h-3 text-neon-cyan" /> Barrio / Colonia
                                            </label>
                                            <input
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="EJ. CENTRO, CHOWIS..."
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-neon-cyan focus:bg-white/[0.07] transition-all font-bold placeholder:text-slate-700 uppercase"
                                            />
                                        </div>

                                        <div className="pt-4">
                                            <NeonButton
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full !py-5 font-black tracking-[0.3em]"
                                                variant="cyan"
                                            >
                                                {isSubmitting ? "ENVIANDO..." : "SOLICITAR AHORA"}
                                            </NeonButton>
                                        </div>

                                        <p className="text-[9px] text-center text-slate-600 font-bold tracking-tighter mt-4">
                                            AL ENVIAR ACEPTAS NUESTRA POLÍTICA DE PRIVACIDAD. <br />
                                            FIBERLINK PLAY BROKER DIGITAL 2026.
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
