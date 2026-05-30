"use client";

export function CtaSection() {
  return (
    <section id="request-demo" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[640px] rounded-xl border border-border bg-card p-8 text-center md:p-12">
        <h2 className="mb-3 font-display text-2xl font-bold text-foreground md:text-[32px]">
          See ContxtIQ in action
        </h2>
        <p className="mb-8 text-base text-muted-foreground">
          Book a 15-minute demo and we'll show you how it works with your
          interview scripts.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: wire up form submission
          }}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Name"
                required
                className="w-full rounded-[var(--radius)] border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-[var(--radius)] border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div>
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Company"
                required
                className="w-full rounded-[var(--radius)] border border-border bg-input-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto w-full rounded-[var(--radius)] bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover md:w-auto"
          >
            Request a demo
          </button>
        </form>
      </div>
    </section>
  );
}
