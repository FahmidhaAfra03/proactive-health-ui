import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — ProActive Physiotherapy and Sports Rehab" },
      { name: "description", content: "Get in touch with ProActive Coimbatore by phone, email, WhatsApp or visit our clinical facility in Uppilipalayam." },
    ],
  }),
});
