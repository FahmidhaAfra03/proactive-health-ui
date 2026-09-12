import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  getTestimonials, 
  adminCreateTestimonial, 
  adminUpdateTestimonial, 
  adminDeleteTestimonial 
} from "@/lib/api";
import { HiPlus, HiPencilAlt, HiTrash, HiX, HiStar } from "react-icons/hi";

export const Route = createFileRoute("/admin/testimonials")({
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    role: "",
    quote: "",
    rating: 5
  });

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const createMutation = useMutation({
    mutationFn: adminCreateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteTestimonial,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });

  const openCreate = () => {
    setEditItem(null);
    setFormData({
      id: 0,
      name: "",
      role: "",
      quote: "",
      rating: 5
    });
    setModalOpen(true);
  };

  const openEdit = (test: any) => {
    setEditItem(test);
    setFormData({
      id: test.id,
      name: test.name,
      role: test.role || "",
      quote: test.quote || test.review || "",
      rating: test.rating || 5
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

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this client review?")) {
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
          <h2 className="font-display text-2xl font-bold tracking-tight">Testimonials</h2>
          <p className="text-sm text-white/50">Manage patient recovery logs, recommendations, and ratings.</p>
        </div>
        <button onClick={openCreate} className="btn-gold btn-gold-hover text-xs py-2.5 px-5">
          <HiPlus className="h-4 w-4 mr-1 inline" /> Add Review
        </button>
      </div>

      {/* Testimonials grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((test: any) => (
          <div 
            key={test.id}
            className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center gap-1.5 text-gold">
                {Array.from({ length: test.rating || 5 }).map((_, i) => (
                  <HiStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="text-xs text-white/60 italic leading-relaxed mt-4">
                "{test.quote || test.review}"
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
              <div>
                <h4 className="text-sm font-semibold">{test.name}</h4>
                <p className="text-[10px] text-white/40 mt-0.5">{test.role}</p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openEdit(test)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <HiPencilAlt className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(test.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE/EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-display text-lg font-bold">{editItem ? "Edit Testimonial Details" : "Add New Testimonial"}</h3>
              <button onClick={closeModal} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Patient Name</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Emily Watson"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Patient Role / Case (e.g. Marathon Runner)</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Elite Athlete"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Star Rating</label>
                <select 
                  className="form-control mt-1.5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40">Review Quote</label>
                <textarea 
                  className="form-control mt-1.5"
                  rows={4}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  required
                  placeholder="The rehabilitation program was life-changing..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={closeModal} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
