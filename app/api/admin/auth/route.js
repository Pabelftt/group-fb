import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieHeader = request.cookies.get("admin_session");

  if (cookieHeader && cookieHeader.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}
