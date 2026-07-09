import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { TreatmentProcess } from "@/components/sections/TreatmentProcess";
import { Stats } from "@/components/sections/Stats";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Our Rehabilitation Process" },
      { name: "description", content: "Discover our five-phase, evidence-based rehabilitation process — from assessment to full return to life." },
    ],
  }),
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Treatments"
        title="A journey, not a session."
        description="Our five-phase rehab framework is the backbone of every program — designed to be transparent, measurable and deeply personal."
      />
      <TreatmentProcess />
      <Stats />
      <CTA />
    </SiteLayout>
  );
}
