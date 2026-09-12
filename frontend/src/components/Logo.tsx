import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.webp";

export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const isLight = variant === "light";
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label="ProActive home">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-blue-brand/5 p-1 transition-transform duration-500 group-hover:rotate-6">
        <img
          src={logoImg}
          alt="ProActive Logo Icon"
          className="h-8 w-8 object-contain rounded-md"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-xl font-bold tracking-tight transition-colors duration-200 ${
          isLight ? "text-white" : "text-ink"
        }`}>
          ProActive
        </span>
        <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] text-blue-brand">
          Physiotherapy &amp; Sports Rehab
        </span>
      </span>
    </Link>
  );
}

