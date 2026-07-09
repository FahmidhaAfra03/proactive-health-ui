import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ServiceCard } from "@/components/sections/ServicesFeatured";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Proactive Physio & Rehab" },
      { name: "description", content: "Explore ten specialist physiotherapy and rehabilitation programs — from sports and orthopedic to neurological and pain management." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Services"
        title="Every program engineered for outcome."
        description="Ten focused physiotherapy pathways, each built around measurable milestones and one-on-one senior care."
      />
      <section className="py-20 sm:py-28">
        <div className="container-lux grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
