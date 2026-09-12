import { createLazyFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { TreatmentProcess } from "@/components/sections/TreatmentProcess";

export const Route = createLazyFileRoute("/treatments")({
  component: TreatmentsPage,
});

function TreatmentsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Treatments"
        title={
          <>
            A{" "}
            <span className="blue-gradient-text font-serif italic font-normal">
              journey
            </span>
            , not a session.
          </>
        }
        description="Our five-phase rehab framework is the backbone of every program — designed to be transparent, measurable and deeply personal."
        bgKey="treatments"
      />
      <TreatmentProcess />
    </SiteLayout>
  );
}
