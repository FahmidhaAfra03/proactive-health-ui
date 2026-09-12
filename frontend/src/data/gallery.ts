import logoImg from "@/assets/logo.webp";
import heroImg from "@/assets/hero_v3.webp";
import studioImg1 from "@/assets/physio_studio_1.webp";
import therapyImg2 from "@/assets/physio_therapy_2.webp";
import studioImg3 from "@/assets/movement_studio_3.webp";

export const gallery = [
  {
    id: "g1",
    title: "Advanced Physiotherapy Treatment Bay",
    tag: "Treatment Suite",
    image_url: studioImg1,
    h: "medium"
  },
  {
    id: "g2",
    title: "Electrotherapy & Pain Management Suite",
    tag: "Clinical Modality",
    image_url: therapyImg2,
    h: "short"
  },
  {
    id: "g3",
    title: "Strength & Conditioning Lab",
    tag: "Movement Studio",
    image_url: studioImg3,
    h: "tall"
  },
  {
    id: "g4",
    title: "Rehabilitation & Movement Studio",
    tag: "Facility",
    image_url: heroImg,
    h: "medium"
  },
  {
    id: "g5",
    title: "ProActive Official Signage & Clinic Front",
    tag: "Branding",
    image_url: logoImg,
    h: "short"
  }
];

export type GalleryItem = (typeof gallery)[number];
