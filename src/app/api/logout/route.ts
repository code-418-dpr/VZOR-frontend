import { NextResponse } from "next/server";
import { destroySession } from "@/lib/session";

export async function POST() {
  const response = await destroySession();
  return new NextResponse(JSON.stringify({ success: true }), {
    status: 200,
    headers: response.headers,
  });
}