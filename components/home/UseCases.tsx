import { Users, Briefcase, PhoneIncoming, UserMinus } from "lucide-react";
import Card from "@/components/ui/Card";

export default function UseCases() {
  const cases = [
    {
      title: "Family impersonation",
      description: "Someone sounds exactly like a loved one asking for urgent help.",
      icon: Users,
    },
    {
      title: "Executive impersonation",
      description: "A synthetic voice attempts to authorize a sensitive action.",
      icon: Briefcase,
    },
    {
      title: "Trusted-contact spoofing",
      description: "A familiar voice is used to create false confidence.",
      icon: PhoneIncoming,
    },
    {
      title: "Unknown callers",
      description: "A suspicious call needs an additional layer of verification.",
      icon: UserMinus,
    },
  ];

  return (
    <section className="bg-background py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Built for the moments when trust matters
          </h2>
          <p className="text-lg text-muted">
            Voice cloning changes how scams operate. VoxSentry is designed to detect the subtle anomalies that humans miss.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card key={idx} className="flex flex-col items-start bg-background-alt border-none shadow-none">
                <div className="mb-4 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
