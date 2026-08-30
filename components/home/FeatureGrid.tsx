"use client";

import { ShieldCheck, Lock, Activity, Sliders, Code2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FeatureGrid() {
  const features = [
    {
      title: "Real-Time Detection",
      description: "AI models analyze voice patterns in real-time during calls.",
      icon: ShieldCheck,
      href: "/demo",
    },
    {
      title: "Configurable Risk Scoring",
      description: "Context-aware thresholds adapt to the sensitivity of the transaction.",
      icon: Sliders,
      href: "/demo",
    },
    {
      title: "Enterprise API & SDKs",
      description: "Embed deepfake detection into banking cores and telecom infrastructure.",
      icon: Code2,
      href: "/enterprise-api",
    },
  ];

  return (
    <section className="bg-transparent py-20 md:py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            
            const cardContent = (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="glass-card flex flex-row items-center gap-6 p-6 rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-cyan-400/30 w-full h-full"
              >
                <div className="glow-badge h-14 w-14 shrink-0">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );

            if (feature.href) {
              return (
                <Link href={feature.href} key={idx} className="block group">
                  {cardContent}
                </Link>
              );
            }
            
            return (
              <div key={idx} className="block">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
