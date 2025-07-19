"use client";

import { useEffect, useState } from "react";

export default function HeroMouseTracker() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 100;
      const y = (e.clientY / window.innerHeight - 0.5) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  if (!isClient) return null;

  return (
    <>
      {/* Dynamic floating orbs that follow mouse */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: "20%",
          top: "30%",
          transform: `translate(${mousePos.x * 0.008}px, ${
            mousePos.y * 0.008
          }px)`, // Ultra reduced movement
          transition: "transform 1s ease-out", // Much slower response
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-[#D4B5C8]/10 to-[#C5768A]/5 rounded-full blur-2xl" />
      </div>

      <div
        className="absolute pointer-events-none z-10"
        style={{
          right: "15%",
          top: "60%",
          transform: `translate(${mousePos.x * -0.005}px, ${
            mousePos.y * -0.006
          }px)`, // Reduced movement
          transition: "transform 1.2s ease-out", // Much slower response
        }}
      >
        <div className="w-48 h-48 bg-gradient-to-br from-[#805C6F]/8 to-[#9A4453]/5 rounded-full blur-3xl" />
      </div>

      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: "70%",
          top: "20%",
          transform: `translate(${mousePos.x * 0.004}px, ${
            mousePos.y * 0.008
          }px)`, // Reduced movement
          transition: "transform 1s ease-out", // Much slower response
        }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-[#C5768A]/12 to-[#D4B5C8]/8 rounded-full blur-xl" />
      </div>

      {/* Subtle responsive geometric elements */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          left: "10%",
          bottom: "30%",
          transform: `translate(${mousePos.x * 0.006}px, ${
            mousePos.y * -0.003
          }px) rotate(${mousePos.x * 0.015}deg)`, // Ultra reduced movement
          transition: "transform 1.5s ease-out", // Much slower response
        }}
      >
        <div className="w-16 h-16 border border-[#D4B5C8]/15 rounded-lg backdrop-blur-sm" />
      </div>

      <div
        className="absolute pointer-events-none z-10"
        style={{
          right: "10%",
          bottom: "20%",
          transform: `translate(${mousePos.x * -0.008}px, ${
            mousePos.y * 0.005
          }px) rotate(${mousePos.x * -0.02}deg)`, // Ultra reduced movement
          transition: "transform 1.4s ease-out", // Much slower response
        }}
      >
        <div className="w-12 h-12 bg-[#9A4453]/12 rounded-full backdrop-blur-sm border border-[#C5768A]/20" />
      </div>

      {/* Removed parallax lines to reduce visual noise */}
    </>
  );
}
