"use client";

import { motion } from "motion/react";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import type { Picture } from "@/types/picture";

export function PictureCard({
    picture,
    onPictureSelect,
}: {
    picture: Picture;
    onPictureSelect: (picture: Picture) => void;
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);

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
                onPictureSelect(picture);
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
                        src={picture.picture || "/placeholder.svg"}
                        alt={picture.name}
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
                        <Skeleton className="h-5 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <Skeleton className="h-4 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="truncate text-base font-medium">{picture.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">Инфа</p>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">Инфа</p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
