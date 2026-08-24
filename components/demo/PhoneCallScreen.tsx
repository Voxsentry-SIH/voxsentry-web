"use client";

import { useEffect, useRef, useState } from "react";
import { User, PhoneOff, MicOff, Volume2 } from "lucide-react";
import gsap from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function PhoneCallScreen({
  isPlaying,
  callerName,
  callTimeSeconds,
}: {
  isPlaying: boolean;
  callerName: string;
  callTimeSeconds: number;
}) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, "100px");
  const [animation, setAnimation] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;
    const bars = waveformRef.current.children;
    
    const ctx = gsap.context(() => {
      if (isPlaying) {
        // Continuous staggered random heights when playing
        const tween = gsap.to(bars, {
          height: () => Math.random() * 60 + 10,
          duration: () => 0.6 + Math.random() * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.05,
            from: "random"
          }
        });
        setAnimation(tween);
      } else {
        if (animation) animation.kill();
        // Reset to default height when stopped
        gsap.to(bars, {
          height: 4,
          duration: 0.3,
          ease: "power2.out"
        });
        setAnimation(null);
      }
    }, waveformRef);

    return () => {
      if (animation) animation.kill();
      ctx.revert();
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!animation) return;
    if (isVisible) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [isVisible, animation]);

  return (
    <div ref={containerRef} className="glass-card relative mx-auto flex h-[600px] w-full max-w-[320px] flex-col items-center overflow-hidden rounded-[2.5rem] border-[6px] border-cyan-400/30 p-0 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
      
      {/* Phone screen dark background */}
      <div className="absolute inset-0 bg-[#111827] -z-10" />

      <div className="px-6 py-12 flex flex-col h-full w-full items-center">
        {/* Cyan/Purple Bubble (VoxSentry overlay) */}
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)] backdrop-blur-md">
          <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
        </div>

        <div className="mb-6 mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
          <User className="h-12 w-12 text-gray-400" />
        </div>

        <h2 className="mb-2 text-2xl font-medium text-white text-center px-4 leading-tight">{callerName}</h2>
        <p className="text-sm text-gray-400">
          {isPlaying ? formatTime(callTimeSeconds) : "Ready to call"}
        </p>

        {/* Waveform (GSAP Controlled) */}
        <div ref={waveformRef} className="flex h-24 w-full flex-1 items-center justify-center gap-[3px]">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 rounded-full bg-cyan-400/40"
              style={{ height: 4 }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mb-4 mt-8 grid w-full grid-cols-3 gap-4">
          <div className="flex flex-col items-center gap-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700">
              <MicOff className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white transition-colors hover:bg-gray-700">
              <Volume2 className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <PhoneOff className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
