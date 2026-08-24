"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { MockVerdict } from "@/lib/mockData";
import { useEffect, useState } from "react";
import SpectrogramView from "./SpectrogramView";

export default function VerdictCard({
  status,
  verdict,
}: {
  status: "idle" | "analyzing" | "complete";
  verdict: MockVerdict | null;
}) {
  const [displayConfidence, setDisplayConfidence] = useState(0);

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

  return (
    <div className="relative flex min-h-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-md">
      <h3 className="mb-6 text-lg font-semibold text-foreground">Live Analysis Verdict</h3>

      <div className="relative flex flex-1 flex-col justify-center">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-muted"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-background-alt">
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
              <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
              <p className="animate-pulse font-medium text-foreground">Analyzing audio stream...</p>
              <p className="mt-2 text-sm text-muted">Extracting spectral features</p>
            </motion.div>
          )}

          {status === "complete" && verdict && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col"
            >
              <div className="mb-6 flex justify-center">
                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 font-bold ${
                    verdict.label === "real"
                      ? "bg-safe/20 text-safe"
                      : "bg-danger/20 text-danger"
                  }`}
                >
                  {verdict.label === "real" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                  {verdict.label === "real" ? "Verified Human Voice" : "Likely Cloned Voice"}
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-background-alt p-4 text-center">
                  <p className="mb-1 text-sm text-muted">Confidence</p>
                  <p
                    className={`text-3xl font-bold ${
                      verdict.label === "real" ? "text-safe" : "text-danger"
                    }`}
                  >
                    {displayConfidence.toFixed(1)}%
                  </p>
                </div>
                <div className="rounded-xl bg-background-alt p-4 text-center">
                  <p className="mb-1 text-sm text-muted">Latency</p>
                  <p className="text-3xl font-bold text-foreground">
                    184<span className="text-lg text-muted">ms</span>
                  </p>
                </div>
              </div>

              <SpectrogramView isAnalyzing={false} isComplete={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {status !== "complete" && (
        <div className="pointer-events-none mt-auto opacity-50 grayscale">
          <SpectrogramView isAnalyzing={status === "analyzing"} isComplete={false} />
        </div>
      )}
    </div>
  );
}
