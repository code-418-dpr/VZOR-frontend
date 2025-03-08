"use client";

import React from "react";

// import Header from "@/app/(landing)/_components/header";

export default function Home() {
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

    return <main className="flex flex-col">{/*<Header visible={showNavbar} />*/}</main>;
}
