"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  { name: "Sarah J.", role: "Small Business Owner", text: "VoxSentry caught a fake invoice call that sounded exactly like my vendor." },
  { name: "Michael T.", role: "Security Analyst", text: "The latency is incredibly low. True real-time analysis on edge devices." },
  { name: "Elena R.", role: "Parent", text: "Saved me from the 'family emergency' scam. Best peace of mind app." },
  { name: "David K.", role: "IT Director", text: "We deploy this to all executive devices. The accuracy is unmatched." },
  { name: "Sarah J.", role: "Small Business Owner", text: "VoxSentry caught a fake invoice call that sounded exactly like my vendor." }, // Duplicated for seamless loop
  { name: "Michael T.", role: "Security Analyst", text: "The latency is incredibly low. True real-time analysis on edge devices." },
];

export default function TestimonialMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate height of the scroll content to determine animation distance
    const totalHeight = containerRef.current.scrollHeight / 2;

    const ctx = gsap.context(() => {
      const tween = gsap.to(containerRef.current, {
        y: -totalHeight,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      containerRef.current?.addEventListener("mouseenter", () => tween.pause());
      containerRef.current?.addEventListener("mouseleave", () => tween.play());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute right-[-10%] top-[-10%] h-[120%] w-[320px] overflow-hidden hidden lg:block opacity-60">
      {/* Top and bottom gradient masks for smooth fade in/out */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A1F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A1F] to-transparent z-10 pointer-events-none" />
      
      <div ref={containerRef} className="flex flex-col gap-6 pt-10">
        {testimonials.map((t, i) => (
          <div key={i} className="glass-card p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
                <span className="text-sm font-bold text-cyan-400">{t.name[0]}</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{t.name}</div>
                <div className="text-xs text-slate-400">{t.role}</div>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              &quot;{t.text}&quot;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
