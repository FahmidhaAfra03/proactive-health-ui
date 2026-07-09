import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HiCheckCircle } from "react-icons/hi";
import { motion } from "motion/react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/services";
import { doctors } from "@/data/doctors";

export const Route = createFileRoute("/book-appointment")({
  head: () => ({
    meta: [
      { title: "Book Appointment — Proactive" },
      { name: "description", content: "Book your 60-minute assessment with a senior physiotherapist at Proactive." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [done, setDone] = useState(false);
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Book Appointment"
        title="Reserve your assessment."
        description="Choose your therapist, date and time. Confirmation lands in your inbox within minutes."
      />
      <section className="py-20">
        <div className="container-lux grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
              className="rounded-3xl border border-black/5 bg-white p-8 shadow-luxe sm:p-10"
            >
              {done ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <HiCheckCircle className="mx-auto h-16 w-16 text-gold" />
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">Request received</h3>
                  <p className="mt-2 text-muted-foreground">Our care team will confirm your appointment within 30 minutes.</p>
                </motion.div>
              ) : (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-deep">Patient details</p>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Jane Doe" required />
                    <Field label="Phone" name="phone" placeholder="+91 99999 00000" required />
                    <Field label="Email" name="email" type="email" placeholder="jane@example.com" required />
                    <Field label="Age" name="age" type="number" placeholder="32" />
                    <SelectField label="Service" name="service" options={services.map((s) => s.title)} />
                    <SelectField label="Preferred therapist" name="therapist" options={["No preference", ...doctors.map((d) => d.name)]} />
                    <Field label="Preferred date" name="date" type="date" />
                    <SelectField label="Preferred time" name="time" options={["Morning", "Afternoon", "Evening"]} />
                  </div>
                  <div className="mt-5">
                    <label className="text-sm font-medium text-ink">Tell us about your condition</label>
                    <textarea
                      rows={4}
                      placeholder="A brief description helps us match you with the right therapist."
                      className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  </div>
                  <button type="submit" className="btn-gold btn-gold-hover mt-8 w-full sm:w-auto">
                    Request Appointment
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    By submitting, you agree to our Terms &amp; Privacy Policy. No payment required to book.
                  </p>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="sticky top-28 h-fit space-y-4">
              <div className="rounded-3xl bg-ink p-8 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">What's included</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {[
                    "60-minute deep-dive assessment",
                    "Written diagnosis &amp; treatment plan",
                    "Movement screen &amp; biomechanical tests",
                    "Insurance-friendly documentation",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                      <span className="text-white/85" dangerouslySetInnerHTML={{ __html: b }} />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">Prefer to call?</p>
                  <a href="tel:+919999900000" className="mt-2 block font-display text-2xl font-semibold text-white hover:text-gold">
                    +91 99999 00000
                  </a>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink">{label}</label>
      <select
        name={name}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
