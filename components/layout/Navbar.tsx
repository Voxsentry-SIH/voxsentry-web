"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/download", label: "Download" },
  { href: "/demo", label: "Live Demo" },
  { href: "/train-voice", label: "Train Voice" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authType, setAuthType] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      setAuthType(localStorage.getItem("voxsentry_auth"));
    };
    checkAuth();
    
    window.addEventListener("storage", checkAuth);
    
    // Custom event to catch login within the same tab without reload
    const handleAuthChange = () => checkAuth();
    window.addEventListener("voxsentry_auth_change", handleAuthChange);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("voxsentry_auth_change", handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("voxsentry_auth");
    document.cookie = "voxsentry_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setAuthType(null);
    window.location.href = "/";
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 border-b border-[rgba(34,211,238,0.1)] bg-[#0A0A1F]/60 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16 md:h-20">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="VoxSentry Home"
        >
          {/* Animated Waveform Logo */}
          <div className="flex items-center justify-center gap-[2px] h-6 w-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full bg-cyan-400"
                animate={{ height: ["40%", "100%", "40%"] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
          <span className="text-xl font-bold tracking-tight text-white">VoxSentry</span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative flex items-center justify-center h-full">
                <Link
                  href={link.href}
                  className={`relative px-2 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute left-0 right-0 -bottom-[1.2rem] h-[2px] bg-cyan-400"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Desktop CTA */}
        <div className="hidden shrink-0 md:flex items-center gap-6">
          {authType ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400/80 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                {authType === "guest" ? "Guest Mode" : "Signed In"}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
              >
                Logout <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-6 py-2 text-sm font-medium text-cyan-400 transition-all hover:bg-cyan-400/20 hover:border-cyan-400/60 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] active:scale-[0.98]"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-slate-300 hover:text-white md:hidden transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[rgba(34,211,238,0.1)] bg-[#0A0A1F] px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-base font-medium transition-colors ${
                      isActive
                        ? "text-cyan-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            
            <li className="pt-4 mt-2 border-t border-[rgba(34,211,238,0.1)]">
              {authType ? (
                <div className="flex flex-col gap-4">
                  <span className="block text-center text-sm font-medium text-cyan-400/80">
                    Logged in as {authType === "guest" ? "Guest" : "User"}
                  </span>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="block w-full text-center rounded-lg border border-red-500/30 bg-red-500/10 px-5 py-3 text-base font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 text-base font-medium text-cyan-400 transition-colors hover:bg-cyan-400/20"
                >
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </motion.nav>
  );
}
