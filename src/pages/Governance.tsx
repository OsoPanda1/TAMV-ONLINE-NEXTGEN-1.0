import { motion } from "framer-motion";
import { 
  Lock, 
  FileText, 
  Users, 
  ShieldCheck, 
  Scale, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  Gavel
} from "lucide-react";

export default function Governance() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Lock className="w-8 h-8" />
          <h1 className="text-4xl font-serif">Gobernanza Constitucional</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Códice Maestro DM-X4. Un sistema de leyes digitales ejecutables que garantizan la ética y la soberanía en cada rincón del ecosistema.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Constitution Viewer */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 md:p-12 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <FileText className="w-64 h-64 text-tamv-blue" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-serif">Códice Maestro v1.2</h2>
                <div className="px-3 py-1 bg-tamv-blue/20 border border-tamv-blue/30 rounded-full text-[10px] font-bold text-tamv-blue uppercase tracking-widest">
                  Vigente
                </div>
              </div>

              <div className="space-y-6">
                <Article 
                  number="01" 
                  title="Soberanía de Datos" 
                  content="Todo ciudadano de TAMV es el único dueño de su identidad cuántica y de los datos generados por su actividad civilizatoria."
                />
                <Article 
                  number="02" 
                  title="Ética de la Inteligencia" 
                  content="Ninguna IA podrá tomar decisiones que comprometan la dignidad humana o el libre albedrío sin supervisión de los Guardianes."
                />
                <Article 
                  number="03" 
                  title="Economía de Propósito" 
                  content="Los activos digitales deben estar respaldados por utilidad real y contribución verificable al ecosistema."
                />
              </div>

              <button className="w-full py-4 border border-white/10 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                Leer Constitución Completa <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h4 className="text-xl font-serif flex items-center gap-2">
                <Scale className="w-5 h-5 text-tamv-blue" />
                Cámaras de Decisión
              </h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Votación triple federada: Comunidad, Infraestructura e Instituciones co-diseñan las reglas del futuro.
              </p>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
              <h4 className="text-xl font-serif flex items-center gap-2">
                <Gavel className="w-5 h-5 text-tamv-blue" />
                Enforcement Automático
              </h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Las políticas se ejecutan a nivel de código mediante el Fusion Core, garantizando cumplimiento total.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar: Proposals & Guardians */}
        <div className="space-y-8">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-serif text-xl flex items-center gap-2">
              <Users className="w-5 h-5 text-tamv-blue" />
              Propuestas Activas
            </h3>
            <div className="space-y-4">
              <ProposalItem title="Upgrade Protocolo Fénix v2" votes="85%" status="APPROVED" />
              <ProposalItem title="Nuevas Tarifas Marketplace" votes="42%" status="VOTING" />
              <ProposalItem title="Integración Quantum Gateway" votes="12%" status="DRAFT" />
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6 border-l-4 border-tamv-blue">
            <h3 className="font-serif text-xl flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-tamv-blue" />
              Guardianes del Códice
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tamv-blue/20 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-tamv-blue" />
                </div>
                <div className="text-xs">
                  <div className="font-bold">Anubis Sentinel</div>
                  <div className="text-white/40">Nivel de Integridad: 100%</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-tamv-amber/20 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-tamv-amber" />
                </div>
                <div className="text-xs">
                  <div className="font-bold">ORUS Sentinel</div>
                  <div className="text-white/40">Revisión de Patrones Activa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Article({ number, title, content }: { number: string, title: string, content: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="text-xs font-mono text-tamv-blue">ART. {number}</span>
        <h4 className="text-lg font-serif">{title}</h4>
      </div>
      <p className="text-sm text-white/50 leading-relaxed pl-12">{content}</p>
    </div>
  );
}

function ProposalItem({ title, votes, status }: { title: string, votes: string, status: string }) {
  return (
    <div className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-white/80">{title}</span>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
          status === 'APPROVED' ? 'bg-tamv-blue/20 text-tamv-blue' : 
          status === 'VOTING' ? 'bg-tamv-cyan/20 text-tamv-cyan' : 'bg-white/10 text-white/40'
        }`}>
          {status}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden">
          <div className="bg-tamv-blue h-full" style={{ width: votes }} />
        </div>
        <span className="text-[10px] font-mono text-white/30">{votes}</span>
      </div>
    </div>
  );
}
