"use client";

import Link from "next/link";
import { Play, Download, Shield, Mic, AlertTriangle, Target, Activity } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-6 pt-24 pb-32">
      {/* Background Graphic Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        {/* Large sweeping purple gradient blur */}
        <div className="absolute right-[-10%] top-1/4 h-[600px] w-[800px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute left-[-10%] top-1/2 h-[500px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col items-start max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 shadow-sm">
              <Shield className="h-4 w-4" />
              AI Voice Security
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-[4rem] leading-[1.1] mb-6">
              Stop Voice-Cloning Scams Before They Cost You
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Detect AI voice scams and deepfake calls in real-time. Protect your conversations, your money, and your identity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <Link href="/download" className="w-full sm:w-auto">
                <Button variant="primary" className="w-full flex items-center justify-center gap-2 h-14 px-8 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40">
                  <Download className="h-5 w-5" />
                  Download App
                </Button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-14 px-8 text-base bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                  <Play className="h-5 w-5 fill-current" />
                  Try Live Demo
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 shadow-sm overflow-hidden flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})` }} />
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-primary">
                  {[1,2,3,4,5].map(i => <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                </div>
                <span className="text-sm font-medium text-slate-600 mt-0.5">Trusted by 25,000+ users worldwide</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Scene */}
          <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px]">
            
            {/* The 3D Tilted Phone */}
            <div 
              className="relative z-20 w-[280px] h-[580px] rounded-[3rem] bg-slate-900 border-[8px] border-slate-800 shadow-2xl overflow-hidden flex flex-col transform-gpu"
              style={{ transform: "rotateY(-15deg) rotateX(10deg) rotateZ(-5deg)", boxShadow: "20px 20px 60px rgba(0,0,0,0.3), -5px -5px 20px rgba(255,255,255,0.1) inset" }}
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center">
                <div className="w-24 h-6 bg-slate-950 rounded-b-2xl" />
              </div>

              {/* Screen Content (Dark UI) */}
              <div className="flex-1 bg-slate-900 p-6 pt-16 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-slate-300 font-medium">Live Call Detection</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">00:00:24</span>
                </div>

                <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 mb-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-bold text-white">Potential AI Voice Detected</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">This voice shows signs of AI generation.</p>
                  
                  {/* Waveform graphic inside phone */}
                  <div className="h-24 w-full rounded-lg bg-slate-950/50 flex items-center justify-center p-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-fuchsia-500/20 to-primary/20 opacity-50" />
                    <div className="flex items-center gap-[2px] h-full w-full px-2">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-primary/60 rounded-full" style={{ height: `${20 + Math.random() * 80}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                   <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                     <span>Call Safety Score</span>
                     <span className="text-amber-400">High Risk</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <Shield className="h-5 w-5 text-amber-400" />
                     <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                       <div className="h-full w-[23%] bg-amber-400 rounded-full" />
                     </div>
                   </div>
                </div>

                {/* Call buttons */}
                <div className="flex justify-between items-center mt-8 px-2 pb-4">
                   <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center">
                     <Mic className="h-5 w-5 text-white" />
                   </div>
                   <div className="h-14 w-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                     <svg className="h-6 w-6 text-white transform rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" opacity="0"/><path d="M17.51 9.53c-1.39-.73-3-1.07-4.66-1.12v2.24c1.19.04 2.33.28 3.39.69l1.27-1.81zM5.33 9.4c1.07-.41 2.2-.65 3.39-.69V6.47c-1.65.05-3.26.39-4.65 1.12L5.33 9.4zm12.39 8.27l-2.5-1.5c-.38-.23-.62-.64-.62-1.09v-2.31c-.9-.35-1.87-.54-2.88-.54s-1.98.19-2.88.54v2.31c0 .45-.24.86-.62 1.09l-2.5 1.5c-.47.28-1.08.19-1.46-.22l-1.47-1.61c-.34-.38-.29-.98.11-1.31 2.37-1.99 5.48-3.17 8.82-3.17s6.45 1.18 8.82 3.17c.4.33.45.93.11 1.31l-1.47 1.61c-.38.41-.99.5-1.46.22z"/></svg>
                   </div>
                   <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center">
                     <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.899a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
                   </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Panel 1: Real-time Analysis */}
            <div 
              className="absolute z-30 left-[-40px] top-[25%] bg-white/60 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl transform-gpu"
              style={{ transform: "rotateY(-15deg) rotateX(10deg) translateZ(60px)" }}
            >
               <h4 className="text-xs font-bold text-slate-800 mb-2">Real-time<br/>Voice Analysis</h4>
               <div className="h-10 w-24 flex items-end gap-1">
                 {Array.from({length: 12}).map((_, i) => (
                   <div key={i} className="w-1.5 bg-primary/80 rounded-t-sm" style={{ height: `${30 + Math.random() * 70}%` }} />
                 ))}
               </div>
            </div>

            {/* Floating Glass Panel 2: Threat Detection */}
            <div 
              className="absolute z-10 right-[-20px] bottom-[15%] bg-white/60 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-xl transform-gpu"
              style={{ transform: "rotateY(-15deg) rotateX(10deg) translateZ(-40px)" }}
            >
               <h4 className="text-xs font-bold text-slate-800 mb-1">Threat Detection</h4>
               <p className="text-[10px] text-primary font-semibold mb-3">AI-Powered</p>
               <div className="h-12 w-12 rounded-full border-4 border-slate-200 relative mx-auto">
                 <div className="absolute inset-[-4px] rounded-full border-4 border-primary border-t-transparent border-l-transparent transform -rotate-45" />
                 <Target className="absolute inset-0 m-auto h-4 w-4 text-primary" />
               </div>
            </div>

            {/* Floating Pill: Analyzing */}
            <div 
              className="absolute z-40 right-[-30px] top-[15%] bg-primary text-white px-4 py-2 rounded-full shadow-lg shadow-primary/30 flex items-center gap-2 transform-gpu"
              style={{ transform: "rotateY(-15deg) rotateX(10deg) translateZ(80px)" }}
            >
               <Activity className="h-4 w-4" />
               <span className="text-sm font-semibold">Analyzing Voice...</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
