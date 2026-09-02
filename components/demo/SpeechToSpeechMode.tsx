"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, ArrowRightLeft, Volume2, Loader2, AlertCircle } from "lucide-react";
import LanguageSelector, { SUPPORTED_LANGUAGES } from "./LanguageSelector";
import { SpeechService } from "@/services/speechService";
import { translateText } from "@/services/translationService";
import { ttsService } from "@/services/ttsService";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const SpectrogramView = dynamic(() => import("./SpectrogramView"), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-xl border border-white/5 bg-[#050510]" />
});

export default function SpeechToSpeechMode() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [sourceLang, setSourceLang] = useState(SUPPORTED_LANGUAGES[2].code); // Default Hindi
  const [targetLang, setTargetLang] = useState(SUPPORTED_LANGUAGES[0].code); // Default English
  
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const speechServiceRef = useRef<SpeechService | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speechServiceRef.current) speechServiceRef.current.stop();
      ttsService.stop();
    };
  }, []);

  const handleSwapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
    ttsService.stop();
    setIsPlaying(false);
  };

  const handleStartRecording = () => {
    setError(null);
    setSourceText("");
    setTranslatedText("");
    ttsService.stop();
    setIsPlaying(false);

    speechServiceRef.current = new SpeechService({
      language: sourceLang,
      onResult: (text) => {
        setSourceText(text);
      },
      onError: (errMessage) => {
        setError(errMessage);
        setIsRecording(false);
        setIsProcessing(false);
      },
      onEnd: async () => {
        setIsRecording(false);
      }
    });

    speechServiceRef.current.start();
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    if (speechServiceRef.current) {
      speechServiceRef.current.stop();
    }
    setIsRecording(false);
    
    if (sourceText.trim()) {
      await processTranslation(sourceText);
    }
  };

  const processTranslation = async (text: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const translated = await translateText(text, sourceLang, targetLang);
      setTranslatedText(translated);
      handlePlayAudio(translated, targetLang);
    } catch (err: any) {
      setError(err.message || "Failed to translate text.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayAudio = (text: string, lang: string) => {
    if (!text) return;
    setIsPlaying(true);
    ttsService.speak(
      text, 
      lang,
      () => setIsPlaying(false),
      (err) => {
        setError(err);
        setIsPlaying(false);
      }
    );
  };

  const handleStopAudio = () => {
    ttsService.stop();
    setIsPlaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full reveal-up space-y-6">
      
      {/* Control Panel */}
      <div className="glass-card bg-[#050514]/80 p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Background glow when recording or processing */}
        <AnimatePresence>
          {(isRecording || isProcessing || isPlaying) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 pointer-events-none ${
                isRecording ? "bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.15),transparent_50%)]" :
                isPlaying ? "bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_50%)]" :
                "bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.1),transparent_50%)]"
              }`}
            />
          )}
        </AnimatePresence>

        <div className="relative z-10">
          <div className="mb-8">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Speech to Speech</h3>
            <p className="text-sm text-slate-400 font-mono">Real-time voice translation pipeline</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Language Selection Bar */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-black/40 p-4 rounded-xl border border-white/5">
            <div className="flex-1 w-full">
              <LanguageSelector 
                label="Source Language" 
                value={sourceLang} 
                onChange={setSourceLang}
                disabled={isRecording || isProcessing || isPlaying}
              />
            </div>
            
            <button
              onClick={handleSwapLanguages}
              disabled={isRecording || isProcessing || isPlaying}
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0 group"
            >
              <ArrowRightLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="flex-1 w-full">
              <LanguageSelector 
                label="Target Language" 
                value={targetLang} 
                onChange={setTargetLang}
                disabled={isRecording || isProcessing || isPlaying}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Input Box */}
            <div className="bg-[#020205] border border-white/5 rounded-xl p-5 min-h-[160px] flex flex-col relative group">
              <span className="absolute top-0 right-0 px-2 py-1 bg-white/5 text-[9px] uppercase tracking-widest text-slate-500 rounded-bl-lg font-mono">
                Original Text
              </span>
              <div className="flex-1 font-mono text-sm md:text-base text-slate-300 leading-relaxed mt-2 whitespace-pre-wrap">
                {sourceText || (
                  <span className="text-slate-600 italic">Waiting for speech input...</span>
                )}
                {isRecording && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-400 animate-pulse align-middle" />}
              </div>
            </div>

            {/* Output Box */}
            <div className="bg-[#020205] border border-cyan-500/20 rounded-xl p-5 min-h-[160px] flex flex-col relative group">
              <span className="absolute top-0 right-0 px-2 py-1 bg-cyan-500/10 text-[9px] uppercase tracking-widest text-cyan-500 rounded-bl-lg font-mono">
                Translated Text
              </span>
              <div className="flex-1 font-mono text-sm md:text-base text-white leading-relaxed mt-2 whitespace-pre-wrap">
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-cyan-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Translating...</span>
                  </div>
                ) : (
                  translatedText || <span className="text-slate-600 italic">Translation will appear here...</span>
                )}
              </div>
              
              {translatedText && !isProcessing && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={isPlaying ? handleStopAudio : () => handlePlayAudio(translatedText, targetLang)}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-mono font-bold transition-colors border border-cyan-500/30"
                  >
                    {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
                    {isPlaying ? "STOP PLAYBACK" : "PLAY TRANSLATION"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
            {/* Live Signal Visualizer */}
            <div className="relative h-16 flex-1 w-full rounded-xl overflow-hidden border border-white/5 bg-[#020205]">
              <div className={`absolute inset-0 z-10 opacity-70 transition-opacity duration-500 mix-blend-screen ${(isRecording || isPlaying) ? '' : 'grayscale opacity-20'}`}>
                <SpectrogramView isAnalyzing={isRecording || isPlaying} isComplete={!(isRecording || isPlaying)} />
              </div>
            </div>

            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isProcessing || isPlaying}
              className={`relative shrink-0 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 w-full sm:w-auto ${
                isRecording 
                  ? "bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30" 
                  : "bg-amber-500 text-slate-900 hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
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
                  <Mic className="w-5 h-5" /> Start Speaking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
