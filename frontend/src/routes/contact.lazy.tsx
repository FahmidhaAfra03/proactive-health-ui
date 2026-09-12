import React, { useState, Suspense } from "react";
const MapComponent = React.lazy(() => import("@/components/MapComponent"));
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { HiLocationMarker, HiPhone, HiMail, HiClock, HiCheckCircle } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/SiteLayout";
import { Reveal } from "@/components/Reveal";
import { submitContactMessage } from "@/lib/api";

export const Route = createLazyFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      setDone(true);
      setErrorMsg("");
      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    },
    onError: (error: any) => {
      setErrorMsg(error.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    mutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Get in Touch"
        title={
          <>
            Let's talk about your{" "}
            <span className="blue-gradient-text font-serif italic font-normal">
              recovery
            </span>
            .
          </>
        }
        description="Reach out to book an assessment. Our clinic is led by Dr. B. Selvakumar (MPT Sports) in Uppilipalayam, Coimbatore."
        bgKey="contact"
      />

      <section className="py-20 bg-[#FAFBFD]">
        <div className="container-lux grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          
          {/* Contact Form */}
          <Reveal>
            <form 
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-blue-brand/5 bg-white p-8 shadow-luxe sm:p-10"
            >
              <h2 className="font-display text-2xl font-bold text-ink mb-6">Send us a message</h2>
              
              {done ? (
                <div className="py-8 text-center">
                  <HiCheckCircle className="mx-auto h-14 w-14 text-blue-brand" />
                  <h3 className="mt-4 font-display text-xl font-bold text-ink">Message Sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Thank you. Dr. Selvakumar's patient care desk will reach out to you shortly.</p>
                  <button 
                    type="button" 
                    onClick={() => setDone(false)} 
                    className="btn-blue btn-blue-hover mt-6 text-xs uppercase tracking-wider py-2.5 px-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  {errorMsg && (
                    <div className="mb-4 p-4 rounded-xl bg-red-50/15 border border-red-500/20 text-red-600 text-sm font-semibold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold text-ink">Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-ink">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                          className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                          placeholder="jane@example.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-ink">Phone Number</label>
                        <input 
                          type="text" 
                          name="phone" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                          placeholder="+91 95786 78917"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-ink">Subject</label>
                      <select 
                        name="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Appointment Booking">Appointment Booking</option>
                        <option value="Sports Rehab Assessment">Sports Rehab Assessment</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-ink">Message *</label>
                      <textarea 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required 
                        rows={5}
                        className="mt-2 w-full rounded-2xl border border-input bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-brand focus:ring-2 focus:ring-blue-brand/20"
                        placeholder="How can we help you today?"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="btn-blue btn-blue-hover mt-8 w-full sm:w-auto text-xs uppercase tracking-wider shadow-md"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </button>
                </>
              )}
            </form>
          </Reveal>

          {/* Contact Details Column */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] border border-blue-brand/5 bg-white p-8 shadow-luxe">
                <h3 className="font-display text-xl font-bold text-ink mb-6">Contact Channels</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-brand/5 border border-blue-brand/10 text-blue-brand shadow-sm">
                      <HiPhone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Call Us</p>
                      <a href="tel:9578678917" className="text-sm font-bold text-ink hover:text-blue-brand transition-colors">+91 95786 78917</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-brand/5 border border-blue-brand/10 text-blue-brand shadow-sm">
                      <HiMail className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</p>
                      <a href="mailto:proactiveselvakumar@gmail.com" className="text-sm font-bold text-ink hover:text-blue-brand transition-colors">proactiveselvakumar@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-brand/5 border border-blue-brand/10 text-blue-brand shadow-sm">
                      <FaWhatsapp className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                      <a href="https://wa.me/919578678917" target="_blank" rel="noreferrer" className="text-sm font-bold text-ink hover:text-blue-brand transition-colors">+91 95786 78917</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-brand/5 border border-blue-brand/10 text-blue-brand shadow-sm">
                      <HiClock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Working Hours</p>
                      <p className="text-sm font-semibold text-ink">Mon – Sat, 8:00 AM – 8:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Google Map Box */}
            <Reveal delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-blue-brand/5 bg-[#0C1524] shadow-luxe p-6 text-center text-white flex flex-col justify-end">
                <Suspense fallback={null}>
                  <MapComponent />
                </Suspense>
                <div className="relative z-10 flex flex-col justify-center h-full items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-brand text-white mb-3 shadow-md shadow-blue-brand/20">
                    <HiLocationMarker className="h-6 w-6" />
                  </span>
                  <h4 className="font-display text-lg font-bold text-white tracking-wide">Coimbatore Clinic</h4>
                  <p className="text-xs text-white/70 mt-1 max-w-xs leading-relaxed font-semibold">
                    Door No. 1 &amp; 2, 1st Street,<br />
                    Kasthuribai Gandhi Nagar, Uppilipalayam,<br />
                    Coimbatore, Tamil Nadu – 641015
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Door+No.+1+%26+2,+1st+Street,+Kasthuribai+Gandhi+Nagar,+Uppilipalayam,+Coimbatore" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-blue btn-blue-hover text-[10px] uppercase tracking-wider py-2 px-4 mt-4 shadow-md"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>
    </SiteLayout>
  );
}
