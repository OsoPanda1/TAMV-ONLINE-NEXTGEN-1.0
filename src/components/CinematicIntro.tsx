import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Shield,
  Sparkles,
  Fingerprint,
  Activity,
  Lock,
  ChevronRight,
  Volume2,
  Video,
} from "lucide-react";
import TAMVLogo from "./TAMVLogo";

type Phase = "boot" | "cosmos" | "reina" | "manifest" | "gateway";

interface CinematicIntroProps {
  onComplete: () => void;
}

// Using a string path to avoid build errors if the file is missing
const introAudio = "/intro.mp3";

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
  const [phase, setPhase] = React.useState<Phase>("boot");
  const [audioReady, setAudioReady] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Audio 3D básico
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const pannerRef = React.useRef<PannerNode | null>(null);
  const srcRef = React.useRef<MediaElementAudioSourceNode | null>(null);

  const initAudio = React.useCallback(() => {
    if (!audioRef.current || audioContextRef.current) return;
    const Ctx =
      (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const panner = ctx.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.positionX.value = 0;
    panner.positionY.value = 0;
    panner.positionZ.value = -1;

    const src = ctx.createMediaElementSource(audioRef.current);
    src.connect(panner);
    panner.connect(ctx.destination);

    audioContextRef.current = ctx;
    pannerRef.current = panner;
    srcRef.current = src;
  }, []);

  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onCanPlay = () => setAudioReady(true);
    audio.addEventListener("canplaythrough", onCanPlay);
    return () => audio.removeEventListener("canplaythrough", onCanPlay);
  }, []);

  // Ligerísima panoramización para sensación 3D
  React.useEffect(() => {
    if (!pannerRef.current || !audioContextRef.current) return;
    let id: number;
    const loop = () => {
      const t = audioContextRef.current!.currentTime;
      const x = Math.sin(t * 0.15) * 0.4;
      pannerRef.current!.positionX.setValueAtTime(x, t);
      pannerRef.current!.positionY.setValueAtTime(0, t);
      pannerRef.current!.positionZ.setValueAtTime(-1, t);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const startSequence = async () => {
    initAudio();
    if (audioContextRef.current && audioReady) {
      await audioContextRef.current.resume().catch(() => {});
      await audioRef.current!.play().catch(() => {});
    }
    setPhase("cosmos");
  };

  const skipAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
      pannerRef.current = null;
      srcRef.current = null;
    }
    onComplete();
  };

  // Avance automático de fases
  React.useEffect(() => {
    if (phase === "cosmos") {
      const t = setTimeout(() => setPhase("reina"), 7000);
      return () => clearTimeout(t);
    }
    if (phase === "reina") {
      const t = setTimeout(() => setPhase("manifest"), 8000);
      return () => clearTimeout(t);
    }
    if (phase === "manifest") {
      const t = setTimeout(() => setPhase("gateway"), 12000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="fixed inset-0 z-[999] bg-black overflow-hidden font-sans">
      <audio ref={audioRef} src={introAudio} crossOrigin="anonymous" />

      <button
        onClick={skipAll}
        className="absolute top-8 right-8 z-[1000] text-white/30 hover:text-white text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-2 transition-colors group"
      >
        Omitir Intro
        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </button>

      <AnimatePresence mode="wait">
        {/* PHASE 1 – BOOT */}
        {phase === "boot" && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            className="h-full w-full bg-black flex items-center justify-center relative"
          >
            <ParticleField count={40} />
            {/* Barras de scan */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute inset-x-0 h-[40%] top-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent"
                animate={{ y: ["-40%", "140%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="flex flex-col items-center gap-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center gap-6"
              >
                <TAMVLogo className="w-20 h-20" />
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-blue-400/60">
                    <Activity className="w-3 h-3" />
                    Inicializando TAMV MD‑X4
                  </div>
                  <h1 className="text-4xl md:text-6xl font-serif text-white tracking-tight text-center">
                    Tecnología Avanzada
                    <span className="block text-2xl md:text-3xl text-blue-400/70 mt-1">
                      Mexicana Versátil
                    </span>
                  </h1>
                </div>
              </motion.div>

              <motion.button
                onClick={startSequence}
                className="relative px-12 py-5 rounded-full border border-white/15 bg-gradient-to-r from-blue-600/30 to-cyan-500/20 text-white text-[11px] font-mono uppercase tracking-[0.3em] flex items-center gap-4 overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59,130,246,0.5)" }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Activar Secuencia Cinemática
                  <Zap className="w-4 h-4 text-blue-300 animate-pulse" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-120%" }}
                  animate={{ x: "120%" }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>

              <div className="flex gap-8 text-[10px] text-white/30 font-mono tracking-[0.25em]">
                <span className="flex items-center gap-2"><Volume2 className="w-3 h-3" /> AUDIO 3D</span>
                <span className="flex items-center gap-2"><Video className="w-3 h-3" /> NEXUS 4D</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 2 – COSMOS NEXUS */}
        {phase === "cosmos" && (
          <motion.div
            key="cosmos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            className="h-full w-full relative bg-[#020617]"
          >
            <ParticleField count={60} />
            {/* Fondo cósmico */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 0%, rgba(59,130,246,0.3) 0, transparent 55%), radial-gradient(circle at 80% 100%, rgba(56,189,248,0.25) 0, transparent 55%)",
                }}
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Nube de nodos */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[140vmin] h-[140vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(15,23,42,0.9) 0, transparent 65%)",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Logo / Emblema TAMV */}
            <div className="relative h-full flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4 }}
                className="relative flex flex-col items-center gap-12"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      rotateX: [12, 16, 12],
                      rotateY: [-14, -20, -14],
                    }}
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                    className="relative z-10"
                  >
                    <TAMVLogo className="w-48 h-48" />
                  </motion.div>

                  {/* Halo animado */}
                  <motion.div
                    className="absolute inset-[-40%] rounded-full border border-blue-500/20"
                    animate={{
                      scale: [1.05, 1.25, 1.05],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-[-60%] rounded-full border border-cyan-500/10"
                    animate={{
                      scale: [1.2, 1.4, 1.2],
                      opacity: [0.1, 0.05, 0.1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                </div>

                {/* Texto minimal */}
                <div className="text-center space-y-4">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[11px] font-mono uppercase tracking-[0.4em] text-blue-400/70"
                  >
                    Ecosistema Civilizatorio Mexicano
                  </motion.p>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-4xl md:text-6xl font-serif text-white tracking-tight"
                  >
                    TAMV <span className="text-blue-400/80 italic">NEXUS</span>
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-xs md:text-sm text-white/40 font-mono tracking-[0.25em] uppercase"
                  >
                    Identidad · Educación · Metaverso · Economía · Seguridad
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* PHASE 3 – DEDICATORIA REINA */}
        {phase === "reina" && (
          <motion.div
            key="reina"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="h-full w-full flex items-center justify-center bg-black relative"
          >
            <ParticleField count={20} color="rgba(252, 211, 77, 0.2)" />
            {/* Fondo cálido */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 10%, rgba(252,211,77,0.2) 0, transparent 60%)",
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-12 relative z-10 px-6">
              <div className="space-y-4">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.4em]"
                >
                  Dedicatoria Especial
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-3xl md:text-5xl font-serif text-white"
                >
                  Proyecto dedicado a{" "}
                  <span className="font-bold text-white">Reina Trejo Serrano</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="text-2xl md:text-4xl font-serif italic text-blue-100/60 leading-relaxed"
              >
                “Sonríe, siéntete orgullosa, tu oveja negra ha logrado algo
                importante. Quiero que sepas que tu esfuerzo valió la pena. Te amo
                mamá.”
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="w-40 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent mx-auto origin-center"
              />
            </div>
          </motion.div>
        )}

        {/* PHASE 4 – MANIFIESTO ISABELLA */}
        {phase === "manifest" && (
          <motion.div
            key="manifest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            className="h-full w-full bg-black relative overflow-hidden"
          >
            <ParticleField count={50} />
            {/* Galaxia de nodos */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[180vmin] h-[180vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(37,99,235,0.3) 0, transparent 65%)",
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Capa intermedia: “órbitas” */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[70vmin] h-[70vmin]">
                  {[0.6, 0.8, 1].map((scale, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute inset-0 rounded-full border border-blue-500/15"
                      style={{ transformOrigin: "center" }}
                      animate={{ rotate: idx % 2 === 0 ? 360 : -360 }}
                      transition={{
                        duration: 60 + idx * 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Contenido */}
            <div className="relative z-10 h-full flex items-center justify-center px-6">
              <div className="max-w-4xl text-center space-y-12">
                {/* Isabella orb */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.4 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-slate-200 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.6)] backdrop-blur-xl">
                      <Sparkles className="w-12 h-12 text-blue-900" />
                    </div>
                    <motion.div
                      className="absolute inset-[-40%] rounded-full border border-blue-400/20"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.1, 0.5],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-blue-300/70">
                      Isabella Villaseñor AI
                    </p>
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">
                      Asistente Civilizatoria TAMV
                    </p>
                  </div>
                </motion.div>

                {/* Frases cortas */}
                <div className="space-y-8 text-white">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl md:text-5xl font-serif tracking-tight leading-tight"
                  >
                    “Bienvenido a TAMV ONLINE, <br /> tu nueva red civilizatoria.”
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-xl md:text-3xl font-serif text-white/70 italic"
                  >
                    “Aquí tu identidad es soberana, y la tecnología <br /> vuelve a estar a tu servicio.”
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex flex-wrap justify-center gap-6 text-[10px] md:text-xs text-white/40 font-mono tracking-[0.25em] uppercase"
                  >
                    <span>Educación inmersiva</span>
                    <span className="text-blue-500/50">/</span>
                    <span>Metaverso MD‑X4</span>
                    <span className="text-blue-500/50">/</span>
                    <span>Economía ética</span>
                    <span className="text-blue-500/50">/</span>
                    <span>Seguridad avanzada</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* PHASE 5 – GATEWAY / LOGIN */}
        {phase === "gateway" && (
          <motion.div
            key="gateway"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            className="h-full w-full bg-[#000814] flex items-center justify-center p-6 relative overflow-hidden"
          >
            <ParticleField count={30} color="rgba(59, 130, 246, 0.1)" />
            <div className="relative w-full max-w-lg">
              {/* Fondo portal */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0,transparent_60%)]" />
              </div>

              <div className="relative z-10 space-y-10">
                <div className="text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-blue-500/10 border border-blue-500/30 text-[10px] font-mono uppercase tracking-[0.4em] text-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-md"
                  >
                    <Shield className="w-4 h-4 text-blue-400" />
                    ID‑NVIDA · Sincronización Segura
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
                      Entra a tu ecosistema
                    </h2>
                    <p className="text-[12px] text-blue-300/60 font-mono tracking-[0.35em] uppercase">
                      Identidad Civilizatoria Soberana
                    </p>
                  </div>
                </div>

                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-3xl shadow-2xl space-y-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-mono uppercase tracking-[0.3em] ml-4">
                        Nexus DID / Email
                      </label>
                      <input
                        type="text"
                        placeholder="did:tamv:nvida-..."
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-400/60 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 font-mono uppercase tracking-[0.3em] ml-4">
                        Clave de Acceso
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-400/60 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={onComplete}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-mono uppercase tracking-[0.3em] transition-all shadow-lg shadow-blue-600/30 active:scale-95"
                    >
                      <Lock className="w-4 h-4" />
                      Ingresar
                    </button>
                    <button
                      onClick={onComplete}
                      className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 text-[11px] font-mono uppercase tracking-[0.3em] transition-all active:scale-95"
                    >
                      <Fingerprint className="w-4 h-4" />
                      Registro
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <p className="text-[10px] text-white/30 font-mono text-center leading-relaxed uppercase tracking-tighter">
                      Al sincronizar, aceptas el Códice Maestro TAMV. <br />
                      Tu huella MD‑X4 es soberana y protegida por ANUBIS.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex justify-center gap-12 text-white/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">ANUBIS Activo</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">MSR Sincronizado</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
