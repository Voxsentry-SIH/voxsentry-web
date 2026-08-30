"use client";

import { Play, UploadCloud, Mic, Square } from "lucide-react";
import { MockVerdict } from "@/lib/mockData";
import { useRef, useState } from "react";

import { mockCallContexts } from "@/lib/mockData";

export default function JudgeControlPanel({
  verdicts,
  selectedId,
  selectedContextId,
  onSelect,
  onSelectContext,
  onPlay,
  onUpload,
  isPlaying,
}: {
  verdicts: MockVerdict[];
  selectedId: string;
  selectedContextId: string;
  onSelect: (id: string) => void;
  onSelectContext: (id: string) => void;
  onPlay: () => void;
  onUpload?: (file: File) => void;
  isPlaying: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Microphone recording state
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onUpload) {
        onUpload(e.target.files[0]);
      }
      // Reset input so the same file can be uploaded again if needed
      e.target.value = "";
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
    } else {
      // Start recording
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

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          const file = new File([audioBlob], "mic-recording.webm", { type: "audio/webm" });
          if (onUpload) {
            onUpload(file);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied or error:", err);
        alert("Microphone access is required to record audio.");
      }
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 shadow-lg h-full flex flex-col justify-between">
      <div>
        <h3 className="mb-6 text-xl font-bold text-white tracking-tight">Judge Control Panel</h3>

        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Select Audio Clip Scenario
            </label>
            <div className="relative group">
              <select
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#050514]/60 px-4 py-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                value={selectedId}
                onChange={(e) => onSelect(e.target.value)}
                disabled={isPlaying || isRecording}
              >
                {verdicts.map((v) => (
                  <option key={v.id} value={v.id} className="bg-[#111827]">
                    {v.scenarioName} {v.id !== "custom" && `(${v.label === "real" ? "Real Voice" : "Cloned Voice"})`}
                  </option>
                ))}
              </select>
              {/* Custom select arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Call Context (Risk Thresholds)
            </label>
            <div className="relative group">
              <select
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#050514]/60 px-4 py-3.5 text-sm text-white focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                value={selectedContextId}
                onChange={(e) => onSelectContext(e.target.value)}
                disabled={isPlaying || isRecording}
              >
                {mockCallContexts.map((ctx) => (
                  <option key={ctx.id} value={ctx.id} className="bg-[#111827]">
                    {ctx.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 group-focus-within:text-cyan-400 transition-colors">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          className={`${isPlaying ? "btn-outline opacity-70 cursor-not-allowed" : "btn-primary"} flex flex-1 items-center justify-center gap-2 py-4 text-sm`}
          onClick={onPlay}
          disabled={isPlaying || isRecording}
        >
          <Play className="h-5 w-5 fill-current" />
          {isPlaying ? "Simulating..." : "Play"}
        </button>

        <button
          className={`${isRecording ? "bg-red-500/10 border-red-500/50 text-red-500 animate-pulse hover:bg-red-500/20" : "btn-outline"} flex items-center justify-center px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border rounded-xl`}
          disabled={isPlaying}
          onClick={toggleRecording}
          title="Record from microphone"
        >
          {isRecording ? <Square className="h-5 w-5 fill-current" /> : <Mic className="h-5 w-5" />}
        </button>

        <div className="relative">
          <input 
            type="file" 
            accept="audio/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isPlaying || isRecording}
          />
          <button
            className="btn-outline flex h-full items-center justify-center px-4 py-4 disabled:opacity-50 disabled:cursor-not-allowed border rounded-xl"
            disabled={isPlaying || isRecording}
            onClick={() => fileInputRef.current?.click()}
            title="Upload audio file"
          >
            <UploadCloud className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
