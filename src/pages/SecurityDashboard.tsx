import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Activity, 
  Lock, 
  AlertTriangle, 
  Eye, 
  Zap, 
  Cpu, 
  Layers, 
  Radar, 
  Database,
  Terminal,
  ChevronRight,
  Hexagon,
  Globe,
  X,
  ShieldCheck,
  ShieldAlert,
  Power
} from "lucide-react";
import { securityEngine } from "../services/security/engine";
import { SecurityLayer, SecurityStatus, SecurityEvent } from "../services/security/types";

export default function SecurityDashboard() {
  const [status, setStatus] = React.useState<SecurityStatus>(securityEngine.getStatus());
  const [events, setEvents] = React.useState<SecurityEvent[]>(securityEngine.getRecentEvents());
  const [activeLayer, setActiveLayer] = React.useState<SecurityLayer>(SecurityLayer.TENOCHTITLAN);
  const [showAnubisModal, setShowAnubisModal] = React.useState(false);
  const [isMonitoringActive, setIsMonitoringActive] = React.useState(true);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatus({ ...securityEngine.getStatus() });
      setEvents([...securityEngine.getRecentEvents()]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const layers = [
    { id: SecurityLayer.TENOCHTITLAN, name: "TENOCHTITLAN", desc: "Security Shell 3D - Honeypots Infinitos", icon: Globe, color: "text-tamv-cyan", border: "border-tamv-cyan/30" },
    { id: SecurityLayer.QUETZALCOATL, name: "QUETZALCOATL", desc: "Radar de Tráfico Lógico y Anomalías", icon: Radar, color: "text-tamv-blue", border: "border-tamv-blue/30" },
    { id: SecurityLayer.OJO_DE_RA, name: "OJO DE RA", desc: "Radar de Red e Integridad de Canales", icon: Eye, color: "text-tamv-blue", border: "border-tamv-blue/30" },
    { id: SecurityLayer.ANUBIS, name: "ANUBIS CENTINEL", desc: "4 Capas Cifradas - Borde e Identidad", icon: Shield, color: "text-tamv-teal", border: "border-tamv-teal/30" },
    { id: SecurityLayer.HORUS, name: "HORUS CENTINEL", desc: "8 Capas de Respuesta Adaptativa", icon: Lock, color: "text-tamv-amber", border: "border-tamv-amber/30" },
    { id: SecurityLayer.DEKATEOTL, name: "DEKATEOTL", desc: "Orquestador Principal - 11 Niveles", icon: Cpu, color: "text-tamv-blue", border: "border-tamv-blue/30" },
    { id: SecurityLayer.AZTEK_GODS, name: "AZTEK GODS", desc: "Resiliencia Extrema - 22 Niveles", icon: Zap, color: "text-tamv-accent", border: "border-tamv-accent/30" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Stats */}
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* Left Column: Stats & Layers (Main Focus) */}
      <div className="xl:col-span-3 space-y-8">
        {/* Dynamic Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Amenaza", value: `${status.globalThreatLevel.toFixed(1)}%`, icon: Activity, color: "text-tamv-blue", bg: "bg-tamv-blue/10" },
            { label: "Honeypots", value: status.activeHoneypots, icon: Globe, color: "text-tamv-cyan", bg: "bg-tamv-cyan/10" },
            { label: "Nivel MSR", value: status.orchestrator.level, icon: Cpu, color: "text-tamv-teal", bg: "bg-tamv-teal/10" },
            { label: "Horus", value: "Vigilante", icon: Lock, color: "text-tamv-amber", bg: "bg-tamv-amber/10" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-4 flex items-center gap-4 border-b-2 border-white/5 hover:border-tamv-blue/30 transition-all"
            >
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                <div className="text-xl font-bold font-mono">{stat.value}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Core & Layer Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-panel p-6 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-tamv-blue/5 to-transparent pointer-events-none" />
            <h3 className="absolute top-6 left-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white/40">Escudo Civilizatorio</h3>
            
            <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`absolute rounded-full border cursor-pointer transition-all duration-700 flex items-center justify-center
                    ${activeLayer === layer.id ? `${layer.border} bg-white/5 shadow-[0_0_30px_rgba(0,163,255,0.1)]` : "border-white/5 hover:border-white/20"}
                  `}
                  style={{
                    width: `${100 - i * 12}%`,
                    height: `${100 - i * 12}%`,
                    zIndex: layers.length - i
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {activeLayer === layer.id && (
                    <motion.div 
                      layoutId="active-ring"
                      className="absolute inset-0 rounded-full border-2 border-tamv-blue/50 animate-pulse"
                    />
                  )}
                  {i === layers.length - 1 && (
                    <div className="flex flex-col items-center gap-2">
                      <Hexagon className="w-10 h-10 text-tamv-blue animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-panel p-8 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      {React.createElement(layers.find(l => l.id === activeLayer)?.icon || Shield, { className: `w-8 h-8 ${layers.find(l => l.id === activeLayer)?.color}` })}
                    </div>
                    <div>
                      <h4 className="text-2xl font-serif">{layers.find(l => l.id === activeLayer)?.name}</h4>
                      <p className="text-sm text-white/40">{layers.find(l => l.id === activeLayer)?.desc}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: "Estado", value: "OPTIMAL", color: "text-tamv-teal" },
                      { label: "Salud", value: "100%", color: "text-white" },
                      { label: "Latencia", value: "0.8ms", color: "text-white" },
                      { label: "Cifrado", value: "AES-512-Q", color: "text-white" },
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="text-[10px] text-white/20 uppercase mb-1">{item.label}</div>
                        <div className={`text-sm font-mono ${item.color}`}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-tamv-blue/5 border border-tamv-blue/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-tamv-blue uppercase tracking-widest">Integridad de Capa</span>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Sincronizado</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-tamv-blue"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Interactive Infrastructure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowAnubisModal(true)}
            className="glass-panel p-8 bg-gradient-to-br from-tamv-blue/10 to-transparent border-tamv-blue/20 cursor-pointer group hover:border-tamv-blue/50 transition-all flex items-center gap-6"
          >
            <div className="p-5 rounded-2xl bg-tamv-blue/10 border border-tamv-blue/20 group-hover:bg-tamv-blue/20 transition-colors">
              <ShieldCheck className="w-8 h-8 text-tamv-blue" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-white uppercase tracking-widest">Anubis Sentinel™</h4>
                <div className={`w-2 h-2 rounded-full ${isMonitoringActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Guardia digital de 4 capas cifradas. Haz clic para gestionar el monitoreo y anomalías.
              </p>
            </div>
          </motion.div>
          
          <div className="glass-panel p-8 flex items-center gap-6">
            <div className="p-5 rounded-2xl bg-tamv-amber/10 border border-tamv-amber/20">
              <Lock className="w-8 h-8 text-tamv-amber" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-2">Horus Sentinel™</h4>
              <p className="text-xs text-white/50 leading-relaxed">
                Respuesta adaptativa de 8 capas. Aislamiento automático de amenazas en el MSR.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Feed & Resilience (Social Aspect) */}
      <div className="space-y-8">
        <div className="glass-panel p-6 h-[650px] flex flex-col border-t-4 border-tamv-blue">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-tamv-blue" />
              Security Feed
            </h3>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10">
            <AnimatePresence initial={false}>
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`p-4 rounded-2xl border bg-white/5 hover:bg-white/10 transition-all cursor-default group
                    ${event.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-500/5' : 
                      event.severity === 'HIGH' ? 'border-tamv-amber/30 bg-tamv-amber/5' : 
                      'border-white/5'}
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full
                      ${event.severity === 'CRITICAL' ? 'bg-red-500 text-white' : 
                        event.severity === 'HIGH' ? 'bg-tamv-amber text-tamv-dark' : 
                        'bg-tamv-blue/20 text-tamv-blue'}
                    `}>
                      {event.layer}
                    </span>
                    <span className="text-[8px] font-mono text-white/20">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-xs text-white/80 leading-relaxed">{event.message}</p>
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[8px] font-mono text-white/30 uppercase">Hash: {Math.random().toString(36).substring(7)}</span>
                    <button className="text-[8px] font-mono text-tamv-blue uppercase hover:underline">Detalles</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
              <span>Cifrado Activo</span>
              <span className="text-tamv-teal">Protegido</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-6 bg-gradient-to-br from-tamv-accent/10 to-transparent border-tamv-accent/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-tamv-accent/20">
              <Zap className="w-5 h-5 text-tamv-accent" />
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Resiliencia</h4>
          </div>
          <p className="text-xs text-white/50 leading-relaxed mb-6">
            El subsistema AZTEK GODS está en standby. Se activará si DEKATEOTL alcanza nivel de degradación 4.
          </p>
          <button className="w-full py-3 bg-tamv-accent/10 border border-tamv-accent/30 rounded-xl text-[10px] font-bold uppercase tracking-widest text-tamv-accent hover:bg-tamv-accent hover:text-tamv-dark transition-all">
            Simular Failover
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
