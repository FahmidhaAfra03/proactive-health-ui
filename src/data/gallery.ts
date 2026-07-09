export const gallery = [
  { id: "g1", title: "Rehabilitation Studio", tag: "Facility", h: "tall" },
  { id: "g2", title: "Manual Therapy Suite", tag: "Treatment", h: "short" },
  { id: "g3", title: "Sports Recovery Bay", tag: "Facility", h: "medium" },
  { id: "g4", title: "Assessment Room", tag: "Facility", h: "short" },
  { id: "g5", title: "Neuro Rehab Gym", tag: "Facility", h: "tall" },
  { id: "g6", title: "Hydrotherapy Zone", tag: "Treatment", h: "medium" },
  { id: "g7", title: "Consultation Lounge", tag: "Facility", h: "short" },
  { id: "g8", title: "Movement Lab", tag: "Facility", h: "tall" },
  { id: "g9", title: "Recovery Suite", tag: "Treatment", h: "medium" },
] as const;

export type GalleryItem = (typeof gallery)[number];
