"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoColumn() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6"
            >
              See VoxSentry in action
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted mb-8 leading-relaxed"
            >
              Watch how VoxSentry analyzes a live call and surfaces a voice-security verdict in real time.
            </motion.p>
            
            <ul className="space-y-4">
              {[
                "Detect suspicious synthetic voices",
                "Analyze calls in real time",
                "Surface a clear security verdict"
              ].map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span className="font-medium text-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] flex justify-center group"
          >
            {/* Glow behind video */}
            <div className="absolute inset-0 bg-primary/0 blur-2xl rounded-full -z-10 transition-all duration-500 group-hover:bg-primary/20" />
            
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-background shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)] group-hover:border-primary/50">
              {/* Native HTML5 video per RULES.md */}
              <video
                className="w-full h-full object-cover scale-[1.02]"
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/homepage-poster.jpg"
              >
                <source src="/videos/homepage-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
