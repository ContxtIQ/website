import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { FeatureDeepDives } from "@/components/feature-deep-dive";
import { WhoItsFor } from "@/components/who-its-for";
import { SocialProof } from "@/components/social-proof";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

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
        <Hero />
        <HowItWorks />
        <FeatureDeepDives />
        <WhoItsFor />
        <SocialProof />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
