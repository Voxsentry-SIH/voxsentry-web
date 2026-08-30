import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { PerformanceProvider } from "@/providers/PerformanceProvider";
import Particles from "@/components/ui/Particles";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VoxSentry — AI Voice-Clone Detection",
  description:
    "Real-time AI-powered voice-clone detection. Protect your calls from synthetic voice scams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <Particles
            particleColors={["#ffffff", "#6366f1", "#8b5cf6", "#06b6d4"]}
            particleCount={150}
            particleSpread={10}
            speed={0.05}
            particleBaseSize={80}
            moveParticlesOnHover={true}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
        <PerformanceProvider>
          <ScrollReveal />
          <Navbar />
          {children}
          <Footer />
        </PerformanceProvider>
      </body>
    </html>
  );
}
