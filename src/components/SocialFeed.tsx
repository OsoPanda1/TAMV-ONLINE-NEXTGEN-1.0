import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Zap, 
  Lock, 
  Globe, 
  Cpu, 
  Shield, 
  Filter, 
  ChevronRight, 
  Sparkles,
  Heart,
  Share2,
  MessageCircle,
  ExternalLink,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

export enum MSRDomain {
  SOCIAL = "SOCIAL",
  LEARN = "LEARN",
  ECONOMY = "ECONOMY",
  GOV = "GOV",
  XR = "XR",
  AI = "AI",
  SECURITY = "SECURITY"
}

export interface MSRCard {
  id: string;
  domain: MSRDomain;
  source: string;
  actor: {
    name: string;
    role: string;
    avatar: string;
    idNvida: string;
  };
  visualUrl: string;
  content: string;
  impact: {
    label: string;
    value: string;
  };
  civilizationalScore: number; // 0-100, curated by Isabella
  timestamp: number;
}

const MOCK_EVENTS: MSRCard[] = [
  {
    id: "1",
    domain: MSRDomain.LEARN,
    source: "UTAMV",
    actor: { name: "Elena S.", role: "Aprendiz", avatar: "https://picsum.photos/seed/elena/100/100", idNvida: "did:tamv:nvida-772" },
    visualUrl: "https://picsum.photos/seed/learn1/800/600",
    content: "Completado el módulo de 'Ética en Sistemas Sentientes'. Una inmersión profunda en la responsabilidad del creador.",
    impact: { label: "QuantumSeeds", value: "+150" },
    civilizationalScore: 95,
    timestamp: Date.now() - 1000 * 60 * 30
  },
  {
    id: "2",
    domain: MSRDomain.XR,
    source: "DreamSpaces",
    actor: { name: "Marco V.", role: "Arquitecto XR", avatar: "https://picsum.photos/seed/marco/100/100", idNvida: "did:tamv:nvida-104" },
    visualUrl: "https://picsum.photos/seed/xr1/800/600",
    content: "Nuevo espacio 'Códice Vivo' desplegado en el Nexus. Un entorno 4D para visualizar la historia de la soberanía.",
    impact: { label: "Inmersión", value: "4.2h" },
    civilizationalScore: 88,
    timestamp: Date.now() - 1000 * 60 * 120
  },
  {
    id: "3",
    domain: MSRDomain.ECONOMY,
    source: "Marketplace",
    actor: { name: "SCAO-04", role: "Federado", avatar: "https://picsum.photos/seed/scao/100/100", idNvida: "did:tamv:nvida-federated" },
    visualUrl: "https://picsum.photos/seed/econ1/800/600",
    content: "Liquidación de activos TCEP para el proyecto de reforestación digital. Transparencia total en el MSR.",
    impact: { label: "Impacto", value: "High" },
    civilizationalScore: 92,
    timestamp: Date.now() - 1000 * 60 * 240
  },
  {
    id: "4",
    domain: MSRDomain.SOCIAL,
    source: "Nexus Social",
    actor: { name: "Julian R.", role: "Ciudadano", avatar: "https://picsum.photos/seed/julian/100/100", idNvida: "did:tamv:nvida-991" },
    visualUrl: "https://picsum.photos/seed/social1/800/600",
    content: "Reflexión sobre la importancia de la huella MD-X4 en la construcción de una comunidad digna.",
    impact: { label: "Votos", value: "1.2k" },
    civilizationalScore: 82,
    timestamp: Date.now() - 1000 * 60 * 400
  },
  {
    id: "5",
    domain: MSRDomain.GOV,
    source: "Consejo",
    actor: { name: "Guardian-01", role: "Guardián", avatar: "https://picsum.photos/seed/guardian/100/100", idNvida: "did:tamv:nvida-master" },
    visualUrl: "https://picsum.photos/seed/gov1/800/600",
    content: "Propuesta de enmienda al Códice Maestro para fortalecer el Protocolo de Vergüenza de Isabella.",
    impact: { label: "Consenso", value: "89%" },
    civilizationalScore: 98,
    timestamp: Date.now() - 1000 * 60 * 600
  }
];

const DOMAIN_CONFIG = {
  [MSRDomain.SOCIAL]: { icon: Users, color: "text-tamv-blue", bg: "bg-tamv-blue/10", border: "border-tamv-blue/20", label: "Capa Social", path: "/" },
  [MSRDomain.LEARN]: { icon: BookOpen, color: "text-tamv-teal", bg: "bg-tamv-teal/10", border: "border-tamv-teal/20", label: "Capa Educación", path: "/university" },
  [MSRDomain.ECONOMY]: { icon: Zap, color: "text-tamv-amber", bg: "bg-tamv-amber/10", border: "border-tamv-amber/20", label: "Capa Economía", path: "/economy" },
  [MSRDomain.GOV]: { icon: Lock, color: "text-tamv-accent", bg: "bg-tamv-accent/10", border: "border-tamv-accent/20", label: "Capa Gobernanza", path: "/governance" },
  [MSRDomain.XR]: { icon: Globe, color: "text-tamv-cyan", bg: "bg-tamv-cyan/10", border: "border-tamv-cyan/20", label: "Capa XR", path: "/dreamspaces" },
  [MSRDomain.AI]: { icon: Cpu, color: "text-tamv-blue", bg: "bg-tamv-blue/10", border: "border-tamv-blue/20", label: "Capa IA", path: "/isabella" },
  [MSRDomain.SECURITY]: { icon: Shield, color: "text-tamv-red", bg: "bg-tamv-red/10", border: "border-tamv-red/20", label: "Capa Seguridad", path: "/security" },
};

export default function SocialFeed() {
  const [filter, setFilter] = React.useState<MSRDomain | "ALL">("ALL");
  const [curatedEvents, setCuratedEvents] = React.useState<MSRCard[]>([]);
  const [isCurating, setIsCurating] = React.useState(false);

  // Isabella Curation Logic
  React.useEffect(() => {
    setIsCurating(true);
    const timer = setTimeout(() => {
      // Prioritize deep, educational, and ethical content (high civilizationalScore)
      const sorted = [...MOCK_EVENTS].sort((a, b) => b.civilizationalScore - a.civilizationalScore);
      setCuratedEvents(sorted);
      setIsCurating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = filter === "ALL" 
    ? curatedEvents 
    : curatedEvents.filter(e => e.domain === filter);

  // Group by Domain for Segmented View
  const segments = Object.values(MSRDomain).map(domain => ({
    domain,
    events: filteredEvents.filter(e => e.domain === domain)
  })).filter(s => s.events.length > 0);

  return (
    <div className="space-y-12">
      {/* High-Level Filters */}
      <div className="glass-panel p-4 flex flex-wrap items-center gap-4 sticky top-24 z-40 bg-tamv-dark/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
          <Filter className="w-4 h-4 text-white/40" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Filtros Nexus</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              filter === "ALL" ? "bg-tamv-blue text-tamv-dark shadow-[0_0_15px_rgba(0,163,255,0.3)]" : "bg-white/5 text-white/40 hover:bg-white/10"
            }`}
          >
            Todo
          </button>
          {Object.values(MSRDomain).map(domain => (
            <button 
              key={domain}
              onClick={() => setFilter(domain)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === domain ? DOMAIN_CONFIG[domain].bg + " " + DOMAIN_CONFIG[domain].color + " border-" + DOMAIN_CONFIG[domain].color.split('-')[1] : "bg-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 text-[10px] font-mono text-white/40 uppercase bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10">
          <AnimatePresence mode="wait">
            {isCurating ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-tamv-blue animate-pulse" />
                Curando contenido...
              </motion.div>
            ) : (
              <motion.div
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3 text-tamv-accent" />
                Curación Isabella Activa
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Segmented Feed */}
      <div className="space-y-32">
        {segments.map((segment, idx) => (
          <div key={segment.domain} className="space-y-16 relative">
            {/* Vertical Layer Line */}
            <div className="absolute left-[2.5rem] top-24 bottom-0 w-px bg-gradient-to-b from-white/10 via-white/5 to-transparent hidden md:block" />

            {/* Domain Separator */}
            <div className="relative flex items-center gap-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className={`p-6 rounded-3xl ${DOMAIN_CONFIG[segment.domain].bg} ${DOMAIN_CONFIG[segment.domain].border} border-2 shadow-2xl relative z-10`}
              >
                {React.createElement(DOMAIN_CONFIG[segment.domain].icon, { className: `w-10 h-10 ${DOMAIN_CONFIG[segment.domain].color}` })}
              </motion.div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-4xl font-serif tracking-tight text-white/90">{DOMAIN_CONFIG[segment.domain].label}</h2>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-mono uppercase tracking-widest border ${DOMAIN_CONFIG[segment.domain].border} ${DOMAIN_CONFIG[segment.domain].color}`}>
                    Capa {idx + 1}
                  </div>
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-white/20">Segmento Civilizatorio • MSR Verified Event</p>
              </div>
              <Link 
                to={DOMAIN_CONFIG[segment.domain].path}
                className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-tamv-blue transition-colors group"
              >
                Explorar Capa
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pl-0 md:pl-24">
              {segment.events.map((event) => (
                <FederatedCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Scroll Indicator */}
      <div className="py-24 flex flex-col items-center gap-6 border-t border-white/5">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-white/5 border-t-tamv-blue animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-tamv-blue/10 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30">Sincronizando Capas Profundas</p>
          <p className="text-[8px] font-mono text-white/10">MSR LEDGER • FEDERATED SYNC • ISABELLA CURATION</p>
        </div>
      </div>
    </div>
  );
}

function FederatedCard({ event }: { event: MSRCard }) {
  const config = DOMAIN_CONFIG[event.domain];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="glass-panel overflow-hidden group hover:border-white/20 transition-all flex flex-col h-[650px] shadow-2xl"
    >
      {/* 85% Visual Content */}
      <div className="relative h-[85%] overflow-hidden bg-black">
        <img 
          src={event.visualUrl} 
          alt={event.content}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-tamv-dark via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        
        {/* Actor Info */}
        <div className="absolute top-8 left-8 flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl border-2 border-white/20 overflow-hidden shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-transform">
              <img src={event.actor.avatar} alt={event.actor.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-tamv-dark rounded-full shadow-lg" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-white tracking-tight">{event.actor.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{event.actor.role}</span>
              <span className="text-[8px] font-mono text-tamv-blue/60">{event.actor.idNvida}</span>
            </div>
          </div>
        </div>

        <div className="absolute top-8 right-8">
          <div className={`px-4 py-1.5 rounded-xl ${config.bg} ${config.border} border backdrop-blur-xl shadow-xl`}>
            <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${config.color}`}>
              {event.source}
            </span>
          </div>
        </div>

        {/* Impact & Curation Stats */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="glass-panel px-6 py-4 bg-black/40 border border-white/10 backdrop-blur-2xl flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest mb-1">{event.impact.label}</span>
                <span className="text-xl font-bold text-tamv-blue">{event.impact.value}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest mb-1">Civilizational</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-tamv-accent" />
                  <span className="text-lg font-bold text-white">{event.civilizationalScore}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[9px] font-mono uppercase text-white/30 tracking-widest mb-1">MSR Verified</span>
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-500/80">HASH: {event.id.padStart(6, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 15% Text Content */}
      <div className="h-[15%] p-8 flex items-center justify-between bg-[#000a14] border-t border-white/5">
        <div className="flex-1 pr-12">
          <p className="text-base text-white/70 line-clamp-2 leading-relaxed font-serif italic">
            "{event.content}"
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button className="p-3 text-white/20 hover:text-tamv-blue hover:bg-white/5 rounded-2xl transition-all">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 text-white/20 hover:text-tamv-blue hover:bg-white/5 rounded-2xl transition-all">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <Link 
            to={config.path}
            className="flex items-center gap-3 px-6 py-3 bg-tamv-blue/10 text-tamv-blue border border-tamv-blue/20 rounded-2xl hover:bg-tamv-blue hover:text-tamv-dark transition-all group shadow-lg"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest">Participar</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
