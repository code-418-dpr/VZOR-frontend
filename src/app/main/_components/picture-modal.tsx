"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";

import Image from "next/image";

import type { Picture } from "@/types/picture";

interface PictureModalProps {
    picture: Picture;
    onClose: () => void;
}

export function PictureModal({ picture, onClose }: PictureModalProps) {
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black"
                onClick={onClose}
            />
            <motion.div
                layoutId={`product-${picture.id}`}
                className="fixed inset-x-4 bottom-0 z-50 max-h-[80vh] overflow-hidden rounded-t-xl bg-white md:inset-[25%] md:max-h-[500px] md:rounded-xl dark:bg-zinc-900"
            >
                <div className="h-full md:flex">
                    <div className="relative md:w-2/5">
                        <Image
                            src={picture.picture}
                            alt={picture.name}
                            className="h-[200px] w-full object-cover md:h-full"
                        />
                        <button
                            onClick={onClose}
                            className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 backdrop-blur-sm dark:bg-black/50"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex flex-col p-3 md:w-3/5">
                        <div className="flex-1">
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h2 className="text-sm font-medium">{picture.name}</h2>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Картинка с текстом</p>
                                </div>
                                <p className="text-sm font-medium">Бла бла бла бла</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs text-zinc-600 dark:text-zinc-300">Блу блу блу блу</p>
                                <div className="space-y-1 text-xs">
                                    <p className="text-zinc-500">SKU: {picture.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
