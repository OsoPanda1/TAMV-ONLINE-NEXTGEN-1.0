import { motion } from "framer-motion";
import { 
  Archive, 
  FileText, 
  Code, 
  Music, 
  Video, 
  Shield, 
  ExternalLink,
  Clock,
  ChevronRight,
  Download
} from "lucide-react";

export default function Compilacion() {
  const categories = [
    {
      title: "Documentación Maestra",
      icon: <FileText className="w-6 h-6" />,
      items: [
        { name: "TAMV_MASTER_DOCUMENTATION.md", desc: "El núcleo filosófico y técnico del ecosistema." },
        { name: "TAMV_COMPLETE_DOCUMENTATION.md", desc: "Detalle exhaustivo de todos los módulos." },
        { name: "FINAL_PROJECT_REPORT.md", desc: "Reporte final de integración y despliegue." },
        { name: "PROJECT_ANALYSIS.md", desc: "Análisis de impacto y viabilidad técnica." }
      ]
    },
    {
      title: "Estructuras Técnicas (Zips)",
      icon: <Code className="w-6 h-6" />,
      items: [
        { name: "tamv-unified-os---xr-civilization.zip", desc: "Sistema operativo unificado para XR." },
        { name: "tamv-deep-dive-main.zip", desc: "Inmersión profunda en la arquitectura backend." },
        { name: "DimensionX-main.zip", desc: "Motor de renderizado y espacios dimensionales." },
        { name: "zipverse-meta-mundo-main.zip", desc: "Infraestructura de metaverso soberano." }
      ]
    },
    {
      title: "Activos Multimedia",
      icon: <Music className="w-6 h-6" />,
      items: [
        { name: "kugelsicher-by-tremoxbeatz.mp3", desc: "Banda sonora oficial - Resiliencia." },
        { name: "running-night.mp3", desc: "Ambiente para desarrollo nocturno." },
        { name: "deep-abstract-ambient.mp3", desc: "Paisaje sonoro para DreamSpaces." }
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Archive className="w-8 h-8" />
          <h1 className="text-4xl font-serif">Compilación: 6 Años de Vida</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Este archivo representa el esfuerzo ininterrumpido de 6 años de conceptualización, 
          diseño y blindaje jurídico. Es el testimonio de una vida dedicada a la soberanía digital.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-2 bg-tamv-blue/10 rounded-lg text-tamv-blue">
                {cat.icon}
              </div>
              <h2 className="text-xl font-serif">{cat.title}</h2>
            </div>

            <div className="space-y-4">
              {cat.items.map((item) => (
                <div 
                  key={item.name}
                  className="glass-panel p-4 hover:bg-white/5 transition-all group cursor-pointer border-l-2 border-transparent hover:border-tamv-blue"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm font-mono text-tamv-blue truncate max-w-[200px]">{item.name}</span>
                    <Download className="w-4 h-4 text-white/20 group-hover:text-tamv-blue transition-colors" />
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline/History Section */}
      <section className="glass-panel p-8 md:p-12 mt-12">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-tamv-blue" />
          <h2 className="text-3xl font-serif">Hitos del Ecosistema</h2>
        </div>

        <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
          <TimelineItem 
            year="2020-2021"
            title="Conceptualización y Doctrina"
            description="Nacimiento de la EOCT (Ética Operativa Constitucional TAMV) y los primeros borradores de la Trinidad Federada."
          />
          <TimelineItem 
            year="2022-2023"
            title="Arquitectura MSR y DreamSpaces"
            description="Desarrollo del motor de blockchain correctiva y los primeros entornos XR soberanos."
          />
          <TimelineItem 
            year="2024-2025"
            title="Blindaje Jurídico y PRISMA"
            description="Consolidación del BookPI y la metodología de validación de récords mundiales."
          />
          <TimelineItem 
            year="2026"
            title="Unificación y Despliegue"
            description="Integración de Genesis Digytamv Nexus y lanzamiento de la infraestructura civilizacional."
            active
          />
        </div>
      </section>
    </div>
  );
}

function TimelineItem({ year, title, description, active = false }: { year: string, title: string, description: string, active?: boolean }) {
  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-tamv-dark ${active ? 'bg-tamv-blue' : 'bg-white/20'}`} />
      <div className="space-y-1">
        <span className={`text-[10px] font-mono uppercase tracking-widest ${active ? 'text-tamv-blue' : 'text-white/40'}`}>{year}</span>
        <h4 className="text-lg font-serif">{title}</h4>
        <p className="text-sm text-white/50 max-w-2xl">{description}</p>
      </div>
    </div>
  );
}
