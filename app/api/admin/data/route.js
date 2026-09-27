import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db.js";
import LoginData from "../../../../lib/model.js";

function getSession(request) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  const cookies = Object.fromEntries(cookieHeader.split(";").map((c) => c.trim().split("=")));
  return cookies.admin_session;
}

export async function GET(request) {
  const session = getSession(request);
  if (session !== "authenticated") {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  await connectDB();
  const data = await LoginData.find().sort({ timestamp: -1 });
  return NextResponse.json(data);
}
