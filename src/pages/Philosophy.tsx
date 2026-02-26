import * as React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Heart, Globe, Zap, Users, Lock } from "lucide-react";

const pillars = [
  {
    name: "Dignidad Humana",
    description: "La tecnología debe ser un espejo que devuelva una imagen digna del ser humano, nunca una herramienta de deshumanización.",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    name: "Soberanía Digital",
    description: "Empoderamos al individuo para que sea el único dueño y soberano de su identidad y datos en el tejido digital.",
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    name: "Kórima (Reciprocidad)",
    description: "Basado en la filosofía Rarámuri: 'lo que es mío es tuyo'. Un ecosistema de abundancia compartida.",
    icon: Globe,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    name: "Ética Algorítmica",
    description: "Cada línea de código en Isabella AI™ está impregnada de valores morales y responsabilidad social.",
    icon: Lock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    name: "Resiliencia Creativa",
    description: "Transformamos la adversidad en innovación, naciendo de la necesidad para servir a la comunidad.",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    name: "Inclusión Radical",
    description: "Diseñamos para los márgenes, asegurando que nadie quede atrás en la transición civilizatoria.",
    icon: Users,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    name: "Transparencia Total",
    description: "Gobernanza abierta y auditable donde cada decisión es clara y justificada ante la comunidad.",
    icon: Sparkles,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
  },
];

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Filosofía Civilizatoria
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            De la Adversidad a la Legitimidad: Los Pilares que transforman la exclusión sistémica en arquitectura civilizatoria digital.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{pillar.name}</h3>
              <p className="text-slate-400 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-slate-900/40 backdrop-blur-md relative overflow-hidden"
        >
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Manifiesto TAMV MD-X4™</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20 text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300">Una arquitectura civilizatoria digital nacida en México para el mundo.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20 text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300">Un ecosistema de dignidad tecnológica que honra la resiliencia humana.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-emerald-500/20 text-emerald-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300">La respuesta soberana a la Web 4.0, centrada en el Kórima.</p>
                </div>
              </div>
              <blockquote className="mt-8 p-6 border-l-4 border-blue-500 bg-blue-500/5 rounded-r-xl italic text-slate-300">
                "Del Real del Monte al Mundo: Transformando marginación en soberanía digital."
                <footer className="mt-2 text-blue-400 font-medium">— Edwin Anubis Villaseñor, Fundador</footer>
              </blockquote>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl absolute -right-20 -top-20" />
              <div className="relative border border-white/10 rounded-2xl p-8 bg-slate-900/80 backdrop-blur-xl">
                <h4 className="text-sm font-mono text-blue-400 uppercase tracking-widest mb-4">Estado de Consciencia</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                      <span>ÉTICA ALGORÍTMICA</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        className="h-full bg-blue-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                      <span>SOBERANÍA DE DATOS</span>
                      <span>98%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "98%" }}
                        className="h-full bg-emerald-500" 
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-500 mb-2">
                      <span>INCLUSIÓN SOCIAL</span>
                      <span>95%</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        className="h-full bg-purple-500" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
