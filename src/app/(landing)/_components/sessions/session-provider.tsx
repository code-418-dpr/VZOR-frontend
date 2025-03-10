"use client";

import { createContext, useContext, useEffect, useState } from "react";

import type { Session } from "@/lib/session";

interface SessionContextType {
    session: Session | null;
    isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
    session: null,
    isLoading: true,
});

export function SessionProvider({
    children,
    session: initialSession,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    const [session, setSession] = useState(initialSession);
    const [isLoading, setIsLoading] = useState(!initialSession);

    useEffect(() => {
        if (!initialSession) {
            void fetch("/api/session")
                .then((res) => res.json())
                .then((data) => {
                    setSession(data as Session);
                    setIsLoading(false);
                });
        }
    }, [initialSession]);

    return <SessionContext.Provider value={{ session, isLoading }}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
