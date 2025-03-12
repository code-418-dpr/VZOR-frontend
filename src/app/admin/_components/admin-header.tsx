import * as React from "react";

import AdminDialogOrDrawer from "@/app/admin/_components/admin-dialog-or-drawer";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/theming/mode-toggle";
import { cn } from "@/lib/utils";

export default function AdminHeader() {
    return (
        <header>
            <div
                className={cn(
                    "bg-background/70 fixed top-0 right-0 left-0 z-50 border-b opacity-100 backdrop-blur-md transition-opacity duration-500 ease-in-out",
                )}
            >
                <div className="mx-4 flex h-16 max-w-7xl items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                    <div>
                        <Logo width={120} />
                    </div>
                </div>
            </div>

            <div className="fixed right-0 z-50 mx-4 flex h-16 items-center space-x-2 sm:mx-12 md:mx-24 lg:mx-48">
                <AdminDialogOrDrawer />
                <ModeToggle />
            </div>
        </header>
    );
}
