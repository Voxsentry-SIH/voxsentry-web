"use client";

import { useState, useEffect } from "react";
import PhoneCallScreen from "@/components/demo/PhoneCallScreen";
import JudgeControlPanel from "@/components/demo/JudgeControlPanel";
import VerdictCard from "@/components/demo/VerdictCard";
import RecommendedActionsPanel from "@/components/demo/RecommendedActionsPanel";
import { mockVerdicts, mockCallContexts, calculateRiskTier } from "@/lib/mockData";

export default function DemoEnvironment() {
  const [selectedId, setSelectedId] = useState<string>("1");
  const [selectedContextId, setSelectedContextId] = useState<string>("routine");
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [callTime, setCallTime] = useState(0);

  const selectedVerdict = mockVerdicts.find((v) => v.id === selectedId) || mockVerdicts[0];
  
  // Compute risk tier for Recommended Actions Panel
  const context = mockCallContexts.find(c => c.id === selectedContextId) || mockCallContexts[0];
  const rawRiskScore = selectedVerdict ? (selectedVerdict.label === "cloned" ? selectedVerdict.confidence : 100 - selectedVerdict.confidence) : 0;
  const riskTier = calculateRiskTier(rawRiskScore, context);

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
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* Left Column: The Simulated Phone */}
      <div className="flex justify-center lg:col-span-4 reveal-up">
        <PhoneCallScreen
          isPlaying={status !== "idle"}
          callerName={selectedVerdict.scenarioName}
          callTimeSeconds={callTime}
        />
      </div>

      {/* Right Column: Controls and Verdict */}
      <div className="space-y-6 lg:col-span-8 reveal-up">
        <JudgeControlPanel
          verdicts={mockVerdicts}
          selectedId={selectedId}
          selectedContextId={selectedContextId}
          onSelect={(id) => {
            setSelectedId(id);
            setStatus("idle");
            setCallTime(0);
          }}
          onSelectContext={(contextId) => {
            setSelectedContextId(contextId);
          }}
          onPlay={handlePlay}
          isPlaying={status === "analyzing" || status === "complete"}
        />

        <VerdictCard 
          status={status} 
          verdict={selectedVerdict} 
          contextId={selectedContextId} 
        />

        {status === "complete" && (
          <RecommendedActionsPanel 
            riskTier={riskTier}
            verdict={selectedVerdict}
          />
        )}
      </div>
    </div>
  );
}
