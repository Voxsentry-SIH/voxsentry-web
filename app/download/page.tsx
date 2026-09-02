import { Download, ShieldCheck, Smartphone, Settings, Check, AlertTriangle } from "lucide-react";

export default function DownloadPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden relative">
      {/* Circuit/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center sm:py-32">
        <div className="reveal-up">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-md">
            Get VoxSentry for Android
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Download the latest version of the VoxSentry app to protect yourself from synthetic voice scams in real-time.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/voxsentry-v1.0.1.apk" download className="btn-primary px-8 py-4 text-lg inline-flex items-center">
              <Download className="h-5 w-5 mr-3" />
              Download APK (v1.0.1)
            </a>
          </div>
        </div>
      </section>

      {/* Setup Flow */}
      <section className="relative z-10 py-16 border-y border-[rgba(34,211,238,0.1)] bg-[#050514]/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal-up mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Getting Started</h2>
            <p className="text-slate-400">Four simple steps to secure your calls.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { title: "Download", desc: "Get the latest APK (v1.0.1) from our secure servers.", icon: Download },
              { title: "Install", desc: "Open the downloaded file and install the app.", icon: Smartphone },
              { title: "Permissions", desc: 'Grant "Draw over other apps" for the overlay.', icon: Settings },
              { title: "Protected", desc: "You are now protected against AI voice clones.", icon: ShieldCheck },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx} 
                  className="reveal-up glass-card flex flex-col items-center text-center p-8 rounded-2xl relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 text-slate-700 font-bold text-4xl opacity-20 pointer-events-none">
                    0{idx + 1}
                  </div>
                  <div className="glow-badge h-16 w-16 mb-6">
                    <Icon className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="reveal-up mb-16 text-center">
            <h2 className="text-3xl font-bold text-white">See it in action</h2>
          </div>
          
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { label: "App Home Screen", src: "/images/home.png", alt: "VoxSentry Home Screen" },
              { label: "Live Call Overlay Warning", src: "/images/alert.png", alt: "Live call alert" },
              { label: "Permissions Setup", src: "/images/permissions.png", alt: "Permissions flow" },
            ].map((item, idx) => (
              <div key={idx} className="reveal-up group flex flex-col items-center">
                <div className="glass-card relative flex h-[520px] w-full max-w-[260px] justify-center overflow-hidden rounded-[2.5rem] border-[6px] border-cyan-400/20 bg-[#111827] shadow-[0_0_30px_rgba(34,211,238,0.1)] transition-all duration-500 ease-out hover:border-cyan-400/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:-translate-y-4">
                  {/* Subtle inner glow matching phone styling */}
                  <div className="absolute inset-0 -z-10 rounded-full bg-cyan-400/5 blur-2xl group-hover:bg-cyan-400/10 transition-all duration-500 transform-gpu will-change-transform" />
                  
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-8 font-medium text-slate-400 transition-colors duration-300 group-hover:text-cyan-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty Box */}
      <section className="relative z-10 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="reveal-up rounded-2xl p-8 backdrop-blur-md bg-[rgba(30,20,10,0.6)] border border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:shadow-[0_0_40px_rgba(245,158,11,0.2)] transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start">
            <div className="h-14 w-14 shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <AlertTriangle className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">What this app does NOT do</h3>
              <p className="leading-relaxed text-slate-300">
                Due to strict Android privacy limitations, VoxSentry <strong className="text-white font-semibold">cannot record, save, or transmit your call audio</strong>. 
                The app processes the audio stream transiently in real-time exclusively for scam detection and discards it instantly. 
                Your privacy is fully preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="relative z-10 py-16 pb-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="reveal-up">
            <h2 className="mb-8 text-2xl font-bold text-white">System Requirements</h2>
            <div className="glass-card inline-block p-8 rounded-2xl text-left border-cyan-400/20">
              <ul className="space-y-5 text-slate-400">
                <li className="flex items-center gap-4">
                  <div className="glow-badge h-8 w-8 shrink-0">
                    <Check className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="font-medium text-slate-200">Android 10.0 or higher</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="glow-badge h-8 w-8 shrink-0">
                    <Check className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="font-medium text-slate-200">4GB RAM minimum <span className="text-slate-500">(8GB recommended for fastest inference)</span></span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="glow-badge h-8 w-8 shrink-0">
                    <Check className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="font-medium text-slate-200">&quot;Draw over other apps&quot; permission enabled</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
