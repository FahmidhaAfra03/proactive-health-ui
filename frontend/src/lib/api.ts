import { doctors as fallbackDoctors } from "@/data/doctors";
import { services as fallbackServices, type Service } from "@/data/services";
import { gallery as fallbackGallery } from "@/data/gallery";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import { faqs as fallbackFAQs } from "@/data/faqs";
import {
  FaHeartbeat,
  FaRunning,
  FaBone,
  FaBrain,
  FaHandsHelping,
  FaDumbbell,
  FaBolt,
  FaBriefcaseMedical,
} from "react-icons/fa";

const iconMap: Record<string, any> = {
  FaHeartbeat,
  FaRunning,
  FaBone,
  FaBrain,
  FaHandsHelping,
  FaDumbbell,
  FaBolt,
  FaBriefcaseMedical,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/backend/api';

// Helper to handle API requests
async function apiFetch<T>(endpoint: string, fallbackData: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`, { credentials: "include" });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return json.data as T;
    }
    return fallbackData;
  } catch (err) {
    console.warn(`Failed to fetch from ${endpoint}, using fallback data.`, err);
    return fallbackData;
  }
}

// PUBLIC ENDPOINTS
export async function getSettings() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, { credentials: "include" });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) return json.data;
    }
  } catch (err) {
    console.warn("Failed to fetch settings, using defaults.", err);
  }
  return {};
}

function mapApiService(s: any): Service {
  const fallback = fallbackServices.find((fs) => fs.slug === s.slug);
  
  let IconComponent = FaBriefcaseMedical;
  if (s.icon) {
    if (typeof s.icon === "string" && s.icon in iconMap) {
      IconComponent = iconMap[s.icon];
    } else if (typeof s.icon === "function") {
      IconComponent = s.icon;
    } else if (fallback) {
      IconComponent = fallback.icon;
    }
  }

  return {
    slug: s.slug || "",
    title: s.name || s.title || fallback?.title || "",
    short: s.description || s.short || fallback?.short || "",
    description: s.content || s.description || fallback?.description || "",
    icon: IconComponent,
    benefits: s.benefits || fallback?.benefits || [
      "Evidence-based clinical care",
      "One-on-one session milestone tracking",
      "Direct oversight by Dr. Selvakumar"
    ]
  };
}

function mapApiDoctor(d: any) {
  const fallback = fallbackDoctors.find((fd) => fd.id === d.id);
  return {
    ...d,
    experience: d.experience === "12+ Years" ? "3+ Years" : (d.experience || fallback?.experience),
    education: d.education || fallback?.education || [
      "Master of Physiotherapy (MPT) in Sports Medicine",
      "Bachelor of Physiotherapy (BPT)"
    ],
    expertise: d.expertise || fallback?.expertise || [
      "Sports Injury Rehabilitation",
      "Manual Therapy Joint Mobilization",
      "Advanced Dry Needling & Taping",
      "Post-Surgical Conditioning"
    ]
  };
}

export async function getServices() {
  const data = await apiFetch<any[]>("services", fallbackServices);
  return data.map(mapApiService);
}

export async function getDoctors() {
  const data = await apiFetch<any[]>("doctors", fallbackDoctors);
  return data.map(mapApiDoctor);
}

export async function getGallery() {
  return apiFetch("gallery", fallbackGallery);
}

export async function getTestimonials() {
  return apiFetch("testimonials", fallbackTestimonials);
}

export async function getFAQs() {
  return apiFetch("faq", fallbackFAQs);
}

export async function createAppointment(data: any) {
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to book appointment");
  return json;
}

export async function submitContactMessage(data: any) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to send contact message");
  return json;
}


// ADMIN AUTHENTICATION
export async function adminLogin(data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Invalid credentials");
  return json;
}

export async function adminCheck() {
  const res = await fetch(`${API_BASE_URL}/admin/check`, { credentials: "include" });
  if (!res.ok) return { authenticated: false };
  return await res.json();
}

export async function adminLogout() {
  const res = await fetch(`${API_BASE_URL}/admin/logout`, { 
    method: "POST",
    credentials: "include" 
  });
  return await res.json();
}

export async function updateAdminPassword(data: any) {
  const res = await fetch(`${API_BASE_URL}/admin/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Failed to update password");
  return json;
}


// ADMIN CRUD - APPOINTMENTS
export async function adminGetAppointments() {
  const res = await fetch(`${API_BASE_URL}/appointments`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch appointments");
  const json = await res.json();
  return json.data || [];
}

export async function adminUpdateAppointment(data: any) {
  const res = await fetch(`${API_BASE_URL}/appointments`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteAppointment(id: number) {
  const res = await fetch(`${API_BASE_URL}/appointments?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - SERVICES
export async function adminCreateService(data: any) {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminUpdateService(data: any) {
  const res = await fetch(`${API_BASE_URL}/services`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteService(slug: string) {
  const res = await fetch(`${API_BASE_URL}/services?slug=${slug}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - DOCTORS
export async function adminCreateDoctor(data: any) {
  const res = await fetch(`${API_BASE_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminUpdateDoctor(data: any) {
  const res = await fetch(`${API_BASE_URL}/doctors`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteDoctor(id: string) {
  const res = await fetch(`${API_BASE_URL}/doctors?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - TESTIMONIALS
export async function adminCreateTestimonial(data: any) {
  const res = await fetch(`${API_BASE_URL}/testimonials`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminUpdateTestimonial(data: any) {
  const res = await fetch(`${API_BASE_URL}/testimonials`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteTestimonial(id: number) {
  const res = await fetch(`${API_BASE_URL}/testimonials?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - FAQ
export async function adminCreateFAQ(data: any) {
  const res = await fetch(`${API_BASE_URL}/faq`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminUpdateFAQ(data: any) {
  const res = await fetch(`${API_BASE_URL}/faq`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteFAQ(id: number) {
  const res = await fetch(`${API_BASE_URL}/faq?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - GALLERY (Form-Data for file upload support)
export async function adminCreateGallery(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/gallery`, {
    method: "POST",
    body: formData,
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteGallery(id: number) {
  const res = await fetch(`${API_BASE_URL}/gallery?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - CONTACT MESSAGES / INBOX
export async function adminGetContactMessages() {
  const res = await fetch(`${API_BASE_URL}/contact`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch contact messages");
  const json = await res.json();
  return json.data || [];
}

export async function adminUpdateContactMessage(data: any) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminDeleteContactMessage(id: number) {
  const res = await fetch(`${API_BASE_URL}/contact?id=${id}`, {
    method: "DELETE",
    credentials: "include"
  });
  return await res.json();
}


// ADMIN CRUD - SETTINGS
export async function adminUpdateSettings(data: any) {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include"
  });
  return await res.json();
}

export async function adminUploadLogo(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: "PUT",
    body: formData,
    credentials: "include"
  });
  return await res.json();
}

export async function adminUploadHeroImage(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    method: "PUT",
    body: formData,
    credentials: "include"
  });
  return await res.json();
}
