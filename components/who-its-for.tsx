"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const PERSONAS = [
  {
    title: "Recruiters & TA Leads",
    pain: "You run 20+ interviews a week and can’t be an expert on every role.",
    solution:
      "ContxtIQ gives you the scoring rubric and follow-up questions an expert would use.",
    variant: "recruiter" as const,
  },
  {
    title: "Hiring Managers",
    pain: "You need signal from interviews, not vibes and gut feelings.",
    solution:
      "Structured scorecards with per-question breakdowns you can compare across candidates.",
    variant: "hiring" as const,
  },
  {
    title: "Founders & Heads of People",
    pain: "Hiring is your biggest bet, but your process is ad hoc.",
    solution:
      "A repeatable system that makes every interviewer as rigorous as your best one.",
    variant: "founder" as const,
  },
];

function RecruiterIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-auto">
      {/* Multiple candidate cards fanning out */}
      <rect x="40" y="30" width="48" height="64" rx="6" fill="rgba(77,184,138,0.08)" stroke="rgba(77,184,138,0.3)" strokeWidth="1.5" transform="rotate(-8 64 62)" />
      <rect x="76" y="28" width="48" height="64" rx="6" fill="rgba(77,184,138,0.12)" stroke="rgba(77,184,138,0.4)" strokeWidth="1.5" />
      <rect x="112" y="30" width="48" height="64" rx="6" fill="rgba(77,184,138,0.08)" stroke="rgba(77,184,138,0.3)" strokeWidth="1.5" transform="rotate(8 136 62)" />
      {/* Person icon on center card */}
      <circle cx="100" cy="48" r="8" fill="rgba(77,184,138,0.25)" />
      <path d="M88 72a12 12 0 0124 0" stroke="rgba(77,184,138,0.35)" strokeWidth="1.5" fill="none" />
      {/* Score bars on center card */}
      <rect x="86" y="78" width="28" height="3" rx="1.5" fill="rgba(77,184,138,0.2)" />
      <rect x="86" y="84" width="20" height="3" rx="1.5" fill="rgba(77,184,138,0.15)" />
      {/* Checkmark */}
      <circle cx="152" cy="36" r="10" fill="rgba(77,184,138,0.15)" />
      <path d="M147 36l3 3 5-6" stroke="rgba(77,184,138,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HiringIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-auto">
      {/* Bar chart */}
      <rect x="40" y="70" width="20" height="36" rx="3" fill="rgba(100,160,255,0.15)" stroke="rgba(100,160,255,0.3)" strokeWidth="1.5" />
      <rect x="68" y="50" width="20" height="56" rx="3" fill="rgba(100,160,255,0.2)" stroke="rgba(100,160,255,0.35)" strokeWidth="1.5" />
      <rect x="96" y="30" width="20" height="76" rx="3" fill="rgba(100,160,255,0.3)" stroke="rgba(100,160,255,0.5)" strokeWidth="1.5" />
      <rect x="124" y="55" width="20" height="51" rx="3" fill="rgba(100,160,255,0.15)" stroke="rgba(100,160,255,0.3)" strokeWidth="1.5" />
      {/* Comparison arrow */}
      <path d="M50 64h94" stroke="rgba(100,160,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
      {/* Star on tallest bar */}
      <path d="M106 22l2 4 4.5.7-3.2 3.2.8 4.5L106 32l-4.1 2.4.8-4.5-3.2-3.2 4.5-.7z" fill="rgba(100,160,255,0.4)" />
    </svg>
  );
}

function FounderIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" className="h-full w-auto">
      {/* Process loop / system diagram */}
      <circle cx="100" cy="60" r="32" fill="none" stroke="rgba(200,140,255,0.15)" strokeWidth="1.5" strokeDasharray="6 4" />
      {/* Three nodes on the circle */}
      <circle cx="100" cy="28" r="12" fill="rgba(200,140,255,0.12)" stroke="rgba(200,140,255,0.35)" strokeWidth="1.5" />
      <circle cx="72" cy="76" r="12" fill="rgba(200,140,255,0.12)" stroke="rgba(200,140,255,0.35)" strokeWidth="1.5" />
      <circle cx="128" cy="76" r="12" fill="rgba(200,140,255,0.12)" stroke="rgba(200,140,255,0.35)" strokeWidth="1.5" />
      {/* Arrows between nodes */}
      <path d="M110 32l8 28" stroke="rgba(200,140,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrowF)" />
      <path d="M118 80H82" stroke="rgba(200,140,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrowF)" />
      <path d="M76 66l14-26" stroke="rgba(200,140,255,0.3)" strokeWidth="1.5" markerEnd="url(#arrowF)" />
      {/* Node icons */}
      <text x="96" y="32" fontSize="12" fill="rgba(200,140,255,0.5)" textAnchor="middle">Q</text>
      <text x="68" y="80" fontSize="12" fill="rgba(200,140,255,0.5)" textAnchor="middle">S</text>
      <text x="124" y="80" fontSize="12" fill="rgba(200,140,255,0.5)" textAnchor="middle">R</text>
      <defs>
        <marker id="arrowF" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0 0L6 3L0 6" fill="rgba(200,140,255,0.3)" />
        </marker>
      </defs>
      {/* Refresh icon in center */}
      <path d="M96 56a6 6 0 018 0M104 64a6 6 0 01-8 0" stroke="rgba(200,140,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const illustrations = {
  recruiter: RecruiterIllustration,
  hiring: HiringIllustration,
  founder: FounderIllustration,
};

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
        {PERSONAS.map((persona) => {
          const Illustration = illustrations[persona.variant];
          return (
            <div key={persona.title} className="persona-card">
              <div
                className={`persona-illustration persona-illustration--${persona.variant}`}
              >
                <Illustration />
              </div>
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
          );
        })}
      </motion.div>
    </section>
  );
}
