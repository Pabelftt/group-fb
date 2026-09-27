import { NextResponse } from "next/server";
import connectDB from "../../../lib/db.js";
import LoginData from "../../../lib/model.js";

export async function GET() {
  await connectDB();
  const data = await LoginData.find().sort({ timestamp: -1 });
  return NextResponse.json(data);
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await LoginData.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
