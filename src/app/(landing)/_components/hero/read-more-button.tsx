import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

const scrollToNextSection = () => {
    window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
};

export default function ReadMoreButton() {
    return (
        <Button
            size="lg"
            variant="secondary"
            className="text-md absolute bottom-10 left-1/2 flex -translate-x-1/2 transform flex-col rounded-3xl py-9 sm:text-lg"
            onClick={scrollToNextSection}
        >
            Подробнее
            <ChevronDown className="animate-bounce" />
        </Button>
    );
}
