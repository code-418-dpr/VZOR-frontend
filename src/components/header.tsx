"use client";

import * as React from "react";
import { useEffect, useState } from "react";

import AdminDialogOrDrawer from "@/app/admin/_components/header/admin-dialog-or-drawer";
import AdminHeader from "@/app/admin/_components/header/admin-header";
import UserDialogOrDrawer from "@/app/main/_components/header/user-dialog-or-drawer";
import UserHeader from "@/app/main/_components/header/user-header";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SessionCached } from "@/types";

export default function Header() {
    const [role, setRole] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [field, setField] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sessionData = localStorage.getItem("session");
            if (sessionData) {
                try {
                    const session = JSON.parse(sessionData) as SessionCached;
                    setRole(session.role as string | null);
                } catch (error) {
                    console.error("Ошибка парсинга session из localStorage:", error);
                }
            }
        }
    }, []);

    return (
        <header>
            <div
                className={cn(
                    "bg-background/70 fixed top-0 right-0 left-0 z-50 border-b opacity-100 backdrop-blur-md transition-opacity duration-500 ease-in-out",
                )}
            >
                <div className="mx-4 flex h-16 max-w-7xl items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                    <div>
                        <Logo className="select-none" width={120} />
                    </div>
                </div>
            </div>

            <div className="fixed right-0 z-50 mx-4 flex h-16 items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer select-none">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    {role === "admin" ? (
                        <AdminHeader setOpen={setOpen} setField={setField} />
                    ) : (
                        <UserHeader setOpen={setOpen} setField={setField} />
                    )}
                </DropdownMenu>
                <ModeToggle />
            </div>
            {role === "admin" ? (
                <AdminDialogOrDrawer field={field} open={open} setOpen={setOpen} />
            ) : (
                <UserDialogOrDrawer field={field} open={open} setOpen={setOpen} />
            )}
        </header>
    );
}
