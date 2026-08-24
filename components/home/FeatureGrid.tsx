import { ShieldCheck, Lock, Activity } from "lucide-react";
import Card from "@/components/ui/Card";

export default function FeatureGrid() {
  const features = [
    {
      title: "Real-Time Detection",
      description: "AI models analyze voice patterns in real-time during calls.",
      icon: ShieldCheck,
    },
    {
      title: "Advanced AI Protection",
      description: "Proprietary models detect cloned and synthetic voices with high accuracy.",
      icon: Activity,
    },
    {
      title: "Privacy First",
      description: "Your data stays on your device. We never store your conversations.",
      icon: Lock,
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 relative z-10 -mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} className="flex flex-row items-center gap-6 hover:-translate-y-1 transition-all duration-300 group p-6 bg-slate-50/50 border border-slate-100 shadow-sm hover:shadow-md rounded-2xl">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-100 text-primary shadow-sm group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
