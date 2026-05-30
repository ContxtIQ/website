import { Nav } from "@/components/nav";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent focus:outline-none"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <section className="flex min-h-screen items-center justify-center pt-16">
          <h1 className="font-display text-5xl font-bold tracking-tight">
            ContxtIQ
          </h1>
        </section>
      </main>
    </>
  );
}
