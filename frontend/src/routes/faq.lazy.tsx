import { createLazyFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { FAQ } from "@/components/sections/FAQ";

export const Route = createLazyFileRoute("/faq")({
  component: FAQPage,
});

function FAQPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Questions? We've got{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              answers
            </span>
            .
          </>
        }
        description="Everything you need to know before your first visit — and beyond."
        bgKey="faq"
      />
      <FAQ />
    </SiteLayout>
  );
}
