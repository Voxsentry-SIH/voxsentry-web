"use client";

import dynamic from "next/dynamic";
import Soundwave from "./hero/Soundwave";
import PhoneMockup from "./hero/PhoneMockup";
import AnalysisCone from "./hero/AnalysisCone";

export default function HeroGraphics() {
  return (
    <div className="relative w-full h-[500px] sm:h-[560px] lg:h-[640px] flex items-center justify-center mt-6 lg:mt-0">
      {/* The AI Analysis Cone Background Inverted Funnel */}
      <AnalysisCone />

      {/* The continuous animated soundwave in the background */}
      <Soundwave />
      
      {/* Floating Phone Mockup */}
      <PhoneMockup />
    </div>
  );
}
