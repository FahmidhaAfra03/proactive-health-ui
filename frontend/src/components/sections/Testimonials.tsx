import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [i, setI] = useState(0);
  const total = testimonials.length;
  const t = testimonials[i];
  const go = (d: number) => setI((prev) => (prev + d + total) % total);

  return (
    <section className="relative overflow-hidden bg-muted py-14 sm:py-16 border-y border-black/5">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-brand/10 blur-3xl" />
      <div className="container-lux relative">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Words from those we've helped move again."
            description="Real stories from real recoveries — the reason we do what we do."
          />
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative rounded-[2rem] border border-blue-brand/5 bg-white p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.15)] sm:p-14">
            <FaQuoteLeft className="absolute -top-5 left-8 h-10 w-10 rounded-2xl bg-blue-brand p-2.5 text-white shadow-md shadow-blue-brand/20" />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-1 text-[#EAB308]">
                  {Array.from({ length: t.rating }).map((_, k) => <FaStar key={k} className="h-4 w-4" />)}
                </div>
                <p className="mt-5 font-display text-xl leading-relaxed text-ink sm:text-2xl text-balance">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-blue-brand/10 text-blue-brand font-display text-lg font-bold border border-blue-brand/10 shadow-sm">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 flex items-center justify-between border-t border-blue-brand/5 pt-6">
              <div className="flex items-center gap-2">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`Go to testimonial ${k + 1}`}
                    className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-blue-brand" : "w-2 bg-ink/15"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => go(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink transition hover:border-blue-brand hover:text-blue-brand hover:bg-blue-brand/5" aria-label="Previous">
                  <HiChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => go(1)} className="grid h-11 w-11 place-items-center rounded-full bg-blue-brand text-white transition hover:bg-navy-deep shadow-md shadow-blue-brand/10" aria-label="Next">
                  <HiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
