"use client";

import React, { useEffect, useState } from "react";

import Footer from "@/components/footer";
import Demo from "@/components/landing/demo";
import FAQ from "@/components/landing/faq";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/navbar";

export default function Home() {
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowNavbar(window.scrollY > window.innerHeight / 2);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="flex flex-col">
            <Navbar visible={showNavbar} />
            <Hero />
            <Demo />
            <FAQ />
            <Footer />
        </main>
    );
}
