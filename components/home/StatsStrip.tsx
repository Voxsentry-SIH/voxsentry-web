import { mockStats } from "@/lib/mockData";

export default function StatsStrip() {
  return (
    <section className="bg-transparent border-y border-[rgba(34,211,238,0.1)] py-12 md:py-16 relative overflow-hidden">
      {/* Subtle Circuit/Grid Overlay matching HowItWorks */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {mockStats.map((stat, index) => (
            <div 
              key={index} 
              className="reveal-up glass-card flex flex-col items-center justify-center text-center p-8 rounded-2xl transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {stat.value}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
