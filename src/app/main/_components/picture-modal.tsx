"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { SwipeableHandlers, SwipeableProps, useSwipeable } from "react-swipeable";

import Image from "next/image";

import type { Picture } from "@/types/picture";

interface PictureModalProps {
    pictures: Picture[];
    initialIndex: number;
    onClose: () => void;
}

export function PictureModal({ pictures, initialIndex, onClose }: PictureModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === pictures.length - 1;
    const currentPicture = pictures[currentIndex];

    const handleNext = useCallback(() => {
        if (!isLast) setCurrentIndex((prev) => prev + 1);
    }, [isLast]);

    const handlePrevious = useCallback(() => {
        if (!isFirst) setCurrentIndex((prev) => prev - 1);
    }, [isFirst]);

    // Обработчик свайпов
    const swipeConfig: SwipeableProps = {
        onSwipedLeft: () => {
            handleNext();
        },
        onSwipedRight: () => {
            handlePrevious();
        },
        trackMouse: true,
        preventScrollOnSwipe: true,
    };

    const swipeHandlers: SwipeableHandlers = useSwipeable(swipeConfig);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handlePrevious();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleNext, handlePrevious, onClose]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                {...swipeHandlers}
                layoutId={`product-${currentPicture.id}`}
                className="fixed inset-x-4 bottom-0 z-50 overflow-hidden rounded-t-xl bg-white max-md:h-[80vh] md:inset-[25%] md:h-[50vh] md:rounded-xl dark:bg-zinc-900"
            >
                <div className="relative h-full md:flex">
                    <div className="relative mx-auto md:w-3/5">
                        <div className="relative h-full w-full max-md:h-[300px]">
                            <Image
                                fill
                                src={currentPicture.picture}
                                alt={currentPicture.name}
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 rounded-md bg-white/80 p-1.5 backdrop-blur-sm dark:bg-black/50"
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div className="flex flex-col p-3 md:w-3/5">
                        <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h2 className="text-sm font-medium">{currentPicture.name}</h2>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {currentIndex + 1} из {pictures.length}
                                    </p>
                                </div>
                                <p className="text-sm font-medium">Бла бла бла бла</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-zinc-600 dark:text-zinc-300">Блу блу блу блу</p>
                                <div className="space-y-1 text-xs">
                                    <p className="text-zinc-500">SKU: {currentPicture.id}</p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute right-4 bottom-4 flex gap-2 max-md:hidden">
                            <button
                                onClick={handlePrevious}
                                className={`rounded-md p-2 shadow-lg backdrop-blur-sm transition-all ${
                                    isFirst
                                        ? "cursor-not-allowed bg-white/50 opacity-50 dark:bg-black/30"
                                        : "bg-white/80 hover:bg-white/90 dark:bg-black/50 dark:hover:bg-black/70"
                                }`}
                                disabled={isFirst}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleNext}
                                className={`rounded-md p-2 shadow-lg backdrop-blur-sm transition-all ${
                                    isLast
                                        ? "cursor-not-allowed bg-white/50 opacity-50 dark:bg-black/30"
                                        : "bg-white/80 hover:bg-white/90 dark:bg-black/50 dark:hover:bg-black/70"
                                }`}
                                disabled={isLast}
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
