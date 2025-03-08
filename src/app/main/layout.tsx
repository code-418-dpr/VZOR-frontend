import React from "react";

import { SearchSidebar } from "@/app/main/_components/search-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full flex-none md:w-85">
                <div className="sticky top-35">
                    <SearchSidebar />
                </div>
            </div>
            <div className="flex-grow p-4 md:overflow-y-auto md:p-6">{children}</div>
        </div>
    );
}
