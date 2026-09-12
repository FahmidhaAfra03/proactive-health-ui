import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service } as { service: (typeof services)[number] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.title ?? "Service"} — ProActive` },
      { name: "description", content: loaderData?.service.short ?? "ProActive physiotherapy service" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader eyebrow="Not Found" title="Service unavailable" description="This service page doesn't exist." />
    </SiteLayout>
  ),
});
