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
  Globe
} from "lucide-react";
import { securityEngine } from "../services/security/engine";
import { SecurityLayer, SecurityStatus, SecurityEvent } from "../services/security/types";

export default function SecurityDashboard() {
  const [status, setStatus] = React.useState<SecurityStatus>(securityEngine.getStatus());
  const [events, setEvents] = React.useState<SecurityEvent[]>(securityEngine.getRecentEvents());
  const [activeLayer, setActiveLayer] = React.useState<SecurityLayer>(SecurityLayer.TENOCHTITLAN);

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-6 border-l-4 border-tamv-blue">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-tamv-blue" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Nivel de Amenaza</span>
          </div>
          <div className="text-3xl font-bold font-mono">{status.globalThreatLevel.toFixed(1)}%</div>
          <div className="w-full bg-white/5 h-1 mt-4 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-tamv-blue"
              animate={{ width: `${status.globalThreatLevel}%` }}
            />
          </div>
        </div>

        <div className="glass-panel p-6 border-l-4 border-tamv-cyan">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-tamv-cyan" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Honeypots Activos</span>
          </div>
          <div className="text-3xl font-bold font-mono">{status.activeHoneypots}</div>
          <p className="text-[10px] text-tamv-cyan/60 font-mono mt-2 uppercase tracking-tighter">Trampas Tenochtitlan Desplegadas</p>
        </div>

        <div className="glass-panel p-6 border-l-4 border-tamv-teal">
          <div className="flex items-center gap-3 mb-2">
            <Cpu className="w-5 h-5 text-tamv-teal" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Orquestador</span>
          </div>
          <div className="text-3xl font-bold font-mono">{status.orchestrator.current}</div>
          <p className="text-[10px] text-tamv-teal/60 font-mono mt-2 uppercase tracking-tighter">Nivel {status.orchestrator.level} Operativo</p>
        </div>

        <div className="glass-panel p-6 border-l-4 border-tamv-amber">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-tamv-amber" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Estado Horus</span>
          </div>
          <div className="text-3xl font-bold font-mono uppercase">Vigilante</div>
          <p className="text-[10px] text-tamv-amber/60 font-mono mt-2 uppercase tracking-tighter">Respuesta Adaptativa Activa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Layer Navigation & Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Escudo Civilizatorio en Capas
            </h3>
            
            <div className="relative h-[400px] flex items-center justify-center">
              {/* Concentric Rings Visualization */}
              {layers.map((layer, i) => (
                <motion.div
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`absolute rounded-full border-2 cursor-pointer transition-all duration-500 flex items-center justify-center
                    ${activeLayer === layer.id ? `${layer.border} bg-white/5` : "border-white/5 hover:border-white/20"}
                  `}
                  style={{
                    width: `${100 - i * 12}%`,
                    height: `${100 - i * 12}%`,
                    zIndex: layers.length - i
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-tamv-dark text-[8px] font-mono uppercase tracking-widest
                    ${activeLayer === layer.id ? layer.color : "text-white/20"}
                  `}>
                    {layer.name}
                  </div>
                  {i === layers.length - 1 && (
                    <div className="flex flex-col items-center gap-2">
                      <Hexagon className="w-8 h-8 text-tamv-blue animate-pulse" />
                      <span className="text-[8px] font-mono uppercase text-white/40">TAMV CORE</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Active Layer Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10`}>
                    {React.createElement(layers.find(l => l.id === activeLayer)?.icon || Shield, { className: `w-6 h-6 ${layers.find(l => l.id === activeLayer)?.color}` })}
                  </div>
                  <div>
                    <h4 className="text-lg font-serif">{layers.find(l => l.id === activeLayer)?.name}</h4>
                    <p className="text-xs text-white/50">{layers.find(l => l.id === activeLayer)?.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-tamv-dark/50 rounded-lg border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase mb-1">Estado</div>
                    <div className="text-xs font-mono text-tamv-teal">OPTIMAL</div>
                  </div>
                  <div className="p-3 bg-tamv-dark/50 rounded-lg border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase mb-1">Salud</div>
                    <div className="text-xs font-mono">100%</div>
                  </div>
                  <div className="p-3 bg-tamv-dark/50 rounded-lg border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase mb-1">Latencia</div>
                    <div className="text-xs font-mono">0.8ms</div>
                  </div>
                  <div className="p-3 bg-tamv-dark/50 rounded-lg border border-white/5">
                    <div className="text-[8px] text-white/30 uppercase mb-1">Cifrado</div>
                    <div className="text-xs font-mono">AES-512-Q</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Real-time Event Log */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 h-[600px] flex flex-col">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white/60 mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              MSR Security Stream
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
              <AnimatePresence initial={false}>
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-3 rounded-lg border bg-white/5 transition-colors
                      ${event.severity === 'CRITICAL' ? 'border-red-500/30 bg-red-500/5' : 
                        event.severity === 'HIGH' ? 'border-tamv-amber/30 bg-tamv-amber/5' : 
                        'border-white/5'}
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded
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
                    <p className="text-[10px] text-white/80 leading-relaxed">{event.message}</p>
                    <div className="mt-2 flex items-center gap-2 text-[8px] font-mono text-white/30 uppercase">
                      <ChevronRight className="w-2 h-2" />
                      MSR_HASH: {Math.random().toString(36).substring(7)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
                <span>Estado de Red: Cifrado</span>
                <span className="text-tamv-teal">Protección Activa</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 bg-tamv-blue/5 border-tamv-blue/20">
            <h4 className="text-xs font-bold mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-tamv-blue" />
              Resiliencia Automática
            </h4>
            <p className="text-[10px] text-white/50 leading-relaxed mb-4">
              El subsistema AZTEK GODS está en modo pasivo (Standby). Se activará automáticamente si DEKATEOTL alcanza el nivel de degradación 4.
            </p>
            <button className="w-full py-2 bg-tamv-blue/10 border border-tamv-blue/30 rounded-lg text-[10px] font-bold uppercase tracking-widest text-tamv-blue hover:bg-tamv-blue hover:text-tamv-dark transition-all">
              Simular Failover
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
