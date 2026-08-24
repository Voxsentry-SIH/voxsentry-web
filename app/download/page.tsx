import { Download, ShieldCheck, Smartphone, Settings, Check, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function DownloadPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Get VoxSentry for Android
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          Download the latest version of the VoxSentry app to protect yourself from synthetic voice scams in real-time.
        </p>
        <div className="mt-10 flex justify-center">
          <Button variant="primary" className="gap-2">
            <Download className="h-5 w-5" />
            Download APK (v1.0.0)
          </Button>
        </div>
      </section>

      {/* Setup Flow */}
      <section className="bg-background-alt py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-foreground">Getting Started</h2>
            <p className="mt-4 text-muted">Four simple steps to secure your calls.</p>
          </div>
          
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {[
              { title: "Download", desc: "Get the latest APK directly from our secure servers.", icon: Download },
              { title: "Install", desc: "Open the downloaded file and install the application.", icon: Smartphone },
              { title: "Permissions", desc: 'Grant the "Draw over other apps" permission for the warning overlay.', icon: Settings },
              { title: "Protected", desc: "You are now protected against AI voice clones.", icon: ShieldCheck },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-1 flex-col items-center text-center">
                  <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
                    <Icon className="h-8 w-8" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 max-w-[200px] text-sm text-muted">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-semibold text-foreground">See it in action</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "App Home Screen", src: "/images/home.png", alt: "VoxSentry Home Screen" },
              { label: "Live Call Overlay Warning", src: "/images/alert.png", alt: "Live call alert" },
              { label: "Permissions Setup", src: "/images/permissions.png", alt: "Permissions flow" },
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-center">
                <div className="relative flex h-[520px] w-full max-w-[260px] justify-center overflow-hidden rounded-[2.5rem] border-[6px] border-gray-800 bg-background shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.4)] group-hover:border-primary/50">
                  {/* Glow effect behind the image container */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-primary/0 blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                  
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-8 font-medium text-foreground transition-colors duration-300 group-hover:text-primary">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty Box */}
      <section className="bg-background-alt py-20">
        <div className="mx-auto max-w-3xl px-6">
          <Card className="border-l-4 border-l-primary bg-background shadow-md">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-full bg-primary-light p-2 text-primary shrink-0">
                <Info className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">What this app does NOT do</h3>
                <p className="mt-3 leading-relaxed text-muted">
                  Due to strict Android privacy limitations, VoxSentry <strong>cannot record, save, or transmit your call audio</strong>. 
                  The app processes the audio stream transiently in real-time exclusively for scam detection and discards it instantly. 
                  Your privacy is fully preserved.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">System Requirements</h2>
          <ul className="inline-block space-y-4 text-left text-muted">
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-safe" />
              <span>Android 10.0 or higher</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-safe" />
              <span>4GB RAM minimum (8GB recommended for fastest inference)</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="h-5 w-5 text-safe" />
              <span>&quot;Draw over other apps&quot; permission enabled</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
