"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const METRICS = [
  { value: "[X]%", label: "more consistent scores across interviewers" },
  { value: "[X]", label: "hours saved per hiring cycle" },
  { value: "[X]%", label: "of follow-up questions surfaced automatically" },
];

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <section className="px-6 py-24 md:py-32">
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={isInView || reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto max-w-[1080px]"
      >
        {/* Metrics */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          {METRICS.map((metric) => (
            <div key={metric.label} className="text-center">
              <p className="mb-2 font-mono text-5xl font-bold text-foreground">
                {metric.value}
              </p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Logo row — placeholder */}
        <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex h-8 w-24 items-center justify-center rounded bg-[rgba(255,255,255,0.08)] text-xs text-muted-foreground"
            >
              Logo
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
