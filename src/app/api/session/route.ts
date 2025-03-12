import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

export async function GET() {
    try {
        const session = await getSession();
        return NextResponse.json({
            isLoggedIn: session?.isLoggedIn ?? false,
            userId: session?.userId ?? null,
        });
    } catch (error) {
        return NextResponse.json({ isLoggedIn: false, error }, { status: 500 });
    }
}
