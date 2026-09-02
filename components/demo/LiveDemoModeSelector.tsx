"use client";

import { motion } from "framer-motion";
import { Mic, Zap, MessageSquare } from "lucide-react";

export type DemoMode = "detect" | "stt" | "sts";

interface Props {
  activeMode: DemoMode;
  onModeChange: (mode: DemoMode) => void;
}

export default function LiveDemoModeSelector({ activeMode, onModeChange }: Props) {
  const modes = [
    { id: "detect" as DemoMode, label: "AI Detection", icon: Zap },
    { id: "stt" as DemoMode, label: "Speech to Text", icon: Mic },
    { id: "sts" as DemoMode, label: "Speech to Speech", icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col items-center mb-8 reveal-up">
      <div className="inline-flex items-center gap-1 p-1 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
        {modes.map((mode) => {
          const isActive = activeMode === mode.id;
          const Icon = mode.icon;
          
          return (
            <button
              key={mode.id}
              onClick={() => onModeChange(mode.id)}
              className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-xs md:text-sm font-bold font-mono tracking-widest uppercase transition-colors duration-300 ${
                isActive ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
              <span className="relative z-10">{mode.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeMode"
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
