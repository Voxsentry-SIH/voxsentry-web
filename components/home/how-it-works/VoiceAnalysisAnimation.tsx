"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";
import { usePerformance } from "@/providers/PerformanceProvider";

export default function VoiceAnalysisAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIsVisible(containerRef, "100px");
  const { isLowEnd } = usePerformance();
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isLowEnd || !waveformRef.current || !scannerRef.current) return;
    
    const bars = waveformRef.current.children;
    const scanner = scannerRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Idle state for bars
      gsap.to(bars, {
        height: () => `${Math.random() * 40 + 20}%`,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.05,
          from: "random"
        }
      });

      // Scanner passing over the waveform
      tl.fromTo(scanner, 
        { left: "-10%", opacity: 0 },
        { left: "10%", opacity: 1, duration: 0.5, ease: "power2.in" }
      )
      .to(scanner, { left: "90%", duration: 2, ease: "none" })
      .to(scanner, { left: "110%", opacity: 0, duration: 0.5, ease: "power2.out" })
      .to({}, { duration: 1 }); // pause before next scan

      setTimeline(tl);
    }, containerRef);

    return () => ctx.revert();
  }, [isLowEnd]);

  useEffect(() => {
    if (!timeline) return;
    if (isVisible) {
      timeline.play();
    } else {
      timeline.pause();
    }
  }, [isVisible, timeline]);

  return (
    <div 
      ref={containerRef} 
      className="relative h-24 w-full mb-6 rounded-lg bg-[#050510] border border-cyan-400/10 overflow-hidden flex items-center justify-center p-4"
    >
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.5) 1px, transparent 1px)`,
          backgroundSize: '10px 10px'
        }}
      />
      
      {/* Waveform */}
      <div ref={waveformRef} className="relative z-10 flex h-full w-full items-center justify-between gap-[2px]">
        {Array.from({ length: 48 }).map((_, i) => (
          <div 
            key={i} 
            className="w-full bg-cyan-400/50 rounded-full"
            style={{ 
              height: isLowEnd ? `${Math.random() * 60 + 20}%` : "10%",
              boxShadow: "0 0 5px rgba(34, 211, 238, 0.3)" 
            }}
          />
        ))}
      </div>

      {/* Scanner Bar */}
      {!isLowEnd && (
        <div 
          ref={scannerRef}
          className="absolute top-0 bottom-0 w-8 z-20 pointer-events-none flex justify-center"
          style={{ opacity: 0 }}
        >
          <div className="w-px h-full bg-cyan-300 shadow-[0_0_15px_2px_rgba(34,211,238,0.8)]" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 blur-[2px]" />
        </div>
      )}
    </div>
  );
}
