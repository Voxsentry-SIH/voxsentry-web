"use client";

import { Play, UploadCloud } from "lucide-react";
import { MockVerdict } from "@/lib/mockData";

export default function JudgeControlPanel({
  verdicts,
  selectedId,
  onSelect,
  onPlay,
  isPlaying,
}: {
  verdicts: MockVerdict[];
  selectedId: string;
  onSelect: (id: string) => void;
  onPlay: () => void;
  isPlaying: boolean;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
      <div>
        <h3 className="mb-6 text-xl font-bold text-white tracking-tight">Judge Control Panel</h3>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Select Audio Clip Scenario
            </label>
            <div className="relative group">
              <select
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#050514]/60 px-4 py-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                value={selectedId}
                onChange={(e) => onSelect(e.target.value)}
                disabled={isPlaying}
              >
                {verdicts.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#111827]">
                    {v.scenarioName} ({v.label === "real" ? "Real Voice" : "Cloned Voice"})
                  </option>
                ))}
              </select>
              {/* Custom select arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          className={`${isPlaying ? "btn-outline opacity-70 cursor-not-allowed" : "btn-primary"} flex flex-1 items-center justify-center gap-3 py-4 text-sm`}
          onClick={onPlay}
          disabled={isPlaying}
        >
          <Play className="h-5 w-5 fill-current" />
          {isPlaying ? "Simulating Call..." : "Play Scenario"}
        </button>

        <button
          className="btn-outline flex items-center justify-center px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPlaying}
        >
          <UploadCloud className="h-5 w-5" />
          <span className="sr-only sm:not-sr-only sm:ml-2 text-sm">Upload</span>
        </button>
      </div>
    </div>
  );
}
