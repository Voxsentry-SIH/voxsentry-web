import Link from "next/link";
import { Shield } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
}

const productLinks: FooterLink[] = [
  { href: "/download", label: "Download App" },
  { href: "/demo", label: "Live Demo" },
  { href: "/train-voice", label: "Train Your Voice" },
];

const companyLinks: FooterLink[] = [
  { href: "/", label: "About" },
  { href: "/login", label: "Sign In" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(34,211,238,0.1)] bg-[#050514]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2 lg:col-span-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 w-fit"
            >
              <Shield className="h-6 w-6 text-cyan-400" />
              VoxSentry
            </Link>
            <p className="mt-4 max-w-md text-sm text-slate-400 leading-relaxed">
              AI-powered voice security designed to help detect synthetic and cloned voices during calls.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Product
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[rgba(34,211,238,0.1)] pt-8">
          <p className="text-center text-xs text-slate-500">
            &copy; {new Date().getFullYear()} VoxSentry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
