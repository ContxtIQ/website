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

function StackedProductShots({
  inView,
  reduced,
}: {
  inView: boolean;
  reduced: boolean | null;
}) {
  return (
    <div className="stacked-shots-container">
      <div className="stacked-shots-glow" />

      {/* Back — Welcome */}
      <motion.div
        className="stacked-shot stacked-shot--back"
        initial={reduced ? false : { opacity: 0, x: -40, rotate: 0 }}
        animate={
          inView || reduced
            ? { opacity: 0.7, x: 0, rotate: -3 }
            : undefined
        }
        transition={{ duration: 0.7, ease }}
      >
        <img
          src="/website/product-shots/native-session-ruby-fundamentals.jpg"
          alt="ContxtIQ welcome screen"
          loading="lazy"
        />
      </motion.div>

      {/* Middle — Session */}
      <motion.div
        className="stacked-shot stacked-shot--middle"
        initial={reduced ? false : { opacity: 0, y: 30, rotate: 0 }}
        animate={
          inView || reduced
            ? { opacity: 0.85, y: 0, rotate: 1.5 }
            : undefined
        }
        transition={{ duration: 0.7, delay: reduced ? 0 : 0.15, ease }}
      >
        <img
          src="/website/product-shots/native-session-rails-activerecord.jpg"
          alt="ContxtIQ live interview session with real-time scoring"
          loading="lazy"
        />
      </motion.div>

      {/* Front — New Session */}
      <motion.div
        className="stacked-shot stacked-shot--front"
        initial={reduced ? false : { opacity: 0, x: 30, rotate: 0 }}
        animate={
          inView || reduced ? { opacity: 1, x: 0, rotate: 2 } : undefined
        }
        transition={{ duration: 0.7, delay: reduced ? 0 : 0.3, ease }}
      >
        <img
          src="/website/product-shots/native-new-session-dialog.png"
          alt="ContxtIQ new session dialog with script template selection"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}

export function HowItWorks() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });
  const imagesInView = useInView(imagesRef, { once: true, amount: 0.2 });
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

      <div className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* Left — stacked product images */}
        <motion.div
          ref={imagesRef}
          initial={reduced ? false : { opacity: 0, x: -32 }}
          animate={
            imagesInView || reduced ? { opacity: 1, x: 0 } : undefined
          }
          transition={{ duration: 0.7, ease }}
          className="relative"
        >
          <StackedProductShots inView={imagesInView} reduced={!!reduced} />
        </motion.div>

        {/* Right — vertical steps */}
        <div ref={gridRef} className="relative flex flex-col gap-10">
          {/* Vertical connecting line */}
          <div className="absolute top-[22px] bottom-[22px] left-[22px] hidden w-px bg-border lg:block" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={
                gridInView || reduced ? { opacity: 1, y: 0 } : undefined
              }
              transition={{
                duration: 0.6,
                delay: reduced ? 0 : i * 0.15,
                ease,
              }}
              className="relative flex gap-5 lg:gap-6"
            >
              <div className="flex-shrink-0">
                <p className="flex h-11 w-11 items-center justify-center rounded-full border border-accent-border bg-accent-subtle font-mono text-sm font-bold text-accent">
                  {step.number}
                </p>
              </div>
              <div>
                <h3 className="mb-1.5 font-display text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
