import { NextResponse } from "next/server";
import connectDB from "../../../lib/db.js";
import LoginData from "../../../lib/model.js";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }
    await connectDB();
    await LoginData.create({ email, password });
    console.log("Data saved:", email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Failed to save data" }, { status: 500 });
  }
}
