import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — ProActive Clinic Tour" },
      { name: "description", content: "A visual tour of our advanced treatment bays, electrotherapy suite, and movement conditioning lab in Coimbatore." },
    ],
  }),
});
