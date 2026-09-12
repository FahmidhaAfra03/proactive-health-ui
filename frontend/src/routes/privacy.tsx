import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ProActive" },
      { name: "description", content: "How ProActive collects, uses, and protects your personal and health information." },
    ],
  }),
});
