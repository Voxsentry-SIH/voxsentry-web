import Link from "next/link";
import { Play, Mic } from "lucide-react";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-primary/5 py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl mb-6">
          See how voice-clone detection works.
        </h2>
        <p className="text-lg text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          Test the detection workflow with a live demonstration or explore how trusted voices can be enrolled.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/demo" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full flex items-center justify-center gap-2 h-14 px-8 text-base">
              <Play className="h-4 w-4" />
              Try Live Demo
            </Button>
          </Link>
          <Link href="/train-voice" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-14 px-8 text-base bg-background">
              <Mic className="h-4 w-4" />
              Train Your Voice
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
