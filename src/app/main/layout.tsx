import React from "react";

import { SearchSidebar } from "@/app/main/_components/search-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex-none md:w-30">
                <SearchSidebar />
            </div>
            <SidebarInset>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    <SidebarTrigger />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
