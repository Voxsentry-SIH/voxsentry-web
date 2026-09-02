"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Loader2, Info, Shield, ShieldAlert, Activity, Cpu, Crosshair, Terminal, Wifi, Fingerprint, Waves } from "lucide-react";
import { MockVerdict, mockCallContexts, calculateRiskTier, RiskTier } from "@/lib/mockData";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-xl border border-white/5 bg-[#050510]" />
});

const tierColors: Record<RiskTier, string> = {
  Low: "#10B981", // Emerald
  Medium: "#F59E0B", // Amber
  High: "#F97316", // Orange
  Critical: "#EF4444", // Red
};

const tierGlows: Record<RiskTier, string> = {
  Low: "rgba(16, 185, 129, 0.2)",
  Medium: "rgba(245, 158, 11, 0.2)",
  High: "rgba(249, 115, 22, 0.2)",
  Critical: "rgba(239, 68, 68, 0.3)",
};

export default function VerdictCard({
  status,
  verdict,
  contextId = "routine",
}: {
  status: "idle" | "analyzing" | "complete";
  verdict: MockVerdict | null;
  contextId?: string;
}) {
  const [displayScore, setDisplayScore] = useState(0);
  const loadingRingRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<SVGCircleElement>(null);
  const outerRingRef = useRef<SVGCircleElement>(null);

  const context = mockCallContexts.find(c => c.id === contextId) || mockCallContexts[0];
  const rawRiskScore = verdict ? (verdict.label === "cloned" ? verdict.confidence : 100 - verdict.confidence) : 0;
  const riskTier = calculateRiskTier(rawRiskScore, context);
  const tierColor = tierColors[riskTier];
  const glowColor = tierGlows[riskTier];
  const isFake = verdict?.label === "cloned";

  useEffect(() => {
    if (status === "complete" && verdict) {
      let current = 0;
      const target = rawRiskScore;
      const interval = setInterval(() => {
        current += target / 20;
        if (current >= target) {
          setDisplayScore(target);
          clearInterval(interval);
        } else {
          setDisplayScore(current);
        }
      }, 30);

      if (gaugeRef.current) {
        const circleLength = 2 * Math.PI * 40; // r=40
        const offset = circleLength - (target / 100) * circleLength;
        gsap.fromTo(gaugeRef.current, 
          { strokeDashoffset: circleLength },
          { strokeDashoffset: offset, duration: 1.5, ease: "power3.out", delay: 0.2 }
        );
      }
      
      if (outerRingRef.current) {
         gsap.to(outerRingRef.current, {
           rotation: 360,
           transformOrigin: "50% 50%",
           duration: 20,
           repeat: -1,
           ease: "linear"
         });
      }

      return () => clearInterval(interval);
    } else {
      setDisplayScore(0);
    }
  }, [status, verdict, rawRiskScore]);

  useEffect(() => {
    if (status === "analyzing" && loadingRingRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(loadingRingRef.current, {
          boxShadow: "0 0 40px rgba(34,211,238,0.4), inset 0 0 20px rgba(34,211,238,0.1)",
          scale: 1.05,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, loadingRingRef);
      return () => ctx.revert();
    }
  }, [status]);

  // UI Timeline stages
  const timelineStages = ["CAPTURE", "PREPROCESS", "FEATURE EXTRACTION", "MODEL ANALYSIS", "VERDICT"];
  const currentStageIndex = status === "idle" ? -1 : (status === "analyzing" ? 2 : 4); // simplistic mock of stage progress

  return (
    <div className="glass-card relative flex min-h-[700px] flex-col overflow-hidden rounded-2xl bg-[#03030A] border border-[rgba(255,255,255,0.08)] p-6 md:p-8 shadow-2xl">
      
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] mix-blend-screen" />
        
        {/* Dynamic Glow */}
        <AnimatePresence>
          {status === "complete" && verdict && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[120px] rounded-full pointer-events-none mix-blend-screen"
              style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* --- 1. HERO HEADER --- */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase">Live Analysis Verdict</h3>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md">
              <motion.div 
                animate={{ opacity: [1, 0.4, 1] }} 
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
              />
              <span className="text-[10px] font-bold text-cyan-300 tracking-wider">LIVE</span>
            </div>
          </div>
          <p className="text-sm text-cyan-100/50 font-mono tracking-wide">Real-time voice authenticity intelligence</p>
        </div>
        
        {/* Header HUD Pills */}
        <div className="flex flex-wrap gap-2 text-[10px] font-mono tracking-widest uppercase items-start">
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 rounded px-2.5 py-1.5">
            <Terminal className="w-3 h-3 text-slate-400" />
            <span className="text-slate-300">SYS_ID: VX-992</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/40 border border-white/5 rounded px-2.5 py-1.5">
            <Wifi className="w-3 h-3 text-cyan-500" />
            <span className="text-cyan-400">SECURE_LINK</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-start w-full">
        <AnimatePresence mode="wait">
          
          {/* --- IDLE STATE --- */}
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-slate-500 font-mono"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/5 bg-black/50 mb-6 shadow-inner">
                <Activity className="h-8 w-8 opacity-40" />
              </div>
              <p className="tracking-widest uppercase text-sm">System Standby</p>
              <p className="text-xs opacity-50 mt-2">Awaiting audio telemetry...</p>
            </motion.div>
          )}

          {/* --- ANALYZING STATE --- */}
          {status === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center font-mono"
            >
              <div ref={loadingRingRef} className="relative flex h-32 w-32 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-900/20 mb-8">
                <div className="absolute inset-0 rounded-full border border-t-cyan-300 border-r-transparent border-b-cyan-500 border-l-transparent animate-spin duration-700" />
                <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/30 animate-[spin_3s_linear_infinite_reverse]" />
                <Cpu className="h-8 w-8 text-cyan-300 animate-pulse" />
              </div>
              <p className="tracking-widest uppercase font-bold text-cyan-400 mb-2">Analyzing Voice Signature</p>
              <div className="flex items-center gap-2 text-xs text-cyan-200/50">
                <span className="w-1.5 h-1.5 bg-cyan-500 animate-ping rounded-full" />
                Extracting deep spectral features
              </div>
            </motion.div>
          )}

          {/* --- COMPLETE STATE --- */}
          {status === "complete" && verdict && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              {/* TOP ROW: Risk HUD & Primary Detection */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 2. CENTRAL THREAT RADAR */}
                <div className="lg:col-span-4 glass-card bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col items-center justify-center relative group hover:border-white/20 transition-colors">
                  <div className="absolute top-3 left-3 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-6 absolute top-4">Threat Radar</h4>
                  
                  <div className="relative h-40 w-40 mt-4 mb-2 flex items-center justify-center">
                    <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                      {/* Inner track */}
                      <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                      {/* Active progress */}
                      <circle
                        ref={gaugeRef}
                        cx="50"
                        cy="50"
                        r="40"
                        stroke={tierColor}
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 2 * Math.PI * 40, strokeDashoffset: 2 * Math.PI * 40, filter: "drop-shadow(0px 0px 4px currentColor)" }}
                      />
                      {/* Outer dashed radar ring */}
                      <circle
                        ref={outerRingRef}
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                        fill="none"
                        strokeDasharray="2 4"
                      />
                    </svg>
                    
                    {/* Center Score */}
                    <div className="flex flex-col items-center justify-center font-mono absolute inset-0">
                      <div className="flex items-baseline gap-0.5">
                        <span className="text-4xl font-light text-white tracking-tighter" style={{ textShadow: `0 0 20px ${tierColor}` }}>
                          {displayScore.toFixed(0)}
                        </span>
                        <span className="text-xs text-slate-500">/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center mt-2">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Risk Level</p>
                    <div className="inline-flex items-center gap-1.5 rounded bg-black/60 px-3 py-1 text-xs font-bold font-mono border" style={{ color: tierColor, borderColor: `${tierColor}40`, boxShadow: `0 0 10px ${tierColor}20` }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tierColor }} />
                      {riskTier}
                    </div>
                  </div>
                </div>

                {/* 4. PRIMARY DETECTION & 7. METRICS */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                  
                  {/* Primary Detection Panel */}
                  <div className="glass-card bg-black/40 border border-white/10 rounded-xl p-6 relative overflow-hidden flex-1 group hover:border-white/20 transition-colors">
                    {/* Scanning background fx */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[scan_3s_linear_infinite]" style={{ backgroundSize: '100% 10px' }} />
                    <style jsx>{`@keyframes scan { 0% { background-position: 0 -100px; } 100% { background-position: 0 100%; } }`}</style>
                    
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                      <Crosshair className="w-3 h-3" /> Primary Detection
                    </h4>
                    
                    <div className="flex items-center gap-6 relative z-10">
                      <div className="relative shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-black border" style={{ borderColor: `${tierColor}30` }}>
                        <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: tierColor }} />
                        {isFake ? (
                          <ShieldAlert className="w-10 h-10" style={{ color: tierColor, filter: `drop-shadow(0 0 8px ${tierColor})` }} />
                        ) : (
                          <Shield className="w-10 h-10" style={{ color: tierColor, filter: `drop-shadow(0 0 8px ${tierColor})` }} />
                        )}
                      </div>
                      
                      <div>
                        <motion.h2 
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                          className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2"
                        >
                          {isFake ? "AI Clone Detected" : "Verified Human Voice"}
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          className="text-sm font-mono" style={{ color: tierColor }}
                        >
                          {isFake ? "Synthetic voice characteristics detected." : "High-confidence biological voice signature."}
                        </motion.p>
                      </div>
                    </div>
                  </div>

                  {/* Forensic Metrics Strip */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-black/30 border border-white/5 rounded-lg p-4 flex flex-col gap-1 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-slate-500 mb-1">
                        <Activity className="w-3 h-3" /> Confidence
                      </div>
                      <div className="text-xl font-light text-white font-mono">
                        {verdict.confidence.toFixed(1)}%
                      </div>
                      <div className="text-[10px] text-cyan-500/80 uppercase tracking-wider">{verdict.confidence > 90 ? 'High' : 'Moderate'}</div>
                    </div>
                    
                    <div className="bg-black/30 border border-white/5 rounded-lg p-4 flex flex-col gap-1 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-slate-500 mb-1">
                        <Cpu className="w-3 h-3" /> Latency
                      </div>
                      <div className="text-xl font-light text-white font-mono">
                        184<span className="text-sm text-slate-500 ml-1">ms</span>
                      </div>
                      <div className="text-[10px] text-emerald-500/80 uppercase tracking-wider">Optimal</div>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-lg p-4 flex flex-col gap-1 hover:bg-white/[0.02] transition-colors">
                      <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-slate-500 mb-1">
                        <Fingerprint className="w-3 h-3" /> Match Depth
                      </div>
                      <div className="text-xl font-light text-white font-mono">
                        Deep
                      </div>
                      <div className="text-[10px] text-cyan-500/80 uppercase tracking-wider">L6 Extract</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. ANALYSIS TIMELINE */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-slate-500 uppercase px-2">
                  {timelineStages.map((stage, i) => (
                    <span key={stage} className={i <= currentStageIndex ? "text-cyan-400" : ""}>{stage}</span>
                  ))}
                </div>
                <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                   <div 
                     className="absolute top-0 left-0 h-full bg-cyan-500 transition-all duration-1000 ease-out shadow-[0_0_10px_#06b6d4]"
                     style={{ width: `${((currentStageIndex + 1) / timelineStages.length) * 100}%` }}
                   />
                </div>
              </div>

              {/* 9. AI VERDICT EXPLANATION & CHECKS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-[#0A0D18]/50 border border-white/5 rounded-xl p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[50px]" />
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <Info className="w-4 h-4 text-cyan-400" />
                    <h5 className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">Diagnostic Explanation</h5>
                  </div>
                  <p className="text-sm text-slate-300 font-mono leading-relaxed relative z-10">
                    A risk score of <span className="text-white font-bold">{displayScore.toFixed(1)}</span> evaluates to <span className="px-1.5 py-0.5 rounded bg-white/10 text-white mx-0.5 border" style={{ borderColor: `${tierColor}50` }}>{riskTier}</span> because this biometric signature was contextualized as a <span className="text-cyan-300">[{context.name}]</span> scenario.
                  </p>
                </div>

                {/* 10. FORENSIC CHECKS */}
                <div className="bg-[#0A0D18]/50 border border-white/5 rounded-xl p-5 font-mono">
                  <h5 className="text-[10px] uppercase tracking-widest text-slate-500 mb-4">Signal Diagnostics</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] text-slate-400">VOICE NATURALNESS</span>
                      <span className="text-[10px] text-cyan-400 flex items-center gap-1"><span className="w-1 h-1 bg-cyan-400 rounded-full" />{isFake ? 'Low' : 'High'}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] text-slate-400">SPECTRAL SIG</span>
                      <span className="text-[10px] text-emerald-400 flex items-center gap-1"><span className="w-1 h-1 bg-emerald-400 rounded-full" />Clean</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] text-slate-400">LIVENESS</span>
                      <span className="text-[10px] flex items-center gap-1" style={{ color: isFake ? tierColors.High : tierColors.Low }}>
                         <span className="w-1 h-1 rounded-full" style={{ backgroundColor: isFake ? tierColors.High : tierColors.Low }} />
                         {isFake ? 'Failed' : 'Passed'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-[10px] text-slate-400">BKG CONSISTENCY</span>
                      <span className="text-[10px] text-cyan-400 flex items-center gap-1"><span className="w-1 h-1 bg-cyan-400 rounded-full" />Matched</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 11. LIVE WAVEFORM CONTAINER */}
              <div className="mt-4 relative bg-[#020205] border border-white/5 rounded-xl h-32 flex flex-col justify-end overflow-hidden group">
                 {/* 12. AUDIO FORENSICS HUD OVERLAYS */}
                 <div className="absolute top-3 left-4 z-20 flex items-center gap-3">
                   <div className="flex items-center gap-1.5 px-2 py-1 bg-black/60 border border-white/10 rounded text-[9px] font-mono text-cyan-400 uppercase">
                     <Waves className="w-3 h-3" /> Live Voice Signal
                   </div>
                 </div>
                 <div className="absolute top-3 right-4 z-20 flex gap-2">
                    <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-slate-500 uppercase border border-white/5">48 kHz</span>
                    <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-slate-500 uppercase border border-white/5">16-bit</span>
                    <span className="px-1.5 py-0.5 bg-white/5 rounded text-[8px] font-mono text-slate-500 uppercase border border-white/5">Mono</span>
                 </div>
                 
                 <div className="absolute inset-0 z-10 pointer-events-none opacity-80 mix-blend-screen">
                    <SpectrogramView isAnalyzing={false} isComplete={true} />
                 </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Persistent Waveform when idle/analyzing */}
      {status !== "complete" && (
        <div className="absolute bottom-6 left-6 right-6 h-32 opacity-30 grayscale pointer-events-none rounded-xl overflow-hidden border border-white/5">
          <SpectrogramView isAnalyzing={status === "analyzing"} isComplete={false} />
        </div>
      )}
    </div>
  );
}
