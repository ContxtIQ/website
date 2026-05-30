import { LiveScoringDemo } from "@/components/live-scoring-demo";

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
            className="rounded bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
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
