"use client";

import { useState, useEffect, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

const steps = [
  "Uploading samples...",
  "Checking audio quality...",
  "Extracting voice embedding...",
  "Saving to your voice library...",
];

export default function ProcessingStep({ samples, onComplete }: { samples: Blob[], onComplete: () => void }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const runSteps = async () => {
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
          // Mock behavior
          for (let i = 0; i < steps.length; i++) {
            setCurrentStepIndex(i);
            await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));
          }
          setCurrentStepIndex(steps.length);
          timeout = setTimeout(onComplete, 1000);
          return;
        }

        const userId = localStorage.getItem("voxsentry_auth") || "guest";
        const profileName = "Myself"; // In a full app, prompt for this

        // 1. Uploading
        setCurrentStepIndex(0);
        const formData = new FormData();
        formData.append("user_id", userId);
        formData.append("profile_name", profileName);
        samples.forEach((blob, idx) => {
          formData.append("files", blob, `sample_${idx}.wav`);
        });

        // 2 & 3. Wait for backend to extract embeddings
        setCurrentStepIndex(1); // Jump to extracting in UI
        const response = await fetch("/api/enroll", {
          method: "POST",
          body: formData
        });

        if (!response.ok) {
          throw new Error("Enrollment service unavailable.");
        }

        // 4. Saved
        setCurrentStepIndex(3);
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        setCurrentStepIndex(steps.length);
        timeout = setTimeout(onComplete, 1000);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to process voice profile.");
      }
    };

    runSteps();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [onComplete, samples]);

  useEffect(() => {
    if (!backgroundRef.current) return;
    
    // Animate intensely during the API request
    const isExtracting = currentStepIndex === 1 || currentStepIndex === 2;
    
    const ctx = gsap.context(() => {
      if (isExtracting) {
        gsap.to(backgroundRef.current, {
          backgroundPosition: "100% 100%",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, backgroundRef);
    
    return () => ctx.revert();
  }, [currentStepIndex]);

  return (
    <div className="mx-auto w-full max-w-md relative z-10">
      
      {/* GSAP animated background glow */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 -z-10 blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle at 0% 0%, #22D3EE, transparent 50%), radial-gradient(circle at 100% 100%, #A855F7, transparent 50%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "0% 0%"
        }}
      />

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Processing Profile</h2>
        <p className="mt-3 text-slate-400">Building your mathematical voice fingerprint.</p>
      </div>

      <div className="glass-card p-8 sm:p-12 rounded-3xl shadow-2xl">
        {error ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-red-500/10 p-4 border border-red-500/30">
              <span className="text-red-400 font-bold text-xl">X</span>
            </div>
            <p className="text-red-400 font-semibold mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-outline px-6 py-2 text-sm text-slate-300"
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {steps.map((step, idx) => {
              const isCompleted = currentStepIndex > idx;
              const isCurrent = currentStepIndex === idx;
              const isPending = currentStepIndex < idx;

              return (
                 <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center">
                    {isCompleted ? (
                      <motion.div 
                        initial={{ scale: 0, rotate: -90 }} 
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glow-badge rounded-full"
                      >
                        <CheckCircle2 className="h-7 w-7 text-cyan-400" />
                      </motion.div>
                    ) : isCurrent ? (
                      <div className="h-8 w-8 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                      </div>
                    ) : (
                      <div className="h-3 w-3 rounded-full bg-white/20" />
                    )}
                  </div>
                  <span
                    className={`text-lg ${
                      isCurrent
                        ? "font-semibold text-white drop-shadow-md"
                        : isCompleted
                        ? "text-slate-300"
                        : "text-slate-600"
                    }`}
                  >
                    {step}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
