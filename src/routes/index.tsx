import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesFeatured } from "@/components/sections/ServicesFeatured";
import { TreatmentProcess } from "@/components/sections/TreatmentProcess";
import { DoctorsFeatured } from "@/components/sections/DoctorsFeatured";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { ContactPreview } from "@/components/sections/ContactPreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Proactive — Premium Physiotherapy & Rehabilitation Clinic" },
      { name: "description", content: "Luxury physiotherapy and rehabilitation clinic delivering senior-led, one-on-one care for sports, orthopedic, neurological and post-surgical recovery." },
      { property: "og:title", content: "Proactive — Premium Physiotherapy & Rehabilitation" },
      { property: "og:description", content: "Senior-led, evidence-based physiotherapy for lasting recovery." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBanner />
      <About />
      <WhyChooseUs />
      <ServicesFeatured />
      <TreatmentProcess />
      <DoctorsFeatured />
      <Stats />
      <Testimonials />
      <GalleryPreview />
      <FAQ limit={6} />
      <CTA />
      <ContactPreview />
    </SiteLayout>
  );
}
