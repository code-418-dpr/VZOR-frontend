import { motion } from "motion/react";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { Picture } from "@/types/picture";

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
            id={`picture-${picture.id}`}
            layoutId={`product-${picture.id}`}
            onClick={() => {
                onPictureSelect(picture);
            }}
            className="group cursor-pointer"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-white dark:bg-zinc-900">
                {!isLoaded && (
                    <Skeleton className="h-full w-full animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800" />
                )}

                {isInView && (
                    <Image
                        fill
                        src={picture.picture}
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
                    />
                )}
            </div>

            <div className="mt-1.5 space-y-0.5">
                {!isLoaded ? (
                    <>
                        <Skeleton className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                            <Skeleton className="h-3 w-1/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="truncate text-xs font-medium">{picture.name}</h3>
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Инфа</p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Инфа</p>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
}
