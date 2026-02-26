import React from "react";
import { motion } from "framer-motion";
import { Activity, Shield, Cpu, Database } from "lucide-react";

export default function SystemStatus() {
  const stats = [
    { label: "MSR Uptime", value: "99.99%", icon: Activity, color: "text-tamv-blue" },
    { label: "Federated Nodes", value: "42 Cells", icon: Cpu, color: "text-tamv-cyan" },
    { label: "Security Layer", value: "Active", icon: Shield, color: "text-tamv-teal" },
    { label: "Quantum Sync", value: "1.2ms", icon: Database, color: "text-tamv-amber" }
  ];

  return (
    <div className="flex items-center gap-6 px-4 py-2 bg-tamv-dark/50 backdrop-blur-md border border-white/5 rounded-full overflow-hidden">
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex items-center gap-2 group">
          <stat.icon className={`w-3 h-3 ${stat.color} animate-pulse`} />
          <div className="flex flex-col">
            <span className="text-[8px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors">
              {stat.label}
            </span>
            <span className="text-[10px] font-mono text-white/80">
              {stat.value}
            </span>
          </div>
          {i < stats.length - 1 && (
            <div className="w-px h-4 bg-white/10 ml-4" />
          )}
        </div>
      ))}
    </div>
  );
}
