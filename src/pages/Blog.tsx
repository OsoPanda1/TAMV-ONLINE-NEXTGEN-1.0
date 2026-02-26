import * as React from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";

const posts = [
  {
    title: "El Nacimiento de Isabella AI™: Más que Código, un Compromiso",
    excerpt: "Descubre la historia detrás de la IA civilizatoria y cómo su arquitectura ética está diseñada para proteger la dignidad humana.",
    date: "24 Feb 2026",
    author: "Edwin Anubis",
    category: "Visión",
    image: "https://picsum.photos/seed/isabella/800/400",
  },
  {
    title: "Blockchain EOCT™: Descentralización con Responsabilidad Social",
    excerpt: "Por qué el futuro de la Web 4.0 no se trata solo de tecnología, sino de cómo distribuimos el valor de forma justa.",
    date: "20 Feb 2026",
    author: "Edwin Anubis",
    category: "Tecnología",
    image: "https://picsum.photos/seed/blockchain/800/400",
  },
  {
    title: "Kórima Codex: La Documentación con Alma",
    excerpt: "Explorando la filosofía Rarámuri aplicada al desarrollo de software y la construcción de ecosistemas digitales.",
    date: "15 Feb 2026",
    author: "Edwin Anubis",
    category: "Filosofía",
    image: "https://picsum.photos/seed/korima/800/400",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
            Bitácora Civilizatoria
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Reflexiones, avances técnicos y la visión del futuro digital desde el corazón de TAMV.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl border border-white/5 bg-slate-900/50 overflow-hidden hover:border-blue-500/30 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <User className="w-3 h-3 text-blue-400" />
                    </div>
                    {post.author}
                  </div>
                  <button className="text-blue-400 hover:text-white transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
