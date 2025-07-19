"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animated, useSpring } from "@react-spring/web";
import { BaseElement } from "../emotionData";
import { DraggableElement } from "./DraggableElement";

interface AlchemyWorkspaceProps {
  elements: BaseElement[];
  onClear: () => void;
  onElementCombine?: (element1: BaseElement, element2: BaseElement) => void;
  isDragging: boolean;
  maxElements?: number;
}

export const AlchemyWorkspace: React.FC<AlchemyWorkspaceProps> = ({
  elements,
  onClear,
  onElementCombine,
  isDragging,
  maxElements = 2,
}) => {
  const workspaceRef = useRef<HTMLDivElement>(null);
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  const [showCombineEffect, setShowCombineEffect] = useState(false);

  // Drop zone animation
  const [{ scale, glow }, api] = useSpring(() => ({
    scale: 1,
    glow: 0,
    config: { tension: 300, friction: 30 },
  }));

  // Handle drag enter/leave for drop zone feedback
  const handleDragEnter = () => {
    if (elements.length < maxElements) {
      setIsDropZoneActive(true);
      api.start({ scale: 1.02, glow: 1 });
    }
  };

  const handleDragLeave = () => {
    setIsDropZoneActive(false);
    api.start({ scale: 1, glow: 0 });
  };

  // Trigger combination effect
  const triggerCombineEffect = () => {
    setShowCombineEffect(true);
    setTimeout(() => setShowCombineEffect(false), 2000);
  };

  // Check if elements can combine
  const canCombine = elements.length === 2;

  // Trigger combination when two elements are present
  if (canCombine && onElementCombine && !showCombineEffect) {
    setTimeout(() => {
      triggerCombineEffect();
      onElementCombine(elements[0], elements[1]);
    }, 500);
  }

  return (
    <animated.div
      ref={workspaceRef}
      style={{
        scale,
        filter: glow.to(
          (g) => `drop-shadow(0 0 ${g * 20}px rgba(34, 197, 94, 0.5))`
        ),
      }}
      className={`
        workspace-area bg-white/5 backdrop-blur-lg rounded-2xl border-2 border-dashed h-96 relative
        transition-all duration-300
        ${isDragging ? "border-cyan-400/60 bg-cyan-400/10" : "border-white/30"}
        ${isDropZoneActive ? "border-green-400/80 bg-green-400/20" : ""}
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Workspace Content */}
      {elements.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center text-slate-400"
            animate={
              isDragging
                ? { scale: 1.1, opacity: 0.8 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.3 }}
          >
            <div className="text-6xl mb-4">⚗️</div>
            <div className="text-xl font-semibold mb-2">Alchemy Workspace</div>
            <div className="text-sm">Drag elements here to combine them</div>
            <div className="text-xs mt-2 opacity-75">
              Drop two elements to create something new!
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="p-6 h-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">
              Active Elements
            </h3>
            <button
              onClick={onClear}
              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg text-sm transition-colors"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center h-3/4 relative">
            {elements.map((element, index) => (
              <motion.div
                key={`${element.id}-${index}`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <DraggableElement
                  element={element}
                  scale={1.2}
                  disabled={true}
                  className="pointer-events-none"
                />
              </motion.div>
            ))}

            {/* Combination Effect */}
            <AnimatePresence>
              {canCombine && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 2, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="text-6xl animate-spin">⚡</div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Combine Effect Overlay */}
            <AnimatePresence>
              {showCombineEffect && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: 2 }}
                      className="text-8xl mb-4"
                    >
                      ✨
                    </motion.div>
                    <div className="text-xl font-bold text-white">
                      Combining...
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {elements.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-slate-400 mt-4"
            >
              <div className="text-sm">
                Add one more element to attempt combination!
              </div>
              <div className="text-xs mt-1 opacity-75">
                Try emotions with characters or emotions with other emotions
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Drop Zone Indicator */}
      <AnimatePresence>
        {isDragging && elements.length < maxElements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl border-4 border-dashed border-green-400/50 bg-green-400/10 flex items-center justify-center"
          >
            <div className="text-center text-green-300">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-lg font-semibold">
                Drop here to add to workspace
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Max Elements Warning */}
      <AnimatePresence>
        {isDragging && elements.length >= maxElements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-2xl border-4 border-dashed border-red-400/50 bg-red-400/10 flex items-center justify-center"
          >
            <div className="text-center text-red-300">
              <div className="text-4xl mb-2">🚫</div>
              <div className="text-lg font-semibold">Workspace is full</div>
              <div className="text-sm">Clear elements to add more</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Magical particles effect */}
      {isDropZoneActive && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </animated.div>
  );
};
