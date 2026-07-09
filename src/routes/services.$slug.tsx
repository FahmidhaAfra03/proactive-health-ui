import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { HiArrowLeft, HiCheck } from "react-icons/hi";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { CTA } from "@/components/sections/CTA";
import { services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service } as { service: (typeof services)[number] };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.service.title ?? "Service"} — Proactive` },
      { name: "description", content: loaderData?.service.short ?? "Proactive physiotherapy service" },
    ],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <PageHeader eyebrow="Not found" title="Service unavailable" description="This service page doesn't exist." />
    </SiteLayout>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  return (
    <SiteLayout>
      <PageHeader eyebrow="Service" title={service.title} description={service.short} />
      <section className="py-20 sm:py-28">
        <div className="container-lux grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink text-gold">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="mt-8 font-display text-3xl font-semibold text-ink sm:text-4xl">What to expect</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{service.description}</p>
            <div className="mt-10 rounded-3xl border border-black/5 bg-muted/60 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">Program includes</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                      <HiCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium text-ink">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold-deep">
              <HiArrowLeft className="h-4 w-4" /> Back to all services
            </Link>
          </div>
          <aside className="sticky top-28 h-fit rounded-3xl border border-black/5 bg-white p-8 shadow-luxe">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">Ready to start?</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-ink">Book a 60-minute assessment</h3>
            <p className="mt-3 text-sm text-muted-foreground">Meet a senior therapist, understand your condition and leave with a clear plan — in a single visit.</p>
            <Link to="/book-appointment" className="btn-gold btn-gold-hover mt-6 w-full">Book Appointment</Link>
            <p className="mt-4 text-xs text-muted-foreground">Or call <a href="tel:+919999900000" className="font-semibold text-ink hover:text-gold-deep">+91 99999 00000</a></p>
          </aside>
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
