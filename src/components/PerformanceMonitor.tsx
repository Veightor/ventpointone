"use client";

import { useState, useEffect } from "react";

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        // Update every second
        const currentFps = Math.round(
          (frameCount * 1000) / (currentTime - lastTime)
        );
        setFps(currentFps);
        frameCount = 0;
        lastTime = currentTime;

        // Show indicator temporarily if FPS drops below 45
        if (currentFps < 45) {
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 3000);
        }
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    // Only enable in development
    if (process.env.NODE_ENV === "development") {
      animationId = requestAnimationFrame(measureFPS);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  if (process.env.NODE_ENV !== "development" || !isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-[#2A2A2A]/80 backdrop-blur-lg rounded-lg px-3 py-2 border border-[#805C6F]/30">
      <div className="flex items-center space-x-2">
        <div
          className={`w-2 h-2 rounded-full ${
            fps >= 55
              ? "bg-green-400"
              : fps >= 30
              ? "bg-yellow-400"
              : "bg-red-400"
          }`}
        />
        <span className="text-xs text-[#D4B5C8] font-mono">{fps} FPS</span>
      </div>
    </div>
  );
}
