"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

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
      <div className={reversed ? "lg:[direction:ltr]" : ""}>
        <div className="feature-screenshot-frame">{mock}</div>
      </div>
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
        mock={
          <img
            src="/product-shots/conversation-detail-top.jpg"
            alt="Conversation detail view showing an 86% final score with section-by-section scoring and AI-generated response summaries"
            className="rounded-xl"
          />
        }
      />
      <DeepDive
        label="Script Templates"
        heading="Every interview, same standard"
        body="Script templates ensure every candidate gets the same questions in the same order. Sections organize by competency. Scores roll up for a clear, comparable signal."
        mock={
          <img
            src="/product-shots/script-template-detail-top.jpg"
            alt="Script template detail view showing questions organized by section with ideal responses and aggregate scoring metrics"
            className="rounded-xl"
          />
        }
        reversed
      />
    </section>
  );
}
