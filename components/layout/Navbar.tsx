"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          aria-label="VoxSentry Home"
        >
          <Shield className="h-6 w-6 text-primary" />
          VoxSentry
        </Link>

        {/* Center: Desktop Nav Links */}
        <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Desktop CTA */}
        <div className="hidden shrink-0 md:flex">
          <Link
            href="/login"
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-all hover:bg-primary-dark active:scale-[0.98]"
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-muted hover:text-foreground md:hidden transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
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
                        ? "text-primary"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-4 mt-2 border-t border-border">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-white transition-colors hover:bg-primary-dark"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
