import { Link } from "@tanstack/react-router";
import { HiArrowRight } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { doctors, type Doctor } from "@/data/doctors";

export function DoctorCard({ doctor, index = 0 }: { doctor: Doctor; index?: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <div className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe">
        <div className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br ${doctor.accent}`}>
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-display text-7xl font-bold text-ink/25">{doctor.initials}</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <p className="text-xs leading-relaxed text-white/85">{doctor.bio}</p>
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-ink backdrop-blur">
            {doctor.experience}
          </span>
        </div>
        <div className="p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-deep">{doctor.specialty}</p>
          <h3 className="mt-2 font-display text-xl font-semibold text-ink">{doctor.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{doctor.qualification}</p>
          <Link to="/doctors" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-gold-deep">
            View profile <HiArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export function DoctorsFeatured() {
  const featured = doctors.slice(0, 4);
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Meet Our Experts"
              title="The hands behind every recovery."
              description="Board-certified physiotherapists with international training and a deep commitment to your outcome."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/doctors" className="btn-ghost-dark text-ink hover:bg-ink hover:text-white">
              Meet the team <HiArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d, i) => <DoctorCard key={d.id} doctor={d} index={i} />)}
        </div>
      </div>
    </section>
  );
}
