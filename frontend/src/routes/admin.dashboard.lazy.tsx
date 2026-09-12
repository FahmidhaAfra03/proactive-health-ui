import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { 
  HiCalendar, HiClock, HiCheckCircle, 
  HiUsers, HiBriefcase, HiInboxIn, HiArrowNarrowRight
} from "react-icons/hi";
import { 
  adminGetAppointments, 
  getDoctors, 
  getServices, 
  adminGetContactMessages 
} from "@/lib/api";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createLazyFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  // Load data in parallel
  const { data: appointments = [], isLoading: loadingAppts } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: adminGetAppointments,
  });

  const { data: doctors = [], isLoading: loadingDocs } = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const { data: messages = [], isLoading: loadingMsgs } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: adminGetContactMessages,
  });

  const isLoading = loadingAppts || loadingDocs || loadingServices || loadingMsgs;

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
      </div>
    );
  }

  // Calculate stats
  const totalAppts = appointments.length;
  const pendingAppts = appointments.filter((a: any) => a.status === "Pending").length;
  const confirmedAppts = appointments.filter((a: any) => a.status === "Confirmed").length;
  const completedAppts = appointments.filter((a: any) => a.status === "Completed").length;
  const totalDoctors = doctors.length;
  const totalServices = services.length;
  const totalEnquiries = messages.length;

  const stats = [
    { label: "Total Bookings", value: totalAppts, icon: HiCalendar, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Pending", value: pendingAppts, icon: HiClock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Confirmed", value: confirmedAppts, icon: HiCheckCircle, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { label: "Completed", value: completedAppts, icon: HiCheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Doctors", value: totalDoctors, icon: HiUsers, color: "text-gold", bg: "bg-gold/10" },
    { label: "Services", value: totalServices, icon: HiBriefcase, color: "text-pink-400", bg: "bg-pink-500/10" },
    { label: "Total Enquiries", value: totalEnquiries, icon: HiInboxIn, color: "text-teal-400", bg: "bg-teal-500/10" },
  ];

  // Prepare chart data (simulated recovery analytics or bookings over the last months)
  const chartData = [
    { month: "Jan", bookings: 12, completed: 8 },
    { month: "Feb", bookings: 18, completed: 14 },
    { month: "Mar", bookings: 25, completed: 20 },
    { month: "Apr", bookings: 20, completed: 17 },
    { month: "May", bookings: 32, completed: 28 },
    { month: "Jun", bookings: totalAppts, completed: completedAppts },
  ];

  // Recent activity feeds
  const recentAppts = appointments.slice(0, 5);
  const recentMsgs = messages.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight">Overview</h2>
        <p className="text-sm text-white/50">Performance metrics and administrative operations summary.</p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {stats.map((stat) => (
          <div 
            key={stat.label}
            className="group relative rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 shadow-2xl hover:border-gold/20 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
              <h3 className="font-display text-2xl font-bold text-white mt-1 group-hover:text-gold transition-colors">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Analytics */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Bookings Performance Chart */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 lg:col-span-2 shadow-2xl">
          <h3 className="font-display text-base font-bold mb-6">Patient Recovery & Booking Trends</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4af37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis dataKey="month" stroke="#444" fontSize={11} />
                <YAxis stroke="#444" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0A0A0A", borderColor: "#333", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="bookings" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorBookings)" name="Bookings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operational Ratios */}
        <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
          <div>
            <h3 className="font-display text-base font-bold mb-4">Clinic Efficiency</h3>
            <p className="text-xs text-white/45 mb-6">Proportion of bookings that reach final recovery milestones.</p>
          </div>
          
          <div className="space-y-5 my-auto">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Completion Rate</span>
                <span className="text-gold">{totalAppts ? Math.round((completedAppts / totalAppts) * 100) : 0}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold-soft to-gold"
                  style={{ width: `${totalAppts ? (completedAppts / totalAppts) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Confirmation Ratio</span>
                <span className="text-indigo-400">{totalAppts ? Math.round((confirmedAppts / totalAppts) * 100) : 0}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-indigo-500"
                  style={{ width: `${totalAppts ? (confirmedAppts / totalAppts) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span>Inbox Action Rate</span>
                <span className="text-teal-400">{totalEnquiries ? Math.round((messages.filter((m: any) => m.is_read == 1).length / totalEnquiries) * 100) : 0}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-teal-400"
                  style={{ width: `${totalEnquiries ? (messages.filter((m: any) => m.is_read == 1).length / totalEnquiries) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-6 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-gold">SaaS Stats Active</span>
          </div>
        </div>
      </div>

      {/* Recents list splits */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-base font-bold">Recent Bookings</h3>
            <Link to="/admin/appointments" className="inline-flex items-center gap-1 text-xs text-gold hover:underline">
              Manage <HiArrowNarrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentAppts.length === 0 ? (
              <p className="text-center text-xs text-white/40 py-8">No appointments requested yet.</p>
            ) : (
              recentAppts.map((appt: any) => (
                <div key={appt.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0F0F0F]/50 p-4">
                  <div>
                    <h4 className="text-sm font-semibold">{appt.patient_name}</h4>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {new Date(appt.preferred_date).toLocaleDateString()} &middot; {appt.preferred_time}
                    </p>
                  </div>
                  <span className={`status-badge text-[9px] px-2 py-0.5 status-${appt.status.toLowerCase()}`}>
                    {appt.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-base font-bold">Client Inquiries</h3>
            <Link to="/admin/contact" className="inline-flex items-center gap-1 text-xs text-gold hover:underline">
              Inbox <HiArrowNarrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentMsgs.length === 0 ? (
              <p className="text-center text-xs text-white/40 py-8">No messages received.</p>
            ) : (
              recentMsgs.map((msg: any) => (
                <div key={msg.id} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0F0F0F]/50 p-4">
                  <div>
                    <h4 className="text-sm font-semibold">{msg.name}</h4>
                    <p className="text-[11px] text-white/50 mt-0.5 truncate max-w-xs">{msg.subject} - {msg.message}</p>
                  </div>
                  <span className={`status-badge text-[9px] px-2 py-0.5 ${msg.is_read == 1 ? 'bg-white/5 text-white/40' : 'bg-gold/15 text-gold'}`}>
                    {msg.is_read == 1 ? "Read" : "New"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
