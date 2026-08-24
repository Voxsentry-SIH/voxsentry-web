"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type PerformanceTier = "high" | "low";

interface PerformanceContextType {
  tier: PerformanceTier;
  isLowEnd: boolean;
}

const PerformanceContext = createContext<PerformanceContextType>({
  tier: "high",
  isLowEnd: false,
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<PerformanceTier>("high");

  useEffect(() => {
    // Basic heuristic for detecting low-end devices
    let isLow = false;

    // Check device memory if available (Chrome/Edge only)
    const memory = (navigator as any).deviceMemory;
    if (memory && memory <= 4) {
      isLow = true;
    }

    // Check logical cores
    const cores = navigator.hardwareConcurrency;
    if (cores && cores <= 4) {
      isLow = true;
    }

    // Check for explicit save-data preference
    const connection = (navigator as any).connection;
    if (connection && connection.saveData) {
      isLow = true;
    }

    setTier(isLow ? "low" : "high");
  }, []);

  return (
    <PerformanceContext.Provider value={{ tier, isLowEnd: tier === "low" }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);
