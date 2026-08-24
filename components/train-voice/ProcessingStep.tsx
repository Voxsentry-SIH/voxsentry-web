"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { motion } from "framer-motion";

const steps = [
  "Uploading samples...",
  "Checking audio quality...",
  "Extracting voice embedding...",
  "Saving to your voice library...",
];

export default function ProcessingStep({ onComplete }: { onComplete: () => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStepIndex(i);
        // Wait between 1.5s and 2.5s for each step
        await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
      }
      setCurrentStepIndex(steps.length);
      setTimeout(onComplete, 1000);
    };

    runSteps();

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Processing Profile</h2>
        <p className="mt-3 text-muted">Building your voice fingerprint.</p>
      </div>

      <Card className="p-6 sm:p-10">
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;
            const isPending = currentStepIndex < idx;

            return (
              <div
                key={idx}
                className={`flex items-center gap-4 transition-opacity duration-300 ${
                  isPending ? "opacity-40" : "opacity-100"
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="h-6 w-6 text-safe" />
                    </motion.div>
                  ) : isCurrent ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-border" />
                  )}
                </div>
                <span
                  className={`text-base ${
                    isCurrent
                      ? "font-medium text-foreground"
                      : isCompleted
                      ? "text-foreground"
                      : "text-muted"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
