import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  Database, 
  BookOpen, 
  Cpu, 
  Archive, 
  Home, 
  Menu, 
  X,
  Lock,
  Zap,
  Globe,
  Fingerprint
} from "lucide-react";

interface QuantumLayoutProps {
  children: React.ReactNode;
}

import SystemStatus from "../SystemStatus";

export default function QuantumLayout({ children }: QuantumLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Compilación", path: "/compilacion", icon: Archive },
    { name: "ISABELLA AI", path: "/isabella", icon: Cpu },
    { name: "Economía", path: "/economy", icon: Zap },
    { name: "UTAMV", path: "/university", icon: BookOpen },
    { name: "DreamSpaces", path: "/dreamspaces", icon: Globe },
    { name: "Gobernanza", path: "/governance", icon: Lock },
    { name: "MSR", path: "/msr-blockchain", icon: Database },
  ];

  return (
    <div className="min-h-screen flex flex-col tamvtrix-gradient relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tamv-blue/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tamv-accent/10 blur-[120px] rounded-full" />
        
        {/* Matrix Rain Effect */}
        <div className="absolute inset-0 opacity-5 grid grid-cols-12 gap-4 p-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: [0, 1000], opacity: [0, 1, 0] }}
              transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
              className="text-[8px] font-mono text-tamv-accent break-all leading-none"
            >
              {Math.random().toString(36).substring(2, 15)}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel mx-4 mt-4 px-6 py-4 flex items-center justify-between border-b border-tamv-blue/20">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-tamv-blue/20 rounded-lg flex items-center justify-center border border-tamv-blue/30 group-hover:border-tamv-cyan transition-all shadow-[0_0_15px_rgba(0,163,255,0.2)]">
            <Cpu className="w-6 h-6 text-tamv-blue animate-pulse-soft" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-tamv-cyan transition-colors">TAMV ONLINE</span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-tamv-blue/70">MSR Civilizational Stack</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <SystemStatus />
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-tamv-cyan hover:translate-y-[-1px] ${
                  location.pathname === item.path ? "text-tamv-cyan" : "text-white/70"
                }`}
              >
                <item.icon className={`w-4 h-4 ${location.pathname === item.path ? "text-tamv-cyan" : "text-white/30"}`} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group cursor-pointer">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,163,255,0.3)]">
                <Fingerprint className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-tamv-dark rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-tamv-blue uppercase tracking-widest leading-none mb-1">ID-NVIDA</span>
              <span className="text-xs font-medium text-white/90">Soberano Activo</span>
            </div>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-tamv-dark/95 backdrop-blur-xl pt-24 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-4 text-2xl font-serif"
                >
                  <item.icon className="w-6 h-6 text-tamv-accent" />
                  {item.name}
                </Link>
              ))}
              <button className="mt-8 flex items-center justify-center gap-2 px-6 py-4 bg-tamv-accent text-tamv-dark rounded-xl font-bold uppercase tracking-wider">
                <Lock className="w-5 h-5" />
                Acceso Seguro
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 mt-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-tamv-accent" />
              <span className="font-serif text-lg font-bold">TAMV ONLINE</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Infraestructura digital soberana diseñada para la dignidad humana y la reclamación histórica de récords tecnológicos.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-tamv-accent">Protocolos</h4>
            <ul className="text-sm text-white/70 space-y-2">
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-tamv-accent" /> Protocolo Fénix</li>
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-tamv-accent" /> Protocolo Iniciación</li>
              <li className="flex items-center gap-2"><Zap className="w-3 h-3 text-tamv-accent" /> Protocolo Hoyo Negro</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-tamv-accent">Legal</h4>
            <p className="text-[10px] text-white/30 leading-relaxed font-mono">
              © 2026 TAMV ONLINE. Derechos reservados a nombre de Edwin Oswaldo Castillo Trejo. 
              Obra original protegida bajo la Doctrina TAMV y el blindaje jurídico-legal internacional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
