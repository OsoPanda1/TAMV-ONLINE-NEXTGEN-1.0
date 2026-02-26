import { motion } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Award, 
  Play, 
  Clock, 
  ChevronRight,
  Brain
} from "lucide-react";

export default function UTAMV() {
  const courses = [
    {
      title: "Ingeniería Civilizatoria MD-X4",
      instructor: "Anubis Villaseñor",
      duration: "40h",
      students: "1,240",
      level: "Avanzado",
      image: "https://picsum.photos/seed/tech/800/400"
    },
    {
      title: "Ética Operativa Constitucional",
      instructor: "Edwin O. Castillo",
      duration: "25h",
      students: "3,150",
      level: "Fundamental",
      image: "https://picsum.photos/seed/ethics/800/400"
    },
    {
      title: "Desarrollo en MSR Blockchain",
      instructor: "TAMV Core Team",
      duration: "35h",
      students: "890",
      level: "Intermedio",
      image: "https://picsum.photos/seed/code/800/400"
    }
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-4xl font-serif">UTAMV Universidad</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Laboratorio de aprendizaje aplicado. Formando a los arquitectos de la nueva era digital soberana.
        </p>
      </section>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<Users className="w-5 h-5" />} label="Estudiantes" value="5,280" />
        <StatCard icon={<BookOpen className="w-5 h-5" />} label="Cursos Activos" value="42" />
        <StatCard icon={<Award className="w-5 h-5" />} label="Certificados" value="1,120" />
        <StatCard icon={<Brain className="w-5 h-5" />} label="Mentores IA" value="12" />
      </div>

      {/* Featured Courses */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-serif">Trayectorias de Aprendizaje</h2>
          <button className="text-sm text-tamv-blue hover:underline flex items-center gap-1">
            Ver Catálogo Completo <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-tamv-dark/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-tamv-blue text-tamv-dark rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-2 py-1 bg-tamv-blue text-tamv-dark text-[10px] font-bold rounded">
                  {course.level}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-serif leading-tight group-hover:text-tamv-blue transition-colors">
                  {course.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <span className="font-medium text-white/60">{course.instructor}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] font-mono uppercase tracking-widest text-white/30">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {course.students}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mentor Section */}
      <section className="glass-panel p-12 bg-gradient-to-r from-tamv-blue/20 to-transparent">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tamv-blue/10 border border-tamv-blue/20 text-tamv-blue text-[10px] font-mono uppercase tracking-widest">
            <Brain className="w-3 h-3" />
            Isabella Tutor Agent
          </div>
          <h2 className="text-4xl font-serif">Aprendizaje Asistido por IA</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Cada estudiante cuenta con un tutor Isabella personalizado que adapta el contenido a su ritmo, 
            estilo de aprendizaje y estado civilizatorio actual.
          </p>
          <button className="px-8 py-4 bg-white text-tamv-dark rounded-full font-bold uppercase tracking-wider hover:bg-tamv-blue transition-all">
            Iniciar Mentoría
          </button>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-panel p-6 border-l-2 border-tamv-blue flex items-center gap-4">
      <div className="p-3 bg-tamv-blue/10 rounded-xl text-tamv-blue">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-serif font-bold">{value}</div>
        <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{label}</div>
      </div>
    </div>
  );
}
