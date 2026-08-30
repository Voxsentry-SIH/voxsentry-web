"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function Soundwave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, "100px");
  const [animation, setAnimation] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    const bars = containerRef.current?.children;
    if (!bars) return;

    const ctx = gsap.context(() => {
      const tween = gsap.to(bars, {
        height: () => `${20 + Math.random() * 80}%`,
        duration: () => 0.5 + Math.random() * 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
      setAnimation(tween);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!animation) return;
    if (isVisible) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [isVisible, animation]);

  return (
    <div 
      className="absolute top-[60%] sm:top-[58%] lg:top-[56%] left-1/2 -translate-x-1/2 w-[105%] max-w-[700px] h-28 flex items-center justify-between gap-2 opacity-50 z-10 pointer-events-none"
      ref={containerRef}
    >
      {Array.from({ length: 32 }).map((_, i) => {
        // Gradient interpolation from cyan (left) to purple (right)
        const ratio = i / 31;
        const color = ratio < 0.5 
          ? "linear-gradient(to top, rgba(6,182,212,0.9), rgba(56,189,248,0.95))"
          : "linear-gradient(to top, rgba(129,140,248,0.9), rgba(192,132,252,0.95))";
        
        return (
          <div 
            key={i} 
            className="w-2 sm:w-2.5 rounded-full flex-1 max-w-[10px] shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            style={{ 
              height: "30%",
              background: color
            }}
          />
        );
      })}
    </div>
  );
}
