import { motion } from "motion/react";

const brands = [
  "Apollo Sports", "IndiaFit", "Mumbai Marathon", "Fortis Sports Sci",
  "Wellness Times", "Athletix", "MedCare Group",
];

export function TrustBanner() {
  return (
    <section className="border-y border-black/5 bg-white py-10">
      <div className="container-lux">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Trusted by leading healthcare partners &amp; sports programs
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex items-center gap-14 whitespace-nowrap will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className="font-display text-lg font-semibold tracking-wide text-ink/45 sm:text-xl">
                {b}
              </span>
            ))}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
