import { motion } from "motion/react";

import type { Image } from "@/types/image";

interface ImagesGridProps {
    images: Image[];
    onImageSelect: (image: Image) => void;
}

export function ImagesGrid({ images, onImageSelect }: ImagesGridProps) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {images.map((image) => (
                <motion.div
                    key={image.id}
                    layoutId={`product-${image.id}`}
                    onClick={() => onImageSelect(image)}
                    className="group cursor-pointer"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="aspect-[4/5] bg-white dark:bg-zinc-900 rounded-md overflow-hidden">
                        <img
                            src={image.picture}
                            alt={image.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    <div className="mt-1.5 space-y-0.5">
                        <h3 className="text-xs font-medium truncate">{image.name}</h3>
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
