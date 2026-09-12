import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  adminGetAppointments, 
  adminUpdateAppointment, 
  adminDeleteAppointment 
} from "@/lib/api";
import { 
  HiSearch, HiChevronLeft, HiChevronRight, 
  HiPencilAlt, HiTrash, HiCheck, HiX
} from "react-icons/hi";

export const Route = createLazyFileRoute("/admin/appointments")({
  component: AdminAppointments,
});

function AdminAppointments() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Selected appointment for editing modal
  const [editAppt, setEditAppt] = useState<any>(null);

  // Queries
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: adminGetAppointments,
  });

  // Mutations
  const updateMutation = useMutation({
    mutationFn: adminUpdateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      setEditAppt(null);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  // Filter items
  const filtered = appointments.filter((appt: any) => {
    const matchesSearch = 
      appt.patient_name.toLowerCase().includes(search.toLowerCase()) ||
      appt.patient_email.toLowerCase().includes(search.toLowerCase()) ||
      appt.patient_phone.includes(search);
      
    const matchesStatus = statusFilter === "All" || appt.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort items
  const sorted = [...filtered].sort((a: any, b: any) => {
    if (sortBy === "date-desc") {
      return new Date(b.preferred_date).getTime() - new Date(a.preferred_date).getTime();
    }
    if (sortBy === "date-asc") {
      return new Date(a.preferred_date).getTime() - new Date(b.preferred_date).getTime();
    }
    if (sortBy === "name-asc") {
      return a.patient_name.localeCompare(b.patient_name);
    }
    if (sortBy === "name-desc") {
      return b.patient_name.localeCompare(a.patient_name);
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = sorted.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this appointment request?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleQuickStatus = (appt: any, status: string) => {
    updateMutation.mutate({ ...appt, status });
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-sm text-white/50">Manage booking assessments, schedules, and recovery statuses.</p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between rounded-2xl border border-white/5 bg-[#0A0A0A] p-4 shadow-2xl">
        <div className="relative flex-1 max-w-md">
          <HiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input 
            type="text" 
            placeholder="Search patient name, email, phone..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none focus:border-gold/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Tabs */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/5 overflow-x-auto whitespace-nowrap scrollbar-none max-w-full">
            {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setStatusFilter(tab); setCurrentPage(1); }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === tab ? "bg-gold text-[#111]" : "text-white/60 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Sort selection */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-xs text-white outline-none focus:border-gold/50"
          >
            <option value="date-desc">Newest Date</option>
            <option value="date-asc">Oldest Date</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>

      {/* Table grid display */}
      <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Patient Info</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Preferred Schedule</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Treatment</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-widest text-white/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-xs text-white/40">No appointments matched the criteria.</td>
                </tr>
              ) : (
                paginated.map((appt: any) => (
                  <tr key={appt.id} className="hover:bg-white/[0.01] transition-all duration-150">
                    <td className="p-4">
                      <div className="font-semibold text-sm">{appt.patient_name}</div>
                      <div className="text-xs text-white/40 mt-1">{appt.patient_email} &middot; {appt.patient_phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-xs">{new Date(appt.preferred_date).toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}</div>
                      <div className="text-[11px] text-gold mt-0.5">{appt.preferred_time}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                        {appt.service_slug ? appt.service_slug.replace(/-/g, " ") : "General Consultation"}
                      </div>
                      {appt.notes && <div className="text-[11px] text-white/40 mt-1 italic max-w-xs truncate">{appt.notes}</div>}
                    </td>
                    <td className="p-4">
                      <span className={`status-badge text-[9px] px-2 py-0.5 status-${appt.status.toLowerCase()}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Quick state change hooks */}
                        {appt.status === "Pending" && (
                          <>
                            <button 
                              onClick={() => handleQuickStatus(appt, "Confirmed")}
                              title="Approve / Confirm"
                              className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all"
                            >
                              <HiCheck className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleQuickStatus(appt, "Cancelled")}
                              title="Cancel"
                              className="grid h-7 w-7 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <HiX className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {appt.status === "Confirmed" && (
                          <button 
                            onClick={() => handleQuickStatus(appt, "Completed")}
                            title="Complete Recovery"
                            className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all"
                          >
                            <HiCheck className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button 
                          onClick={() => setEditAppt(appt)}
                          title="Full Edit"
                          className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all"
                        >
                          <HiPencilAlt className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(appt.id)}
                          title="Delete Request"
                          className="grid h-7 w-7 place-items-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <HiTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-white/5 px-6 py-4 bg-white/[0.01]">
            <span className="text-xs text-white/40">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sorted.length)} of {sorted.length} entries
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <HiChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/70 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <HiChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editAppt && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <h3 className="font-display text-lg font-bold">Edit Booking Record</h3>
              <button onClick={() => setEditAppt(null)} className="text-white/40 hover:text-white">
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate(editAppt);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Patient Name</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={editAppt.patient_name}
                    onChange={(e) => setEditAppt({ ...editAppt, patient_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Patient Phone</label>
                  <input 
                    type="text" 
                    className="form-control mt-1.5"
                    value={editAppt.patient_phone}
                    onChange={(e) => setEditAppt({ ...editAppt, patient_phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Patient Email</label>
                <input 
                  type="email" 
                  className="form-control mt-1.5"
                  value={editAppt.patient_email}
                  onChange={(e) => setEditAppt({ ...editAppt, patient_email: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs text-white/40">Preferred Date</label>
                  <input 
                    type="date" 
                    className="form-control mt-1.5"
                    value={editAppt.preferred_date}
                    onChange={(e) => setEditAppt({ ...editAppt, preferred_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40">Preferred Time</label>
                  <select 
                    className="form-control mt-1.5"
                    value={editAppt.preferred_time}
                    onChange={(e) => setEditAppt({ ...editAppt, preferred_time: e.target.value })}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-white/40">Status</label>
                <select 
                  className="form-control mt-1.5"
                  value={editAppt.status}
                  onChange={(e) => setEditAppt({ ...editAppt, status: e.target.value })}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/40">Treatment / Injury Notes</label>
                <textarea 
                  className="form-control mt-1.5"
                  rows={3}
                  value={editAppt.notes}
                  onChange={(e) => setEditAppt({ ...editAppt, notes: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-white/5 pt-4 mt-6">
                <button type="button" onClick={() => setEditAppt(null)} className="btn-secondary py-2.5 text-xs px-4">Cancel</button>
                <button 
                  type="submit" 
                  disabled={updateMutation.isPending}
                  className="btn-gold btn-gold-hover py-2.5 text-xs px-6"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
