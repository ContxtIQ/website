"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PERSONAS = [
  {
    title: "Recruiters & TA Leads",
    pain: "You run 20+ interviews a week and can't be an expert on every role.",
    solution:
      "ContxtIQ gives you the scoring rubric and follow-up questions an expert would use.",
  },
  {
    title: "Hiring Managers",
    pain: "You need signal from interviews, not vibes and gut feelings.",
    solution:
      "Structured scorecards with per-question breakdowns you can compare across candidates.",
  },
  {
    title: "Founders & Heads of People",
    pain: "Hiring is your biggest bet, but your process is ad hoc.",
    solution:
      "A repeatable system that makes every interviewer as rigorous as your best one.",
  },
];

export function WhoItsFor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <section id="who-its-for" className="px-6 py-24 md:py-32">
      <h2 className="mb-16 text-center font-display text-3xl font-bold tracking-tight text-foreground md:text-[40px]">
        Built for teams that take hiring seriously
      </h2>
      <motion.div
        ref={ref}
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={isInView || reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto grid max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-3"
      >
        {PERSONAS.map((persona) => (
          <div
            key={persona.title}
            className="rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[#2a2b28] p-8 transition-all hover:border-[rgba(77,184,138,0.3)] hover:shadow-[0_0_20px_rgba(77,184,138,0.08)]"
          >
            <h3 className="mb-4 font-display text-xl font-bold text-foreground">
              {persona.title}
            </h3>
            <p className="mb-4 text-[15px] italic leading-relaxed text-muted-foreground">
              {persona.pain}
            </p>
            <p className="text-[15px] leading-relaxed text-foreground">
              {persona.solution}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
