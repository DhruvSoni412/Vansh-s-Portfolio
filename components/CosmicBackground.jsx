"use client";

import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let resizeFrameId;
    let width;
    let height;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();

    const handleResize = () => {
      cancelAnimationFrame(resizeFrameId);
      resizeFrameId = requestAnimationFrame(setCanvasSize);
    };
    window.addEventListener("resize", handleResize);

    const mouse = { x: width / 2, y: height / 2, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle count based on screen size
    const count = Math.min(Math.floor((width * height) / 10000), 120);
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        color: "#C8FF4D",
      });
    }

    const draw = () => {
      const lightTheme = document.documentElement.dataset.theme === "light";
      ctx.clearRect(0, 0, width, height);

      // Draw faint radial ambient background glows
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.7
      );
      glowGrad.addColorStop(0, lightTheme ? "rgba(255,255,252,.92)" : "rgba(24,26,29,.9)");
      glowGrad.addColorStop(0.5, lightTheme ? "rgba(243,242,238,.98)" : "rgba(17,18,20,.98)");
      glowGrad.addColorStop(1, lightTheme ? "#F3F2EE" : "#111214");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse proximity glow boost
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const factor = 1 - dist / mouse.radius;
          p.alpha = Math.min(1, p.baseAlpha + factor * 0.5);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = lightTheme ? `rgba(43,13,161,${factor * .1})` : `rgba(200,255,77,${factor * .12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        } else {
          p.alpha = p.baseAlpha;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = lightTheme ? `rgba(43,13,161,${p.alpha * .24})` : `rgba(200,255,77,${p.alpha * .65})`;
        ctx.shadowBlur = lightTheme ? 0 : p.radius > 1.5 ? 8 : 0;
        ctx.shadowColor = lightTheme ? "rgba(43,13,161,.25)" : p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(resizeFrameId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
