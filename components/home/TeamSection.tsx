export default function TeamSection() {
  return (
    <section className="bg-transparent py-20 md:py-32 relative z-10">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="reveal-up glow-badge h-12 w-12 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        </div>
        <h2 className="reveal-up text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
          Built by engineers exploring safer voice communication
        </h2>
        <p className="reveal-up text-lg leading-relaxed text-slate-400 max-w-2xl mx-auto">
          VoxSentry originated as a research project to combat the rising threat of synthetic voice cloning and impersonation scams. Our focus is on bringing enterprise-grade detection algorithms directly to personal devices, ensuring real-time protection without compromising user privacy.
        </p>
      </div>
    </section>
  );
}
