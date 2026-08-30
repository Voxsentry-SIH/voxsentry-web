import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000";
    
    const response = await fetch(`${backendUrl}/api/verify`, {
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
    console.error("Verify Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend service", details: error.message },
      { status: 503 }
    );
  }
}
