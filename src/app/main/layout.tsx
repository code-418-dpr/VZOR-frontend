import React from "react";

import { SearchSidebar } from "@/app/main/_components/search/search-sidebar";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="justify-center content-center md:content-start w-full md:w-85">
                <div className="fixed md:sticky bottom-0 md:top-5">
                    <SearchSidebar />
                </div>
            </div>
            <div className="flex-grow p-3 md:overflow-y-auto md:p-5">{children}</div>
        </div>
    );
}
