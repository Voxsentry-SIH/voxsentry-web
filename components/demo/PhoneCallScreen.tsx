"use client";

import { User, PhoneOff, MicOff, Volume2 } from "lucide-react";
import { motion } from "framer-motion";

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

  return (
    <div className="relative mx-auto flex h-[600px] w-full max-w-[320px] flex-col items-center overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-gray-900 px-6 py-12 shadow-2xl">
      {/* Indigo Bubble (VoxSentry overlay) */}
      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/20 shadow-[0_0_15px_rgba(79,70,229,0.5)] backdrop-blur-md">
        <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
      </div>

      <div className="mb-6 mt-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-800">
        <User className="h-12 w-12 text-gray-400" />
      </div>

      <h2 className="mb-2 text-2xl font-medium text-white text-center px-4 leading-tight">{callerName}</h2>
      <p className="text-sm text-gray-400">
        {isPlaying ? formatTime(callTimeSeconds) : "Ready to call"}
      </p>

      {/* Waveform */}
      <div className="flex h-24 w-full flex-1 items-center justify-center gap-1">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1.5 rounded-full bg-white/40"
            initial={{ height: 4 }}
            animate={
              isPlaying
                ? { height: [4, Math.random() * 60 + 10, 4] }
                : { height: 4 }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.6 + Math.random() * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.05,
                  }
                : {}
            }
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
          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500 text-white transition-colors hover:bg-red-600">
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
