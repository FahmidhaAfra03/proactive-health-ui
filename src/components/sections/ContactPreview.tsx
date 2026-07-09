import { Link } from "@tanstack/react-router";
import { HiArrowRight, HiPhone, HiMail, HiLocationMarker, HiClock } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

const cards = [
  { Icon: HiPhone, title: "Call Us", primary: "+91 99999 00000", secondary: "Mon–Sat, 8am–9pm", href: "tel:+919999900000" },
  { Icon: HiMail, title: "Email", primary: "care@proactivephysio.com", secondary: "Response within 1 hour", href: "mailto:care@proactivephysio.com" },
  { Icon: FaWhatsapp, title: "WhatsApp", primary: "+91 99999 00000", secondary: "Quick chat &amp; booking", href: "https://wa.me/919999900000" },
  { Icon: HiLocationMarker, title: "Visit", primary: "12 Wellness Avenue", secondary: "Bandra West, Mumbai 400050", href: "#" },
];

export function ContactPreview() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-lux">
        <Reveal>
          <SectionHeading
            eyebrow="Get in Touch"
            title="We're ready when you are."
            description="Reach out through whichever channel feels easiest — we'll get you booked in the same day when possible."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <a
                href={c.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/5 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-luxe"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                  <c.Icon className="h-5 w-5" />
                </span>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{c.title}</p>
                <p className="mt-2 font-display text-lg font-semibold text-ink" dangerouslySetInnerHTML={{ __html: c.primary }} />
                <p className="mt-1 text-xs text-muted-foreground" dangerouslySetInnerHTML={{ __html: c.secondary }} />
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-black/5 bg-muted/60 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-gold">
              <HiClock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Business Hours</p>
              <p className="mt-1 text-sm text-ink">Mon–Sat: 8:00 AM – 9:00 PM · Sunday: 9:00 AM – 2:00 PM</p>
            </div>
          </div>
          <Link to="/contact" className="btn-gold btn-gold-hover">Contact us <HiArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
