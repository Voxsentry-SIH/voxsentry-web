import DemoEnvironment from "@/components/demo/DemoEnvironment";

export default function DemoPage() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent relative overflow-hidden pb-20 pt-16 sm:pt-24">
      {/* Circuit/Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none fixed"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="mx-auto w-full max-w-7xl px-6 relative z-10">
        <div className="mb-12 reveal-up">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl drop-shadow-md">
            Live Demo Environment
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Experience how VoxSentry analyzes incoming audio in real-time. Select a scenario and press play to simulate a phone call.
          </p>
        </div>

        <DemoEnvironment />
      </div>
    </main>
  );
}
