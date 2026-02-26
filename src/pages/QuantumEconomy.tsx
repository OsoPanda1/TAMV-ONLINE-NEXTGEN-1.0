import { motion } from "framer-motion";
import { 
  Zap, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShoppingBag,
  Award,
  BarChart3
} from "lucide-react";

export default function QuantumEconomy() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Zap className="w-8 h-8" />
          <h1 className="text-4xl font-serif">Economía QuantumSeeds</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Energía creativa y computacional. Una economía de propósito basada en el impacto, no en la especulación.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet Card */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-8 bg-gradient-to-br from-tamv-blue/10 to-transparent border-t-2 border-tamv-blue relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">NubiWallet v4.0</span>
                <div className="px-2 py-1 bg-tamv-blue/20 rounded text-[8px] font-bold text-tamv-blue">PREMIUM</div>
              </div>

              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono mb-1">Saldo Disponible</div>
                <div className="text-5xl font-serif font-bold text-white flex items-center gap-3">
                  12,450
                  <span className="text-xl text-tamv-blue">QS</span>
                </div>
                <div className="text-xs text-tamv-blue mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5% este ciclo
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 bg-white text-tamv-dark rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-tamv-blue transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                  Enviar
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white/10 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
                  <ArrowDownLeft className="w-4 h-4" />
                  Recibir
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats & Charts */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-serif text-xl flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-tamv-blue" />
              Impacto Civilizatorio
            </h3>
            <div className="space-y-4">
              <StatRow label="Contribución Social" value="85%" color="bg-tamv-blue" />
              <StatRow label="Progreso Académico" value="62%" color="bg-tamv-teal" />
              <StatRow label="Gobernanza Activa" value="45%" color="bg-tamv-amber" />
            </div>
          </div>

          <div className="glass-panel p-6 space-y-6">
            <h3 className="font-serif text-xl flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-tamv-blue" />
              Marketplace TCEP
            </h3>
            <div className="space-y-3">
              <MarketItem name="Membresía Enterprise" price="5,000 QS" />
              <MarketItem name="DreamSpace Personal" price="1,200 QS" />
              <MarketItem name="Certificación UTAMV" price="800 QS" />
            </div>
          </div>
        </div>
      </div>

      {/* Economic Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">QuantumSeeds</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Unidades de energía creativa generadas por el aporte real al ecosistema: estudio, código, arte y gobernanza.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">TCEP</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Tokens de Compromiso Ético y Productivo. Representan la reputación y el peso de voto dentro de la federación.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">Anti-Especulación</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Algoritmos que regulan el flujo de activos para asegurar que el valor siempre esté respaldado por utilidad civilizatoria.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatRow({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
        <span className="text-white/40">{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: value }}
          className={`${color} h-full`}
        />
      </div>
    </div>
  );
}

function MarketItem({ name, price }: { name: string, price: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
      <span className="text-xs text-white/70">{name}</span>
      <span className="text-xs font-bold text-tamv-blue">{price}</span>
    </div>
  );
}
