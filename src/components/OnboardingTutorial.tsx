import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Zap, 
  Globe, 
  MessageSquare, 
  CheckCircle,
  X,
  Play,
  Award,
  ChevronRight
} from "lucide-react";
import { UserRole } from "../services/assetService";

interface OnboardingTutorialProps {
  onComplete: (role: UserRole) => void;
}

export default function OnboardingTutorial({ onComplete }: OnboardingTutorialProps) {
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roles: { id: UserRole; title: string; desc: string; icon: any }[] = [
    { 
      id: "aprendiz", 
      title: "Aprendiz", 
      desc: "Quiero aprender y crecer en la UTAMV.", 
      icon: BookOpen 
    },
    { 
      id: "creador", 
      title: "Creador", 
      desc: "Quiero crear y monetizar proyectos civilizatorios.", 
      icon: Zap 
    },
    { 
      id: "explorador", 
      title: "Explorador XR", 
      desc: "Quiero explorar el metaverso DreamSpaces.", 
      icon: Globe 
    },
    { 
      id: "organizacion", 
      title: "Organización", 
      desc: "Represento a una institución o cell federada.", 
      icon: Sparkles 
    }
  ];

  const nextStep = () => setStep(s => s + 1);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-tamv-dark/95 backdrop-blur-xl">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="max-w-2xl text-center space-y-8 p-8"
          >
            <div className="w-24 h-24 bg-tamv-blue/20 rounded-full flex items-center justify-center mx-auto border border-tamv-blue/30">
              <Sparkles className="w-12 h-12 text-tamv-blue animate-pulse" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-serif text-white">Bienvenido a TAMV ONLINE</h1>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Estás a punto de ingresar a un sistema operativo civilizatorio distribuido. 
                Permítenos guiarte en tus primeros pasos.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <button 
                onClick={nextStep}
                className="px-12 py-4 bg-tamv-blue text-tamv-dark rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-3"
              >
                Empezar Recorrido <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => onComplete("explorador")}
                className="text-white/40 hover:text-white transition-colors text-sm uppercase tracking-widest"
              >
                Saltar Tutorial
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="max-w-4xl w-full p-8 space-y-12"
          >
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-serif text-white">Elige tu Camino</h2>
              <p className="text-white/50">¿Cuál es tu intención principal en el ecosistema?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setSelectedRole(role.id);
                    nextStep();
                  }}
                  className="glass-panel p-8 text-left group hover:border-tamv-blue transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <role.icon className="w-32 h-32 text-tamv-blue" />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue group-hover:bg-tamv-blue group-hover:text-tamv-dark transition-colors">
                      <role.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-white">{role.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed">{role.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl w-full p-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tamv-blue/20 text-tamv-blue text-[10px] font-bold uppercase tracking-widest">
                  Pilar 01: Social Hub
                </div>
                <h2 className="text-4xl font-serif text-white">Conexión Federada</h2>
                <p className="text-lg text-white/60 leading-relaxed">
                  El Social Hub no es solo un feed; es el pulso de la civilización. Aquí verás eventos de MSR, 
                  proyectos de cells y la actividad de tus federados.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2 bg-tamv-blue/20 rounded-lg text-tamv-blue">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Cards Federadas</h4>
                    <p className="text-xs text-white/40">Contenido de alto impacto con métricas de valor civilizatorio.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="p-2 bg-tamv-cyan/20 rounded-lg text-tamv-cyan">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Filtros de Dominio</h4>
                    <p className="text-xs text-white/40">Navega por capas: UTAMV, Economía, Seguridad, XR.</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={nextStep}
                className="px-8 py-4 bg-tamv-blue text-tamv-dark rounded-full font-bold uppercase tracking-widest flex items-center gap-2"
              >
                Siguiente Pilar <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-square glass-panel p-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tamv-blue/20 to-transparent" />
              <img 
                src="https://picsum.photos/seed/tutorial-social/800/800" 
                alt="Social Hub Preview"
                className="w-full h-full object-cover rounded-xl opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-tamv-blue rounded-full flex items-center justify-center animate-ping opacity-20" />
                <div className="w-12 h-12 bg-tamv-blue rounded-full flex items-center justify-center relative z-10">
                  <Play className="w-6 h-6 text-tamv-dark fill-current" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl w-full p-12 glass-panel text-center space-y-8 border-t-4 border-tamv-blue"
          >
            <div className="w-20 h-20 bg-tamv-blue/20 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-10 h-10 text-tamv-blue" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-serif text-white">Tu Primera Misión</h2>
              <p className="text-white/60">
                Para activar tu identidad cuántica, explora el Social Hub y encuentra un proyecto que te inspire. 
                ¡Ganarás tus primeros 100 QuantumSeeds!
              </p>
            </div>
            <div className="p-6 bg-tamv-blue/5 rounded-2xl border border-tamv-blue/20 text-left">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-5 h-5 text-tamv-blue" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Misión Activa</span>
              </div>
              <p className="text-xs text-white/40">Objetivo: Realizar tu primera interacción civilizatoria.</p>
            </div>
            <button 
              onClick={() => onComplete(selectedRole || "explorador")}
              className="w-full py-4 bg-tamv-blue text-tamv-dark rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform"
            >
              Entrar al Nexus
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
        {[0, 1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`h-1 rounded-full transition-all duration-500 ${
              s === step ? "w-8 bg-tamv-blue" : "w-2 bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
