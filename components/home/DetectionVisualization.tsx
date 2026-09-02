"use client";

import { CheckCircle2, AlertTriangle, Activity } from "lucide-react";
import { motion } from "framer-motion";
import VoiceAnalysisAnimation from "./how-it-works/VoiceAnalysisAnimation";
import SecurityVerdictAnimation from "./how-it-works/SecurityVerdictAnimation";

export default function DetectionVisualization() {
  return (
    <section className="bg-background-alt py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            From audio signal to security decision
          </h2>
          <p className="text-lg text-muted">
            Our detection engine turns raw audio into actionable security intelligence.
          </p>
        </motion.div>

        {/* Large Dashboard-style Visual */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="rounded-2xl border border-border bg-background p-6 md:p-10 shadow-xl overflow-hidden relative"
        >
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left: Audio Waveform */}
            <div className="flex-1 w-full bg-background-alt rounded-xl p-6 border border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Voice Analysis</h3>
              
              {/* Added Voice Analysis Animation */}
              <VoiceAnalysisAnimation />

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-muted mb-2">
                    <span>Audio signal</span>
                    <span className="text-primary font-mono">16kHz</span>
                  </div>
                  <div className="flex items-center gap-[2px] h-8">
                    {[45, 82, 34, 67, 91, 23, 76, 54, 88, 32, 65, 43, 78, 29, 94, 51, 87, 39, 72, 61, 48, 83, 36, 92, 27, 75, 41, 68, 85, 31, 79, 56, 95, 24, 81, 47, 73, 38, 89, 52].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/40 rounded-full" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-muted mb-2">
                    <span>Spectral analysis</span>
                    <span className="text-primary font-mono">Processing</span>
                  </div>
                  <div className="h-4 rounded-md bg-gradient-to-r from-primary/20 via-primary to-primary/20 overflow-hidden relative">
                     <div className="absolute inset-0 bg-white/20 w-1/3 blur-sm animate-pulse" style={{ animationDuration: '2s' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-muted mb-2">
                    <span>Voice characteristics</span>
                    <span className="text-danger font-mono">Anomalous</span>
                  </div>
                  <div className="flex gap-1 h-3">
                    <div className="w-1/3 bg-border rounded-full" />
                    <div className="w-1/2 bg-danger/50 rounded-full" />
                    <div className="w-1/6 bg-border rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Arrow/AI indicator */}
            <div className="flex lg:flex-col items-center justify-center gap-2">
               <div className="hidden lg:block w-px h-12 bg-gradient-to-b from-transparent to-primary" />
               <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                  <Activity className="h-5 w-5" />
               </div>
               <div className="hidden lg:block w-px h-12 bg-gradient-to-t from-transparent to-primary" />
               <div className="lg:hidden h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>

            {/* Right: Security Verdict Card */}
            <div className="flex-1 w-full bg-background-alt rounded-xl p-6 border border-border flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-6">Security Verdict</h3>
                
                {/* Added Security Verdict Animation */}
                <SecurityVerdictAnimation />
              </div>
              
              <div className="bg-background rounded-lg border border-danger/30 p-5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-danger" />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-danger/10 flex items-center justify-center text-danger shrink-0">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-danger">Suspicious synthetic voice</div>
                    <div className="text-xs text-muted">Match confidence: <span className="font-mono text-danger font-bold">94.2%</span></div>
                  </div>
                </div>
                
                <div className="text-sm text-muted bg-danger/5 rounded p-3">
                  <span className="font-medium text-foreground block mb-1">Risk detected</span>
                  Review the conversation before sharing sensitive information.
                </div>
              </div>

            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
