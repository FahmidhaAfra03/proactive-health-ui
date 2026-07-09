import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Proactive" },
      { name: "description", content: "How Proactive collects, uses and protects your personal and health information." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Legal" title="Privacy Policy" description="Last updated: January 2026" />
      <section className="py-20">
        <article className="container-lux prose prose-neutral max-w-3xl">
          <Section title="Information we collect">
            We collect the personal and health information you share with us during booking, assessment and treatment — including name, contact details, medical history and clinical notes required to provide safe, effective care.
          </Section>
          <Section title="How we use your information">
            Your information is used solely to plan and deliver your care, coordinate with your doctor when appropriate, process insurance claims, and communicate with you about your appointments.
          </Section>
          <Section title="Data protection">
            All clinical records are stored on encrypted systems with strict access controls. Only authorised members of your care team can view your file.
          </Section>
          <Section title="Sharing">
            We never sell your data. We share information only with your explicit consent, or as required by law and regulated medical practice.
          </Section>
          <Section title="Your rights">
            You may request a copy of your records, ask us to correct inaccuracies, or request deletion of non-essential data at any time. Contact care@proactivephysio.com.
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
