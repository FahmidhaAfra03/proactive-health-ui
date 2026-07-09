export type Testimonial = {
  id: string;
  name: string;
  role: string;
  rating: number;
  initials: string;
  review: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ishaan Verma",
    role: "Marathon Runner",
    rating: 5,
    initials: "IV",
    review:
      "After my IT band flared six weeks before race day, Proactive built a plan that got me across the finish line with a personal best. The attention to detail was unmatched.",
  },
  {
    id: "t2",
    name: "Kavya Reddy",
    role: "Post-ACL Patient",
    rating: 5,
    initials: "KR",
    review:
      "Nine months of structured rehab and I'm back on the football pitch — stronger than before surgery. The team celebrated every milestone with me.",
  },
  {
    id: "t3",
    name: "Rajiv Malhotra",
    role: "Chronic Back Pain",
    rating: 5,
    initials: "RM",
    review:
      "Ten years of pain, gone in four months. The blend of manual therapy, needling and coaching taught me how to look after my body for life.",
  },
  {
    id: "t4",
    name: "Sneha Kulkarni",
    role: "Post-Stroke Rehab",
    rating: 5,
    initials: "SK",
    review:
      "My mother regained her walking independence within six months. The neuro team's patience and expertise gave our family hope again.",
  },
  {
    id: "t5",
    name: "Aditya Rao",
    role: "Corporate Wellness",
    rating: 5,
    initials: "AR",
    review:
      "Proactive's ergonomic audit transformed our engineering team's productivity. Fewer sick days, happier people — a genuine ROI.",
  },
];
