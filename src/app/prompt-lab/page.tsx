"use client";

import { useState } from "react";

interface InputProps {
  id: number;
  value: string;
  onChange: (value: string) => void;
  flags: string[];
  onToggleFlag: (flag: string) => void;
}

// Simple placeholder component for now
function PlaceholderInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const availableFlags = [
    "🎯 focus",
    "🎨 creative",
    "📊 analytical",
    "💡 innovative",
    "🚀 energetic",
  ];

  return (
    <div className="space-y-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your prompt here..."
        className="w-full h-32 p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600/50 text-white placeholder-slate-400 rounded-xl resize-none focus:border-cyan-400/50 focus:outline-none transition-all"
      />

      <div className="flex flex-wrap gap-2">
        {availableFlags.map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              flags.includes(flag)
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-slate-600/50"
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function PromptLabPage() {
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [flags, setFlags] = useState<Record<number, string[]>>({});

  const updateInputValue = (id: number, value: string) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const toggleFlag = (inputId: number, flag: string) => {
    setFlags((prev) => ({
      ...prev,
      [inputId]: prev[inputId]?.includes(flag)
        ? prev[inputId].filter((f) => f !== flag)
        : [...(prev[inputId] || []), flag],
    }));
  };

  const promptComponents = [
    {
      id: 1,
      title: "🎡 Radial Prompt Wheel",
      description: "Circular input with contextual flags",
    },
    {
      id: 2,
      title: "🌊 Elastic Morph Input",
      description: "Dynamic reshaping text area",
    },
    {
      id: 3,
      title: "🧠 Neural Network Prompt",
      description: "Interconnected thought mapping",
    },
    {
      id: 4,
      title: "💧 Liquid Glass Input",
      description: "Transparent flowing interface",
    },
    {
      id: 5,
      title: "🌀 Spiral Timeline Input",
      description: "Temporal prompt progression",
    },
    {
      id: 6,
      title: "🏷️ Context Chip Prompt",
      description: "Multi-variable selection system",
    },
    {
      id: 7,
      title: "🌌 Orbital Sentiment Input",
      description: "Emotion-based prompt orbits",
    },
    {
      id: 8,
      title: "📊 Frequency Wave Input",
      description: "Audio-visual prompt waves",
    },
    {
      id: 9,
      title: "🍯 Hexagonal Honeycomb",
      description: "Structured cell-based input",
    },
    {
      id: 10,
      title: "🧬 DNA Helix Input",
      description: "Double-strand prompt evolution",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🧪 Prompt Lab
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Experimental LLM Input Interfaces
          </p>
          <p className="text-sm text-slate-400">
            What if prompting an AI had some extra fun flags and weird
            interaction patterns?
          </p>
        </div>

        {/* Navigation to Emotion Alchemy */}
        <div className="text-center mb-8">
          <a href="/emotion-alchemy" className="inline-block">
            <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
              ⚗️ Try the New Emotion Alchemy Lab
              <span className="ml-2">→</span>
            </button>
          </a>
        </div>

        {/* Prompt Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {promptComponents.map((component) => (
            <div
              key={component.id}
              className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50"
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {component.title}
              </h3>
              <p className="text-sm text-slate-400 mb-6 text-center">
                {component.description}
              </p>
              <PlaceholderInput
                id={component.id}
                value={inputValues[component.id] || ""}
                onChange={(value) => updateInputValue(component.id, value)}
                flags={flags[component.id] || []}
                onToggleFlag={(flag) => toggleFlag(component.id, flag)}
              />
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            🚧 Under Development
          </h2>
          <p className="text-lg text-slate-300 mb-4">
            Advanced interactive components are being developed
          </p>
          <p className="text-sm text-slate-400">
            Each component will feature unique interaction patterns, visual
            effects, and contextual flag systems
          </p>
        </div>

        {/* Debug Panel */}
        <div className="mt-12 bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            🔍 Debug Panel
          </h3>
          <div className="space-y-2 text-sm">
            <div className="text-slate-300">
              <strong>Active Inputs:</strong> {Object.keys(inputValues).length}
            </div>
            <div className="text-slate-300">
              <strong>Total Flags:</strong> {Object.values(flags).flat().length}
            </div>
            <div className="text-slate-400 mt-4">
              <strong>Current Values:</strong>
              <pre className="mt-2 p-3 bg-slate-900/50 rounded-lg overflow-auto text-xs">
                {JSON.stringify({ inputValues, flags }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
