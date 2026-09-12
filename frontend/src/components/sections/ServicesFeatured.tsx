import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiCheck } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { services, type Service } from "@/data/services";

// Import pathway images
import painImg from "@/assets/pain_management.jpg";
import sportsImg from "@/assets/sports_rehabilitation.jpg";
import orthoImg from "@/assets/orthopedic_rehabilitation.jpg";
import neuroImg from "@/assets/neurological_rehabilitation.jpg";
import manualImg from "@/assets/manual_therapy.jpg";
import exerciseImg from "@/assets/exercise_therapy.jpg";
import electroImg from "@/assets/electrotherapy.jpg";
import postSurgImg from "@/assets/post_operative_rehabilitation.jpg";

const serviceImages: Record<string, string> = {
  "pain-management": painImg,
  "sports-rehabilitation": sportsImg,
  "orthopedic-rehabilitation": orthoImg,
  "neurological-rehabilitation": neuroImg,
  "manual-therapy": manualImg,
  "exercise-therapy": exerciseImg,
  "electrotherapy": electroImg,
  "post-surgical-rehabilitation": postSurgImg
};

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  const Icon = service.icon;
  const imgSrc = serviceImages[service.slug] || sportsImg;

  return (
    <Reveal delay={index * 0.05}>
      <div
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-brand/5 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-brand/35 hover:shadow-blue"
      >
        {/* Card Image Header with Zoom Hover Effect */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img 
            src={imgSrc} 
            alt={service.title} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {/* Decorative subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
          
          {/* Floating Icon Badge on top of image */}
          <div className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-blue-brand backdrop-blur-sm shadow-md transition-all duration-500 group-hover:bg-blue-brand group-hover:text-white">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Card Content */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-blue-brand bg-blue-brand/5 px-2.5 py-0.5 rounded-full">
              Clinical Program
            </span>
            <span className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              0{(index % 9) + 1}
            </span>
          </div>

          <h3 className="mt-4 font-display text-lg font-bold leading-tight text-ink group-hover:text-blue-brand transition-colors duration-300">
            {service.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1 line-clamp-3">
            {service.short}
          </p>

          {/* Key Benefits */}
          <ul className="mt-4 space-y-2 text-[12px] text-muted-foreground border-t border-blue-brand/5 pt-4">
            {service.benefits.slice(0, 3).map((b) => (
              <li key={b} className="flex items-start gap-2">
                <HiCheck className="h-3.5 w-3.5 text-blue-brand shrink-0 mt-0.5" />
                <span className="line-clamp-1">{b}</span>
              </li>
            ))}
          </ul>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-blue-brand/5 flex items-center justify-between gap-4">
          <Link 
            to="/book-appointment" 
            search={{ service: service.title }}
            className="btn-blue text-[10px] font-bold uppercase tracking-wider py-2 px-3 rounded-lg shadow-sm hover:shadow-md transition duration-300"
          >
            Book Now
          </Link>
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="text-[11px] font-bold text-ink/75 hover:text-blue-brand flex items-center gap-1 transition-colors"
            >
              Details
              <HiArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function ServicesFeatured() {
  return (
    <section className="relative py-14 sm:py-16 bg-white">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Clinical Offerings"
              title="A full spectrum of physio &amp; rehab."
              description="Eight specialized programs, one relentless standard of care — designed to restore you from pain to peak performance."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/services" className="btn-ghost-dark text-ink border-ink/20 hover:bg-navy-deep hover:text-white text-sm font-semibold">
              View All Services <HiArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
