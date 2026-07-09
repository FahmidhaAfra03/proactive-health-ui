import type { IconType } from "react-icons";
import {
  FaRunning, FaBone, FaBrain, FaHandsHelping, FaSyringe,
  FaSpa, FaHeartbeat, FaHome, FaShieldAlt, FaBriefcaseMedical,
} from "react-icons/fa";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: IconType;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "sports-physiotherapy",
    title: "Sports Physiotherapy",
    short: "Performance-driven recovery for athletes at every level.",
    description:
      "From weekend runners to elite athletes, our sports physiotherapy program combines biomechanical assessment, targeted strengthening and return-to-play protocols to get you back stronger than before.",
    icon: FaRunning,
    benefits: ["Injury screening", "Return-to-sport testing", "Load management", "Performance coaching"],
  },
  {
    slug: "orthopedic-rehabilitation",
    title: "Orthopedic Rehabilitation",
    short: "Restore joint mobility and strength after injury or surgery.",
    description:
      "Personalised rehab pathways for fractures, joint replacements, ligament reconstructions and chronic orthopedic conditions — guided by evidence and delivered with care.",
    icon: FaBone,
    benefits: ["Post-op protocols", "Joint mobilisation", "Progressive loading", "Movement retraining"],
  },
  {
    slug: "neurological-rehabilitation",
    title: "Neurological Rehabilitation",
    short: "Regain function and independence after neurological events.",
    description:
      "Specialist rehab for stroke, Parkinson's, spinal cord injury and other neurological conditions using task-specific training and neuroplasticity-based techniques.",
    icon: FaBrain,
    benefits: ["Gait retraining", "Balance therapy", "Neuro-facilitation", "Home integration"],
  },
  {
    slug: "manual-therapy",
    title: "Manual Therapy",
    short: "Hands-on techniques for pain relief and mobility.",
    description:
      "Expert joint mobilisation, soft tissue release and manipulation to unlock stiff joints, calm irritated tissues and restore fluid, pain-free motion.",
    icon: FaHandsHelping,
    benefits: ["Joint mobilisation", "Myofascial release", "Trigger point therapy", "Postural correction"],
  },
  {
    slug: "dry-needling",
    title: "Dry Needling",
    short: "Precision needling to release deep muscle tension.",
    description:
      "Fine, sterile needles are used to deactivate trigger points, reduce muscular pain and accelerate healing — an ideal complement to manual therapy and exercise.",
    icon: FaSyringe,
    benefits: ["Trigger point release", "Pain reduction", "Improved range", "Faster recovery"],
  },
  {
    slug: "sports-massage",
    title: "Sports Massage",
    short: "Deep, therapeutic massage for recovery and performance.",
    description:
      "Sport-specific soft tissue therapy that reduces DOMS, improves circulation and prepares the body for peak performance — before, between and after competition.",
    icon: FaSpa,
    benefits: ["Pre-event prep", "Post-event recovery", "Chronic tension relief", "Circulation boost"],
  },
  {
    slug: "post-surgery-rehabilitation",
    title: "Post-Surgery Rehabilitation",
    short: "Structured recovery from every stitch to full function.",
    description:
      "Milestone-driven rehab following orthopedic, spinal and joint replacement surgery — coordinated with your surgeon for the safest return to daily life.",
    icon: FaBriefcaseMedical,
    benefits: ["Scar management", "Range of motion", "Strength progression", "Functional return"],
  },
  {
    slug: "home-physiotherapy",
    title: "Home Physiotherapy",
    short: "Clinic-grade care delivered in the comfort of your home.",
    description:
      "For patients unable to travel, our senior therapists bring the full Proactive experience to you — with portable equipment and the same evidence-based protocols.",
    icon: FaHome,
    benefits: ["Bedside rehab", "Elderly care", "Post-discharge", "Family guidance"],
  },
  {
    slug: "pain-management",
    title: "Pain Management",
    short: "Long-term relief from chronic and complex pain.",
    description:
      "A multi-modal program blending manual therapy, exercise, education and modalities to break the pain cycle and restore quality of life.",
    icon: FaHeartbeat,
    benefits: ["Chronic back & neck", "Arthritis care", "Nerve pain", "Lifestyle coaching"],
  },
  {
    slug: "corporate-wellness",
    title: "Corporate Wellness",
    short: "Ergonomic and wellness programs for high-performing teams.",
    description:
      "On-site assessments, posture workshops and injury-prevention programs that lower absenteeism and keep your workforce healthy, focused and productive.",
    icon: FaShieldAlt,
    benefits: ["Ergonomic audit", "Posture workshops", "Injury prevention", "Onsite clinics"],
  },
];
