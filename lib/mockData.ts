/**
 * Mock data for frontend-only testing.
 * All accuracy/latency numbers shown in the UI must come from here,
 * not invented inline in components (per RULES.md).
 */

export interface MockVerdict {
  id: string;
  label: "cloned" | "real";
  confidence: number;
  scenarioName: string;
  audioFile: string;
}

export interface MockStat {
  label: string;
  value: string;
  description: string;
}

export const mockStats: MockStat[] = [
  {
    label: "Detection Accuracy",
    value: "98.7%",
    description: "Across 10,000+ test samples",
  },
  {
    label: "Latency",
    value: "<200ms",
    description: "Real-time verdict on live calls",
  },
  {
    label: "Voice Profiles",
    value: "50K+",
    description: "Trained and verified voices",
  },
];

export const mockVerdicts: MockVerdict[] = [
  {
    id: "1",
    label: "cloned",
    confidence: 94.2,
    scenarioName: "Bank Fraud Call",
    audioFile: "/audio-samples/bank-fraud.wav",
  },
  {
    id: "2",
    label: "real",
    confidence: 99.1,
    scenarioName: "Family Check-in",
    audioFile: "/audio-samples/family-checkin.wav",
  },
  {
    id: "3",
    label: "cloned",
    confidence: 87.5,
    scenarioName: "CEO Impersonation",
    audioFile: "/audio-samples/ceo-impersonation.wav",
  },
];
