import React, { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { SpecializedTreatments } from "@/components/sections/SpecializedTreatments";
import { TreatmentProcess } from "@/components/sections/TreatmentProcess";
import { DoctorsFeatured } from "@/components/sections/DoctorsFeatured";
import { ContactPreview } from "@/components/sections/ContactPreview";

const Testimonials = React.lazy(() => import("@/components/sections/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ = React.lazy(() => import("@/components/sections/FAQ").then(m => ({ default: m.FAQ })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProActive Physiotherapy and Sports Rehab | Coimbatore" },
      { name: "description", content: "Coimbatore's premium physiotherapy and sports rehabilitation clinic. Under the clinical guidance of Dr. B. Selvakumar (MPT Sports), we offer pain management, sports rehab, orthopedic, neurological, and post-surgical recovery." },
      { property: "og:title", content: "ProActive Physiotherapy and Sports Rehab" },
      { property: "og:description", content: "Senior-led, evidence-based physiotherapy for lasting recovery in Coimbatore." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <About />
      <WhyChooseUs />
      <SpecializedTreatments />
      <TreatmentProcess />
      <DoctorsFeatured />
      <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20" />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<div className="h-40 animate-pulse bg-muted/20" />}>
        <FAQ limit={6} />
      </Suspense>
      <ContactPreview />
    </SiteLayout>
  );
}
