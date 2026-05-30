"use client";

import { useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { MOCK_INTERVIEW } from "./mock-data";
import { QuestionCard } from "./question-card";
import { AnswerStream } from "./answer-stream";
import { ScoreResolve } from "./score-resolve";
import { FollowUp } from "./follow-up";

export function LiveScoringDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const [q1AnswerDone, setQ1AnswerDone] = useState(false);
  const [q1ScoreDone, setQ1ScoreDone] = useState(false);
  const [q2AnswerDone, setQ2AnswerDone] = useState(false);
  const [q2ScoreDone, setQ2ScoreDone] = useState(false);

  const q1 = MOCK_INTERVIEW.questions[0];
  const q2 = MOCK_INTERVIEW.questions[1];

  if (!isInView && !reduced) {
    return <div ref={ref} className="mx-auto max-w-[800px] px-6" style={{ minHeight: 400 }} />;
  }

  return (
    <div ref={ref} className="mx-auto max-w-[800px] px-6 pb-20">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/20">
        {/* Mock app header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">ContxtIQ</span>
            <span className="opacity-50">›</span>
            <span>{MOCK_INTERVIEW.role}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.06)] px-3 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Recording
          </div>
        </div>

        {/* Section title */}
        <div className="px-5 pt-5 pb-2">
          <p className="font-display text-sm font-bold text-accent">
            {MOCK_INTERVIEW.section}
          </p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-4 px-5 pb-6">
          {/* Question 1 */}
          <QuestionCard question={q1.question} delay={0}>
            <AnswerStream
              text={q1.answer}
              startDelay={0.5}
              onComplete={() => setQ1AnswerDone(true)}
            />
            {(q1AnswerDone || reduced) && (
              <ScoreResolve
                score={q1.score}
                level={q1.scoreLevel}
                resolveDelay={reduced ? 0 : 0.3}
                onResolved={() => setQ1ScoreDone(true)}
              />
            )}
          </QuestionCard>

          {/* Question 2 — appears after Q1 score resolves */}
          {(q1ScoreDone || reduced) && (
            <QuestionCard question={q2.question} delay={reduced ? 0 : 0.3}>
              <AnswerStream
                text={q2.answer}
                startDelay={reduced ? 0 : 0.5}
                onComplete={() => setQ2AnswerDone(true)}
              />
              {(q2AnswerDone || reduced) && (
                <ScoreResolve
                  score={q2.score}
                  level={q2.scoreLevel}
                  resolveDelay={reduced ? 0 : 0.3}
                  onResolved={() => setQ2ScoreDone(true)}
                />
              )}
              {(q2ScoreDone || reduced) && q2.followUp && (
                <FollowUp text={q2.followUp} delay={reduced ? 0 : 0.5} />
              )}
            </QuestionCard>
          )}
        </div>
      </div>
    </div>
  );
}
