import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        return NextResponse.json({
            isLoggedIn: session?.isLoggedIn ?? false,
            userId: session?.userId ?? null,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ isLoggedIn: false, error: "Session check failed" }, { status: 500 });
    }
}
