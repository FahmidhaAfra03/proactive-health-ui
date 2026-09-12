import { createLazyFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { DoctorsFeatured } from "@/components/sections/DoctorsFeatured";

export const Route = createLazyFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Our Story"
        title={
          <>
            Care worth{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              returning
            </span>{" "}
            to.
          </>
        }
        description="ProActive has been raising the bar for physiotherapy and sports rehabilitation — one honest recovery at a time."
        bgKey="about"
      />
      <About />
      <WhyChooseUs />
      <DoctorsFeatured />
    </SiteLayout>
  );
}
