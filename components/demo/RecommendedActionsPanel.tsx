"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, ShieldAlert, KeyRound, MessageSquare, Mail, Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { MockVerdict, RiskTier } from "@/lib/mockData";

export default function RecommendedActionsPanel({
  riskTier,
  verdict,
}: {
  riskTier: RiskTier;
  verdict: MockVerdict | null;
}) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  // Only show for elevated risks
  if (riskTier !== "High" && riskTier !== "Critical") {
    return null;
  }

  const borderColor = riskTier === "Critical" ? "border-red-500/50" : "border-orange-500/50";
  const glowColor = riskTier === "Critical" ? "rgba(239, 68, 68, 0.1)" : "rgba(249, 115, 22, 0.1)";
  const textColor = riskTier === "Critical" ? "text-red-400" : "text-orange-400";

  const handleToggle = (type: "sms" | "email") => {
    if (type === "sms") {
      setSmsEnabled(!smsEnabled);
      if (!smsEnabled) showToast("SMS Alert Sent (Simulated)");
    } else {
      setEmailEnabled(!emailEnabled);
      if (!emailEnabled) showToast("Email Alert Sent (Simulated)");
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`glass-card rounded-2xl p-6 shadow-xl ${borderColor} relative overflow-hidden mt-6`}
      style={{ boxShadow: `0 0 40px ${glowColor}, inset 0 0 20px ${glowColor}` }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className={`h-6 w-6 ${textColor}`} />
          <h3 className={`text-xl font-bold ${textColor} tracking-tight`}>Recommended Actions</h3>
        </div>

        <p className="text-slate-200 mb-6 font-medium text-lg border-l-4 pl-4" style={{ borderColor: riskTier === "Critical" ? "#EF4444" : "#F97316" }}>
          {verdict?.recommendedAction}
        </p>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button className="btn-outline flex items-center justify-center gap-2 py-3 px-4 text-sm whitespace-nowrap hover:bg-slate-800/50">
            <PhoneCall className="h-4 w-4" /> Request Call-Back
          </button>
          <button className="btn-outline flex items-center justify-center gap-2 py-3 px-4 text-sm whitespace-nowrap hover:bg-slate-800/50">
            <ShieldAlert className="h-4 w-4" /> Escalate to Supervisor
          </button>
          <button className="btn-outline flex items-center justify-center gap-2 py-3 px-4 text-sm whitespace-nowrap hover:bg-slate-800/50">
            <KeyRound className="h-4 w-4" /> Require MFA
          </button>
        </div>

        {/* Alert Channels Row */}
        <div>
          <h4 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Multi-Channel Alerts</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium cursor-not-allowed opacity-80">
              <Bell className="h-4 w-4" /> UI Prompt (Active)
            </div>
            
            <button
              onClick={() => handleToggle("sms")}
              className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                smsEnabled 
                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                  : "bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/50"
              }`}
            >
              <MessageSquare className="h-4 w-4" /> SMS Alert {smsEnabled && <CheckCircle2 className="h-3 w-3 ml-1" />}
            </button>

            <button
              onClick={() => handleToggle("email")}
              className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                emailEnabled 
                  ? "bg-green-500/10 border-green-500/30 text-green-400" 
                  : "bg-slate-800/50 border-white/10 text-slate-300 hover:bg-slate-700/50"
              }`}
            >
              <Mail className="h-4 w-4" /> Email Alert {emailEnabled && <CheckCircle2 className="h-3 w-3 ml-1" />}
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Toast Notification */}
      <div className="absolute bottom-6 right-6 z-50 pointer-events-none">
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="bg-slate-900 border border-white/10 shadow-2xl rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <CheckCircle2 className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-white">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
