import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Proactive" },
      { name: "description", content: "The terms that govern your use of Proactive's website and clinical services." },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" description="Last updated: January 2026" />
      <section className="py-20">
        <article className="container-lux prose prose-neutral max-w-3xl">
          <Section title="Acceptance of terms">
            By using this website or booking an appointment, you agree to these terms. Please read them carefully — they set out how we work together.
          </Section>
          <Section title="Appointments &amp; cancellations">
            We ask for 24 hours' notice to cancel or reschedule. Late cancellations may incur a fee equal to 50% of the session cost; no-shows are billed in full.
          </Section>
          <Section title="Clinical services">
            Our therapists provide care within their scope of practice and current best evidence. Outcomes vary and are not guaranteed. Continue any prescribed medical care alongside physiotherapy.
          </Section>
          <Section title="Payments">
            Payment is due at the time of service unless otherwise arranged. We accept card, UPI and select insurance providers.
          </Section>
          <Section title="Intellectual property">
            All website content, brand assets and clinical resources are the property of Proactive and may not be reproduced without written consent.
          </Section>
        </article>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
