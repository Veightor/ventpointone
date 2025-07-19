"use client";

import { useRef, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { BaseElement } from "../emotionData";

interface DraggableElementProps {
  element: BaseElement;
  onDragStart?: (element: BaseElement) => void;
  onDragEnd?: (
    element: BaseElement,
    position: { x: number; y: number }
  ) => void;
  className?: string;
  disabled?: boolean;
  scale?: number;
}

export const DraggableElement: React.FC<DraggableElementProps> = ({
  element,
  onDragStart,
  onDragEnd,
  className = "",
  disabled = false,
  scale = 1,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const [{ x, y, rotateZ, scale: animScale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ offset: [ox, oy], down, movement: [mx, my], first, last }) => {
      if (disabled) return;

      if (first && onDragStart) {
        onDragStart(element);
      }

      if (last && onDragEnd) {
        // Get element position relative to document
        const rect = elementRef.current?.getBoundingClientRect();
        if (rect) {
          onDragEnd(element, { x: rect.left + mx, y: rect.top + my });
        }
      }

      api.start({
        x: down ? ox : 0,
        y: down ? oy : 0,
        rotateZ: down ? Math.random() * 10 - 5 : 0,
        scale: down ? 1.1 * scale : 1 * scale,
        immediate: down,
      });
    },
    {
      bounds: { left: -300, right: 300, top: -300, bottom: 300 },
      rubberband: true,
    }
  );

  // Pulse animation for discovered elements
  useEffect(() => {
    if (element.discovered) {
      api.start({
        to: async (next) => {
          await next({ scale: 1.2 * scale });
          await next({ scale: 1 * scale });
        },
        config: { duration: 500 },
      });
    }
  }, [element.discovered, api, scale]);

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "emotion":
        return "from-blue-500 to-purple-500";
      case "character":
        return "from-green-500 to-teal-500";
      case "mood":
        return "from-pink-500 to-rose-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emotion":
        return "💭";
      case "character":
        return "🎭";
      case "mood":
        return "✨";
      default:
        return "❓";
    }
  };

  return (
    <animated.div
      ref={elementRef}
      {...bind()}
      style={{
        x,
        y,
        rotateZ,
        scale: animScale,
        touchAction: "none",
        cursor: disabled ? "default" : "grab",
      }}
      className={`
        relative select-none group
        ${disabled ? "opacity-60" : "opacity-100"}
        ${className}
      `}
    >
      <div
        className={`
          w-20 h-20 rounded-2xl p-2 text-center transition-all duration-200
          bg-gradient-to-br ${getTypeGradient(element.type)}
          border-2 border-white/30 shadow-lg backdrop-blur-sm
          hover:shadow-xl hover:border-white/50 hover:scale-105
          active:scale-95
          ${!disabled ? "cursor-grab active:cursor-grabbing" : ""}
        `}
        style={{
          backgroundColor: `${element.color}20`,
          borderColor: `${element.color}80`,
        }}
      >
        {/* Type indicator */}
        <div className="absolute -top-2 -right-2 text-xs bg-white/20 rounded-full w-5 h-5 flex items-center justify-center backdrop-blur-sm">
          {getTypeIcon(element.type)}
        </div>

        {/* Main icon */}
        <div className="text-2xl mb-1 filter drop-shadow-sm">
          {element.icon}
        </div>

        {/* Name */}
        <div className="text-xs font-semibold text-white truncate leading-tight">
          {element.name}
        </div>
      </div>

      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        <div className="font-semibold">{element.name}</div>
        <div className="text-gray-300 text-xs mt-1">{element.description}</div>
        {/* Triangle pointer */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
      </div>

      {/* Glow effect for special elements */}
      {element.type === "mood" && (
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getTypeGradient(
            element.type
          )} opacity-20 blur-lg -z-10 group-hover:opacity-40 transition-opacity duration-300`}
        ></div>
      )}
    </animated.div>
  );
};

// Element palette component for the sidebar
interface ElementPaletteProps {
  elements: BaseElement[];
  title: string;
  icon: string;
  onElementDragStart?: (element: BaseElement) => void;
  onElementDragEnd?: (
    element: BaseElement,
    position: { x: number; y: number }
  ) => void;
}

export const ElementPalette: React.FC<ElementPaletteProps> = ({
  elements,
  title,
  icon,
  onElementDragStart,
  onElementDragEnd,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-slate-300 mb-3 flex items-center">
        <span className="mr-2">{icon}</span>
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {elements.map((element) => (
          <DraggableElement
            key={element.id}
            element={element}
            onDragStart={onElementDragStart}
            onDragEnd={onElementDragEnd}
            scale={0.8}
          />
        ))}
      </div>
    </div>
  );
};
