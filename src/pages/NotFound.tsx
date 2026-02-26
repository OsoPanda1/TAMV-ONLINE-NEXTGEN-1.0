import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-8 bg-red-500/10 rounded-full border border-red-500/20"
      >
        <AlertTriangle className="w-16 h-16 text-red-500" />
      </motion.div>
      
      <div className="space-y-4">
        <h1 className="text-4xl font-serif">Protocolo Hoyo Negro Activado</h1>
        <p className="text-white/50 max-w-md mx-auto">
          La zona que intentas acceder no existe en este plano dimensional o ha sido puesta en cuarentena por seguridad.
        </p>
      </div>

      <Link 
        to="/" 
        className="flex items-center gap-2 px-8 py-4 bg-tamv-accent text-tamv-dark rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all"
      >
        <Home className="w-5 h-5" />
        Regresar al Origen
      </Link>
    </div>
  );
}
