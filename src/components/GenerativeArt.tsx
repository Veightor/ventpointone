"use client";

import { useEffect, useRef, useState } from "react";

interface GenerativeArtProps {
  variant?:
    | "flowing-lines"
    | "neural-network"
    | "organic-growth"
    | "minimal-geometry"
    | "particle-dance";
  opacity?: number;
  className?: string;
  speed?: number;
  color?: string;
}

export default function GenerativeArt({
  variant = "flowing-lines",
  opacity = 0.25, // Increased for more visibility
  className = "",
  speed = 1,
  color = "#D4B5C8",
}: GenerativeArtProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !isClient) return;

    // Dynamically import p5 only on client side
    const initializeP5 = async () => {
      const p5Module = await import("p5");
      const p5 = p5Module.default;

      const sketch = (p: any) => {
        let time = 0;
        let particles: any[] = [];
        let nodes: any[] = [];
        let branches: any[] = [];

        p.setup = () => {
          const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
          canvas.style("position", "fixed");
          canvas.style("top", "0");
          canvas.style("left", "0");
          canvas.style("z-index", "-1");
          canvas.style("pointer-events", "none");

          // Initialize with reduced counts for better performance
          initializeVariant();
        };

        const initializeVariant = () => {
          particles = [];
          nodes = [];
          branches = [];

          switch (variant) {
            case "flowing-lines":
              // Reduced from 12 to 8 for performance
              for (let i = 0; i < 8; i++) {
                particles.push({
                  x: p.random(p.width),
                  y: p.random(p.height),
                  velX: p.random(-0.5, 0.5) * speed,
                  velY: p.random(-0.5, 0.5) * speed,
                  history: [],
                  maxHistory: p.random(30, 80), // Reduced trail length
                  phase: p.random(p.TWO_PI),
                });
              }
              break;

            case "neural-network":
              // Reduced from 25 to 15 for performance
              for (let i = 0; i < 15; i++) {
                nodes.push({
                  x: p.random(100, p.width - 100),
                  y: p.random(100, p.height - 100),
                  connections: [],
                  energy: p.random(0.3, 1),
                  pulsePhase: p.random(p.TWO_PI),
                });
              }
              // Connect nearby nodes with fewer connections
              for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                  const dist = p.dist(
                    nodes[i].x,
                    nodes[i].y,
                    nodes[j].x,
                    nodes[j].y
                  );
                  if (dist < 150 && p.random() < 0.2) {
                    // Reduced distance and probability
                    nodes[i].connections.push(j);
                  }
                }
              }
              break;

            case "organic-growth":
              branches.push({
                x: p.width / 2,
                y: p.height / 2,
                angle: p.random(p.TWO_PI),
                length: 0,
                maxLength: p.random(80, 200), // Reduced max length
                generation: 0,
                growth: 0.3 * speed, // Slower growth
              });
              break;

            case "minimal-geometry":
              // Reduced from 8 to 5 for performance
              for (let i = 0; i < 5; i++) {
                particles.push({
                  x: p.random(p.width * 0.2, p.width * 0.8),
                  y: p.random(p.height * 0.2, p.height * 0.8),
                  size: p.random(40, 120), // Slightly smaller
                  rotation: 0,
                  rotSpeed: p.random(-0.008, 0.008) * speed, // Slower rotation
                  type: p.floor(p.random(3)),
                });
              }
              break;

            case "particle-dance":
              // Reduced from 40 to 25 for performance
              for (let i = 0; i < 25; i++) {
                particles.push({
                  x: p.random(p.width),
                  y: p.random(p.height),
                  baseX: p.random(p.width),
                  baseY: p.random(p.height),
                  radius: p.random(40, 100), // Smaller radius
                  angle: p.random(p.TWO_PI),
                  speed: p.random(0.003, 0.015) * speed, // Slightly slower
                  size: p.random(1, 2.5),
                });
              }
              break;
          }
        };

        p.draw = () => {
          p.clear();
          time += 0.008 * speed; // Slightly slower time progression

          // Parse color more efficiently
          const hexColor = color.replace("#", "");
          const r = parseInt(hexColor.substr(0, 2), 16);
          const g = parseInt(hexColor.substr(2, 2), 16);
          const b = parseInt(hexColor.substr(4, 2), 16);

          switch (variant) {
            case "flowing-lines":
              drawFlowingLines(r, g, b);
              break;
            case "neural-network":
              drawNeuralNetwork(r, g, b);
              break;
            case "organic-growth":
              drawOrganicGrowth(r, g, b);
              break;
            case "minimal-geometry":
              drawMinimalGeometry(r, g, b);
              break;
            case "particle-dance":
              drawParticleDance(r, g, b);
              break;
          }
        };

        const drawFlowingLines = (r: number, g: number, b: number) => {
          p.strokeWeight(1.5); // Slightly thicker for visibility

          particles.forEach((particle) => {
            // Simplified noise calculation
            const noiseScale = 0.004;
            particle.velX =
              p.map(
                p.noise(particle.x * noiseScale, particle.y * noiseScale, time),
                0,
                1,
                -1,
                1
              ) * speed;
            particle.velY =
              p.map(
                p.noise(
                  particle.x * noiseScale + 1000,
                  particle.y * noiseScale + 1000,
                  time
                ),
                0,
                1,
                -1,
                1
              ) * speed;

            particle.x += particle.velX;
            particle.y += particle.velY;

            // Wrap around edges
            if (particle.x < 0) particle.x = p.width;
            if (particle.x > p.width) particle.x = 0;
            if (particle.y < 0) particle.y = p.height;
            if (particle.y > p.height) particle.y = 0;

            // Add to history
            particle.history.push({ x: particle.x, y: particle.y });
            if (particle.history.length > particle.maxHistory) {
              particle.history.shift();
            }

            // Draw flowing line with higher opacity
            p.noFill();
            for (let i = 1; i < particle.history.length; i++) {
              const alpha = (i / particle.history.length) * opacity * 255;
              p.stroke(r, g, b, alpha);
              p.line(
                particle.history[i - 1].x,
                particle.history[i - 1].y,
                particle.history[i].x,
                particle.history[i].y
              );
            }
          });
        };

        const drawNeuralNetwork = (r: number, g: number, b: number) => {
          p.strokeWeight(1);

          nodes.forEach((node) => {
            // Pulse effect
            node.pulsePhase += 0.015 * speed;
            const pulse = p.sin(node.pulsePhase) * 0.5 + 0.5;

            // Draw connections
            node.connections.forEach((connectedIndex: number) => {
              const connected = nodes[connectedIndex];
              const alpha = opacity * 255 * pulse * 0.8; // Increased alpha
              p.stroke(r, g, b, alpha);
              p.line(node.x, node.y, connected.x, connected.y);
            });

            // Draw node
            const nodeAlpha = opacity * 255 * pulse;
            p.stroke(r, g, b, nodeAlpha);
            p.noFill();
            p.circle(node.x, node.y, 6 + pulse * 3); // Slightly larger
          });
        };

        const drawOrganicGrowth = (r: number, g: number, b: number) => {
          p.strokeWeight(1.5);
          p.stroke(r, g, b, opacity * 255);
          p.noFill();

          for (let i = branches.length - 1; i >= 0; i--) {
            const branch = branches[i];

            branch.length += branch.growth;

            const endX = branch.x + Math.cos(branch.angle) * branch.length;
            const endY = branch.y + Math.sin(branch.angle) * branch.length;

            p.line(branch.x, branch.y, endX, endY);

            // Less frequent branching for performance
            if (
              branch.length > branch.maxLength * 0.8 &&
              p.random() < 0.015 &&
              branch.generation < 2
            ) {
              const newAngle = branch.angle + p.random(-p.PI / 4, p.PI / 4);

              branches.push({
                x: endX,
                y: endY,
                angle: newAngle,
                length: 0,
                maxLength: branch.maxLength * 0.6,
                generation: branch.generation + 1,
                growth: branch.growth * 0.7,
              });
            }

            if (branch.length >= branch.maxLength) {
              branches.splice(i, 1);
            }
          }

          // Add new seeds less frequently
          if (branches.length < 1 && p.random() < 0.008) {
            branches.push({
              x: p.random(p.width * 0.3, p.width * 0.7),
              y: p.random(p.height * 0.3, p.height * 0.7),
              angle: p.random(p.TWO_PI),
              length: 0,
              maxLength: p.random(60, 150),
              generation: 0,
              growth: 0.2 * speed,
            });
          }
        };

        const drawMinimalGeometry = (r: number, g: number, b: number) => {
          p.strokeWeight(1.2);
          p.stroke(r, g, b, opacity * 255);
          p.noFill();

          particles.forEach((particle) => {
            p.push();
            p.translate(particle.x, particle.y);
            p.rotate(particle.rotation);

            const breathe = p.sin(time + particle.x * 0.008) * 8;

            switch (particle.type) {
              case 0: // Circle
                p.circle(0, 0, particle.size + breathe);
                break;
              case 1: // Triangle
                p.beginShape();
                for (let i = 0; i < 3; i++) {
                  const angle = (i / 3) * p.TWO_PI;
                  const x = (Math.cos(angle) * (particle.size + breathe)) / 2;
                  const y = (Math.sin(angle) * (particle.size + breathe)) / 2;
                  p.vertex(x, y);
                }
                p.endShape(p.CLOSE);
                break;
              case 2: // Square
                p.rect(
                  -(particle.size + breathe) / 2,
                  -(particle.size + breathe) / 2,
                  particle.size + breathe,
                  particle.size + breathe
                );
                break;
            }

            p.pop();

            particle.rotation += particle.rotSpeed;
          });
        };

        const drawParticleDance = (r: number, g: number, b: number) => {
          p.strokeWeight(1.2);
          p.stroke(r, g, b, opacity * 255);
          p.noFill();

          particles.forEach((particle) => {
            particle.angle += particle.speed;

            particle.x =
              particle.baseX + Math.cos(particle.angle) * particle.radius;
            particle.y =
              particle.baseY + Math.sin(particle.angle) * particle.radius;

            p.circle(particle.x, particle.y, particle.size);

            // Reduced connection distance for performance
            particles.forEach((other) => {
              const dist = p.dist(particle.x, particle.y, other.x, other.y);
              if (dist < 80 && particle !== other) {
                const alpha = p.map(dist, 0, 80, opacity * 255 * 0.6, 0);
                p.stroke(r, g, b, alpha);
                p.line(particle.x, particle.y, other.x, other.y);
              }
            });
          });
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
          initializeVariant();
        };
      };

      // Create p5 instance
      if (containerRef.current) {
        p5InstanceRef.current = new p5(sketch, containerRef.current);
      }
    };

    initializeP5();

    // Cleanup function
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [variant, opacity, speed, color, isClient]);

  if (!isClient) {
    return <div ref={containerRef} className={className} />;
  }

  return <div ref={containerRef} className={className} />;
}
