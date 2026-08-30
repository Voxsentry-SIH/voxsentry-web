"use client";

import { Users, Briefcase, PhoneIncoming, UserMinus } from "lucide-react";
import { motion } from "framer-motion";

export default function UseCases() {
  const cases = [
    {
      title: "Family impersonation",
      description: "Someone sounds exactly like a loved one asking for urgent help.",
      icon: Users,
    },
    {
      title: "Executive impersonation",
      description: "A synthetic voice attempts to authorize a sensitive action.",
      icon: Briefcase,
    },
    {
      title: "Trusted-contact spoofing",
      description: "A familiar voice is used to create false confidence.",
      icon: PhoneIncoming,
    },
    {
      title: "Unknown callers",
      description: "A suspicious call needs an additional layer of verification.",
      icon: UserMinus,
    },
  ];

  return (
    <section className="bg-transparent py-20 md:py-24 lg:py-28 relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4 drop-shadow-md">
            Built for the moments when trust matters
          </h2>
          <p className="text-lg text-slate-400">
            Voice cloning changes how scams operate. VoxSentry is designed to detect the subtle anomalies that humans miss.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="glass-card flex flex-col items-start p-6 rounded-2xl transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 glow-badge h-12 w-12">
                  <Icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
