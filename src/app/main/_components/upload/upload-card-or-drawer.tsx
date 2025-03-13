 
 
 
"use client";

import { Plus } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FilePreview } from "@/types/file-preview";

import { UploadForm } from "./upload-form";

 
 
 

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

interface UploadCardOrDrawerProps {
    files: FilePreview[];
    setFiles: React.Dispatch<React.SetStateAction<FilePreview[]>>;
}

export function UploadCardOrDrawer({ files, setFiles }: UploadCardOrDrawerProps) {
    const [open, setOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const getAccessToken = () => {
        if (typeof window === "undefined") return null;
        const session = localStorage.getItem("session");
        return session ? JSON.parse(session).accessToken : null;
    };

    const handleUpload = async (filesToUpload: File[]) => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            console.error("No access token found");
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();

            // Добавляем файлы с правильным именем поля
            filesToUpload.forEach((file) => {
                formData.append("Files", file); // Точное имя поля как в cURL
            });

            const response = await fetch("http://localhost:8080/api/Images", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "*/*", // Добавляем заголовок accept
                },
                body: formData,
                // Не указываем Content-Type - браузер сам добавит с boundary
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setFiles([]);
            console.log("Files uploaded successfully");
        } catch (error) {
            console.error("Upload failed:", error);
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
                    <Plus className="h-5 w-5" />
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
