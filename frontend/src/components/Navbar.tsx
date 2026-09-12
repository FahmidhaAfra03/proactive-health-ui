import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/doctors", label: "Doctors" },
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
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md border-b border-blue-brand/10 shadow-[0_10px_30px_rgba(15,23,42,0.3)]"
          : onHome
            ? "bg-transparent border-b border-white/5"
            : "bg-[#0C1524] border-b border-blue-brand/10 shadow-lg"
      }`}
    >
      <div className="container-lux flex h-18 items-center justify-between py-3">
        <Logo variant="light" />

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors text-white/80 hover:text-white"
              activeProps={{
                className: "relative rounded-full px-3.5 py-2 text-sm font-bold text-white",
              }}
            >

              {({ isActive }) => (
                <>
                  <span>{l.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-blue-brand"
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
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white hover:bg-white/10 xl:hidden"
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
            className="overflow-hidden bg-[#0C1524] border-t border-white/5 xl:hidden"
          >
            <div className="container-lux flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="rounded-xl px-4 py-3 text-base font-medium text-white/80 hover:bg-white/5 transition-colors"
                  activeProps={{ className: "rounded-xl px-4 py-3 text-base font-bold text-white bg-white/10" }}
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
