import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { FeaturedWork } from "@/components/FeaturedWork";
import { Artist } from "@/components/Artist";
import { BookingSection } from "@/components/BookingSection";
import { SocialProof } from "@/components/SocialProof";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Grain } from "@/components/Grain";
import { SmoothScroll } from "@/components/SmoothScroll";

/**
 * /  —  Jaime C Ink homepage.
 *
 * TODO (SEO): update titles, descriptions, and og: tags below to match
 * the published domain when ready.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jaime C Ink — Stories Etched in Ink · Private Tattoo Studio" },
      {
        name: "description",
        content:
          "Private tattoo studio by Jaime C. Custom fine line, blackwork, realism and spine pieces — designed for one body, never repeated. By appointment only.",
      },
      { property: "og:title", content: "Jaime C Ink — Stories Etched in Ink" },
      {
        property: "og:description",
        content:
          "Cinematic, custom tattoo artistry. By appointment only.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }, // Fixed path and type
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <Grain />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <FeaturedWork />
        <Artist />
        <Marquee />
        <BookingSection />
        <SocialProof />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}