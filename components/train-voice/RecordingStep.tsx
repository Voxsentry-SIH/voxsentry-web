"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, RefreshCcw, ArrowRight, AlertCircle } from "lucide-react";
import { mockTrainingPrompts } from "@/lib/mockData";
import gsap from "gsap";
import { useIsVisible } from "@/hooks/useIsVisible";

export default function RecordingStep({
  onComplete,
  onCancel,
}: {
  onComplete: (samples: Blob[]) => void;
  onCancel: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Store all recorded blobs
  const [recordedSamples, setRecordedSamples] = useState<Blob[]>([]);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const waveformRef = useRef<HTMLDivElement>(null);
  const recordBtnRef = useRef<HTMLButtonElement>(null);

  const currentPrompt = mockTrainingPrompts[stepIndex];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, "100px");
  const [animation, setAnimation] = useState<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!waveformRef.current) return;
    const bars = waveformRef.current.children;
    
    let ctx = gsap.context(() => {
      if (isRecording) {
        // Continuous staggered random heights when recording
        const tween = gsap.to(bars, {
          height: () => Math.random() * 40 + 10,
          duration: () => 0.4 + Math.random() * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.05,
            from: "random"
          }
        });
        setAnimation(tween);
      } else if (hasRecorded) {
        if (animation) animation.kill();
        gsap.to(bars, {
          height: 24,
          duration: 0.5,
          ease: "power2.out"
        });
        setAnimation(null);
      } else {
        if (animation) animation.kill();
        // Reset to default height when stopped
        gsap.to(bars, {
          height: 4,
          duration: 0.3,
          ease: "power2.out"
        });
        setAnimation(null);
      }
    }, waveformRef);

    return () => {
      if (animation) animation.kill();
      ctx.revert();
    };
  }, [isRecording, hasRecorded]);
  
  useEffect(() => {
    if (!animation) return;
    if (isVisible) {
      animation.play();
    } else {
      animation.pause();
    }
  }, [isVisible, animation]);

  useEffect(() => {
    if (isRecording && recordBtnRef.current) {
      const ctx = gsap.context(() => {
        gsap.to(recordBtnRef.current, {
          boxShadow: "0 0 25px rgba(239,68,68,0.6)",
          scale: 1.05,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }, recordBtnRef);
      return () => ctx.revert();
    }
  }, [isRecording]);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Save to our array for this specific step
        setRecordedSamples(prev => {
          const newSamples = [...prev];
          newSamples[stepIndex] = audioBlob;
          return newSamples;
        });
        
        setHasRecorded(true);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setHasRecorded(false);
      setAudioUrl(null);
    } catch (err) {
      console.error(err);
      setError(
        "Microphone permission denied or device not found. Please allow microphone access in your browser settings to continue."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleNext = () => {
    if (stepIndex < mockTrainingPrompts.length - 1) {
      setStepIndex((prev) => prev + 1);
      setHasRecorded(false);
      setAudioUrl(null);
    } else {
      onComplete(recordedSamples);
    }
  };

  const handleReRecord = () => {
    setHasRecorded(false);
    setAudioUrl(null);
  };

  return (
    <div className="mx-auto w-full max-w-2xl relative z-10">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">
          Record Sample {stepIndex + 1} of {mockTrainingPrompts.length}
        </h2>
        <div className="mt-6 flex gap-3">
          {mockTrainingPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                idx === stepIndex
                  ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] scale-125"
                  : idx < stepIndex
                  ? "bg-cyan-400/40"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="glass-card flex flex-col items-center p-8 sm:p-12 rounded-3xl shadow-2xl">
        {error ? (
          <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-400">
            <AlertCircle className="mx-auto mb-3 h-10 w-10 opacity-80" />
            <p className="leading-relaxed">{error}</p>
            <button className="btn-outline mt-6 px-6 py-2" onClick={() => setError(null)}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-center text-sm font-medium text-slate-400 uppercase tracking-widest">
              Please read the following sentence naturally
            </p>
            <div className="mb-12 w-full rounded-2xl bg-[#050514]/60 border border-white/5 p-8 text-center shadow-inner">
              <p className="text-2xl font-medium leading-relaxed text-white">
                &quot;{currentPrompt}&quot;
              </p>
            </div>

            {/* Waveform Visualization (GSAP) */}
            <div ref={waveformRef} className="mb-10 flex h-16 w-full max-w-xs items-center justify-center gap-1.5">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-colors duration-300 ${
                    isRecording
                      ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]"
                      : hasRecorded
                      ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                      : "bg-white/20"
                  }`}
                  style={{ height: 4 }}
                />
              ))}
            </div>

            {!hasRecorded && !isRecording && (
              <button
                onClick={startRecording}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 transition-all hover:bg-cyan-400/20 hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.2)]"
              >
                <Mic className="h-8 w-8" />
              </button>
            )}

            {isRecording && (
              <button
                ref={recordBtnRef}
                onClick={stopRecording}
                className="glow-badge flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 border border-red-500/50 text-red-500"
              >
                <Square className="h-6 w-6 fill-current" />
              </button>
            )}

            {hasRecorded && (
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center mt-4">
                <button
                  onClick={handleReRecord}
                  className="btn-outline flex items-center justify-center gap-2 px-6 py-3.5"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Re-record
                </button>
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center justify-center gap-2 px-8 py-3.5"
                >
                  {stepIndex === mockTrainingPrompts.length - 1
                    ? "Finish Recording"
                    : "Next Sample"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {hasRecorded && audioUrl && (
              <audio src={audioUrl} controls className="mt-8 h-12 w-full max-w-xs opacity-70 sepia hue-rotate-180" />
            )}
          </>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={onCancel} className="text-sm font-medium text-slate-500 hover:text-slate-300 transition-colors">
          Cancel training
        </button>
      </div>
    </div>
  );
}
