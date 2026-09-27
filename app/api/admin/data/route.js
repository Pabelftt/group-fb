import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db.js";
import LoginData from "../../../../lib/model.js";

export async function GET(request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader || !cookieHeader.includes("admin_session=authenticated")) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  await connectDB();
  const data = await LoginData.find().sort({ timestamp: -1 });
  return NextResponse.json(data);
}
