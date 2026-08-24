"use client";

import { Play, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";
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
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Control Panel</h3>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Select Audio Clip Scenario
          </label>
          <select
            className="w-full rounded-lg border border-border bg-background-alt px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
            disabled={isPlaying}
          >
            {verdicts.map((v) => (
              <option key={v.id} value={v.id}>
                {v.scenarioName} ({v.label === "real" ? "Real Voice" : "Cloned Voice"})
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex flex-1 items-center justify-center gap-2"
            onClick={onPlay}
            disabled={isPlaying}
          >
            <Play className="h-4 w-4" />
            {isPlaying ? "Simulating Call..." : "Play into call"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2"
            disabled={isPlaying}
          >
            <UploadCloud className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Upload</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
