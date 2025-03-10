import { motion } from "motion/react";

import Image from "next/image";

import type { Picture } from "@/types/picture";

interface PicturesGridProps {
    pictures: Picture[];
    onPictureSelect: (picture: Picture) => void;
    picturesDate: string;
}

export function PicturesGrid({ pictures, onPictureSelect, picturesDate }: PicturesGridProps) {
    return (
        <div className="mt-8">
            <p className="mb:text-3xl mb-6 text-xl font-bold">{picturesDate}</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {pictures.map((picture) => (
                    <motion.div
                        key={picture.id}
                        layoutId={`product-${picture.id}`}
                        onClick={() => {
                            onPictureSelect(picture);
                        }}
                        className="group cursor-pointer"
                        whileHover={{ y: -1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-white dark:bg-zinc-900">
                            <Image
                                fill
                                src={picture.picture}
                                alt={picture.name}
                                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="mt-1.5 space-y-0.5">
                            <h3 className="truncate text-xs font-medium">{picture.name}</h3>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Инфа</p>
                                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Инфа</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
