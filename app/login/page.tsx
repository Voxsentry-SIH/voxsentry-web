import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Optional: subtle background glow just to give the page depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_60%)] blur-3xl -z-10 pointer-events-none" />
      
      <div className="w-full max-w-md z-10 reveal-up">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to your VoxSentry account</p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
