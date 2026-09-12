export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialty: string;
  bio: string;
  initials: string;
  accent: string;
  education?: string[];
  expertise?: string[];
};

export const doctors: Doctor[] = [
  {
    id: "dr-b-selvakumar",
    name: "Dr. B. Selvakumar",
    qualification: "MPT (Sports)",
    experience: "3+ Years",
    specialty: "Sports Physiotherapy & Advanced Musculoskeletal Rehab",
    bio: "Dr. B. Selvakumar is a pioneering Sports Physiotherapist with over a decade of clinical experience guiding athletes and individuals back to peak performance. Holding a Master of Physiotherapy in Sports, he specializes in biomechanical dysfunction correction, manual therapy, and milestone-based rehabilitation protocols.",
    initials: "BS",
    accent: "from-blue-brand to-navy-deep",
    education: [
      "Master of Physiotherapy (MPT) in Sports - Specialization in Athletic Injury Rehab",
      "Bachelor of Physiotherapy (BPT)",
      "Certified Manual Therapist (CMT)",
      "Certified Dry Needling & IASTM Practitioner"
    ],
    expertise: [
      "Sports Injury Management & Return-to-Play Testing",
      "Post-Surgical Joint & Ligament Reconstruction Rehab",
      "Myofascial Trigger Point Therapy & Dry Needling",
      "Spine Rehabilitation & Spinal Joint Mobilization"
    ]
  }
];
