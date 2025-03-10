import { NextResponse } from "next/server";

export function POST() {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("session");
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
}
