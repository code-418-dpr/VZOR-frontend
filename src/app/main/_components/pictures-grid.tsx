import { motion } from "motion/react";

import Image from "next/image";

import type { Picture } from "@/types/picture";

interface PicturesGridProps {
    pictures: Picture[];
    onPictureSelect: (picture: Picture) => void;
}

export function PicturesGrid({ pictures, onPictureSelect }: PicturesGridProps) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
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
                    <div className="aspect-[4/5] bg-white dark:bg-zinc-900 rounded-md overflow-hidden">
                        <Image
                            src={picture.picture}
                            alt={picture.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                        <h3 className="text-xs font-medium truncate">{picture.name}</h3>
                        <div className="flex justify-between items-center">
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Инфа</p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Инфа</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
