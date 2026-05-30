"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ScoreLevel } from "./mock-data";

interface ScoreResolveProps {
  score: number;
  level: ScoreLevel;
  resolveDelay: number;
  onResolved?: () => void;
}

const LEVEL_STYLES: Record<ScoreLevel, string> = {
  good: "bg-score-good-subtle text-score-good",
  mid: "bg-score-mid-subtle text-score-mid",
  low: "bg-score-low-subtle text-score-low",
};

export function ScoreResolve({ score, level, resolveDelay, onResolved }: ScoreResolveProps) {
  const reduced = useReducedMotion();
  const [resolved, setResolved] = useState(reduced ? true : false);

  useEffect(() => {
    if (reduced) {
      onResolved?.();
      return;
    }

    const timer = setTimeout(() => {
      setResolved(true);
      onResolved?.();
    }, resolveDelay * 1000);
    return () => clearTimeout(timer);
  }, [resolveDelay, reduced, onResolved]);

  return (
    <div className="mt-3 flex items-center justify-between">
      <span className="font-mono text-xs text-muted-foreground">
        {resolved ? "" : "Evaluating..."}
      </span>
      {resolved && (
        <motion.span
          initial={reduced ? false : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-bold ${LEVEL_STYLES[level]}`}
        >
          {score}%
        </motion.span>
      )}
    </div>
  );
}
