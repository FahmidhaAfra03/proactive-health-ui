import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiPlus, HiMinus } from "react-icons/hi";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { faqs } from "@/data/faqs";

export function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Questions Answered"
            title="Everything you need to know before you book."
            description="Can't find your answer? Our care team is a message away — we usually respond within an hour."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-black/5 rounded-3xl border border-black/5 bg-white">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="px-6">
                  <button
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="font-display text-base font-semibold text-ink sm:text-lg">{f.q}</span>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-gold text-ink" : "bg-muted text-ink"}`}>
                      {isOpen ? <HiMinus className="h-4 w-4" /> : <HiPlus className="h-4 w-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
