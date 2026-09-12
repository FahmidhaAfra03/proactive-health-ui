import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { 
  adminGetContactMessages, 
  adminUpdateContactMessage, 
  adminDeleteContactMessage 
} from "@/lib/api";
import { HiSearch, HiTrash, HiInbox, HiMail, HiMailOpen } from "react-icons/hi";

export const Route = createLazyFileRoute("/admin/contact")({
  component: AdminContact,
});

function AdminContact() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [activeMsg, setActiveMsg] = useState<any>(null);

  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: adminGetContactMessages,
  });

  const updateMutation = useMutation({
    mutationFn: adminUpdateContactMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: adminDeleteContactMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      setActiveMsg(null);
    }
  });

  const handleOpenMessage = (msg: any) => {
    setActiveMsg(msg);
    if (msg.is_read == 0) {
      updateMutation.mutate({ ...msg, is_read: 1 });
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      deleteMutation.mutate(id);
    }
  };

  const filtered = messages.filter((msg: any) => 
    msg.name.toLowerCase().includes(search.toLowerCase()) ||
    msg.email.toLowerCase().includes(search.toLowerCase()) ||
    msg.subject.toLowerCase().includes(search.toLowerCase()) ||
    msg.message.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">Contact Inbox</h2>
        <p className="text-sm text-white/50">Read and respond to direct client inquiries and contact forms.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        
        {/* MESSAGES LIST SIDE */}
        <div className="flex flex-col gap-4">
          {/* Search bar */}
          <div className="relative">
            <HiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search contact messages..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-[#0A0A0A] pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none focus:border-gold/50 shadow-2xl"
            />
          </div>

          {/* List scroll */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filtered.length === 0 ? (
              <p className="text-center text-xs text-white/40 py-8 bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 shadow-2xl">
                No inquiries matching search.
              </p>
            ) : (
              filtered.map((msg: any) => (
                <div 
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  className={`group rounded-xl border cursor-pointer p-4 text-left shadow-md transition-all duration-200 ${
                    activeMsg?.id === msg.id 
                      ? "border-gold/30 bg-gold/5" 
                      : "border-white/5 bg-[#0A0A0A] hover:border-white/10 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate max-w-[200px]">{msg.name}</span>
                    <span className="text-[10px] text-white/30">
                      {new Date(msg.created_at).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white/80 mt-2 truncate">{msg.subject}</h4>
                  <p className="text-[11px] text-white/40 mt-1 line-clamp-2 leading-relaxed">{msg.message}</p>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <span className="inline-flex items-center gap-1 text-[9px] text-white/30">
                      {msg.is_read == 1 ? <HiMailOpen className="h-3.5 w-3.5" /> : <HiMail className="h-3.5 w-3.5 text-gold" />}
                      {msg.is_read == 1 ? "Read" : "Unread"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MESSAGE DETAIL VIEW SIDE */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl min-h-[450px] flex flex-col">
          {activeMsg ? (
            <div className="flex-1 flex flex-col justify-between">
              <div>
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="font-display text-lg font-bold">{activeMsg.subject}</h3>
                    <p className="text-xs text-white/40 mt-1">
                      From: <span className="text-white font-semibold">{activeMsg.name}</span> &middot; {activeMsg.email} &middot; {activeMsg.phone || "No phone"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handleDelete(activeMsg.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all font-semibold"
                    >
                      <HiTrash className="h-4 w-4" /> Delete message
                    </button>
                  </div>
                </div>

                {/* Content body */}
                <div className="py-6 text-sm leading-relaxed text-white/80 whitespace-pre-wrap">
                  {activeMsg.message}
                </div>
              </div>

              {/* Action reply footer */}
              <div className="border-t border-white/5 pt-6 mt-8">
                <a 
                  href={`mailto:${activeMsg.email}?subject=Re: ${activeMsg.subject}`}
                  className="btn-gold btn-gold-hover text-xs py-2.5 px-6 inline-flex"
                >
                  <HiMail className="h-4 w-4 mr-1 inline" /> Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <HiInbox className="h-12 w-12 text-white/10 mb-4" />
              <h3 className="font-display text-base font-bold text-white/70">No Message Selected</h3>
              <p className="text-xs text-white/40 max-w-xs mt-2">Select a patient inquiry from the left list to read their inquiries.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
