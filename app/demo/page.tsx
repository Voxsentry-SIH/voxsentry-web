"use client";

import { useState, useEffect } from "react";
import PhoneCallScreen from "@/components/demo/PhoneCallScreen";
import JudgeControlPanel from "@/components/demo/JudgeControlPanel";
import VerdictCard from "@/components/demo/VerdictCard";
import { mockVerdicts } from "@/lib/mockData";

export default function DemoPage() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [callTime, setCallTime] = useState(0);

  const selectedVerdict = mockVerdicts.find((v) => v.id === selectedId) || mockVerdicts[0];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status !== "idle") {
      interval = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handlePlay = () => {
    setStatus("analyzing");
    setCallTime(0);

    // Simulate analysis delay (latency demo)
    setTimeout(() => {
      setStatus("complete");
    }, 2500);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background-alt pb-20 pt-16 sm:pt-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Live Demo Environment
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Experience how VoxSentry analyzes incoming audio in real-time. Select a scenario and press play to simulate a phone call.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-12">
          {/* Left Column: The Simulated Phone */}
          <div className="flex justify-center lg:col-span-4">
            <PhoneCallScreen
              isPlaying={status !== "idle"}
              callerName={selectedVerdict.scenarioName}
              callTimeSeconds={callTime}
            />
          </div>

          {/* Right Column: Controls and Verdict */}
          <div className="space-y-6 lg:col-span-8">
            <JudgeControlPanel
              verdicts={mockVerdicts}
              selectedId={selectedId}
              onSelect={(id) => {
                setSelectedId(id);
                setStatus("idle");
                setCallTime(0);
              }}
              onPlay={handlePlay}
              isPlaying={status === "analyzing" || status === "complete"}
            />

            <VerdictCard status={status} verdict={selectedVerdict} />
          </div>
        </div>
      </div>
    </main>
  );
}
