import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "../../../../lib/db.js";
import LoginData from "../../../../lib/model.js";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session || session.value !== "authenticated") {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const data = await LoginData.find().sort({ timestamp: -1 });
  return NextResponse.json(data);
}
