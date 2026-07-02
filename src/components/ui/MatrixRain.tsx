"use client";

import { useEffect, useRef } from "react";

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789<>{}[]/=+*ABCDEF";
const FONT_SIZE = 16;
const TRAIL_FADE = 0.06; // higher = shorter trails
const DRAW_INTERVAL_MS = 90; // slower than 60fps → calmer rain

/** Subtle Matrix-style character rain rendered on a fixed background canvas. */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return;
    }

    let columns = 0;
    let drops: number[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.ceil(width / FONT_SIZE);
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * -height) / FONT_SIZE),
      );
      context.font = `${FONT_SIZE}px ui-monospace, monospace`;
    };

    let frame = 0;
    let lastDraw = 0;

    const draw = (timestamp: number) => {
      frame = requestAnimationFrame(draw);
      if (timestamp - lastDraw < DRAW_INTERVAL_MS) {
        return;
      }
      lastDraw = timestamp;

      // Fade the previous frame to create the trailing effect.
      context.fillStyle = `rgba(9, 13, 18, ${TRAIL_FADE})`;
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i += 1) {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        // Occasional brighter head glyph, mostly dim body.
        context.fillStyle =
          Math.random() > 0.975
            ? "rgba(0, 230, 138, 0.55)"
            : "rgba(0, 230, 138, 0.16)";
        context.fillText(glyph, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 1;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 opacity-40"
    />
  );
}
