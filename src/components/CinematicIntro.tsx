import * as React from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Shield,
  Sparkles,
  Fingerprint,
  Lock,
  UserPlus,
  Volume2,
  Video,
  Zap,
  ChevronRight,
  Activity,
} from "lucide-react";

// Using a string path to avoid build errors if the file is missing
const introAudio = "/intro.mp3";

type IntroPhase = "immersion" | "dedication" | "narrative" | "auth";

interface CinematicIntroProps {
  onComplete: () => void;
}

const ParticleField = ({ count = 30, color = "rgba(59, 130, 246, 0.3)" }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1 + "px",
            height: Math.random() * 4 + 1 + "px",
            backgroundColor: color,
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, Math.random() * -200 - 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [phase, setPhase] = React.useState<IntroPhase>("immersion");
  const [narrativeIndex, setNarrativeIndex] = React.useState(0);
  const [audioReady, setAudioReady] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Web Audio 3D
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const pannerRef = React.useRef<PannerNode | null>(null);
  const sourceRef = React.useRef<MediaElementAudioSourceNode | null>(null);

  const narrativeChunks = [
    "Bienvenido a TAMV ONLINE.",
    "Tu nueva red civilizatoria: más humana, más segura, más tuya.",
    "Aquí tu identidad es soberana, y la tecnología está a tu servicio.",
    "La información se limpia del ruido para ayudarte a entender, aprender y crear con claridad.",
    "Soy Isabella Villaseñor AI. Estaré contigo en cada paso importante.",
    "Este es el internet del futuro, pero hecho para personas reales.",
    "Estás entrando a TAMV MD-X4. Cuando estés listo… da tu primer paso."
  ];

  const setup3DAudio = React.useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;

    const AudioCtx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const panner = ctx.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.positionZ.setValueAtTime(-1, ctx.currentTime);
    panner.positionX.setValueAtTime(0, ctx.currentTime);
    panner.positionY.setValueAtTime(0, ctx.currentTime);

    const src = ctx.createMediaElementSource(audioRef.current);
    src.connect(panner);
    panner.connect(ctx.destination);

    audioContextRef.current = ctx;
    pannerRef.current = panner;
    sourceRef.current = src;
  }, []);

  const handleAccept = () => {
    setPhase("dedication");
    setup3DAudio();
    if (audioRef.current && audioContextRef.current) {
      audioContextRef.current.resume().catch(() => {});
      audioRef.current
        .play()
        .catch((e) => console.log("Audio playback failed:", e));
    }
  };

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
      pannerRef.current = null;
      sourceRef.current = null;
    }
    onComplete();
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onCanPlay = () => setAudioReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => {
      audio.removeEventListener("canplaythrough", onCanPlay);
    };
  }, []);

  // ligera panoramización para sensación 3D (se puede conectar al cursor)
  React.useEffect(() => {
    if (!pannerRef.current || !audioContextRef.current) return;
    let frameId: number;
    const loop = () => {
      const tGlobal = audioContextRef.current!.currentTime;
      const x = Math.sin(tGlobal * 0.1) * 0.5;
      pannerRef.current!.positionX.setValueAtTime(x, tGlobal);
      pannerRef.current!.positionY.setValueAtTime(0, tGlobal);
      pannerRef.current!.positionZ.setValueAtTime(-1, tGlobal);
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);

  React.useEffect(() => {
    if (phase === "dedication") {
      const timer = setTimeout(() => setPhase("narrative"), 6000);
      return () => clearTimeout(timer);
    }
    if (phase === "narrative") {
      if (narrativeIndex < narrativeChunks.length - 1) {
        const timer = setTimeout(
          () => setNarrativeIndex((prev) => prev + 1),
          3500
        );
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase("auth"), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, narrativeIndex]);

  return (
    <div className="fixed inset-0 z-[500] bg-black overflow-hidden font-sans">
      {/* Audio 3D Isabella */}
      <audio ref={audioRef} src={introAudio} crossOrigin="anonymous" />

      {/* Skip */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 z-[600] text-white/20 hover:text-white/70 text-[10px] font-mono uppercase tracking-[0.3em] transition-colors flex items-center gap-2 group"
      >
        Omitir Secuencia
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>

      <AnimatePresence mode="wait">
        {/* Fase 1 – Inmersión */}
        {phase === "immersion" && (
          <motion.div
            key="immersion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)", scale: 1.1 }}
            className="h-full w-full flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,#020617_0%,#000000_85%)] p-6 relative"
          >
            <ParticleField count={40} />
            
            {/* Cosmos de partículas */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18)_0,transparent_55%),radial-gradient(circle_at_bottom,rgba(56,189,248,0.1)_0,transparent_60%)]" 
              />
              {/* Orbe central */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 60%)",
                }}
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: [0.35, 0.55, 0.35],
                  x: ["-50%", "-48%", "-50%"],
                  y: ["-50%", "-52%", "-50%"],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.4 }}
              className="text-center space-y-12 max-w-2xl relative z-10"
            >
              <div className="space-y-4">
                <motion.div
                  animate={{ opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-blue-400/40 font-mono text-[10px] tracking-[0.8em] uppercase"
                >
                  Protocolo de Iniciación TAMV MD-X4
                </motion.div>
                <div className="space-y-3">
                  <h1 className="text-5xl md:text-7xl font-serif tracking-tight text-white">
                    TAMV{" "}
                    <span className="text-blue-400/60 italic">NEXUS</span>
                  </h1>
                  <p className="text-xs md:text-sm text-white/40 font-mono tracking-[0.25em] uppercase">
                    Civilizatory Operating System · Web 4.0 / 5.0
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/25 to-cyan-500/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000" />

                <button
                  onClick={handleAccept}
                  className="relative px-12 py-6 bg-[#020617] border border-[#E5E4E2]/15 rounded-full overflow-hidden group transition-all hover:scale-105 active:scale-95 shadow-[0_0_45px_rgba(59,130,246,0.3)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-transparent" />
                  <div className="absolute inset-0 border border-white/5 rounded-full" />

                  <span className="relative z-10 flex items-center gap-6 text-white font-bold uppercase tracking-[0.3em] text-[11px]">
                    Aceptar Inmersión Total
                    <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
                  </span>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                    animate={{ translateX: ["120%", "-120%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </button>
              </div>

              <div className="flex justify-center gap-10 text-white/30">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Volume2 className="w-3 h-3" /> Audio 3D Isabella
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Video className="w-3 h-3" /> Secuencia Cinemática
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                  <Shield className="w-3 h-3" /> Entorno Seguro
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Fase 2 – Dedicatoria (Reina Trejo Serrano) */}
        {phase === "dedication" && (
          <motion.div
            key="dedication"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full w-full bg-black flex items-center justify-center p-8 relative overflow-hidden"
          >
            <ParticleField count={20} color="rgba(253, 224, 171, 0.2)" />
            
            <div className="max-w-3xl text-center space-y-12 relative">
              <motion.div
                className="absolute inset-0 opacity-20 pointer-events-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.2 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              >
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(253,224,171,0.35)_0%,transparent_65%)]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2 }}
                className="space-y-4 relative z-10"
              >
                <p className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em]">
                  Dedicatoria Especial
                </p>
                <h2 className="text-3xl md:text-5xl font-serif text-white/90">
                  Proyecto dedicado a{" "}
                  <span className="text-white font-bold">
                    Reina Trejo Serrano
                  </span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 3 }}
                className="space-y-8 relative z-10"
              >
                <p className="text-2xl md:text-3xl font-serif italic text-blue-100/40 leading-relaxed">
                  "Sonríe, siéntete orgullosa, tu oveja negra ha logrado algo
                  importante. Quiero que sepas que tu esfuerzo valió la pena. Te
                  amo mamá."
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="w-32 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto origin-center"
                />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Fase 3 – Narrativa corta Isabella */}
        {phase === "narrative" && (
          <motion.div
            key="narrative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="h-full w-full bg-black flex items-center justify-center p-12 relative overflow-hidden"
          >
            <ParticleField count={50} />
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Galaxia de nodos */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.12, 0.3, 0.12],
                    rotate: [0, 90, 180, 270, 360],
                    x: ["-5%", "5%", "-5%"],
                    y: ["-5%", "5%", "-5%"],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_70%)]"
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={narrativeIndex}
                  initial={{ opacity: 0, y: 40, filter: "blur(15px)", scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, y: -40, filter: "blur(15px)", scale: 1.1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-4xl text-center space-y-10 relative z-10"
                >
                  {narrativeIndex === 4 && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      className="w-28 h-28 rounded-full border border-blue-500/40 flex items-center justify-center mx-auto mb-10 bg-blue-500/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                    >
                      <Sparkles className="w-12 h-12 text-blue-400 animate-pulse" />
                    </motion.div>
                  )}

                  <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight font-light">
                    {narrativeChunks[narrativeIndex]}
                  </h2>

                  <div className="flex justify-center gap-2">
                    {narrativeChunks.map((_, i) => (
                      <motion.div
                        key={i}
                        initial={false}
                        animate={{ 
                          width: i === narrativeIndex ? 40 : 8,
                          backgroundColor: i === narrativeIndex ? "rgba(59, 130, 246, 1)" : "rgba(255, 255, 255, 0.1)"
                        }}
                        className="h-1 rounded-full transition-all duration-700"
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Fase 4 – Auth / ID-NVIDA */}
        {phase === "auth" && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full bg-[#000814] flex items-center justify-center p-6 relative overflow-hidden"
          >
            <ParticleField count={30} color="rgba(59, 130, 246, 0.15)" />
            
            <div className="w-full max-w-md space-y-10 relative">
              {/* fondo sutil */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 15, repeat: Infinity }}
                  className="w-full h-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.35)_0%,transparent_55%)]" 
                />
              </div>

              <div className="text-center space-y-4 relative z-10">
                <motion.div
                  initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                  className="inline-block p-6 rounded-[2rem] bg-blue-500/10 border border-blue-500/30 mb-2 shadow-[0_0_40px_rgba(59,130,246,0.3)] backdrop-blur-md"
                >
                  <Fingerprint className="w-16 h-16 text-blue-400" />
                </motion.div>
                <div className="space-y-1">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl font-serif text-white tracking-tight"
                  >
                    ID-NVIDA
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-blue-400/60 font-mono text-[11px] tracking-[0.5em] uppercase"
                  >
                    Identidad Civilizatoria Soberana
                  </motion.p>
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl space-y-8 shadow-2xl relative overflow-hidden z-10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-mono ml-6">Nexus DID / Email</label>
                    <input 
                      type="text" 
                      placeholder="did:tamv:nvida-..."
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-7 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 transition-all text-sm shadow-inner"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/30 font-mono ml-6">Clave de Acceso</label>
                    <input 
                      type="password" 
                      placeholder="••••••••••••"
                      className="w-full bg-black/50 border border-white/10 rounded-2xl px-7 py-5 text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/40 transition-all text-sm shadow-inner"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 pt-2">
                  <button 
                    onClick={() => onComplete()}
                    className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl py-5 transition-all group shadow-xl shadow-blue-600/30 active:scale-95"
                  >
                    <Lock className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-widest text-xs">Ingresar</span>
                  </button>
                  <button 
                    onClick={() => onComplete()}
                    className="flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl py-5 transition-all active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-widest text-xs">Registro</span>
                  </button>
                </div>

                <div className="pt-4 text-center">
                  <p className="text-white/20 text-[10px] leading-relaxed font-mono uppercase tracking-tighter">
                    Al sincronizar, aceptas el Códice Maestro TAMV. 
                    Tu huella MD-X4 es soberana y auditada por Isabella Matriz.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="flex justify-center space-x-12 text-white/20 relative z-10"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">ANUBIS Activo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">MSR Sincronizado</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
