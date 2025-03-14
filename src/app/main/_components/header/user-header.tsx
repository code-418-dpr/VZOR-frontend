"use client";

import { KeyRound, LogOut, User } from "lucide-react";

import * as React from "react";
import { useEffect, useState } from "react";

import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { SessionCached } from "@/types";

interface Props {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setField: React.Dispatch<React.SetStateAction<string>>;
}

export default function UserHeader({ setOpen, setField }: Props) {
    const { logout } = useAuth();
    const [username, setUsername] = useState<string | null>(null);

    const handleLogout = () => {
        void logout();
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessionData = localStorage.getItem("session");
            if (sessionData) {
                try {
                    const session = JSON.parse(sessionData) as SessionCached;
                    setUsername(session.username as string | null);
                } catch (error) {
                    console.error("Ошибка парсинга session из localStorage:", error);
                }
            }
        }
    }, []);
    return (
        <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
                <DropdownMenuLabel>{username}</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Имя");
                    }}
                >
                    <User />
                    <span>Изменить имя</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        setOpen(true);
                        setField("Пароль");
                    }}
                >
                    <KeyRound />
                    <span>Изменить пароль</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut />
                    <span>Выход</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
}
