"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.25, 1, 0.5, 1] as const;

const STEPS = [
  {
    number: "01",
    title: "Set up your interview script",
    description:
      "Define questions, ideal answers, and scoring criteria. ContxtIQ structures every interview before it starts.",
  },
  {
    number: "02",
    title: "Interview with real-time scoring",
    description:
      "As candidates answer, each response is scored against your ideal in seconds — not after the interview, during it.",
  },
  {
    number: "03",
    title: "Go deeper when it matters",
    description:
      "Low score? ContxtIQ surfaces a targeted follow-up question so you probe exactly where the gap is.",
  },
];

export function HowItWorks() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32">
      <motion.h2
        ref={headingRef}
        initial={reduced ? false : { opacity: 0, y: 20 }}
        animate={headingInView || reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
        className="mb-16 text-center font-display text-3xl font-bold tracking-tight text-foreground md:text-[40px]"
      >
        How it works
      </motion.h2>
      <div
        ref={gridRef}
        className="relative mx-auto grid max-w-[1080px] grid-cols-1 gap-12 md:grid-cols-3 md:gap-12"
      >
        {/* Connecting line — desktop only */}
        <div className="absolute top-8 right-[calc(100%/6)] left-[calc(100%/6)] hidden h-px bg-border md:block" />

        {STEPS.map((step, i) => (
          <motion.div
            key={step.number}
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={gridInView || reduced ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: 0.6,
              delay: reduced ? 0 : i * 0.15,
              ease,
            }}
            className="relative text-center md:text-left"
          >
            <p className="mb-3 font-mono text-5xl font-bold text-accent/40">
              {step.number}
            </p>
            <h3 className="mb-2 font-display text-xl font-bold text-foreground">
              {step.title}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
