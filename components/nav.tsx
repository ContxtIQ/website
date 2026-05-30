"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#who-its-for" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 64);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-[1080px] items-center justify-between px-6">
        <a href="#" className="font-display text-lg font-bold tracking-wide text-foreground">
          CONTXTIQ
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#request-demo"
            className="rounded-full border border-[rgba(77,184,138,0.4)] bg-[linear-gradient(135deg,rgba(77,184,138,0.45),rgba(45,160,110,0.35),rgba(77,184,138,0.28))] px-5 py-2 text-sm font-semibold text-white shadow-[0_0_14px_rgba(77,184,138,0.25)] transition-all hover:shadow-[0_0_24px_rgba(77,184,138,0.4)]"
          >
            Request a demo
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-foreground transition-transform duration-200 ${
                mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-foreground transition-transform duration-200 ${
                mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#request-demo"
                className="mt-2 rounded-full border border-[rgba(77,184,138,0.4)] bg-[linear-gradient(135deg,rgba(77,184,138,0.45),rgba(45,160,110,0.35),rgba(77,184,138,0.28))] px-5 py-2 text-center text-sm font-semibold text-white shadow-[0_0_14px_rgba(77,184,138,0.25)] transition-all"
                onClick={() => setMobileOpen(false)}
              >
                Request a demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
