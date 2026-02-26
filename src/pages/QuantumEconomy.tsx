import { motion } from "framer-motion";
import { 
  Zap, 
  Wallet, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShoppingBag,
  Award,
  BarChart3,
  ShieldCheck,
  Scale,
  Ticket,
  Users,
  PieChart,
  FileText
} from "lucide-react";

export default function QuantumEconomy() {
  const membershipTiers = [
    { name: "Free", price: "$0", role: "Entrada", color: "border-white/10" },
    { name: "Pro", price: "$24.99", role: "Activo", color: "border-tamv-blue/30" },
    { name: "VIP", price: "$29.99", role: "Monetizador", color: "border-tamv-teal/30" },
    { name: "Elite", price: "$39.99", role: "Creador", color: "border-tamv-amber/30" },
    { name: "Celestial", price: "$49.99", role: "Nodo Premium", color: "border-tamv-accent/30" },
  ];

  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <div className="flex items-center gap-3 text-tamv-blue mb-2">
          <Zap className="w-8 h-8" />
          <h1 className="text-4xl font-serif">Módulo Económico TAMV</h1>
        </div>
        <p className="text-xl text-white/70 max-w-3xl font-light">
          Infraestructura económica civilizatoria. Basada en **valor real**, **acción consciente** y **economía honesta**.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Wallet & Currency */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-8 bg-gradient-to-br from-tamv-blue/10 to-transparent border-t-2 border-tamv-blue relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wallet className="w-32 h-32" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">NubiWallet v4.0</span>
                <div className="px-2 py-1 bg-tamv-blue/20 rounded text-[8px] font-bold text-tamv-blue">ID-NVIDA™ LINKED</div>
              </div>

              <div>
                <div className="text-[10px] text-white/40 uppercase font-mono mb-1">TAMV Créditos</div>
                <div className="text-5xl font-serif font-bold text-white flex items-center gap-3">
                  2,450
                  <span className="text-xl text-tamv-blue">TC</span>
                </div>
                <div className="text-[10px] text-white/30 mt-2 font-mono uppercase">
                  Valor: $490.00 USD
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 bg-white text-tamv-dark rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-tamv-blue transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                  Swap Out
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
                  <ArrowDownLeft className="w-4 h-4" />
                  Buy TC
                </button>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 border-l-4 border-tamv-blue">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Scale className="w-4 h-4 text-tamv-blue" />
              Conversión Oficial
            </h4>
            <div className="space-y-3 text-[10px] font-mono">
              <div className="flex justify-between">
                <span className="text-white/40">Compra</span>
                <span className="text-white">$0.20 USD / TC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Recompra</span>
                <span className="text-white">$0.15 USD / TC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/40">Margen Swap</span>
                <span className="text-tamv-blue">~25% BRUTO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Membership Tiers */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Membresías Civilizatorias</h3>
            <span className="text-[10px] font-mono text-white/30 uppercase">Ingreso Recurrente Base</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {membershipTiers.map((tier) => (
              <div key={tier.name} className={`p-4 border ${tier.color} rounded-2xl bg-white/5 hover:bg-white/10 transition-all flex flex-col items-center text-center`}>
                <span className="text-[10px] font-mono uppercase text-white/40 mb-2">{tier.role}</span>
                <h4 className="text-lg font-serif mb-1">{tier.name}</h4>
                <div className="text-xl font-bold text-tamv-blue mb-4">{tier.price}</div>
                <button className="mt-auto w-full py-2 bg-white/5 border border-white/10 rounded-lg text-[8px] font-bold uppercase tracking-widest hover:bg-tamv-blue hover:text-tamv-dark transition-all">
                  Upgrade
                </button>
              </div>
            ))}
          </div>

          {/* Fair Split & Lottery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-tamv-blue" />
                  Fair Split Engine™
                </h3>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                <StatRow label="Creador (User)" value="50%" color="bg-tamv-blue" />
                <StatRow label="Infraestructura" value="25%" color="bg-tamv-teal" />
                <StatRow label="Fondo Civilizatorio" value="15%" color="bg-tamv-amber" />
                <StatRow label="Seguridad & MSR" value="10%" color="bg-tamv-accent" />
              </div>
              <p className="text-[10px] text-white/40 font-mono leading-relaxed">
                Algoritmo determinístico de reparto multi-actor. Auditable en tiempo real.
              </p>
            </div>

            <div className="glass-panel p-6 space-y-6 bg-gradient-to-br from-tamv-amber/10 to-transparent border-tamv-amber/20">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-tamv-amber" />
                  Lotería TAMV
                </h3>
                <span className="text-[10px] font-mono text-tamv-amber">ACTIVA</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-white/40 uppercase font-mono">Bote Acumulado</div>
                    <div className="text-3xl font-serif font-bold text-tamv-amber">$1,240,500</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-white/40 uppercase font-mono">Ticket</div>
                    <div className="text-xl font-bold text-white">$2.00</div>
                  </div>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[10px] font-mono text-white/60">
                  Reparto: 92% Premios | 8% Infraestructura
                </div>
                <button className="w-full py-3 bg-tamv-amber text-tamv-dark rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
                  Comprar Boleto
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Principles */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">No-Explotación</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            El usuario no es el producto. No vendemos datos ni permitimos publicidad invasiva. Monetizamos por valor real entregado.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <Scale className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">Transparencia Radical</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            Cada flujo económico es visible y auditable. El usuario sabe exactamente qué paga y cómo se reparte cada centavo.
          </p>
        </div>
        <div className="p-8 border border-white/10 rounded-2xl space-y-4 hover:border-tamv-blue transition-all">
          <div className="w-12 h-12 bg-tamv-blue/10 rounded-xl flex items-center justify-center text-tamv-blue">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-serif">Economía Accional</h4>
          <p className="text-sm text-white/50 leading-relaxed">
            El activo base es la acción consciente y la creación. Cada interacción con intención genera valor dentro del ecosistema.
          </p>
        </div>
      </section>

      {/* Documentation Link */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-tamv-blue hover:border-tamv-blue transition-all">
          <FileText className="w-4 h-4" />
          Consultar Especificación Técnica Blindada v0.1
        </button>
      </div>
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
