import { NextRequest, NextResponse } from "next/server";
import { DOCTORS, DOCTOR_PHOTO_URLS } from "@/data/doctors";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const doctor = DOCTORS.find((d) => d.id === id);
  if (!doctor) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const photoUrl = DOCTOR_PHOTO_URLS[doctor.name];
  if (!photoUrl) {
    return NextResponse.json({ error: "No photo" }, { status: 404 });
  }
  try {
    const res = await fetch(photoUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; Liteh/1)" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.error("Doctor photo proxy error:", e);
    return NextResponse.json({ error: "Proxy error" }, { status: 502 });
  }
}
