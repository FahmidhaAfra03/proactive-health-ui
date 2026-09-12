import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — ProActive" },
      { name: "description", content: "The terms that govern your use of ProActive's website and clinical services." },
    ],
  }),
});
