import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function GET() {
    try {
      const session = await getSession(await cookies());
      return NextResponse.json({
        isLoggedIn: session?.isLoggedIn ?? false,
        userId: session?.userId ?? null,
      });
    } catch (error) {
      console.error("Session check error:", error);
      return NextResponse.json(
        { isLoggedIn: false, error: "Session check failed" },
        { status: 500 }
      );
    }
  }