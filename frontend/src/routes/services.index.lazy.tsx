import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ServiceCard } from "@/components/sections/ServicesFeatured";
import { getServices } from "@/lib/api";

export const Route = createLazyFileRoute("/services/")({
  component: ServicesPage,
});

function ServicesPage() {
  const { data: servicesData = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Clinical Programs"
        title={
          <>
            Every program{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              engineered
            </span>{" "}
            for outcome.
          </>
        }
        description="Eight clinical physiotherapy pathways, each built around measurable milestones, advanced modalities, and senior-led care."
        bgKey="services"
      />
      <section className="py-20 sm:py-28 bg-[#FAFBFD]">
        <div className="container-lux grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicesData.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
