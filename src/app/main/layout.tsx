import React from "react";

import { SearchSidebar } from "@/app/main/_components/search-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <SearchSidebar />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}
