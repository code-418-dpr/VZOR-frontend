import { sealData, unsealData } from "iron-session";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export interface SessionData {
    userId: string;
    isLoggedIn: boolean;
  }

const sessionSecret = process.env.SESSION_SECRET!;
if (!sessionSecret) throw new Error("SESSION_SECRET is not set");
if (sessionSecret.length !== 32) {
    throw new Error(`Invalid SESSION_SECRET length: ${sessionSecret.length} chars (required 32)`);
  }

export const sessionOptions = {
  password: sessionSecret,
  cookieName: "session",
  ttl: 60 * 60 * 24 * 7, // 1 week
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
  },
};

export async function getSession(cookies: ReadonlyRequestCookies) {
  const sessionCookie = cookies.get(sessionOptions.cookieName)?.value;
  if (!sessionCookie) return null;

  return (await unsealData<SessionData>(sessionCookie, {
    password: sessionOptions.password,
  })) as SessionData | null;
}

export async function destroySession() {
  const sealedData = await sealData("", {
    password: sessionOptions.password,
    ttl: 0,
  });

  return new Response(null, {
    headers: {
      "Set-Cookie": `${sessionOptions.cookieName}=${sealedData}; Path=/; ${
        sessionOptions.cookieOptions.secure ? "Secure; " : ""
      }HttpOnly; SameSite=${sessionOptions.cookieOptions.sameSite}; Max-Age=0`,
    },
  });
}

export async function updateSession(session: SessionData) {
  const sealedData = await sealData(session, {
    password: sessionOptions.password,
    ttl: sessionOptions.ttl,
  });

  return new Response(null, {
    headers: {
      "Set-Cookie": `${sessionOptions.cookieName}=${sealedData}; Path=/; ${
        sessionOptions.cookieOptions.secure ? "Secure; " : ""
      }HttpOnly; SameSite=${sessionOptions.cookieOptions.sameSite}; Max-Age=${sessionOptions.ttl}`,
    },
  });
}