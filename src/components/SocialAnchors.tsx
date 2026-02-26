import * as React from "react";
import { motion } from "framer-motion";
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook,
  ExternalLink,
  MessageCircle,
  Share2
} from "lucide-react";

interface SocialAnchorProps {
  platform: string;
  url: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const anchors: SocialAnchorProps[] = [
  { platform: "X", url: "https://x.com/tamv_online", label: "@tamv_online", icon: <Twitter className="w-4 h-4" />, color: "hover:text-blue-400" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/tamv", label: "TAMV Civilizational Stack", icon: <Linkedin className="w-4 h-4" />, color: "hover:text-blue-600" },
  { platform: "YouTube", url: "https://youtube.com/@tamv_online", label: "TAMV Official", icon: <Youtube className="w-4 h-4" />, color: "hover:text-red-500" },
  { platform: "Instagram", url: "https://instagram.com/tamv_online", label: "tamv_online", icon: <Instagram className="w-4 h-4" />, color: "hover:text-pink-500" },
];

export default function SocialAnchors() {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 px-2">Anclajes Sociales de Isabella</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {anchors.map((anchor) => (
          <motion.a
            key={anchor.platform}
            href={anchor.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            className={`flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl transition-all group ${anchor.color}`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                {anchor.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">{anchor.platform}</span>
                <span className="text-xs font-medium">{anchor.label}</span>
              </div>
            </div>
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </div>
      
      <div className="p-4 bg-tamv-blue/5 border border-tamv-blue/20 rounded-xl">
        <div className="flex items-center gap-3 mb-2">
          <MessageCircle className="w-4 h-4 text-tamv-blue" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-tamv-blue">Interacción Activa</span>
        </div>
        <p className="text-[10px] text-white/50 leading-relaxed">
          Isabella AI™ monitorea estos perfiles para invitar a nuevos soberanos. Cada interacción es validada por el Protocolo de Integridad.
        </p>
      </div>
    </div>
  );
}
