import { Mic, Activity, AlertTriangle } from "lucide-react";
import Card from "@/components/ui/Card";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Listen",
      description: "VoxSentry receives the call audio for analysis.",
      icon: Mic,
    },
    {
      number: "02",
      title: "Analyze",
      description: "The detection engine examines the voice for signals associated with synthetic or cloned speech.",
      icon: Activity,
    },
    {
      number: "03",
      title: "Warn",
      description: "When a suspicious voice is detected, VoxSentry surfaces a clear warning so the user can respond before sharing sensitive information.",
      icon: AlertTriangle,
    },
  ];

  return (
    <section className="bg-background-alt py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How VoxSentry protects a call
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 right-0 hidden h-0.5 -translate-y-1/2 bg-border md:block" />
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background-alt bg-primary text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Card className="flex w-full flex-col items-center text-center">
                    <div className="mb-2 text-xs font-bold tracking-widest text-primary uppercase">
                      Step {step.number}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
