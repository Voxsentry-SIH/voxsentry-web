"use client";

import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function ConsentStep({ onAgree, onCancel }: { onAgree: () => void; onCancel: () => void }) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Voice Training Consent</h2>
        <p className="mt-3 text-muted">Please read before creating a voice profile.</p>
      </div>

      <Card className="space-y-8 p-6 sm:p-10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Scam Prevention</h3>
            <p className="text-sm text-muted">We extract an acoustic fingerprint to verify this voice on future calls.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-safe/20 text-safe">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">Local Storage</h3>
            <p className="text-sm text-muted">Your voice profile is stored securely on your device. We do not upload it to the cloud.</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger/20 text-danger">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">No Audio Saved</h3>
            <p className="text-sm text-muted">The raw audio recordings are discarded immediately after the mathematical fingerprint is extracted.</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background-alt p-4 text-sm text-muted">
          <p className="mb-2 font-medium text-foreground">By proceeding, you agree that:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>You are recording your own voice, or have explicit permission from the speaker.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary shrink-0" />
              <span>You understand this profile will be used to analyze future incoming calls for potential AI cloning.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="primary" onClick={onAgree} className="w-full sm:w-auto">
            I Understand & Agree
          </Button>
        </div>
      </Card>
    </div>
  );
}
