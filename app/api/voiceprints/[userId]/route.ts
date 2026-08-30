import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  props: { params: Promise<{ userId: string }> }
) {
  try {
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000";
    const { userId } = await props.params;
    
    const response = await fetch(`${backendUrl}/api/voiceprints/${userId}`, {
      method: "GET",
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
    console.error("Voiceprints Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service", details: error.message },
      { status: 503 }
    );
  }
}
