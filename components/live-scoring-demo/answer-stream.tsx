"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnswerStreamProps {
  text: string;
  startDelay: number;
  onComplete?: () => void;
}

export function AnswerStream({ text, startDelay, onComplete }: AnswerStreamProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const [visibleCount, setVisibleCount] = useState(reduced ? words.length : 0);
  const [started, setStarted] = useState(reduced ? true : false);

  useEffect(() => {
    if (reduced) {
      onComplete?.();
      return;
    }

    const startTimer = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(startTimer);
  }, [startDelay, reduced, onComplete]);

  useEffect(() => {
    if (!started || reduced) return;
    if (visibleCount >= words.length) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, 60);
    return () => clearTimeout(timer);
  }, [started, visibleCount, words.length, reduced, onComplete]);

  if (!started && !reduced) return null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-3 border-l-2 border-[rgba(255,255,255,0.12)] pl-4 text-[15px] leading-relaxed text-muted-foreground"
    >
      {words.slice(0, visibleCount).join(" ")}
      {visibleCount < words.length && (
        <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-muted-foreground align-middle" />
      )}
    </motion.div>
  );
}
