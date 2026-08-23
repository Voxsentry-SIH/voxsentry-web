// Placeholder — shared UI component
interface PillProps {
  variant: "cloned" | "real";
  confidence: number;
}

export default function Pill({ variant, confidence }: PillProps) {
  const colors = {
    cloned: "bg-danger/10 text-danger",
    real: "bg-safe/10 text-safe",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${colors[variant]}`}
    >
      {variant === "cloned" ? "Cloned" : "Verified Real"} — {confidence}%
    </span>
  );
}
