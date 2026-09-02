"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, AlertCircle, Copy, Check, Waves, Loader2, RefreshCw } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { translateText } from "@/lib/translation";
import { audioManager } from "@/lib/audioManager";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#050510]" />
});

export default function SpeechToTextMode() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const [copied, setCopied] = useState(false);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check support
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      } else {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => {
          setIsRecording(true);
          setError(null);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          if (event.error !== "no-speech") {
            setError(`Recognition error: ${event.error}`);
            setIsRecording(false);
          }
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current.onresult = (event: any) => {
          let final = "";
          let interim = "";

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript;
            } else {
              interim += event.results[i][0].transcript;
            }
          }

          if (final) {
            setTranscript((prev) => (prev + " " + final).trim());
          }
          setInterimTranscript(interim);
        };
      }
    }
    
    return () => {
      stopRecording();
      audioManager.clearSession("stt");
    };
  }, []);

  // Update recognition lang when sourceLang changes
  useEffect(() => {
    if (recognitionRef.current) {
      // Need BCP-47 tags. The keys in SUPPORTED_LANGUAGES are 2-letter, some browsers prefer full.
      // E.g. 'en-US', 'hi-IN'. We'll just pass the 2-letter code or construct a basic one if needed, 
      // but standard webkit prefers 'en-US'. We'll map them inside if needed, or just rely on the OS.
      // For simplicity, passing "en" or "hi" usually works.
      recognitionRef.current.lang = sourceLang;
    }
  }, [sourceLang]);

  // Translate when transcript completes (or stops)
  useEffect(() => {
    let isMounted = true;
    
    const runTranslation = async () => {
      if (!transcript || isRecording) return; // Wait until recording stops to translate full block
      
      setIsProcessing(true);
      try {
        const result = await translateText(transcript, sourceLang, targetLang);
        if (isMounted) setTranslation(result);
      } catch (err: any) {
        if (isMounted) setError("Translation service unavailable.");
      } finally {
        if (isMounted) setIsProcessing(false);
      }
    };

    runTranslation();
    
    return () => { isMounted = false; };
  }, [transcript, isRecording, sourceLang, targetLang]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      stopRecording();
    } else {
      // Clear previous
      setTranscript("");
      setInterimTranscript("");
      setTranslation("");
      setError(null);
      
      audioManager.requestSession("stt", stopRecording);
      
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch(e) {}
      setIsRecording(false);
    }
  };

  const copyToClipboard = () => {
    if (translation) {
      navigator.clipboard.writeText(translation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranscript("");
    setTranslation("");
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto reveal-up">
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white tracking-widest uppercase font-mono">Speech to Text</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]' : 'bg-cyan-500 shadow-[0_0_8px_#22d3ee]'}`} />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            {isRecording ? "MICROPHONE ACTIVE" : "MICROPHONE READY"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end glass-card p-6 rounded-2xl bg-black/40 border border-white/10">
        <LanguageSelector label="From Language" value={sourceLang} onChange={setSourceLang} />
        
        <button 
          onClick={handleSwap}
          className="flex items-center justify-center w-10 h-10 md:mb-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          title="Swap languages"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
        </button>

        <LanguageSelector label="Translate To" value={targetLang} onChange={setTargetLang} />
      </div>

      {error && (
        <div className="glass-card border-red-500/50 bg-red-500/10 p-4 rounded-xl flex items-center gap-3 text-red-400 font-semibold text-sm">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {/* Main Interaction Area */}
      <div className="glass-card relative flex flex-col items-center justify-center min-h-[300px] overflow-hidden rounded-2xl bg-[#03030A] border border-[rgba(255,255,255,0.08)] p-8 shadow-2xl">
        
        {/* Ambient Waveform */}
        <div className={`absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-1000 ${isRecording ? 'opacity-80 mix-blend-screen' : 'grayscale'}`}>
          <SpectrogramView isAnalyzing={isRecording} isComplete={!isRecording && !!transcript} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full">
          
          <button
            onClick={toggleRecording}
            disabled={!!error && !isRecording}
            className={`relative flex items-center justify-center w-24 h-24 rounded-full transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
            } border-2 backdrop-blur-md mb-6`}
          >
            {isRecording ? (
              <Square className="w-8 h-8 fill-current" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
            
            {isRecording && (
              <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20" />
            )}
          </button>
          
          <p className="text-sm font-mono tracking-widest uppercase text-slate-400 mb-8">
            {isRecording ? (
              <span className="text-red-400 animate-pulse flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> Listening...
              </span>
            ) : (
              "Tap to Start Speaking"
            )}
          </p>

          <AnimatePresence mode="popLayout">
            {(transcript || interimTranscript) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 relative"
              >
                {/* Original */}
                <div className="flex flex-col bg-black/60 border border-white/10 rounded-xl p-5 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Original Speech</span>
                  <p className="text-slate-200 font-medium text-lg leading-relaxed">
                    {transcript}
                    <span className="text-slate-500 italic ml-1">{interimTranscript}</span>
                    {isRecording && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1 align-middle" />}
                  </p>
                </div>

                {/* Translation */}
                <div className="flex flex-col bg-black/60 border border-white/10 rounded-xl p-5 backdrop-blur-md relative group">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Translation</span>
                    {translation && (
                      <button onClick={copyToClipboard} className="text-slate-500 hover:text-white transition-colors">
                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                  
                  <div className="min-h-[3rem] flex items-center">
                    {isProcessing ? (
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> Processing...
                      </div>
                    ) : translation ? (
                      <p className="text-white font-medium text-lg leading-relaxed">{translation}</p>
                    ) : (
                      <p className="text-slate-600 italic text-sm">Awaiting speech segment...</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
