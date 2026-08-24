import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import VideoColumn from "@/components/home/VideoColumn";
import FeatureGrid from "@/components/home/FeatureGrid";
import DetectionVisualization from "@/components/home/DetectionVisualization";
import UseCases from "@/components/home/UseCases";
import StatsStrip from "@/components/home/StatsStrip";
import PrivacySection from "@/components/home/PrivacySection";
import TeamSection from "@/components/home/TeamSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden">
      <Hero />
      <HowItWorks />
      <VideoColumn />
      <FeatureGrid />
      <DetectionVisualization />
      <UseCases />
      <StatsStrip />
      <PrivacySection />
      <TeamSection />
      <FinalCTA />
    </main>
  );
}
