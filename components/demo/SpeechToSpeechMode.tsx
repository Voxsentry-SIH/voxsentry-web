"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, AlertCircle, Play, Pause, Waves, Loader2, RefreshCw } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { translateText } from "@/lib/translation";
import { getTTSVoice } from "@/lib/languages";
import { audioManager } from "@/lib/audioManager";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#050510]" />
});

export default function SpeechToSpeechMode() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
      } else {
        recognitionRef.current = new SpeechRecognition();
        // For STS, we might want continuous=false to act more like "Push to talk" / "Walkie talkie"
        recognitionRef.current.continuous = false; 
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => {
          setIsRecording(true);
          setError(null);
          setTranscript("");
          setInterimTranscript("");
          setTranslation("");
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          if (event.error !== "no-speech") {
            setError(`Recognition error: ${event.error}`);
            setIsRecording(false);
          }
        };

        recognitionRef.current.onend = () => {
          setIsRecording(false);
          // If we have a transcript, it will trigger the translation effect.
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
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      audioManager.clearSession("sts");
    };
  }, []);

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = sourceLang;
    }
  }, [sourceLang]);

  // Translate when recording STOPS and we have a transcript
  useEffect(() => {
    let isMounted = true;
    
    const runTranslation = async () => {
      if (!transcript || isRecording) return; 
      
      setIsProcessing(true);
      try {
        const result = await translateText(transcript, sourceLang, targetLang);
        if (isMounted) {
          setTranslation(result);
          playTranslation(result);
        }
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
      audioManager.requestSession("sts", stopRecording);
      try {
        recognitionRef.current.start();
      } catch (err) {}
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

  const playTranslation = (textToPlay: string = translation) => {
    if (!textToPlay || typeof window === 'undefined') return;

    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(textToPlay);
    utterance.lang = getTTSVoice(targetLang);
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stopPlayback = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranscript("");
    setTranslation("");
    stopPlayback();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto reveal-up">
      {/* HUD Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Waves className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white tracking-widest uppercase font-mono">Speech to Speech</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'}`} />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            {isRecording ? "LISTENING" : isPlaying ? "SPEAKING" : "READY"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end glass-card p-6 rounded-2xl bg-black/40 border border-white/10">
        <LanguageSelector label="You Speak" value={sourceLang} onChange={setSourceLang} />
        <button 
          onClick={handleSwap}
          className="flex items-center justify-center w-10 h-10 md:mb-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400" />
        </button>
        <LanguageSelector label="They Hear" value={targetLang} onChange={setTargetLang} />
      </div>

      {error && (
        <div className="glass-card border-red-500/50 bg-red-500/10 p-4 rounded-xl flex items-center gap-3 text-red-400 font-semibold text-sm">
          <AlertCircle className="w-5 h-5" /> {error}
        </div>
      )}

      {/* Main Interaction Area */}
      <div className="glass-card relative flex flex-col items-center justify-center min-h-[400px] overflow-hidden rounded-2xl bg-[#03030A] border border-[rgba(255,255,255,0.08)] p-8 shadow-2xl">
        
        {/* Ambient Waveform */}
        <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
          isRecording || isPlaying ? 'opacity-80 mix-blend-screen' : 'opacity-20 grayscale'
        }`}>
          <SpectrogramView isAnalyzing={isRecording || isPlaying} isComplete={!isRecording && !isPlaying && !!transcript} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl mt-12">
          
          <button
            onMouseDown={toggleRecording}
            onMouseUp={stopRecording}
            onTouchStart={toggleRecording}
            onTouchEnd={stopRecording}
            disabled={!!error && !isRecording}
            className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-300 select-none ${
              isRecording 
                ? 'bg-red-500/20 border-red-500/50 text-red-400 scale-105' 
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
            } border-2 backdrop-blur-md mb-8`}
          >
            <Mic className="w-12 h-12" />
            {isRecording && (
              <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-20" />
            )}
          </button>
          
          <p className="text-sm font-mono tracking-widest uppercase text-slate-400 mb-8 select-none">
            {isRecording ? (
              <span className="text-red-400">Release to Translate</span>
            ) : (
              "Hold to Speak"
            )}
          </p>

          <AnimatePresence mode="popLayout">
            {(transcript || interimTranscript || translation) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full flex flex-col gap-4"
              >
                {/* Transcripts Panel */}
                <div className="flex flex-col gap-4 bg-black/60 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                  
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">You said:</span>
                    <p className="text-slate-200 font-medium text-lg">
                      {transcript}
                      <span className="text-slate-500 italic ml-1">{interimTranscript}</span>
                      {isRecording && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse ml-1 align-middle" />}
                    </p>
                  </div>

                  <div className="h-px w-full bg-white/10" />

                  <div className="relative">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">Translation:</span>
                    <div className="min-h-[2rem]">
                      {isProcessing ? (
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
                          <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> Translating...
                        </div>
                      ) : translation ? (
                        <p className="text-white font-medium text-xl leading-relaxed">{translation}</p>
                      ) : null}
                    </div>
                  </div>

                </div>

                {/* Playback Controls */}
                {translation && !isProcessing && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex justify-center mt-2"
                  >
                    <button
                      onClick={() => isPlaying ? stopPlayback() : playTranslation()}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold font-mono text-sm tracking-widest uppercase border ${
                        isPlaying 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50'
                          : 'bg-white/5 text-white hover:bg-white/10 border-white/10'
                      } transition-colors`}
                    >
                      {isPlaying ? (
                        <><Pause className="w-4 h-4" /> Stop Audio</>
                      ) : (
                        <><Play className="w-4 h-4" /> Play Translation</>
                      )}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
