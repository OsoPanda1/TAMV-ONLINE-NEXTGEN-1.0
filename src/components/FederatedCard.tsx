import * as React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Clock, 
  Zap, 
  Award, 
  Globe, 
  Database, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from "lucide-react";

export type FederatedDomain = "T-Social" | "T-Learn" | "T-Economy" | "T-Gov" | "T-XR" | "T-AI" | "T-Core";

export interface FederatedCardProps {
  id: string;
  domain: FederatedDomain;
  federatedSource: string;
  actor: {
    name: string;
    role: string;
    avatar?: string;
  };
  title: string;
  summary: string;
  visualUrl: string;
  impactScore: number;
  quantumSeeds?: number;
  ctaText?: string;
  onCtaClick?: () => void;
}

const domainIcons: Record<FederatedDomain, React.ReactNode> = {
  "T-Social": <User className="w-3 h-3" />,
  "T-Learn": <Award className="w-3 h-3" />,
  "T-Economy": <Zap className="w-3 h-3" />,
  "T-Gov": <ShieldCheck className="w-3 h-3" />,
  "T-XR": <Globe className="w-3 h-3" />,
  "T-AI": <Cpu className="w-3 h-3" />,
  "T-Core": <Database className="w-3 h-3" />
};

const domainColors: Record<FederatedDomain, string> = {
  "T-Social": "text-tamv-blue",
  "T-Learn": "text-tamv-teal",
  "T-Economy": "text-tamv-amber",
  "T-Gov": "text-tamv-blue",
  "T-XR": "text-tamv-cyan",
  "T-AI": "text-tamv-cyan",
  "T-Core": "text-tamv-teal"
};

export default function FederatedCard({
  domain,
  federatedSource,
  actor,
  title,
  summary,
  visualUrl,
  impactScore,
  quantumSeeds,
  ctaText = "Explorar",
  onCtaClick
}: FederatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel overflow-hidden flex flex-col h-full border-l-4 border-tamv-blue hover:border-tamv-cyan transition-all group"
    >
      {/* Header (15% height approx) */}
      <div className="p-4 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-tamv-blue/20 border border-tamv-blue/30 flex items-center justify-center overflow-hidden">
            {actor.avatar ? (
              <img src={actor.avatar} alt={actor.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <User className="w-6 h-6 text-tamv-blue" />
            )}
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              {actor.name}
              <span className="text-[10px] font-mono uppercase text-tamv-blue/70">[{actor.role}]</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono uppercase tracking-widest">
              <span className={domainColors[domain]}>{domainIcons[domain]}</span>
              {federatedSource}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-[10px] font-mono text-tamv-cyan">MSR_EVENT_SYNC</div>
          <div className="text-[10px] text-white/20 font-mono">ID: {Math.random().toString(36).substring(7)}</div>
        </div>
      </div>

      {/* Visual Body (85% height approx) */}
      <div className="relative flex-1 min-h-[300px] overflow-hidden">
        <img 
          src={visualUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tamv-dark via-transparent to-transparent" />
        
        {/* Indicators Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="px-2 py-1 bg-tamv-dark/80 backdrop-blur-md border border-tamv-blue/30 rounded text-[10px] font-bold text-tamv-cyan flex items-center gap-2">
            <Zap className="w-3 h-3" />
            IMPACT: {impactScore}
          </div>
          {quantumSeeds && (
            <div className="px-2 py-1 bg-tamv-dark/80 backdrop-blur-md border border-tamv-amber/30 rounded text-[10px] font-bold text-tamv-amber flex items-center gap-2">
              <Zap className="w-3 h-3" />
              +{quantumSeeds} QS
            </div>
          )}
        </div>
      </div>

      {/* Text Footer (15% height approx) */}
      <div className="p-6 space-y-4 bg-tamv-dark/50">
        <div className="space-y-1">
          <h3 className="text-xl font-serif font-bold text-white group-hover:text-tamv-blue transition-colors">{title}</h3>
          <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{summary}</p>
        </div>
        
        <button 
          onClick={onCtaClick}
          className="w-full py-3 bg-tamv-blue text-tamv-dark rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all"
        >
          {ctaText}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
