"use client";

import Link from "next/link";
import { Play, Download, Shield } from "lucide-react";
import { motion, Variants } from "framer-motion";

import HeroGraphics from "./HeroGraphics";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-28 md:pt-32 pb-16 lg:pb-24 min-h-[calc(100vh-80px)] flex items-center">
      {/* Background Graphic Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        {/* Soft radial glow centered behind the shield/centerpiece */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),rgba(168,85,247,0.15),transparent_70%)] blur-[60px]" />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & CTA */}
          <motion.div 
            className="flex flex-col items-start max-w-xl relative z-30"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-400 mb-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <Shield className="h-4 w-4" />
              AI Voice Security
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Stop Voice-Cloning Scams Before They Cost You
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-300 mb-10 leading-relaxed font-light"
            >
              Detect AI voice scams and deepfake calls in real-time. Protect your conversations, your money, and your identity.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
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
            </motion.div>
          </motion.div>

          {/* Right Column: Graphics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center mt-8 lg:mt-0"
          >
            <HeroGraphics />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
