import Card from "@/components/ui/Card";

const teamMembers = [
  { name: "Alice Johnson", role: "Machine Learning Lead", initial: "A" },
  { name: "Bob Smith", role: "Frontend Developer", initial: "B" },
  { name: "Charlie Davis", role: "Backend Engineer", initial: "C" },
  { name: "Diana Prince", role: "Product Manager", initial: "D" },
  { name: "Ethan Hunt", role: "Security Researcher", initial: "E" },
  { name: "Fiona Gallagher", role: "UX Designer", initial: "F" },
];

export default function TeamSection() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
          Built by engineers exploring safer voice communication
        </h2>
        <p className="text-lg leading-relaxed text-muted max-w-2xl mx-auto">
          VoxSentry originated as a research project to combat the rising threat of synthetic voice cloning and impersonation scams. Our focus is on bringing enterprise-grade detection algorithms directly to personal devices, ensuring real-time protection without compromising user privacy.
        </p>
      </div>
    </section>
  );
}
