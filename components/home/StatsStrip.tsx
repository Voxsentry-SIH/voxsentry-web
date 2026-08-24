import { mockStats } from "@/lib/mockData";

export default function StatsStrip() {
  return (
    <section className="bg-background border-y border-border py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {mockStats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center text-center px-4 sm:px-8 py-4 sm:py-0">
              <div className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-2">
                {stat.value}
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-muted/70">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
