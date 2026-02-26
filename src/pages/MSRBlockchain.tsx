import { motion } from "framer-motion";
import { 
  Database, 
  ShieldCheck, 
  Activity, 
  History, 
  Lock, 
  Search,
  AlertTriangle,
  Zap
} from "lucide-react";

export default function MSRBlockchain() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Database className="w-8 h-8" />
          <h1 className="text-4xl font-serif">MSR Blockchain Ledger</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Monitoreo, Seguridad y Respaldo. El registro inmutable de la verdad histórica civilizatoria.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Real-time Monitor */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-tamv-blue flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Live Transaction Stream
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tamv-teal animate-pulse" />
              <span className="text-[10px] font-mono text-tamv-teal uppercase">Network_Online</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { id: "0x8f2...3a1", type: "SOCIAL_EVENT", status: "SYNCED", time: "12:45:01", domain: "T-Social" },
              { id: "0x4c1...9e2", type: "LEARN_EVENT", status: "VALIDATING", time: "12:44:58", domain: "T-Learn" },
              { id: "0x1a9...7b4", type: "ECON_TX", status: "SYNCED", time: "12:44:50", domain: "T-Economy" },
              { id: "0x5d3...2c8", type: "GOV_DECISION", status: "SYNCED", time: "12:44:42", domain: "T-Gov" },
            ].map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-tamv-blue/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-tamv-blue/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-tamv-blue" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-white">{tx.id}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-tighter flex items-center gap-2">
                      {tx.type}
                      <span className="text-tamv-blue">[{tx.domain}]</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-[10px] font-bold ${tx.status === 'SYNCED' ? 'text-tamv-teal' : 'text-tamv-amber'}`}>{tx.status}</div>
                  <div className="text-[10px] text-white/20 font-mono">{tx.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocols Info */}
        <div className="space-y-6">
          <ProtocolCard 
            title="Protocolo Iniciación"
            description="Admisión rigurosa de nodos y usuarios bajo la Doctrina TAMV. Verificación de identidad y origen."
            icon={<Lock className="w-6 h-6 text-tamv-blue" />}
          />
          <ProtocolCard 
            title="Protocolo Fénix"
            description="Reconstrucción automática tras incidentes graves. Failover hacia infraestructura alternativa soberana."
            icon={<Zap className="w-6 h-6 text-tamv-amber" />}
          />
          <ProtocolCard 
            title="Protocolo Hoyo Negro"
            description="Cuarentena lógica para identidades hostiles. Aislamiento forense y marcaje de bloques ilícitos."
            icon={<AlertTriangle className="w-6 h-6 text-tamv-red" />}
          />
        </div>
      </div>

      {/* MSR Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <h4 className="text-xl font-serif text-tamv-blue">Monitoreo</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Cada transacción genera telemetría estructurada y "tamvcrums" que registran contexto total de UI y dispositivo.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <h4 className="text-xl font-serif text-tamv-blue">Seguridad</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Cifrado híbrido clásico-cuántico y firma "ADN TAMV" que vincula bloques con políticas de guardianía activa.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <h4 className="text-xl font-serif text-tamv-blue">Respaldo</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Capacidad de recuperación de activos frente a fraude sin borrar el historial, sustentado en evidencia replicable.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProtocolCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="glass-panel p-6 flex gap-4 items-start hover:bg-white/5 transition-all">
      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-serif mb-1">{title}</h4>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
