import Link from "next/link";
import { Play, Download, Shield } from "lucide-react";

import HeroGraphics from "./HeroGraphics";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-32 pb-24 min-h-screen flex items-center">
      {/* Background Graphic Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        {/* Soft radial glow centered behind the shield/centerpiece */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),rgba(168,85,247,0.15),transparent_70%)] blur-[60px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[600px]">
          
          {/* Left Column: Copy & CTA */}
          <div className="flex flex-col items-start max-w-xl relative z-30">
            <div className="reveal-up inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-400 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Shield className="h-4 w-4" />
              AI Voice Security
            </div>
            
            <h1 className="reveal-up text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-[4.5rem] leading-[1.1] mb-6">
              Stop Voice-Cloning Scams Before They Cost You
            </h1>
            
            <p className="reveal-up text-lg text-slate-300 mb-10 leading-relaxed font-light">
              Detect AI voice scams and deepfake calls in real-time. Protect your conversations, your money, and your identity.
            </p>
            
            <div className="reveal-up flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/download" className="w-full sm:w-auto group">
                <button className="btn-primary w-full flex items-center justify-center gap-2 h-14 px-8 text-base">
                  <Download className="h-5 w-5" />
                  Download App
                </button>
              </Link>
              <Link href="/demo" className="w-full sm:w-auto group">
                <button className="btn-outline w-full flex items-center justify-center gap-2 h-14 px-8 text-base">
                  <Play className="h-5 w-5 fill-current" />
                  Try Live Demo
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Scene & Floating GSAP Elements */}
          <HeroGraphics />
        </div>
      </div>
    </section>
  );
}
