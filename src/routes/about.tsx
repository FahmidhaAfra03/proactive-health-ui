import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { DoctorsFeatured } from "@/components/sections/DoctorsFeatured";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Proactive — Our Story & Mission" },
      { name: "description", content: "Learn about Proactive's founding, our senior-led team and the standard of care we bring to every recovery." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title="Care worth returning to."
        description="Since 2011, Proactive has been raising the bar for physiotherapy in India — one honest recovery at a time."
      />
      <About />
      <WhyChooseUs />
      <Stats />
      <DoctorsFeatured />
      <CTA />
    </SiteLayout>
  );
}
