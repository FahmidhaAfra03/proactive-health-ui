import { createFileRoute } from "@tanstack/react-router";
import { FaStar } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/sections/CTA";
import { testimonials } from "@/data/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Real Recovery Stories" },
      { name: "description", content: "Read what patients say about their recovery journey with Proactive." },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Testimonials"
        title="Stories worth sharing."
        description="Every recovery is personal — here's what our patients say about theirs."
      />
      <section className="py-20 sm:py-28">
        <div className="container-lux grid gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-3xl border border-black/5 bg-white p-8 shadow-[0_20px_60px_-40px_rgba(17,17,17,0.3)]">
                <div className="flex items-center gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, k) => <FaStar key={k} className="h-4 w-4" />)}
                </div>
                <p className="mt-5 flex-1 font-display text-lg leading-relaxed text-ink">&ldquo;{t.review}&rdquo;</p>
                <div className="mt-8 flex items-center gap-4 border-t border-black/5 pt-6">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-ink font-display text-base font-semibold text-gold">{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </SiteLayout>
  );
}
