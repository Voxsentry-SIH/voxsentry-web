import { NextResponse } from "next/server";

/**
 * POST /api/analyze
 * Proxy route — forwards requests to the FastAPI ML backend.
 */
export async function POST(request: Request) {
  try {
    const incomingFormData = await request.formData();
    const file = incomingFormData.get("file") as Blob | null;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Reconstruct FormData to ensure the filename is preserved when proxying
    const formData = new FormData();
    // Fallback to "audio.wav" if the blob doesn't have a name property
    const filename = (file as any).name || "audio.wav";
    formData.append("file", file, filename.endsWith(".wav") ? filename : filename + ".wav");

    const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000";
    
    // The FastAPI backend mounted this under /api prefix
    const response = await fetch(`${backendUrl}/api/analyze`, {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Backend error: ${response.status} ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Analyze Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service", details: error.message },
      { status: 503 }
    );
  }
}
