"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ<>/{}";
const CELL = 17;
const MAX_STREAMS = 56;

type Stream = {
  x: number;
  y: number;
  age: number;
  lifetime: number;
  speed: number;
  glyphs: string[];
  mutation: number;
};

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

export function MatrixCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouseAvailable = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");
    let streams: Stream[] = [];
    let frame = 0;
    let previousTime = 0;
    let lastEmission = 0;
    let lastPointer: { x: number; y: number } | null = null;
    let width = 0;
    let height = 0;

    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      lastEmission = 0;
      lastPointer = null;
      streams = [];
      context.clearRect(0, 0, width, height);
    };

    const resize = () => {
      clear();
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = (time: number) => {
      const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0;
      previousTime = time;
      context.clearRect(0, 0, width, height);
      context.font = '14px "SFMono-Regular", Consolas, "Liberation Mono", monospace';
      context.textAlign = "center";
      context.textBaseline = "top";

      streams = streams.filter((stream) => stream.age < stream.lifetime);
      for (const stream of streams) {
        stream.age += delta;
        stream.y += stream.speed * delta;
        stream.mutation += delta;
        if (stream.mutation > 0.09) {
          stream.glyphs[Math.floor(Math.random() * stream.glyphs.length)] = randomGlyph();
          stream.mutation = 0;
        }

        const fadeIn = Math.min(stream.age / 0.08, 1);
        const fadeOut = Math.min((stream.lifetime - stream.age) / 0.65, 1);
        const opacity = Math.max(0, fadeIn * fadeOut);
        const length = Math.min(stream.glyphs.length, Math.floor(stream.age * stream.speed / CELL) + 2);

        for (let index = length - 1; index >= 0; index--) {
          const y = stream.y - index * CELL;
          if (y < -CELL || y > height) continue;
          context.globalAlpha = opacity * (1 - index / length) * 0.75;
          context.fillStyle = index === 0 ? "#c4ffda" : "#22e875";
          context.shadowColor = "#16e86a";
          context.shadowBlur = index === 0 ? 9 : 3;
          context.fillText(stream.glyphs[index], stream.x, y);
        }
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      if (streams.length) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = 0;
        previousTime = 0;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || document.hidden || motionPreference.matches || !mouseAvailable.matches) return;
      const point = { x: event.clientX, y: event.clientY };
      const now = performance.now();
      const origin = lastPointer ?? point;
      const distance = Math.hypot(point.x - origin.x, point.y - origin.y);
      if (lastPointer && distance < 22 && now - lastEmission < 45) return;

      // Interpolate fast movements so the rain follows the whole cursor path.
      const count = Math.min(4, Math.max(1, Math.floor(distance / 30)));
      for (let index = 1; index <= count; index++) {
        streams.push({
          x: origin.x + (point.x - origin.x) * index / count + (Math.random() - 0.5) * 24,
          y: origin.y + (point.y - origin.y) * index / count + 12,
          age: 0,
          lifetime: 1.1 + Math.random() * 0.6,
          speed: 90 + Math.random() * 65,
          glyphs: Array.from({ length: 6 + Math.floor(Math.random() * 5) }, randomGlyph),
          mutation: 0,
        });
      }
      streams = streams.slice(-MAX_STREAMS);
      lastPointer = point;
      lastEmission = now;
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) lastPointer = null;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", clear);
    motionPreference.addEventListener("change", clear);
    mouseAvailable.addEventListener("change", clear);

    return () => {
      clear();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", clear);
      motionPreference.removeEventListener("change", clear);
      mouseAvailable.removeEventListener("change", clear);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-cursor" aria-hidden="true" />;
}
