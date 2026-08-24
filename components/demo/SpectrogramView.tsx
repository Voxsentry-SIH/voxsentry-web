"use client";

import { motion } from "framer-motion";

export default function SpectrogramView({ isAnalyzing, isComplete }: { isAnalyzing: boolean; isComplete: boolean }) {
  return (
    <div className="relative flex h-32 w-full items-end overflow-hidden rounded-xl border border-gray-800 bg-gray-900">
      <div className="flex h-full w-full items-end gap-[1px] px-2 pb-2">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-primary to-indigo-300"
            initial={{ height: 4 }}
            animate={
              isAnalyzing
                ? {
                    height: [4, Math.random() * 80 + 20, 4],
                    opacity: [0.6, 1, 0.6],
                  }
                : isComplete
                ? {
                    height: Math.random() * 60 + 20,
                    opacity: 0.9,
                  }
                : { height: 4, opacity: 0.3 }
            }
            transition={
              isAnalyzing
                ? {
                    duration: Math.random() * 0.5 + 0.4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: i * 0.02,
                  }
                : { duration: 0.5 }
            }
          />
        ))}
      </div>
      {isAnalyzing && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          style={{ animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
        />
      )}
    </div>
  );
}
