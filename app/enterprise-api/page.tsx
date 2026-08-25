"use client";

import { motion } from "framer-motion";
import { Server, PhoneCall, Network, Code2, Globe2, ShieldCheck, CheckCircle2, ChevronRight, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const languages = [
  { name: "English (Indian Accent)", status: "supported" },
  { name: "Hindi", status: "supported" },
  { name: "Bengali", status: "supported" },
  { name: "Tamil", status: "supported" },
  { name: "Telugu", status: "supported" },
  { name: "Marathi", status: "supported" },
  { name: "Gujarati", status: "roadmap" },
  { name: "Kannada", status: "roadmap" },
  { name: "Malayalam", status: "roadmap" },
];

export default function EnterpriseApiPage() {
  const [activeTab, setActiveTab] = useState<"request" | "response">("request");

  const mockRequest = `{
  "audio_url": "wss://api.voxsentry.com/streams/req_892nf",
  "context": {
    "type": "fund_transfer_approval",
    "amount": 50000,
    "currency": "INR"
  },
  "options": {
    "continuous_monitoring": true,
    "webhook_url": "https://bank.com/voxsentry-alerts"
  }
}`;

  const mockResponse = `{
  "status": "success",
  "analysis": {
    "timestamp": "2026-08-25T12:00:00Z",
    "primary_verdict": "cloned",
    "confidence_score": 94.2,
    "risk_evaluation": {
      "context_type": "fund_transfer_approval",
      "risk_tier": "Critical",
      "recommended_action": "Do not proceed with fund transfer. Recommend call-back verification."
    },
    "spectral_features": {
      "synthetic_artifacts_detected": true,
      "breathing_pattern_match": 0.12
    }
  }
}`;

  return (
    <div className="min-h-screen bg-[#050510] pt-24 pb-16">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
            <Code2 className="h-4 w-4" />
            Platform & Integration APIs
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl mb-6">
            Integrate VoxSentry Into Your Voice Channels
          </h1>
          <p className="text-lg text-slate-300">
            Enterprise-grade REST APIs and SDKs built for high-throughput environments. Seamlessly embed deepfake detection into banking cores, contact centers, and telecom infrastructure with sub-200ms latency.
          </p>
        </motion.div>
      </section>

      {/* API Reference Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >
          <div className="lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#050514]/80 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-white mb-4">REST API Endpoint</h3>
            <p className="text-slate-400 mb-6 text-sm">
              Send an audio stream URL and a business context payload. VoxSentry analyzes the acoustic signature in real-time, matching it against our dynamic thresholding engine to return a contextualized risk tier.
            </p>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-sm text-cyan-400 border border-white/5 flex items-center justify-between">
              <span>POST /v1/analyze</span>
              <span className="text-slate-500 text-xs uppercase">HTTPS</span>
            </div>
            
            <ul className="mt-8 space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                WebSocket & REST Support
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                99.99% Enterprise SLA
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                End-to-End Encryption
              </li>
            </ul>
          </div>
          
          <div className="lg:w-2/3 bg-[#0a0a1a] flex flex-col">
            <div className="flex border-b border-white/10 bg-[#070715]">
              <button
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === "request" ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5" : "text-slate-400 hover:text-slate-200"}`}
                onClick={() => setActiveTab("request")}
              >
                Example Request
              </button>
              <button
                className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === "response" ? "text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/5" : "text-slate-400 hover:text-slate-200"}`}
                onClick={() => setActiveTab("response")}
              >
                Example Response
              </button>
            </div>
            <div className="p-6 overflow-x-auto relative flex-1">
              <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Terminal className="h-3 w-3" /> JSON
              </div>
              <pre className="text-sm font-mono text-slate-300">
                <code>{activeTab === "request" ? mockRequest : mockResponse}</code>
              </pre>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Integration Targets */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white tracking-tight">Integration Targets</h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">VoxSentry operates effectively at multiple layers of your infrastructure stack.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 hover:border-cyan-400/30 transition-all hover:-translate-y-1"
          >
            <div className="bg-cyan-400/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-cyan-400/20">
              <Server className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Core Banking Systems</h3>
            <p className="text-slate-400 text-sm">
              Trigger instant verification logic before processing high-value fund transfers or resetting account credentials via IVR.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 hover:border-cyan-400/30 transition-all hover:-translate-y-1"
          >
            <div className="bg-cyan-400/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-cyan-400/20">
              <PhoneCall className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Contact Center Platforms</h3>
            <p className="text-slate-400 text-sm">
              Empower agents with real-time risk scores on their dashboard for incoming support calls and social engineering attempts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card rounded-2xl p-8 hover:border-cyan-400/30 transition-all hover:-translate-y-1"
          >
            <div className="bg-cyan-400/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 border border-cyan-400/20">
              <Network className="h-7 w-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Telecom Infrastructure</h3>
            <p className="text-slate-400 text-sm">
              Integrate at the network edge to scan operator routing channels and intercept synthetic robocalls before they reach the consumer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Language & Accent Coverage */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-8 md:p-12 text-center"
        >
          <Globe2 className="h-10 w-10 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Indian Language & Accent Coverage</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Our models are explicitly trained on diverse Indian linguistic datasets to ensure robust detection without falsely flagging regional accents as synthetic anomalies.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang) => (
              <div 
                key={lang.name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${
                  lang.status === "supported" 
                    ? "bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]" 
                    : "bg-slate-800/50 border-white/10 text-slate-400"
                }`}
              >
                {lang.status === "supported" ? <ShieldCheck className="h-4 w-4" /> : <span className="w-2 h-2 rounded-full bg-slate-500 mr-1" />}
                {lang.name}
                {lang.status === "roadmap" && <span className="ml-1 text-[10px] uppercase tracking-wider opacity-70">Roadmap</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
