"use client";

import { Mic, AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function PhoneMockup() {
  return (
    <motion.div 
      animate={{ y: [-15, 15, -15] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="relative z-20 w-[250px] sm:w-[260px] h-[480px] sm:h-[510px] rounded-[2.75rem] bg-[#0c0c16] border-[5px] border-slate-800/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(99,102,241,0.25)] overflow-hidden flex flex-col origin-bottom"
    >
      {/* iPhone Notch */}
      <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-10">
        <div className="w-24 h-5 bg-slate-950 rounded-b-2xl" />
      </div>

      <div className="flex-1 p-6 pt-12 flex flex-col relative z-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
            />
            <span className="text-xs text-slate-300 font-medium">Live Detection</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">00:00:24</span>
        </div>

        <div className="glass-card rounded-xl p-4 mb-4 border-red-500/30 bg-red-950/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span className="text-sm font-bold text-red-400">High Risk Call</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Suspicious synthetic voice signatures detected. Proceed with caution.
          </p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pb-6">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Safety Score</span>
              <span className="text-2xl font-extrabold text-red-500 tracking-tight">23%</span>
            </div>
            <div className="h-10 w-10 rounded-full border border-red-500/40 bg-red-500/10 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "23%" }}
              transition={{ duration: 2, ease: "easeOut", delay: 1 }}
              className="h-full bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.9)]" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
