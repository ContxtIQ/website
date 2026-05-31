"use client";

const templates = [
  {
    role: "Senior Backend Engineer",
    section: "System Design & Architecture",
    questions: 8,
    active: true,
  },
  {
    role: "Cloud Infrastructure Engineer",
    section: "AWS & DevOps Practices",
    questions: 6,
    active: false,
  },
  {
    role: "Full-Stack Developer",
    section: "React & API Design",
    questions: 7,
    active: false,
  },
];

function TemplateCard({
  role,
  section,
  questions,
  active,
}: (typeof templates)[number]) {
  return (
    <div
      className={`hero-mock-template ${active ? "hero-mock-template--active" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[var(--foreground)]">
          {role}
        </span>
        {active && (
          <span className="hero-mock-badge">Active</span>
        )}
      </div>
      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-[var(--muted-foreground)]">
        <span>{section}</span>
        <span className="opacity-40">·</span>
        <span>{questions} questions</span>
      </div>
    </div>
  );
}

export function HeroMock() {
  return (
    <div className="hero-mock-container">
      {/* Main panel — template list */}
      <div className="hero-mock-panel">
        <div className="hero-mock-header">
          <div className="hero-mock-dot hero-mock-dot--red" />
          <div className="hero-mock-dot hero-mock-dot--yellow" />
          <div className="hero-mock-dot hero-mock-dot--green" />
          <span className="ml-3 text-[11px] font-medium text-[var(--muted-foreground)]">
            Script Templates
          </span>
        </div>
        <div className="flex flex-col gap-2 p-4">
          {templates.map((t) => (
            <TemplateCard key={t.role} {...t} />
          ))}
          <button className="hero-mock-new-btn">
            + New Template
          </button>
        </div>
      </div>

      {/* Floating overlay — active session */}
      <div className="hero-mock-session">
        <div className="hero-mock-session-header">
          <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
            Live Session
          </span>
          <span className="text-[10px] text-[var(--muted-foreground)]">
            System Design & Architecture
          </span>
        </div>
        <div className="hero-mock-question">
          <p className="text-[12px] leading-relaxed text-[var(--foreground)]">
            How would you design a rate limiter for an API handling 10,000
            requests per second?
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="hero-mock-score">
              <div className="hero-mock-score-bar">
                <div className="hero-mock-score-fill" style={{ width: "86%" }} />
              </div>
              <span className="text-[11px] font-semibold text-[var(--accent)]">
                86%
              </span>
            </div>
            <span className="hero-mock-scored-label">Scored</span>
          </div>
        </div>
        <div className="hero-mock-question hero-mock-question--pending">
          <p className="text-[12px] leading-relaxed text-[var(--muted-foreground)]">
            Describe your approach to horizontal scaling with stateless
            services.
          </p>
          <div className="mt-2">
            <span className="text-[10px] text-[var(--muted-foreground)] opacity-60">
              Awaiting response...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
