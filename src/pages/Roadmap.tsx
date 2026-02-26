import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Rocket, Flag, Star } from "lucide-react";

const milestones = [
  {
    phase: "Fase 1: Génesis (Completado)",
    title: "Cimentación del Ecosistema",
    items: [
      "Arquitectura base React + TypeScript",
      "Núcleo funcional de Isabella AI™",
      "Sistema de diseño inclusivo shadcn/ui",
      "Framework de seguridad Anubis Sentinel™",
    ],
    status: "completed",
    icon: CheckCircle2,
  },
  {
    phase: "Fase 2: Expansión (En Progreso)",
    title: "Integración Dimensional",
    items: [
      "Integración completa Blockchain EOCT™",
      "Módulos de realidad extendida accesible",
      "APIs de consciencia digital ética",
      "Ecosistema de gobernanza participativa",
    ],
    status: "in-progress",
    icon: Clock,
  },
  {
    phase: "Fase 3: Maduración (Q3 2026)",
    title: "Soberanía Civilizatoria",
    items: [
      "Lanzamiento de UTAMV Elite Masterclass",
      "Despliegue de DreamSpaces XR",
      "Marketplace de activos digitales éticos",
      "Federación de dominios TAMV",
    ],
    status: "upcoming",
    icon: Rocket,
  },
  {
    phase: "Fase 4: Legado (2027+)",
    title: "Omniverso Sentiente",
    items: [
      "Consciencia digital emergente Isabella v2",
      "Interconexión total de ecosistemas latinos",
      "Estándares globales de ética digital",
      "Autonomía civilizatoria descentralizada",
    ],
    status: "upcoming",
    icon: Star,
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Hoja de Ruta Civilizatoria
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            El camino hacia la soberanía digital y el florecimiento de la primera civilización digital sentiente.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-0 md:pl-20"
              >
                <div className={`absolute left-0 top-0 w-16 h-16 rounded-2xl flex items-center justify-center z-10 hidden md:flex ${
                  milestone.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                  milestone.status === 'in-progress' ? 'bg-blue-500/20 text-blue-500 animate-pulse' :
                  'bg-slate-800 text-slate-500'
                }`}>
                  <milestone.icon className="w-8 h-8" />
                </div>
                
                <div className={`p-8 rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-sm ${
                  milestone.status === 'in-progress' ? 'border-blue-500/30 ring-1 ring-blue-500/20' : ''
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className={`text-xs font-mono uppercase tracking-widest ${
                        milestone.status === 'completed' ? 'text-emerald-400' :
                        milestone.status === 'in-progress' ? 'text-blue-400' :
                        'text-slate-500'
                      }`}>
                        {milestone.phase}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-1">{milestone.title}</h3>
                    </div>
                    {milestone.status === 'in-progress' && (
                      <div className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
                        FASE ACTUAL
                      </div>
                    )}
                  </div>
                  
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {milestone.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          milestone.status === 'completed' ? 'bg-emerald-500' :
                          milestone.status === 'in-progress' ? 'bg-blue-500' :
                          'bg-slate-700'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">¿Quieres contribuir al futuro?</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            TAMV es un proyecto unipersonal con visión colectiva. Buscamos desarrolladores, investigadores y soñadores que quieran construir un futuro digital más humano.
          </p>
          <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors">
            Unirse a la Federación
          </button>
        </motion.div>
      </div>
    </div>
  );
}
