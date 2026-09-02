"use client";

import { useState, useEffect } from "react";
import PhoneCallScreen from "@/components/demo/PhoneCallScreen";
import JudgeControlPanel from "@/components/demo/JudgeControlPanel";
import VerdictCard from "@/components/demo/VerdictCard";
import RecommendedActionsPanel from "@/components/demo/RecommendedActionsPanel";
import LiveDemoModeSelector, { DemoMode } from "@/components/demo/LiveDemoModeSelector";
import SpeechToTextMode from "@/components/demo/SpeechToTextMode";
import SpeechToSpeechMode from "@/components/demo/SpeechToSpeechMode";
import { mockVerdicts, mockCallContexts, calculateRiskTier, MockVerdict } from "@/lib/mockData";
import { audioManager } from "@/lib/audioManager";
import { motion, AnimatePresence } from "framer-motion";

export default function DemoEnvironment() {
  const [activeMode, setActiveMode] = useState<DemoMode>("detect");
  
  const [selectedId, setSelectedId] = useState<string>("1");
  const [selectedContextId, setSelectedContextId] = useState<string>("routine");
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [callTime, setCallTime] = useState(0);
  const [liveVerdictResult, setLiveVerdictResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [customFile, setCustomFile] = useState<File | null>(null);
  const [customVerdictOption, setCustomVerdictOption] = useState<MockVerdict | null>(null);

  const availableVerdicts = customVerdictOption ? [...mockVerdicts, customVerdictOption] : mockVerdicts;
  const mockSelectedVerdict = availableVerdicts.find((v) => v.id === selectedId) || mockVerdicts[0];
  
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
    if (status === "analyzing" && activeMode === "detect") {
      interval = setInterval(() => {
        setCallTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, activeMode]);

  const handleUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setCustomFile(file);
    setCustomVerdictOption({
      id: "custom",
      label: "real", // default until analyzed
      confidence: 0,
      scenarioName: `Custom Upload (${file.name})`,
      audioFile: url,
      recommendedAction: "Analysis required.",
    });
    setSelectedId("custom");
    setStatus("idle");
    setLiveVerdictResult(null);
    setError(null);
  };

  const handlePlay = async () => {
    setStatus("analyzing");
    setCallTime(0);
    setError(null);
    setLiveVerdictResult(null);

    // If using mock data fallback (for hosted demo without a live backend)
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
      setTimeout(() => {
        if (selectedId === "custom") {
          // Mock a random verdict for the custom uploaded file
          const isCloned = Math.random() > 0.5;
          setLiveVerdictResult({
            id: "custom",
            label: isCloned ? "cloned" : "real",
            confidence: isCloned ? 85 + Math.random() * 14 : 90 + Math.random() * 9,
            scenarioName: customVerdictOption?.scenarioName || "Custom Upload", 
            audioFile: customVerdictOption?.audioFile || "",
            recommendedAction: isCloned ? "High risk detected. Hang up immediately." : "Low risk. Proceed with caution.",
          });
        }
        setStatus("complete");
      }, 800);
      return;
    }

    try {
      let audioBlob: Blob;
      let filename = "audio.wav";
      
      if (selectedId === "custom" && customFile) {
        audioBlob = customFile;
        filename = customFile.name;
      } else {
        // 1. Fetch the audio blob from the public folder
        const audioUrl = mockSelectedVerdict.audioFile;
        const fileResponse = await fetch(audioUrl);
        if (!fileResponse.ok) throw new Error("Failed to load audio sample");
        audioBlob = await fileResponse.blob();
        filename = audioUrl.split("/").pop() || "audio.wav";
      }

      // 2. Create FormData
      const formData = new FormData();
      formData.append("file", audioBlob, filename);

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
        label: result.verdict, // "spoof" mapped to "cloned" in UI if needed
        confidence: result.confidence,
        scenarioName: mockSelectedVerdict.scenarioName, 
        audioFile: mockSelectedVerdict.audioFile,
        recommendedAction: result.verdict === "spoof" ? "High risk detected. Hang up immediately." : "Low risk. Proceed with caution.",
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

  const handleModeChange = (mode: DemoMode) => {
    setActiveMode(mode);
    audioManager.stopAll();
    
    // Reset detection state when leaving detection mode, optional but cleaner
    if (mode !== "detect" && status === "analyzing") {
      setStatus("idle");
      setCallTime(0);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <LiveDemoModeSelector activeMode={activeMode} onModeChange={handleModeChange} />

      <div className="w-full relative">
        <AnimatePresence mode="wait">
          
          {activeMode === "detect" && (
            <motion.div
              key="detect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid items-start gap-8 lg:grid-cols-12 w-full"
            >
              {/* Left Column: The Simulated Phone */}
              <div className="flex justify-center lg:col-span-4 reveal-up">
                <PhoneCallScreen
                  isPlaying={status !== "idle"}
                  callerName={displayVerdict.scenarioName}
                  callTimeSeconds={callTime}
                  audioUrl={displayVerdict.audioFile}
                />
              </div>

              {/* Right Column: Controls and Verdict */}
              <div className="space-y-6 lg:col-span-8 reveal-up">
                <JudgeControlPanel
                  verdicts={availableVerdicts}
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
                  onUpload={handleUpload}
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
            </motion.div>
          )}

          {activeMode === "stt" && (
            <motion.div
              key="stt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <SpeechToTextMode />
            </motion.div>
          )}

          {activeMode === "sts" && (
            <motion.div
              key="sts"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <SpeechToSpeechMode />
            </motion.div>
          )}
          
        </AnimatePresence>
      </div>
    </div>
  );
}
