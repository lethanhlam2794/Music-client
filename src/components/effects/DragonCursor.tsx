"use client";

import { useEffect, useRef } from "react";

interface ClickWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  lineWidth: number;
}

interface BurstNote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
  color: string;
}

const MUSIC_SYMBOLS = ["♪", "♫", "♩", "♬", "♭", "♯"];

const COLOR_PALETTE = [
  "rgba(216, 180, 254, ", // Bright Lavender / Violet
  "rgba(244, 114, 182, ", // Bright Pink
  "rgba(165, 180, 252, ", // Bright Indigo
  "rgba(103, 232, 249, ", // Bright Cyan
  "rgba(110, 231, 183, ", // Bright Mint / Emerald
  "rgba(253, 224, 71, ",  // Bright Gold / Yellow
];

export function DragonCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -300, y: -300, prevX: -300, prevY: -300, speed: 0 });

  const clickWavesRef = useRef<ClickWave[]>([]);
  const burstNotesRef = useRef<BurstNote[]>([]);
  const rafRef = useRef<number>(0);

  // Chasing & Orbiting music notes state
  const notesStateRef = useRef([
    { x: -300, y: -300, angle: 0, radius: 48, speed: 0.035, char: "♪", colorIdx: 0, size: 18, lag: 0.12 },
    { x: -300, y: -300, angle: (Math.PI * 2) / 3, radius: 56, speed: -0.028, char: "♫", colorIdx: 1, size: 17, lag: 0.09 },
    { x: -300, y: -300, angle: (Math.PI * 4) / 3, radius: 44, speed: 0.04, char: "♬", colorIdx: 3, size: 18, lag: 0.07 },
  ]);

  // Track mouse position & calculate movement speed
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.prevX = m.x;
      m.prevY = m.y;
      m.x = e.clientX;
      m.y = e.clientY;

      const dx = m.x - m.prevX;
      const dy = m.y - m.prevY;
      m.speed = Math.hypot(dx, dy);
    };

    const onLeave = () => {
      mouseRef.current = { x: -300, y: -300, prevX: -300, prevY: -300, speed: 0 };
    };

    // Spawn shockwaves & burst notes ONLY on click!
    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const baseColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

      clickWavesRef.current.push({
        x,
        y,
        radius: 8,
        maxRadius: 65 + Math.random() * 35,
        alpha: 1.0,
        color: baseColor,
        lineWidth: 3.2,
      });

      const count = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const speed = 2.5 + Math.random() * 3.0;
        const noteColor = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

        burstNotesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.8,
          char: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
          size: 16 + Math.floor(Math.random() * 16),
          alpha: 1.0,
          rotation: (Math.random() - 0.5) * 0.6,
          vRot: (Math.random() - 0.5) * 0.1,
          color: noteColor,
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;

    const loop = () => {
      if (!isRunning) return;
      rafRef.current = requestAnimationFrame(loop);
      frame++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      if (mouse.x < 0) return;

      // Mouse speed decays smoothly when mouse stops
      mouse.speed *= 0.88;

      // ─────────────────────────────────────────────────────────────
      // 1. DYNAMIC CHASING -> ORBITING PHYSICS
      // (Đuổi theo khi di chuột -> Quay quanh khi dừng chuột)
      // ─────────────────────────────────────────────────────────────
      notesStateRef.current.forEach((note) => {
        // Initialize position on first load
        if (note.x < 0) {
          note.x = mouse.x;
          note.y = mouse.y;
        }

        // Increment orbit angle continuously
        note.angle += note.speed;

        // Calculate orbit target position around cursor
        const orbitTargetX = mouse.x + Math.cos(note.angle) * note.radius;
        const orbitTargetY = mouse.y + Math.sin(note.angle) * note.radius;

        // Dynamic transition factor based on speed (0 = stopped/orbit, 1 = fast movement/chase)
        const chaseFactor = Math.min(1, mouse.speed / 12);

        // When chasing, target is lagging behind cursor position; when stopped, target is orbit position
        const targetX = chaseFactor * (mouse.x + (Math.random() - 0.5) * 10) + (1 - chaseFactor) * orbitTargetX;
        const targetY = chaseFactor * (mouse.y + (Math.random() - 0.5) * 10) + (1 - chaseFactor) * orbitTargetY;

        // Smooth spring follow interpolation
        const followSpeed = note.lag * (1 - chaseFactor * 0.4);
        note.x += (targetX - note.x) * followSpeed;
        note.y += (targetY - note.y) * followSpeed;

        const color = COLOR_PALETTE[note.colorIdx];

        ctx.save();
        ctx.translate(note.x, note.y);
        ctx.font = `900 ${note.size}px sans-serif`;
        ctx.fillStyle = `${color}0.95)`;
        ctx.shadowColor = `${color}1.0)`;
        ctx.shadowBlur = 14;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(note.char, 0, 0);
        ctx.restore();
      });

      // ─────────────────────────────────────────────────────────────
      // 2. CLICK EVENT: RENDER & UPDATE EXPLOSIVE CLICK SHOCKWAVES
      // ─────────────────────────────────────────────────────────────
      clickWavesRef.current = clickWavesRef.current.filter((wave) => {
        wave.radius += (wave.maxRadius - wave.radius) * 0.14 + 1.8;
        const progress = wave.radius / wave.maxRadius;
        wave.alpha = Math.max(0, 1.0 * (1 - progress));

        if (wave.alpha <= 0.01) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${wave.color}${wave.alpha})`;
        ctx.lineWidth = wave.lineWidth * (1 - progress * 0.5);
        ctx.shadowColor = `${wave.color}1.0)`;
        ctx.shadowBlur = 16;
        ctx.stroke();

        const numBars = 12;
        for (let i = 0; i < numBars; i++) {
          const barAngle = (i / numBars) * Math.PI * 2 + frame * 0.04;
          const barLen = (7 + Math.sin(frame * 0.3 + i) * 8) * (1 - progress);
          const bx1 = wave.x + Math.cos(barAngle) * wave.radius;
          const by1 = wave.y + Math.sin(barAngle) * wave.radius;
          const bx2 = wave.x + Math.cos(barAngle) * (wave.radius + barLen);
          const by2 = wave.y + Math.sin(barAngle) * (wave.radius + barLen);

          ctx.beginPath();
          ctx.moveTo(bx1, by1);
          ctx.lineTo(bx2, by2);
          ctx.strokeStyle = `${wave.color}${wave.alpha * 0.95})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }

        ctx.restore();
        return true;
      });

      // ─────────────────────────────────────────────────────────────
      // 3. CLICK EVENT: RENDER & UPDATE BURSTING SCATTER NOTES
      // ─────────────────────────────────────────────────────────────
      burstNotesRef.current = burstNotesRef.current.filter((note) => {
        note.x += note.vx;
        note.y += note.vy;
        note.vx *= 0.94;
        note.vy *= 0.94;
        note.rotation += note.vRot;
        note.alpha -= 0.02;

        if (note.alpha <= 0) return false;

        ctx.save();
        ctx.translate(note.x, note.y);
        ctx.rotate(note.rotation);
        ctx.font = `900 ${note.size}px sans-serif`;
        ctx.fillStyle = `${note.color}${note.alpha})`;
        ctx.shadowColor = `${note.color}1.0)`;
        ctx.shadowBlur = 14;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(note.char, 0, 0);
        ctx.restore();

        return true;
      });
    };

    loop();

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    />
  );
}
