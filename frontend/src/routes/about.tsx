import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ProActive — Our Story & Mission" },
      { name: "description", content: "Learn about ProActive's clinical philosophy, our sports specialization, and the standard of care we bring to every recovery." },
    ],
  }),
});
