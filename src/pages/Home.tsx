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
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import SocialFeed from "../components/SocialFeed";

export default function Home() {
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
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-tamv-blue/10 border border-tamv-blue/20 text-tamv-blue text-[10px] font-mono uppercase tracking-widest mb-8">
              <Sparkles className="w-3 h-3" />
              Ecosistema Civilizatorio MD-X4
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
