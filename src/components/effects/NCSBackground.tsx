"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  hue: number;
}

interface CornerShockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  hue: number;
}

interface BackgroundMusicNote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  size: number;
  alpha: number;
  rotation: number;
  vRot: number;
  hue: number;
}

const MUSIC_SYMBOLS = ["♪", "♫", "♩", "♬", "♭", "♯"];

export function NCSBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;
    let rafId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Floating Audio Dust Particles ──
    const particlesCount = Math.floor(Math.min(window.innerWidth / 15, 80));
    const particles: Particle[] = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 1 + Math.random() * 2.4,
        speedY: -0.25 - Math.random() * 0.4,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5,
        maxAlpha: 0.3 + Math.random() * 0.45,
        hue: 260 + Math.random() * 70,
      });
    }

    let cornerWaves: CornerShockwave[] = [];
    let backgroundNotes: BackgroundMusicNote[] = [];
    let frame = 0;
    let nextBeatFrame = 0;
    let currentBeatImpact = 0;

    const loop = () => {
      if (!isRunning) return;
      rafId = requestAnimationFrame(loop);
      frame++;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // ─────────────────────────────────────────────────────────────
      // 1. FLOWING AUDIO STAVES / MUSIC WAVE LINES IN THE MIDDLE
      // (Các dải đường nhạc cuộn sóng ở giữa background)
      // ─────────────────────────────────────────────────────────────
      const centerY = h * 0.45;
      const numLines = 4;

      ctx.save();
      for (let l = 0; l < numLines; l++) {
        const lineOffsetY = (l - (numLines - 1) / 2) * 18;
        const lineHue = (250 + l * 25 + Math.sin(frame * 0.01) * 20) % 360;

        ctx.beginPath();
        const step = 15;
        for (let x = 0; x <= w + step; x += step) {
          const wave1 = Math.sin(x * 0.003 + frame * 0.015 + l * 0.4) * 28;
          const wave2 = Math.cos(x * 0.007 - frame * 0.01 + l * 0.6) * 16;
          const y = centerY + lineOffsetY + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const alpha = 0.2 + Math.sin(frame * 0.02 + l) * 0.08;
        ctx.strokeStyle = `hsla(${lineHue}, 85%, 68%, ${alpha})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = `hsla(${lineHue}, 90%, 65%, 0.4)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
      }
      ctx.restore();

      // ─────────────────────────────────────────────────────────────
      // 2. BEAT TIMING & FLOATING MUSIC NOTES GENERATION
      // ─────────────────────────────────────────────────────────────
      const baseRadius = Math.min(w, h) * 0.08 + 25;
      const numBars = 52;

      const corners = [
        { x: 75, y: 75, phase: 0, hueShift: 0 },                  // Top-Left
        { x: w - 75, y: 75, phase: 1.2, hueShift: 50 },           // Top-Right
        { x: 75, y: h - 75, phase: 2.4, hueShift: 100 },          // Bottom-Left
        { x: w - 75, y: h - 75, phase: 3.6, hueShift: 150 },      // Bottom-Right
      ];

      if (frame >= nextBeatFrame) {
        nextBeatFrame = frame + Math.floor(28 + Math.random() * 22);
        currentBeatImpact = 0.85;

        // Spawn shockwaves & notes from corners
        corners.forEach((corner) => {
          const hue = (240 + corner.hueShift + Math.sin(frame * 0.015) * 20) % 360;

          cornerWaves.push({
            x: corner.x,
            y: corner.y,
            radius: baseRadius,
            maxRadius: baseRadius + 40 + Math.random() * 25,
            alpha: 0.75,
            hue: hue,
          });

          const angle = Math.random() * Math.PI * 2;
          const speed = 0.8 + Math.random() * 1.2;
          backgroundNotes.push({
            x: corner.x + Math.cos(angle) * (baseRadius + 10),
            y: corner.y + Math.sin(angle) * (baseRadius + 10),
            vx: Math.cos(angle) * speed,
            vy: -0.8 - Math.random() * 1.2,
            char: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
            size: 16 + Math.floor(Math.random() * 16),
            alpha: 0.9,
            rotation: (Math.random() - 0.5) * 0.4,
            vRot: (Math.random() - 0.5) * 0.04,
            hue: hue,
          });
        });

        // Spawn 1-2 floating music notes along the middle music wave lines
        const midWaveY = centerY + Math.sin(frame * 0.015) * 25;
        backgroundNotes.push({
          x: Math.random() * w,
          y: midWaveY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 1.2,
          vy: -0.6 - Math.random() * 1.0,
          char: MUSIC_SYMBOLS[Math.floor(Math.random() * MUSIC_SYMBOLS.length)],
          size: 14 + Math.floor(Math.random() * 16),
          alpha: 0.85,
          rotation: (Math.random() - 0.5) * 0.4,
          vRot: (Math.random() - 0.5) * 0.04,
          hue: (250 + Math.random() * 60) % 360,
        });
      }

      currentBeatImpact *= 0.94;

      // ─────────────────────────────────────────────────────────────
      // 3. RENDER CORNER SHOCKWAVES
      // ─────────────────────────────────────────────────────────────
      cornerWaves = cornerWaves.filter((wave) => {
        wave.radius += (wave.maxRadius - wave.radius) * 0.07 + 0.6;
        const progress = (wave.radius - baseRadius) / (wave.maxRadius - baseRadius);
        wave.alpha = Math.max(0, 0.75 * (1 - progress));

        if (wave.alpha <= 0.01) return false;

        ctx.save();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${wave.hue}, 85%, 68%, ${wave.alpha})`;
        ctx.lineWidth = 2.0 * (1 - progress * 0.4);
        ctx.shadowColor = `hsla(${wave.hue}, 90%, 60%, 0.6)`;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();

        return true;
      });

      // ─────────────────────────────────────────────────────────────
      // 4. RENDER FLOATING MUSIC NOTES
      // ─────────────────────────────────────────────────────────────
      backgroundNotes = backgroundNotes.filter((note) => {
        note.x += note.vx;
        note.y += note.vy;
        note.vx *= 0.98;
        note.vy *= 0.98;
        note.rotation += note.vRot;
        note.alpha -= 0.007;

        if (note.alpha <= 0) return false;

        ctx.save();
        ctx.translate(note.x, note.y);
        ctx.rotate(note.rotation);
        ctx.font = `900 ${note.size}px sans-serif`;
        ctx.fillStyle = `hsla(${note.hue}, 90%, 72%, ${note.alpha})`;
        ctx.shadowColor = `hsla(${note.hue}, 95%, 65%, 0.85)`;
        ctx.shadowBlur = 12;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(note.char, 0, 0);
        ctx.restore();

        return true;
      });

      // ─────────────────────────────────────────────────────────────
      // 5. RENDER 4 CORNER VISUALIZERS
      // ─────────────────────────────────────────────────────────────
      corners.forEach((corner) => {
        const pulse = currentBeatImpact * 10 + Math.abs(Math.sin(frame * 0.04 + corner.phase)) * 4;
        const radius = baseRadius + pulse;

        ctx.save();

        // Ambient Glow
        const glowGrad = ctx.createRadialGradient(
          corner.x, corner.y, radius * 0.2,
          corner.x, corner.y, radius * 1.7
        );
        glowGrad.addColorStop(0, `rgba(168, 85, 247, ${0.12 + currentBeatImpact * 0.1})`);
        glowGrad.addColorStop(0.5, "rgba(236, 72, 153, 0.05)");
        glowGrad.addColorStop(1, "rgba(11, 14, 23, 0)");

        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, radius * 1.7, 0, Math.PI * 2);
        ctx.fill();

        // Spectrum Frequency Bars
        ctx.lineWidth = 2.2;

        for (let i = 0; i < numBars; i++) {
          const angle = (i / numBars) * Math.PI * 2 + frame * 0.008;

          const bassPeak = currentBeatImpact * 14 + Math.pow(Math.abs(Math.sin(frame * 0.05 + i * 0.35)), 2) * 12;
          const trebleSpike = Math.abs(Math.cos(frame * 0.08 + i * 0.5)) * 8;
          const freqHeight = bassPeak + trebleSpike + 4;

          const x1 = corner.x + Math.cos(angle) * radius;
          const y1 = corner.y + Math.sin(angle) * radius;
          const x2 = corner.x + Math.cos(angle) * (radius + freqHeight);
          const y2 = corner.y + Math.sin(angle) * (radius + freqHeight);

          const hue = (240 + (i / numBars) * 90 + corner.hueShift + Math.sin(frame * 0.01) * 20) % 360;
          ctx.strokeStyle = `hsla(${hue}, 85%, 68%, ${0.5 + currentBeatImpact * 0.3})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }

        // Inner Circle Boundary
        ctx.beginPath();
        ctx.arc(corner.x, corner.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(216, 180, 254, ${0.4 + currentBeatImpact * 0.3})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
      });

      // ─────────────────────────────────────────────────────────────
      // 6. DRIFTING AUDIO DUST PARTICLES
      // ─────────────────────────────────────────────────────────────
      for (let p of particles) {
        p.y += p.speedY;
        p.x += p.speedX;

        p.alpha += (Math.random() - 0.5) * 0.02;
        if (p.alpha < 0.08) p.alpha = 0.08;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 72%, ${p.alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 95%, 65%, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }
    };

    loop();

    return () => {
      isRunning = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-85"
    />
  );
}
