"use client";

import { motion, useReducedMotion } from "framer-motion";

interface FollowUpProps {
  text: string;
  delay: number;
}

export function FollowUp({ text, delay }: FollowUpProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="mt-4 rounded-lg border-l-2 border-accent bg-accent-subtle py-3 pl-4 pr-3"
    >
      <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
        Follow-up
      </span>
      <p className="text-sm leading-snug text-foreground">{text}</p>
    </motion.div>
  );
}
