"use client";

import { AnimatePresence } from "framer-motion";

import React, { useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import { PictureModal } from "@/app/main/_components/picture-modal";
import { PicturesGrid } from "@/app/main/_components/pictures-grid";
import { ApiResponse } from "@/types";
import { Picture } from "@/types/picture";

interface SessionCached {
    accessToken: string;
}

export default function Home() {
    const searchParams = useSearchParams();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [picturesData, setPicturesData] = useState<Picture[]>([]);
    const [filteredPictures, setFilteredPictures] = useState<Picture[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getAccessToken = useCallback((): string | null => {
        if (typeof window === "undefined") return null;

        try {
            const session = localStorage.getItem("session");
            if (!session) return null;

            const parsed = JSON.parse(session) as unknown;
            return isSessionData(parsed) ? parsed.accessToken : null;
        } catch (error) {
            console.error("Error parsing session:", error);
            return null;
        }
    }, []);

    const isSessionData = (data: unknown): data is SessionCached => {
        return !!(
            data &&
            typeof data === "object" &&
            "accessToken" in data &&
            typeof (data as SessionCached).accessToken === "string"
        );
    };

    const processImageUrl = (url: string): string => {
        try {
            const urlObj = new URL(url);
            urlObj.hostname = window.location.hostname;
            return urlObj.origin + urlObj.pathname;
        } catch {
            console.log(url.replace("minio:", "localhost:").split("?")[0]);
            return url.replace("minio:", "localhost:").split("?")[0];
        }
    };

    const fetchPictures = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const accessToken = getAccessToken();
            if (!accessToken) {
                throw new Error("Authentication required");
            }

            const params = new URLSearchParams({
                Page: "1",
                PageSize: "10",
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BACKEND_URL}/Images?${params}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "*/*",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: ApiResponse = (await response.json()) as ApiResponse;
            const transformImage = (item: ApiResponse["result"]["value"]["items"][0]): Picture => ({
                id: item.id,
                date: new Date(item.uploadDate).toLocaleDateString(),
                url: processImageUrl(item.presignedDownloadUrl),
                uploadDate: item.uploadDate,
                description: item.processingResult.description || "",
                objects: item.processingResult.objects as string[],
                text: item.processingResult.text || "",
                category: "default",
                processingResult: item.processingResult,
            });
            setPicturesData(data.result.value.items.map(transformImage));
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error occurred";
            setError(message);

            if (message === "Authentication required") {
                window.location.href = "/login";
            }
        } finally {
            setLoading(false);
        }
    }, [getAccessToken]);

    // Filter pictures based on search params
    useEffect(() => {
        if (picturesData.length === 0) return;

        let filtered = [...picturesData];

        // Filter by description
        const description = searchParams.get("description");
        if (description) {
            filtered = filtered.filter((pic) => pic.description.toLowerCase().includes(description.toLowerCase()));
        }

        // Filter by objects
        const objects = searchParams.get("objects");
        const noObjects = searchParams.get("noObjects") === "true";

        if (objects) {
            const objectsList = objects.split(",");
            filtered = filtered.filter((pic) => objectsList.some((obj) => pic.objects.includes(obj)));
        } else if (noObjects) {
            filtered = filtered.filter((pic) => pic.objects.length === 0);
        }

        // Filter by text
        const text = searchParams.get("text");
        const noText = searchParams.get("noText") === "true";

        if (text) {
            filtered = filtered.filter((pic) => pic.text.toLowerCase().includes(text.toLowerCase()));
        } else if (noText) {
            filtered = filtered.filter((pic) => !pic.text || pic.text.trim() === "");
        }

        // Filter by date range
        const dateFrom = searchParams.get("dateFrom");
        const dateTo = searchParams.get("dateTo");

        if (dateFrom) {
            const fromDate = new Date(dateFrom);
            filtered = filtered.filter((pic) => new Date(pic.uploadDate) >= fromDate);
        }

        if (dateTo) {
            const toDate = new Date(dateTo);
            filtered = filtered.filter((pic) => new Date(pic.uploadDate) <= toDate);
        }

        setFilteredPictures(filtered);
    }, [searchParams, picturesData]);

    useEffect(() => {
        void fetchPictures();
    }, [fetchPictures]);

    const getUniqueDates = useCallback(
        (arr: Picture[]): string[] => [...new Set(arr.map((picture) => picture.date))],
        [],
    );

    const handlePictureSelect = useCallback(
        (picture: Picture) => {
            const index = picturesData.findIndex((p) => p.id === picture.id);
            setSelectedIndex(index);
        },
        [picturesData],
    );

    const handleReload = useCallback(() => {
        window.location.reload();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-500">
                <h2 className="mb-4 text-2xl font-bold">Error loading images</h2>
                <p>{error}</p>
                <button
                    onClick={handleReload}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const displayPictures = filteredPictures.length > 0 ? filteredPictures : [];

    return (
        <main tabIndex={-1}>
            <div className="mx-auto pt-11 pb-40" tabIndex={-1}>
                {getUniqueDates(displayPictures).map((date) => (
                    <div key={date} tabIndex={-1}>
                        <PicturesGrid
                            picturesDate={date}
                            pictures={displayPictures.filter((p) => p.date === date)}
                            onPictureSelect={handlePictureSelect}
                        />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <PictureModal
                        pictures={displayPictures}
                        initialIndex={selectedIndex}
                        onClose={() => {
                            setSelectedIndex(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
