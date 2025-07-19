"use client";

import { useEffect, useRef, useState } from "react";

interface InteractiveArtLayerProps {
  className?: string;
  enabled?: boolean;
}

export default function InteractiveArtLayer({
  className = "",
  enabled = true,
}: InteractiveArtLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);
  const targetInfluenceRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !enabled || !isClient) return;

    // Dynamically import p5 only on client side
    const initializeP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let particles: any[] = [];
        let mouseInfluence = 0;

        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          canvas.style("position", "fixed");
          canvas.style("top", "0");
          canvas.style("left", "0");
          canvas.style("z-index", "0");
          canvas.style("pointer-events", "none");

          // Reduced from 15 to 8 particles for better performance
          for (let i = 0; i < 8; i++) {
            particles.push({
              x: p.random(p.width),
              y: p.random(p.height),
              baseX: p.random(p.width),
              baseY: p.random(p.height),
              velX: 0,
              velY: 0,
              size: p.random(0.8, 2.5), // Slightly larger for visibility
              alpha: p.random(0.2, 0.4), // Increased alpha
              phase: p.random(p.TWO_PI),
            });
          }
        };

        p.draw = () => {
          p.clear();

          // Smooth mouse influence
          mouseInfluence = p.lerp(
            mouseInfluence,
            targetInfluenceRef.current,
            0.08
          );

          // Update particles
          particles.forEach((particle, i) => {
            particle.phase += 0.015; // Slightly faster phase

            // Distance from mouse
            const mouseDistance = p.dist(
              mousePos.x,
              mousePos.y,
              particle.x,
              particle.y
            );
            const maxDistance = 180; // Reduced distance for better performance
            const influence = p.map(
              p.constrain(mouseDistance, 0, maxDistance),
              0,
              maxDistance,
              1,
              0
            );

            // Gentle attraction/repulsion to mouse
            if (mouseDistance < maxDistance && mouseInfluence > 0) {
              const angle = p.atan2(
                particle.y - mousePos.y,
                particle.x - mousePos.x
              );
              const force = influence * mouseInfluence * 0.4; // Slightly stronger force
              particle.velX += p.cos(angle) * force;
              particle.velY += p.sin(angle) * force;
            }

            // Return to base position
            const returnForce = 0.025;
            particle.velX += (particle.baseX - particle.x) * returnForce;
            particle.velY += (particle.baseY - particle.y) * returnForce;

            // Apply velocity with damping
            particle.velX *= 0.92;
            particle.velY *= 0.92;
            particle.x += particle.velX;
            particle.y += particle.velY;

            // Enhanced breathing effect
            const breathe = p.sin(particle.phase) * 0.5 + 0.5;
            const currentAlpha =
              particle.alpha *
              (0.4 + breathe * 0.6) *
              (0.6 + mouseInfluence * 0.4);

            // Draw particle with increased visibility
            p.stroke(212, 181, 200, currentAlpha * 255 * 0.8);
            p.strokeWeight(particle.size);
            p.point(particle.x, particle.y);

            // Draw connections to nearby particles (reduced distance for performance)
            particles.forEach((other, j) => {
              if (i !== j) {
                const distance = p.dist(
                  particle.x,
                  particle.y,
                  other.x,
                  other.y
                );
                if (distance < 120) {
                  // Reduced from 150
                  const connectionAlpha =
                    p.map(distance, 0, 120, 0.5, 0) * currentAlpha;
                  p.stroke(197, 118, 138, connectionAlpha * 255 * 0.4);
                  p.strokeWeight(0.8);
                  p.line(particle.x, particle.y, other.x, other.y);
                }
              }
            });
          });

          // Enhanced cursor ripple effect
          if (mouseInfluence > 0.1) {
            const rippleSize = mouseInfluence * 80; // Larger ripple
            p.noFill();
            p.stroke(212, 181, 200, mouseInfluence * 120); // More visible
            p.strokeWeight(1.5);
            p.circle(mousePos.x, mousePos.y, rippleSize);

            p.stroke(197, 118, 138, mouseInfluence * 60);
            p.strokeWeight(1);
            p.circle(mousePos.x, mousePos.y, rippleSize * 1.5);
          }
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);

          // Redistribute particles
          particles.forEach((particle) => {
            particle.baseX = p.random(p.width);
            particle.baseY = p.random(p.height);
          });
        };
      };

      // Create p5 instance
      if (containerRef.current) {
        p5InstanceRef.current = new p5(sketch, containerRef.current);
      }
    };

    initializeP5();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      targetInfluenceRef.current = 1;
    };

    const handleMouseLeave = () => {
      targetInfluenceRef.current = 0;
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup function
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, mousePos.x, mousePos.y, isClient]);

  if (!enabled || !isClient) return null;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.8, // Increased from 0.7 for more visibility
      }}
    />
  );
}
