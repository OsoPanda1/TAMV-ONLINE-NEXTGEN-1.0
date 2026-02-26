import * as React from "react";
import { motion } from "framer-motion";

export default function TAMVLogo({ className = "w-12 h-12", glow = true }: { className?: string, glow?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <defs>
        <linearGradient id="tamv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00A3FF" />
          <stop offset="50%" stopColor="#00E0FF" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <filter id="tamv-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Hexagon Frame */}
      <motion.path
        d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
        fill="none"
        stroke="url(#tamv-grad)"
        strokeWidth="1.5"
        strokeDasharray="10,5"
        animate={{ strokeDashoffset: [0, 50] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Shield / T Shape */}
      <motion.path
        d="M30 30 L70 30 M50 30 L50 75 M35 75 L65 75"
        fill="none"
        stroke="url(#tamv-grad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={glow ? "url(#tamv-glow)" : "none"}
      />
      
      {/* Nexus Points */}
      <motion.circle 
        cx="50" cy="30" r="4" 
        fill="#fff" 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle 
        cx="50" cy="52" r="3" 
        fill="#fff"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle 
        cx="50" cy="75" r="4" 
        fill="#fff"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      
      {/* Orbiting Ring */}
      <motion.circle
        cx="50" cy="50" r="35"
        fill="none"
        stroke="rgba(0, 163, 255, 0.2)"
        strokeWidth="0.5"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </motion.svg>
  );
}
