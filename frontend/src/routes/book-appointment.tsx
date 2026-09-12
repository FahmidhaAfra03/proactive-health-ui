import { createFileRoute } from "@tanstack/react-router";

type AppointmentSearch = {
  service?: string;
};

export const Route = createFileRoute("/book-appointment")({
  validateSearch: (search: Record<string, unknown>): AppointmentSearch => {
    return {
      service: typeof search.service === "string" ? search.service : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Book Appointment — ProActive Physiotherapy and Sports Rehab" },
      { name: "description", content: "Schedule your clinical assessment with Dr. B. Selvakumar (MPT Sports) at ProActive Coimbatore." },
    ],
  }),
});
