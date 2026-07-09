import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { HiArrowRight, HiPlay } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import hero from "@/assets/hero.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* Ambient */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grain-bg opacity-90" />
        <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-gold/15 blur-3xl animate-float-slow" />
        <div className="absolute -right-24 top-64 h-[28rem] w-[28rem] rounded-full bg-gold/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl animate-float-slow" style={{ animationDelay: "-3s" }} />
      </motion.div>

      <div className="container-lux relative grid min-h-[100svh] items-center gap-14 pt-32 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-40">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/85 backdrop-blur"
          >
            <span className="grid h-4 w-4 place-items-center rounded-full bg-gold text-[8px] text-ink">★</span>
            Award-winning physiotherapy since 2011
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-6 font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[4.5rem]"
          >
            Move better.<br />
            Live <span className="gold-gradient-text italic">stronger.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-lg"
          >
            Proactive is a luxury physiotherapy and rehabilitation clinic where evidence-based care meets uncompromising personal attention. From elite athletes to post-surgical recoveries, we design a healing plan around you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link to="/book-appointment" className="btn-gold btn-gold-hover">
              Book Appointment <HiArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="btn-ghost-dark text-white hover:border-white/50 hover:bg-white/5">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-ink">
                <HiPlay className="h-3 w-3" />
              </span>
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-6"
          >
            <div>
              <div className="flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} className="h-4 w-4" />)}
              </div>
              <p className="mt-1 text-xs text-white/60">Rated 4.9 by 1,200+ patients</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold">15+ yrs</p>
              <p className="text-xs text-white/60">Of clinical excellence</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-display text-2xl font-semibold">30k+</p>
              <p className="text-xs text-white/60">Recoveries delivered</p>
            </div>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          style={{ y: imgY }}
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-luxe">
            <img src={hero} alt="Physiotherapist treating patient" width={1600} height={1200} className="h-[520px] w-full object-cover md:h-[600px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="absolute -left-4 top-16 hidden rounded-2xl bg-white/95 p-4 text-ink shadow-luxe backdrop-blur sm:block"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">Certified Therapists</p>
            <p className="mt-1 font-display text-2xl font-semibold">24 experts</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
            className="absolute -right-4 bottom-16 hidden rounded-2xl bg-ink p-4 text-white ring-1 ring-gold/40 shadow-gold backdrop-blur sm:block"
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Recovery success</p>
            <p className="mt-1 font-display text-2xl font-semibold">98%<span className="text-gold">.</span></p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60 md:flex"
      >
        <span>Scroll</span>
        <span className="relative block h-8 w-4 rounded-full border border-white/30">
          <motion.span
            animate={{ y: [0, 14, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
