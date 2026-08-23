import { NextResponse } from "next/server";

/**
 * GET /api/voice-profiles
 * Mocked CRUD for trained voice profiles.
 * Currently returns mocked data (Phase 0 scaffold).
 */
export async function GET() {
  // TODO: Phase 7 — implement mocked profile storage
  return NextResponse.json(
    { profiles: [] },
    { status: 200 }
  );
}

export async function POST() {
  // TODO: Phase 7 — implement profile creation
  return NextResponse.json(
    { message: "Voice profile endpoint placeholder" },
    { status: 200 }
  );
}
