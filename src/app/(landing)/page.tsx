"use client";

import React, { useEffect, useState } from "react";

import ContactForm from "@/app/(landing)/_components/contact-form";
import Demo from "@/app/(landing)/_components/demo";
import FAQ from "@/app/(landing)/_components/faq";
import Header from "@/app/(landing)/_components/header";
import Hero from "@/app/(landing)/_components/hero/hero";

export default function Home() {
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

    return (
        <main className="flex flex-col">
            <Header visible={showNavbar} />
            <section id="hero">
                <Hero />
            </section>
            <section id="demo">
                <Demo />
            </section>
            <section id="faq">
                <FAQ />
            </section>
            <section id="contact">
                <ContactForm />
            </section>
        </main>
    );
}
