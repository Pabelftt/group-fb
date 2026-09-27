import { NextResponse } from "next/server";

export async function GET(request) {
  const cookieHeader = request.headers.get("cookie");

  if (cookieHeader && cookieHeader.includes("admin_session=authenticated")) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}
