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
    name: "Sanjay Arumugam",
    role: "Patient",
    rating: 5,
    initials: "SA",
    review:
      "The physiotherapist was patient and attentive to my concerns. I had a great experience with the physiotherapy sessions. The treatment plan was effective, and I noticed steady improvement in my mobility and strength. Thank you for the excellent care.",
  },
  {
    id: "t2",
    name: "Ranji Rahul",
    role: "Patient",
    rating: 5,
    initials: "RR",
    review:
      "It's a complete magic... I never thought I could recover from frozen shoulder. Been to two orthos and two physios in the past. But nothing worked out..",
  },
  {
    id: "t3",
    name: "Udhaya S",
    role: "Patient",
    rating: 5,
    initials: "US",
    review:
      "I came here for stroke rehabilitation, and I'm really grateful for the care I received. Dr. Selvakumar was kind, patient, and always motivated me during my recovery. I can see a big improvement in my strength and movement. Thank you 😊.",
  },
  {
    id: "t4",
    name: "Dharick Dharick",
    role: "Patient",
    rating: 5,
    initials: "DD",
    review:
      "The clinic is well-maintained, and the staff are friendly and supportive. Thanks to their expertise and personalized treatment, I experienced significant improvement in my pain and mobility. I would highly recommend this center.",
  },
  {
    id: "t5",
    name: "Wilson",
    role: "Patient",
    rating: 5,
    initials: "W",
    review:
      "Excellent place for physiotherapy and rehabilitation. The therapists focus on long-term recovery rather than just temporary pain relief.",
  },
];
