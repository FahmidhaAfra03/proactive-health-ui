import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { getSettings, adminUpdateSettings, adminUploadLogo, adminUploadHeroImage } from "@/lib/api";
import { HiCog, HiPhone, HiGlobeAlt, HiUpload, HiSave, HiCheckCircle, HiPhotograph } from "react-icons/hi";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  
  const [activeTab, setActiveTab] = useState("General");
  const [successMsg, setSuccessMsg] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [heroFile, setHeroFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<any>({
    site_title: "",
    meta_description: "",
    phone: "",
    email: "",
    address: "",
    working_hours: "",
    instagram_url: "",
    facebook_url: "",
    logo: "",
    hero_image: ""
  });

  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Sync settings when loaded
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData({
        site_title: settings.site_title || "",
        meta_description: settings.meta_description || "",
        phone: settings.phone || "",
        email: settings.email || "",
        address: settings.address || "",
        working_hours: settings.working_hours || "",
        instagram_url: settings.instagram_url || "",
        facebook_url: settings.facebook_url || "",
        logo: settings.logo || "",
        hero_image: settings.hero_image || ""
      });
    }
  }, [settings]);

  const updateMutation = useMutation({
    mutationFn: adminUpdateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      triggerSuccess("Settings updated successfully!");
    }
  });

  const logoMutation = useMutation({
    mutationFn: adminUploadLogo,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setLogoFile(null);
      if (data && data.success && data.data?.logo) {
        setFormData((prev: any) => ({ ...prev, logo: data.data.logo }));
      }
      triggerSuccess("Logo uploaded successfully!");
    }
  });

  const heroMutation = useMutation({
    mutationFn: adminUploadHeroImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      setHeroFile(null);
      if (data && data.success && data.data?.hero_image) {
        setFormData((prev: any) => ({ ...prev, hero_image: data.data.hero_image }));
      }
      triggerSuccess("Hero background image uploaded successfully!");
    }
  });

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const fd = new FormData();
      fd.append("logo_file", file);
      logoMutation.mutate(fd);
    }
  };

  const handleHeroUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHeroFile(file);
      const fd = new FormData();
      fd.append("hero_image_file", file);
      heroMutation.mutate(fd);
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
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-sm text-white/50">Configure general copywriting, contacts, social media, and brand logo.</p>
        </div>
      </div>

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 flex items-center gap-2">
          <HiCheckCircle className="h-4 w-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Tabs navigation */}
      <div className="flex border-b border-white/5 gap-6">
        {["General", "Contacts", "Assets"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-semibold relative transition-all ${
              activeTab === tab ? "text-gold" : "text-white/40 hover:text-white"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Form Settings Panels */}
      <form onSubmit={handleSave} className="space-y-6 rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
        
        {/* GENERAL TAB */}
        {activeTab === "General" && (
          <div className="space-y-6">
            <h3 className="font-display text-base font-bold flex items-center gap-2 border-b border-white/5 pb-3">
              <HiCog className="h-5 w-5 text-gold" /> General SEO Config
            </h3>
            
            <div className="relative group">
              <input 
                type="text" 
                id="site_title"
                required
                value={formData.site_title}
                onChange={(e) => setFormData({ ...formData, site_title: e.target.value })}
                className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                placeholder="Site Title"
              />
              <label 
                htmlFor="site_title"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold"
              >
                Website Title
              </label>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 block">Meta Description</label>
              <textarea 
                rows={4}
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                className="form-control"
                placeholder="Enter description for search engine listings..."
              />
            </div>
          </div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === "Contacts" && (
          <div className="space-y-6">
            <h3 className="font-display text-base font-bold flex items-center gap-2 border-b border-white/5 pb-3">
              <HiPhone className="h-5 w-5 text-gold" /> Clinic Contact & Hours
            </h3>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative group">
                <input 
                  type="text" 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Phone"
                />
                <label htmlFor="phone" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Clinic Telephone</label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Email"
                />
                <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Clinic Email</label>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative group">
                <input 
                  type="text" 
                  id="working_hours"
                  value={formData.working_hours}
                  onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Working Hours"
                />
                <label htmlFor="working_hours" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Working Hours description</label>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Address"
                />
                <label htmlFor="address" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Clinic physical address</label>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="relative group">
                <input 
                  type="text" 
                  id="instagram"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Instagram"
                />
                <label htmlFor="instagram" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Instagram URL</label>
              </div>

              <div className="relative group">
                <input 
                  type="text" 
                  id="facebook"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
                  placeholder="Facebook"
                />
                <label htmlFor="facebook" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Facebook URL</label>
              </div>
            </div>
          </div>
        )}

        {/* ASSETS TAB */}
        {activeTab === "Assets" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-base font-bold flex items-center gap-2 border-b border-white/5 pb-3">
                <HiGlobeAlt className="h-5 w-5 text-gold" /> Logo & Identity
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl bg-white/5 border border-white/5 p-6 mt-4">
                <div className="h-16 w-32 shrink-0 bg-black/60 border border-white/10 rounded-xl grid place-items-center p-3">
                  {formData.logo ? (
                    <img src={formData.logo} alt="Clinic Logo" className="h-full w-auto object-contain" />
                  ) : (
                    <span className="text-[10px] text-white/30 uppercase">No Logo</span>
                  )}
                </div>

                <div>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={logoMutation.isPending}
                    className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                  >
                    <HiUpload className="h-4 w-4" /> 
                    {logoMutation.isPending ? "Uploading..." : "Upload Brand Logo"}
                  </button>
                  <p className="text-[10px] text-white/30 mt-2">Recommended: Transparent PNG or SVG with light/gold colors.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-base font-bold flex items-center gap-2 border-b border-white/5 pb-3">
                <HiPhotograph className="h-5 w-5 text-gold" /> Hero Background
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 rounded-xl bg-white/5 border border-white/5 p-6 mt-4">
                <div className="h-20 w-32 shrink-0 bg-black/60 border border-white/10 rounded-xl overflow-hidden relative">
                  {formData.hero_image ? (
                    <img src={formData.hero_image} alt="Hero Background" className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full grid place-items-center">
                      <span className="text-[10px] text-white/30 uppercase">No Image</span>
                    </div>
                  )}
                </div>

                <div>
                  <input 
                    type="file" 
                    ref={heroFileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleHeroUpload}
                  />
                  <button
                    type="button"
                    onClick={() => heroFileInputRef.current?.click()}
                    disabled={heroMutation.isPending}
                    className="btn-secondary text-xs py-2 px-4 inline-flex items-center gap-1.5"
                  >
                    <HiUpload className="h-4 w-4" /> 
                    {heroMutation.isPending ? "Uploading..." : "Upload Hero Image"}
                  </button>
                  <p className="text-[10px] text-white/30 mt-2">Recommended: High quality landscape JPG, PNG or WEBP (approx. 1920x1080).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form save footer button */}
        {activeTab !== "Assets" && (
          <div className="flex items-center justify-end border-t border-white/5 pt-4 mt-6">
            <button 
              type="submit" 
              disabled={updateMutation.isPending}
              className="btn-gold btn-gold-hover text-xs py-3 px-6 inline-flex items-center gap-2"
            >
              <HiSave className="h-4 w-4" /> Save Settings
            </button>
          </div>
        )}

      </form>
    </div>
  );
}
