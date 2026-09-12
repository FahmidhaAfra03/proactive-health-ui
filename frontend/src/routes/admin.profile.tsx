import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { updateAdminPassword } from "@/lib/api";
import { HiUser, HiLockClosed, HiCheckCircle } from "react-icons/hi";

export const Route = createFileRoute("/admin/profile")({
  component: AdminProfile,
});

function AdminProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const updateMutation = useMutation({
    mutationFn: updateAdminPassword,
    onSuccess: () => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMsg("");
      setSuccessMsg("Password updated successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);
    },
    onError: (err: any) => {
      setErrorMsg(err.message || "Failed to update password.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMsg("Please fill out all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters long.");
      return;
    }

    updateMutation.mutate({
      current_password: currentPassword,
      new_password: newPassword
    });
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">Admin Profile</h2>
        <p className="text-sm text-white/50">Manage your administrative user security credentials.</p>
      </div>

      {successMsg && (
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 flex items-center gap-2">
          <HiCheckCircle className="h-4 w-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-400">
          {errorMsg}
        </div>
      )}

      {/* Security Form */}
      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
        <h3 className="font-display text-base font-bold flex items-center gap-2 border-b border-white/5 pb-3">
          <HiLockClosed className="h-5 w-5 text-gold" /> Update Password
        </h3>

        {/* Current Password */}
        <div className="relative group">
          <input 
            type="password" 
            id="currentPassword"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
            placeholder="Current Password"
          />
          <label htmlFor="currentPassword" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Current Password</label>
        </div>

        {/* New Password */}
        <div className="relative group">
          <input 
            type="password" 
            id="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
            placeholder="New Password"
          />
          <label htmlFor="newPassword" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">New Password</label>
        </div>

        {/* Confirm Password */}
        <div className="relative group">
          <input 
            type="password" 
            id="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none focus:border-gold/50"
            placeholder="Confirm Password"
          />
          <label htmlFor="confirmPassword" className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-gold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-gold">Confirm New Password</label>
        </div>

        <div className="flex items-center justify-end border-t border-white/5 pt-4 mt-6">
          <button 
            type="submit" 
            disabled={updateMutation.isPending}
            className="btn-gold btn-gold-hover text-xs py-3 px-6"
          >
            {updateMutation.isPending ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </div>
  );
}
