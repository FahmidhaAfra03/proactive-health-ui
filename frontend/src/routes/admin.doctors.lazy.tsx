import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  getDoctors, 
  adminCreateDoctor, 
  adminUpdateDoctor, 
  adminDeleteDoctor 
} from "@/lib/api";
import { HiPlus, HiPencilAlt, HiTrash, HiX } from "react-icons/hi";

export const Route = createLazyFileRoute("/admin/doctors")({
  component: AdminDoctors,
});

function AdminDoctors() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    qualification: "",
    experience: "",
    specialty: "",
    bio: "",
    initials: "",
    accent: "from-[#D4AF37] to-[#8b6b1a]"
  });

  const { data: doctors = [], isLoading } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const createMutation = useMutation({
    mutationFn: adminCreateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteDoctor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    }
  });

  const openCreate = () => {
    setEditItem(null);
    setFormData({
      id: "",
      name: "",
      qualification: "",
      experience: "",
      specialty: "",
      bio: "",
      initials: "",
      accent: "from-[#D4AF37] to-[#8b6b1a]"
    });
    setModalOpen(true);
  };

  const openEdit = (doc: any) => {
    setEditItem(doc);
    setFormData({
      id: doc.id,
      name: doc.name,
      qualification: doc.qualification || "",
      experience: doc.experience || "",
      specialty: doc.specialty || "",
      bio: doc.bio || "",
      initials: doc.initials || "",
      accent: doc.accent || "from-[#D4AF37] to-[#8b6b1a]"
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Doctors</h2>
          <p className="text-sm text-white/50">Manage specialists, qualifications, and biography details.</p>
        </div>
        <button onClick={openCreate} className="btn-gold btn-gold-hover text-xs py-2.5 px-5">
          <HiPlus className="h-4 w-4 mr-1 inline" /> Add Doctor
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc: any) => (
          <div 
            key={doc.id}
            className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-4">
                <div className={`h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br ${doc.accent || 'from-gold to-[#8b6b1a]'} grid place-items-center text-xl font-bold text-ink shadow-lg`}>
                  {doc.initials || doc.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white group-hover:text-gold transition-colors">{doc.name}</h3>
                  <p className="text-xs text-white/40 mt-1">{doc.qualification}</p>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex text-xs justify-between">
                  <span className="text-white/40">Specialty</span>
                  <span className="font-semibold">{doc.specialty}</span>
                </div>
                <div className="flex text-xs justify-between">
                  <span className="text-white/40">Experience</span>
                  <span className="font-semibold">{doc.experience}</span>
                </div>
              </div>
              <p className="text-xs text-white/50 mt-4 leading-relaxed line-clamp-3">{doc.bio}</p>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-6">
              <button 
                onClick={() => openEdit(doc)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <HiPencilAlt className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(doc.id)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <HiTrash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE/EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-display text-lg font-bold">{editItem ? "Edit Doctor Details" : "Add New Doctor"}</h3>
              <button onClick={closeModal} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Doctor ID (slug, e.g. dr-john)</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    required
                    readOnly={!!editItem}
                    placeholder="dr-john-smith"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Dr. John Smith"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Qualifications (e.g. MPT, DPT)</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="MPT (Sports)"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Years of Experience</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="12 years"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Specialty</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    placeholder="Sports & Musculoskeletal"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Initials (max 3 chars)</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.initials}
                    onChange={(e) => setFormData({ ...formData, initials: e.target.value })}
                    max={3}
                    placeholder="JS"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Accent Color Class (Tailwind gradient)</label>
                <input 
                  type="text" 
                  className="form-control mt-1.5"
                  value={formData.accent}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  placeholder="from-[#D4AF37] to-[#8b6b1a]"
                />
              </div>

              <div>
                <label className="text-xs text-white/40">Specialist Biography</label>
                <textarea 
                  className="form-control mt-1.5"
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell patients about their expertise..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={closeModal} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  Save Specialist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
