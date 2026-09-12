import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/doctors")({
  head: () => ({
    meta: [
      { title: "Dr. B. Selvakumar (MPT Sports) - Chief Physiotherapist | ProActive" },
      { name: "description", content: "Learn more about Dr. B. Selvakumar, specializing in Sports Physiotherapy, Manual Therapy, and Advanced Musculoskeletal Rehabilitation in Coimbatore." },
    ],
  }),
});
