import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiPhone } from "react-icons/hi";
import { Reveal } from "../Reveal";

export function CTA() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-10 text-white sm:p-16">
            <div className="pointer-events-none absolute inset-0 grain-bg opacity-70" />
            <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-float-slow" />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Start your recovery
                </span>
                <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.05] text-balance sm:text-4xl md:text-5xl">
                  Your body deserves a plan built <span className="gold-gradient-text italic">around you.</span>
                </h2>
                <p className="mt-5 max-w-xl text-white/70">
                  Book a 60-minute assessment with a senior therapist. Walk out with a diagnosis, a plan and clarity — in a single visit.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link to="/book-appointment" className="btn-gold btn-gold-hover w-full lg:w-auto">
                  Book Appointment <HiArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+919999900000" className="btn-ghost-dark w-full text-white hover:border-white/50 hover:bg-white/5 lg:w-auto">
                  <HiPhone className="h-4 w-4 text-gold" /> +91 99999 00000
                </a>
                <p className="text-xs text-white/50 lg:text-right">Same-day appointments · Insurance accepted</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
