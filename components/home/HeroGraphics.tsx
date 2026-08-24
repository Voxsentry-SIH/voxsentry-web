"use client";

import dynamic from "next/dynamic";
import Soundwave from "./hero/Soundwave";
import PhoneMockup from "./hero/PhoneMockup";

// Lazy load the 3D canvas with a fallback
const ShieldCanvas = dynamic(() => import("./hero/ShieldCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 h-[600px] w-full hidden md:flex items-center justify-center opacity-50">
      <div className="w-64 h-64 bg-cyan-500/20 rounded-full blur-[60px]" />
    </div>
  ),
});

export default function HeroGraphics() {
  return (
    <div className="relative w-full h-[600px] hidden lg:block">
      {/* The continuous animated soundwave in the background */}
      <Soundwave />
      
      {/* The 3D Shield WebGL Canvas */}
      <ShieldCanvas />
      
      {/* Floating Phone Mockup */}
      <PhoneMockup />
    </div>
  );
}
