"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const PARTICLE_COUNT = 52;
const CONNECTION_DISTANCE = 115;
const PARTICLE_COLOR = [77, 184, 138]; // #4DB88A

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() * 0.54 - 0.27) * 0.5,
    vy: (Math.random() * 0.50 - 0.25) * 0.5,
    r: Math.random() * 1.7 + 0.7,
  }));
}

const WAVE_LAYERS = [
  { amp: 32, freq: 0.005, spd: 0.007, alpha: 0.035, lw: 2 },
  { amp: 22, freq: 0.008, spd: 0.011, alpha: 0.07, lw: 1.5 },
  { amp: 13, freq: 0.013, spd: 0.019, alpha: 0.045, lw: 1 },
];

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(createParticles());
  const frameRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const particles = particlesRef.current;
    const [pr, pg, pb] = PARTICLE_COLOR;

    function draw() {
      frameRef.current++;
      const frame = frameRef.current;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;

      ctx!.clearRect(0, 0, w, h);

      const positions: { x: number; y: number }[] = particles.map((p) => {
        let x = p.x * w + p.vx * frame;
        let y = p.y * h + p.vy * frame;
        x = ((x % w) + w) % w;
        y = ((y % h) + h) % h;
        return { x, y };
      });

      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECTION_DISTANCE) {
            const alpha = 0.09 * (1 - d / CONNECTION_DISTANCE);
            ctx!.beginPath();
            ctx!.moveTo(positions[i].x, positions[i].y);
            ctx!.lineTo(positions[j].x, positions[j].y);
            ctx!.strokeStyle = `rgba(${pr},${pg},${pb},${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < positions.length; i++) {
        const r = particles[i].r;
        ctx!.beginPath();
        ctx!.arc(positions[i].x, positions[i].y, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${pr},${pg},${pb},0.3)`;
        ctx!.fill();
      }

      const mid = h * 0.8;
      for (const layer of WAVE_LAYERS) {
        ctx!.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const phase1 = x * layer.freq + frame * layer.spd;
          const phase2 = x * layer.freq * 1.6 + frame * layer.spd * 0.7;
          const y =
            mid +
            Math.sin(phase1) * layer.amp +
            Math.sin(phase2) * layer.amp * 0.35;
          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        ctx!.strokeStyle = `rgba(${pr},${pg},${pb},${layer.alpha})`;
        ctx!.lineWidth = layer.lw;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
