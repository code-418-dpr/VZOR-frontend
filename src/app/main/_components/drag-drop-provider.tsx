"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DragDropProviderProps {
    children: React.ReactNode;
    onDropFiles: (files: File[]) => void;
    currentFilesCount: number;
}

export function DragDropProvider({ children, onDropFiles, currentFilesCount }: DragDropProviderProps) {
    const [isDragActive, setIsDragActive] = useState(false);
    const maxFiles = 20;
    const remainingSlots = maxFiles - currentFilesCount;

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setIsDragActive(false);
            const filesToAdd = acceptedFiles.slice(0, remainingSlots);
            onDropFiles(filesToAdd);
        },
        [onDropFiles, remainingSlots],
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        onDragEnter: () => {
            setIsDragActive(true);
        },
        onDragLeave: () => {
            setIsDragActive(false);
        },
        noClick: true,
        accept: { "image/*": [] },
        maxSize: 10 * 1024 * 1024,
        maxFiles: remainingSlots,
    });

    return (
        <div {...getRootProps()} className="relative h-full">
            <input {...getInputProps()} />

            {/* Индикатор перетаскивания */}
            {isDragActive && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-background border-primary rounded-lg border-4 border-dashed p-6 text-center">
                        <p className="mb-2 text-2xl font-bold">Отпустите файл для загрузки</p>
                        <p className="text-muted-foreground text-lg">Осталось места: {remainingSlots}</p>
                    </div>
                </div>
            )}

            {children}
        </div>
    );
}
