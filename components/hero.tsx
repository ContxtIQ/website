"use client";

import dynamic from "next/dynamic";

const LiveScoringDemo = dynamic(
  () =>
    import("@/components/live-scoring-demo").then((mod) => ({
      default: mod.LiveScoringDemo,
    })),
  { ssr: false }
);

export function Hero() {
  return (
    <section>
      <div className="flex flex-col items-center px-6 pt-32 pb-20 text-center md:pt-40 md:pb-24">
        <h1 className="max-w-[720px] font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[56px]">
          Every interviewer performs like your best one
        </h1>
        <p className="mt-6 max-w-[540px] text-base text-muted-foreground md:text-lg">
          Real-time answer scoring, intelligent follow-ups, and structured
          interviews that reduce bias and guesswork.
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
      <LiveScoringDemo />
    </section>
  );
}
