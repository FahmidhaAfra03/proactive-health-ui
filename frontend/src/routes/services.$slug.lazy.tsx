import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { HiArrowLeft, HiCheck } from "react-icons/hi";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";

export const Route = createLazyFileRoute("/services/$slug")({
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = service.icon;
  return (
    <SiteLayout>
      <PageHeader eyebrow="Service" title={service.title} description={service.short} bgKey={service.slug} />
      <section className="py-20 sm:py-28 bg-white">
        <div className="container-lux grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-blue-brand/5 text-blue-brand border border-blue-brand/10 shadow-sm">
              <Icon className="h-7 w-7" />
            </span>
            <h2 className="mt-8 font-display text-3xl font-bold text-ink sm:text-4xl">What to expect</h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{service.description}</p>
            <div className="mt-10 rounded-3xl border border-blue-brand/5 bg-[#FAFBFD] p-6 shadow-inner">
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">Program Includes</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((b: string) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-brand/10 text-blue-brand">
                      <HiCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-ink/80 leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-blue-brand transition-colors">
              <HiArrowLeft className="h-4 w-4" /> Back to all services
            </Link>
          </div>
          <aside className="sticky top-28 h-fit rounded-3xl border border-blue-brand/5 bg-white p-8 shadow-luxe">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">Ready to Start?</p>
            <h3 className="mt-2 font-display text-2xl font-bold text-ink tracking-tight">Book an assessment</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Meet Dr. B. Selvakumar, understand your condition, and leave with a clear recovery plan — in a single visit.</p>
            <Link 
              to="/book-appointment" 
              search={{ service: service.title }}
              className="btn-blue btn-blue-hover mt-6 w-full py-3"
            >
              Book Appointment
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">Or call <a href="tel:9578678917" className="font-semibold text-ink hover:text-blue-brand transition-colors">+91 95786 78917</a></p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
