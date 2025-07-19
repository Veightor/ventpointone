"use client";

import { motion, AnimatePresence } from "framer-motion";
import { BaseElement } from "../emotionData";

interface DiscoveryPanelProps {
  discoveredMoods: BaseElement[];
  onGenerateContent?: (mood: BaseElement) => void;
}

export const DiscoveryPanel: React.FC<DiscoveryPanelProps> = ({
  discoveredMoods,
  onGenerateContent,
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 h-fit">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">📚</span>
        Collection
      </h2>

      {discoveredMoods.length === 0 ? (
        <div className="text-center text-slate-400 py-8">
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-4xl mb-2"
          >
            📜
          </motion.div>
          <div className="text-sm">Your discoveries will appear here</div>
          <div className="text-xs mt-2 opacity-75">
            Try combining <span className="text-cyan-400">Joy + Trust</span> to
            start!
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {discoveredMoods.map((mood, index) => (
              <motion.div
                key={mood.id}
                initial={{ opacity: 0, x: 30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/20 rounded-lg p-3 border border-white/30 hover:bg-white/30 hover:border-white/50 transition-all duration-200 group cursor-pointer"
                onClick={() => onGenerateContent?.(mood)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <motion.span
                      className="text-2xl"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {mood.icon}
                    </motion.span>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {mood.name}
                      </div>
                      <div className="text-xs text-slate-300 group-hover:text-slate-200 transition-colors">
                        {mood.description}
                      </div>
                    </div>
                  </div>

                  {/* Generate Content Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerateContent?.(mood);
                    }}
                  >
                    ✨ Generate
                  </motion.button>
                </div>

                {/* Mood Type Badge */}
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className="text-xs px-2 py-1 rounded-full font-semibold"
                    style={{
                      backgroundColor: `${mood.color}30`,
                      color: mood.color,
                      borderColor: `${mood.color}60`,
                      border: "1px solid",
                    }}
                  >
                    {mood.type}
                  </span>

                  {/* Rarity indicator based on complexity */}
                  <div className="flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < (mood.description.includes("(") ? 2 : 1)
                            ? "bg-yellow-400"
                            : "bg-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Stats */}
      {discoveredMoods.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-white/20"
        >
          <div className="flex justify-between text-xs text-slate-400">
            <span>Total Discovered: {discoveredMoods.length}</span>
            <span>
              Completion: {Math.round((discoveredMoods.length / 21) * 100)}%
            </span>
          </div>

          {/* Progress Bar */}
          <motion.div
            className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(discoveredMoods.length / 21) * 100}%` }}
              transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};
