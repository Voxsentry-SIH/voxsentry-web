"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Loader2, Info } from "lucide-react";
import { MockVerdict, mockCallContexts, calculateRiskTier, RiskTier } from "@/lib/mockData";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-40 w-full rounded-xl border border-white/5 bg-[#050510]" />
});

const tierColors: Record<RiskTier, string> = {
  Low: "#10B981",
  Medium: "#F59E0B",
  High: "#F97316",
  Critical: "#EF4444",
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

  const context = mockCallContexts.find(c => c.id === contextId) || mockCallContexts[0];
  const rawRiskScore = verdict ? (verdict.label === "cloned" ? verdict.confidence : 100 - verdict.confidence) : 0;
  const riskTier = calculateRiskTier(rawRiskScore, context);
  const tierColor = tierColors[riskTier];

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
        // Animate the gauge stroke using GSAP
        const circleLength = 2 * Math.PI * 36; // r=36
        const offset = circleLength - (target / 100) * circleLength;
        gsap.fromTo(gaugeRef.current, 
          { strokeDashoffset: circleLength },
          { strokeDashoffset: offset, duration: 1.5, ease: "power2.out", delay: 0.2 }
        );
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
          boxShadow: "0 0 30px rgba(34,211,238,0.6), inset 0 0 15px rgba(34,211,238,0.2)",
          scale: 1.1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, loadingRingRef);
      return () => ctx.revert();
    }
  }, [status]);

  return (
    <div className="glass-card relative flex min-h-[460px] flex-col overflow-hidden rounded-2xl p-8 shadow-xl">
      {/* Background verdict glow when complete */}
      <AnimatePresence>
        {status === "complete" && verdict && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none blur-3xl"
            style={{ backgroundColor: tierColor }}
          />
        )}
      </AnimatePresence>

      <h3 className="mb-6 text-xl font-bold text-white tracking-tight relative z-10">Live Analysis Verdict</h3>

      <div className="relative flex flex-1 flex-col justify-center z-10">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-400"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#050514]/50 border border-white/5">
                <AlertTriangle className="h-8 w-8 opacity-50" />
              </div>
              <p>Waiting for audio input...</p>
            </motion.div>
          )}

          {status === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center"
            >
              <div ref={loadingRingRef} className="relative flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-6">
                <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
              </div>
              <p className="animate-pulse font-bold text-cyan-400">Analyzing audio stream...</p>
              <p className="mt-2 text-sm text-slate-400">Extracting spectral features & evaluating risk</p>
            </motion.div>
          )}

          {status === "complete" && verdict && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="flex h-full flex-col"
            >
              <div className="mb-6 flex flex-col items-center gap-6 md:flex-row md:items-stretch">
                {/* Gauge Section */}
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-[#050514]/50 border border-white/5 p-6 shadow-inner relative">
                  <div className="relative h-24 w-24 mb-4">
                    <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        ref={gaugeRef}
                        cx="40"
                        cy="40"
                        r="36"
                        stroke={tierColor}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: 2 * Math.PI * 36,
                          strokeDashoffset: 2 * Math.PI * 36,
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-white">{displayScore.toFixed(0)}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Risk Score</p>
                    <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold border" style={{ backgroundColor: `${tierColor}1A`, color: tierColor, borderColor: `${tierColor}33` }}>
                      {riskTier} Risk
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-1 flex-col justify-center rounded-xl bg-[#050514]/50 border border-white/5 p-6 shadow-inner space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Primary Detection</p>
                    <div className="flex items-center gap-2 text-white font-semibold">
                      {verdict.label === "real" ? <CheckCircle2 className="h-5 w-5 text-[#10B981]" /> : <AlertTriangle className="h-5 w-5 text-[#EF4444]" />}
                      {verdict.label === "real" ? "Verified Human Voice" : "Likely Cloned Voice"}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">Latency</p>
                    <p className="text-white font-semibold flex items-baseline">
                      184<span className="text-xs text-slate-500 ml-1">ms</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Context Note */}
              <div className="mb-6 rounded-lg bg-[#050514]/80 border border-white/10 p-4 text-sm flex gap-3 items-start">
                <Info className="h-5 w-5 shrink-0 text-cyan-400" />
                <div>
                  <p className="font-semibold text-slate-200">Why this tier?</p>
                  <p className="text-slate-400 mt-1">
                    A risk score of {displayScore.toFixed(1)} evaluates to <strong style={{ color: tierColor }}>{riskTier}</strong> because this call is flagged as a <strong>{context.name}</strong>.
                  </p>
                </div>
              </div>

              <div className="mt-auto pointer-events-none opacity-80 h-24">
                <SpectrogramView isAnalyzing={false} isComplete={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status !== "complete" && (
        <div className="pointer-events-none mt-auto opacity-30 grayscale relative z-0 h-24">
          <SpectrogramView isAnalyzing={status === "analyzing"} isComplete={false} />
        </div>
      )}
    </div>
  );
}
