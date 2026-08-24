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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 flex items-center gap-2 opacity-30 z-0 pointer-events-none"
      ref={containerRef}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div 
          key={i} 
          className="w-2 rounded-full"
          style={{ 
            height: "20%",
            background: "linear-gradient(to top, #7C3AED, #22D3EE)"
          }}
        />
      ))}
    </div>
  );
}
