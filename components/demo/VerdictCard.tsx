"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { MockVerdict } from "@/lib/mockData";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-40 w-full rounded-xl border border-white/5 bg-[#050510]" />
});

export default function VerdictCard({
  status,
  verdict,
}: {
  status: "idle" | "analyzing" | "complete";
  verdict: MockVerdict | null;
}) {
  const [displayConfidence, setDisplayConfidence] = useState(0);
  const loadingRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "complete" && verdict) {
      let current = 0;
      const target = verdict.confidence;
      const interval = setInterval(() => {
        current += target / 20; // 20 steps
        if (current >= target) {
          setDisplayConfidence(target);
          clearInterval(interval);
        } else {
          setDisplayConfidence(current);
        }
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayConfidence(0);
    }
  }, [status, verdict]);

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
    <div className="glass-card relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl p-8 shadow-xl">
      {/* Background verdict glow when complete */}
      <AnimatePresence>
        {status === "complete" && verdict && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 pointer-events-none blur-3xl ${
              verdict.label === "real" ? "bg-[#10B981]" : "bg-[#EF4444]"
            }`}
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
              <p className="mt-2 text-sm text-slate-400">Extracting spectral features</p>
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
              <div className="mb-6 flex justify-center">
                <div
                  className={`flex items-center gap-2 rounded-full px-6 py-3 font-bold border shadow-[0_0_20px_rgba(0,0,0,0.2)] ${
                    verdict.label === "real"
                      ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30"
                      : "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30"
                  }`}
                >
                  {verdict.label === "real" ? (
                    <CheckCircle2 className="h-6 w-6" />
                  ) : (
                    <AlertTriangle className="h-6 w-6" />
                  )}
                  <span className="text-lg">{verdict.label === "real" ? "Verified Human Voice" : "Likely Cloned Voice"}</span>
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div className="rounded-xl bg-[#050514]/50 border border-white/5 p-5 text-center shadow-inner">
                  <p className="mb-1 text-sm font-medium text-slate-400">Confidence</p>
                  <p
                    className={`text-4xl font-extrabold ${
                      verdict.label === "real" ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {displayConfidence.toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-xl bg-[#050514]/50 border border-white/5 p-5 text-center shadow-inner">
                  <p className="mb-1 text-sm font-medium text-slate-400">Latency</p>
                  <p className="text-4xl font-extrabold text-white">
                    184<span className="text-xl text-slate-500 font-medium ml-1">ms</span>
                  </p>
                </div>
              </div>

              <div className="mt-auto pointer-events-none opacity-80">
                <SpectrogramView isAnalyzing={false} isComplete={true} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status !== "complete" && (
        <div className="pointer-events-none mt-auto opacity-30 grayscale relative z-0">
          <SpectrogramView isAnalyzing={status === "analyzing"} isComplete={false} />
        </div>
      )}
    </div>
  );
}
