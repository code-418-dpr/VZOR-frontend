"use client";

import { motion } from "motion/react";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import type { Picture } from "@/types/picture";

interface Props {
    picture: Picture;
    onPictureSelectAction: (picture: Picture) => void;
}

export function PictureCard({ picture, onPictureSelectAction }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const formatTime = (uploadDate: string) => {
        try {
            const date = new Date(uploadDate);
            if (isNaN(date.getTime())) return "Нет данных";

            return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                // second: '2-digit' // раскомментируйте если нужны секунды
            });
        } catch {
            return "Нет данных";
        }
    };
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.disconnect();
            }
        });

        const element = document.getElementById(`picture-${picture.id}`);
        if (element) observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [picture.id]);

    return (
        <motion.div
            tabIndex={-1}
            id={`picture-${picture.id}`}
            layoutId={`product-${picture.id}`}
            onClick={() => {
                onPictureSelectAction(picture);
            }}
            className="group cursor-pointer select-none"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white dark:bg-zinc-900" tabIndex={-1}>
                {!isLoaded && (
                    <Skeleton className="h-full w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                )}

                {isInView && (
                    <Image
                        fill
                        src={picture.url || "/placeholder.svg"}
                        alt={picture.category}
                        className={`object-cover object-center transition-transform duration-300 group-hover:scale-105 ${
                            !isLoaded ? "opacity-0" : "opacity-100"
                        }`}
                        onLoadingComplete={() => {
                            setIsLoaded(true);
                        }}
                        loading="lazy"
                        draggable={false}
                        onDragStart={(e) => {
                            e.preventDefault();
                        }}
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                )}
            </div>

            <div className="mt-3 space-y-1">
                {!isLoaded ? (
                    <>
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <Skeleton className="h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">{formatTime(picture.uploadDate)}</p>
                    </>
                )}
            </div>
        </motion.div>
    );
}
