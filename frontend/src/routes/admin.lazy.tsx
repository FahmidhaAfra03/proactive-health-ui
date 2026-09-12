import { createLazyFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { 
  HiMenuAlt2, HiBell, HiSearch, HiCalendar, HiSparkles,
  HiPhotograph, HiInboxIn, HiUser, HiLogout, HiChevronLeft, HiChevronRight, HiQuestionMarkCircle
} from "react-icons/hi";
import { adminCheck, adminLogout } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.webp";
import { AdminLogin } from "@/components/admin/AdminLogin";

export const Route = createLazyFileRoute("/admin")({
  component: AdminLayoutRoute,
});

function AdminLayoutRoute() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const pathname = routerState.location.pathname;

  // Query auth state
  const { data: auth, isLoading } = useQuery({
    queryKey: ["admin-auth"],
    queryFn: adminCheck,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = useMutation({
    mutationFn: adminLogout,
    onSuccess: () => {
      queryClient.setQueryData(["admin-auth"], { authenticated: false });
      navigate({ to: "/admin" });
    }
  });

  // Handle redirects based on auth
  useEffect(() => {
    if (isLoading) return;

    const isAuthenticated = auth?.authenticated;

    if (!isAuthenticated) {
      // Unauthenticated users trying to access subpages must go back to /admin
      if (pathname !== "/admin" && pathname !== "/admin/") {
        navigate({ to: "/admin" });
      }
    } else {
      // Authenticated users on /admin should go to /admin/dashboard
      if (pathname === "/admin" || pathname === "/admin/") {
        navigate({ to: "/admin/dashboard" });
      }
    }
  }, [auth, isLoading, pathname]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0F0F0F] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent"></div>
          <p className="font-display text-sm tracking-widest uppercase text-gold">PROACTIVE</p>
        </div>
      </div>
    );
  }

  const isAuthenticated = auth?.authenticated;

  // Render Login Page if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  const links = [
    { to: "/admin/dashboard", label: "Dashboard", icon: HiSparkles },
    { to: "/admin/appointments", label: "Appointments", icon: HiCalendar },
    { to: "/admin/gallery", label: "Gallery", icon: HiPhotograph },
    { to: "/admin/faq", label: "FAQ", icon: HiQuestionMarkCircle },
    { to: "/admin/contact", label: "Messages", icon: HiInboxIn },
    { to: "/admin/profile", label: "Profile", icon: HiUser },
  ];

  return (
    <div className="flex min-h-screen bg-[#0F0F0F] font-sans text-white antialiased overflow-x-hidden">
      
      {/* MOBILE OVERLAY / BACKDROP */}
      {mobileOpen && (
        <button 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden border-none outline-none w-full h-full text-left cursor-default"
          aria-label="Close sidebar"
        />
      )}

      {/* SIDEBAR */}
      <aside 
        className={`fixed bottom-0 top-0 z-50 flex flex-col border-r border-white/5 bg-[#0A0A0A] transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={logoImg} alt="Proactive" className="h-8 w-auto shrink-0 object-contain" />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-[0.15em] text-white">PROACTIVE</span>
                <span className="text-[9px] font-bold tracking-widest text-gold uppercase">Enterprise</span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:grid h-8 w-8 place-items-center rounded-lg border border-white/10 hover:bg-white/5 text-white/70"
          >
            {collapsed ? <HiChevronRight className="h-4 w-4" /> : <HiChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              activeProps={{ className: "bg-gold/10 text-gold border-l-2 border-gold font-semibold" }}
              className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-white/90 hover:bg-white/5 transition-all duration-200`}
            >
              <link.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => {
              setMobileOpen(false);
              logoutMutation.mutate();
            }}
            className="flex w-full items-center gap-3.5 px-3.5 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <HiLogout className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div 
        className={`flex flex-col flex-1 min-h-screen min-w-0 transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-[#0F0F0F]/80 px-6 backdrop-blur-md">
          {/* Left search */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white hover:text-gold"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <HiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search metrics, reports..." 
                className="h-10 w-64 rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 text-xs text-white placeholder-white/30 outline-none transition focus:border-gold/50 focus:bg-white/10"
              />
            </div>
          </div>

          {/* Right meta */}
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[11px] font-semibold text-white/40 uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>

            {/* Notification trigger */}
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:text-white">
              <HiBell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gold"></span>
            </button>

            {/* User details */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex flex-col items-end leading-none">
                <span className="text-xs font-bold text-white">{auth?.user?.username ?? 'Admin'}</span>
                <span className="text-[10px] text-gold font-semibold uppercase mt-0.5 tracking-wider">Super Administrator</span>
              </div>
              <div className="h-10 w-10 rounded-xl bg-gold/15 border border-gold/30 grid place-items-center font-display text-gold font-bold text-base">
                {(auth?.user?.username ?? 'A')[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT PANEL */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
