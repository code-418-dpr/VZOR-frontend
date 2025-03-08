"use client";

import React, { useState } from "react";
import {ImageModal} from "@/app/main/_components/image-modal";
import {ImagesGrid} from "@/app/main/_components/images-grid";
import {AnimatePresence} from "framer-motion";


// import Header from "@/app/(landing)/_components/header";

export default function Home() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

    return (
        <div className="h-screen bg-zinc-50 dark:bg-zinc-950">
            <div className="mx-auto px-2 pt-12 pb-16">
                <ImagesGrid products={filteredProducts} onProductSelect={setSelectedProduct} />
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <ImageModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                     onAddToCart={}/>
                )}
            </AnimatePresence>
        </div>
    );
}
