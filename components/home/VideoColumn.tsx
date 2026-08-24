"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useIsVisible } from "@/hooks/useIsVisible";

gsap.registerPlugin(ScrollTrigger);

export default function VideoColumn() {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      // Reveal animations
      gsap.from(".reveal-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      gsap.from(".reveal-scale", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-transparent overflow-hidden z-10">
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Phone Mockup */}
          <div className="reveal-up relative mx-auto w-full max-w-[340px] flex justify-center group">
            {/* Optimized Glow behind phone */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-blue-500/30 blur-[60px] rounded-full -z-10 h-[120%] w-[120%] -left-[10%] -top-[10%] transform-gpu will-change-transform" />
            
            <div className="relative w-full overflow-hidden rounded-[3rem] border-[8px] border-[#111827] bg-[#111827] shadow-2xl">
              {/* Fake Phone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                 <div className="w-32 h-6 bg-[#111827] rounded-b-3xl" />
              </div>
              
              <video
                className="w-full h-full object-cover scale-[1.02]"
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/homepage-poster.jpg"
              >
                <source src="/videos/homepage-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Right Column: Giant Stats */}
          <div className="flex flex-col justify-center">
            
            {/* Big Stat */}
            <div className="reveal-scale mb-8">
               <h2 className="text-[6rem] sm:text-[8rem] font-bold leading-none tracking-tighter text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] transform-gpu">
                 98.7%
               </h2>
               <h3 className="text-4xl sm:text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-400 to-indigo-400 uppercase mt-[-10px]">
                 Accuracy
               </h3>
            </div>

            {/* Sub Stats */}
            <div className="reveal-up grid grid-cols-2 gap-8 mb-16">
              <div>
                 <div className="text-4xl sm:text-5xl font-bold text-white mb-2">&lt;200ms</div>
                 <div className="text-sm font-semibold tracking-widest text-slate-400 uppercase">Latency</div>
              </div>
              <div>
                 <div className="text-4xl sm:text-5xl font-bold text-white mb-2">50K+</div>
                 <div className="text-sm font-semibold tracking-widest text-slate-400 uppercase">Voice Profiles</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
