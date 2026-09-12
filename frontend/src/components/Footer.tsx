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
      { to: "/doctors", label: "Doctors" },
      { to: "/gallery", label: "Gallery" },
    ],
  },
  {
    title: "Services",
    links: [
      { to: "/services", label: "Pain Management" },
      { to: "/services", label: "Sports Rehabilitation" },
      { to: "/services", label: "Orthopedic Rehab" },
      { to: "/services", label: "Neurological Rehab" },
      { to: "/services", label: "Post Surgical Rehab" },
    ],
  },
  {
    title: "Legal & Support",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/contact", label: "Contact Us" },
      { to: "/privacy", label: "Privacy Policy" },
      { to: "/terms", label: "Terms & Conditions" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white border-t border-white/5">
      <div className="pointer-events-none absolute inset-0 grain-bg opacity-40" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-blue-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-lux relative py-20 z-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="rounded-2xl bg-white p-3 inline-block shadow-lg">
              <Logo variant="dark" />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Premium physiotherapy and sports rehabilitation clinic in Coimbatore. Rebuilding movement, strength, and confidence under senior clinical guidance.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <a href="tel:9578678917" className="flex items-center gap-3 transition-colors hover:text-blue-brand">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10"><HiPhone className="h-4 w-4 text-blue-brand" /></span>
                +91 95786 78917
              </a>
              <a href="mailto:proactiveselvakumar@gmail.com" className="flex items-center gap-3 transition-colors hover:text-blue-brand">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10"><HiMail className="h-4 w-4 text-blue-brand" /></span>
                proactiveselvakumar@gmail.com
              </a>
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/5 border border-white/10 shrink-0"><HiLocationMarker className="h-4 w-4 text-blue-brand" /></span>
                <span className="leading-relaxed">
                  Door No. 1 &amp; 2, 1st Street,<br />
                  Kasthuribai Gandhi Nagar,<br />
                  Uppilipalayam, Coimbatore,<br />
                  Tamil Nadu – 641015
                </span>
              </div>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display text-lg font-semibold text-white tracking-wide">{c.title}</h4>
              <div className="mt-3 h-px w-10 bg-blue-brand" />
              <ul className="mt-5 space-y-3 text-sm text-white/70">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="transition-colors hover:text-blue-brand">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ProActive Physiotherapy and Sports Rehab. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {[
              { Icon: FaInstagram, href: "https://instagram.com/proactivephysio_cbe", label: "Instagram" },
              { Icon: FaFacebookF, href: "https://facebook.com/proactivephysio_cbe", label: "Facebook" },
              { Icon: FaLinkedinIn, href: "https://linkedin.com/company/proactivephysio_cbe", label: "LinkedIn" },
              { Icon: FaYoutube, href: "#", label: "YouTube" },
              { Icon: FaWhatsapp, href: "https://wa.me/919578678917", label: "WhatsApp" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-blue-brand hover:text-blue-brand"
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
