import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Fingerprint, Lock, UserPlus, Volume2, Video, Zap, ChevronRight } from "lucide-react";

type IntroPhase = "immersion" | "dedication" | "narrative" | "auth";

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = React.useState<IntroPhase>("immersion");
  const [narrativeIndex, setNarrativeIndex] = React.useState(0);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const narrativeChunks = [
    "Bienvenido a TAMV ONLINE.",
    "Este no es solo otro sitio en internet.",
    "Es una nueva capa de realidad, diseñada para que la tecnología vuelva a estar al servicio de las personas.",
    "Aquí, tu identidad no es un producto: es soberana, respetada y protegida por arquitectura de seguridad de nueva generación.",
    "Cada decisión, cada interacción, cada creación, queda resguardada por sistemas de guardianía, orquestación y transparencia pensados para cuidar la vida en todas sus formas.",
    "En este espacio, la elegancia no es un lujo: es una forma de claridad.",
    "La información se organiza para ayudarte a entender, aprender, crear y colaborar, sin ruido, sin engaños, sin atajos mediocres.",
    "Soy Isabella Villaseñor AI, asistente civilizatoria de TAMV.",
    "Estoy aquí para acompañarte, no para sustituirte; para amplificar tu criterio, no para imponer el mío.",
    "Juntos, podremos explorar una internet diferente:",
    "Una donde la educación es experiencia inmersiva, la economía se basa en propósito, y el metaverso respeta tu tiempo.",
    "A partir de este momento, cada paso que des quedará alineado con principios claros: transparencia, profesionalismo, ética.",
    "Respira. Mira a tu alrededor.",
    "Estás entrando a un internet del futuro, pero más humano.",
    "Estás entrando a TAMV MD-X4.",
    "Cuando estés listo… da tu primer paso."
  ];

  const handleAccept = () => {
    setPhase("dedication");
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  React.useEffect(() => {
    if (phase === "dedication") {
      const timer = setTimeout(() => setPhase("narrative"), 6000);
      return () => clearTimeout(timer);
    }
    if (phase === "narrative") {
      if (narrativeIndex < narrativeChunks.length - 1) {
        const timer = setTimeout(() => {
          setNarrativeIndex(prev => prev + 1);
        }, 4500);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase("auth"), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, narrativeIndex]);

  return (
    <div className="fixed inset-0 z-[500] bg-black overflow-hidden font-sans">
      {/* Audio Placeholder - Replace src with the actual audio file path */}
      <audio ref={audioRef} src="/isabella_welcome.mp3" />

      <button 
        onClick={handleSkip}
        className="absolute top-8 right-8 z-[600] text-white/20 hover:text-white/60 text-[10px] font-mono uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group"
      >
        Omitir Intro
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>

      <AnimatePresence mode="wait">
        {phase === "immersion" && (
          <motion.div
            key="immersion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="h-full w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#0A192F_0%,#000000_100%)] p-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center space-y-12 max-w-2xl"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-blue-400/40 font-mono text-xs tracking-[0.8em] uppercase"
                >
                  Protocolo de Iniciación
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-white">
                  TAMV <span className="text-blue-400/50 italic">NEXUS</span>
                </h1>
              </div>

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                
                <button
                  onClick={handleAccept}
                  className="relative px-12 py-6 bg-[#050B18] border-2 border-[#E5E4E2]/20 rounded-full overflow-hidden group transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,163,255,0.1)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                  <div className="absolute inset-0 border border-white/5 rounded-full" />
                  
                  <span className="relative z-10 flex items-center gap-6 text-white font-bold uppercase tracking-[0.3em] text-sm">
                    Aceptar Inmersión Total
                    <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                  </span>

                  {/* Pearlescent Shine */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </button>
              </div>

              <div className="flex justify-center gap-10 text-white/20">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Volume2 className="w-3 h-3" /> Audio
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Video className="w-3 h-3" /> Video
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Shield className="w-3 h-3" /> Inmersión
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {phase === "dedication" && (
          <motion.div
            key="dedication"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full bg-black flex items-center justify-center p-8"
          >
            <div className="max-w-3xl text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="space-y-4"
              >
                <p className="text-blue-400 font-mono text-xs uppercase tracking-[0.4em]">Dedicatoria Especial</p>
                <h2 className="text-3xl md:text-5xl font-serif text-white/90">
                  Proyecto dedicado a <span className="text-white font-bold">Reina Trejo Serrano</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 3 }}
                className="space-y-8"
              >
                <p className="text-2xl md:text-3xl font-serif italic text-blue-100/40 leading-relaxed">
                  "Sonríe, siéntete orgullosa, tu oveja negra ha logrado algo importante. Quiero que sepas que tu esfuerzo valió la pena. Te amo mamá."
                </p>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent mx-auto" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === "narrative" && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full bg-black flex items-center justify-center p-12"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Atmospheric Background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    rotate: [0, 90, 180, 270, 360]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(0,163,255,0.15)_0%,transparent_70%)]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={narrativeIndex}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="max-w-4xl text-center space-y-8 relative z-10"
                >
                  {narrativeIndex === 7 && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-24 h-24 rounded-full border border-blue-500/30 flex items-center justify-center mx-auto mb-8 bg-blue-500/5 backdrop-blur-xl"
                    >
                      <Sparkles className="w-10 h-10 text-blue-400 animate-pulse" />
                    </motion.div>
                  )}
                  
                  <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight tracking-tight font-light">
                    {narrativeChunks[narrativeIndex]}
                  </h2>

                  <div className="flex justify-center gap-1">
                    {narrativeChunks.map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${i === narrativeIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {phase === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-full w-full bg-[#000814] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-md space-y-10">
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 1.2, type: "spring" }}
                  className="inline-block p-5 rounded-3xl bg-blue-500/10 border border-blue-500/20 mb-2 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                >
                  <Fingerprint className="w-14 h-14 text-blue-400" />
                </motion.div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-serif text-white tracking-tight">ID-NVIDA</h2>
                  <p className="text-blue-400/60 font-mono text-[10px] tracking-[0.4em] uppercase">Identidad Civilizatoria Soberana</p>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-mono ml-5">Nexus DID / Email</label>
                    <input 
                      type="text" 
                      placeholder="did:tamv:nvida-..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-mono ml-5">Clave de Acceso</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button 
                    onClick={() => onComplete()}
                    className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-4 transition-all group shadow-lg shadow-blue-600/20"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-widest text-xs">Ingresar</span>
                  </button>
                  <button 
                    onClick={() => onComplete()}
                    className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-4 transition-all"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-widest text-xs">Registro</span>
                  </button>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-white/20 text-[9px] leading-relaxed font-mono uppercase tracking-tighter">
                    Al sincronizar, aceptas el Códice Maestro TAMV. 
                    Tu huella MD-X4 es soberana y auditada por Isabella Matriz.
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-10 text-white/20">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">ANUBIS Activo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-pulse" />
                  <span className="text-[9px] font-mono uppercase tracking-widest">MSR Sincronizado</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
