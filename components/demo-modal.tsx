"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

const DemoModalContext = createContext<{
  open: () => void;
  close: () => void;
  isOpen: boolean;
}>({ open: () => {}, close: () => {}, isOpen: false });

export function useDemoModal() {
  return useContext(DemoModalContext);
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <DemoModalContext.Provider value={{ open, close, isOpen }}>
      {children}
      <AnimatePresence>
        {isOpen && <DemoModalOverlay onClose={close} />}
      </AnimatePresence>
    </DemoModalContext.Provider>
  );
}

function DemoModalOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="demo-modal-backdrop"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="demo-modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Request a demo"
      >
        <button
          onClick={onClose}
          className="demo-modal-close"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className="font-display text-2xl font-bold text-foreground">
          Request a demo
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us a bit about your team and we&apos;ll show you how ContxtIQ
          works with your interview scripts.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mt-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="demo-first" className="sr-only">
                First name
              </label>
              <input
                id="demo-first"
                name="firstName"
                type="text"
                placeholder="First name *"
                required
                className="demo-modal-input"
              />
            </div>
            <div>
              <label htmlFor="demo-last" className="sr-only">
                Last name
              </label>
              <input
                id="demo-last"
                name="lastName"
                type="text"
                placeholder="Last name *"
                required
                className="demo-modal-input"
              />
            </div>
          </div>
          <div>
            <label htmlFor="demo-email" className="sr-only">
              Work email
            </label>
            <input
              id="demo-email"
              name="email"
              type="email"
              placeholder="Work email *"
              required
              className="demo-modal-input"
            />
          </div>
          <div>
            <label htmlFor="demo-company" className="sr-only">
              Company
            </label>
            <input
              id="demo-company"
              name="company"
              type="text"
              placeholder="Company *"
              required
              className="demo-modal-input"
            />
          </div>
          <div>
            <label htmlFor="demo-message" className="sr-only">
              Message
            </label>
            <textarea
              id="demo-message"
              name="message"
              placeholder="Message (optional)"
              rows={3}
              className="demo-modal-input resize-none"
            />
          </div>
          <button type="submit" className="demo-modal-submit">
            Request a demo
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
