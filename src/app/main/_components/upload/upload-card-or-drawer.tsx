"use client";

import { Upload } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilePreview } from "@/types/file-preview";

import { UploadForm } from "./upload-form";

interface UploadCardOrDrawerProps {
    files: FilePreview[];
    setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
}

export function UploadCardOrDrawer({ files, setFiles }: UploadCardOrDrawerProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleUpload = async (filesToUpload: File[]) => {
        try {
            setIsUploading(true);
            // Реальная логика загрузки
            console.log("Начало загрузки файлов:", filesToUpload);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Файлы успешно загружены");
        } catch (error) {
            console.error("Ошибка загрузки:", error);
            throw error;
        } finally {
            setIsUploading(false);
        }
    };

    if (isDesktop) {
        return (
            <Card className="m-4 max-h-[calc(65vh-2.5rem)]">
                <CardHeader>
                    <CardTitle className="text-xl">Загрузка изображений</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[calc(100vh-180px)]">
                        <UploadForm
                            files={files}
                            setFiles={setFiles}
                            onUpload={handleUpload}
                            isUploading={isUploading}
                        />
                    </ScrollArea>
                </CardContent>
            </Card>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline" className="m-4 h-12 w-12">
                    <Upload className="h-5 w-5" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <DrawerHeader>
                    <DrawerTitle className="text-xl">Загрузка изображений</DrawerTitle>
                </DrawerHeader>
                <ScrollArea className="h-full pr-4">
                    <UploadForm files={files} setFiles={setFiles} onUpload={handleUpload} isUploading={isUploading} />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
