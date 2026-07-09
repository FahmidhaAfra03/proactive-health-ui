import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Proactive" },
      { name: "description", content: "Answers to the most common questions about our physiotherapy services." },
    ],
  }),
  component: FAQPage,
});

function FAQPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="FAQ"
        title="Questions? We've got answers."
        description="Everything you need to know before your first visit — and beyond."
      />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}
