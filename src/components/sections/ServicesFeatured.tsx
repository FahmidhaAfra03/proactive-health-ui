import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { services, type Service } from "@/data/services";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  return (
    <Reveal delay={index * 0.05}>
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
      >
        <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-all duration-500 group-hover:bg-gold/25" />
        <div className="relative flex items-center justify-between">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ink text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
            <Icon className="h-6 w-6" />
          </span>
          <span className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            0{(index % 9) + 1}
          </span>
        </div>
        <h3 className="relative mt-7 font-display text-xl font-semibold text-ink">{service.title}</h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
        <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
          Learn more
          <HiArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-gold" />
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesFeatured() {
  const featured = services.slice(0, 6);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Signature Services"
              title="A full spectrum of physio &amp; rehab."
              description="Ten focused programs, one relentless standard of care — designed to move you from pain to peak."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/services" className="btn-ghost-dark text-ink hover:bg-ink hover:text-white">
              View all services <HiArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
