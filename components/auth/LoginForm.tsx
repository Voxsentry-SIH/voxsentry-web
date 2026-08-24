"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import gsap from "gsap";

export default function LoginForm() {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<"login" | "google" | "guest" | null>(null);
  const guestBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!guestBtnRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(guestBtnRef.current, {
        boxShadow: "0 0 20px rgba(34,211,238,0.3), inset 0 0 10px rgba(34,211,238,0.05)",
        borderColor: "rgba(34,211,238,0.5)",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, guestBtnRef);
    return () => ctx.revert();
  }, []);

  const handleMockLogin = (e: React.FormEvent | React.MouseEvent, type: "login" | "google") => {
    e.preventDefault();
    setLoadingType(type);
    
    setTimeout(() => {
      localStorage.setItem("voxsentry_auth", "user");
      document.cookie = "voxsentry_auth=user; path=/; max-age=86400"; // 1 day expiration
      window.dispatchEvent(new Event("voxsentry_auth_change"));
      window.location.href = "/demo";
    }, 1200);
  };

  const handleGuestMode = () => {
    setLoadingType("guest");
    
    setTimeout(() => {
      localStorage.setItem("voxsentry_auth", "guest");
      document.cookie = "voxsentry_auth=guest; path=/; max-age=86400";
      window.dispatchEvent(new Event("voxsentry_auth_change"));
      window.location.href = "/demo";
    }, 800);
  };

  return (
    <>
      <div className="glass-card rounded-3xl p-8 shadow-2xl">
        <form onSubmit={(e) => handleMockLogin(e, "login")} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#050514]/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Password</label>
              <Link href="#" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500 transition-colors group-focus-within:text-cyan-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#050514]/60 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 transition-all duration-300 focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loadingType !== null}
            className="btn-primary w-full py-4 mt-6 text-sm"
          >
            {loadingType === "login" ? <Loader2 className="h-5 w-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-[#13122b] px-4 text-slate-500 text-xs uppercase tracking-widest font-semibold rounded-full border border-white/5">Or continue with</span>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => handleMockLogin(e, "google")}
          disabled={loadingType !== null}
          className="btn-outline w-full py-3.5 text-sm text-slate-200"
        >
          {loadingType === "google" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </>
          )}
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="#" className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign up
          </Link>
        </p>
      </div>

      {/* Guest Mode CTA */}
      <div className="mt-10 flex flex-col items-center">
        <p className="mb-4 text-sm text-slate-400">Just want to test the detection engine?</p>
        <button
          ref={guestBtnRef}
          type="button"
          onClick={handleGuestMode}
          disabled={loadingType !== null}
          className="flex w-full items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/5 py-4 text-sm font-semibold text-cyan-400 transition-colors hover:bg-cyan-400/10"
        >
          {loadingType === "guest" ? (
            <Loader2 className="h-5 w-5 animate-spin text-cyan-400 mr-2" />
          ) : null}
          Try demo without signing up (Guest / Judge Mode)
        </button>
      </div>
    </>
  );
}
