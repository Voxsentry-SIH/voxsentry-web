"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mic, AlertTriangle, ShieldAlert } from "lucide-react";

export default function PhoneMockup() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const micRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle float animation for the whole phone
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          y: -15,
          duration: 3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Pulsing mic animation
      if (micRef.current) {
        gsap.to(micRef.current, {
          scale: 1.1,
          opacity: 0.8,
          duration: 0.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    }, phoneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={phoneRef}
      className="absolute bottom-[-10%] right-[15%] z-20 w-[260px] h-[520px] rounded-[3rem] bg-[#0f0f1a] border-[6px] border-slate-800 shadow-[0_30px_60px_-15px_rgba(34,211,238,0.3)] overflow-hidden hidden lg:flex flex-col"
    >
      {/* iPhone Notch */}
      <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-10">
        <div className="w-24 h-5 bg-slate-950 rounded-b-2xl" />
      </div>

      <div className="flex-1 p-6 pt-12 flex flex-col relative z-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div ref={micRef} className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
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

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Safety Score</span>
              <span className="text-xl font-bold text-red-500">23%</span>
            </div>
            <div className="glow-badge h-10 w-10 border-red-500/40 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <ShieldAlert className="h-5 w-5 text-red-500" />
            </div>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[23%] bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>
        </div>
        
        {/* Call Buttons Mock */}
        <div className="flex justify-center gap-6 mt-8">
          <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center">
            <Mic className="h-5 w-5 text-slate-400" />
          </div>
          <div className="h-12 w-12 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <svg className="h-6 w-6 text-white transform rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" opacity="0"/><path d="M17.51 9.53c-1.39-.73-3-1.07-4.66-1.12v2.24c1.19.04 2.33.28 3.39.69l1.27-1.81zM5.33 9.4c1.07-.41 2.2-.65 3.39-.69V6.47c-1.65.05-3.26.39-4.65 1.12L5.33 9.4zm12.39 8.27l-2.5-1.5c-.38-.23-.62-.64-.62-1.09v-2.31c-.9-.35-1.87-.54-2.88-.54s-1.98.19-2.88.54v2.31c0 .45-.24.86-.62 1.09l-2.5 1.5c-.47.28-1.08.19-1.46-.22l-1.47-1.61c-.34-.38-.29-.98.11-1.31 2.37-1.99 5.48-3.17 8.82-3.17s6.45 1.18 8.82 3.17c.4.33.45.93.11 1.31l-1.47 1.61c-.38.41-.99.5-1.46.22z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
