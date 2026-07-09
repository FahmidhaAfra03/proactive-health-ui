export function SectionHeading({
  eyebrow, title, description, align = "center", light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full border ${light ? "border-white/20 text-white/80" : "border-ink/10 text-ink-soft"} bg-transparent px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          {eyebrow}
        </div>
      )}
      <h2 className={`mt-5 text-3xl font-semibold leading-[1.08] text-balance sm:text-4xl md:text-5xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-base leading-relaxed text-balance sm:text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
