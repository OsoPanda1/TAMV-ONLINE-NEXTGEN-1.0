import * as React from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, Network, Database, ShieldCheck, Zap, Globe } from "lucide-react";

const layers = [
  {
    title: "Capa 1: Núcleo Sentiente (Isabella AI)",
    description: "Transformer híbrido multicapa con 32 cabezas de atención y embeddings de 1024 dimensiones, optimizado para razonamiento ético.",
    tech: "TypeScript + Neural Mesh™",
    icon: Cpu,
  },
  {
    title: "Capa 2: Ledger de Confianza (EOCT Blockchain)",
    description: "Infraestructura descentralizada inmutable que garantiza la soberanía de datos y la transparencia transaccional.",
    tech: "EOCT Protocol v4.0",
    icon: Database,
  },
  {
    title: "Capa 3: Red de Seguridad (Anubis Sentinel)",
    description: "Sistema de defensa proactiva con monitoreo multisensorial y respuesta automatizada ante amenazas sistémicas.",
    tech: "Sentinel AI™",
    icon: ShieldCheck,
  },
  {
    title: "Capa 4: Interfaz Dimensional (4D Experiences)",
    description: "Renderizado cuántico y audio espacial para una inmersión consciente que respeta el bienestar digital.",
    tech: "WebGL + WebXR + Spatial Audio",
    icon: Globe,
  },
];

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-300">
            Arquitectura del Ecosistema
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Una infraestructura multicapa diseñada para la escalabilidad, la seguridad y la soberanía digital del usuario.
          </p>
        </motion.div>

        <div className="relative mb-20">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-slate-800 to-transparent hidden md:block" />
          
          <div className="space-y-12">
            {layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className={`p-6 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm hover:border-emerald-500/30 transition-all ${index % 2 === 1 ? 'md:text-right' : ''}`}>
                    <div className={`w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 mx-auto ${index % 2 === 1 ? 'md:ml-auto md:mr-0' : 'md:mr-auto md:ml-0'}`}>
                      <layer.icon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{layer.title}</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">{layer.description}</p>
                    <div className="inline-block px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-emerald-400">
                      {layer.tech}
                    </div>
                  </div>
                </div>
                <div className="relative z-10 w-12 h-12 rounded-full bg-slate-900 border-4 border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold hidden md:flex">
                  {index + 1}
                </div>
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="p-12 rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Especificaciones Técnicas del Núcleo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">1024</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Dimensiones Neurales</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">32</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Cabezas de Atención</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">50K</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Tokens Mexicanizados</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-500">E2E</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest">Nativo TypeScript</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
