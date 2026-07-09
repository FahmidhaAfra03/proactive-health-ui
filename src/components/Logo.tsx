import { Link } from "@tanstack/react-router";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const color = variant === "light" ? "text-white" : "text-ink";
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${color}`} aria-label="Proactive home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-ink text-gold shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] transition-transform duration-500 group-hover:rotate-6">
        <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" aria-hidden>
          <path
            d="M6 22c2-2 4-3 6-3 3 0 4 3 7 3s5-3 7-3"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M6 15c2-2 4-3 6-3 3 0 4 3 7 3s5-3 7-3"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"
          />
          <circle cx="24" cy="9" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight">
          PROACTIVE
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
          Physio &amp; Rehab
        </span>
      </span>
    </Link>
  );
}
