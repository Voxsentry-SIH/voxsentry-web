"use client";

import { Mic, ShieldCheck, Plus, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function VoiceLibrary({ onAddVoice }: { onAddVoice: () => void }) {
  // Local mock state for profiles. Always assumes "Myself" exists if we hit this page after training.
  const profiles = [
    { id: 1, name: "Myself", samples: 5, date: "Just now" },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Voice Library</h2>
          <p className="mt-2 text-muted">Manage your trained voice profiles.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <Card
            key={profile.id}
            className="flex flex-col border-2 border-primary/20 bg-background-alt shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <Mic className="h-6 w-6" />
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-safe/20 px-3 py-1 text-xs font-medium text-safe">
                <ShieldCheck className="h-3.5 w-3.5" />
                Verified
              </div>
            </div>

            <h3 className="text-xl font-semibold text-foreground">{profile.name}</h3>
            <div className="mt-2 text-sm text-muted">
              <p>{profile.samples} samples recorded</p>
              <p>Trained: {profile.date}</p>
            </div>

            <div className="mt-6 border-t border-border pt-6 mt-auto">
              <Link href="/demo?profile=myself" className="block">
                <Button variant="outline" className="flex w-full justify-center gap-2">
                  <Play className="h-4 w-4" />
                  Test this voice
                </Button>
              </Link>
            </div>
          </Card>
        ))}

        <button
          onClick={onAddVoice}
          className="group flex min-h-[250px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-background p-8 transition-colors hover:border-primary hover:bg-background-alt"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-border text-muted transition-colors group-hover:bg-primary-light group-hover:text-primary">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium text-foreground">Add New Voice</h3>
          <p className="mt-2 text-center text-sm text-muted">
            Enroll a family member or another trusted voice.
          </p>
        </button>
      </div>
    </div>
  );
}
