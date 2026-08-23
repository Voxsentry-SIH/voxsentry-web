import { NextResponse } from "next/server";

/**
 * POST /api/analyze
 * Proxy route — will forward requests to the FastAPI ML backend.
 * Currently returns mocked data (Phase 0 scaffold).
 */
export async function POST() {
  // TODO: Phase 9 — proxy to real FastAPI backend
  return NextResponse.json(
    { message: "Analyze endpoint placeholder" },
    { status: 200 }
  );
}
