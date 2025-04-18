"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function CloudButton() {
    const router = useRouter();

    return (
        <Button
            onClick={() => {
                router.push("/main");
            }}
        >
            В облако
        </Button>
    );
}
