"use client";

import { useState } from "react";

const artVariants = [
  {
    name: "Flowing Lines",
    description:
      "Organic streams of consciousness guided by Perlin noise, creating fluid pathways that respond to the digital wind.",
    characteristics: [
      "Perlin noise movement",
      "Trail-based visualization",
      "Fluid dynamics",
      "Natural randomness",
    ],
    color: "#D4B5C8",
    probability: "25%",
  },
  {
    name: "Neural Network",
    description:
      "Pulsing nodes connected by synaptic lines, mimicking the gentle electrical whispers of thought itself.",
    characteristics: [
      "Connected nodes",
      "Pulsing rhythms",
      "Emergent patterns",
      "Information flow",
    ],
    color: "#C5768A",
    probability: "20%",
  },
  {
    name: "Organic Growth",
    description:
      "Digital seeds that branch and spread like neural pathways, growing into unique organic structures.",
    characteristics: [
      "Branching algorithms",
      "Generational growth",
      "Natural structures",
      "Emergent complexity",
    ],
    color: "#805C6F",
    probability: "15%",
  },
  {
    name: "Minimal Geometry",
    description:
      "Breathing geometric forms that rotate and scale in harmonious mathematical rhythms.",
    characteristics: [
      "Mathematical precision",
      "Geometric harmony",
      "Rhythmic breathing",
      "Rotational dynamics",
    ],
    color: "#9A4453",
    probability: "25%",
  },
  {
    name: "Particle Dance",
    description:
      "Ethereal particles that orbit and connect, creating constellations of interactive beauty.",
    characteristics: [
      "Orbital mechanics",
      "Connection networks",
      "Gravitational fields",
      "Celestial motion",
    ],
    color: "#5A3D48",
    probability: "15%",
  },
];

export default function ArtExplainer() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#9A4453]/80 to-[#C5768A]/80 backdrop-blur-lg rounded-full border border-[#D4B5C8]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
      >
        <div className="flex items-center justify-center w-full h-full">
          <svg
            className={`w-6 h-6 text-[#EAEAEA] transition-transform duration-300 ${
              isExpanded ? "rotate-45" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#C5768A] to-[#D4B5C8] rounded-full animate-pulse"></div>
      </button>

      {/* Expanded Panel */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#2A2A2A]/80 backdrop-blur-md"
          onClick={() => setIsExpanded(false)}
        />

        {/* Content Panel */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2A2A2A] via-[#2A2A2A]/95 to-[#5A3D48]/90 backdrop-blur-xl border-t border-[#805C6F]/30 transform transition-transform duration-500 translate-y-0">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#D4B5C8] via-[#C5768A] to-[#9A4453] bg-clip-text text-transparent">
                  Generative Art System
                </span>
              </h2>
              <p className="text-[#805C6F] max-w-2xl mx-auto leading-relaxed">
                Each visit to this site generates a unique visual identity
                through algorithmic artistry. Five distinct variants create an
                ever-changing ambient atmosphere.
              </p>
            </div>

            {/* Art Variants Grid */}
            <div className="grid md:grid-cols-5 gap-4 mb-8">
              {artVariants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                    selectedVariant === index
                      ? "border-[#C5768A]/60 bg-[#5A3D48]/40"
                      : "border-[#805C6F]/30 bg-[#5A3D48]/20 hover:border-[#C5768A]/40"
                  }`}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-3 mx-auto opacity-60"
                    style={{ backgroundColor: variant.color }}
                  />
                  <h3 className="text-sm font-bold text-[#EAEAEA] mb-1">
                    {variant.name}
                  </h3>
                  <p className="text-xs text-[#805C6F]">
                    {variant.probability}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Variant Details */}
            <div className="bg-[#5A3D48]/30 backdrop-blur-lg rounded-3xl p-6 border border-[#805C6F]/30">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-[#EAEAEA] mb-3">
                    {artVariants[selectedVariant].name}
                  </h3>
                  <p className="text-[#D4B5C8] leading-relaxed mb-4">
                    {artVariants[selectedVariant].description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-[#805C6F]">Probability:</span>
                    <span className="font-bold text-[#C5768A]">
                      {artVariants[selectedVariant].probability}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#EAEAEA] mb-3">
                    Characteristics
                  </h4>
                  <div className="space-y-2">
                    {artVariants[selectedVariant].characteristics.map(
                      (char, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 text-sm text-[#D4B5C8]"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#C5768A]" />
                          <span>{char}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-[#9A4453]/20 rounded-2xl p-4 border border-[#9A4453]/30">
                <div className="text-2xl font-bold text-[#C5768A] mb-1">
                  p5.js
                </div>
                <div className="text-sm text-[#805C6F]">
                  Creative Coding Engine
                </div>
              </div>
              <div className="bg-[#805C6F]/20 rounded-2xl p-4 border border-[#805C6F]/30">
                <div className="text-2xl font-bold text-[#D4B5C8] mb-1">
                  0.15-0.35
                </div>
                <div className="text-sm text-[#805C6F]">Opacity Range</div>
              </div>
              <div className="bg-[#C5768A]/20 rounded-2xl p-4 border border-[#C5768A]/30">
                <div className="text-2xl font-bold text-[#EAEAEA] mb-1">
                  60fps
                </div>
                <div className="text-sm text-[#805C6F]">Smooth Animation</div>
              </div>
            </div>

            {/* Interactive Features */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-3 bg-[#5A3D48]/40 rounded-full px-6 py-3 border border-[#805C6F]/30">
                <div className="w-3 h-3 bg-[#C5768A] rounded-full animate-pulse" />
                <span className="text-sm text-[#D4B5C8]">
                  Interactive layer responds to mouse movement
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
