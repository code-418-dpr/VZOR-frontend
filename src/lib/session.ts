import { sealData, unsealData } from "iron-session";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { Session } from "@/types";

const ONE_WEEK_SEC = 60 * 60 * 24 * 7;

export async function getSession(): Promise<Session> {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return null;

        return await unsealData<Session>(sessionCookie, {
            password: process.env.FRONTEND_FRONTEND_SESSION_SECRET!,
        });
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
}

export async function createSession(userId: string, email: string, response: NextResponse) {
    const sessionData = { userId, email, isLoggedIn: true, success: true };
    const sealed = await sealData(sessionData, {
        password: process.env.FRONTEND_FRONTEND_SESSION_SECRET!,
        ttl: ONE_WEEK_SEC,
    });

    response.cookies.set("session", sealed, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: ONE_WEEK_SEC,
        sameSite: "lax",
        path: "/",
    });
}
