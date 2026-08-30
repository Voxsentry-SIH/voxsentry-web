"use client";

import Link from "next/link";
import { Play, Mic } from "lucide-react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-primary/5 py-20 md:py-24 lg:py-28">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl px-6 text-center"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
          See how voice-clone detection works.
        </h2>
        <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          Test the detection workflow with a live demonstration or explore how trusted voices can be enrolled.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/demo" className="w-full sm:w-auto">
            <button className="btn-primary w-full flex items-center justify-center gap-2 h-14 px-8 text-base">
              <Play className="h-4 w-4" />
              Try Live Demo
            </button>
          </Link>
          <Link href="/train-voice" className="w-full sm:w-auto">
            <button className="btn-outline w-full flex items-center justify-center gap-2 h-14 px-8 text-base">
              <Mic className="h-4 w-4" />
              Train Your Voice
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
