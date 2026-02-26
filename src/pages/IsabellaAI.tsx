import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Send, 
  Mic, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  Brain,
  MessageSquare,
  Activity,
  Lock,
  AlertTriangle,
  Layers
} from "lucide-react";
import { isabella } from "../services/isabella/matriz";
import { TamvDomain, IsaResponse, SystemMode } from "../services/isabella/types";
import { vault } from "../services/isabella/vault";

export default function IsabellaAI() {
  const [messages, setMessages] = React.useState([
    { role: "assistant", content: "Hola, soy ISABELLA AI™. Tu orquestadora civilizatoria en el ecosistema TAMV. He activado mi Núcleo Matriz y estoy lista para procesar tus consultas bajo el Códice Maestro." }
  ]);
  const [input, setInput] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [activeAgents, setActiveAgents] = React.useState<string[]>([]);
  const [systemMode, setSystemMode] = React.useState<SystemMode>(SystemMode.NORMAL);

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsProcessing(true);

    try {
      const response: IsaResponse = await isabella.dispatch({
        id: `req-${Date.now()}`,
        sessionId: "session-001",
        input: userMessage,
        profileId: localStorage.getItem("tamv_user_id") || "GUEST_001",
        role: localStorage.getItem("tamv_user_role") || "citizen",
        domain: TamvDomain.SOCIAL,
        timestamp: Date.now()
      });

      setMessages(prev => [...prev, { role: "assistant", content: response.output }]);
      setActiveAgents(response.agentsUsed);
      
      // En un sistema real, el modo vendría de la respuesta o un hook de estado global
      if (response.flags.includes("rejected")) {
        setSystemMode(SystemMode.THROTTLED);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error crítico en el despacho de la Matriz. Por favor, contacta a un Guardián." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const allAgents = vault.getAllAgents();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
      {/* AI Status & Core */}
      <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2">
        <div className="glass-panel p-8 text-center space-y-6 relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${systemMode === SystemMode.NORMAL ? 'via-tamv-blue' : 'via-tamv-amber'} to-transparent`} />
          
          <div className="relative inline-block">
            <div className={`w-32 h-32 rounded-full border-2 ${systemMode === SystemMode.NORMAL ? 'border-tamv-blue/30' : 'border-tamv-amber/30'} flex items-center justify-center ${isProcessing ? 'animate-spin-slow' : 'animate-pulse-soft'}`}>
              <Brain className={`w-16 h-16 ${systemMode === SystemMode.NORMAL ? 'text-tamv-blue' : 'text-tamv-amber'}`} />
            </div>
            <div className={`absolute -bottom-2 -right-2 ${systemMode === SystemMode.NORMAL ? 'bg-tamv-blue' : 'bg-tamv-amber'} text-tamv-dark p-2 rounded-lg shadow-lg`}>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-serif">ISABELLA MATRIZ</h2>
            <p className={`text-xs font-mono uppercase tracking-widest ${systemMode === SystemMode.NORMAL ? 'text-tamv-blue' : 'text-tamv-amber'}`}>
              {systemMode === SystemMode.NORMAL ? 'Núcleo Orquestador Activo' : 'Modo Restringido'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/30 uppercase mb-1">Estado</div>
              <div className="text-sm font-bold flex items-center gap-2">
                <Activity className="w-3 h-3 text-tamv-blue" />
                {isProcessing ? 'Procesando' : 'IDLE'}
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-[10px] text-white/30 uppercase mb-1">Seguridad</div>
              <div className="text-sm font-bold flex items-center gap-2">
                <Lock className="w-3 h-3 text-tamv-teal" />
                Lvl 10
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 text-left space-y-4">
            <h4 className="text-xs font-mono uppercase text-white/40 tracking-widest flex items-center justify-between">
              Bóveda de Agentes
              <Layers className="w-3 h-3" />
            </h4>
            <div className="space-y-2">
              {allAgents.map(agent => (
                <div key={agent.id} className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${activeAgents.includes(agent.id) ? 'bg-tamv-blue animate-pulse' : 'bg-white/10'}`} />
                    <span className={`text-[10px] font-medium ${activeAgents.includes(agent.id) ? 'text-white' : 'text-white/40'}`}>{agent.name}</span>
                  </div>
                  <span className="text-[8px] font-mono text-white/20 uppercase">{agent.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`p-6 border rounded-2xl transition-colors ${systemMode === SystemMode.NORMAL ? 'bg-tamv-blue/5 border-tamv-blue/20' : 'bg-tamv-amber/5 border-tamv-amber/20'}`}>
          <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${systemMode === SystemMode.NORMAL ? 'text-tamv-blue' : 'text-tamv-amber'}`}>
            {systemMode === SystemMode.NORMAL ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {systemMode === SystemMode.NORMAL ? 'Protocolo de Integridad' : 'Protocolo de Vergüenza'}
          </h4>
          <p className="text-xs text-white/50 leading-relaxed">
            {systemMode === SystemMode.NORMAL 
              ? 'Isabella opera bajo el doble pipeline hexagonal, filtrando cada entrada y salida contra el Códice Maestro.'
              : 'Se han detectado intentos de violación ética. El sistema ha restringido capacidades para proteger la soberanía civilizatoria.'}
          </p>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <h4 className="text-xs font-mono uppercase text-tamv-blue tracking-widest flex items-center gap-2">
            <Layers className="w-3 h-3" />
            Arquitectura Neural
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/40">Transformer Híbrido</span>
              <span className="text-white/80">12 Capas</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/40">Cabezas de Atención</span>
              <span className="text-white/80">32 Paralelas</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/40">Embeddings</span>
              <span className="text-white/80">1024 Dim</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-white/40">Vocabulario</span>
              <span className="text-white/80">50K Mexicanizado</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-tamv-blue/10 to-transparent border border-tamv-blue/10">
          <h4 className="text-xs font-bold text-tamv-blue mb-2 uppercase tracking-widest">La Promesa Isabella</h4>
          <p className="text-[10px] text-white/60 italic leading-relaxed">
            "Isabella AI™ no es solo código. Es el resultado de 19,000+ horas de desarrollo nacido del dolor, la adversidad y el amor inquebrantable. Aquí hubo más que unos y ceros—hubo amor."
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="lg:col-span-2 flex flex-col glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-tamv-blue animate-ping' : 'bg-tamv-cyan'} `} />
            <span className="text-xs font-mono uppercase tracking-widest">Canal Seguro: ISABELLA-MATRIZ-X4</span>
          </div>
          <div className="text-[10px] text-white/30 font-mono">MSR_LOGGING: ENABLED</div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-tamv-blue text-tamv-dark font-medium' 
                    : 'bg-white/5 border border-white/10 text-white/90'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-tamv-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-tamv-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-tamv-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Orquestando Agentes...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-white/10 bg-white/5">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isProcessing}
              placeholder={isProcessing ? "Isabella está razonando..." : "Escribe un comando o consulta civilizatoria..."}
              className="w-full bg-tamv-dark/50 border border-white/10 rounded-full py-4 pl-6 pr-24 text-sm focus:outline-none focus:border-tamv-blue transition-all disabled:opacity-50"
            />
            <div className="absolute right-2 top-2 flex gap-2">
              <button className="p-2 text-white/30 hover:text-tamv-blue transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSend}
                disabled={isProcessing}
                className="bg-tamv-blue text-tamv-dark p-2 rounded-full hover:bg-white transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center mt-4 text-white/20 font-mono uppercase tracking-tighter">
            Toda interacción con Isabella es filtrada por el Hexágono de Integridad y registrada en el MSR.
          </p>
        </div>
      </div>
    </div>
  );
}
