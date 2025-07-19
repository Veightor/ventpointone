"use client";

import { useState, useRef, useEffect } from "react";

export default function PromptLabPage() {
  const [selectedInput, setSelectedInput] = useState<number | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* 1. Radial Prompt Wheel */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🎡 Radial Prompt Wheel
            </h3>
            <RadialPromptWheel
              id={1}
              value={inputValues[1] || ""}
              onChange={(value) => updateInputValue(1, value)}
              flags={flags[1] || []}
              onToggleFlag={(flag) => toggleFlag(1, flag)}
            />
          </div>

          {/* 2. Elastic Morph Input */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🫧 Elastic Morph
            </h3>
            <ElasticMorphInput
              id={2}
              value={inputValues[2] || ""}
              onChange={(value) => updateInputValue(2, value)}
              flags={flags[2] || []}
              onToggleFlag={(flag) => toggleFlag(2, flag)}
            />
          </div>

          {/* 3. Neural Network Prompt */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🧠 Neural Nodes
            </h3>
            <NeuralNetworkPrompt
              id={3}
              value={inputValues[3] || ""}
              onChange={(value) => updateInputValue(3, value)}
              flags={flags[3] || []}
              onToggleFlag={(flag) => toggleFlag(3, flag)}
            />
          </div>

          {/* 4. Liquid Glass Flow */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              💧 Liquid Glass
            </h3>
            <LiquidGlassInput
              id={4}
              value={inputValues[4] || ""}
              onChange={(value) => updateInputValue(4, value)}
              flags={flags[4] || []}
              onToggleFlag={(flag) => toggleFlag(4, flag)}
            />
          </div>

          {/* 5. Spiral Timeline */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🌀 Spiral Timeline
            </h3>
            <SpiralTimelineInput
              id={5}
              value={inputValues[5] || ""}
              onChange={(value) => updateInputValue(5, value)}
              flags={flags[5] || []}
              onToggleFlag={(flag) => toggleFlag(5, flag)}
            />
          </div>

          {/* 6. Context Chip Prompt */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🏷️ Context Chips
            </h3>
            <ContextChipPrompt
              id={6}
              value={inputValues[6] || ""}
              onChange={(value) => updateInputValue(6, value)}
              flags={flags[6] || []}
              onToggleFlag={(flag) => toggleFlag(6, flag)}
            />
          </div>

          {/* 7. Orbital Sentiment */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🪐 Orbital Sentiment
            </h3>
            <OrbitalSentimentInput
              id={7}
              value={inputValues[7] || ""}
              onChange={(value) => updateInputValue(7, value)}
              flags={flags[7] || []}
              onToggleFlag={(flag) => toggleFlag(7, flag)}
            />
          </div>

          {/* 8. Frequency Wave */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              📊 Frequency Wave
            </h3>
            <FrequencyWaveInput
              id={8}
              value={inputValues[8] || ""}
              onChange={(value) => updateInputValue(8, value)}
              flags={flags[8] || []}
              onToggleFlag={(flag) => toggleFlag(8, flag)}
            />
          </div>

          {/* 9. Hexagonal Honeycomb */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🍯 Honeycomb Grid
            </h3>
            <HexagonalHoneycombInput
              id={9}
              value={inputValues[9] || ""}
              onChange={(value) => updateInputValue(9, value)}
              flags={flags[9] || []}
              onToggleFlag={(flag) => toggleFlag(9, flag)}
            />
          </div>

          {/* 10. DNA Helix Prompt */}
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              🧬 DNA Helix
            </h3>
            <DNAHelixInput
              id={10}
              value={inputValues[10] || ""}
              onChange={(value) => updateInputValue(10, value)}
              flags={flags[10] || []}
              onToggleFlag={(flag) => toggleFlag(10, flag)}
            />
          </div>
        </div>

        {/* Decision Tree Laboratory */}
        <div className="mt-16 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              🌳 Decision Tree Laboratory
            </h2>
            <p className="text-lg text-slate-300 mb-2">
              Branching logic, progressive disclosure, and intelligent
              path-finding
            </p>
            <p className="text-sm text-slate-400">
              Where every choice opens new possibilities - interactive
              decision-making interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* 1. Interactive Mind Map Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-emerald-700/50 col-span-1 lg:col-span-2 xl:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                🧠 Interactive Mind Map
              </h3>
              <InteractiveMindMapTree
                id={11}
                value={inputValues[11] || ""}
                onChange={(value) => updateInputValue(11, value)}
                flags={flags[11] || []}
                onToggleFlag={(flag) => toggleFlag(11, flag)}
              />
            </div>

            {/* 2. RPG Skill Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-amber-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                ⚔️ RPG Skill Tree
              </h3>
              <RPGSkillTree
                id={12}
                value={inputValues[12] || ""}
                onChange={(value) => updateInputValue(12, value)}
                flags={flags[12] || []}
                onToggleFlag={(flag) => toggleFlag(12, flag)}
              />
            </div>

            {/* 3. Binary Logic Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-blue-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                ⚡ Binary Logic Tree
              </h3>
              <BinaryLogicTree
                id={13}
                value={inputValues[13] || ""}
                onChange={(value) => updateInputValue(13, value)}
                flags={flags[13] || []}
                onToggleFlag={(flag) => toggleFlag(13, flag)}
              />
            </div>

            {/* 4. Neural Network Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-purple-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                🔬 Neural Network Tree
              </h3>
              <NeuralNetworkTree
                id={14}
                value={inputValues[14] || ""}
                onChange={(value) => updateInputValue(14, value)}
                flags={flags[14] || []}
                onToggleFlag={(flag) => toggleFlag(14, flag)}
              />
            </div>

            {/* 5. Organic Growth Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-green-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                🌿 Organic Growth Tree
              </h3>
              <OrganicGrowthTree
                id={15}
                value={inputValues[15] || ""}
                onChange={(value) => updateInputValue(15, value)}
                flags={flags[15] || []}
                onToggleFlag={(flag) => toggleFlag(15, flag)}
              />
            </div>

            {/* 6. Fractal Decision Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-cyan-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                ❄️ Fractal Tree
              </h3>
              <FractalDecisionTree
                id={16}
                value={inputValues[16] || ""}
                onChange={(value) => updateInputValue(16, value)}
                flags={flags[16] || []}
                onToggleFlag={(flag) => toggleFlag(16, flag)}
              />
            </div>

            {/* 7. Flow Chart Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-indigo-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                📊 Flow Chart Tree
              </h3>
              <FlowChartTree
                id={17}
                value={inputValues[17] || ""}
                onChange={(value) => updateInputValue(17, value)}
                flags={flags[17] || []}
                onToggleFlag={(flag) => toggleFlag(17, flag)}
              />
            </div>

            {/* 8. Conversation Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-pink-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                💬 Conversation Tree
              </h3>
              <ConversationTree
                id={18}
                value={inputValues[18] || ""}
                onChange={(value) => updateInputValue(18, value)}
                flags={flags[18] || []}
                onToggleFlag={(flag) => toggleFlag(18, flag)}
              />
            </div>

            {/* 9. Priority Matrix Tree */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-red-700/50">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                🎯 Priority Matrix Tree
              </h3>
              <PriorityMatrixTree
                id={19}
                value={inputValues[19] || ""}
                onChange={(value) => updateInputValue(19, value)}
                flags={flags[19] || []}
                onToggleFlag={(flag) => toggleFlag(19, flag)}
              />
            </div>
          </div>
        </div>

        {/* Debug Panel */}
        <div className="mt-12 bg-slate-800/30 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/30">
          <h3 className="text-lg font-semibold text-white mb-4">
            🔍 Debug Panel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">
                Input Values:
              </h4>
              <pre className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg overflow-auto max-h-32">
                {JSON.stringify(inputValues, null, 2)}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-300 mb-2">
                Active Flags:
              </h4>
              <pre className="text-xs text-slate-400 bg-slate-900/50 p-3 rounded-lg overflow-auto max-h-32">
                {JSON.stringify(flags, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Individual Input Components
function RadialPromptWheel({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [angle, setAngle] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const promptFlags = ["🚀 boost", "🎯 precise", "💭 creative", "📊 data"];

  return (
    <div className="relative flex flex-col items-center space-y-4">
      <div
        className={`relative w-48 h-48 border-2 border-dashed transition-all duration-500 rounded-full ${
          isActive ? "border-cyan-400 animate-pulse" : "border-slate-600"
        }`}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {promptFlags.map((flag, index) => (
          <button
            key={flag}
            onClick={() => onToggleFlag(flag)}
            className={`absolute w-12 h-12 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs ${
              flags.includes(flag)
                ? "bg-cyan-500 border-cyan-400 text-white scale-110"
                : "bg-slate-700 border-slate-600 text-slate-400 hover:border-cyan-500"
            }`}
            style={{
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) rotate(${
                index * 90
              }deg) translateY(-60px) rotate(-${index * 90}deg)`,
            }}
          >
            {flag.split(" ")[0]}
          </button>
        ))}

        <div className="absolute inset-4 rounded-full bg-slate-800/80 border border-slate-600 flex items-center justify-center">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsActive(true)}
            onBlur={() => setIsActive(false)}
            placeholder="Spin to add flags..."
            className="w-full h-full bg-transparent text-white text-center resize-none outline-none text-sm p-4 rounded-full"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const centerX = rect.left + rect.width / 2;
              const centerY = rect.top + rect.height / 2;
              const mouseAngle =
                Math.atan2(e.clientY - centerY, e.clientX - centerX) *
                (180 / Math.PI);
              setAngle(mouseAngle);
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1 justify-center">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ElasticMorphInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [morphLevel, setMorphLevel] = useState(0);

  const promptFlags = ["🎪 wild", "🔬 precise", "🎨 artistic", "⚡ fast"];

  return (
    <div className="relative">
      <div className="relative">
        <div
          className={`relative transition-all duration-500 ${
            isFocused ? "scale-110" : "scale-100"
          }`}
          style={{
            borderRadius: `${20 + morphLevel * 5}px`,
          }}
        >
          <textarea
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setMorphLevel(e.target.value.length / 10);
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Watch me morph as you type..."
            className={`w-full h-32 p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-2 text-white outline-none resize-none transition-all duration-300 ${
              isFocused
                ? "border-purple-400 shadow-lg shadow-purple-500/25"
                : "border-slate-600"
            }`}
            style={{
              borderRadius: `${20 + morphLevel * 5}px`,
              transform: `skew(${Math.sin(morphLevel) * 2}deg, ${
                Math.cos(morphLevel) * 1
              }deg)`,
            }}
          />
        </div>

        <div className="absolute -top-2 -right-2 flex space-x-1">
          {promptFlags.map((flag, index) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-purple-500 border-purple-400 text-white animate-bounce"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-purple-500"
              }`}
              style={{
                transform: `translateY(${
                  Math.sin(index + morphLevel) * 5
                }px) rotate(${morphLevel * 10}deg)`,
              }}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function NeuralNetworkPrompt({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [connections, setConnections] = useState<number[]>([]);
  const promptFlags = ["🧠 think", "⚡ fast", "🔮 predict", "🎯 focus"];

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections((prev) => [...prev.slice(-5), Math.random()]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {connections.map((conn, index) => (
          <g key={index}>
            <line
              x1={`${20 + index * 15}%`}
              y1="20%"
              x2={`${30 + index * 10}%`}
              y2="80%"
              stroke="rgba(34, 197, 94, 0.3)"
              strokeWidth="1"
              className="animate-pulse"
            />
            <circle
              cx={`${20 + index * 15}%`}
              cy="20%"
              r="2"
              fill="rgba(34, 197, 94, 0.6)"
              className="animate-ping"
            />
          </g>
        ))}
      </svg>

      <div className="relative" style={{ zIndex: 2 }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Neural patterns will emerge..."
          className="w-full h-32 p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-green-500/30 text-white outline-none resize-none rounded-lg"
        />

        <div className="absolute top-2 right-2 flex space-x-1">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-6 h-6 rounded-full border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-green-500 border-green-400 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function LiquidGlassInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const promptFlags = ["💧 fluid", "✨ shine", "🌊 flow", "💎 clear"];

  const createRipple = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const newRipple = { x, y, id: Date.now() };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-2xl"
        onClick={createRipple}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl"></div>

        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-4 h-4 border border-blue-400/50 rounded-full animate-ping"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Liquid thoughts flow here..."
          className="w-full h-32 p-4 bg-transparent text-white outline-none resize-none relative z-10"
        />

        <div className="absolute top-2 right-2 flex space-x-1 z-20">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFlag(flag);
              }}
              className={`w-8 h-8 rounded-full backdrop-blur-md border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-blue-500/60 border-blue-400 text-white shadow-lg"
                  : "bg-white/10 border-white/20 text-slate-300 hover:border-blue-400"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs backdrop-blur-sm"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SpiralTimelineInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [spiralAngle, setSpiralAngle] = useState(0);
  const promptFlags = ["⏰ timed", "🔄 loop", "⚡ instant", "🎯 precise"];

  useEffect(() => {
    const interval = setInterval(() => {
      setSpiralAngle((prev) => (prev + 2) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d={`M 50 50 Q ${
              50 + Math.cos((spiralAngle * Math.PI) / 180) * 30
            } ${50 + Math.sin((spiralAngle * Math.PI) / 180) * 30} 80 80`}
            stroke="rgba(250, 204, 21, 0.4)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <circle
            cx={50 + Math.cos((spiralAngle * Math.PI) / 180) * 20}
            cy={50 + Math.sin((spiralAngle * Math.PI) / 180) * 20}
            r="3"
            fill="rgba(250, 204, 21, 0.8)"
          />
        </svg>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Time spirals around your words..."
          className="w-full h-32 p-4 bg-slate-800/60 backdrop-blur-sm border-2 border-yellow-500/30 text-white outline-none resize-none rounded-lg"
        />

        <div className="absolute top-2 right-2 flex space-x-1">
          {promptFlags.map((flag, index) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-8 h-8 rounded-full border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-yellow-500 border-yellow-400 text-black"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-yellow-500"
              }`}
              style={{
                transform: `rotate(${spiralAngle + index * 90}deg)`,
              }}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContextChipPrompt({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [selectedContext, setSelectedContext] = useState<string | null>(null);
  const promptFlags = ["🎭 roleplay", "📝 write", "💡 ideas", "🔍 research"];

  const contexts = [
    { label: "Creative", color: "from-pink-500 to-purple-500" },
    { label: "Technical", color: "from-blue-500 to-cyan-500" },
    { label: "Casual", color: "from-green-500 to-emerald-500" },
    { label: "Formal", color: "from-amber-500 to-orange-500" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {contexts.map((context) => (
          <button
            key={context.label}
            onClick={() => setSelectedContext(context.label)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedContext === context.label
                ? `bg-gradient-to-r ${context.color} text-white shadow-lg scale-105`
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            {context.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`${
            selectedContext ? `${selectedContext} context selected. ` : ""
          }Choose context chips above...`}
          className="w-full h-32 p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 text-white outline-none resize-none rounded-lg focus:border-purple-500"
        />

        <div className="absolute bottom-2 right-2 flex space-x-1">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-6 h-6 rounded border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-purple-500 border-purple-400 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-purple-500"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {selectedContext && (
          <span className="px-2 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs">
            Context: {selectedContext}
          </span>
        )}
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function OrbitalSentimentInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [sentiment, setSentiment] = useState(0); // -1 to 1
  const [orbitalSpeed, setOrbitalSpeed] = useState(1);
  const promptFlags = ["😊 happy", "🤔 neutral", "😤 intense", "🎭 dramatic"];

  return (
    <div className="relative">
      <div className="relative mb-4">
        <div className="w-full h-2 bg-slate-700 rounded-full">
          <div
            className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{ width: `${((sentiment + 1) / 2) * 100}%` }}
          />
        </div>
        <input
          type="range"
          min="-1"
          max="1"
          step="0.1"
          value={sentiment}
          onChange={(e) => setSentiment(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {promptFlags.map((flag, index) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`absolute w-8 h-8 rounded-full border transition-all duration-500 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-indigo-500 border-indigo-400 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-indigo-500"
              }`}
              style={{
                transform: `rotate(${
                  index * 90 + Date.now() * 0.001 * orbitalSpeed
                }deg) translateX(50px) rotate(-${
                  index * 90 + Date.now() * 0.001 * orbitalSpeed
                }deg)`,
              }}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Orbital sentiment detected..."
          className="w-full h-32 p-4 bg-slate-800/80 backdrop-blur-sm border-2 border-indigo-500/30 text-white outline-none resize-none rounded-lg"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
          Sentiment: {sentiment > 0.3 ? "😊" : sentiment < -0.3 ? "😤" : "😐"}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FrequencyWaveInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [frequency, setFrequency] = useState(50);
  const [amplitude, setAmplitude] = useState(30);
  const promptFlags = ["📢 loud", "🔇 quiet", "🎵 rhythmic", "⚡ sharp"];

  return (
    <div className="space-y-4">
      <div className="relative h-20 bg-slate-800/50 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          <path
            d={`M 0 ${40} ${Array.from(
              { length: 100 },
              (_, i) =>
                `L ${i * 2} ${
                  40 +
                  Math.sin(i * frequency * 0.1) * amplitude * 0.1 +
                  Math.sin(i * 0.5) * 5
                }`
            ).join(" ")}`}
            stroke="rgba(34, 197, 94, 0.8)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
        </svg>

        <div className="absolute top-2 right-2 flex space-x-1">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-6 h-6 rounded border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-green-500 border-green-400 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-green-500"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Frequency</label>
          <input
            type="range"
            min="10"
            max="100"
            value={frequency}
            onChange={(e) => setFrequency(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Amplitude</label>
          <input
            type="range"
            min="10"
            max="50"
            value={amplitude}
            onChange={(e) => setAmplitude(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ride the frequency waves..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-green-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function HexagonalHoneycombInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [activeHex, setActiveHex] = useState<number | null>(null);
  const promptFlags = ["🍯 sweet", "🔥 spicy", "❄️ cool", "⚡ electric"];

  const hexPositions = [
    { x: 50, y: 30 },
    { x: 25, y: 50 },
    { x: 75, y: 50 },
    { x: 50, y: 70 },
  ];

  return (
    <div className="space-y-4">
      <div className="relative h-32 bg-slate-800/30 rounded-lg">
        <svg className="w-full h-full">
          {hexPositions.map((pos, index) => (
            <g key={index}>
              <polygon
                points={`${pos.x},${pos.y - 8} ${pos.x + 7},${pos.y - 4} ${
                  pos.x + 7
                },${pos.y + 4} ${pos.x},${pos.y + 8} ${pos.x - 7},${
                  pos.y + 4
                } ${pos.x - 7},${pos.y - 4}`}
                fill={
                  activeHex === index
                    ? "rgba(245, 158, 11, 0.6)"
                    : "rgba(245, 158, 11, 0.2)"
                }
                stroke="rgba(245, 158, 11, 0.8)"
                strokeWidth="1"
                className="cursor-pointer transition-all duration-300 hover:fill-amber-500/40"
                onClick={() => setActiveHex(activeHex === index ? null : index)}
              />
              <text
                x={pos.x}
                y={pos.y + 2}
                textAnchor="middle"
                className="text-xs fill-amber-200 pointer-events-none"
              >
                {index + 1}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute top-2 right-2 flex space-x-1">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-6 h-6 rounded border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-amber-500 border-amber-400 text-black"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-amber-500"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Build your honeycomb of ideas..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-amber-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {activeHex !== null && (
          <span className="px-2 py-1 bg-amber-500/30 text-amber-200 rounded-full text-xs">
            Hex: {activeHex + 1}
          </span>
        )}
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function DNAHelixInput({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [helixRotation, setHelixRotation] = useState(0);
  const promptFlags = ["🧬 evolve", "🔬 precise", "🌱 grow", "⚡ mutate"];

  useEffect(() => {
    const interval = setInterval(() => {
      setHelixRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative h-32 bg-slate-800/30 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i}>
              <circle
                cx={10 + i * 4}
                cy={50 + Math.sin((i + helixRotation) * 0.3) * 20}
                r="2"
                fill="rgba(168, 85, 247, 0.8)"
                className="animate-pulse"
              />
              <circle
                cx={10 + i * 4}
                cy={50 - Math.sin((i + helixRotation) * 0.3) * 20}
                r="2"
                fill="rgba(34, 197, 94, 0.8)"
                className="animate-pulse"
              />
              <line
                x1={10 + i * 4}
                y1={50 + Math.sin((i + helixRotation) * 0.3) * 20}
                x2={10 + i * 4}
                y2={50 - Math.sin((i + helixRotation) * 0.3) * 20}
                stroke="rgba(100, 116, 139, 0.4)"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>

        <div className="absolute top-2 right-2 flex space-x-1">
          {promptFlags.map((flag) => (
            <button
              key={flag}
              onClick={() => onToggleFlag(flag)}
              className={`w-6 h-6 rounded border transition-all duration-300 flex items-center justify-center text-xs ${
                flags.includes(flag)
                  ? "bg-purple-500 border-purple-400 text-white"
                  : "bg-slate-700 border-slate-600 text-slate-400 hover:border-purple-500"
              }`}
            >
              {flag.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Double helix of creativity..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-purple-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

// Decision Tree Laboratory Components

function InteractiveMindMapTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      x: 50,
      y: 20,
      text: "Core Idea",
      flags: ["🎯 focus"],
      level: 0,
      connections: [2, 3],
    },
    {
      id: 2,
      x: 30,
      y: 50,
      text: "Branch A",
      flags: ["🎨 creative", "💡 idea"],
      level: 1,
      connections: [4],
    },
    {
      id: 3,
      x: 70,
      y: 50,
      text: "Branch B",
      flags: ["📊 data", "🔍 analyze"],
      level: 1,
      connections: [5],
    },
    {
      id: 4,
      x: 20,
      y: 80,
      text: "Sub A1",
      flags: ["✨ spark"],
      level: 2,
      connections: [],
    },
    {
      id: 5,
      x: 80,
      y: 80,
      text: "Sub B1",
      flags: ["⚡ fast"],
      level: 2,
      connections: [],
    },
  ]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const addNode = (parentId: number) => {
    const parent = nodes.find((n) => n.id === parentId);
    if (!parent) return;

    const newNode = {
      id: Date.now(),
      x: parent.x + (Math.random() - 0.5) * 30,
      y: parent.y + 30,
      text: `New Node`,
      flags: ["🆕 new"],
      level: parent.level + 1,
      connections: [],
    };

    setNodes((prev) => [
      ...prev.map((n) =>
        n.id === parentId
          ? { ...n, connections: [...n.connections, newNode.id] }
          : n
      ),
      newNode,
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {/* Connections */}
          {nodes.map((node) =>
            node.connections.map((connId) => {
              const connNode = nodes.find((n) => n.id === connId);
              if (!connNode) return null;
              return (
                <line
                  key={`${node.id}-${connId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${connNode.x}%`}
                  y2={`${connNode.y}%`}
                  stroke="rgba(16, 185, 129, 0.4)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              );
            })
          )}

          {/* Nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="12"
                fill={selectedNode === node.id ? "#10b981" : "#374151"}
                stroke="#10b981"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-300 hover:fill-emerald-400"
                onClick={() =>
                  setSelectedNode(selectedNode === node.id ? null : node.id)
                }
                onDoubleClick={() => addNode(node.id)}
              />
              <text
                x={`${node.x}%`}
                y={`${node.y + 20}%`}
                textAnchor="middle"
                className="text-xs fill-emerald-200 pointer-events-none"
              >
                {node.text}
              </text>
            </g>
          ))}
        </svg>

        {/* Node flags */}
        {selectedNode && (
          <div className="absolute top-2 right-2 flex flex-wrap gap-1">
            {nodes
              .find((n) => n.id === selectedNode)
              ?.flags.map((flag) => (
                <button
                  key={flag}
                  onClick={() => onToggleFlag(flag)}
                  className={`px-2 py-1 rounded border transition-all duration-300 text-xs ${
                    flags.includes(flag)
                      ? "bg-emerald-500 border-emerald-400 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-400 hover:border-emerald-500"
                  }`}
                >
                  {flag}
                </button>
              ))}
          </div>
        )}
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Double-click nodes to expand your mind map..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-emerald-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {selectedNode && (
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">
            Node: {nodes.find((n) => n.id === selectedNode)?.text}
          </span>
        )}
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function RPGSkillTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [unlockedSkills, setUnlockedSkills] = useState<number[]>([1]);
  const [skillPoints, setSkillPoints] = useState(3);

  const skills = [
    {
      id: 1,
      name: "Basic",
      flag: "🎯 focus",
      level: 1,
      x: 50,
      y: 80,
      requires: [],
    },
    {
      id: 2,
      name: "Creative",
      flag: "🎨 creative",
      level: 2,
      x: 30,
      y: 60,
      requires: [1],
    },
    {
      id: 3,
      name: "Logical",
      flag: "🧮 logical",
      level: 2,
      x: 70,
      y: 60,
      requires: [1],
    },
    {
      id: 4,
      name: "Master Creative",
      flag: "🎭 master",
      level: 3,
      x: 20,
      y: 40,
      requires: [2],
    },
    {
      id: 5,
      name: "Synthesis",
      flag: "⚡ synth",
      level: 3,
      x: 50,
      y: 40,
      requires: [2, 3],
    },
    {
      id: 6,
      name: "Master Logic",
      flag: "🔬 expert",
      level: 3,
      x: 80,
      y: 40,
      requires: [3],
    },
    {
      id: 7,
      name: "Transcendent",
      flag: "🌟 transcend",
      level: 4,
      x: 50,
      y: 20,
      requires: [4, 5, 6],
    },
  ];

  const canUnlock = (skill: (typeof skills)[0]) => {
    return (
      skill.requires.every((req) => unlockedSkills.includes(req)) &&
      !unlockedSkills.includes(skill.id) &&
      skillPoints > 0
    );
  };

  const unlockSkill = (skill: (typeof skills)[0]) => {
    if (canUnlock(skill)) {
      setUnlockedSkills((prev) => [...prev, skill.id]);
      setSkillPoints((prev) => prev - 1);
      onToggleFlag(skill.flag);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-b from-amber-900/20 to-orange-900/20 rounded-lg overflow-hidden">
        <div className="absolute top-2 left-2 text-amber-300 text-sm">
          Skill Points: {skillPoints}
        </div>

        <svg className="w-full h-full">
          {/* Skill connections */}
          {skills.map((skill) =>
            skill.requires.map((reqId) => {
              const reqSkill = skills.find((s) => s.id === reqId);
              if (!reqSkill) return null;
              return (
                <line
                  key={`${reqId}-${skill.id}`}
                  x1={`${reqSkill.x}%`}
                  y1={`${reqSkill.y}%`}
                  x2={`${skill.x}%`}
                  y2={`${skill.y}%`}
                  stroke={
                    unlockedSkills.includes(skill.id) ? "#f59e0b" : "#6b7280"
                  }
                  strokeWidth="2"
                  strokeDasharray={
                    unlockedSkills.includes(skill.id) ? "0" : "4,4"
                  }
                />
              );
            })
          )}

          {/* Skills */}
          {skills.map((skill) => (
            <g key={skill.id}>
              <circle
                cx={`${skill.x}%`}
                cy={`${skill.y}%`}
                r="16"
                fill={
                  unlockedSkills.includes(skill.id)
                    ? "#f59e0b"
                    : canUnlock(skill)
                    ? "#78716c"
                    : "#374151"
                }
                stroke={canUnlock(skill) ? "#f59e0b" : "#6b7280"}
                strokeWidth="2"
                className={`transition-all duration-300 ${
                  canUnlock(skill) ? "cursor-pointer animate-pulse" : ""
                }`}
                onClick={() => unlockSkill(skill)}
              />
              <text
                x={`${skill.x}%`}
                y={`${skill.y}%`}
                textAnchor="middle"
                dy="0.3em"
                className="text-xs fill-white pointer-events-none font-bold"
              >
                {skill.level}
              </text>
              <text
                x={`${skill.x}%`}
                y={`${skill.y + 25}%`}
                textAnchor="middle"
                className="text-xs fill-amber-200 pointer-events-none"
              >
                {skill.name}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Unlock skills to enhance your prompting abilities..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-amber-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs">
          Unlocked: {unlockedSkills.length}/{skills.length}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function BinaryLogicTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [decisions, setDecisions] = useState<Record<string, boolean>>({});

  const tree = {
    root: { question: "What's your goal?", yes: "create", no: "analyze" },
    create: { question: "Creative or Technical?", yes: "art", no: "code" },
    analyze: { question: "Data or Logic?", yes: "data", no: "logic" },
    art: { question: "Visual or Written?", flags: ["🎨 visual", "✍️ written"] },
    code: {
      question: "Frontend or Backend?",
      flags: ["🖥️ frontend", "⚙️ backend"],
    },
    data: { question: "Stats or ML?", flags: ["📊 stats", "🤖 ml"] },
    logic: {
      question: "Math or Philosophy?",
      flags: ["🔢 math", "🤔 philosophy"],
    },
  };

  const makeDecision = (node: string, choice: boolean) => {
    const nodeData = tree[node as keyof typeof tree];
    if ("yes" in nodeData && "no" in nodeData) {
      const nextNode = choice ? nodeData.yes : nodeData.no;
      setCurrentPath((prev) => [...prev, nextNode]);
      setDecisions((prev) => ({ ...prev, [node]: choice }));
    } else if ("flags" in nodeData) {
      // Leaf node with flags
      nodeData.flags.forEach((flag) => onToggleFlag(flag));
    }
  };

  const resetTree = () => {
    setCurrentPath([]);
    setDecisions({});
  };

  const currentNode =
    currentPath.length === 0 ? "root" : currentPath[currentPath.length - 1];
  const nodeData = tree[currentNode as keyof typeof tree];

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-lg p-4">
        <div className="text-center mb-4">
          <h4 className="text-lg text-blue-200 mb-2">
            {"question" in nodeData ? nodeData.question : "Final Results"}
          </h4>

          {"yes" in nodeData && "no" in nodeData && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => makeDecision(currentNode, true)}
                className="px-4 py-2 bg-green-600/80 hover:bg-green-500 rounded-lg text-white transition-all duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => makeDecision(currentNode, false)}
                className="px-4 py-2 bg-red-600/80 hover:bg-red-500 rounded-lg text-white transition-all duration-300"
              >
                No
              </button>
            </div>
          )}

          {"flags" in nodeData && (
            <div className="flex flex-wrap justify-center gap-2">
              {nodeData.flags.map((flag) => (
                <button
                  key={flag}
                  onClick={() => onToggleFlag(flag)}
                  className={`px-3 py-1 rounded border transition-all duration-300 text-sm ${
                    flags.includes(flag)
                      ? "bg-blue-500 border-blue-400 text-white"
                      : "bg-slate-700 border-slate-600 text-slate-400 hover:border-blue-500"
                  }`}
                >
                  {flag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Path visualization */}
        <div className="flex items-center justify-center space-x-2 text-xs text-blue-300">
          <span>root</span>
          {currentPath.map((step, i) => (
            <span key={i} className="flex items-center space-x-2">
              <span>→</span>
              <span className="bg-blue-600/30 px-2 py-1 rounded">{step}</span>
            </span>
          ))}
        </div>

        <button
          onClick={resetTree}
          className="absolute top-2 right-2 px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs text-white"
        >
          Reset
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Navigate the binary decision tree..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-blue-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
          Depth: {currentPath.length}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function NeuralNetworkTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [activeNeurons, setActiveNeurons] = useState<number[]>([]);
  const [pulseAnimation, setPulseAnimation] = useState(0);

  const layers = [
    { neurons: [1, 2, 3], y: 20, flags: ["🔍 input"] },
    { neurons: [4, 5, 6, 7], y: 50, flags: ["🧠 hidden1", "⚡ process"] },
    { neurons: [8, 9, 10], y: 80, flags: ["📊 hidden2", "🔄 transform"] },
    { neurons: [11], y: 110, flags: ["🎯 output"] },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => (prev + 1) % 100);
      // Simulate neural activity
      const randomNeurons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter(
        () => Math.random() > 0.7
      );
      setActiveNeurons(randomNeurons);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const activateLayer = (layerIndex: number) => {
    const layer = layers[layerIndex];
    layer.flags.forEach((flag) => onToggleFlag(flag));
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {/* Neural connections */}
          {layers
            .slice(0, -1)
            .map((layer, layerIndex) =>
              layer.neurons.map((neuron) =>
                layers[layerIndex + 1].neurons.map((nextNeuron) => (
                  <line
                    key={`${neuron}-${nextNeuron}`}
                    x1={`${
                      20 +
                      layer.neurons.indexOf(neuron) *
                        (60 / layer.neurons.length)
                    }%`}
                    y1={`${layer.y}%`}
                    x2={`${
                      20 +
                      layers[layerIndex + 1].neurons.indexOf(nextNeuron) *
                        (60 / layers[layerIndex + 1].neurons.length)
                    }%`}
                    y2={`${layers[layerIndex + 1].y}%`}
                    stroke={
                      activeNeurons.includes(neuron) &&
                      activeNeurons.includes(nextNeuron)
                        ? "#a855f7"
                        : "#6b7280"
                    }
                    strokeWidth={
                      activeNeurons.includes(neuron) &&
                      activeNeurons.includes(nextNeuron)
                        ? "2"
                        : "1"
                    }
                    opacity={
                      activeNeurons.includes(neuron) &&
                      activeNeurons.includes(nextNeuron)
                        ? "0.8"
                        : "0.3"
                    }
                    className="transition-all duration-300"
                  />
                ))
              )
            )}

          {/* Neurons */}
          {layers.map((layer, layerIndex) =>
            layer.neurons.map((neuron, neuronIndex) => (
              <circle
                key={neuron}
                cx={`${20 + neuronIndex * (60 / layer.neurons.length)}%`}
                cy={`${layer.y}%`}
                r="8"
                fill={activeNeurons.includes(neuron) ? "#a855f7" : "#4b5563"}
                stroke="#a855f7"
                strokeWidth="2"
                className={`cursor-pointer transition-all duration-300 ${
                  activeNeurons.includes(neuron) ? "animate-pulse" : ""
                }`}
                onClick={() => activateLayer(layerIndex)}
              />
            ))
          )}

          {/* Layer labels */}
          {layers.map((layer, index) => (
            <text
              key={`label-${index}`}
              x="5%"
              y={`${layer.y}%`}
              textAnchor="start"
              dy="0.3em"
              className="text-xs fill-purple-200 pointer-events-none"
            >
              L{index + 1}
            </text>
          ))}
        </svg>

        <div className="absolute top-2 right-2 flex space-x-1">
          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
            Active: {activeNeurons.length}
          </span>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Neural pathways are firing..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-purple-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function OrganicGrowthTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [branches, setBranches] = useState([
    {
      id: 1,
      x: 50,
      y: 90,
      length: 20,
      angle: -90,
      level: 0,
      grown: true,
      flags: ["🌱 seed"],
    },
  ]);
  const [growthStage, setGrowthStage] = useState(0);

  const growBranch = (parentId: number) => {
    const parent = branches.find((b) => b.id === parentId);
    if (!parent) return;

    const leftBranch = {
      id: Date.now(),
      x:
        parent.x +
        Math.cos(((parent.angle - 30) * Math.PI) / 180) * parent.length,
      y:
        parent.y +
        Math.sin(((parent.angle - 30) * Math.PI) / 180) * parent.length,
      length: parent.length * 0.7,
      angle: parent.angle - 30,
      level: parent.level + 1,
      grown: false,
      flags: ["🍃 branch"],
    };

    const rightBranch = {
      id: Date.now() + 1,
      x:
        parent.x +
        Math.cos(((parent.angle + 30) * Math.PI) / 180) * parent.length,
      y:
        parent.y +
        Math.sin(((parent.angle + 30) * Math.PI) / 180) * parent.length,
      length: parent.length * 0.7,
      angle: parent.angle + 30,
      level: parent.level + 1,
      grown: false,
      flags: ["🍃 branch"],
    };

    setBranches((prev) => [...prev, leftBranch, rightBranch]);

    setTimeout(() => {
      setBranches((prev) =>
        prev.map((b) =>
          b.id === leftBranch.id || b.id === rightBranch.id
            ? { ...b, grown: true }
            : b
        )
      );
    }, 100);

    setGrowthStage((prev) => prev + 1);
    if (growthStage >= 2) {
      ["🌸 flower", "🍯 nectar", "🦋 pollinate"].forEach((flag) =>
        onToggleFlag(flag)
      );
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-b from-green-900/20 to-emerald-900/20 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {branches.map((branch) => (
            <g key={branch.id}>
              <line
                x1={`${branch.x}%`}
                y1={`${branch.y}%`}
                x2={`${
                  branch.x +
                  Math.cos((branch.angle * Math.PI) / 180) * branch.length
                }%`}
                y2={`${
                  branch.y +
                  Math.sin((branch.angle * Math.PI) / 180) * branch.length
                }%`}
                stroke="#22c55e"
                strokeWidth={Math.max(1, 4 - branch.level)}
                className={`transition-all duration-1000 ${
                  branch.grown ? "opacity-100" : "opacity-30"
                }`}
              />

              {branch.level < 3 && (
                <circle
                  cx={`${
                    branch.x +
                    Math.cos((branch.angle * Math.PI) / 180) * branch.length
                  }%`}
                  cy={`${
                    branch.y +
                    Math.sin((branch.angle * Math.PI) / 180) * branch.length
                  }%`}
                  r="3"
                  fill="#16a34a"
                  className="cursor-pointer hover:fill-green-400 transition-colors duration-300"
                  onClick={() => growBranch(branch.id)}
                />
              )}

              {branch.level >= 3 && (
                <circle
                  cx={`${
                    branch.x +
                    Math.cos((branch.angle * Math.PI) / 180) * branch.length
                  }%`}
                  cy={`${
                    branch.y +
                    Math.sin((branch.angle * Math.PI) / 180) * branch.length
                  }%`}
                  r="4"
                  fill="#f59e0b"
                  className="animate-pulse"
                />
              )}
            </g>
          ))}
        </svg>

        <div className="absolute top-2 left-2 flex space-x-2">
          <button
            onClick={() => {
              setBranches([
                {
                  id: 1,
                  x: 50,
                  y: 90,
                  length: 20,
                  angle: -90,
                  level: 0,
                  grown: true,
                  flags: ["🌱 seed"],
                },
              ]);
              setGrowthStage(0);
            }}
            className="px-2 py-1 bg-green-600/80 hover:bg-green-500 rounded text-xs text-white"
          >
            Reset Tree
          </button>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Watch your ideas grow organically..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-green-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
          Branches: {branches.length}
        </span>
        <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
          Stage: {growthStage}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FractalDecisionTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [fractalDepth, setFractalDepth] = useState(2);
  const [selectedPattern, setSelectedPattern] = useState<string>("sierpinski");

  const patterns = {
    sierpinski: { name: "Sierpinski", flags: ["🔺 triangle", "♾️ infinite"] },
    mandelbrot: { name: "Mandelbrot", flags: ["🌀 spiral", "🎨 beauty"] },
    koch: { name: "Koch Snowflake", flags: ["❄️ crystal", "📐 geometric"] },
  };

  const generateFractal = (pattern: string, depth: number) => {
    // Simplified fractal generation for visualization
    const points = [];
    for (let i = 0; i < Math.pow(3, depth); i++) {
      const angle = (i / Math.pow(3, depth)) * 2 * Math.PI;
      const radius = 30 + depth * 10;
      points.push({
        x: 50 + Math.cos(angle) * radius * 0.5,
        y: 50 + Math.sin(angle) * radius * 0.5,
      });
    }
    return points;
  };

  const fractalPoints = generateFractal(selectedPattern, fractalDepth);

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-cyan-900/20 to-teal-900/20 rounded-lg overflow-hidden">
        <svg className="w-full h-full">
          {/* Fractal pattern */}
          {fractalPoints.map((point, index) => (
            <circle
              key={index}
              cx={`${point.x}%`}
              cy={`${point.y}%`}
              r={Math.max(1, 4 - fractalDepth)}
              fill="#06b6d4"
              className="animate-pulse"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}

          {/* Connecting lines for fractal structure */}
          {fractalPoints.slice(0, -1).map((point, index) => {
            const nextPoint = fractalPoints[index + 1];
            return (
              <line
                key={`line-${index}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${nextPoint.x}%`}
                y2={`${nextPoint.y}%`}
                stroke="#0891b2"
                strokeWidth="1"
                opacity="0.3"
              />
            );
          })}
        </svg>

        <div className="absolute top-2 left-2 flex flex-col space-y-2">
          {Object.entries(patterns).map(([key, pattern]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedPattern(key);
                pattern.flags.forEach((flag) => onToggleFlag(flag));
              }}
              className={`px-2 py-1 rounded text-xs transition-all duration-300 ${
                selectedPattern === key
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-600 text-slate-300 hover:bg-cyan-600"
              }`}
            >
              {pattern.name}
            </button>
          ))}
        </div>

        <div className="absolute top-2 right-2 flex flex-col space-y-1">
          <label className="text-xs text-cyan-300">Depth: {fractalDepth}</label>
          <input
            type="range"
            min="1"
            max="4"
            value={fractalDepth}
            onChange={(e) => setFractalDepth(parseInt(e.target.value))}
            className="w-16 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Explore infinite recursive patterns..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-cyan-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
          Pattern: {patterns[selectedPattern as keyof typeof patterns].name}
        </span>
        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs">
          Depth: {fractalDepth}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function FlowChartTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [currentStep, setCurrentStep] = useState("start");
  const [flowHistory, setFlowHistory] = useState<string[]>(["start"]);

  const flowChart = {
    start: {
      type: "decision",
      text: "Define Problem?",
      yes: "analyze",
      no: "clarify",
      flags: ["🎯 define"],
    },
    clarify: {
      type: "process",
      text: "Clarify Requirements",
      next: "start",
      flags: ["❓ clarify"],
    },
    analyze: {
      type: "decision",
      text: "Need Research?",
      yes: "research",
      no: "design",
      flags: ["🔍 analyze"],
    },
    research: {
      type: "process",
      text: "Gather Information",
      next: "design",
      flags: ["📚 research"],
    },
    design: {
      type: "decision",
      text: "Ready to Build?",
      yes: "implement",
      no: "iterate",
      flags: ["🎨 design"],
    },
    iterate: {
      type: "process",
      text: "Refine Design",
      next: "design",
      flags: ["🔄 iterate"],
    },
    implement: {
      type: "process",
      text: "Build Solution",
      next: "test",
      flags: ["⚙️ build"],
    },
    test: {
      type: "decision",
      text: "Tests Pass?",
      yes: "deploy",
      no: "debug",
      flags: ["🧪 test"],
    },
    debug: {
      type: "process",
      text: "Fix Issues",
      next: "test",
      flags: ["🐛 debug"],
    },
    deploy: {
      type: "terminal",
      text: "Success!",
      flags: ["🚀 deploy", "✅ complete"],
    },
  };

  const takeAction = (action: "yes" | "no" | "next") => {
    const current = flowChart[currentStep as keyof typeof flowChart];
    let nextStep = "";

    if ("yes" in current && "no" in current) {
      nextStep = action === "yes" ? current.yes : current.no;
    } else if ("next" in current) {
      nextStep = current.next;
    }

    if (nextStep) {
      setCurrentStep(nextStep);
      setFlowHistory((prev) => [...prev, nextStep]);
      current.flags.forEach((flag) => onToggleFlag(flag));
    }
  };

  const resetFlow = () => {
    setCurrentStep("start");
    setFlowHistory(["start"]);
  };

  const currentNode = flowChart[currentStep as keyof typeof flowChart];

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-indigo-900/20 to-blue-900/20 rounded-lg p-4">
        <div className="text-center mb-4">
          <div
            className={`inline-block px-4 py-2 rounded-lg text-white mb-3 ${
              currentNode.type === "decision"
                ? "bg-indigo-600"
                : currentNode.type === "process"
                ? "bg-blue-600"
                : "bg-green-600"
            }`}
          >
            <span className="text-sm font-medium">
              {currentNode.type === "decision"
                ? "◇"
                : currentNode.type === "process"
                ? "▢"
                : "○"}{" "}
              {currentNode.text}
            </span>
          </div>

          <div className="flex justify-center space-x-3">
            {"yes" in currentNode && "no" in currentNode && (
              <>
                <button
                  onClick={() => takeAction("yes")}
                  className="px-3 py-1 bg-green-600/80 hover:bg-green-500 rounded text-white text-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => takeAction("no")}
                  className="px-3 py-1 bg-red-600/80 hover:bg-red-500 rounded text-white text-sm"
                >
                  No
                </button>
              </>
            )}

            {"next" in currentNode && (
              <button
                onClick={() => takeAction("next")}
                className="px-3 py-1 bg-blue-600/80 hover:bg-blue-500 rounded text-white text-sm"
              >
                Continue
              </button>
            )}

            {currentNode.type === "terminal" && (
              <button
                onClick={resetFlow}
                className="px-3 py-1 bg-purple-600/80 hover:bg-purple-500 rounded text-white text-sm"
              >
                Start Over
              </button>
            )}
          </div>
        </div>

        {/* Flow history */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-1 text-xs text-indigo-300">
            {flowHistory.map((step, i) => (
              <span key={i} className="bg-indigo-600/30 px-2 py-1 rounded">
                {step}
              </span>
            ))}
          </div>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Follow the flow chart to structure your process..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-indigo-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
          Step: {currentStep}
        </span>
        <span className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
          Progress: {flowHistory.length}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function ConversationTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [conversation, setConversation] = useState([
    {
      id: 1,
      speaker: "AI",
      message: "Hello! How can I help you today?",
      options: ["creative", "technical", "casual"],
    },
  ]);
  const [selectedTone, setSelectedTone] = useState<string>("neutral");

  const responseTemplates = {
    creative: {
      message: "Let's explore some creative possibilities!",
      flags: ["🎨 creative", "💡 imaginative"],
      options: ["brainstorm", "artistic", "storytelling"],
    },
    technical: {
      message: "I'll help with technical analysis.",
      flags: ["🔧 technical", "📊 analytical"],
      options: ["debug", "optimize", "explain"],
    },
    casual: {
      message: "Sure, let's keep it casual!",
      flags: ["😊 friendly", "💬 conversational"],
      options: ["chat", "advice", "fun"],
    },
  };

  const addResponse = (option: string) => {
    const template =
      responseTemplates[option as keyof typeof responseTemplates];
    if (template) {
      setConversation((prev) => [
        ...prev,
        {
          id: Date.now(),
          speaker: "User",
          message: `I'd like to ${option}`,
          options: [],
        },
        {
          id: Date.now() + 1,
          speaker: "AI",
          message: template.message,
          options: template.options,
        },
      ]);

      template.flags.forEach((flag) => onToggleFlag(flag));
    }
  };

  const clearConversation = () => {
    setConversation([
      {
        id: 1,
        speaker: "AI",
        message: "Hello! How can I help you today?",
        options: ["creative", "technical", "casual"],
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-pink-900/20 to-rose-900/20 rounded-lg p-4 overflow-y-auto">
        <div className="space-y-2">
          {conversation.map((entry) => (
            <div
              key={entry.id}
              className={`flex ${
                entry.speaker === "AI" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  entry.speaker === "AI"
                    ? "bg-pink-600/60 text-pink-100"
                    : "bg-slate-600/60 text-slate-100"
                }`}
              >
                <div className="font-semibold text-xs opacity-70">
                  {entry.speaker}
                </div>
                <div>{entry.message}</div>

                {entry.options.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {entry.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => addResponse(option)}
                        className="px-2 py-1 bg-pink-500/30 hover:bg-pink-500/50 rounded text-xs transition-colors duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={clearConversation}
          className="absolute top-2 right-2 px-2 py-1 bg-slate-600 hover:bg-slate-500 rounded text-xs text-white"
        >
          Clear
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Continue the conversation thread..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-pink-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs">
          Messages: {conversation.length}
        </span>
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

function PriorityMatrixTree({
  id,
  value,
  onChange,
  flags,
  onToggleFlag,
}: InputProps) {
  const [matrix, setMatrix] = useState<
    Array<{
      id: number;
      text: string;
      urgency: number;
      importance: number;
      quadrant: number;
    }>
  >([
    { id: 1, text: "Critical Bug", urgency: 3, importance: 3, quadrant: 1 },
    { id: 2, text: "Feature Request", urgency: 1, importance: 3, quadrant: 2 },
    { id: 3, text: "Email Reply", urgency: 3, importance: 1, quadrant: 3 },
    { id: 4, text: "Social Media", urgency: 1, importance: 1, quadrant: 4 },
  ]);

  const quadrants = {
    1: {
      name: "Do First",
      color: "bg-red-500/20 border-red-500",
      flags: ["🔥 urgent", "⭐ important"],
    },
    2: {
      name: "Schedule",
      color: "bg-yellow-500/20 border-yellow-500",
      flags: ["📅 plan", "🎯 strategic"],
    },
    3: {
      name: "Delegate",
      color: "bg-blue-500/20 border-blue-500",
      flags: ["👥 delegate", "⚡ quick"],
    },
    4: {
      name: "Eliminate",
      color: "bg-gray-500/20 border-gray-500",
      flags: ["❌ eliminate", "🗑️ waste"],
    },
  };

  const selectQuadrant = (quadrant: number) => {
    const quadrantData = quadrants[quadrant as keyof typeof quadrants];
    quadrantData.flags.forEach((flag) => onToggleFlag(flag));
  };

  const getQuadrant = (urgency: number, importance: number) => {
    if (urgency >= 2 && importance >= 2) return 1;
    if (urgency < 2 && importance >= 2) return 2;
    if (urgency >= 2 && importance < 2) return 3;
    return 4;
  };

  return (
    <div className="space-y-4">
      <div className="relative h-48 bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg p-2">
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1">
          {Object.entries(quadrants).map(([qNum, quadrant]) => (
            <div
              key={qNum}
              className={`${quadrant.color} border-2 rounded-lg p-2 cursor-pointer transition-all duration-300 hover:opacity-80`}
              onClick={() => selectQuadrant(parseInt(qNum))}
            >
              <div className="text-xs font-bold text-white mb-1">
                {quadrant.name}
              </div>
              <div className="space-y-1">
                {matrix
                  .filter((item) => item.quadrant === parseInt(qNum))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="text-xs text-white bg-black/20 rounded px-1 py-0.5 truncate"
                    >
                      {item.text}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Axis labels */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-red-300 font-bold">
          Important
        </div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
          Not Important
        </div>
        <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-red-300 font-bold">
          Urgent
        </div>
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-gray-400">
          Not Urgent
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Prioritize your tasks using the Eisenhower Matrix..."
        className="w-full h-24 p-3 bg-slate-800/80 backdrop-blur-sm border-2 border-red-500/30 text-white outline-none resize-none rounded-lg text-sm"
      />

      <div className="flex flex-wrap gap-1">
        {flags.map((flag) => (
          <span
            key={flag}
            className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-xs"
          >
            {flag}
          </span>
        ))}
      </div>
    </div>
  );
}

interface InputProps {
  id: number;
  value: string;
  onChange: (value: string) => void;
  flags: string[];
  onToggleFlag: (flag: string) => void;
}
