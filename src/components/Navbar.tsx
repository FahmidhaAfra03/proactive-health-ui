import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/treatments", label: "Treatments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const solid = scrolled || !onHome || open;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-white/85 backdrop-blur-xl shadow-[0_6px_30px_-20px_rgba(17,17,17,0.35)] border-b border-black/5"
              : "bg-transparent"
      }`}
    >
      <div className="container-lux flex h-18 items-center justify-between py-3">
        <Logo variant={solid ? "dark" : (onHome ? "light" : "dark")} />

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                solid ? "text-ink/75 hover:text-ink" : "text-white/85 hover:text-white"
              }`}
              activeProps={{
                className: `relative rounded-full px-3.5 py-2 text-sm font-semibold ${solid ? "text-ink" : "text-white"}`,
              }}
            >
              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/book-appointment" className="btn-gold btn-gold-hover hidden sm:inline-flex text-sm">
            Book Appointment
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`grid h-11 w-11 place-items-center rounded-full border transition xl:hidden ${
              solid ? "border-ink/10 text-ink hover:bg-ink/5" : "border-white/25 text-white hover:bg-white/10"
            }`}
          >
            {open ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white xl:hidden"
          >
            <div className="container-lux flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-xl px-4 py-3 text-base font-medium text-ink/80 hover:bg-muted"
                  activeProps={{ className: "rounded-xl px-4 py-3 text-base font-semibold text-ink bg-muted" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/book-appointment" className="btn-gold btn-gold-hover mt-3 w-full">
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
