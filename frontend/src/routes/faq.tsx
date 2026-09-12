import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — ProActive" },
      { name: "description", content: "Answers to the most common questions about our physiotherapy services." },
    ],
  }),
});
