import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const cards = [
  { Icon: HiPhone, title: "Call Us", primary: "+91 95786 78917", secondary: "Mon–Sat, 8am–8pm", href: "tel:9578678917" },
  { Icon: HiMail, title: "Email", primary: "proactiveselvakumar@gmail.com", secondary: "Response within 1 hour", href: "mailto:proactiveselvakumar@gmail.com" },
  { Icon: FaWhatsapp, title: "WhatsApp", primary: "+91 95786 78917", secondary: "Quick chat &amp; booking", href: "https://wa.me/919578678917" },
  { Icon: HiLocationMarker, title: "Visit", primary: "Uppilipalayam", secondary: "Coimbatore, TN 641015", href: "/contact" },
];

export function ContactPreview() {
  return (
    <section className="relative py-14 sm:py-16 bg-white">
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="We're ready when you are."
            description="Reach out through whichever channel feels easiest — we'll get you scheduled for an assessment immediately."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <a
                href={c.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-blue-brand/5 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-brand/35 hover:shadow-blue"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-brand/5 text-blue-brand transition-all duration-500 group-hover:bg-blue-brand group-hover:text-white shadow-sm">
                  <c.Icon className="h-5 w-5" />
                </span>
                <p className="mt-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{c.title}</p>
                <p className="mt-2 font-display text-lg font-bold text-ink" dangerouslySetInnerHTML={{ __html: c.primary }} />
                <p className="mt-1 text-xs text-muted-foreground font-medium" dangerouslySetInnerHTML={{ __html: c.secondary }} />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-blue-brand/5 bg-[#FAFBFD] p-6 sm:grid-cols-[1fr_auto] sm:items-center shadow-inner">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-blue-brand/5 text-blue-brand border border-blue-brand/10 shadow-sm">
              <HiClock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Business Hours</p>
              <p className="mt-1 text-sm font-semibold text-ink">Mon–Sat: 8:00 AM – 8:00 PM · Sunday: Closed</p>
            </div>
          </div>
          <Link to="/contact" className="btn-blue btn-blue-hover text-sm">Contact Us <HiArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
