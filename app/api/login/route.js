import { saveLoginData } from "../../../lib/data.js";

export async function POST(request) {
  const { email, password } = await request.json();
  saveLoginData(email, password);
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
