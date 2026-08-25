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
  recommendedAction: string;
}

export type RiskTier = "Low" | "Medium" | "High" | "Critical";

export interface CallContextType {
  id: string;
  name: string;
  sensitivity: "low" | "high";
  description: string;
  thresholds: {
    medium: number;
    high: number;
    critical: number;
  }
}

export const mockCallContexts: CallContextType[] = [
  {
    id: "routine",
    name: "Routine Call",
    sensitivity: "low",
    description: "Standard conversational call",
    thresholds: { medium: 60, high: 80, critical: 95 }
  },
  {
    id: "fund-transfer",
    name: "Fund Transfer Approval",
    sensitivity: "high",
    description: "Financial authorization",
    thresholds: { medium: 30, high: 50, critical: 75 }
  },
  {
    id: "confidential-info",
    name: "Confidential Info Disclosure",
    sensitivity: "high",
    description: "Sharing sensitive data",
    thresholds: { medium: 40, high: 60, critical: 80 }
  },
  {
    id: "privileged-access",
    name: "Privileged Access Approval",
    sensitivity: "high",
    description: "System access request",
    thresholds: { medium: 35, high: 55, critical: 75 }
  }
];

export function calculateRiskTier(clonedConfidence: number, context: CallContextType): RiskTier {
  if (clonedConfidence >= context.thresholds.critical) return "Critical";
  if (clonedConfidence >= context.thresholds.high) return "High";
  if (clonedConfidence >= context.thresholds.medium) return "Medium";
  return "Low";
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
    recommendedAction: "Do not proceed with fund transfer. Recommend call-back verification via a known number.",
  },
  {
    id: "2",
    label: "real",
    confidence: 99.1,
    scenarioName: "Family Check-in",
    audioFile: "/audio-samples/family-checkin.wav",
    recommendedAction: "No action required. Voice pattern matches known profile.",
  },
  {
    id: "3",
    label: "cloned",
    confidence: 87.5,
    scenarioName: "CEO Impersonation",
    audioFile: "/audio-samples/ceo-impersonation.wav",
    recommendedAction: "Suspend requested executive action. Require in-person or video verification.",
  },
];

export const mockTrainingPrompts: string[] = [
  "The quick brown fox jumps over the lazy dog.",
  "I am recording my voice to secure my personal calls.",
  "VoxSentry analyzes the unique spectral features of my speech.",
  "Artificial intelligence cannot perfectly replicate these nuances.",
  "This profile will be stored securely on my device."
];
