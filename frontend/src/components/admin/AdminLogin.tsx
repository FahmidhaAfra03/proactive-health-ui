import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminLogin } from "@/lib/api";
import logoImg from "@/assets/logo.webp";

export function AdminLogin() {
  const queryClient = useQueryClient();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loginMutation = useMutation({
    mutationFn: adminLogin,
    onSuccess: () => {
      // Invalidate auth query to trigger re-evaluation in parent
      queryClient.invalidateQueries({ queryKey: ["admin-auth"] });
    },
    onError: (error: any) => {
      setErrorMsg(error.message || "Invalid username or password.");
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Please enter both username and password.");
      return;
    }
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#070D19] px-4 font-sans text-white">
      {/* Background glow effects */}
      <div className="absolute -left-10 top-1/4 h-80 w-80 rounded-full bg-blue-brand/5 blur-[120px]" />
      <div className="absolute -right-10 bottom-1/4 h-80 w-80 rounded-full bg-blue-brand/5 blur-[120px]" />

      <div className="relative w-full max-w-md rounded-2xl border border-white/5 bg-[#0C1524] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md">
        
        {/* Logo and Headings */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 p-2 mb-4 shadow-inner">
            <img src={logoImg} alt="ProActive Logo" className="h-full w-auto object-contain rounded-md" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-[0.1em] text-white">ProActive</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-brand mt-1.5">Enterprise Administration</p>
        </div>

        {errorMsg && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs font-semibold text-red-400">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Username Input with Animation */}
          <div className="relative group">
            <input 
              type="text" 
              id="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none transition duration-200 focus:border-blue-brand/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-brand/30"
              placeholder="Username"
            />
            <label 
              htmlFor="username"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-blue-brand peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-blue-brand"
            >
              Username
            </label>
          </div>

          {/* Password Input with Animation */}
          <div className="relative group">
            <input 
              type="password" 
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-transparent outline-none transition duration-200 focus:border-blue-brand/50 focus:bg-white/10 focus:ring-1 focus:ring-blue-brand/30"
              placeholder="Password"
            />
            <label 
              htmlFor="password"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/40 transition-all duration-200 pointer-events-none group-focus-within:top-2 group-focus-within:text-[10px] group-focus-within:text-blue-brand peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-blue-brand"
            >
              Password
            </label>
          </div>

          {/* Login Button with blue hover ripple */}
          <button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="btn-blue btn-blue-hover w-full justify-center text-sm font-bold uppercase tracking-[0.1em] py-3.5 rounded-xl border-none shadow-[0_12px_30px_rgba(26,86,219,0.2)] hover:shadow-[0_18px_40px_rgba(26,86,219,0.45)] transition-all duration-300"
          >
            {loginMutation.isPending ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/30 uppercase tracking-widest">
          Authorized Personnel Only
        </p>

      </div>
    </div>
  );
}
