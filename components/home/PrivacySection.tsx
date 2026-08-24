import { Shield, Lock, Mic } from "lucide-react";

export default function PrivacySection() {
  return (
    <section className="bg-transparent py-20 md:py-32 border-t border-[rgba(34,211,238,0.1)] relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6 leading-tight">
              Your conversations are personal.<br/>
              <span className="text-primary">Security should be too.</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              VoxSentry is designed around privacy-first voice analysis, giving users a security layer without turning their conversations into a data product.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">On-device evaluation</h3>
              <p className="text-sm text-muted">Analysis runs locally, meaning your call audio never needs to be saved or uploaded to the cloud.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Shield className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground">Private profiles</h3>
              <p className="text-sm text-muted">Voice profiles you train for family members are encrypted and stored solely on your device.</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
