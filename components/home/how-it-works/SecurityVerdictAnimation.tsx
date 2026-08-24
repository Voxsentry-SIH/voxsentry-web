"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";
import { usePerformance } from "@/providers/PerformanceProvider";
import { ShieldAlert, Scan, Fingerprint } from "lucide-react";

export default function SecurityVerdictAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  
  const isVisible = useIsVisible(containerRef, "100px");
  const { isLowEnd } = usePerformance();
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (isLowEnd || !ringRef.current || !iconRef.current || !scanLineRef.current || !pulseRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      
      // 1. Initial State: Scanning
      tl.set(iconRef.current, { rotation: 0, scale: 0.9, opacity: 0.5 })
        .set(ringRef.current, { rotation: 0, borderTopColor: "rgba(34, 211, 238, 0.4)", borderRightColor: "transparent" })
        .set(pulseRef.current, { scale: 0.8, opacity: 0 })
        
      // Scan Animation
      tl.to(ringRef.current, { rotation: 360, duration: 2, ease: "none" }, 0)
        .fromTo(scanLineRef.current, 
          { top: "10%", opacity: 0 }, 
          { top: "90%", opacity: 1, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, 
          0
        )
        
      // 2. Verdict Evaluation (transition to warning/red)
      tl.to(iconRef.current, { scale: 1.1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, 2)
        .to(ringRef.current, { borderColor: "rgba(239, 68, 68, 0.6)", duration: 0.4 }, 2)
        .to(pulseRef.current, { scale: 1.5, opacity: 0.3, duration: 0.5, ease: "power2.out" }, 2)
        
      // 3. Subtle Pulse Warning State
      tl.to(pulseRef.current, { scale: 1.8, opacity: 0, duration: 0.8, ease: "power2.out" }, 2.5)
        .to(iconRef.current, { scale: 1, duration: 0.2 }, 2.5)
        
      // Pause before restart
      tl.to({}, { duration: 1 });

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
      className="relative h-24 w-full mb-6 rounded-lg bg-[#050510] border border-danger/10 overflow-hidden flex items-center justify-center p-4"
    >
      {/* Background Dots */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
          backgroundSize: '12px 12px'
        }}
      />
      
      {!isLowEnd ? (
        <div className="relative w-16 h-16 flex items-center justify-center z-10">
          {/* Scanning Ring */}
          <div 
            ref={ringRef}
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40 border-r-transparent border-b-transparent"
          />
          
          {/* Warning Pulse */}
          <div 
            ref={pulseRef}
            className="absolute inset-0 rounded-full bg-danger/50"
            style={{ opacity: 0, scale: 0.8 }}
          />

          {/* Central Icon */}
          <div ref={iconRef} className="relative z-20 text-danger drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            <ShieldAlert className="h-7 w-7" />
          </div>
          
          {/* Horizontal Scan Line */}
          <div 
            ref={scanLineRef}
            className="absolute w-full h-[2px] bg-cyan-400 shadow-[0_0_8px_1px_rgba(34,211,238,0.6)] z-30 pointer-events-none"
            style={{ opacity: 0, top: '10%' }}
          />
        </div>
      ) : (
        <div className="relative w-16 h-16 flex items-center justify-center z-10">
          <div className="absolute inset-0 rounded-full border-2 border-danger/40" />
          <div className="relative z-20 text-danger">
            <ShieldAlert className="h-7 w-7" />
          </div>
        </div>
      )}
      
      {/* Subtle overlay gradients */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />
    </div>
  );
}
