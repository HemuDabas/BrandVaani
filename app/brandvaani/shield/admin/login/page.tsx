"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, Loader2, UserPlus, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const [isSignupMode, setIsSignupMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignupMode && !name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

    if (isSignupMode) {
      // ADMIN REGISTRATION FLOW: Registers in MongoDB, then switches to Sign In tab
      try {
        const res = await fetch("/api/auth/admin/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Admin registration failed");

        toast.success("Admin registered successfully! Now please sign in with your credentials.");
        setIsSignupMode(false);
        setPassword("");
      } catch (err: any) {
        toast.error(err.message || "Registration failed");
      } finally {
        setLoading(false);
      }
    } else {
      // ADMIN LOGIN FLOW: Authenticates against MongoDB, sets session cookie, redirects to Dashboard
      try {
        const res = await fetch("/api/auth/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Admin login failed");

        toast.success("Admin logged in successfully!");
        router.push("/admin/dashboard");
      } catch (err: any) {
        toast.error(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 py-12 text-white">
      <div className="w-full max-w-md bg-[#131b2e] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isSignupMode ? "Register New Admin" : "Admin Portal Sign In"}
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            BrandVaani Shield — Confidential Administration Portal
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-white/5 p-1 rounded-2xl mb-6 border border-white/10">
          <button
            type="button"
            onClick={() => setIsSignupMode(false)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              !isSignupMode ? "bg-white text-[#0B1120] shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <LogIn size={14} /> Admin Sign In
          </button>
          {/* <button
            type="button"
            onClick={() => setIsSignupMode(true)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              isSignupMode ? "bg-white text-[#0B1120] shadow" : "text-gray-400 hover:text-white"
            }`}
          >
            <UserPlus size={14} /> Register New Admin
          </button> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignupMode && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
                Admin Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Admin Name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-white"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
              Admin Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">
              Admin Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-[#0B1120] transition hover:bg-gray-100 disabled:opacity-70 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Processing...
              </>
            ) : isSignupMode ? (
              <>
                <UserPlus size={16} /> Register Admin Account
              </>
            ) : (
              <>
                <LogIn size={16} /> Access Admin Dashboard
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          <a href="/" className="hover:text-white transition">← Back to BrandVaani Home</a>
        </div>
      </div>
    </div>
  );
}
