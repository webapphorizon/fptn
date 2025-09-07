"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PlatformContextType {
  selectedPlatform: string;
  setSelectedPlatform: (platform: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(
  undefined,
);

export const PlatformProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("android");

  return (
    <PlatformContext.Provider value={{ selectedPlatform, setSelectedPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error("usePlatform must be used within a PlatformProvider");
  }
  return context;
};
