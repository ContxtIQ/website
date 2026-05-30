"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface QuestionCardProps {
  question: string;
  delay: number;
  children: ReactNode;
}

export function QuestionCard({ question, delay, children }: QuestionCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="rounded-xl border border-border bg-[rgba(255,255,255,0.04)] p-5"
    >
      <p className="text-[15px] font-semibold leading-snug text-foreground">
        {question}
      </p>
      {children}
    </motion.div>
  );
}
