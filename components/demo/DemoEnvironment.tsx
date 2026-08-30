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
  const [liveVerdictResult, setLiveVerdictResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const mockSelectedVerdict = mockVerdicts.find((v) => v.id === selectedId) || mockVerdicts[0];
  
  // Use live result if available for this selection, otherwise fallback to mock for display
  const activeVerdict = (liveVerdictResult && liveVerdictResult.id === selectedId) 
    ? liveVerdictResult 
    : mockSelectedVerdict;
  
  // Compute risk tier for Recommended Actions Panel
  const context = mockCallContexts.find(c => c.id === selectedContextId) || mockCallContexts[0];
  const rawRiskScore = activeVerdict ? (activeVerdict.label === "cloned" ? activeVerdict.confidence : 100 - activeVerdict.confidence) : 0;
  const riskTier = calculateRiskTier(rawRiskScore, context);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "analyzing") {
      interval = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handlePlay = async () => {
    setStatus("analyzing");
    setCallTime(0);
    setError(null);
    setLiveVerdictResult(null);

    // If using mock data fallback
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      setTimeout(() => {
        setStatus("complete");
      }, 2500);
      return;
    }

    try {
      // 1. Fetch the audio blob from the public folder
      const audioUrl = mockSelectedVerdict.audioFile;
      const fileResponse = await fetch(audioUrl);
      if (!fileResponse.ok) throw new Error("Failed to load audio sample");
      const audioBlob = await fileResponse.blob();

      // 2. Create FormData
      const formData = new FormData();
      formData.append("file", audioBlob, audioUrl.split("/").pop());

      // 3. POST to /api/analyze
      const apiResponse = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!apiResponse.ok) {
        throw new Error("Detection service unavailable");
      }

      const result = await apiResponse.json();
      
      setLiveVerdictResult({
        id: selectedId,
        label: result.verdict, // "spoof" mapped to "cloned" in UI if needed, wait backend returns "spoof" or "bonafide"
        // Map backend verdict terminology to frontend
        confidence: result.confidence,
        scenarioName: mockSelectedVerdict.scenarioName, 
        audioFile: mockSelectedVerdict.audioFile,
        recommendedAction: mockSelectedVerdict.recommendedAction
      });
      
      setStatus("complete");
    } catch (err: any) {
      console.error("Dialer Demo Error:", err);
      setError(err.message || "Detection service unavailable");
      setStatus("idle");
    }
  };

  // Map backend's 'spoof'/'bonafide' to frontend's 'cloned'/'real'
  const displayVerdict = {
    ...activeVerdict,
    label: activeVerdict.label === "spoof" ? "cloned" : activeVerdict.label === "bonafide" ? "real" : activeVerdict.label
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      {/* Left Column: The Simulated Phone */}
      <div className="flex justify-center lg:col-span-4 reveal-up">
        <PhoneCallScreen
          isPlaying={status !== "idle"}
          callerName={displayVerdict.scenarioName}
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
            setError(null);
          }}
          onSelectContext={(contextId) => {
            setSelectedContextId(contextId);
          }}
          onPlay={handlePlay}
          isPlaying={status === "analyzing"}
        />

        {error ? (
          <div className="glass-card border-red-500/50 bg-red-500/10 p-6 rounded-2xl flex items-center justify-center text-red-400 font-semibold h-48">
            {error}
          </div>
        ) : (
          <VerdictCard 
            status={status} 
            verdict={displayVerdict} 
            contextId={selectedContextId} 
          />
        )}

        {status === "complete" && !error && (
          <RecommendedActionsPanel 
            riskTier={riskTier}
            verdict={displayVerdict}
          />
        )}
      </div>
    </div>
  );
}
