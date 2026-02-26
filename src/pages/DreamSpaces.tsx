import { motion } from "framer-motion";
import { 
  Globe, 
  Eye, 
  Users, 
  Zap, 
  Sparkles, 
  Play, 
  Layers,
  ChevronRight
} from "lucide-react";

export default function DreamSpaces() {
  const spaces = [
    {
      title: "Códice Maestro Hall",
      type: "Gobernanza",
      capacity: "500+",
      status: "LIVE",
      image: "https://picsum.photos/seed/hall/1920/1080"
    },
    {
      title: "Quantum Garden",
      type: "Meditación / IA",
      capacity: "50",
      status: "IDLE",
      image: "https://picsum.photos/seed/garden/1920/1080"
    },
    {
      title: "UTAMV Classroom XR",
      type: "Educación",
      capacity: "100",
      status: "LIVE",
      image: "https://picsum.photos/seed/class/1920/1080"
    },
    {
      title: "MSR Control Room",
      type: "Seguridad",
      capacity: "20",
      status: "RESTRICTED",
      image: "https://picsum.photos/seed/control/1920/1080"
    }
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Globe className="w-8 h-8" />
          <h1 className="text-4xl font-serif">DreamSpaces XR</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Metaversos multisensoriales y emocionales. Espacios inmersivos diseñados para la colaboración y la soberanía de datos.
        </p>
      </section>

      {/* Featured Space */}
      <section className="relative aspect-video rounded-3xl overflow-hidden glass-panel group border-2 border-tamv-blue/20 hover:border-tamv-blue transition-all duration-700">
        <img 
          src="https://picsum.photos/seed/vibrant/1920/1080" 
          alt="Featured Space"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-tamv-dark via-tamv-dark/20 to-transparent p-12 flex flex-col justify-end">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tamv-blue text-tamv-dark text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              Espacio Destacado
            </div>
            <h2 className="text-5xl font-serif">TAMVTRIX Core Experience</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Explora la capa visual y simbólica del ecosistema. Un espacio de gradientes dinámicos y partículas cuánticas que respira con el metaverso.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-tamv-dark rounded-full font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-tamv-blue transition-all">
                <Play className="w-5 h-5 fill-current" />
                Entrar Ahora
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-full font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
                Ver Detalles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Spaces */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif">Navegador de Espacios</h2>
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/5 rounded-lg border border-white/10 text-white/50 hover:text-tamv-blue transition-colors">
              <Layers className="w-5 h-5" />
            </button>
            <button className="text-sm text-tamv-blue hover:underline flex items-center gap-1">
              Ver Todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {spaces.map((space, i) => (
            <motion.div
              key={space.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel overflow-hidden group cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-tamv-dark/80 backdrop-blur-md rounded text-[8px] font-bold">
                  <div className={`w-1.5 h-1.5 rounded-full ${space.status === 'LIVE' ? 'bg-tamv-blue animate-pulse' : 'bg-white/20'}`} />
                  {space.status}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-[10px] font-mono uppercase tracking-widest text-tamv-blue">{space.type}</div>
                <h3 className="text-xl font-serif leading-tight group-hover:text-tamv-blue transition-colors">
                  {space.title}
                </h3>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {space.capacity}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Entrar
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
