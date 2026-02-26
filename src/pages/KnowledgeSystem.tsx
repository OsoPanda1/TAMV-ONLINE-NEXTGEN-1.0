import * as React from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  FileCheck, 
  Layers, 
  Award,
  ExternalLink,
  ChevronRight,
  Database,
  Shield,
  Cpu,
  Terminal,
  FileText
} from "lucide-react";

export default function KnowledgeSystem() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <BookOpen className="w-8 h-8" />
          <h1 className="text-4xl font-serif">PRISMA Knowledge System</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Metodología de validación civilizatoria. Transformando la innovación en evidencia inmutable y conocimiento compartido bajo el **Master Canon v0.1**.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Steps & Master Canon */}
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 bg-tamv-blue/5 border border-tamv-blue/20 rounded-2xl">
            <h3 className="text-xs font-mono uppercase tracking-widest text-tamv-blue mb-4 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Master Canon v0.1
            </h3>
            <p className="text-[10px] text-white/50 leading-relaxed mb-4">
              Documento operativo canónico vinculante para agentes OpenClaw. Define alcance, límites y módulos operativos A–J.
            </p>
            <button className="w-full py-2 bg-tamv-blue/10 border border-tamv-blue/30 rounded-lg text-[10px] font-bold uppercase tracking-widest text-tamv-blue hover:bg-tamv-blue hover:text-tamv-dark transition-all flex items-center justify-center gap-2">
              <FileText className="w-3 h-3" />
              Ver Canon Completo
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/30 px-2">Módulos Operativos A–J</h4>
            {[
              { step: "A-C", title: "Ingestión y Cartografía", desc: "Mapeo de claims y literatura." },
              { step: "D-F", title: "Validación Cruzada", desc: "Contraste con estándares globales." },
              { step: "G-I", title: "Generación de Artefactos", desc: "Producción de BookPI y PrismaRecord." },
              { step: "J", title: "Sellado Criptográfico", desc: "Snapshot final y hash SHA-256." },
            ].map((item, i) => (
              <div key={item.step} className="p-4 border border-white/10 rounded-xl hover:border-tamv-blue transition-all group cursor-pointer">
                <span className="text-[10px] font-mono text-tamv-blue mb-1 block">{item.step}</span>
                <h4 className="font-serif text-lg mb-1 group-hover:text-tamv-blue transition-colors">{item.title}</h4>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="w-64 h-64 text-tamv-blue" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4">
                  <h2 className="text-3xl font-serif">Muro de Reconocimientos</h2>
                  <p className="text-white/60 leading-relaxed max-w-xl">
                    Interfaz tipo museo donde cada logro se muestra como un "cuadro" documentado bajo la métrica de **Ciclos Cognitivos de IA**.
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center min-w-[160px]">
                  <div className="text-2xl font-bold font-mono text-tamv-blue">220</div>
                  <div className="text-[8px] font-mono uppercase tracking-widest text-white/30">Ciclos IA Consumidos</div>
                  <div className="mt-2 text-[10px] text-tamv-teal font-mono">V0.1 COMPLETADA</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecognitionCard 
                  title="Arquitectura MSR"
                  category="Blockchain / Ética"
                  status="VALIDADO"
                  evidence="14 Fuentes"
                />
                <RecognitionCard 
                  title="DreamSpaces XR"
                  category="UI / Inmersión"
                  status="EN REVISIÓN"
                  evidence="8 Fuentes"
                />
                <RecognitionCard 
                  title="Anubis Sentinel"
                  category="Seguridad / IA"
                  status="VALIDADO"
                  evidence="22 Fuentes"
                />
                <RecognitionCard 
                  title="Trinidad Federada"
                  category="Gobernanza"
                  status="VALIDADO"
                  evidence="5 Fuentes"
                />
              </div>
            </div>
          </div>

          {/* OpenClaw Agent Status */}
          <div className="glass-panel p-6 border-l-4 border-tamv-blue flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-tamv-blue/10">
                <Terminal className="w-6 h-6 text-tamv-blue" />
              </div>
              <div>
                <h4 className="font-bold">Agente OpenClaw Activo</h4>
                <p className="text-xs text-white/40">Rol: Compilador y Cartógrafo Documental</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">Sincronizado con Master Canon</span>
            </div>
          </div>

          {/* Real-Time MSR Feed */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl flex items-center gap-2">
                <Database className="w-5 h-5 text-tamv-blue" />
                MSR Live Feed (Master Sovereign Record)
              </h3>
              <span className="text-[10px] font-mono text-white/30 uppercase">API: /api/msr</span>
            </div>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <MSRFeed />
            </div>
          </div>

          {/* Artifacts Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArtifactItem title="PrismaRecord" icon={<FileCheck className="w-5 h-5" />} />
            <ArtifactItem title="EvidenceSource" icon={<Search className="w-5 h-5" />} />
            <ArtifactItem title="BookPI" icon={<Award className="w-5 h-5" />} />
          </div>
        </div>
      </div>
    </div>
  );
}

function MSRFeed() {
  const [records, setRecords] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchRecords = React.useCallback(async () => {
    try {
      const response = await fetch("/api/msr");
      if (response.ok) {
        const data = await response.json();
        setRecords([...data].reverse()); // Show newest first
      }
    } catch (e) {
      console.error("Failed to fetch MSR records:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchRecords();
    const interval = setInterval(fetchRecords, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [fetchRecords]);

  if (isLoading) {
    return <div className="text-center py-8 text-white/20 font-mono text-xs uppercase animate-pulse">Sincronizando con Ledger...</div>;
  }

  if (records.length === 0) {
    return <div className="text-center py-8 text-white/20 font-mono text-xs uppercase">No hay registros en el Ledger Soberano.</div>;
  }

  return (
    <div className="space-y-3">
      {records.map((record) => (
        <div key={record.id} className="p-3 bg-white/5 border border-white/5 rounded-lg font-mono text-[10px] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-tamv-blue">[{record.type}]</span>
            <span className="text-white/20">{new Date(record.timestamp).toLocaleTimeString()}</span>
          </div>
          <div className="text-white/60 truncate">ID: {record.id}</div>
          <div className="text-white/40 italic">"{record.input?.substring(0, 50)}..."</div>
          <div className="flex gap-2">
            {record.agents?.map((agent: string) => (
              <span key={agent} className="bg-tamv-blue/10 text-tamv-blue px-1 rounded-[2px]">{agent}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecognitionCard({ title, category, status, evidence }: { title: string, category: string, status: string, evidence: string }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-mono uppercase tracking-widest text-tamv-blue">{category}</span>
        <div className={`px-2 py-0.5 rounded text-[8px] font-bold ${status === 'VALIDADO' ? 'bg-tamv-blue/20 text-tamv-blue' : 'bg-tamv-amber/20 text-tamv-amber'}`}>
          {status}
        </div>
      </div>
      <h4 className="text-xl font-serif mb-4 group-hover:translate-x-1 transition-transform">{title}</h4>
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-[10px] text-white/40 font-mono">{evidence}</span>
        <button className="text-xs text-tamv-blue flex items-center gap-1 hover:underline">
          Ver BookPI <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function ArtifactItem({ title, icon }: { title: string, icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-tamv-blue transition-all cursor-pointer">
      <div className="text-tamv-blue">{icon}</div>
      <span className="font-mono text-sm">{title}</span>
    </div>
  );
}
