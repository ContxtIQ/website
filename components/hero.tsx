"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { HeroMock } from "./hero-mock";
import { useDemoModal } from "./demo-modal";

const ease = [0.25, 1, 0.5, 1] as const;

export function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textInView = useInView(textRef, { once: true, amount: 0.3 });
  const imgInView = useInView(imgRef, { once: true, amount: 0.15 });
  const reduced = useReducedMotion();
  const { open } = useDemoModal();

  return (
    <section className="relative overflow-hidden">
      <div className="hero-wave" aria-hidden="true">
        <img
          src="/website/product-shots/contxtiq-wave.png"
          alt=""
          className="hero-wave-img"
        />
      </div>
      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center px-6 pt-32 pb-16 text-center md:pt-40 md:pb-20"
      >
        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={textInView || reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease }}
          className="max-w-[720px] font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[56px]"
        >
          Close technical roles your competitors can&apos;t touch
        </motion.h1>
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={textInView || reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: reduced ? 0 : 0.12, ease }}
          className="mt-6 max-w-[540px] text-base text-muted-foreground md:text-lg"
        >
          ContxtIQ gives your recruiters the scoring rubrics and follow-up
          questions of a technical expert&nbsp;&mdash; so every interview
          surfaces real signal, even for roles outside your team&apos;s
          expertise.
        </motion.p>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={textInView || reduced ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, delay: reduced ? 0 : 0.24, ease }}
          className="mt-10 flex items-center gap-6"
        >
          <button
            onClick={open}
            className="rounded-full border border-[rgba(77,184,138,0.4)] bg-[linear-gradient(135deg,rgba(77,184,138,0.45),rgba(45,160,110,0.35),rgba(77,184,138,0.28))] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_14px_rgba(77,184,138,0.25)] transition-all hover:shadow-[0_0_28px_rgba(77,184,138,0.45)]"
          >
            Request a demo
          </button>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            See how it works
          </a>
        </motion.div>
      </div>

      {/* Hero product showcase */}
      <div ref={imgRef} className="relative mx-auto max-w-[1200px] px-6 pb-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.96 }}
          animate={
            imgInView || reduced
              ? { opacity: 1, y: 0, scale: 1 }
              : undefined
          }
          transition={{ duration: 0.9, ease }}
          className="hero-screenshot-wrapper"
        >
          <div className="hero-glow" />
          <HeroMock />
        </motion.div>
        <div className="hero-bottom-fade" />
      </div>
    </section>
  );
}
