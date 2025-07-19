"use client";

import { useState, useRef, useEffect } from "react";

interface InputProps {
  id: number;
  value: string;
  onChange: (value: string) => void;
  flags: string[];
  onToggleFlag: (flag: string) => void;
}

// Radial Prompt Wheel Component
function RadialPromptWheel({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [rotation, setRotation] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const contextOptions = [
    "🎯 focus",
    "🎨 creative",
    "📊 analytical",
    "💡 innovative",
    "🚀 energetic",
  ];

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Outer Ring */}
      <div
        className={`absolute w-48 h-48 rounded-full border-2 border-cyan-400/30 transition-all duration-500 ${
          isActive ? "border-cyan-400/80 shadow-lg shadow-cyan-400/20" : ""
        }`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
      >
        {/* Context Flags around the circle */}
        {contextOptions.map((flag, index) => {
          const angle = index * 72 - 90; // 360/5 = 72 degrees apart
          const radian = (angle * Math.PI) / 180;
          const radius = 85;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;

          return (
            <button
              key={flag}
              onClick={() => {
                onToggleFlag(flag);
                setRotation((prev) => prev + 30);
              }}
              className={`absolute w-16 h-16 rounded-full text-xs font-medium transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 ${
                flags.includes(flag)
                  ? "bg-cyan-500/40 text-cyan-200 border-2 border-cyan-400 scale-110"
                  : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-cyan-500/20 hover:scale-105"
              }`}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
            >
              {flag.split(" ")[0]}
            </button>
          );
        })}
      </div>

      {/* Center Input */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Center your thoughts..."
        className="w-32 h-32 p-3 bg-slate-800/90 backdrop-blur-sm border-2 border-cyan-400/50 text-white placeholder-cyan-300/50 rounded-full resize-none focus:border-cyan-400 focus:outline-none text-center text-sm leading-tight overflow-hidden"
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />

      {/* Animated Particles */}
      {isActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-30"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Elastic Morph Input Component
function ElasticMorphInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [morphLevel, setMorphLevel] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    setMorphLevel(e.target.value.length);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 500);
  };

  const elasticRadius = Math.min(20 + morphLevel * 0.5, 40);

  return (
    <div className="relative">
      <div
        className="relative transition-all duration-300 ease-out"
        style={{
          borderRadius: `${elasticRadius}px`,
          transform: `scale(${1 + morphLevel * 0.002})`,
        }}
      >
        <textarea
          value={value}
          onChange={handleChange}
          placeholder="Watch me morph as you type..."
          className={`w-full h-32 p-4 bg-gradient-to-br from-emerald-800/80 to-teal-700/60 backdrop-blur-sm border-2 text-white placeholder-emerald-300/50 resize-none focus:outline-none transition-all duration-300 ${
            isTyping
              ? "border-emerald-400 shadow-lg shadow-emerald-400/20"
              : "border-emerald-500/50"
          }`}
          style={{
            borderRadius: `${elasticRadius}px`,
            boxShadow: isTyping
              ? `0 0 ${Math.min(morphLevel, 30)}px rgba(16, 185, 129, 0.3)`
              : "",
          }}
        />

        {/* Morph Indicator */}
        <div className="absolute -top-2 -right-2 flex space-x-1">
          {[...Array(Math.floor(morphLevel / 10) + 1)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Flag Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["🌊 fluid", "🔄 adaptive", "💫 dynamic"].map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              flags.includes(flag)
                ? "bg-emerald-500/40 text-emerald-200 border border-emerald-400 animate-bounce"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-emerald-500/20"
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Neural Network Prompt Component
function NeuralNetworkPrompt({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const [connectionPulse, setConnectionPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionPulse((prev) => (prev + 1) % 4);
      if (value.length > 0) {
        const newNodes = Array.from(
          { length: Math.min(value.split(" ").length, 8) },
          (_, i) => i
        );
        setActiveNodes(newNodes);
      } else {
        setActiveNodes([]);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [value]);

  const nodePositions = [
    { x: 20, y: 20 },
    { x: 80, y: 30 },
    { x: 60, y: 60 },
    { x: 30, y: 80 },
    { x: 70, y: 80 },
    { x: 90, y: 50 },
    { x: 10, y: 50 },
    { x: 50, y: 10 },
  ];

  return (
    <div className="relative">
      {/* Neural Network Visualization */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Connections */}
          {activeNodes.map((node, i) =>
            activeNodes
              .slice(i + 1)
              .map((otherNode, j) => (
                <line
                  key={`${node}-${otherNode}`}
                  x1={nodePositions[node].x}
                  y1={nodePositions[node].y}
                  x2={nodePositions[otherNode].x}
                  y2={nodePositions[otherNode].y}
                  stroke="rgba(139, 92, 246, 0.4)"
                  strokeWidth="0.5"
                  className={
                    connectionPulse === (i + j) % 4 ? "animate-pulse" : ""
                  }
                />
              ))
          )}

          {/* Nodes */}
          {nodePositions.map((pos, i) => (
            <circle
              key={i}
              cx={pos.x}
              cy={pos.y}
              r={activeNodes.includes(i) ? "2" : "1"}
              fill={
                activeNodes.includes(i) ? "#a855f7" : "rgba(168, 85, 247, 0.3)"
              }
              className={activeNodes.includes(i) ? "animate-pulse" : ""}
            />
          ))}
        </svg>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Neural pathways activate as you think..."
        className="w-full h-32 p-4 bg-purple-900/20 backdrop-blur-sm border-2 border-purple-500/50 text-white placeholder-purple-300/50 rounded-xl resize-none focus:border-purple-400 focus:outline-none relative z-20"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {["🧠 neural", "🔗 connected", "⚡ synaptic"].map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              flags.includes(flag)
                ? "bg-purple-500/40 text-purple-200 border border-purple-400"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-purple-500/20"
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Liquid Glass Input Component
function LiquidGlassInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addRipple = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl"
      onClick={addRipple}
    >
      {/* Liquid Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 bg-cyan-400/30 rounded-full animate-ping" />
        </div>
      ))}

      {/* Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-teal-500/10 backdrop-blur-xl" />

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Your thoughts flow like liquid glass..."
        className="w-full h-32 p-4 bg-transparent border-2 border-cyan-400/30 text-white placeholder-cyan-300/50 rounded-2xl resize-none focus:border-cyan-400/60 focus:outline-none relative z-10"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {["💧 fluid", "✨ crystal", "🌊 flowing"].map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              flags.includes(flag)
                ? "bg-cyan-500/40 text-cyan-200 border border-cyan-400"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-cyan-500/20"
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Spiral Timeline Input Component
function SpiralTimelineInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [timelinePosition, setTimelinePosition] = useState(0);

  useEffect(() => {
    setTimelinePosition(value.length * 2);
  }, [value]);

  const spiralPath = `M 50,50 m -30,0 A 30,30 0 1,1 50,20 A 20,20 0 1,1 50,30 A 10,10 0 1,1 50,40`;

  return (
    <div className="relative">
      {/* Spiral Visualization */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        <svg className="w-24 h-24" viewBox="0 0 100 100">
          <defs>
            <linearGradient
              id="spiralGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.6)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
            </linearGradient>
          </defs>

          <path
            d={spiralPath}
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth="2"
            className="animate-pulse"
          />

          <circle
            cx="50"
            cy="50"
            r="3"
            fill="#ec4899"
            className="animate-bounce"
            style={{
              transform: `rotate(${timelinePosition}deg)`,
              transformOrigin: "50px 50px",
            }}
          />
        </svg>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Time spirals as ideas evolve..."
        className="w-full h-32 p-4 bg-pink-900/20 backdrop-blur-sm border-2 border-pink-500/50 text-white placeholder-pink-300/50 rounded-xl resize-none focus:border-pink-400 focus:outline-none relative z-20"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {["🌀 spiral", "⏰ temporal", "🔄 evolving"].map((flag) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              flags.includes(flag)
                ? "bg-pink-500/40 text-pink-200 border border-pink-400"
                : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-pink-500/20"
            }`}
          >
            {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

// Simple placeholder for other components
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
        placeholder="Coming soon with unique interactions..."
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

  const getComponent = (id: number) => {
    const commonProps = {
      id,
      value: inputValues[id] || "",
      onChange: (value: string) => updateInputValue(id, value),
      flags: flags[id] || [],
      onToggleFlag: (flag: string) => toggleFlag(id, flag),
    };

    switch (id) {
      case 1:
        return <RadialPromptWheel {...commonProps} />;
      case 2:
        return <ElasticMorphInput {...commonProps} />;
      case 3:
        return <NeuralNetworkPrompt {...commonProps} />;
      case 4:
        return <LiquidGlassInput {...commonProps} />;
      case 5:
        return <SpiralTimelineInput {...commonProps} />;
      default:
        return <PlaceholderInput {...commonProps} />;
    }
  };

  const promptComponents = [
    {
      id: 1,
      title: "🎡 Radial Prompt Wheel",
      description:
        "Circular input with contextual flags orbiting around your thoughts",
    },
    {
      id: 2,
      title: "🌊 Elastic Morph Input",
      description: "Dynamic reshaping interface that morphs as you type",
    },
    {
      id: 3,
      title: "🧠 Neural Network Prompt",
      description: "Interconnected thought mapping with visual neural pathways",
    },
    {
      id: 4,
      title: "💧 Liquid Glass Input",
      description: "Transparent flowing interface with ripple interactions",
    },
    {
      id: 5,
      title: "🌀 Spiral Timeline Input",
      description: "Temporal prompt progression in a spiral visualization",
    },
    {
      id: 6,
      title: "🏷️ Context Chip Prompt",
      description: "Multi-variable selection system (coming soon)",
    },
    {
      id: 7,
      title: "🌌 Orbital Sentiment Input",
      description: "Emotion-based prompt orbits (coming soon)",
    },
    {
      id: 8,
      title: "📊 Frequency Wave Input",
      description: "Audio-visual prompt waves (coming soon)",
    },
    {
      id: 9,
      title: "🍯 Hexagonal Honeycomb",
      description: "Structured cell-based input (coming soon)",
    },
    {
      id: 10,
      title: "🧬 DNA Helix Input",
      description: "Double-strand prompt evolution (coming soon)",
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
        <div className="text-center mb-12">
          <a href="/emotion-alchemy" className="inline-block">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/25">
              ⚗️ Try the New Emotion Alchemy Lab
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
          </a>
        </div>

        {/* Prompt Components Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {promptComponents.map((component) => (
            <div
              key={component.id}
              className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/30 shadow-2xl hover:bg-slate-800/60 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center">
                {component.title}
              </h3>
              <p className="text-sm text-slate-400 mb-6 text-center leading-relaxed">
                {component.description}
              </p>
              {getComponent(component.id)}
            </div>
          ))}
        </div>

        {/* Active Experiments Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🚀 Live Experiments
          </h2>
          <p className="text-lg text-slate-300 mb-4">
            Interactive components are now live! More coming soon...
          </p>
          <p className="text-sm text-slate-400">
            Each component features unique interaction patterns, visual effects,
            and contextual flag systems
          </p>
        </div>

        {/* Debug Panel */}
        <div className="mt-12 bg-slate-800/20 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/20">
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
              <pre className="mt-2 p-3 bg-slate-900/50 rounded-lg overflow-auto text-xs max-h-32">
                {JSON.stringify({ inputValues, flags }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
