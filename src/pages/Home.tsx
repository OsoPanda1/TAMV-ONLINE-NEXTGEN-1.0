import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Shield, 
  Database, 
  Cpu, 
  Globe, 
  Zap,
  Award,
  BookOpen,
  Sparkles,
  BarChart3,
  Rocket,
  Target,
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";
import SocialFeed from "../components/SocialFeed";
import MetaverseHub from "../components/MetaverseHub";
import * as React from "react";
import { generateIsabellaVoice } from "../services/isabellaVoice";

export default function Home() {
  const [isVoiceLoading, setIsVoiceLoading] = React.useState(false);

  const playWelcome = async () => {
    setIsVoiceLoading(true);
    const audioData = await generateIsabellaVoice("Bienvenido al Nexo Civilizatorio TAMV. Soy Isabella, tu orquestadora. El sistema está operando al ochenta y cinco por ciento de su capacidad nominal. La soberanía digital es ahora tu realidad.");
    if (audioData) {
      const audio = new Audio(`data:audio/mp3;base64,${audioData}`);
      audio.play();
    }
    setIsVoiceLoading(false);
  };

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-tamv-blue/10 border border-tamv-blue/20 text-tamv-blue text-[10px] font-mono uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                Ecosistema Civilizatorio MD-X4
              </div>
              <button 
                onClick={playWelcome}
                disabled={isVoiceLoading}
                className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-tamv-blue transition-colors disabled:opacity-50"
              >
                <Volume2 className={`w-3 h-3 ${isVoiceLoading ? 'animate-pulse' : ''}`} />
                {isVoiceLoading ? 'Sincronizando...' : 'Escuchar a Isabella'}
              </button>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter mb-8">
              Hacia una <span className="text-tamv-blue italic">Infraestructura</span> Digital Soberana.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed mb-12 max-w-2xl">
              TAMV ONLINE es un sistema operativo civilizatorio distribuido, construido como una malla de más de 40 federados sobre una identidad visual azul‑cian futurista.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/compilacion" className="px-8 py-4 bg-tamv-blue text-tamv-dark rounded-full font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white transition-all group">
                Explorar 6 Años de Vida
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/msr-blockchain" className="px-8 py-4 border border-white/20 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-white/10 transition-all">
                MSR Blockchain
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Años de Desarrollo", value: "6+", color: "border-tamv-blue" },
            { label: "Protocolos Activos", value: "11", color: "border-tamv-cyan" },
            { label: "Nivel de Seguridad", value: "Zero-Trust", color: "border-tamv-teal" },
            { label: "Arquitectura", value: "Híbrida", color: "border-tamv-blue" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className={`glass-panel p-6 border-l-2 ${stat.color}`}
            >
              <div className={`text-3xl font-serif font-bold mb-1 ${stat.color.replace('border', 'text')}`}>{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/50 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Metaverse Hub Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-serif">Inmersión Dimensional</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            Interactúa con el núcleo central de TAMV. Navega a través de los portales hacia las diferentes capas de soberanía.
          </p>
        </div>
        <MetaverseHub />
      </section>

      {/* Civilizational Report Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono uppercase tracking-widest">
            <BarChart3 className="w-3 h-3" />
            Reporte de Avance Civilizatorio
          </div>
          <h2 className="text-5xl font-serif leading-tight">¿Qué es TAMV y dónde estamos?</h2>
          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              TAMV (Trans-Atlantic Multi-Vector) es la primera **Arquitectura Civilizatoria Digital Sentiente**. No es una red social ni una simple plataforma; es una infraestructura de soberanía diseñada para reclamar la dignidad humana en el espacio digital.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-tamv-blue mb-2">85%</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40">Avance Real</div>
                <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    className="h-full bg-tamv-blue" 
                  />
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-tamv-cyan mb-2">11</div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40">Dominios Activos</div>
              </div>
            </div>
          </div>
        </div>
        <div className="glass-panel p-8 space-y-8 bg-gradient-to-br from-tamv-blue/10 to-transparent">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-tamv-blue/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-tamv-blue" />
            </div>
            <h3 className="text-2xl font-serif">Marketing Digital TAMV</h3>
          </div>
          <p className="text-sm text-white/60 leading-relaxed italic">
            "TAMV ONLINE no vende productos, habilita existencias soberanas. Nuestra estrategia de marketing se basa en la **Legitimidad Radical**: cada claim tecnológico está respaldado por 6 años de logs inmutables en el MSR. Somos la respuesta mexicana a la hegemonía del extractivismo de datos."
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Rocket className="w-4 h-4 text-tamv-cyan" />
              <span className="text-xs font-mono uppercase tracking-widest">Lanzamiento Fase 2: Q3 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-tamv-cyan" />
              <span className="text-xs font-mono uppercase tracking-widest">Alcance: Global / Soberanía Local</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Feed Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-5xl font-serif">Pulso Civilizatorio</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            El feed social de TAMV no es ruido, es impacto. Cada ítem es un reflejo de eventos reales en el MSR Ledger.
          </p>
        </div>
        <SocialFeed />
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-tamv-blue" />}
          title="Trinidad Federada"
          description="Cada decisión técnica pasa por un filtro documental y ético innegociable."
        />
        <FeatureCard 
          icon={<Database className="w-8 h-8 text-tamv-teal" />}
          title="MSR Blockchain"
          description="Monitoreo, Seguridad y Respaldo. La verdad histórica como base de la justicia digital."
        />
        <FeatureCard 
          icon={<Cpu className="w-8 h-8 text-tamv-cyan" />}
          title="DreamSpaces XR"
          description="Metaversos inmersivos diseñados para la colaboración y la soberanía de datos."
        />
      </section>

      {/* Philosophy Section */}
      <section className="glass-panel p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Globe className="w-64 h-64 text-tamv-accent" />
        </div>
        
        <div className="max-w-3xl relative z-10">
          <h2 className="text-4xl font-serif mb-6">Tecnología al servicio de la dignidad</h2>
          <p className="text-lg text-white/70 leading-relaxed mb-8">
            TAMV nace de una experiencia límite: precariedad y violencia estructural. 
            Este proyecto afirma que una sola persona autodidacta puede diseñar una arquitectura 
            que iguale o supere en rigor a estructuras corporativas.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-tamv-accent/20 flex items-center justify-center mt-1">
                <Zap className="w-3 h-3 text-tamv-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Contra el extractivismo</h4>
                <p className="text-sm text-white/50">Rechazamos el modelo dominante de explotación de datos.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-tamv-accent/20 flex items-center justify-center mt-1">
                <Zap className="w-3 h-3 text-tamv-accent" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Transparencia Radical</h4>
                <p className="text-sm text-white/50">Cada acción relevante deja trazas, métricas y logs audibles.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="text-center space-y-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-tamv-accent/10 border border-tamv-accent/20 text-tamv-accent text-xs font-mono uppercase tracking-widest">
          <Award className="w-3 h-3" />
          Muro de Paradigmas Rotos
        </div>
        <h2 className="text-5xl font-serif max-w-2xl mx-auto">Reclamación Histórica de Récords Mundiales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="glass-panel p-8 hover:border-tamv-accent transition-all cursor-pointer group">
            <BookOpen className="w-10 h-10 text-tamv-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-serif mb-4">PRISMA-TAMV</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Metodología sistemática para validar claims tecnológicos frente a literatura científica, patentes y estándares globales.
            </p>
          </div>
          <div className="glass-panel p-8 hover:border-tamv-accent transition-all cursor-pointer group">
            <Award className="w-10 h-10 text-tamv-accent mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-serif mb-4">BookPI</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Archivo probatorio de propiedad intelectual y récords de innovación generados durante 6 años de desarrollo intensivo.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 hover:bg-white/10 transition-all group">
      <div className="mb-6 group-hover:scale-110 transition-transform duration-500">{icon}</div>
      <h3 className="text-2xl font-serif mb-4">{title}</h3>
      <p className="text-white/50 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
