"use client";

import React, { useState } from "react";

import { SearchCardOrDrawer } from "@/app/main/_components/search/search-card-or-drawer";
import { FilePreview } from "@/types/file-preview";

import { DragDropProvider } from "./_components/drag-drop-provider";
import { UploadCardOrDrawer } from "./_components/upload/upload-card-or-drawer";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const [files, setFiles] = useState<FilePreview[]>([]);

    const handleDrop = (acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => {
            const fileWithId = new File([file], file.name, {
                type: file.type,
                lastModified: file.lastModified,
            });

            return Object.assign(fileWithId, {
                preview: URL.createObjectURL(fileWithId),
                id: Math.random().toString(36).slice(2, 11),
            });
        });

        setFiles((prev) => [...prev, ...newFiles]);
    };

    return (
        <DragDropProvider onDropFiles={handleDrop} currentFilesCount={files.length}>
            <div className="flex flex-col md:flex-row">
                <div className="w-full content-center justify-center md:w-85 md:content-start">
                    <div className="fixed bottom-0 z-50 md:sticky md:top-15">
                        <SearchCardOrDrawer />
                    </div>
                </div>

                <div className="flex-grow p-3 md:overflow-y-auto md:p-5">{children}</div>

                <div className="w-full content-center justify-center md:w-85 md:content-start">
                    <div className="fixed bottom-0 left-15 z-50 md:sticky md:top-15">
                        <UploadCardOrDrawer files={files} setFiles={setFiles} />
                    </div>
                </div>
            </div>
        </DragDropProvider>
    );
}
