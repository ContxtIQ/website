"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HeroMock } from "./hero-mock";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();

  return (
    <section>
      <div className="flex flex-col items-center px-6 pt-32 pb-16 text-center md:pt-40 md:pb-20">
        <h1 className="max-w-[720px] font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[56px]">
          Close technical roles your competitors can&apos;t touch
        </h1>
        <p className="mt-6 max-w-[540px] text-base text-muted-foreground md:text-lg">
          ContxtIQ gives your recruiters the scoring rubrics and follow-up
          questions of a technical expert&nbsp;&mdash; so every interview
          surfaces real signal, even for roles outside your team&apos;s
          expertise.
        </p>
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#request-demo"
            className="rounded-full border border-[rgba(77,184,138,0.4)] bg-[linear-gradient(135deg,rgba(77,184,138,0.45),rgba(45,160,110,0.35),rgba(77,184,138,0.28))] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_14px_rgba(77,184,138,0.25)] transition-all hover:shadow-[0_0_28px_rgba(77,184,138,0.45)]"
          >
            Request a demo
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* Hero product showcase */}
      <div ref={imgRef} className="relative mx-auto max-w-[1200px] px-6 pb-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 32, scale: 0.97 }}
          animate={
            isInView || reduced
              ? { opacity: 1, y: 0, scale: 1 }
              : undefined
          }
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-screenshot-wrapper"
        >
          {/* Glow effect behind the mock */}
          <div className="hero-glow" />

          {/* Component-based hero mock */}
          <HeroMock />
        </motion.div>

        {/* Bottom fade to blend into next section */}
        <div className="hero-bottom-fade" />
      </div>
    </section>
  );
}
