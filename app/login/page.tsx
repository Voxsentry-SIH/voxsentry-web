"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [loadingType, setLoadingType] = useState<"login" | "google" | "guest" | null>(null);

  const handleMockLogin = (e: React.FormEvent | React.MouseEvent, type: "login" | "google") => {
    e.preventDefault();
    setLoadingType(type);
    
    // Simulate network request
    setTimeout(() => {
      // Store auth state client-side
      localStorage.setItem("voxsentry_auth", "user");
      router.push("/demo");
    }, 1200);
  };

  const handleGuestMode = () => {
    setLoadingType("guest");
    
    // Simulate network request
    setTimeout(() => {
      // Store auth state client-side specifically for guest
      localStorage.setItem("voxsentry_auth", "guest");
      router.push("/demo");
    }, 800);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted">Sign in to your VoxSentry account</p>
        </div>

        <Card className="shadow-lg">
          <form onSubmit={(e) => handleMockLogin(e, "login")} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-muted" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-border bg-background-alt py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background-alt py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loadingType !== null}
              className="flex w-full items-center justify-center gap-2"
            >
              {loadingType === "login" && <Loader2 className="h-4 w-4 animate-spin" />}
              Login
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={(e) => handleMockLogin(e, "google")}
            disabled={loadingType !== null}
            className="flex w-full items-center justify-center gap-2"
          >
            {loadingType === "google" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Google
          </Button>

          <p className="mt-8 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </Card>

        {/* Guest Mode CTA */}
        <div className="mt-8 flex flex-col items-center">
          <p className="mb-3 text-sm text-muted">Just want to test the detection engine?</p>
          <Button
            type="button"
            variant="outline"
            onClick={handleGuestMode}
            disabled={loadingType !== null}
            className="flex w-full items-center justify-center gap-2 border-dashed bg-background-alt hover:bg-border/50 text-foreground"
          >
            {loadingType === "guest" && (
              <Loader2 className="h-4 w-4 animate-spin text-muted" />
            )}
            Try demo without signing up (Guest / Judge Mode)
          </Button>
        </div>
      </div>
    </main>
  );
}
