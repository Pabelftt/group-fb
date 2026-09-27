import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/db.js";
import LoginData from "../../../../lib/model.js";

export async function POST(request) {
  const { email, password } = await request.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail || password !== adminPassword) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.create("admin_session", "authenticated", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/admin",
  });

  return NextResponse.json({ success: true });
}
