import { NextResponse } from "next/server";
import connectDB from "../../../lib/db.js";
import LoginData from "../../../lib/model.js";

export async function POST(request) {
  const { email, password } = await request.json();
  await connectDB();
  await LoginData.create({ email, password });
  return NextResponse.json({ success: true });
}
