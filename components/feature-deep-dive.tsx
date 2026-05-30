"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

function ScorecardMock() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">
          Can you describe the types of HVAC systems you&apos;ve worked on?
        </p>
        <span className="rounded-full bg-score-good-subtle px-3 py-1 font-mono text-xs font-bold text-score-good">
          85.7%
        </span>
      </div>
      <div className="rounded-lg bg-[rgba(255,255,255,0.03)] p-4">
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Response Summary
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-score-good" />
            Candidate demonstrates practical experience across multiple system types
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-score-good" />
            Covers residential, commercial, split systems, heat pumps, furnaces
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-score-good" />
            Includes relevant service areas: installations, diagnostics, repairs
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-score-low" />
            Response could be more organized; lacks specific examples or depth
          </li>
        </ul>
      </div>
    </div>
  );
}

function TemplateListMock() {
  const templates = [
    { name: "Customer Success Check-In", sections: 3, questions: 10 },
    { name: "Technical Phone Screen", sections: 4, questions: 13 },
    { name: "Sales Discovery Call", sections: 4, questions: 13 },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card">
      <div className="border-b border-border px-5 py-3">
        <div className="grid grid-cols-[1fr_80px_80px] gap-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>Name</span>
          <span className="text-center">Sections</span>
          <span className="text-center">Questions</span>
        </div>
      </div>
      {templates.map((t) => (
        <div
          key={t.name}
          className="grid grid-cols-[1fr_80px_80px] gap-4 border-b border-border px-5 py-4 last:border-b-0"
        >
          <span className="text-sm font-medium text-foreground">{t.name}</span>
          <span className="text-center text-sm text-muted-foreground">
            {t.sections}
          </span>
          <span className="text-center text-sm text-muted-foreground">
            {t.questions}
          </span>
        </div>
      ))}
    </div>
  );
}

interface DeepDiveProps {
  label: string;
  heading: string;
  body: string;
  mock: React.ReactNode;
  reversed?: boolean;
}

function DeepDive({ label, heading, body, mock, reversed }: DeepDiveProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={isInView || reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={`mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[45fr_55fr] ${
        reversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <p className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
          {label}
        </p>
        <h3 className="mb-4 font-display text-2xl font-bold text-foreground md:text-[32px]">
          {heading}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
      <div className={reversed ? "lg:[direction:ltr]" : ""}>{mock}</div>
    </motion.div>
  );
}

export function FeatureDeepDives() {
  return (
    <section id="features" className="space-y-24 px-6 py-24 md:py-32">
      <DeepDive
        label="Answer Scoring"
        heading="Scoring that explains itself"
        body="Every answer gets a percentage score and a point-by-point breakdown — what the candidate covered, what they missed, and how it compares to your ideal. No black boxes."
        mock={<ScorecardMock />}
      />
      <DeepDive
        label="Script Templates"
        heading="Every interview, same standard"
        body="Script templates ensure every candidate gets the same questions in the same order. Sections organize by competency. Scores roll up for a clear, comparable signal."
        mock={<TemplateListMock />}
        reversed
      />
    </section>
  );
}
