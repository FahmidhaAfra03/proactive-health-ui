import { Link } from "@tanstack/react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";
import { Logo } from "./Logo";

const cols = [
  {
    title: "Explore",
    links: [
      { to: "/about", label: "About Us" },
      { to: "/services", label: "Services" },
      { to: "/treatments", label: "Treatments" },
      { to: "/doctors", label: "Doctors" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Care",
    links: [
      { to: "/services/sports-physiotherapy", label: "Sports Physiotherapy" },
      { to: "/services/orthopedic-rehabilitation", label: "Orthopedic Rehab" },
      { to: "/services/neurological-rehabilitation", label: "Neurological Rehab" },
      { to: "/services/pain-management", label: "Pain Management" },
      { to: "/services/home-physiotherapy", label: "Home Physiotherapy" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/testimonials", label: "Testimonials" },
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-70" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-lux relative py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="rounded-2xl bg-white p-4 inline-block">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Premium physiotherapy and rehabilitation, delivered by a team who treats every recovery as a personal mission.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/80">
              <a href="tel:+919999900000" className="flex items-center gap-3 hover:text-gold">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5"><HiPhone className="h-4 w-4 text-gold" /></span>
                +91 99999 00000
              </a>
              <a href="mailto:care@proactivephysio.com" className="flex items-center gap-3 hover:text-gold">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5"><HiMail className="h-4 w-4 text-gold" /></span>
                care@proactivephysio.com
              </a>
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5"><HiLocationMarker className="h-4 w-4 text-gold" /></span>
                <span>12 Wellness Avenue,<br />Bandra West, Mumbai 400050</span>
              </div>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-lg font-semibold text-white">{c.title}</h4>
              <div className="mt-3 h-px w-10 bg-gold/60" />
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {c.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="transition-colors hover:text-gold">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Proactive Physio &amp; Rehab. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: FaInstagram, href: "#", label: "Instagram" },
              { Icon: FaFacebookF, href: "#", label: "Facebook" },
              { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
              { Icon: FaYoutube, href: "#", label: "YouTube" },
              { Icon: FaWhatsapp, href: "#", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
