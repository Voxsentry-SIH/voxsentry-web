import { ShieldCheck, Lock, Activity } from "lucide-react";

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
    <section className="bg-transparent py-16 md:py-24 relative z-10 -mt-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="reveal-up glass-card flex flex-row items-center gap-6 p-6 rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="glow-badge h-14 w-14 shrink-0">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
