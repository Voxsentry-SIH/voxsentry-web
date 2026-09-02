"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Copy, Check, Waves, AlertCircle } from "lucide-react";
import LanguageSelector, { SUPPORTED_LANGUAGES } from "./LanguageSelector";
import { SpeechService } from "@/services/speechService";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-xl border border-white/5 bg-[#050510]" />
});

export default function SpeechToTextMode() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].code);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const speechServiceRef = useRef<SpeechService | null>(null);

  // Initialize and cleanup speech service
  useEffect(() => {
    // If currently recording and language changes, restart
    const wasRecording = isRecording;
    if (wasRecording) {
      handleStop();
    }

    speechServiceRef.current = new SpeechService({
      language,
      onResult: (text, isFinal) => {
        // For simplicity, we just overwrite. In a real complex app, we'd append final chunks.
        setTranscript(text);
      },
      onError: (errMessage) => {
        setError(errMessage);
        setIsRecording(false);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });

    return () => {
      if (speechServiceRef.current) {
        speechServiceRef.current.stop();
      }
    };
  }, [language]);

  const handleStart = () => {
    setError(null);
    setTranscript("");
    if (speechServiceRef.current) {
      speechServiceRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStop = () => {
    if (speechServiceRef.current) {
      speechServiceRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full reveal-up space-y-6">
      
      {/* Control Panel */}
      <div className="glass-card bg-[#050514]/80 p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Background glow when recording */}
        <AnimatePresence>
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_50%)] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Speech to Text</h3>
            <p className="text-sm text-slate-400 font-mono">Real-time deep learning transcription</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <LanguageSelector 
              label="Input Language" 
              value={language} 
              onChange={setLanguage}
              disabled={isRecording}
            />
            
            <button
              onClick={isRecording ? handleStop : handleStart}
              className={`relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto ${
                isRecording 
                  ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30" 
                  : "bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              }`}
            >
              {isRecording ? (
                <>
                  <Square className="w-5 h-5 fill-current" /> Stop
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" /> Record
                </>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Live Signal Visualizer */}
        <div className="relative h-24 mb-6 rounded-xl overflow-hidden border border-white/5 bg-[#020205]">
          <div className="absolute top-2 left-3 z-20 flex items-center gap-1.5 px-2 py-1 bg-black/60 border border-white/10 rounded text-[9px] font-mono text-emerald-400 uppercase">
            <Waves className="w-3 h-3" /> Live Signal
          </div>
          <div className={`absolute inset-0 z-10 opacity-70 transition-opacity duration-500 mix-blend-screen ${!isRecording ? 'grayscale opacity-20' : ''}`}>
            <SpectrogramView isAnalyzing={isRecording} isComplete={!isRecording} />
          </div>
        </div>

        {/* Transcript Area */}
        <div className="relative bg-black/40 border border-white/5 rounded-xl p-6 min-h-[200px] flex flex-col group">
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Live Transcript</span>
            
            <button 
              onClick={handleCopy}
              disabled={!transcript}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                copied 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          
          <div className="flex-1 font-mono text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
            {transcript || (
              <span className="text-slate-600 italic">
                {isRecording ? "Listening..." : "Press record and start speaking..."}
              </span>
            )}
            {isRecording && <span className="inline-block w-2 h-5 ml-1 bg-emerald-400 animate-pulse align-middle" />}
          </div>
        </div>
      </div>
    </div>
  );
}
