"use client";

import { useState } from "react";
import DetectionMode from "./DetectionMode";
import { Mic, Activity, Languages } from "lucide-react";

// Lazy load or simply import the other modes once they are created.
// We'll import them dynamically or directly here.
import SpeechToTextMode from "./SpeechToTextMode";
import SpeechToSpeechMode from "./SpeechToSpeechMode";

type AppMode = "detection" | "stt" | "sts";

export default function DemoEnvironment() {
  const [mode, setMode] = useState<AppMode>("detection");

  return (
    <div className="flex flex-col gap-8">
      {/* Mode Selector */}
      <div className="flex justify-center reveal-up">
        <div className="inline-flex p-1 bg-[#050514]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <button
            onClick={() => setMode("detection")}
            className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              mode === "detection"
                ? "text-white bg-white/10 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Activity className="w-4 h-4" />
            AI Voice Detection
            {mode === "detection" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-cyan-400 rounded-t-full shadow-[0_0_8px_#22d3ee]" />
            )}
          </button>

          <button
            onClick={() => setMode("stt")}
            className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              mode === "stt"
                ? "text-white bg-white/10 shadow-[inset_0_0_20px_rgba(16,185,129,0.1)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Mic className="w-4 h-4" />
            Speech to Text
            {mode === "stt" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-emerald-400 rounded-t-full shadow-[0_0_8px_#10b981]" />
            )}
          </button>

          <button
            onClick={() => setMode("sts")}
            className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
              mode === "sts"
                ? "text-white bg-white/10 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
            }`}
          >
            <Languages className="w-4 h-4" />
            Speech to Speech
            {mode === "sts" && (
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-amber-400 rounded-t-full shadow-[0_0_8px_#f59e0b]" />
            )}
          </button>
        </div>
      </div>

      {/* Mode Content - Strict Isolation */}
      <div className="w-full">
        {mode === "detection" && <DetectionMode />}
        {mode === "stt" && <SpeechToTextMode />}
        {mode === "sts" && <SpeechToSpeechMode />}
      </div>
    </div>
  );
}
