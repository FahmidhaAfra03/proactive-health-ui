import type { IconType } from "react-icons";
import {
  FaRunning, FaBone, FaBrain, FaHandsHelping, FaDumbbell,
  FaBolt, FaHeartbeat, FaBriefcaseMedical
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
    slug: "pain-management",
    title: "Pain Management",
    short: "Rapid, evidence-based relief from acute and chronic pain.",
    description:
      "A clinical, multi-modal approach combining diagnostic assessment, joint decompression, electrotherapy, and soft-tissue mobilization to break the chronic pain cycle and restore fluid, pain-free movement.",
    icon: FaHeartbeat,
    benefits: [
      "Targeted relief for chronic back, neck, and joint pain",
      "Non-invasive swelling and inflammation control",
      "Restored active range of motion",
      "Personalized self-management and lifestyle coaching"
    ],
  },
  {
    slug: "sports-rehabilitation",
    title: "Sports Rehabilitation",
    short: "Performance-oriented recovery and biomechanical correction.",
    description:
      "Engineered for athletes of all levels. We combine high-performance strengthening, functional motion analysis, and milestone-based testing to ensure a safe, robust return to active competition.",
    icon: FaRunning,
    benefits: [
      "Customized injury screening & biomechanical reviews",
      "Functional return-to-sport testing protocols",
      "Athletic load management and conditioning plans",
      "Effective prevention strategies against re-injury"
    ],
  },
  {
    slug: "orthopedic-rehabilitation",
    title: "Orthopedic Rehabilitation",
    short: "Restore joint stability, bone density, and muscle balance.",
    description:
      "Comprehensive treatment for musculoskeletal conditions, including arthritis, disc pathologies, fractures, and severe sprains. Designed to rebuild bone alignment and joint mechanics.",
    icon: FaBone,
    benefits: [
      "Post-fracture stiffness and muscle atrophy correction",
      "Evidence-based osteoarthritis joint loading",
      "Spinal posture restoration and alignment programs",
      "Joint stability and ligament strength optimization"
    ],
  },
  {
    slug: "neurological-rehabilitation",
    title: "Neurological Rehabilitation",
    short: "Regain coordinate control, balance, and physical autonomy.",
    description:
      "Specialized neurological physiotherapy for stroke recovery, Parkinson's disease, balance disorders, and nerve injuries, leveraging neuroplasticity to restore motor control.",
    icon: FaBrain,
    benefits: [
      "Gait analysis and walking posture retraining",
      "Proprioception and core balance restoration",
      "Spasticity reduction and neuromuscular facilitation",
      "Functional autonomy in daily activities"
    ],
  },
  {
    slug: "manual-therapy",
    title: "Manual Therapy",
    short: "Hands-on clinical joint mobilization and manipulation.",
    description:
      "Highly specific joint mobilization, myofascial release, and passive stretching performed by senior clinical hands to release structural locks and calm hyperactive tissues.",
    icon: FaHandsHelping,
    benefits: [
      "Immediate joint decompression and pain modulation",
      "Targeted myofascial trigger-point release",
      "Improved fluid dynamics and tissue nutrition",
      "Quick recovery of joint play and extension"
    ],
  },
  {
    slug: "exercise-therapy",
    title: "Exercise Therapy",
    short: "Prescriptive corrective exercise for structural longevity.",
    description:
      "Individually tailored therapeutic exercise regimens focused on correcting muscle imbalances, strengthening stabilizers, and establishing long-term functional posture.",
    icon: FaDumbbell,
    benefits: [
      "Targeted strengthening of deep structural stabilizers",
      "Precision flexibility and core activation exercises",
      "Posture correction and joint load redistribution",
      "Long-term wellness and injury prevention templates"
    ],
  },
  {
    slug: "electrotherapy",
    title: "Electrotherapy",
    short: "Advanced clinical modalities for accelerated healing.",
    description:
      "State-of-the-art non-invasive modalities including Interferential Therapy (IFT), TENS, therapeutic ultrasound, and muscle stimulation to manage severe pain and accelerate cellular repair.",
    icon: FaBolt,
    benefits: [
      "Deep tissue healing and accelerated microcirculation",
      "Immediate local pain relief and nerve stimulation",
      "Reduction of localized swelling and post-injury edema",
      "Active muscle stimulation to prevent disuse atrophy"
    ],
  },
  {
    slug: "post-surgical-rehabilitation",
    title: "Post Surgical Rehabilitation",
    short: "Milestone-driven recovery from surgery to full function.",
    description:
      "Structured rehabilitation following orthopedic and spinal surgeries (ACL reconstruction, total knee/hip replacement, spinal fusion, arthroscopy) in close coordination with your surgeon.",
    icon: FaBriefcaseMedical,
    benefits: [
      "Safe, progressive loading matching bone/soft tissue healing",
      "Post-operative scar tissue and swelling management",
      "Preemptive prevention of joint contractures and stiffness",
      "Restoration of natural gait mechanics and functional independence"
    ],
  }
];
