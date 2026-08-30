"use client";

import { useState } from "react";
import ConsentStep from "@/components/train-voice/ConsentStep";
import RecordingStep from "@/components/train-voice/RecordingStep";
import ProcessingStep from "@/components/train-voice/ProcessingStep";
import VoiceLibrary from "@/components/train-voice/VoiceLibrary";

type FlowState = "library" | "consent" | "recording" | "processing";

export default function TrainVoiceFlow() {
  const [currentStep, setCurrentStep] = useState<FlowState>("library");
  const [recordedSamples, setRecordedSamples] = useState<Blob[]>([]);

  const renderStep = () => {
    switch (currentStep) {
      case "library":
        return <VoiceLibrary onAddVoice={() => setCurrentStep("consent")} />;
      case "consent":
        return (
          <ConsentStep
            onAgree={() => setCurrentStep("recording")}
            onCancel={() => setCurrentStep("library")}
          />
        );
      case "recording":
        return (
          <RecordingStep
            onComplete={(samples) => {
              setRecordedSamples(samples);
              setCurrentStep("processing");
            }}
            onCancel={() => setCurrentStep("library")}
          />
        );
      case "processing":
        return <ProcessingStep samples={recordedSamples} onComplete={() => setCurrentStep("library")} />;
    }
  };

  return <>{renderStep()}</>;
}
