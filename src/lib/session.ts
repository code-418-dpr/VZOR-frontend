// lib/session.ts
import { sealData, unsealData } from "iron-session";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type Session = {
    userId: string;
    isLoggedIn: boolean;
} | null;

export async function getSession(): Promise<Session> {
    try {
        const sessionCookie = (await cookies()).get("session")?.value;
        if (!sessionCookie) return null;

        return await unsealData<Session>(sessionCookie, {
            password: process.env.SESSION_SECRET!,
        });
    } catch (error) {
        console.error("Session error:", error);
        return null;
    }
}

export async function createSession(userId: string, response: NextResponse) {
    const sessionData = { userId, isLoggedIn: true };
    const sealed = await sealData(sessionData, {
        password: process.env.SESSION_SECRET!,
        ttl: 60 * 60 * 24 * 7,
    });

    response.cookies.set("session", sealed, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        path: "/",
    });
}
