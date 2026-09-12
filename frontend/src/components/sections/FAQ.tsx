import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiPlus, HiMinus, HiPhone } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { getFAQs } from "@/lib/api";

export function FAQ({ limit }: { limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);

  const { data: faqsData = [] } = useQuery({
    queryKey: ["faq"],
    queryFn: getFAQs,
  });

  const items = limit ? faqsData.slice(0, limit) : faqsData;

  return (
    <section className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background ambient glow shapes */}
      <div className="absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-blue-brand/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -z-10 h-[500px] w-[500px] rounded-full bg-gold/[0.02] blur-3xl pointer-events-none" />

      <div className="container-lux grid gap-14 lg:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Questions Answered"
              title={
                <span>
                  Everything you need to <span className="font-serif italic font-normal gold-gradient-text">know</span> before you book.
                </span>
              }
              description="Can't find your answer? Our care team is a message away — we usually respond within an hour."
            />
            
            {/* Live coordinator availability card */}
            <div className="mt-8 relative overflow-hidden rounded-3xl border border-blue-brand/5 bg-gradient-to-br from-[#0C1524] to-[#050D1A] p-6 shadow-luxe">
              {/* Ambient inner glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-brand/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    Care Team Online
                  </span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-sm font-semibold text-white tracking-wide">
                    Have a specific question?
                  </h4>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Chat directly with our clinical coordinators to understand treatments, pricing, or bookings.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href="https://wa.me/919578678917"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600/10 border border-emerald-500/25 hover:border-emerald-500 hover:bg-emerald-600/20 px-3.5 py-2 text-xs font-bold text-emerald-400 transition-all duration-300 uppercase tracking-wider"
                  >
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp
                  </a>
                  <a
                    href="tel:9578678917"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 px-3.5 py-2 text-xs font-bold text-white transition-all duration-300 uppercase tracking-wider"
                  >
                    <HiPhone className="h-3.5 w-3.5 text-gold" /> Call Care
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-4">
            {items.map((f: any, i) => {
              const isOpen = open === i;
              const question = f.question || f.q;
              const answer = f.answer || f.a || "";
              
              // Typographical cleanup for server strings containing "???"
              const cleanAnswer = answer.replace(/\?{3,}/g, "—");

              return (
                <div
                  key={question || i}
                  className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isOpen
                      ? "border-blue-brand/20 bg-gradient-to-br from-blue-brand/[0.015] to-transparent shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
                      : "border-black/[0.04] bg-white hover:border-black/[0.08] hover:shadow-[0_4px_25px_rgb(0,0,0,0.01)] hover:-translate-y-[0.5px]"
                  }`}
                >
                  {/* Left colored border gradient on active item */}
                  {isOpen && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-brand to-gold rounded-r" />
                  )}

                  <div className="pl-6 pr-6">
                    <button
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className={`font-display text-[15px] sm:text-[16px] font-bold tracking-tight transition-colors duration-300 ${isOpen ? "text-blue-brand" : "text-ink group-hover:text-blue-brand"}`}>
                        {question}
                      </span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "border-blue-brand bg-blue-brand text-white rotate-180"
                          : "border-black/5 bg-transparent text-ink-soft group-hover:border-blue-brand/20 group-hover:text-blue-brand"
                      }`}>
                        {isOpen ? <HiMinus className="h-3.5 w-3.5" /> : <HiPlus className="h-3.5 w-3.5" />}
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
                          <p className="pb-6 pr-6 text-sm leading-relaxed text-muted-foreground">{cleanAnswer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

