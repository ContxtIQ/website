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
        label="Technical Coverage"
        heading="Interview any technical role with confidence"
        body="Your recruiters don't need to know Kubernetes from Kafka. ContxtIQ scores technical answers in real time against expert-written rubrics — so you can assess engineers, architects, and DevOps candidates without a technical SME in every interview."
        mock={
          <img
            src="/product-shots/conversation-detail-top.jpg"
            alt="Real-time scoring view showing an 86% score with point-by-point breakdown of a technical answer"
            className="rounded-xl"
          />
        }
      />
      <DeepDive
        label="Candidate Comparison"
        heading="Compare candidates on what actually matters"
        body="Every candidate gets a score breakdown by competency. Stack them side-by-side to see who's strongest — no gut calls, no second-guessing. Your clients get better shortlists, faster."
        mock={
          <img
            src="/product-shots/conversation-scorecard.jpg"
            alt="Candidate scorecard showing competency-level scores for side-by-side comparison"
            className="rounded-xl"
          />
        }
        reversed
      />
      <DeepDive
        label="Script Analytics"
        heading="Sharpen your scripts with real data"
        body="See which questions candidates consistently miss or ace. Spot confusing wording. Know when to swap a question out or add criteria to the job description. Script analytics turn every interview into a feedback loop that makes the next one better."
        mock={
          <img
            src="/product-shots/analytics.jpg"
            alt="Script analytics dashboard showing question performance trends and average candidate scores"
            className="rounded-xl"
          />
        }
      />
    </section>
  );
}
