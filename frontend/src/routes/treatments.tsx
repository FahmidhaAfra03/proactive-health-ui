import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Our Rehabilitation Process" },
      { name: "description", content: "Discover our five-phase, evidence-based rehabilitation process — from assessment to full return to life." },
    ],
  }),
});
