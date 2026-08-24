"use client";

import { useState, useRef } from "react";
import { Mic, Square, RefreshCcw, ArrowRight, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { mockTrainingPrompts } from "@/lib/mockData";
import { motion } from "framer-motion";

export default function RecordingStep({
  onComplete,
  onCancel,
}: {
  onComplete: () => void;
  onCancel: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentPrompt = mockTrainingPrompts[stepIndex];

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
      onComplete();
    }
  };

  const handleReRecord = () => {
    setHasRecorded(false);
    setAudioUrl(null);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Record Sample {stepIndex + 1} of {mockTrainingPrompts.length}
        </h2>
        <div className="mt-4 flex gap-2">
          {mockTrainingPrompts.map((_, idx) => (
            <div
              key={idx}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                idx === stepIndex
                  ? "bg-primary"
                  : idx < stepIndex
                  ? "bg-primary/40"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <Card className="flex flex-col items-center p-6 sm:p-10">
        {error ? (
          <div className="mb-8 rounded-lg border border-danger/20 bg-danger/10 p-4 text-center text-danger">
            <AlertCircle className="mx-auto mb-2 h-8 w-8" />
            <p>{error}</p>
            <Button variant="outline" className="mt-4" onClick={() => setError(null)}>
              Try Again
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-8 text-center text-sm text-muted">
              Please read the following sentence naturally:
            </p>
            <div className="mb-12 w-full rounded-xl bg-background-alt p-6 text-center shadow-inner">
              <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                &quot;{currentPrompt}&quot;
              </p>
            </div>

            {/* Waveform Visualization (mocked with CSS) */}
            <div className="mb-10 flex h-16 w-full max-w-xs items-center justify-center gap-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 rounded-full ${
                    isRecording
                      ? "bg-danger"
                      : hasRecorded
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                  initial={{ height: 4 }}
                  animate={
                    isRecording
                      ? { height: [4, Math.random() * 40 + 10, 4] }
                      : hasRecorded
                      ? { height: 24 }
                      : { height: 4 }
                  }
                  transition={
                    isRecording
                      ? {
                          duration: 0.5 + Math.random() * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.05,
                        }
                      : { duration: 0.3 }
                  }
                />
              ))}
            </div>

            {!hasRecorded && !isRecording && (
              <Button
                onClick={startRecording}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary p-0 hover:bg-primary-dark"
              >
                <Mic className="h-6 w-6 text-white" />
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-danger p-0 hover:bg-danger/80"
              >
                <Square className="h-5 w-5 fill-white text-white" />
              </Button>
            )}

            {hasRecorded && (
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
                <Button
                  variant="outline"
                  onClick={handleReRecord}
                  className="flex items-center gap-2"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Re-record
                </Button>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                >
                  {stepIndex === mockTrainingPrompts.length - 1
                    ? "Finish Recording"
                    : "Next Sample"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {hasRecorded && audioUrl && (
              <audio src={audioUrl} controls className="mt-8 h-10 w-full max-w-xs" />
            )}
          </>
        )}
      </Card>

      <div className="mt-6 flex justify-center">
        <button onClick={onCancel} className="text-sm text-muted hover:text-foreground">
          Cancel training
        </button>
      </div>
    </div>
  );
}
