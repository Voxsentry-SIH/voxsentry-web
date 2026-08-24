"use client";

import { Mic, ShieldCheck, Plus, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function VoiceLibrary({ onAddVoice }: { onAddVoice: () => void }) {
  // Local mock state for profiles. Always assumes "Myself" exists if we hit this page after training.
  const profiles = [
    { id: 1, name: "Myself", samples: 5, date: "Just now" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto w-full max-w-5xl relative z-10">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Voice Library</h2>
          <p className="mt-2 text-slate-400">Manage your trained mathematical voice profiles.</p>
        </div>
      </div>

      <motion.div 
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            variants={itemVariants}
            className="glass-card flex flex-col rounded-3xl p-6 shadow-xl border-cyan-400/30 bg-[#050514]/60 transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)]"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="glow-badge flex h-14 w-14 items-center justify-center rounded-full">
                <Mic className="h-6 w-6 text-cyan-400" />
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1.5 text-xs font-semibold text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <ShieldCheck className="h-4 w-4" />
                Verified
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h3>
            <div className="mt-3 text-sm text-slate-400 space-y-1">
              <p>{profile.samples} samples recorded</p>
              <p>Trained: {profile.date}</p>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 mt-auto">
              <Link href="/demo?profile=myself" className="block">
                <button className="btn-outline flex w-full justify-center items-center gap-2 py-3 text-sm text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10">
                  <Play className="h-4 w-4 fill-current" />
                  Test this voice
                </button>
              </Link>
            </div>
          </motion.div>
        ))}

        <motion.button
          variants={itemVariants}
          onClick={onAddVoice}
          className="group flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/20 bg-[#050514]/40 p-8 transition-all hover:border-cyan-400/60 hover:bg-[#050514]/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
        >
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">Add New Voice</h3>
          <p className="mt-2 text-center text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
            Enroll a family member or another trusted voice.
          </p>
        </motion.button>
      </motion.div>
    </div>
  );
}
