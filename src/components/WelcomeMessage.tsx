import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldCheck } from "lucide-react";

export default function WelcomeMessage() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[100] max-w-sm"
        >
          <div className="glass-panel p-6 border-l-4 border-tamv-accent shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-tamv-accent/10 rounded-lg text-tamv-accent">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-serif text-lg leading-none">Acceso Autorizado</h4>
                <p className="text-xs text-white/50 leading-relaxed">
                  Bienvenido al Ecosistema TAMV ONLINE. La Trinidad Federada ha validado su sesión. 
                  Protocolo Iniciación completado.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-tamv-accent">
                  <Terminal className="w-3 h-3" />
                  <span>SECURE_CHANNEL_ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
