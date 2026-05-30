export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-wide text-foreground">
            CONTXTIQ
          </span>
          <span className="text-sm text-muted-foreground">
            © 2026 ContxtIQ
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </a>
          <a
            href="#request-demo"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Request a demo
          </a>
        </div>
      </div>
    </footer>
  );
}
