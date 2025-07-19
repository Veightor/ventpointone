"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BaseElement,
  getStartingElements,
  startingEmotions,
  startingCharacters,
  getCombination,
  getElementById,
  allElements,
} from "./emotionData";
import {
  DraggableElement,
  ElementPalette,
} from "./components/DraggableElement";
import { AlchemyWorkspace } from "./components/AlchemyWorkspace";
import { DiscoveryPanel } from "./components/DiscoveryPanel";

export default function EmotionAlchemyPage() {
  const [discoveredElements, setDiscoveredElements] = useState<Set<string>>(
    new Set()
  );
  const [workspaceElements, setWorkspaceElements] = useState<BaseElement[]>([]);
  const [recentDiscovery, setRecentDiscovery] = useState<BaseElement | null>(
    null
  );
  const [totalDiscovered, setTotalDiscovered] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedElement, setDraggedElement] = useState<BaseElement | null>(
    null
  );

  // Initialize with starting elements discovered
  useEffect(() => {
    const startingIds = getStartingElements().map((el) => el.id);
    setDiscoveredElements(new Set(startingIds));
    setTotalDiscovered(startingIds.length);
  }, []);

  // Show discovery notification and then hide it
  useEffect(() => {
    if (recentDiscovery) {
      const timer = setTimeout(() => {
        setRecentDiscovery(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [recentDiscovery]);

  const handleElementDragStart = (element: BaseElement) => {
    setIsDragging(true);
    setDraggedElement(element);
  };

  const handleElementDragEnd = (
    element: BaseElement,
    position: { x: number; y: number }
  ) => {
    setIsDragging(false);
    setDraggedElement(null);

    // Check if dropped in workspace (you'd implement proper drop zone detection here)
    const workspaceElement = document.querySelector(".workspace-area");
    if (workspaceElement) {
      const rect = workspaceElement.getBoundingClientRect();

      // Check if dropped within workspace bounds
      if (
        position.x >= rect.left &&
        position.x <= rect.right &&
        position.y >= rect.top &&
        position.y <= rect.bottom
      ) {
        // Add to workspace if not already there
        if (!workspaceElements.find((el) => el.id === element.id)) {
          setWorkspaceElements((prev) => [...prev, element]);
        }

        // Check for combinations if there are 2 elements in workspace
        if (workspaceElements.length === 1) {
          attemptCombination(workspaceElements[0], element);
        }
      }
    }
  };

  const attemptCombination = (element1: BaseElement, element2: BaseElement) => {
    const combination = getCombination(element1.id, element2.id);

    if (combination) {
      const resultElement = getElementById(combination.result);

      if (resultElement && !discoveredElements.has(resultElement.id)) {
        // Discovery successful!
        setDiscoveredElements((prev) => new Set([...prev, resultElement.id]));
        setTotalDiscovered((prev) => prev + 1);
        setRecentDiscovery(resultElement);

        // Clear workspace and add the new element
        setWorkspaceElements([resultElement]);

        // Trigger celebration effect
        console.log("🎉 Discovery:", combination.discoveryMessage);
      } else if (resultElement) {
        // Already discovered, just replace workspace elements
        setWorkspaceElements([resultElement]);
      }
    } else {
      // No combination found - keep both elements in workspace
      // Or implement a "failed combination" feedback
      console.log(
        "💭 No combination found between",
        element1.name,
        "and",
        element2.name
      );
    }
  };

  const clearWorkspace = () => {
    setWorkspaceElements([]);
  };

  // Get discovered elements for display
  const getDiscoveredMoods = () => {
    return allElements.filter(
      (el) => el.type === "mood" && discoveredElements.has(el.id)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            🧪 Emotion Alchemy Lab
          </h1>
          <p className="text-xl text-slate-300 mb-2">
            Combine emotions and characters to create unique moods for your
            content
          </p>
          <p className="text-sm text-slate-400 mb-4">
            Discover new emotional flavors by mixing base elements together
          </p>

          {/* Progress Stats */}
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-cyan-400">
                {totalDiscovered}
              </div>
              <div className="text-sm text-slate-300">Elements Discovered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-purple-400">
                {workspaceElements.length}
              </div>
              <div className="text-sm text-slate-300">In Workspace</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="text-3xl font-bold text-pink-400">
                {getDiscoveredMoods().length}
              </div>
              <div className="text-sm text-slate-300">Moods Created</div>
            </div>
          </div>
        </motion.div>

        {/* Discovery Notification */}
        <AnimatePresence>
          {recentDiscovery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -50 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-full shadow-lg border border-white/20"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{recentDiscovery.icon}</span>
                <div>
                  <div className="font-bold">New Discovery!</div>
                  <div className="text-sm">{recentDiscovery.name}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Elements Palette */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-fit"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                Elements
              </h2>

              {/* Starting Emotions */}
              <ElementPalette
                elements={startingEmotions}
                title="Primary Emotions"
                icon="💭"
                onElementDragStart={handleElementDragStart}
                onElementDragEnd={handleElementDragEnd}
              />

              {/* Starting Characters */}
              <ElementPalette
                elements={startingCharacters}
                title="Character Archetypes"
                icon="🎭"
                onElementDragStart={handleElementDragStart}
                onElementDragEnd={handleElementDragEnd}
              />

              {/* Discovered Moods */}
              {getDiscoveredMoods().length > 0 && (
                <ElementPalette
                  elements={getDiscoveredMoods()}
                  title="Discovered Moods"
                  icon="✨"
                  onElementDragStart={handleElementDragStart}
                  onElementDragEnd={handleElementDragEnd}
                />
              )}
            </motion.div>
          </div>

          {/* Workspace */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <AlchemyWorkspace
                elements={workspaceElements}
                onClear={clearWorkspace}
                onElementCombine={attemptCombination}
                isDragging={isDragging}
              />
            </motion.div>
          </div>

          {/* Results & Collection */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <DiscoveryPanel
                discoveredMoods={getDiscoveredMoods()}
                onGenerateContent={(mood) => {
                  console.log("Generate content for:", mood.name);
                  // TODO: Integrate with blog generation system
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            How to Play
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">1️⃣</span>
              <div>
                <div className="font-semibold text-white">Drag Elements</div>
                <div>
                  Drag emotions and characters from the palette to the workspace
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">2️⃣</span>
              <div>
                <div className="font-semibold text-white">Combine</div>
                <div>
                  Drop two elements together to see if they create something new
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">3️⃣</span>
              <div>
                <div className="font-semibold text-white">Discover</div>
                <div>
                  Use your discoveries to generate unique content moods for AI
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
