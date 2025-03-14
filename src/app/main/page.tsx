"use client";

import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import { PictureModal } from "@/app/main/_components/picture-modal";
import { PicturesGrid } from "@/app/main/_components/pictures-grid";
import { pictures } from "@/data/pictures";
import { Picture } from "@/types/picture";

function getUniqueDates(arr: Picture[]): string[] {
    const dates: string[] = arr.map((picture) => picture.date);
    return [...new Set(dates)];
}

export default function Home() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [searchQuery] = useState("");

    const filteredPictures = pictures.filter((picture) =>
        picture.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handlePictureSelect = (picture: Picture) => {
        const index = filteredPictures.findIndex((p) => p.id === picture.id);
        setSelectedIndex(index);
    };

    const picturesDate = getUniqueDates(filteredPictures);

    return (
        <main tabIndex={-1}>
            <div className="mx-auto pt-11 pb-40" tabIndex={-1}>
                {picturesDate.map((date) => (
                    <div key={date} tabIndex={-1}>
                        <PicturesGrid
                            picturesDate={date}
                            pictures={filteredPictures.filter((picture) => picture.date === date)}
                            onPictureSelect={handlePictureSelect}
                        />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <PictureModal
                        pictures={filteredPictures}
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
