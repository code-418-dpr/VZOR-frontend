"use client";

import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import { PictureModal } from "@/app/main/_components/picture-modal";
import { PicturesGrid } from "@/app/main/_components/pictures-grid";
import { pictures } from "@/data/pictures";
import { Picture } from "@/types/picture";

// import Header from "@/app/(landing)/_components/header";

function getUniqueDates(arr: Picture[]): string[] {
    const dates: string[] = arr.map((picture) => picture.date);
    return [...new Set(dates)];
}

export default function Home() {
    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);
    const [searchQuery] = useState("");

    /*
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowNavbar(window.scrollY > window.innerHeight / 5);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
     */

    const filteredPictures = pictures.filter((picture) =>
        picture.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const picturesDate = getUniqueDates(filteredPictures);

    return (
        <div className="bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto px-2 pt-12 pb-16">
                {picturesDate.map((date) => (
                    <div key={date}>
                        <PicturesGrid
                            picturesDate={date}
                            pictures={filteredPictures.filter((picture) => picture.date === date)}
                            onPictureSelect={setSelectedPicture}
                        />
                        <hr className="my-3 md:my-6" />
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedPicture && (
                    <PictureModal
                        picture={selectedPicture}
                        onClose={() => {
                            setSelectedPicture(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
