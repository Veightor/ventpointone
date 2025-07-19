"use client";

import { useState, useEffect } from "react";
import GenerativeArt from "./GenerativeArt";

interface ArtOrchestratorProps {
  className?: string;
}

interface ArtConfig {
  variant:
    | "flowing-lines"
    | "neural-network"
    | "organic-growth"
    | "minimal-geometry"
    | "particle-dance";
  color: string;
  opacity: number;
  speed: number;
}

export default function ArtOrchestrator({ className }: ArtOrchestratorProps) {
  const [artConfig, setArtConfig] = useState<ArtConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Color palette matching the site's dusky theme
  const colorPalette = [
    "#D4B5C8", // frosted-lilac
    "#C5768A", // soft-rose
    "#805C6F", // dusty-mauve
    "#9A4453", // muted-burgundy
    "#5A3D48", // shadowed-plum
  ];

  // Art configurations with weighted probabilities - increased opacity for more visibility
  const artConfigurations = [
    {
      variant: "flowing-lines" as const,
      weight: 25,
      opacityRange: [0.2, 0.3], // Increased from [0.05, 0.12]
      speedRange: [0.8, 1.5],
    },
    {
      variant: "neural-network" as const,
      weight: 20,
      opacityRange: [0.22, 0.32], // Increased from [0.06, 0.15]
      speedRange: [0.5, 1.2],
    },
    {
      variant: "organic-growth" as const,
      weight: 15,
      opacityRange: [0.18, 0.28], // Increased from [0.04, 0.1]
      speedRange: [0.6, 1.0],
    },
    {
      variant: "minimal-geometry" as const,
      weight: 25,
      opacityRange: [0.15, 0.25], // Increased from [0.03, 0.08]
      speedRange: [0.3, 0.8],
    },
    {
      variant: "particle-dance" as const,
      weight: 15,
      opacityRange: [0.25, 0.35], // Increased from [0.06, 0.14]
      speedRange: [0.7, 1.3],
    },
  ];

  // Weighted random selection
  const selectRandomConfiguration = () => {
    const totalWeight = artConfigurations.reduce(
      (sum, config) => sum + config.weight,
      0
    );
    let random = Math.random() * totalWeight;

    for (const config of artConfigurations) {
      random -= config.weight;
      if (random <= 0) {
        return config;
      }
    }

    return artConfigurations[0]; // Fallback
  };

  const generateRandomConfig = (): ArtConfig => {
    const selectedConfig = selectRandomConfiguration();
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const opacity =
      selectedConfig.opacityRange[0] +
      Math.random() *
        (selectedConfig.opacityRange[1] - selectedConfig.opacityRange[0]);
    const speed =
      selectedConfig.speedRange[0] +
      Math.random() *
        (selectedConfig.speedRange[1] - selectedConfig.speedRange[0]);

    return {
      variant: selectedConfig.variant,
      color,
      opacity,
      speed,
    };
  };

  useEffect(() => {
    // Create a unique seed based on current time for this session
    const sessionSeed = Date.now();

    // Use session seed to generate consistent randomness for this visit
    const seededRandom = () => {
      const x = Math.sin(sessionSeed) * 10000;
      return x - Math.floor(x);
    };

    // Generate art configuration for this session
    const config = generateRandomConfig();

    // Add some session-specific variation
    config.opacity *= 0.8 + seededRandom() * 0.4;
    config.speed *= 0.7 + seededRandom() * 0.6;

    setArtConfig(config);

    // Fade in the art after a brief delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Occasionally refresh the art (every 3-5 minutes)
  useEffect(() => {
    const refreshInterval = (180 + Math.random() * 120) * 1000; // 3-5 minutes

    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setArtConfig(generateRandomConfig());
        setIsVisible(true);
      }, 1000);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, []);

  if (!artConfig) return null;

  return (
    <div
      className={`transition-opacity duration-2000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <GenerativeArt
        variant={artConfig.variant}
        color={artConfig.color}
        opacity={artConfig.opacity}
        speed={artConfig.speed}
      />

      {/* Subtle gradient overlay to ensure content readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#2A2A2A]/10 via-transparent to-[#2A2A2A]/20"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
