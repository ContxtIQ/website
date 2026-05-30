export type ScoreLevel = "good" | "mid" | "low";

export interface MockQuestion {
  question: string;
  answer: string;
  score: number;
  scoreLevel: ScoreLevel;
  idealAnswer: string;
  followUp?: string;
}

export const MOCK_INTERVIEW: {
  role: string;
  section: string;
  questions: MockQuestion[];
} = {
  role: "Software Engineer",
  section: "Technical Skills & Experience",
  questions: [
    {
      question:
        "How would you design a rate limiter for an API handling 10,000 requests per second?",
      answer:
        "I'd use a sliding window approach with Redis. Each request increments a counter keyed by client IP and timestamp bucket. When the count exceeds the threshold, we return a 429. The sliding window avoids the burst problem you get with fixed windows...",
      score: 85.7,
      scoreLevel: "good",
      idealAnswer:
        "Mentions sliding window or token bucket, discusses storage trade-offs, addresses edge cases like distributed rate limiting",
    },
    {
      question:
        "What's your approach to debugging a memory leak in production?",
      answer:
        "I'd probably restart the server and see if that fixes it. If not, I'd look at the logs.",
      score: 42,
      scoreLevel: "low",
      idealAnswer:
        "Names specific profiling tools (heapdump, pprof, Valgrind), describes systematic isolation approach, discusses metrics to monitor",
      followUp:
        "Can you walk through a specific tool or technique you'd use to identify the source of the leak?",
    },
  ],
};
