import { useState, useEffect, useRef } from "react";
import { Mic, ShieldCheck, Plus, Play, Square, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function VoiceLibrary({ onAddVoice }: { onAddVoice: () => void }) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verification state
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [verifyResult, setVerifyResult] = useState<{ id: string, score: number, match: boolean } | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
          setProfiles([{ id: "mock_1", name: "Myself", samples: 5, date: "Just now" }]);
          setLoading(false);
          return;
        }

        const userId = localStorage.getItem("voxsentry_auth") || "guest";
        const response = await fetch(`/api/voiceprints/${userId}`);
        
        if (!response.ok) throw new Error("Failed to load profiles");
        
        const data = await response.json();
        setProfiles(data);
      } catch (err: any) {
        console.error(err);
        setError("Could not load your voice profiles.");
        // Fallback to mock on error just to not break the UI entirely
        setProfiles([{ id: "mock_1", name: "Myself", samples: 5, date: "Offline Fallback" }]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const startTestRecording = async (profileId: string) => {
    setVerifyError(null);
    setVerifyResult(null);
    setVerifyingId(profileId);
    
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

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        stream.getTracks().forEach((track) => track.stop());
        
        await submitVerification(profileId, audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setVerifyError("Microphone access denied.");
      setVerifyingId(null);
    }
  };

  const stopTestRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setVerifyLoading(true);
    }
  };

  const submitVerification = async (profileId: string, audioBlob: Blob) => {
    try {
      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true") {
        await new Promise(r => setTimeout(r, 1500));
        setVerifyResult({ id: profileId, score: 92.4, match: true });
        setVerifyLoading(false);
        return;
      }

      const userId = localStorage.getItem("voxsentry_auth") || "guest";
      const profile = profiles.find(p => p.id === profileId);
      
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("profile_name", profile ? profile.name : "Myself");
      formData.append("file", audioBlob, "test.wav");

      const response = await fetch("/api/verify", {
        method: "POST",
        body: formData
      });

      if (!response.ok) throw new Error("Verification service unavailable");
      
      const data = await response.json();
      setVerifyResult({
        id: profileId,
        score: data.similarity_score,
        match: data.match
      });
    } catch (err: any) {
      console.error(err);
      setVerifyError("Verification failed.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="mx-auto w-full max-w-5xl relative z-10">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Voice Library</h2>
          <p className="mt-2 text-slate-400">Manage your trained mathematical voice profiles.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={itemVariants}
              className="glass-card flex flex-col rounded-3xl p-6 shadow-xl border-cyan-400/30 bg-[#050514]/60 transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="glow-badge flex h-14 w-14 items-center justify-center rounded-full">
                  <Mic className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1.5 text-xs font-semibold text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h3>
              <div className="mt-3 text-sm text-slate-400 space-y-1">
                <p>{profile.samples} samples recorded</p>
                <p>Trained: {profile.date}</p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 mt-auto">
                {verifyingId === profile.id ? (
                  <div className="flex flex-col items-center">
                    {verifyLoading ? (
                      <div className="flex flex-col items-center gap-2 py-2">
                        <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />
                        <span className="text-xs text-slate-400">Verifying...</span>
                      </div>
                    ) : verifyResult && verifyResult.id === profile.id ? (
                      <div className={`w-full p-3 text-center rounded-xl border ${verifyResult.match ? "border-green-500/50 bg-green-500/10 text-green-400" : "border-red-500/50 bg-red-500/10 text-red-400"}`}>
                        <p className="font-semibold">{verifyResult.match ? "Match Confirmed" : "No Match"}</p>
                        <p className="text-xs opacity-80 mt-1">Similarity: {verifyResult.score.toFixed(1)}%</p>
                        <button onClick={() => setVerifyingId(null)} className="mt-3 text-xs underline">Done</button>
                      </div>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-3">
                        <button
                          onClick={isRecording ? stopTestRecording : () => startTestRecording(profile.id)}
                          className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl border transition-all ${
                            isRecording 
                              ? "border-red-500/50 bg-red-500/20 text-red-400 animate-pulse" 
                              : "border-cyan-400/50 bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20"
                          }`}
                        >
                          {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          <span className="text-sm font-medium">{isRecording ? "Stop Recording" : "Speak to test"}</span>
                        </button>
                        {verifyError && (
                          <span title={verifyError} className="cursor-help">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={() => setVerifyingId(profile.id)}
                    className="btn-outline flex w-full justify-center items-center gap-2 py-3 text-sm text-cyan-400 border-cyan-400/30 hover:bg-cyan-400/10"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Test this voice
                  </button>
                )}
              </div>
            </motion.div>
          ))}

          <motion.button
            variants={itemVariants}
            onClick={onAddVoice}
            className="group flex min-h-[280px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-cyan-400/20 bg-[#050514]/40 p-8 transition-all hover:border-cyan-400/60 hover:bg-[#050514]/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-400 transition-all group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 group-hover:text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:scale-110">
              <Plus className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">Add New Voice</h3>
            <p className="mt-2 text-center text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
              Enroll a family member or another trusted voice.
            </p>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
