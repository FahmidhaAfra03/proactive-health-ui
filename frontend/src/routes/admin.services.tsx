import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  getServices, 
  adminCreateService, 
  adminUpdateService, 
  adminDeleteService 
} from "@/lib/api";
import { HiPlus, HiPencilAlt, HiTrash, HiX } from "react-icons/hi";

export const Route = createFileRoute("/admin/services")({
  component: AdminServices,
});

function AdminServices() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    icon: "FaRunning",
    description: "",
    content: "",
    order_index: 0,
  });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const createMutation = useMutation({
    mutationFn: adminCreateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      closeModal();
    }
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      closeModal();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    }
  });

  const openCreate = () => {
    setEditItem(null);
    setFormData({
      slug: "",
      name: "",
      icon: "FaRunning",
      description: "",
      content: "",
      order_index: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEdit = (srv: any) => {
    setEditItem(srv);
    setFormData({
      slug: srv.slug,
      name: srv.name,
      icon: srv.icon || "FaRunning",
      description: srv.description || "",
      content: srv.content || "",
      order_index: srv.order_index || 0,
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

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this service program?")) {
      deleteMutation.mutate(slug);
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
          <h2 className="font-display text-2xl font-bold tracking-tight">Services</h2>
          <p className="text-sm text-white/50">Manage dynamic physiotherapy and rehabilitation programs.</p>
        </div>
        <button onClick={openCreate} className="btn-gold btn-gold-hover text-xs py-2.5 px-5">
          <HiPlus className="h-4 w-4 mr-1 inline" /> Create Program
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((srv: any) => (
          <div 
            key={srv.slug}
            className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-gold uppercase font-bold tracking-widest">{srv.icon}</span>
                <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg text-white/40">
                  Order: {srv.order_index}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-white mt-4 group-hover:text-gold transition-colors">{srv.name}</h3>
              <p className="text-xs text-white/50 mt-2 line-clamp-3 leading-relaxed">{srv.description}</p>
            </div>
            
            <div className="flex items-center justify-end gap-2 border-t border-white/5 pt-4 mt-6">
              <button 
                onClick={() => openEdit(srv)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
              >
                <HiPencilAlt className="h-4 w-4" />
              </button>
              <button 
                onClick={() => handleDelete(srv.slug)}
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
              <h3 className="font-display text-lg font-bold">{editItem ? "Edit Service details" : "Create New Service"}</h3>
              <button onClick={closeModal} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Url Slug</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    required
                    readOnly={!!editItem}
                    placeholder="e.g. sports-physiotherapy"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Program Name</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="e.g. Sports Physiotherapy"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">FontAwesome Icon</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    required
                    placeholder="e.g. FaRunning"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Display Sort Order</label>
                  <input 
                    type="number" 
                    className="form-control mt-1.5"
                    value={formData.order_index}
                    onChange={(e) => setFormData({ ...formData, order_index: intval(e.target.value) })}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Short Description</label>
                <input 
                  type="text" 
                  className="form-control mt-1.5"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Performance-driven recovery for athletes..."
                />
              </div>

              <div>
                <label className="text-xs text-white/40">Full Content / Details</label>
                <textarea 
                  className="form-control mt-1.5"
                  rows={5}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write the full pathway program details..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={closeModal} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function intval(val: any) {
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? 0 : parsed;
}
