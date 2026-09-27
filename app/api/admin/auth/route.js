import { NextResponse } from "next/server";

function getSession(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = Object.fromEntries(cookieHeader.split(";").map((c) => c.trim().split("=")));
  return cookies.admin_session;
}

export async function GET(request) {
  const session = getSession(request);
  if (session === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false });
}
