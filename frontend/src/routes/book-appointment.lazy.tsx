import { useState, useEffect } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HiCheckCircle } from "react-icons/hi";
import { motion } from "motion/react";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { getServices, getDoctors, createAppointment } from "@/lib/api";

export const Route = createLazyFileRoute("/book-appointment")({
  component: BookPage,
});

function BookPage() {
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const search = Route.useSearch();

  const { data: servicesData = [] } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const { data: doctorsData = [] } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: search.service || "",
    therapist: "No preference",
    date: "",
    time: "Morning",
    notes: "",
  });

  const mutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      setDone(true);
      setErrorMsg("");
    },
    onError: (error: any) => {
      setErrorMsg(error.message || "Failed to submit request. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (!formData.service || formData.service === "Select Clinical Program") {
      setErrorMsg("Please select a Clinical Program.");
      return;
    }

    const selectedService = servicesData.find(s => s.title === formData.service || s.name === formData.service);
    const serviceSlug = selectedService ? selectedService.slug : formData.service;
    
    const selectedDoctor = doctorsData.find(d => d.name === formData.therapist);
    const doctorId = selectedDoctor ? selectedDoctor.id : formData.therapist;

    mutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      service: serviceSlug,
      doctor: doctorId,
      notes: formData.notes,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (search.service) {
      setFormData((prev) => ({ ...prev, service: search.service }));
    }
  }, [search.service]);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Schedule Visit"
        title={
          <>
            Reserve your{" "}
            <span className="gold-gradient-text font-serif italic font-normal">
              assessment
            </span>
            .
          </>
        }
        description="Choose your clinical service, preferred date and time. Confirmation details will be sent shortly."
        bgKey="book-appointment"
      />
      <section className="py-20 bg-[#FAFBFD]">
        <div className="container-lux grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-blue-brand/5 bg-white p-8 shadow-luxe sm:p-10"
            >
              {done ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <HiCheckCircle className="mx-auto h-16 w-16 text-blue-brand" />
                  <h3 className="mt-4 font-display text-2xl font-bold text-ink">Request Received</h3>
                  <p className="mt-2 text-muted-foreground font-semibold">Our clinical care desk will confirm your appointment within 30 minutes.</p>
                </motion.div>
              ) : (
                <>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">Patient details</p>
                  
                  {errorMsg && (
                    <div className="mt-4 p-4 rounded-xl bg-red-50/15 border border-red-500/20 text-red-600 text-sm font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field 
                      label="Full Name *" 
                      name="name" 
                      placeholder="Jane Doe" 
                      required 
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <Field 
                      label="Phone Number *" 
                      name="phone" 
                      placeholder="+91 95786 78917" 
                      required 
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <Field 
                      label="Email Address *" 
                      name="email" 
                      type="email" 
                      placeholder="jane@example.com" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <SelectField 
                      label="Clinical Program" 
                      name="service" 
                      options={["Select Clinical Program", ...servicesData.map((s) => s.name || s.title)]} 
                      value={formData.service}
                      onChange={handleInputChange}
                    />

                    <Field 
                      label="Preferred Date *" 
                      name="date" 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                    />
                    <SelectField 
                      label="Preferred Time" 
                      name="time" 
                      options={["Morning", "Afternoon", "Evening"]} 
                      value={formData.time}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-5">
                    <label className="text-sm font-semibold text-ink">Describe Your Symptoms / Condition</label>
                    <textarea
                      name="notes"
                      rows={4}
                      placeholder="A brief description helps Dr. Selvakumar review your case beforehand."
                      className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="btn-blue btn-blue-hover mt-8 w-full sm:w-auto text-xs uppercase tracking-wider shadow-md"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Submitting..." : "Schedule Assessment"}
                  </button>
                  <p className="mt-4 text-xs text-muted-foreground">
                    By submitting, you agree to our Terms &amp; Privacy Policy. No payment is required online.
                  </p>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="sticky top-28 h-fit space-y-4">
              <div className="rounded-[2rem] bg-[#0C1524] p-8 text-white border border-white/5 shadow-2xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">What to expect</p>
                <ul className="mt-6 space-y-4 text-sm">
                  {[
                    "60-minute deep-dive clinical assessment",
                    "Diagnosis and milestone-based rehab timeline",
                    "Biomechanical movement screen & stability tests",
                    "Customized home exercise template",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-brand" />
                      <span className="text-white/80 font-medium" dangerouslySetInnerHTML={{ __html: b }} />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-blue-brand">Prefer to call?</p>
                  <a href="tel:9578678917" className="mt-2 block font-display text-2xl font-bold text-white hover:text-blue-brand transition-colors">
                    +91 95786 78917
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
      <label className="text-sm font-semibold text-ink">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
      />
    </div>
  );
}

function SelectField({ label, name, options, value, onChange }: { label: string; name: string; options: string[]; value: string; onChange: any }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
