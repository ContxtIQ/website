"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const METRICS = [
  { value: "[X]%", label: "more consistent scores across interviewers" },
  { value: "[X]", label: "hours saved per hiring cycle" },
  { value: "[X]%", label: "of follow-up questions surfaced automatically" },
];

export function SocialProof() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.3 });
  const logosInView = useInView(logosRef, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1080px]">
        {/* Metrics */}
        <div
          ref={metricsRef}
          className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={metricsInView || reduced ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : i * 0.12,
                ease,
              }}
              className="text-center"
            >
              <p className="mb-2 font-mono text-5xl font-bold text-foreground">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Logo row — placeholder */}
        <motion.div
          ref={logosRef}
          initial={reduced ? false : { opacity: 0 }}
          animate={logosInView || reduced ? { opacity: 0.4 } : undefined}
          transition={{ duration: 0.8, ease }}
          className="flex flex-wrap items-center justify-center gap-12"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex h-8 w-24 items-center justify-center rounded bg-[rgba(255,255,255,0.08)] text-xs text-muted-foreground"
            >
              Logo
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
