import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { Reveal } from "@/components/Reveal";
import { HiLocationMarker } from "react-icons/hi";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Proactive Physio & Rehab" },
      { name: "description", content: "Get in touch with Proactive by phone, email, WhatsApp or visit our clinic in Mumbai." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk about your recovery."
        description="Reach out any way you like — we usually respond within an hour during business hours."
      />
      <ContactPreview />
      <section className="pb-24">
        <div className="container-lux">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-black/5 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#111111] shadow-luxe">
              <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(212,175,55,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.15)_1px,transparent_1px)] [background-size:40px_40px]" />
              <div className="absolute inset-0 grid place-items-center text-center text-white">
                <div>
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gold text-ink animate-float-slow">
                    <HiLocationMarker className="h-7 w-7" />
                  </span>
                  <p className="mt-6 font-display text-2xl font-semibold">12 Wellness Avenue</p>
                  <p className="mt-1 text-white/70">Bandra West, Mumbai 400050</p>
                  <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="btn-gold btn-gold-hover mt-6">
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
