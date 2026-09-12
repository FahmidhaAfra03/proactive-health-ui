import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { getGallery, adminCreateGallery, adminDeleteGallery } from "@/lib/api";
import { HiPlus, HiTrash, HiX, HiUpload } from "react-icons/hi";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGallery,
});

function AdminGallery() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Facility");
  const [h, setH] = useState("medium");
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const { data: gallery = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
  });

  const uploadMutation = useMutation({
    mutationFn: adminCreateGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      closeModal();
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Failed to upload image.");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteGallery,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  });

  const closeModal = () => {
    setModalOpen(false);
    setTitle("");
    setTag("Facility");
    setH("medium");
    setFile(null);
    setErrorMsg("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setErrorMsg("Please select an image file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("tag", tag);
    formData.append("h", h);

    uploadMutation.mutate(formData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this gallery image?")) {
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
          <h2 className="font-display text-2xl font-bold tracking-tight">Gallery</h2>
          <p className="text-sm text-white/50">Upload and showcase clinic spaces, equipment, and zones.</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-gold btn-gold-hover text-xs py-2.5 px-5">
          <HiPlus className="h-4 w-4 mr-1 inline" /> Upload Image
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gallery.map((item: any) => (
          <div 
            key={item.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0A0A0A] shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
              {item.image_url ? (
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-gold/20 to-ink grid place-items-center font-mono text-[10px] text-white/40">
                  (Abstract / Gradient)
                </div>
              )}
            </div>
            
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-lg font-semibold uppercase tracking-wider">
                  {item.tag}
                </span>
                <h4 className="text-sm font-semibold mt-2 truncate">{item.title || "Untitled Space"}</h4>
                <p className="text-[10px] text-white/40 mt-0.5">Layout Spanning: {item.h || "medium"}</p>
              </div>

              <div className="flex items-center justify-end border-t border-white/5 pt-3 mt-4">
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="grid h-8 w-8 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <HiTrash className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* UPLOAD MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-display text-lg font-bold">Upload Gallery Image</h3>
              <button onClick={closeModal} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-400">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* File Drop Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border border-dashed border-white/10 hover:border-gold/30 rounded-xl bg-white/5 p-8 text-center cursor-pointer transition"
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {file ? (
                  <div className="text-xs font-semibold text-gold">
                    Selected: {file.name}
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <HiUpload className="h-8 w-8 text-white/30 group-hover:text-gold transition-colors mb-2" />
                    <span className="text-xs font-medium">Click to select an image</span>
                    <span className="text-[10px] text-white/30 mt-1">Supports JPG, PNG, WEBP up to 5MB</span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs text-white/40">Image Title / Caption</label>
                <input 
                  type="text" 
                  className="form-control mt-1.5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Hydrotherapy Suite"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Category Tag</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required
                    placeholder="e.g. Facility, Treatment"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Grid Layout Span</label>
                  <select 
                    className="form-control mt-1.5"
                    value={h}
                    onChange={(e) => setH(e.target.value)}
                  >
                    <option value="medium">Standard (Square)</option>
                    <option value="tall">Tall (Vertical Spanning)</option>
                    <option value="short">Short (Horizontal Spanning)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={closeModal} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={uploadMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  {uploadMutation.isPending ? "Uploading..." : "Save Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
