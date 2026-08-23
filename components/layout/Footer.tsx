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
    <footer className="border-t border-border bg-background-alt">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-2">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
              aria-label="VoxSentry Home"
            >
              <Shield className="h-5 w-5 text-primary" />
              VoxSentry
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              AI-powered real-time voice-clone detection. Protecting your calls
              from synthetic voice scams with calm confidence.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Product
            </h3>
            <ul className="flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} VoxSentry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
