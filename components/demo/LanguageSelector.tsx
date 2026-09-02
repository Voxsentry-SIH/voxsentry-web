"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SUPPORTED_LANGUAGES = [
  { code: "en-US", name: "English (US)" },
  { code: "en-GB", name: "English (UK)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "zh-CN", name: "Chinese (Mandarin)" },
  { code: "ja-JP", name: "Japanese" },
  { code: "ko-KR", name: "Korean" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (code: string) => void;
  label?: string;
  disabled?: boolean;
}

export default function LanguageSelector({ value, onChange, label, disabled = false }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLang = SUPPORTED_LANGUAGES.find(l => l.code === value) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col gap-1.5" ref={containerRef}>
      {label && <label className="text-[10px] uppercase font-mono tracking-widest text-slate-500 ml-1">{label}</label>}
      
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full min-w-[140px] px-4 py-2.5 rounded-xl border transition-all duration-200 ${
          disabled 
            ? "bg-white/5 border-white/5 text-slate-500 cursor-not-allowed" 
            : "bg-[#0A0D18]/80 border-white/10 hover:border-cyan-500/50 hover:bg-white/5 text-slate-200 cursor-pointer"
        }`}
      >
        <span className="font-medium text-sm truncate">{selectedLang.name}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full z-50 bg-[#0A0D18] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto custom-scrollbar py-2">
              {SUPPORTED_LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    value === lang.code 
                      ? "bg-cyan-500/20 text-cyan-400 font-semibold" 
                      : "text-slate-300 hover:bg-white/10"
                  }`}
                  onClick={() => {
                    onChange(lang.code);
                    setIsOpen(false);
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
