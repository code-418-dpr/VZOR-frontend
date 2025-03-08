"use client";

import { AnimatePresence } from "framer-motion";

import React, { useState } from "react";

import { PictureModal } from "@/app/main/_components/picture-modal";
import { PicturesGrid } from "@/app/main/_components/pictures-grid";
import { pictures } from "@/data/pictures";
import { Picture } from "@/types/picture";

// import Header from "@/app/(landing)/_components/header";

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

    const filteredImages = pictures.filter((image) => image.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto px-2 pt-12 pb-16">
                <PicturesGrid pictures={filteredImages} onPictureSelect={setSelectedPicture} />
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
