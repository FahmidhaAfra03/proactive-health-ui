import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — ProActive Physiotherapy and Sports Rehab" },
      { name: "description", content: "Explore our eight clinical physiotherapy and rehabilitation programs — from sports injury rehab and pain management to orthopedic and post-surgical recovery." },
    ],
  }),
});
