"use client";

import { Mic, AudioWaveform, BrainCircuit, Fingerprint, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load the 3D canvas with a fallback
const SpectrogramCanvas = dynamic(() => import("./how-it-works/SpectrogramCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-[#050510] hidden sm:flex items-center justify-center rounded-b-2xl">
      <div className="w-full h-32 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.2),transparent_70%)] blur-2xl" />
    </div>
  ),
});

const cards = [
  {
    step: "STEP 01",
    title: "Audio Capture",
    description: "VoxSentry securely intercepts microphone input at the OS level during live calls, completely on-device.",
    Icon: Mic,
  },
  {
    id: "center-canvas",
    // This represents the 3D spectrogram center card
  },
  {
    step: "STEP 02",
    title: "Feature Extraction",
    description: "Audio is converted into mel-spectrograms and voice embeddings, isolating the unique vocal tract characteristics.",
    Icon: AudioWaveform,
  },
  {
    step: "STEP 03",
    title: "AI Analysis",
    description: "Our proprietary neural network analyzes the features against known synthetic voice signatures and deepfake artifacts.",
    Icon: BrainCircuit,
  },
  {
    step: "STEP 04",
    title: "Identity Verification",
    description: "If enabled, the voice embedding is compared against your securely stored Voice Library to verify known contacts.",
    Icon: Fingerprint,
  },
  {
    step: "STEP 05",
    title: "Instant Verdict",
    description: "A real-time safety score is generated. High-risk calls trigger immediate on-screen alerts before you can be scammed.",
    Icon: ShieldAlert,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative w-full bg-[#050514] py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Subtle Circuit/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            How VoxSentry Works
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Our pipeline analyzes audio in milliseconds without leaving your device.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            if (card.id === "center-canvas") {
              return (
                <motion.div 
                  key="center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="glass-card rounded-2xl flex flex-col h-[320px] overflow-hidden lg:order-none order-first"
                >
                  {/* macOS style window header */}
                  <div className="h-10 border-b border-cyan-400/10 bg-white/5 flex items-center px-4 gap-2 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-500">spectrogram_viz.exe</span>
                  </div>
                  {/* 3D Canvas Area */}
                  <div className="relative flex-1 bg-[#050510]">
                    <SpectrogramCanvas />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050510] via-transparent to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              );
            }

            const Icon = card.Icon!;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="glass-card rounded-2xl p-8 flex flex-col justify-start h-full"
              >
                <div className="glow-badge h-14 w-14 mb-6">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                {card.step && (
                  <span className="text-[10px] font-bold tracking-widest text-cyan-400 mb-2">
                    {card.step}
                  </span>
                )}
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
