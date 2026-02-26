import { motion } from "framer-motion";
import { 
  BookOpen, 
  Search, 
  FileCheck, 
  Layers, 
  Award,
  ExternalLink,
  ChevronRight,
  Database
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
          Metodología de validación civilizatoria. Transformando la innovación en evidencia inmutable y conocimiento compartido.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Steps */}
        <div className="lg:col-span-1 space-y-4">
          {[
            { step: "01", title: "Definición del Claim", desc: "¿Qué paradigma se rompe?" },
            { step: "02", title: "Búsqueda Sistemática", desc: "Patentes, papers y estándares." },
            { step: "03", title: "Selección y Síntesis", desc: "Matriz de calidad y riesgo." },
            { step: "04", title: "Generación de Artefactos", desc: "PrismaRecord y BookPI." },
          ].map((item, i) => (
            <div key={item.step} className="p-4 border border-white/10 rounded-xl hover:border-tamv-blue transition-all group cursor-pointer">
              <span className="text-[10px] font-mono text-tamv-blue mb-1 block">{item.step}</span>
              <h4 className="font-serif text-lg mb-1 group-hover:text-tamv-blue transition-colors">{item.title}</h4>
              <p className="text-xs text-white/40">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-8">
          <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Layers className="w-64 h-64 text-tamv-blue" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif">Muro de Reconocimientos</h2>
                <p className="text-white/60 leading-relaxed">
                  Interfaz tipo museo donde cada logro se muestra como un "cuadro" documentado, 
                  listo para el escrutinio de cualquier tribunal técnico o académico honesto.
                </p>
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
