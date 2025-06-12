"use client";

import { Plus } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { SessionCached } from "@/types";
import { FilePreview } from "@/types/file-preview";
import { Envelope } from "@/types/responses/envelope";
import { ResultWith } from "@/types/responses/result";
import { UploadImageInS3Response } from "@/types/responses/uploadImageInS3Response";

import { UploadForm } from "./upload-form";

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
        try {
            const session = localStorage.getItem("session");
            if (!session) return null;

            const parsed: unknown = JSON.parse(session);

            // Валидация типа
            if (isSessionData(parsed)) {
                return parsed.accessToken;
            }
            return null;
        } catch (error) {
            console.error("Error parsing session:", error);
            return null;
        }
    };
    const isSessionData = (data: unknown): data is SessionCached => {
        return !!(
            data &&
            typeof data === "object" &&
            "accessToken" in data &&
            typeof (data as unknown as SessionCached).accessToken === "string"
        );
    };
    const handleUpload = async (filesToUpload: File[]) => {
        const accessToken = getAccessToken();

        if (!accessToken) {
            console.error("No access token found");
            return;
        }

        setIsUploading(true);

        try {
            console.log(
                JSON.stringify({
                    files: filesToUpload.map((file) => ({ contentType: file.type, fileName: file.name })),
                }),
            );

            const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BACKEND_URL}/Images/uploading`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "*/*",
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({
                    files: filesToUpload.map((file) => ({ contentType: file.type, fileName: file.name })),
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = (await response.json()) as Envelope<ResultWith<UploadImageInS3Response>>;

            for (let i = 0; i < filesToUpload.length; ++i) {
                await fetch(json.result!.value!.urls[i].url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": filesToUpload[i].type,
                    },
                    body: filesToUpload[i],
                });
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
                            setFilesAction={setFiles}
                            onUploadAction={handleUpload}
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
                    <UploadForm
                        files={files}
                        setFilesAction={setFiles}
                        onUploadAction={handleUpload}
                        isUploading={isUploading}
                    />
                </ScrollArea>
            </DrawerContent>
        </Drawer>
    );
}
