"use client";

import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export default function ConsentStep({ onAgree, onCancel }: { onAgree: () => void; onCancel: () => void }) {
  return (
    <div className="mx-auto w-full max-w-2xl relative z-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Voice Training Consent</h2>
        <p className="mt-3 text-slate-400">Please read before creating a voice profile.</p>
      </div>

      <div className="glass-card space-y-8 p-8 sm:p-12 rounded-3xl shadow-2xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-white">Scam Prevention</h3>
            <p className="text-sm text-slate-400 leading-relaxed">We extract an acoustic fingerprint to verify this voice on future calls.</p>
          </div>
          
          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-white">Local Storage</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Your voice profile is stored securely on your device. We do not upload it to the cloud.</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-bold text-white">No Audio Saved</h3>
            <p className="text-sm text-slate-400 leading-relaxed">The raw audio recordings are discarded immediately after the mathematical fingerprint is extracted.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#050514]/60 p-6 text-sm text-slate-300 shadow-inner">
          <p className="mb-4 font-semibold text-white">By proceeding, you agree that:</p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="glow-badge h-6 w-6 shrink-0 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <span className="leading-relaxed">You are recording your own voice, or have explicit permission from the speaker.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="glow-badge h-6 w-6 shrink-0 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
              </div>
              <span className="leading-relaxed">You understand this profile will be used to analyze future incoming calls for potential AI cloning.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end pt-4 border-t border-white/5 mt-4">
          <button onClick={onCancel} className="btn-outline w-full sm:w-auto px-8 py-3.5 text-sm text-slate-300">
            Cancel
          </button>
          <button onClick={onAgree} className="btn-primary w-full sm:w-auto px-8 py-3.5 text-sm">
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
}
