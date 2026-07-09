export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  specialty: string;
  bio: string;
  initials: string;
  accent: string;
};

export const doctors: Doctor[] = [
  {
    id: "dr-arjun-mehta",
    name: "Dr. Arjun Mehta",
    qualification: "MPT (Sports), CMP",
    experience: "14 years",
    specialty: "Sports & Musculoskeletal",
    bio: "Former team physio for national-level athletes with a focus on ACL rehab, shoulder injuries and return-to-sport testing.",
    initials: "AM",
    accent: "from-[#D4AF37] to-[#8b6b1a]",
  },
  {
    id: "dr-priya-nair",
    name: "Dr. Priya Nair",
    qualification: "MPT (Neuro), NDT",
    experience: "11 years",
    specialty: "Neurological Rehab",
    bio: "Certified neuro-developmental therapist specialising in stroke recovery, Parkinson's and vestibular rehabilitation.",
    initials: "PN",
    accent: "from-[#E7C766] to-[#a8842b]",
  },
  {
    id: "dr-rohan-shah",
    name: "Dr. Rohan Shah",
    qualification: "DPT, OMT",
    experience: "9 years",
    specialty: "Manual Therapy & Spine",
    bio: "Orthopedic manual therapist focused on chronic back pain, disc rehab and precision dry needling.",
    initials: "RS",
    accent: "from-[#D4AF37] to-[#6b5015]",
  },
  {
    id: "dr-anaya-kapoor",
    name: "Dr. Anaya Kapoor",
    qualification: "MPT (Ortho), CMT",
    experience: "8 years",
    specialty: "Post-Surgical Rehab",
    bio: "Leads our post-op program for joint replacements, spinal surgeries and complex fracture recovery.",
    initials: "AK",
    accent: "from-[#F0D689] to-[#b08a24]",
  },
  {
    id: "dr-vikram-iyer",
    name: "Dr. Vikram Iyer",
    qualification: "MPT (Cardiopulm)",
    experience: "12 years",
    specialty: "Pain Management",
    bio: "Combines dry needling, IASTM and graded exercise for chronic pain and long-standing injuries.",
    initials: "VI",
    accent: "from-[#D4AF37] to-[#7a5a18]",
  },
  {
    id: "dr-meera-desai",
    name: "Dr. Meera Desai",
    qualification: "MPT (Pediatrics)",
    experience: "10 years",
    specialty: "Pediatric & Womens Health",
    bio: "Gentle, evidence-based care for pediatric development, pre- and post-natal recovery and pelvic health.",
    initials: "MD",
    accent: "from-[#E7C766] to-[#8b6b1a]",
  },
];
