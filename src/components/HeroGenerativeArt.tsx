"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroGenerativeArt() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation variables
    let time = 0;
    const particles: any[] = [];
    const connections: any[] = [];
    const waves: any[] = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;

      // Central flow particles - reduced count
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: canvas.width * 0.1 + Math.random() * canvas.width * 0.8,
          y: canvas.height * 0.2 + Math.random() * canvas.height * 0.6,
          baseX: canvas.width * 0.1 + Math.random() * canvas.width * 0.8,
          baseY: canvas.height * 0.2 + Math.random() * canvas.height * 0.6,
          vx: 0,
          vy: 0,
          size: 2 + Math.random() * 3,
          phase: Math.random() * Math.PI * 2,
          speed: 0.01 + Math.random() * 0.02,
          type: "flow",
        });
      }

      // Title area accent particles - reduced
      for (let i = 0; i < 4; i++) {
        particles.push({
          x: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
          y: canvas.height * 0.3 + Math.random() * canvas.height * 0.2,
          baseX: canvas.width * 0.2 + Math.random() * canvas.width * 0.6,
          baseY: canvas.height * 0.3 + Math.random() * canvas.height * 0.2,
          vx: 0,
          vy: 0,
          size: 1.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.01,
          type: "accent",
        });
      }

      // Border flow elements - reduced
      for (let i = 0; i < 6; i++) {
        const side = Math.floor(Math.random() * 4);
        let x, y;

        switch (side) {
          case 0: // top
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height * 0.1;
            break;
          case 1: // right
            x = canvas.width * 0.9 + Math.random() * canvas.width * 0.1;
            y = Math.random() * canvas.height;
            break;
          case 2: // bottom
            x = Math.random() * canvas.width;
            y = canvas.height * 0.9 + Math.random() * canvas.height * 0.1;
            break;
          default: // left
            x = Math.random() * canvas.width * 0.1;
            y = Math.random() * canvas.height;
        }

        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.015,
          type: "border",
        });
      }

      // Waves removed to reduce motion sickness
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Waves removed to reduce visual noise

      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.phase += particle.speed;

        // Different behaviors for different particle types
        switch (particle.type) {
          case "flow":
            // Flowing motion with attraction to center
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const distToCenter = Math.sqrt(
              (particle.x - centerX) ** 2 + (particle.y - centerY) ** 2
            );
            const attraction = 0.001;

            particle.vx += (centerX - particle.x) * attraction;
            particle.vy += (centerY - particle.y) * attraction;

            // Add orbital motion
            const angle = Math.atan2(
              particle.y - centerY,
              particle.x - centerX
            );
            particle.vx += Math.cos(angle + Math.PI / 2) * 0.5;
            particle.vy += Math.sin(angle + Math.PI / 2) * 0.5;

            // Damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            particle.x += particle.vx;
            particle.y += particle.vy;
            break;

          case "accent":
            // Gentle floating motion around title area
            particle.x = particle.baseX + Math.sin(particle.phase) * 30;
            particle.y = particle.baseY + Math.cos(particle.phase * 0.7) * 15;
            break;

          case "border":
            // Border particles flow toward center
            const targetX = canvas.width * (0.3 + Math.random() * 0.4);
            const targetY = canvas.height * (0.3 + Math.random() * 0.4);

            particle.vx += (targetX - particle.x) * 0.0005;
            particle.vy += (targetY - particle.y) * 0.0005;
            particle.vx *= 0.995;
            particle.vy *= 0.995;

            particle.x += particle.vx;
            particle.y += particle.vy;
            break;
        }

        // Keep particles in bounds
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          if (particle.type === "border") {
            // Reset border particles
            const side = Math.floor(Math.random() * 4);
            switch (side) {
              case 0:
                particle.x = Math.random() * canvas.width;
                particle.y = 0;
                break;
              case 1:
                particle.x = canvas.width;
                particle.y = Math.random() * canvas.height;
                break;
              case 2:
                particle.x = Math.random() * canvas.width;
                particle.y = canvas.height;
                break;
              default:
                particle.x = 0;
                particle.y = Math.random() * canvas.height;
            }
            particle.vx = 0;
            particle.vy = 0;
          } else {
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }
        }

        // Draw particle with subtle glow effect
        const alpha = 0.3 + Math.sin(particle.phase * 2) * 0.1; // Much more subtle

        // Subtle glow
        ctx.shadowColor =
          particle.type === "accent"
            ? "rgba(212, 181, 200, 0.2)"
            : "rgba(197, 118, 138, 0.15)";
        ctx.shadowBlur = particle.size * 1.5; // Reduced glow

        ctx.fillStyle =
          particle.type === "accent"
            ? `rgba(212, 181, 200, ${alpha * 0.6})` // More subtle
            : `rgba(197, 118, 138, ${alpha * 0.4})`;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      });

      // Draw connections between nearby particles
      connections.length = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

          if (distance < 100) {
            // Reduced connection distance
            const alpha = (1 - distance / 100) * 0.12; // Much more subtle
            ctx.strokeStyle = `rgba(154, 68, 83, ${alpha})`;
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw subtle geometric accent shapes
      const geometryTime = time * 0.3; // Slower rotation

      // Subtle rotating geometric frames
      ctx.save();
      ctx.translate(canvas.width * 0.15, canvas.height * 0.2);
      ctx.rotate(geometryTime * 0.2); // Slower
      ctx.strokeStyle = "rgba(90, 61, 72, 0.15)"; // Much more subtle
      ctx.lineWidth = 1;
      ctx.strokeRect(-30, -30, 60, 60); // Smaller
      ctx.restore();

      ctx.save();
      ctx.translate(canvas.width * 0.85, canvas.height * 0.8);
      ctx.rotate(-geometryTime * 0.25); // Slower
      ctx.strokeStyle = "rgba(128, 92, 111, 0.12)"; // Much more subtle
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, 20, 0, Math.PI * 2); // Smaller
      ctx.stroke();
      ctx.restore();

      // Removed dynamic title underline to reduce horizontal motion

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    />
  );
}
