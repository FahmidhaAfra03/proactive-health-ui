import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  getFAQs, 
  adminCreateFAQ, 
  adminUpdateFAQ, 
  adminDeleteFAQ 
} from "@/lib/api";
import { HiPlus, HiPencilAlt, HiTrash, HiX } from "react-icons/hi";

export const Route = createFileRoute("/admin/faq")({
  component: AdminFAQ,
});

function AdminFAQ() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    id: 0,
    question: "",
    answer: "",
    category: "General",
    order_index: 0
  });

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFAQs,
  });

  const createMutation = useMutation({
    mutationFn: adminCreateFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteFAQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    }
  });

  const openCreate = () => {
    setEditItem(null);
    setFormData({
      id: 0,
      question: "",
      answer: "",
      category: "General",
      order_index: faqs.length + 1
    });
    setModalOpen(true);
  };

  const openEdit = (faq: any) => {
    setEditItem(faq);
    setFormData({
      id: faq.id,
      question: faq.question || faq.q || "",
      answer: faq.answer || faq.a || "",
      category: faq.category || "General",
      order_index: faq.order_index || 0
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
    if (confirm("Are you sure you want to delete this FAQ question?")) {
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
          <h2 className="font-display text-2xl font-bold tracking-tight">FAQ</h2>
          <p className="text-sm text-white/50">Manage answers to common questions about treatment, payments, and scheduling.</p>
        </div>
        <button onClick={openCreate} className="btn-gold btn-gold-hover text-xs py-2.5 px-5">
          <HiPlus className="h-4 w-4 mr-1 inline" /> Create FAQ
        </button>
      </div>

      {/* FAQ items layout */}
      <div className="space-y-4 max-w-4xl">
        {faqs.map((faq: any) => (
          <div 
            key={faq.id}
            className="group rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg text-white/40 uppercase font-bold tracking-wider">
                    {faq.category || "General"}
                  </span>
                  <span className="text-[9px] text-white/30 font-semibold">Order: {faq.order_index}</span>
                </div>
                <h4 className="text-sm font-semibold mt-3 text-white">{faq.question || faq.q}</h4>
                <p className="text-xs text-white/50 mt-2 leading-relaxed">{faq.answer || faq.a}</p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={() => openEdit(faq)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <HiPencilAlt className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDelete(faq.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE/EDIT FAQ MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-display text-lg font-bold">{editItem ? "Edit FAQ Details" : "Create New FAQ"}</h3>
              <button onClick={closeModal} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Category</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    placeholder="e.g. Booking, Treatment"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Sort Order index</label>
                  <input 
                    type="number" 
                    className="form-control mt-1.5"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value, 10) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Question text</label>
                <input 
                  type="text" 
                  className="form-control mt-1.5"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  placeholder="e.g. Do I need a doctor referral?"
                />
              </div>

              <div>
                <label className="text-xs text-white/40">Answer text</label>
                <textarea 
                  className="form-control mt-1.5"
                  rows={5}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  placeholder="Write the explanation response..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={closeModal} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
