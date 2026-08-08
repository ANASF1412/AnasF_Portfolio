import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";
import { Hero } from "@/components/site/hero";
import { Internships } from "@/components/site/internships";
import { Projects } from "@/components/site/projects";
import { Gallery } from "@/components/site/gallery";
import { Certifications } from "@/components/site/certifications";
import { Achievements } from "@/components/site/achievements";
import { About } from "@/components/site/about";
import { Stack } from "@/components/site/stack";
import { Contact } from "@/components/site/contact";

const title = "ANAS F — AI/ML Engineer · Full-Stack Systems";
const description =
  "AI/ML engineer building MLOps pipelines, computer vision and NLP products, and scalable full-stack web architectures.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <Hero />
      <Internships />
      <Projects />
      <Gallery />
      <Stack />
      <Certifications />
      <Achievements />
      <About />
      <Contact />
    </SiteShell>
  );
}
