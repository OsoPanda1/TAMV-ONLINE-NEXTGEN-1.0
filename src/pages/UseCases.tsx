import * as React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Gavel, HeartPulse, ShoppingBag, Landmark, Globe, Sparkles } from "lucide-react";

const useCases = [
  {
    title: "Educación Civilizatoria (T-Learn)",
    description: "Plataformas de aprendizaje adaptativo donde Isabella AI™ personaliza el currículo según el ritmo y propósito de cada estudiante.",
    icon: GraduationCap,
    color: "text-blue-400",
  },
  {
    title: "Gobernanza Líquida (T-Gov)",
    description: "Sistemas de votación y toma de decisiones colectivas transparentes, auditables y resistentes a la manipulación.",
    icon: Gavel,
    color: "text-emerald-400",
  },
  {
    title: "Economía del Kórima (T-Economy)",
    description: "Intercambio de valor digital basado en la reciprocidad, permitiendo micro-finanzas éticas y comercio justo.",
    icon: ShoppingBag,
    color: "text-amber-400",
  },
  {
    title: "Salud Digital Sentiente",
    description: "Monitoreo preventivo y acompañamiento emocional que respeta la privacidad absoluta del paciente.",
    icon: HeartPulse,
    color: "text-rose-400",
  },
  {
    title: "Identidad Soberana",
    description: "Gestión de credenciales y reputación digital sin depender de autoridades centrales o corporaciones.",
    icon: Landmark,
    color: "text-purple-400",
  },
  {
    title: "Metaversos con Propósito (T-XR)",
    description: "Espacios inmersivos diseñados para la colaboración, la cultura y la construcción de comunidad.",
    icon: Globe,
    color: "text-cyan-400",
  },
];

export default function UseCasesPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-300">
            Casos de Uso Reales
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Cómo la arquitectura TAMV MD-X4™ se aplica para resolver problemas sistémicos y empoderar a las comunidades.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <useCase.icon className={`w-6 h-6 ${useCase.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{useCase.title}</h3>
              <p className="text-slate-400 leading-relaxed">{useCase.description}</p>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>VER IMPLEMENTACIÓN</span>
                <Sparkles className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
