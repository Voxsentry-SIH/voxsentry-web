"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { SUPPORTED_LANGUAGES, getLanguageName } from "@/lib/languages";

interface Props {
  value: string;
  onChange: (code: string) => void;
  label: string;
}

export default function LanguageSelector({ value, onChange, label }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full">
      <label className="block text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-sm text-white hover:border-white/30 transition-colors focus:outline-none"
      >
        <span className="font-semibold">{getLanguageName(value)}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full max-h-60 overflow-y-auto bg-[#0a0d18] border border-white/10 rounded-lg shadow-2xl custom-scrollbar">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChange(lang.code);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left text-sm text-slate-300 hover:text-white"
            >
              <span>{lang.name}</span>
              {value === lang.code && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      )}
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
