"use client";

import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Download, Pen, X } from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { type SwipeableHandlers, type SwipeableProps, useSwipeable } from "react-swipeable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import Image from "next/image";

import { ObjectsCombobox } from "@/app/main/_components/search/objects-combobox";
import { testObjects } from "@/app/main/_data/search/objects";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Picture } from "@/types/picture";

interface PictureModalProps {
    pictures: Picture[];
    initialIndex: number;
    onClose: () => void;
}

export function PictureModal({ pictures, initialIndex, onClose }: PictureModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === pictures.length - 1;
    const currentPicture = pictures[currentIndex];
    const [isZoomed, setIsZoomed] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedParagraph, setSelectedParagraph] = useState<number | null>(null);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [objects, setObjects] = useState(new Map(testObjects.map((testObject) => [testObject.name, false])));

    const copyToClipboard = useCallback((text: string, index: number) => {
        // Проверяем, поддерживается ли clipboard API
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopiedIndex(index);

                // Сбрасываем состояние после задержки
                setTimeout(() => {
                    setCopiedIndex(null);
                }, 2000);
            })
            .catch((err: unknown) => {
                console.error("Failed to copy text: ", err);
            });
    }, []);

    const handleNext = useCallback(() => {
        if (!isLast) setCurrentIndex((prev) => prev + 1);
    }, [isLast]);

    const handlePrevious = useCallback(() => {
        if (!isFirst) setCurrentIndex((prev) => prev - 1);
    }, [isFirst]);

    // Swipe handlers
    const swipeConfig: SwipeableProps = {
        onSwipedLeft: () => {
            if (!isZoomed) handleNext();
        },
        onSwipedRight: () => {
            if (!isZoomed) handlePrevious();
        },
        trackMouse: true,
        preventScrollOnSwipe: true,
    };

    const swipeHandlers: SwipeableHandlers = useSwipeable(swipeConfig);

    const handleDownload = useCallback(() => {
        const link = document.createElement("a");
        link.href = currentPicture.url;
        link.download = `image-${currentPicture.id}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [currentPicture.url, currentPicture.id]);

    const handleSaveChange = () => {
        setIsEdit(false);

        pictures[currentIndex].text = text;
        pictures[currentIndex].description = description;
        pictures[currentIndex].objects = Array.from(objects.entries())
            .filter(([name, isTrue]) => name !== "" && isTrue)
            .map(([name]) => name);
    };

    const setObjectNameToTrue = (name: unknown) => {
        setObjects((prevObjects) => {
            const newObjects = new Map(prevObjects);
            newObjects.set(name as string, true);
            return newObjects;
        });
    };

    useEffect(() => {
        currentPicture.processingResult?.objects.forEach((object) => {
            setObjectNameToTrue(object);
        });
        setText(currentPicture.processingResult?.text ?? "");
        setDescription(currentPicture.processingResult?.description ?? "");
    }, [currentPicture]);

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
                transition={{ duration: 0.2 }} // Faster animation
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
                onClick={onClose}
            />

            <motion.div
                {...swipeHandlers}
                layoutId={`product-${currentPicture.id}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Faster but smoother animation
                className="fixed inset-x-4 bottom-0 z-50 overflow-hidden rounded-t-xl bg-white max-md:h-[85vh] md:inset-[20%] md:h-[60vh] md:rounded-xl dark:bg-zinc-900"
            >
                <div className="relative h-full md:flex">
                    <div className="relative mx-auto md:w-3/5">
                        <div
                            className="relative h-full w-full cursor-zoom-in max-md:h-[350px]" // Bigger picture
                            onClick={() => {
                                setIsZoomed(true);
                            }}
                        >
                            <Image
                                fill
                                src={currentPicture.url || "/placeholder.svg"}
                                alt={`Image ${currentPicture.id}`}
                                className="object-contain select-none"
                                draggable={false}
                                onDragStart={(e) => {
                                    e.preventDefault();
                                }}
                                priority
                            />
                        </div>
                    </div>

                    <motion.button
                        onClick={onClose}
                        className="absolute top-2 right-2 rounded-md bg-white/80 p-1.5 backdrop-blur-sm dark:bg-black/50"
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <X className="h-4 w-4" />
                    </motion.button>

                    <div className="flex flex-col p-3 md:w-3/5">
                        <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <p className="pr-8 text-sm font-medium">{currentPicture.date}</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {currentIndex + 1} из {pictures.length}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2 rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-800">
                                {currentPicture.processingResult?.description && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Описание</h3>
                                        {isEdit ? (
                                            <Textarea
                                                className="h-18 max-h-280 min-h-10 w-full select-none"
                                                placeholder="Описание"
                                                rows={4}
                                                value={description}
                                                onChange={(e) => {
                                                    setDescription(e.target.value);
                                                }}
                                            />
                                        ) : (
                                            <motion.div
                                                className={`group relative cursor-pointer rounded-lg transition-all ${
                                                    selectedParagraph === 0
                                                        ? "bg-primary/10 border-primary border-l-4"
                                                        : "hover:bg-muted/50"
                                                }`}
                                                onClick={() => {
                                                    setSelectedParagraph(selectedParagraph === 0 ? null : 0);
                                                    copyToClipboard(
                                                        currentPicture.processingResult?.description ?? "",
                                                        0,
                                                    );
                                                }}
                                                whileHover={{ x: 5 }}
                                                animate={{
                                                    x: selectedParagraph === 0 ? 5 : 0,
                                                    transition: { duration: 0.2 },
                                                }}
                                            >
                                                <p className="pr-6 text-white">
                                                    {currentPicture.processingResult.description}
                                                </p>
                                                <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                                    {copiedIndex === 0 ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="text-muted-foreground h-4 w-4" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {currentPicture.processingResult?.objects &&
                                    currentPicture.processingResult.objects.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">Объекты</h3>
                                            {isEdit ? (
                                                <ObjectsCombobox
                                                    title="Объекты"
                                                    values={objects}
                                                    setValues={setObjects}
                                                />
                                            ) : (
                                                <motion.div
                                                    className={`group relative cursor-pointer rounded-lg transition-all ${
                                                        selectedParagraph === 1
                                                            ? "bg-primary/10 border-primary border-l-4"
                                                            : "hover:bg-muted/50"
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedParagraph(selectedParagraph === 1 ? null : 1);
                                                        copyToClipboard(
                                                            Array.isArray(currentPicture.processingResult?.objects)
                                                                ? currentPicture.processingResult.objects.join(", ")
                                                                : "",
                                                            1,
                                                        );
                                                    }}
                                                    whileHover={{ x: 5 }}
                                                    animate={{
                                                        x: selectedParagraph === 1 ? 5 : 0,
                                                        transition: { duration: 0.2 },
                                                    }}
                                                >
                                                    <p className="pr-6 text-white">
                                                        {Array.isArray(currentPicture.processingResult.objects)
                                                            ? currentPicture.processingResult.objects.join(", ")
                                                            : ""}
                                                    </p>
                                                    <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                                        {copiedIndex === 1 ? (
                                                            <Check className="h-4 w-4 text-green-500" />
                                                        ) : (
                                                            <Copy className="text-muted-foreground h-4 w-4" />
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>
                                    )}

                                {currentPicture.processingResult?.text && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">Распознанный текст</h3>
                                        {isEdit ? (
                                            <Textarea
                                                className="h-18 max-h-280 min-h-10 w-full select-none"
                                                placeholder="Распознанный текст"
                                                rows={4}
                                                value={text}
                                                onChange={(e) => {
                                                    setText(e.target.value);
                                                }}
                                            />
                                        ) : (
                                            <motion.div
                                                className={`group relative cursor-pointer rounded-lg transition-all ${
                                                    selectedParagraph === 2
                                                        ? "bg-primary/10 border-primary border-l-4"
                                                        : "hover:bg-muted/50"
                                                }`}
                                                onClick={() => {
                                                    setSelectedParagraph(selectedParagraph === 2 ? null : 2);
                                                    copyToClipboard(currentPicture.processingResult?.text ?? "", 2);
                                                }}
                                                whileHover={{ x: 5 }}
                                                animate={{
                                                    x: selectedParagraph === 2 ? 5 : 0,
                                                    transition: { duration: 0.2 },
                                                }}
                                            >
                                                <p className="pr-6 text-white">
                                                    {currentPicture.processingResult.text}
                                                </p>
                                                <div className="absolute top-1/2 right-2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                                                    {copiedIndex === 2 ? (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <Copy className="text-muted-foreground h-4 w-4" />
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute right-4 bottom-4 flex gap-2">
                            {isEdit ? (
                                <Button onClick={handleSaveChange}>Сохранить</Button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEdit(true);
                                        }}
                                        className="rounded-md bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white/90 dark:bg-black/50 dark:hover:bg-black/70"
                                    >
                                        <Pen className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={handleDownload}
                                        className="rounded-md bg-white/80 p-2 shadow-lg backdrop-blur-sm hover:bg-white/90 dark:bg-black/50 dark:hover:bg-black/70"
                                    >
                                        <Download className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={handlePrevious}
                                        className={`rounded-md p-2 shadow-lg backdrop-blur-sm transition-all max-md:hidden ${
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
                                        className={`rounded-md p-2 shadow-lg backdrop-blur-sm transition-all max-md:hidden ${
                                            isLast
                                                ? "cursor-not-allowed bg-white/50 opacity-50 dark:bg-black/30"
                                                : "bg-white/80 hover:bg-white/90 dark:bg-black/50 dark:hover:bg-black/70"
                                        }`}
                                        disabled={isLast}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                {isZoomed && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TransformWrapper
                            initialScale={1}
                            minScale={0.1}
                            maxScale={8}
                            centerOnInit
                            doubleClick={{ disabled: true }}
                            pinch={{ step: 0.1 }}
                            wheel={{ step: 0.1 }}
                        >
                            {({ resetTransform, zoomIn, zoomOut }) => (
                                <>
                                    {/* Zoom control buttons */}
                                    <div className="absolute top-4 left-4 z-50 flex gap-2">
                                        <button
                                            onClick={() => {
                                                zoomIn();
                                            }}
                                            className="rounded-full bg-black/50 p-2 text-white"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => {
                                                zoomOut();
                                            }}
                                            className="rounded-full bg-black/50 p-2 text-white"
                                        >
                                            -
                                        </button>
                                        <button
                                            onClick={() => {
                                                resetTransform();
                                            }}
                                            className="rounded-full bg-black/50 p-2 text-white"
                                        >
                                            ⎌
                                        </button>
                                    </div>

                                    <TransformComponent
                                        wrapperStyle={{
                                            width: "100%",
                                            height: "100%",
                                            position: "relative",
                                            touchAction: "none",
                                        }}
                                    >
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={currentPicture.url || "/placeholder.svg"}
                                                alt={`Image ${currentPicture.id}`}
                                                fill
                                                className="object-contain"
                                                priority
                                                draggable={false}
                                                onLoad={() => {
                                                    resetTransform();
                                                }}
                                                sizes="(max-width: 768px) 100vw, 80vw"
                                                onContextMenu={(e) => {
                                                    e.preventDefault();
                                                }}
                                            />
                                        </div>
                                    </TransformComponent>

                                    <motion.button
                                        onClick={() => {
                                            resetTransform();
                                            setIsZoomed(false);
                                        }}
                                        className="absolute top-4 right-4 z-50 rounded-full bg-black/50 p-2 text-white"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="h-8 w-8 stroke-[1.5]" />
                                    </motion.button>
                                </>
                            )}
                        </TransformWrapper>
                    </motion.div>
                )}
            </motion.div>
        </>
    );
}
